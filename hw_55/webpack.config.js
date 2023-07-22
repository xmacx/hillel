// Робота з шляхом.
const path = require("path");
// Автоматичне додавання бандлів в html файл
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Ковнвертація sass/scss в css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log(path.resolve(__dirname, "src"), 'path.resolve(__dirname, "src")'); // абсолютний шлях до директорія

// Шаблон файлу з хешем
const getFileName = (ext) => `[name].[contenthash].${ext}`;

module.exports = {
  mode: "development", // development/production
  context: path.resolve(__dirname, "src"), // робоча директорія
  //   entry: "./src/js/index.js",
  entry: {
    main: "./js/index.js", // шлях до джс файлу і його майбутня назва
    lib: "./js/lib.js", // шлях до джс файлу і його майбутня назва
  },
  output: {
    path: path.resolve("dist"), // директорія після компілювання
    filename: getFileName("js"), // шаблон назви файлів
    clean: true, // видалення старих бандлів з html
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // куди додавати шлях на бандли
    }),
    new MiniCssExtractPlugin({
      filename: getFileName("css"), // шаблон вихідного файлу для цсс компілювання
    }),
  ],
  module: { // розширення можливостей вебпак (підключення лоадерів та правила роботи з різними типами файлів)
    rules: [
      {
        test: /\.s[ac]ss$/i, //.scss .sass
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },

      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
    ],
  },
  resolve: { // еліаси для імпортів
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@js": path.resolve(__dirname, "./src/js"),
      "@style": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
};
