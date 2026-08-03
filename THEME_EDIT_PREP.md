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

## 14. Sửa carousel Categories full-bleed (2026-08-02)

- Đối chiếu ảnh người dùng gửi và đo trực tiếp demo ở viewport `1904px`.
- Page-width của carousel là `1440px`, bắt đầu tại khoảng `x = 224px`, nhưng viewport dùng `overflow: visible`.
- Sau một lần Next, track dịch `-290px`; card đầu đi tới khoảng `x = -65px` và chỉ bị cắt tại mép màn hình, không bị cắt tại padding page-width.
- Đổi viewport desktop/tablet sang `overflow: visible`; section ngoài vẫn `overflow: hidden` để clipping đúng tại mép màn hình.
- Mobile tiếp tục dùng vùng cuộn ngang riêng và ẩn overflow dọc để giữ swipe tự nhiên.
- Backup trước cập nhật: `backup/pre-category-full-bleed-20260802`, trỏ tới commit `6ac8cf2`.

## 15. Ghi chú chuẩn bị edit Header Helix (2026-08-04)

### Phạm vi và tài liệu tham chiếu

- Storefront tham chiếu: https://helix-shoes-theme.myshopify.com/
- Đã kiểm tra ở desktop và mobile; chưa chỉnh sửa code theme theo ghi chú này.
- Mục tiêu khi edit: giữ đúng cấu trúc, trạng thái sticky, dropdown/drawer, overlay, typography và nhịp animation của header tham chiếu.
- Không ghi lại thông tin đăng nhập trong repository; nội dung sản phẩm, logo và hình ảnh khi triển khai phải lấy từ setting/asset hợp lệ của theme hiện tại.

### A. Cấu trúc desktop

- Announcement bar cao khoảng `38px`, nền xanh nhạt.
- Có hai message tự chuyển khoảng `5 giây/lần`:
  - `Free shipping for all orders over 5.000.000₫`
  - `Receive 20% off your first order. Shop now`
- Announcement bar có nút Previous/Next; text đổi bằng fade kết hợp reveal theo chiều dọc.
- Header chính cao khoảng `80px`, ban đầu overlay lên hero với nền trong suốt.
- Bố cục header:
  - Trái: `Women`, `Men`, `Pages`, `Find your shoes`.
  - Giữa: logo Helix.
  - Phải: chọn quốc gia/tiền tệ `Vietnam / VND ₫`, Search, Account và Cart.
- Header desktop là sticky luôn (`header-sticky--always`), không biến mất khi cuộn xuống.
- Khi scroll qua hero:
  - Announcement bar cuộn khỏi màn hình.
  - Header đổi sang thẻ trắng nổi, bo góc khoảng `16px`, có khoảng cách hai bên khoảng `50px` ở viewport `1440px`.
  - Logo, menu và icon chuyển sang màu tối; header giữ nguyên trên màn hình khi tiếp tục cuộn.

### B. Mega menu Women/Men

- Mở khi hover vào `Women` hoặc `Men`, chiếm toàn bộ chiều rộng màn hình.
- Các nhóm nội dung cần giữ:
  - Top picks, Best sellers, Trending, New arrivals, On sale.
  - By activity: Hiking, Running, Training, Tennis, Lifestyle, Shop all.
  - By feature: Cushioned, Waterproof, Water-resistant, Breathable, Windproof.
- Có hai banner hình ảnh ở khu vực menu, đi kèm nội dung sale/favorites và nút `Shop now`.
- Khi mở menu:
  - Background của header mở rộng/đổi chiều cao khoảng `0.3s`.
  - Overlay cố định bên dưới header dùng nền tối `rgba(50, 50, 50, .5)` và `backdrop-filter: blur(20px)`.
  - Khóa scroll của body.
  - Các cột/menu item fade-in và dịch lên khoảng `15px`, có stagger delay khoảng `0.2–0.4s`.
  - Chevron xoay `180deg` trong khoảng `0.5s` với easing dạng cubic-bezier.
  - Underline của nav mở rộng trong khoảng `0.2s`.

