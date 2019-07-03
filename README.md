<h2 align="center">Calculator app<h2>

<p align="center">This is a tiny little calculator written in Vanilla JS and PHP.</p>

<p align="center">
  <img alt="calculator app" src="./demo/demo.png">
</p>

[**✈️ Live demo**](https://itech-recruitment.ranyboskie.pl/) <br><br>
[**📊 Calculations page**](https://itech-recruitment.ranyboskie.pl/calculations.php)

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
- `src/scss` - scss styles <br>
- `src/scss/style.scss` - SCSS entry point <br>
- `src/js` - all JavaScript files <br>
- `src/js/main.js` - JS entry point <br>
- `src/views` - template for html-webpack-plugin <br>
- `php` - all PHP files <br>
- `dist` - compiled production bundle <br>
- `webpack` - whole webpack config

### Additional notes:
- However it was not mentioned in the original design, additional navigation and header was added for better usability
- It would be nice if large results would scroll, however `overflow: scroll` was adding nasty scrollbars on windows
- As this page is collecting user's IP address, some kind of disclaimer should be implemented
- Also, user should have a possibility to remove his personal data from the server
- Results table is not filtered by newest to oldest for now
- A Service Worker and offline functionality could be a nice addition to the calculator page
- Current implementation of a toast message seems a bit intrusive. There is no way to close it, or to interact with it. I was thinking about using [toastr](https://github.com/CodeSeven/toastr), but using whole package just for one little toast message is probably an overkill