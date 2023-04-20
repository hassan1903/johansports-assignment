module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-paper/babel",
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            api: "./src/api",
            assets: "./src/assets",
            components: "./src/components",
            context: "./src/context",
            navigation: "./src/navigation",
            screens: "./src/screens",
            translations: "./src/translations",
            utils: "./src/utils"
          }
        }
      ]
    ]
  }
}
