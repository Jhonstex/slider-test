# Nhật ký chỉnh sửa Shopify theme `slider-test`

Cập nhật lần cuối: 2026-08-02

## 1. Thông tin kết nối

- Store Shopify: `beae-anna`
- Theme ID: `161043677397`
- Theme Editor: https://admin.shopify.com/store/beae-anna/themes/161043677397/editor
- Repository GitHub: https://github.com/Jhonstex/slider-test
- Remote Git: `https://github.com/Jhonstex/slider-test.git`
- Nhánh kết nối: `main`
- Tên hiển thị trong Shopify: `slider-test/main`
- Trạng thái theme: `Draft`
- Trang đã kiểm tra: `Home page`
- Section slider: `Pebble slideshow`

Kết luận: kết nối GitHub và Shopify đang hoạt động. Thay đổi được push lên `origin/main` đã xuất hiện trong theme draft `slider-test/main` trên Shopify.

## 2. Demo tham chiếu

- Trang theme: https://themes.shopify.com/themes/pebble/presets/pebble
- Cách mở đúng demo: truy cập trang theme và bấm `View demo`.
- Slider được phân tích trực tiếp trên demo ở desktop và mobile.
- Cấu hình chuyển slide quan sát được trên demo:
  - Hiệu ứng `fade`.
  - `crossFade: true`.
  - Autoplay mỗi `5000ms`.
  - Thời gian chuyển fade khoảng `300ms`.
  - Pagination dạng counter kết hợp progress bar.
  - Ảnh active chạy zoom-out từ `scale(1.15)` về `scale(1)`.
  - Eyebrow, heading và button dùng hiệu ứng fade-up với độ trễ lần lượt khoảng `50ms`, `150ms` và `250ms`.

## 3. Các bước đã thực hiện

1. Kiểm tra repository, remote, nhánh `main` và trạng thái đăng nhập GitHub CLI.
2. Xác nhận theme Shopify đang kết nối đúng repository `Jhonstex/slider-test` và nhánh `main`.
3. Mở demo Pebble bằng nút `View demo`, kiểm tra slider, button, pagination, typography và responsive.
4. Phân tích cấu trúc HTML, trạng thái slide và cấu hình animation của demo.
5. Làm lại section slider trong theme hiện tại theo demo Pebble.
6. Giữ nguyên slide 3; thay nội dung và hình ảnh của hai slide đầu theo demo.
7. Làm lại button dạng hai lớp với hiệu ứng reveal hình tròn và chuyển động mũi tên.
8. Làm hiệu ứng chuyển slide bằng JavaScript thuần, không phụ thuộc thư viện CDN bên ngoài.
9. Bổ sung autoplay, counter, progress bar, nút previous/next, vòng lặp slide và thao tác swipe.
10. Bổ sung hiệu ứng kéo-fade theo tiến trình giống cơ chế `crossFade` của demo:
    - Khi kéo từ phải sang trái, slide hiện tại giảm opacity theo quãng kéo.
    - Ảnh, text và button của slide kế tiếp tăng opacity đồng thời.
    - Khi kéo ngược lại, tiến trình opacity được đảo ngay lập tức.
    - Kéo chậm quá nửa chiều rộng sẽ chuyển slide.
    - Nếu thả khi chưa đủ ngưỡng, slider fade trở lại slide hiện tại.
    - Vuốt nhanh tối thiểu khoảng `40px` vẫn chuyển slide.
    - Hỗ trợ Pointer Events cho chuột, tablet và mobile.
11. Kiểm tra lại bố cục, autoplay và responsive trong Shopify Theme Editor.
12. Tạo backup trước mỗi lần cập nhật lớn, sau đó commit và push trực tiếp lên `main` để theme draft nhận thay đổi.
13. Sửa lỗi autoplay bị dừng vĩnh viễn sau khi kéo: autoplay giờ chỉ tạm dừng trong lúc giữ/kéo và tự bắt đầu lại từ đầu chu kỳ sau `pointerup` hoặc `pointercancel`.
14. Chuẩn hóa circular index và giữ các slide inactive trong lớp compositing bằng opacity để cross-fade hoạt động đồng nhất cho cả `1 ↔ 2`, `2 ↔ 3` và `3 ↔ 1`.
15. Tách drag opacity thành hai lớp `media` và `content-wrap`, bảo đảm ảnh, eyebrow, heading, body và button fade cùng tiến trình ở đường vòng `3 ↔ 1`.

