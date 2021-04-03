# Một vài lưu ý khi làm việc với Branch 

### Quy tắc với các nhánh Code flow branches chính :
- Development: 
	- Branch name: `dev`
	- Tất cả tính năng hay là fix bugs thì đều lấy từ nhánh này. Các lỗi, tính năng, sửa đổi, refactor đều được merge or rebase vào nhánh này trước, sau khi anh test xong sẽ đẩy vào nhánh master - production.
- Production, Master: 
	- Branch name: `master`
	- Nhánh chính của project, luôn ở trạng thái ổn định, có thể tung các version từ nhánh này bất cứ lúc nào.

Các options khác như nhánh Staging, Test... ở theme này là chưa cần thiết. Có thể thực hiện được luôn trên nhánh dev đã có ở bên trên. A sẽ là người check code và chuyển lại vào nhánh master.

### Quy tắc  với các nhánh Temp Branches: 
Đây là các nhánh nhỏ hơn so với bên trên mà ae có thể tạo ra hàng ngày, hoặc khi theme sau này đã được lên môi trường production rồi. Tuy nhiên thì số lượng nhánh nhỏ nhiều mà không được quản lý prefix + msg sẽ làm ae khó hình dung theme của mình phát triển + sửa đổi sau như thế nào.  Nên ae đặt theo prefix này, cũng giống như commit lint trước a cài thôi không có gì cả.
- Feature: Các tính năng mới chưa có trong phiên bản cũ, giống như là feat mà anh cài trong commitlint:
	- feature/add-product-page
	- feature/add-to-cart-button
- Bug Fix: Những bug bình thường mà ae hay fix
	-  bugfix/fix-responsive-featured-imgage
- Hot Fix: Những bug quan trọng, có thể ảnh hướng lớn đến theme,  cần fix càng sớm càng tốt.
	- hotfix/fix-total-product-count
- Build: Nhánh chứa các config liên quan đến project
	- build/config-copy-theme-webpack
- Merging: Nhánh có thể tạo để merge trước 1 vài tính năng, hay bug nhỏ lẻ lại, trước khi ghép toàn bộ vào nhánh `dev` bên trên.
	- merge/dev_merge-hotfix-total-product

> Lưu ý: Mọi nhánh nhỏ chỉ được ghép vào nhánh dev a nhắc bên trên, lấy ra cũng từ nhánh dev, để a check code + featured trước khi đưa vào bản chính.

# Important !!!

> Update theme lên bản Lasted
> `cd ./dist`, chạy `theme watch` trước khi pull code về !!!!
> Nếu quên, vô git check lại những code changed mới nhất để tạo watch !!!

## Note:
### Commit code
#### Commitlint Config Conventional

-   `build` : Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
-   `ci` : Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs).
-   `chore` : add something without touching production code (Eg: update npm dependencies)
-   `docs` : Documentation only changes
-   `feat` : A new feature
-   `fix` : A bug fix
-   `perf` : A code change that improves performance
-   `refactor` : A code change that neither fixes a bug nor adds a feature
-   `revert` : Reverts a previous commit
-   `style` : Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
-   `test` : Adding missing tests or correcting existing tests

```
git commit -m "fix textfield" # fails
git commit -m "fix: fix textfield" # passes
```
### SCSS
#### Import
 - File main chỉ để import
 - Trong các folder nhỏ, import scss vào `*-dir.scss` folder, rồi chỉ import file `*-dir.scss` ra ngoài `main`

`_utils.scss`
```
@import 'variables.scss' # Sass Variables
@import 'functions.scss' # Sass Functions
@import 'mixins.scss' # Sass Mixins
@import 'helpers.scss' # Class & placeholders helpers
```

`main.scss`
```
/*
* Utils
*/
@import  './utils/utils-dir';
```

#### Bootstrap 4 Grid
Grid của BS4 đã được thêm sẵn trong `./style/vendors`, chỉ cần lấy ra dùng, thêm prefix `xo-` trước class là được.

```
<div class="xo-container">
  <div class="xo-row">
    ...
  </div>
</div>
```

#### Reset CSS
Reset CSS cho thống nhất default style element trên các Browsers đã được thêm sẵn trong
file `./style/vendors/normalize` rồi nên không cần viết thêm những cái có sẵn nưa.

### TS

 - Code TS viết vào từng folder riêng, tạo file trong folder tương ứng.
 - Code Home, Product... để vào folder `./pages`
 - Code SectionA, SectionB... để vào folder `./sections`
 - ..vv..vv

### Install
#### Extension

 - EditorConfig for VSCode
 - ESLint
 - Theme Check
 - ....
 
 #### Shopify
 - Themekit 
 - ...

#### Other
- Bao giờ nhớ ra thì bổ sung, hi.

---

## Developing
```
npm i
```
```
npm run dev
```
```
cd ./dist
theme watch
```

## Other
### Commit Lint
### SASSLint
### Alias 
Bao giờ nghĩ ra thì ghi tiếp

