# UI Logic: Edit Outline & Chat Session History

Dưới đây là tổng hợp chi tiết về **UI Logic (Luồng xử lý giao diện)** cho hai tính năng **Edit Outline** và **Chat Session History** đang được triển khai trong ứng dụng.

---

## 1. Chat Session History (Lịch sử Phiên làm việc)

### Mục đích
Quản lý, phân loại và cho phép người dùng xem lại hoặc tiếp tục các phiên làm việc trước đó (bao gồm cả tạo Báo cáo/Chat và tạo Slide).

### Thành phần UI (UI Components)
* **Khu vực hiển thị:** Nằm ở Sidebar bên trái của màn hình `ReportMode`.
* **Bộ lọc (Filter Tabs):** Gồm 3 tabs `All` (Tất cả), `Chat` (Báo cáo/Hỏi đáp), `Slide` (Tạo bài thuyết trình).
* **Danh sách Item (`HistoryItem`):** Mỗi item hiển thị Icon (theo type), Tiêu đề (Title), Mã ID, Trạng thái (Badge) và Thời gian (Date).

### Luồng Logic (UI Logic Flow)
1. **Lọc dữ liệu (Filtering):** 
   * Sử dụng state `historyFilter` ('all' | 'chat' | 'slide').
   * Khi user click vào các tab filter, danh sách bên dưới sẽ render có điều kiện (conditional rendering) chỉ hiện các `HistoryItem` có `type` tương ứng.
2. **Phân biệt thị giác (Visual Differentiation):**
   * **Type 'chat':** Dùng icon `FileText`, màu chủ đạo Teal (xanh lơ), badge trạng thái "처리중" (Đang xử lý/Processing).
   * **Type 'slide':** Dùng icon `Presentation`, màu chủ đạo Amber (vàng cam), badge trạng thái "완료" (Đã hoàn thành/Done).
3. **Tương tác Click & Khôi phục (Resume Session):**
   * Khi user click vào một item loại **Slide**, hàm `onClick` được gọi.
   * Hệ thống trigger hàm `onStartSlideGeneration` và truyền vào một object `SlideGenerationData` chứa thông tin của project cũ, đặc biệt có cờ **`isHistory: true`**.
   * **Chuyển đổi View:** App đổi `activeView` từ `'report'` sang `'slide'`.
   * **Khôi phục State (trong `SlideMode`):** Hook `useEffect` kiểm tra nếu `initialData.isHistory == true`, nó sẽ bỏ qua bước AI tự động sinh outline. Thay vào đó, nó thiết lập trạng thái `outlineApproved = true`, nạp danh sách slides mẫu đã hoàn thành vào state `slides`, và nạp lại lịch sử tin nhắn vào state `messages` để user thấy lại kết quả ngay lập tức.

---

## 2. Edit Outline (Chỉnh sửa Dàn ý Slide)

### Mục đích
Cho phép người dùng can thiệp, chỉnh sửa, thêm hoặc bớt các slide trong dàn ý do AI đề xuất trước khi chốt để AI tiến hành tạo nội dung chi tiết cho từng slide.

### Thành phần UI (UI Components)
* **Message Card (AI Outline):** Tin nhắn của AI trả về dàn ý, có nút **"Edit Outline"** (icon cây bút).
* **Edit Modal:** Một popup (modal) hiển thị danh sách các slide trong dàn ý dưới dạng form nhập liệu (Input cho Title, Textarea cho Content).
* **Nút thao tác trong Modal:** "+ Add Slide" (Thêm slide), Icon thùng rác (Xóa slide), "Cancel" (Hủy), "Save Changes" (Lưu thay đổi).
* **Nút Approve:** "Approve & Generate Slides" nằm ở tin nhắn Outline để chốt dàn ý.

### Luồng Logic (UI Logic Flow)
1. **Kích hoạt Modal (Trigger):** 
   * Khi AI sinh xong dàn ý, user bấm "Edit Outline".
   * Hệ thống cập nhật state `outlineModal` thành `{ isOpen: true, msgId: <id_tin_nhắn>, outline: <copy_của_dàn_ý_hiện_tại> }`. Modal xuất hiện (overlay lên màn hình).
2. **Thao tác chỉnh sửa (Editing):**
   * **Sửa Text:** User gõ vào Input/Textarea, hàm `onChange` sẽ map qua mảng `outline` trong state `outlineModal` và cập nhật đúng index đang sửa.
   * **Thêm Slide:** Bấm "+ Add Slide", hệ thống push một object rỗng `{ slideNum: length + 1, title: '', content: '' }` vào mảng outline đang edit.
   * **Xóa Slide:** Bấm icon Thùng rác, hệ thống filter bỏ index đó ra khỏi mảng, đồng thời chạy vòng lặp cập nhật lại `slideNum` (số thứ tự) cho các slide còn lại cho liền mạch.
3. **Lưu thay đổi (Save Changes):**
   * Khi bấm "Save Changes", hệ thống tìm tin nhắn có `id` trùng với `msgId` trong state `messages`.
   * Thay thế mảng `outline` cũ của tin nhắn đó bằng mảng `outline` mới vừa sửa trong Modal.
   * Đóng Modal (`isOpen: false`). Giao diện tin nhắn Outline bên ngoài lập tức cập nhật theo nội dung mới.
4. **Chốt Dàn ý (Approve):**
   * User bấm "Approve & Generate Slides".
   * State `outlineApproved` được set thành `true` (ẩn khung chat, mở rộng khu vực Workspace bên phải).
   * Hệ thống khởi tạo các slide trống (trạng thái 'pending') dựa trên dàn ý đã chốt và bắt đầu gọi hàm đệ quy `completeSlide` để giả lập AI sinh nội dung cho từng slide một.