### C. Dropdown Pages và Currency

- `Pages` mở dropdown trắng khoảng `270 × 260px`, bo góc `16px`, shadow nhẹ.
- Nội dung Pages:
  - About us
  - Contact
  - Faqs
  - Store locations
  - Recently viewed
  - Our journal
- Currency dropdown mở khi hover, kích thước quan sát được khoảng `330 × 443px`.
- Có ô tìm quốc gia, cờ và danh sách 10 quốc gia: Australia, Belgium, Canada, France, Germany, Italy, Japan, Spain, United States, Vietnam.
- Các dòng currency fade/slide vào theo stagger khoảng `0.4s`; chevron dùng cùng trạng thái xoay với nav.

### D. Search và Cart drawer desktop

- Search mở drawer trắng bên phải, panel rộng khoảng `550px`, inset khoảng `16px`.
- Drawer dùng animation slide khoảng `0.5s`, easing gần `cubic-bezier(.7, 0, .2, 1)`.
- Khi drawer mở, overlay tối kèm blur xuất hiện khoảng `0.7s`; body bị khóa scroll.
- Search có input và Popular searches:
  - Running shoes
  - Trail running shoes
  - Hiking shoes
- Cart dùng cùng cơ chế drawer/overlay; trạng thái rỗng hiển thị `Your cart is empty` và ba nút `Trending`, `Best sellers`, `On sale`.

### E. Cấu trúc mobile

- Breakpoint quan sát được khoảng `990px`.
- Header mobile cao khoảng `56px`, ban đầu vẫn có thể overlay lên hero.
- Hàng đầu gồm:
  - Trái: hamburger.
  - Giữa: logo Helix khoảng `90 × 16px`.
  - Phải: Search và Cart.
- Account và currency được chuyển vào mobile menu.
- Mobile menu là card trắng gần full màn hình, inset khoảng `8px`, bo góc `16px`; overlay phủ toàn viewport với nền tối và blur; body bị khóa scroll.
- Menu mobile gồm: Women, Men, Pages, Find your shoes, Login, `VND ₫`, `English`.
- Women/Men/Pages dùng accordion/details; submenu có nút back, nút close và chuyển cảnh khoảng `0.3s`.
- Các nhóm `By activity` và `By feature` tiếp tục là accordion lồng nhau.
- Submenu Pages phải giữ đủ 6 link như desktop.
- VND mở panel danh sách quốc gia riêng; English mở panel ngôn ngữ riêng.

### F. Search, Cart và sticky trên mobile

- Search và Cart mở card gần full màn hình với cùng inset `8px`, bo góc `16px`, overlay blur và khóa body scroll.
- Search input rộng khoảng `342px`, cao khoảng `44px`; popular search hiển thị dạng pill.
- Cart rỗng giữ text và ba nút hành động giống desktop.
- Drawer mobile chạy khoảng `0.5s`; overlay fade/blur khoảng `0.7s`.
- Khi scroll xuống, header dịch lên khoảng `-51` đến `-62px` và ẩn.
- Khi scroll lên, header xuất hiện lại, ghim ở đầu màn hình, nền trắng opacity `1`.
- Transform dùng transition khoảng `0.5s` với easing gần `cubic-bezier(.6, 0, .4, 1)` và delay khoảng `0.2s`.
- Có thêm mobile bottom dock cố định 6 cột ngoài header chính: `Home`, `Menu`, `Search`, `Shop`, `Cart`, `Account`; dock cũng có animation transform khoảng `0.5s` theo trạng thái scroll/active.

### G. Hiệu ứng đặc biệt cần giữ khi triển khai

