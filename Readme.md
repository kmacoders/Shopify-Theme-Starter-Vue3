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