## 4. Những phần đã hoàn thiện

### Nội dung và bố cục

- Hai slide đầu sử dụng đúng hình ảnh và nội dung tham chiếu từ demo Pebble.
- Slide 3 được giữ lại.
- Vị trí text, kích thước heading, khoảng cách và button được điều chỉnh theo demo.
- Font sử dụng Shopify `font_picker` và `font_face`, mặc định là `Bricolage Grotesque`.

### Animation

- Cross-fade giữa hai slide.
- Progressive cross-fade trong lúc giữ và kéo chuột/ngón tay.
- Autoplay tự tiếp tục sau khi thả chuột, hủy kéo hoặc vuốt chưa đủ ngưỡng chuyển slide.
- Cross-fade vòng hoạt động ở cả hai chiều `3 → 1` và `1 → 3`.
- Text và button ở đường vòng `3 ↔ 1` dùng đúng cùng drag progress với ảnh, giống các cặp slide liền kề.
- Zoom-out ảnh từ `1.15` về `1` trong khoảng `1.3s`.
- Fade-up cho eyebrow, heading, body và button.
- Button reveal bằng `clip-path` trong khoảng `0.6s`.
- Animation mũi tên khi hover button.
- Progress bar chạy tuyến tính theo thời gian autoplay.
- Có xử lý `prefers-reduced-motion`.

### Responsive

- Desktop dùng ảnh ngang và nội dung căn theo setting của section.
- Mobile dùng ảnh dọc riêng, text căn giữa và button full-width.
- Chiều cao section, vùng nội dung và controls thay đổi tại breakpoint `767px`.
- Drag progress được tính theo chiều rộng thực tế của slider nên hoạt động nhất quán trên desktop, tablet và mobile.

## 5. File đã chỉnh sửa

- `sections/pebble-swiper.liquid`
  - Markup, CSS, animation, autoplay, navigation, swipe và progressive drag cross-fade.
- `snippets/pebble-arrow.liquid`
  - Icon mũi tên cho button.
- `templates/index.json`
  - Dữ liệu ba slide trên trang chủ, gồm hai slide Pebble và slide 3 được giữ lại.

## 6. Kiểm tra kỹ thuật đã chạy

- Shopify Liquid documentation search trước khi chỉnh sửa.
- Shopify Theme Check cho các file Liquid/JSON liên quan.
- Kết quả bản slider chính: `3/3` file hợp lệ.
- Kết quả bản progressive drag cross-fade: `1/1` file hợp lệ.
- Kiểm tra cú pháp JavaScript: hợp lệ.
- Kiểm tra circular index: `3 → 1` trả về index `0`, `1 → 3` trả về index `2`.
- `git diff --check`: không có lỗi whitespace.
- Kiểm tra trực tiếp Theme Editor ở desktop và mobile.
- Xác nhận theme vẫn là `Draft`, chưa publish ra storefront chính.

## 7. Commit và backup

### Bản slider khớp demo Pebble

- Commit: `ba00bb611b8f122e0a97f1860c0282a682ed30cb`
- Nội dung: `Match Pebble slider motion and responsive layout`
- Link: https://github.com/Jhonstex/slider-test/commit/ba00bb611b8f122e0a97f1860c0282a682ed30cb
- Backup trước cập nhật: `backup/pre-pebble-slider-20260731`
- Backup trỏ tới commit: `7e918dcc0856e23e492b64485931e27d671950c0`
- Link backup: https://github.com/Jhonstex/slider-test/tree/backup/pre-pebble-slider-20260731

### Bản bổ sung progressive drag cross-fade

- Commit hiện tại trên `main`: `f0b95cc235fe577a1ec5082908dfe90d1bff1d5a`
- Nội dung: `Add progressive drag crossfade to Pebble slider`
- Link: https://github.com/Jhonstex/slider-test/commit/f0b95cc235fe577a1ec5082908dfe90d1bff1d5a
- Backup trước cập nhật: `backup/pre-drag-crossfade-20260731`
- Backup trỏ tới commit: `ba00bb611b8f122e0a97f1860c0282a682ed30cb`
- Link backup: https://github.com/Jhonstex/slider-test/tree/backup/pre-drag-crossfade-20260731

### Bản sửa autoplay và cross-fade vòng