- Header chuyển từ transparent overlay sang white floating header sau khi scroll.
- Announcement text tự chuyển với fade + vertical reveal.
- Mega menu có overlay blur, khóa body scroll, stagger item, xoay chevron và underline reveal.
- Search/Cart dùng right drawer, overlay fade/blur và animation slide.
- Mobile menu/submenu dùng card bo góc, accordion và chuyển cảnh back/forward.
- Sticky mobile ẩn khi scroll xuống, hiện lại khi scroll lên.
- Mobile bottom dock độc lập với header chính.
- Tôn trọng `prefers-reduced-motion`; mọi trạng thái mở/đóng phải dùng button có label, focus rõ ràng và đóng được bằng `Esc`.

### H. Checklist edit và QA

- [ ] Xác nhận markup header hiện tại trước khi sửa; không làm hỏng `header-group` hoặc section slider.
- [ ] Đối chiếu logo, font, font-weight, khoảng cách, màu, radius và icon ở desktop/mobile.
- [ ] Kiểm tra header ở trạng thái top/transparent, sau scroll và khi scroll ngược lại.
- [ ] Kiểm tra hover Women/Men, Pages, Currency và trạng thái đóng khi rời vùng hover.
- [ ] Kiểm tra Search/Cart mở, đóng, overlay, khóa body scroll và focus.
- [ ] Kiểm tra mobile menu, accordion, submenu back, close, currency/language panel.
- [ ] Kiểm tra responsive tại tối thiểu `1440px`, `1024px`, `768px`, `390px` và `375px`.
- [ ] Kiểm tra không che sai slider/section 2, không gây horizontal overflow và không làm hỏng autoplay slider.
- [ ] Chạy Theme Check, kiểm tra JavaScript, `git diff --check`, tạo backup trước khi push.
- [ ] Chỉ publish sau khi duyệt trực quan trên Shopify Theme Editor ở desktop, tablet và mobile.

### Ghi chú ngoài header

- Demo còn có tab khuyến mãi nổi dọc `Get 20% OFF` kèm nút close. Đây là widget global tùy chọn, không xem là phần bắt buộc của header; chỉ triển khai nếu theme hiện tại có yêu cầu tương ứng.

## 16. Triển khai lại Header Helix theo ghi chú (2026-08-04)

### Đã triển khai

- Thay lại `sections/header.liquid` theo cấu trúc header Helix đã phân tích:
  - Announcement bar gồm hai message, autoplay, Previous/Next và fade + vertical reveal.
  - Header desktop overlay trên hero, logo giữa, nav Women/Men/Pages/Find your shoes và nhóm Currency/Search/Account/Cart.
  - Sticky desktop chuyển thành white floating header sau khi scroll.
  - Mega menu Women/Men với ba nhóm Top picks, By activity, By feature; overlay blur, khóa scroll, stagger item, underline và chevron rotation.
  - Pages dropdown và Currency popover có animation, country search và localization form.
  - Search drawer và Cart drawer bên phải, overlay blur, popular searches và empty-cart actions.
  - Mobile header 56px với hamburger/logo/search/cart; mobile menu card, submenu back/close, accordion Women/Men/Pages, Currency và Language view.
  - Mobile sticky ẩn khi scroll xuống, hiện khi scroll lên; bổ sung bottom dock sáu mục Home/Menu/Search/Shop/Cart/Account.
  - Tôn trọng `prefers-reduced-motion`, focus state và phím `Esc`.
- Cập nhật `sections/header-group.json` với cấu hình mặc định Helix và các URL/label tương ứng.
- Cập nhật `locales/en.default.json` với các chuỗi accessibility và drawer/menu mới.
- Logo và banner mega menu dùng `image_picker`; khi chưa upload asset, header dùng text/logo fallback an toàn thay vì phụ thuộc URL storefront demo.

### Kiểm tra cục bộ

