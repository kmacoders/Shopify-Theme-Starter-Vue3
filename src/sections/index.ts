//@ts-nocheck

/***
 * Description:
 *  File này tự động tìm kiếm ts và scss có trong theme ( bên cạnh .liquid file)
 *  ...để auto import
 */

const ts = require.context('Theme/', true, /\.ts$/);
ts.keys().forEach(ts);

/** Auto import cho SCSS đã được chuyển xuống main.scss để đảm bảo compile đúng trình tự */
// const scss = require.context('Theme/', true, /\.scss$/);
// scss.keys().forEach(scss);