- Commit hiện tại trên `main`: `57abbf349bc2529459be1cd2343524af9e9025e7`
- Nội dung: `Resume autoplay and fade circular slider edges`
- Link: https://github.com/Jhonstex/slider-test/commit/57abbf349bc2529459be1cd2343524af9e9025e7
- Backup trước cập nhật: `backup/pre-autoplay-wrap-fix-20260731`
- Backup trỏ tới commit: `f0b95cc235fe577a1ec5082908dfe90d1bff1d5a`
- Link backup: https://github.com/Jhonstex/slider-test/tree/backup/pre-autoplay-wrap-fix-20260731

### Bản đồng bộ fading text và ảnh ở đường vòng

- Commit hiện tại trên `main`: `6d2450d8a50976f05468695f80d742bec25ba387`
- Nội dung: `Fade wraparound slide text with media`
- Link: https://github.com/Jhonstex/slider-test/commit/6d2450d8a50976f05468695f80d742bec25ba387
- Backup trước cập nhật: `backup/pre-wrap-text-fade-fix-20260731`
- Backup trỏ tới commit: `57abbf349bc2529459be1cd2343524af9e9025e7`
- Link backup: https://github.com/Jhonstex/slider-test/tree/backup/pre-wrap-text-fade-fix-20260731

## 8. Quy trình cho lần chỉnh sửa tiếp theo

1. Chạy `git status -sb` và xác nhận chỉ chỉnh đúng file trong phạm vi yêu cầu.
2. Chạy `git fetch origin` và kiểm tra local `main` không lệch `origin/main`.
3. Tạo nhánh backup mới trỏ tới commit hiện tại trước khi sửa.
4. Chỉnh file trong workspace; không sửa trực tiếp trên theme live.
5. Kiểm tra Liquid, JSON schema, CSS và JavaScript.
6. Chạy Shopify validator cho tất cả file đã thay đổi.
7. Chạy kiểm tra JavaScript và `git diff --check`.
8. Stage bằng đường dẫn file cụ thể, không dùng `git add -A` khi workspace có file ngoài phạm vi.
9. Commit với mô tả ngắn, rõ ràng rồi push lên `origin/main`.
10. Mở Shopify Theme Editor và kiểm tra desktop, tablet, mobile, autoplay, drag, button và pagination.
11. Chỉ publish theme sau khi đã duyệt trực quan và có xác nhận riêng.

## 9. Cách khôi phục an toàn

- Không dùng force-push hoặc `git reset --hard` trên `main`.
- Nếu cần bỏ riêng hiệu ứng drag cross-fade, revert commit `f0b95cc235fe577a1ec5082908dfe90d1bff1d5a` rồi push commit revert lên `main`.
- Nếu cần trở về trạng thái trước toàn bộ bản Pebble slider, dùng nhánh `backup/pre-pebble-slider-20260731` làm nguồn đối chiếu và tạo commit khôi phục mới.
- Luôn kiểm tra lại theme draft trong Shopify trước khi publish.

## 10. Trạng thái hiện tại

- Local branch: `main`
- Remote branch: `origin/main`
- Commit hiện tại: `6d2450d8a50976f05468695f80d742bec25ba387`
- Section hiện tại: `Pebble slideshow`
- Theme Shopify: `slider-test/main`
- Trạng thái: `Draft`
- Progressive drag cross-fade: đã triển khai và push.
- Autoplay sau thao tác kéo: đã sửa và push.
- Cross-fade vòng `3 ↔ 1`: đã sửa và push.
- Fading text/button ở đường vòng `3 ↔ 1`: đã đồng bộ với ảnh và push.
- Theme chưa được publish.

## 11. Bổ sung header và Explore Categories theo demo Pebble (2026-08-02)

### Phân tích demo

- Dùng storefront trực tiếp `https://pebble-little.myshopify.com/` để tránh lớp preview của Shopify Theme Store.
- Đo giao diện ở desktop `1440px`, tablet `768px` và mobile `390px`.
- Header desktop là lớp overlay cách mép trên `30px`, nền trắng cao `80px`, bo góc `10px`, logo ở giữa và menu/search/account/cart ở hai bên.
- Header mobile cao `60px`, chia vùng menu, logo và ba icon bằng đường phân cách.
- Section `Explore Categories` chồng lên đáy slider khoảng `34px` trên desktop và `18px` trên mobile, bo hai góc trên `20px`.
- Carousel hiển thị 5 cột desktop, 4 cột tablet và khoảng 2.4 thẻ trên mobile để gợi ý thao tác kéo ngang.
- Heading dùng fade-up; ảnh dùng reveal từ scale `1.15` về `1`; tab active dùng nền pill `#ebebeb`; card có zoom nhẹ khi hover.

