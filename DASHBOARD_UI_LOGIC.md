# Tài liệu UI Logic - Màn hình Dashboard (Summaro AI Slides)

Tài liệu này tổng hợp logic giao diện người dùng mới nhất cho màn hình Dashboard của ứng dụng Summaro AI Slides.

## 1. Cấu trúc Tổng thể (Layout)
Ứng dụng sử dụng bố cục 3 cột (hoặc 2 cột chính tùy trạng thái):
*   **Cột Trái (Sidebar):** Điều hướng giữa các Agent.
*   **Cột Giữa (Main Dashboard):** Không gian làm việc chính để chọn tài liệu và bắt đầu quy trình tạo slide.
*   **Cột Phải (Chat/History):** Hiển thị lịch sử phiên làm việc và giao diện chat với AI.

---

## 2. Thanh Điều hướng (Sidebar)
*   **Danh sách Agent:** Hiển thị danh sách các AI Agent (Responder, Change Pilot, Data Navi, Moni, Soppy, Scaler, Bizzy).
*   **Summaro AI Slides Agent:** Được đánh dấu là Active với hiệu ứng border và background highlight màu xanh. Label tooltip hiển thị "Summaro AI Slides Agent".
*   **Bộ chọn Ngôn ngữ (Language Selector):** Nằm ở dưới cùng, hỗ trợ 4 ngôn ngữ: English (EN), Korean (KO), Vietnamese (VI), Japanese (JA). Khi thay đổi, toàn bộ text trong UI sẽ được cập nhật theo bộ `translations`.

---

## 3. Header Ứng dụng
*   **Tiêu đề:** Hiển thị "Summaro Workspace" (giữ nguyên theo yêu cầu, không thêm "AI Slides").
*   **Thông tin Người dùng:** Hiển thị text "skmas-admin skmas-admin" ở góc phải.
*   **Hành động:** Bao gồm icon **User** (Profile) và **LogOut** (Đăng xuất), được ngăn cách với thông tin người dùng bằng một đường kẻ dọc (border-l).

---

## 4. Nội dung Dashboard (Report Mode)
Đây là màn hình mặc định khi người dùng chọn Summaro AI Slides Agent.

### 4.1. Header của Agent
*   Hiển thị Icon Bot lớn, tiêu đề **"Summaro AI Slides"** (đã được bản địa hóa: ví dụ tiếng Hàn là "Summaro AI 슬라이드") và Agent ID: `a6`.

### 4.2. Bộ lọc và Tìm kiếm
*   **Tabs Thời gian (Date Filter):** Toàn bộ (All), Hôm nay (Today), 7 ngày qua (Last 7 Days), 30 ngày qua (Last 30 Days).
    *   Logic lọc: Khi chọn "Today", chỉ hiển thị các báo cáo được tạo trong ngày hôm nay. Khi chọn "Last 7 Days", hiển thị báo cáo của hôm nay và 7 ngày trước đó.
    *   Số lượng báo cáo (Count) trong header sẽ tự động cập nhật dựa trên bộ lọc thời gian và hệ thống được chọn.
*   **Thanh tìm kiếm:** Cho phép lọc danh sách tài liệu theo tên hệ thống hoặc loại báo cáo.

### 4.3. Danh sách Tài liệu (Document Grid)
*   Hiển thị các thẻ (Cards) đại diện cho các hệ thống (ví dụ: Purchasing System, Sales & Logistics System).
*   Mỗi thẻ bao gồm: Tên hệ thống, Loại báo cáo (Incident Report, Change Plan, v.v.), và ngày tạo.
*   Nút **"Start Report"**: Khi nhấn vào, người dùng sẽ chuyển sang bước chọn Template.

---

## 5. Quy trình Tạo Slide (Workflow)

### Bước 1: Chọn Template
*   Sau khi chọn một tài liệu, UI hiển thị danh sách các Template phù hợp với loại báo cáo đó (ví dụ: System Architecture, API Documentation).
*   Mỗi Template có phần xem trước (Preview) dạng slide nhỏ.

### Bước 2: Nhập Prompt và Tài liệu (Prompt Stage)
*   Người dùng có thể nhập yêu cầu chi tiết vào ô chat hoặc tải lên các file đính kèm.
*   Có thể chọn "Guide Mode" để nhập thông tin theo form có sẵn (Mục đích, Đối tượng, Nội dung chính, Số lượng slide, v.v.).

### Bước 3: Trạng thái Tạo (Generation State)
*   Khi nhấn "Generate", UI hiển thị trạng thái "Drafting [Type]..." với các bước logic AI:
    1.  Analyzing documents...
    2.  Fact checking...
    3.  Fixing layout...
    4.  Polishing content...
*   Sau khi hoàn tất, ứng dụng chuyển sang **Slide Mode** để người dùng chỉnh sửa trực tiếp trên slide.

---

## 6. Logic Bản địa hóa (Localization)
*   **summaroTitle:** "Summaro AI Slides" (EN/VI), "Summaro AI 슬라이드" (KO), "Summaro AI スライド" (JA).
*   **summaroWorkspace:** Luôn giữ là "Summaro Workspace".
*   **summaroAgent:** "Summaro AI Slides Agent".

---
*Tài liệu được cập nhật dựa trên phiên bản code mới nhất ngày 25/03/2026.*
