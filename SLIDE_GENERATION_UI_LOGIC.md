# UI LOGIC & BUSINESS FLOW: SLIDE GENERATION

Luồng nghiệp vụ này mô tả quá trình người dùng tương tác từ màn hình Dashboard (Summaro Agent), thiết lập yêu cầu tạo slide (PromptStage), cho đến khi làm việc trên không gian sinh slide (Slide Mode).

## 1. Màn hình Dashboard (Summaro Agent - Report Mode)

### 1.1. Mô tả chung
Màn hình chính của Agent, nơi người dùng chọn loại tác vụ muốn thực hiện (Tạo Báo cáo hoặc Tạo Slide) và xem lại lịch sử các phiên làm việc cũ.

### 1.2. Thành phần UI (UI Components)
* **Header:** Chứa tiêu đề "Summaro Agent", avatar người dùng và nút menu.
* **Sidebar (Trái):** Hiển thị "Session History" (Lịch sử phiên làm việc) với các tab lọc (All, Chat, Slide).
* **Main Content (Phải):** Chứa lời chào và danh sách các "Action Cards" (Thẻ hành động).
  * Card 1: "Report Generation" (Tạo báo cáo).
  * Card 2: "Slide Generation" (Tạo bài thuyết trình).

### 1.3. UI Behavior & Logic
* **Action:** Người dùng hover vào card "Slide Generation", card sẽ đổi màu nền (highlight) và viền để báo hiệu có thể click.
* **Trigger:** Người dùng click vào card "Slide Generation".
* **Logic:** Hệ thống cập nhật state `showSlidePrompt = true`.
* **Visual Feedback:** Màn hình Dashboard bị làm mờ bởi một lớp overlay (backdrop-blur) và hiển thị Popup "PromptStage" ở chính giữa màn hình.

---

## 2. Popup Thiết lập Khởi tạo (PromptStage)

### 2.1. Mô tả chung
Popup dạng Modal cho phép người dùng cung cấp thông tin đầu vào (context, file, prompt) để AI có cơ sở sinh dàn ý (Outline) cho bài thuyết trình.

### 2.2. Thành phần UI (UI Components)
* **Header Modal:** Tiêu đề "Create New Presentation" và nút "Close" (X).
* **Tabs Chế độ nhập liệu:**
  * `Guide Mode` (Nhập theo form hướng dẫn).
  * `Free Prompt` (Nhập tự do).
* **Khu vực Form (nếu chọn Guide Mode):**
  * *Purpose (Mục đích):* Input text (Bắt buộc).
  * *Audience (Đối tượng):* Input text (Tùy chọn).
  * *Main Content (Nội dung chính):* Textarea (Tùy chọn).
  * *Slide Count (Số lượng):* Dropdown (10, 15, 20, 30 slides).
  * *Aspect Ratio (Tỷ lệ):* Dropdown (16:9, 4:3).
  * *Language (Ngôn ngữ):* Dropdown (Auto, English, Vietnamese, Korean).
* **Khu vực Prompt (nếu chọn Free Prompt):** Textarea lớn để nhập yêu cầu tự do.
* **Khu vực File Upload:** Vùng Drag & Drop đính kèm tài liệu (PDF, Word, Excel).
* **Khu vực Templates:** Danh sách các template có sẵn (Tech Talk, Weekly Report, Proposal, Investor Relations).
* **Footer Modal:** Nút "Cancel" và nút "Generate Outline" (Primary Button).

### 2.3. UI Behavior & Logic
* **Tab Switching Logic:** Khi click chuyển đổi giữa "Guide Mode" và "Free Prompt", khu vực nhập liệu ở giữa sẽ thay đổi tương ứng, nhưng giữ nguyên khu vực File Upload và Templates ở bên dưới.
* **File Upload Logic:**
  * Người dùng có thể kéo thả file vào vùng đính kèm hoặc click để mở hộp thoại chọn file của OS.
  * Khi file được chọn, hiển thị danh sách các file đã tải lên dưới dạng các "Chip" (thẻ nhỏ) kèm icon file và tên file. Có nút "X" trên mỗi chip để xóa file.
* **Template Selection Logic:**
  * Click vào một template, template đó sẽ được highlight (viền màu Teal, nền sáng hơn). Chỉ được chọn 1 template tại một thời điểm.
* **Validation Logic (Nút Generate Outline):**
  * *Trạng thái Disabled (Vô hiệu hóa):* Nếu ở `Guide Mode` mà trường "Purpose" bị bỏ trống, HOẶC nếu ở `Free Prompt` mà cả Textarea và File Upload đều trống. Nút sẽ có màu xám.
  * *Trạng thái Enabled (Kích hoạt):* Khi các điều kiện bắt buộc được thỏa mãn. Nút chuyển sang màu Teal.
