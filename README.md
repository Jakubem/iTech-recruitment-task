<h2 align="center">Calculator app<h2>

<p align="center">This is a tiny little calculator written in Vanilla JS and PHP.</p>

<p align="center">
  <img alt="calculator app" src="./demo/demo.png">
</p>

[**✈️ Live demo**]() <br>
[**📊 Calculations page**]()

### Features:
- Performing calculations
- Saving results as CSV on the server
- Displaying results from CSV as HTML table

### Project setup:
- Clone this repository and install dependencies with `npm i` <br>
- Run `npm run dev` to start local dev server <br>
- Run `npm run build` to compile ready-to-deploy bundle to `dist` folder <br>
- Run `npm run server` to run local PHP server on `dist` folder

### Folder structure:
- `src` - all source files <br>
- `src/css` - scss styles <br>
- `src/css/style.scss` - SCSS entry point <br>
- `src/js` - all JavaScript files <br>
- `src/js/main.js` - JS entry point <br>
- `src/views` - template for html-webpack-plugin <br>
- `php` - all PHP files <br>
- `dist` - compiled production bundle <br>
- `webpack` - whole webpack config