### Thay đổi đã triển khai

- Làm lại `sections/header.liquid` thành Pebble header độc lập, gồm:
  - logo desktop/mobile đúng asset demo;
  - menu desktop có caret và hỗ trợ menu con;
  - search, account, cart và cart count;
  - sticky header khi cuộn;
  - mobile drawer có overlay, đóng/mở bằng nút và khóa cuộn nền;
  - font Bricolage Grotesque và `prefers-reduced-motion`.
- Bật lại header trong `sections/header-group.json` và thêm bốn mục `Shop`, `Collections`, `Pages`, `Features`.
- Tạo `sections/pebble-categories.liquid` với hai tab `Boy’s` và `Girl’s`.
- Điền đủ 8 danh mục Boy’s và 7 danh mục Girl’s theo đúng text, số lượng, ảnh và thứ tự của demo.
- Thêm tab fade, carousel drag/swipe, arrows, progress bar, responsive 5/4/2.4 cột, scroll reveal và hover zoom.
- Thêm section mới ngay sau `Pebble slideshow` trong `templates/index.json`; không thay đổi logic autoplay/drag-fade của slider.
- Bổ sung chuỗi accessibility cho navigation, search, account và cart trong `locales/en.default.json`.

### Kiểm tra kỹ thuật

- JSON parse: hợp lệ.
- JavaScript của hai section mới: hợp lệ.
- Shopify Theme Check chạy cục bộ: `0` lỗi.
- `git diff --check`: không có lỗi whitespace.
- Shopify validator từ xa chưa chạy vì công cụ yêu cầu quyền riêng để gửi nội dung 5 file theme đến dịch vụ kiểm tra bên ngoài; Theme Check cục bộ được dùng làm phương án an toàn.

### Backup trước cập nhật

- Nhánh: `backup/pre-pebble-header-categories-20260802`
- Commit được bảo toàn: `5e6b5ef` (`Update from Shopify for theme slider-test/main`).
- Bản backup bao gồm chỉnh sửa mới nhất từ Shopify Theme Editor ở slide 3 trước khi thêm header/categories.
- Link: https://github.com/Jhonstex/slider-test/tree/backup/pre-pebble-header-categories-20260802

### File thuộc bản cập nhật

- `sections/header.liquid`
- `sections/header-group.json`
- `sections/pebble-categories.liquid`
- `templates/index.json`
- `locales/en.default.json`
- `THEME_EDIT_PREP.md`

## 12. Sửa hiệu ứng section 2 phủ lên slider khi cuộn (2026-08-02)

- Kiểm tra lại trực tiếp storefront Pebble theo từng mốc scroll trên desktop và mobile.
- Xác định demo dùng `position: sticky` cho toàn bộ slideshow, không chỉ dùng margin âm giữa hai section.
- Desktop giữ slider tại `top: 0`; mobile giữ tại `top: 60px` để nằm ngay dưới mobile header.
- Slideshow nằm ở lớp `z-index: -1` trong stacking context của `#MainContent`; `Pebble categories` tiếp tục cuộn ở lớp phía trên và phủ dần lên ảnh/text slider.
- Giữ nguyên overlap ban đầu: `34px` desktop và `18px` mobile.
- Không thay đổi autoplay, drag cross-fade, pagination hoặc nội dung ba slide.
- Backup trước cập nhật: `backup/pre-sticky-overlap-20260802`, trỏ tới commit `9ce8be0`.

## 13. Đồng bộ hover hai nút carousel Categories (2026-08-02)

- Kiểm tra DOM, computed style và stylesheet công khai của hai nút Previous/Next trên demo Pebble.
- Nút có kích thước `44px`, bo tròn hoàn toàn, icon `16px` và viền đen opacity `20%`.
- Hover dùng lớp `::before` màu đen mở rộng từ trái sang phải trong `300ms`; mũi tên chuyển sang trắng và viền chuyển thành đen.
- Nút disabled giữ opacity `0.5` và con trỏ `not-allowed`, không khóa hover bằng `pointer-events` để giống demo.
- Bổ sung trạng thái tương đương cho bàn phím bằng `:focus-visible` và tắt transition khi người dùng bật `prefers-reduced-motion`.
- Backup trước cập nhật: `backup/pre-category-button-hover-20260802`, trỏ tới commit `ced6af5`.