* **Action (Submit):** Người dùng click "Generate Outline".
* **Trigger:** Đóng popup, truyền toàn bộ dữ liệu (Form/Prompt, Files, Template) sang component `SlideMode`, đổi `activeView` sang `'slide'`.

---

## 3. Màn hình Sinh & Chỉnh sửa Slide (Slide Mode)

### 3.1. Mô tả chung
Đây là không gian làm việc chính (Workspace), chia làm 2 phần: **Left Panel** (Giao diện Chat với AI) và **Right Panel** (Giao diện xem trước và chỉnh sửa Slide). Màn hình này trải qua 2 giai đoạn: Sinh Dàn ý và Sinh Slide.

### 3.2. Giai đoạn 1: Sinh Dàn ý (Outline Generation Phase)

#### Thành phần UI
* **Left Panel (Chat):** Chiếm phần lớn diện tích màn hình. Hiển thị lịch sử tin nhắn.
* **Right Panel (Workspace):** Trống hoặc hiển thị placeholder chờ dữ liệu.

#### UI Behavior & Logic
* **Khởi tạo (Initialization):** Ngay khi vào màn hình, hệ thống tự động render một tin nhắn của User (chứa tóm tắt các setting từ PromptStage) và đẩy vào Chat.
* **AI Task Progress (Mô phỏng suy nghĩ của AI):**
  * AI phản hồi bằng một tin nhắn dạng "Tool Execution" (Ví dụ: *Deep Thinking*).
  * Hiển thị danh sách các task nhỏ (Ví dụ: *Đọc file đính kèm, Khởi tạo dự án, Xây dựng storyline*).
  * *Logic UI:* Các task tuần tự chuyển trạng thái từ `pending` (chờ) -> `active` (đang chạy, có icon spinner) -> `done` (hoàn thành, có icon checkmark xanh).
* **Hiển thị Outline:**
  * Sau khi các task hoàn thành, AI gửi một tin nhắn chứa Dàn ý (Outline Card).
  * Outline Card hiển thị danh sách các slide (Số thứ tự, Tiêu đề, Nội dung tóm tắt).
* **Actions trên Outline Card:**
  * **Nút "Edit Outline":** Click mở Modal cho phép sửa text, thêm/xóa slide trong dàn ý (Chi tiết logic Edit Outline đã mô tả ở phần trước).
  * **Nút "Approve & Generate Slides":** Click để chốt dàn ý.
* **Trigger Approve:** Khi user click "Approve", state `outlineApproved` chuyển thành `true`.

### 3.3. Giai đoạn 2: Sinh Slide & Workspace (Slide Generation Phase)

#### Thành phần UI
* **Left Panel (Chat):** Thu hẹp lại (khoảng 30-40% chiều rộng). Vẫn giữ nguyên khung chat và ô nhập liệu (Chat Input) ở đáy.
* **Right Panel (Workspace):** Mở rộng ra. Gồm 2 phần:
  * **Top Toolbar:** Chứa các công cụ thao tác toàn cục.
  * **Slide Grid/List:** Khu vực hiển thị các thumbnail của Slide.

#### UI Behavior & Logic
* **Slide Generation Progress (Tiến trình sinh Slide):**
  * AI gửi một tin nhắn Task mới: "Slide Generation".
  * Bên Right Panel, các khung Slide (Thumbnails) xuất hiện với trạng thái `generating` (hiển thị skeleton loading hoặc spinner).
  * *Logic UI:* Hàm đệ quy chạy, lần lượt chuyển trạng thái từng slide từ `generating` sang `done`. Khi một slide `done`, thumbnail của nó sẽ hiển thị nội dung thực tế (hoặc bản preview).
  * Khi tất cả slide hoàn thành, AI gửi tin nhắn thông báo hoàn tất.
* **Tương tác tại Right Panel (Workspace Toolbar Actions):**
  * **Save Points (Lịch sử phiên bản):** Dropdown cho phép user xem và khôi phục các mốc lưu trước đó.
  * **Fact Check (Kiểm chứng):** Nút toggle. Khi bật, hệ thống quét nội dung slide, highlight các số liệu/thông tin cần kiểm chứng.
  * **Fix Layout (Sửa bố cục):** Nút trigger AI tự động căn chỉnh lại text, hình ảnh cho chuẩn UI/UX.
  * **Style Selector:** Dropdown chọn phong cách thiết kế (Professional, Creative, Auto). Khi đổi, toàn bộ slide cập nhật CSS/Theme tương ứng.
  * **Polish (Làm mịn):** Nút trigger AI viết lại nội dung cho mượt mà, chuyên nghiệp hơn.
  * **Edit Mode (Chế độ sửa):** Toggle bật/tắt chế độ cho phép user click trực tiếp vào text trên slide thumbnail để gõ/sửa nội dung (Inline editing).
  * **Preview / Code Toggle:** Chuyển đổi giữa góc nhìn hiển thị hình ảnh Slide (Preview) và góc nhìn mã nguồn (Code - ví dụ: React/HTML/Markdown code của slide).
  * **Export:** Nút xuất file (PPTX, PDF).