- Liquid AST: hợp lệ.
- Schema section: JSON hợp lệ, `43` settings.
- Header group JSON: hợp lệ.
- Locale JSON: hợp lệ sau khi loại phần comment metadata của file hiện có.
- JavaScript: parse bằng `SourceTextModule` hợp lệ.
- CSS trong `{% stylesheet %}` không còn chứa biến Liquid chưa render.
- Shopify validator từ xa chưa chạy vì sẽ gửi nội dung theme lên dịch vụ bên ngoài và chưa có quyền riêng cho việc đó.

### Trạng thái

- Đã fetch/pull bản mới nhất từ `origin/main` trước khi hợp nhất thay đổi.
- Các commit remote mới về slider/button đã được merge, không ghi đè.
- Commit đã push lên `main`: `74a199b73ec0fb62c36b763abd040243df17e264`.
- Link commit: https://github.com/Jhonstex/slider-test/commit/74a199b73ec0fb62c36b763abd040243df17e264
- Backup trước Header Helix: `backup/pre-helix-header-20260804`.
- Link backup: https://github.com/Jhonstex/slider-test/tree/backup/pre-helix-header-20260804
- Shopify theme draft có thể nhận đồng bộ từ `main`; cần kiểm tra trực quan ở `1440px`, `1024px`, `768px`, `390px` và `375px`.

## 17. Rebuild Header Helix từ đầu (2026-08-04)

### Lý do rebuild

- Bản header trước chưa khớp reference ở lớp overlay/sticky, kích thước grid desktop/mobile và hành vi mega menu.
- Trước khi xóa code cũ đã tạo backup hiện tại trên GitHub: `backup/pre-header-rebuild-20260804`.

### Reference đã đối chiếu

- Announcement bar cao khoảng `39px`, typography Figtree `14px/22.4px`, phần amount `5.000.000₫` được bold.
- Desktop header cao khoảng `80px`, inner có lề ngang `50px` ở viewport `1265px`, grid ba phần `1fr / 110px / 1fr`.
- Desktop nav: `Women`, `Men`, `Pages`, `Find your shoes`; center logo rộng `110px`; bên phải là `VND ₫`, Search, Account, Cart.
- Mobile header cao `56px`, grid hamburger / logo `90px` / Search + Cart; Account và Currency nằm trong mobile menu.
- Mega menu dùng mở theo hover, panel height/opacity reveal khoảng `0.3s`, item stagger, underline nav và chevron rotate.
- Sticky desktop luôn hiện; mobile ẩn khi scroll xuống và hiện lại khi scroll lên với transition khoảng `0.5s cubic-bezier(.6, 0, .4, 1)`.

### Thay đổi đã làm

- Xóa implementation header cũ trong `sections/header.liquid` và dựng lại theo cấu trúc mới, không thay đổi slider/categories/footer.
- Bổ sung six icon snippets dùng chung: `helix-icon-chevron`, `helix-icon-search`, `helix-icon-account`, `helix-icon-cart`, `helix-icon-menu`, `helix-icon-close`.
- Giữ option logo/image picker, overlay, sticky, announcement, mega menu promo, localization, search drawer, cart drawer và mobile menu.
- Cập nhật `sections/header-group.json` để dùng mặc định Helix: `Helix Theme`, `/collections/all-womens`, `/collections/all-mens`, `/pages/find-your-shoes`, `/blogs/news`.
- Giới hạn schema header còn đúng `40` settings theo giới hạn Theme Check; các collection link mặc định dùng `routes.collections_url`.

### Kiểm tra sau rebuild

- Liquid AST: hợp lệ (`Document`).
- Schema section: JSON hợp lệ, `40` settings, không có setting được tham chiếu nhưng chưa khai báo.
- JavaScript: parse bằng `SourceTextModule` hợp lệ.
- Theme Check cục bộ: `0` offense.
- `git diff --check`: không có whitespace error.
- Shopify validator từ xa chưa chạy vì sẽ gửi code theme lên dịch vụ bên ngoài và chưa có quyền riêng cho việc đó.
