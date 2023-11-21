/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"./node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wagmi/providers/alchemy */ \"wagmi/providers/alchemy\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_3__, wagmi__WEBPACK_IMPORTED_MODULE_4__, wagmi_chains__WEBPACK_IMPORTED_MODULE_5__, wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_6__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_7__]);\n([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_3__, wagmi__WEBPACK_IMPORTED_MODULE_4__, wagmi_chains__WEBPACK_IMPORTED_MODULE_5__, wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_6__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\nconst { chains, publicClient } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.configureChains)([\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.mainnet,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.polygon,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.optimism,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.arbitrum,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.base,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_5__.zora\n], [\n    (0,wagmi_providers_alchemy__WEBPACK_IMPORTED_MODULE_6__.alchemyProvider)({\n        apiKey: \"PjzIvS-7WGxIn-ac_UF_foltR1jSgwAQ\"\n    }),\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_7__.publicProvider)()\n]);\nconst { connectors } = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_3__.getDefaultWallets)({\n    appName: \"My RainbowKit App\",\n    projectId: \"YOUR_PROJECT_ID\",\n    chains\n});\nconst wagmiConfig = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.createConfig)({\n    autoConnect: true,\n    connectors,\n    publicClient\n});\nfunction App({ Component, pageProps }) {\n    // return <Component {...pageProps} />;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_4__.WagmiConfig, {\n        config: wagmiConfig,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_3__.RainbowKitProvider, {\n            chains: chains,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/elmer/Documents/project/Web3-Frontend-Dev-Batch-2-HW/w4/Individual/coding/dapp/src/pages/_app.tsx\",\n                lineNumber: 36,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/elmer/Documents/project/Web3-Frontend-Dev-Batch-2-HW/w4/Individual/coding/dapp/src/pages/_app.tsx\",\n            lineNumber: 35,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/elmer/Documents/project/Web3-Frontend-Dev-Batch-2-HW/w4/Individual/coding/dapp/src/pages/_app.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUdhO0FBQ29DO0FBQ1o7QUFDYTtBQUN0QjtBQUNGO0FBRXhELE1BQU0sRUFBRWEsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBR1osc0RBQWVBLENBQzlDO0lBQUNHLGlEQUFPQTtJQUFFQyxpREFBT0E7SUFBRUMsa0RBQVFBO0lBQUVDLGtEQUFRQTtJQUFFQyw4Q0FBSUE7SUFBRUMsOENBQUlBO0NBQUMsRUFDbEQ7SUFDRUMsd0VBQWVBLENBQUM7UUFBRUksUUFBUTtJQUFtQztJQUM3REgsc0VBQWNBO0NBQ2Y7QUFHSCxNQUFNLEVBQUVJLFVBQVUsRUFBRSxHQUFHaEIseUVBQWlCQSxDQUFDO0lBQ3ZDaUIsU0FBUztJQUNUQyxXQUFXO0lBQ1hMO0FBQ0Y7QUFFQSxNQUFNTSxjQUFjaEIsbURBQVlBLENBQUM7SUFDL0JpQixhQUFhO0lBQ2JKO0lBQ0FGO0FBQ0Y7QUFFZSxTQUFTTyxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELHVDQUF1QztJQUN2QyxxQkFDRSw4REFBQ25CLDhDQUFXQTtRQUFDb0IsUUFBUUw7a0JBQ25CLDRFQUFDbEIsc0VBQWtCQTtZQUFDWSxRQUFRQTtzQkFDMUIsNEVBQUNTO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXBwLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiQC9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcblxuaW1wb3J0IFwiQHJhaW5ib3ctbWUvcmFpbmJvd2tpdC9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0V2FsbGV0cywgUmFpbmJvd0tpdFByb3ZpZGVyIH0gZnJvbSBcIkByYWluYm93LW1lL3JhaW5ib3draXRcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUNoYWlucywgY3JlYXRlQ29uZmlnLCBXYWdtaUNvbmZpZyB9IGZyb20gXCJ3YWdtaVwiO1xuaW1wb3J0IHsgbWFpbm5ldCwgcG9seWdvbiwgb3B0aW1pc20sIGFyYml0cnVtLCBiYXNlLCB6b3JhIH0gZnJvbSBcIndhZ21pL2NoYWluc1wiO1xuaW1wb3J0IHsgYWxjaGVteVByb3ZpZGVyIH0gZnJvbSBcIndhZ21pL3Byb3ZpZGVycy9hbGNoZW15XCI7XG5pbXBvcnQgeyBwdWJsaWNQcm92aWRlciB9IGZyb20gXCJ3YWdtaS9wcm92aWRlcnMvcHVibGljXCI7XG5cbmNvbnN0IHsgY2hhaW5zLCBwdWJsaWNDbGllbnQgfSA9IGNvbmZpZ3VyZUNoYWlucyhcbiAgW21haW5uZXQsIHBvbHlnb24sIG9wdGltaXNtLCBhcmJpdHJ1bSwgYmFzZSwgem9yYV0sXG4gIFtcbiAgICBhbGNoZW15UHJvdmlkZXIoeyBhcGlLZXk6IFwiUGp6SXZTLTdXR3hJbi1hY19VRl9mb2x0UjFqU2d3QVFcIiB9KSxcbiAgICBwdWJsaWNQcm92aWRlcigpLFxuICBdXG4pO1xuXG5jb25zdCB7IGNvbm5lY3RvcnMgfSA9IGdldERlZmF1bHRXYWxsZXRzKHtcbiAgYXBwTmFtZTogXCJNeSBSYWluYm93S2l0IEFwcFwiLFxuICBwcm9qZWN0SWQ6IFwiWU9VUl9QUk9KRUNUX0lEXCIsXG4gIGNoYWlucyxcbn0pO1xuXG5jb25zdCB3YWdtaUNvbmZpZyA9IGNyZWF0ZUNvbmZpZyh7XG4gIGF1dG9Db25uZWN0OiB0cnVlLFxuICBjb25uZWN0b3JzLFxuICBwdWJsaWNDbGllbnQsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgLy8gcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz47XG4gIHJldHVybiAoXG4gICAgPFdhZ21pQ29uZmlnIGNvbmZpZz17d2FnbWlDb25maWd9PlxuICAgICAgPFJhaW5ib3dLaXRQcm92aWRlciBjaGFpbnM9e2NoYWluc30+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvUmFpbmJvd0tpdFByb3ZpZGVyPlxuICAgIDwvV2FnbWlDb25maWc+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiZ2V0RGVmYXVsdFdhbGxldHMiLCJSYWluYm93S2l0UHJvdmlkZXIiLCJjb25maWd1cmVDaGFpbnMiLCJjcmVhdGVDb25maWciLCJXYWdtaUNvbmZpZyIsIm1haW5uZXQiLCJwb2x5Z29uIiwib3B0aW1pc20iLCJhcmJpdHJ1bSIsImJhc2UiLCJ6b3JhIiwiYWxjaGVteVByb3ZpZGVyIiwicHVibGljUHJvdmlkZXIiLCJjaGFpbnMiLCJwdWJsaWNDbGllbnQiLCJhcGlLZXkiLCJjb25uZWN0b3JzIiwiYXBwTmFtZSIsInByb2plY3RJZCIsIndhZ21pQ29uZmlnIiwiYXV0b0Nvbm5lY3QiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjb25maWciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ "wagmi/providers/alchemy":
/*!******************************************!*\
  !*** external "wagmi/providers/alchemy" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/alchemy");;

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/public");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@rainbow-me"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();