* **Tương tác tại Left Panel (Chat Interaction):**
  * User có thể tiếp tục gõ vào thanh Chat Input (ví dụ: *"Đổi màu chủ đạo slide 2 sang màu xanh", "Thêm một slide về rủi ro"*).
  * Có thể đính kèm thêm file mới vào khung chat.
  * Khi gửi tin nhắn, AI sẽ xử lý và cập nhật trực tiếp lên các slide ở Right Panel, đồng thời phản hồi lại trong khung chat.

  ## 4. Logic Tạo bản lưu (Save Point Creation Logic)
Hệ thống sinh ra một bản ghi mới (Save Point) thông qua 2 cơ chế: Tự động và Thủ công. Mỗi khi một bản lưu mới được tạo, nó sẽ được đẩy lên **đầu danh sách** (trở thành Current Active).

### 4.1. Cơ chế Lưu tự động (Auto-Save)
*   **Khởi tạo lần đầu (Initial Generation):** Tự động tạo mốc *"Initial Generation"* ngay khi slide vừa được AI render xong từ Outline.
*   **Chỉnh sửa thủ công (Debounced Manual Edits):** 
    *   **Trigger:** Khi user click vào text, hình ảnh, hoặc bảng trên slide để sửa trực tiếp.
    *   **Logic:** Sử dụng Debounce Timer **3 giây**. Nếu trong 3 giây user không có thao tác chỉnh sửa nào thêm, hệ thống tự động tạo một mốc lưu tên *"Manual Edit"*.
*   **Lưu tự động TRƯỚC các thao tác AI (Auto Save Before AI Operations - US-6.1):**
    *   **Trigger:** Ngay khi user bấm gửi yêu cầu AI (Chat Edit) hoặc click các nút Global Action (*Fix Layout, Polish Content, Fact Check Fix*).
    *   **Logic:** **Trước khi** hệ thống gửi request cho AI hoặc áp dụng bất kỳ thay đổi nào lên slide, hệ thống phải tự động chụp lại trạng thái hiện tại và tạo một mốc lưu (VD: *"Pre-AI: Fix Layout"*, *"Pre-AI: Polish Content"*, *"Pre-AI: Fact Check Fix"*, hoặc *"Pre-AI Edit"*). Điều này đảm bảo user luôn có bản gốc chưa bị AI can thiệp để khôi phục nếu AI làm không tốt.

### 4.2. Cơ chế Lưu thủ công có đặt tên (Manual Named Save Point - US-6.2)
*   **Trigger:** User mở dropdown Save Points và click nút **"+ Tạo bản lưu mới"**.
*   **Logic:** 
    1. Hiển thị một Modal (Hộp thoại) yêu cầu người dùng nhập tên cho phiên bản này (Ví dụ: *"Bản chốt gửi sếp duyệt"*). Nút "Lưu phiên bản" chỉ khả dụng khi người dùng đã nhập tên.
    2. Sau khi user nhập tên và xác nhận, hệ thống chụp lại state hiện tại và tạo mốc lưu với tên vừa nhập. Điều này giúp lưu giữ các milestone quan trọng.

---

## 5. Logic Khôi phục phiên bản (Rollback and Restore - US-6.5 & US-6.6)
Cơ chế khôi phục tuân thủ nguyên tắc an toàn tuyệt đối, đảm bảo không mất dữ liệu hiện tại (Safety Save Point) và yêu cầu xác nhận trước khi thực hiện.

*   **Bước 1: Trigger & Xác nhận (Confirmation Prompt)**
    *   User mở dropdown Save Points và click vào một mốc lưu cũ (Inactive item) hoặc bấm nút [Restore] trên item đó.
    *   Hệ thống hiển thị **Confirmation Prompt** với nội dung chuẩn: 
        > *"Restore to [Tên phiên bản được chọn — Timestamp]? Current state will be saved as a Safety Save Point first."*
*   **Bước 2: Tạo Safety Save Point (US-6.6)**
    *   Nếu user chọn "Đồng ý" (Confirm), hệ thống ngay lập tức lấy trạng thái slide hiện tại (trước khi bị ghi đè) và lưu thành một mốc mới có tên là **"Safety Save Point"**.
*   **Bước 3: Thực thi Khôi phục (Execute Rollback)**
    *   Hệ thống lấy dữ liệu từ mốc lưu cũ mà user đã chọn và ghi đè lên giao diện slide hiện tại.
    *   Tạo thêm một mốc lưu mới trên cùng (Top of timeline) với tên: *"Restored to [Tên phiên bản cũ]"* và set nó làm trạng thái **Active (Current)**.
*   **Bước 4: Hoàn tất UI**
    *   Đóng Confirmation Prompt và Dropdown Save Points để user xem kết quả trên slide.
