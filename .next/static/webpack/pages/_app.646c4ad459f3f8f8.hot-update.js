"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/context/AuthContext.tsx":
/*!*************************************!*\
  !*** ./src/context/AuthContext.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthContext: function() { return /* binding */ AuthContext; },\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\nconst defaultAuthContext = {\n    isAuthenticated: false,\n    login: async ()=>{},\n    logout: ()=>{},\n    register: async ()=>{}\n};\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(defaultAuthContext);\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s();\n    const [isAuthenticated, setIsAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const apiUrl = \"https://api.local.ritualworks.com\";\n    // Remove the verifyToken call\n    // useEffect(() => {\n    //   const checkAuth = async () => {\n    //     try {\n    //       await verifyToken();\n    //       setIsAuthenticated(true);\n    //     } catch {\n    //       setIsAuthenticated(false);\n    //     }\n    //   };\n    //   checkAuth();\n    // }, []);\n    const login = async (username, password)=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"\".concat(apiUrl, \"/api/authentication/login\"), {\n                username,\n                password\n            }, {\n                withCredentials: true\n            });\n            setIsAuthenticated(true);\n            router.push(\"/\");\n        } catch (error) {\n            console.error(\"Login failed\", error);\n            setIsAuthenticated(false);\n            throw error;\n        }\n    };\n    const logout = async ()=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"\".concat(apiUrl, \"/api/authentication/logout\"), {}, {\n                withCredentials: true\n            });\n            setIsAuthenticated(false);\n            router.push(\"/login\");\n        } catch (error) {\n            console.error(\"Logout failed\", error);\n        }\n    };\n    const register = async (email, password, username)=>{\n        try {\n            await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"\".concat(apiUrl, \"/api/authentication/register\"), {\n                email,\n                password,\n                username\n            }, {\n                withCredentials: true\n            });\n            setIsAuthenticated(true);\n            router.push(\"/\");\n        } catch (error) {\n            console.error(\"Registration failed\", error);\n            setIsAuthenticated(false);\n            throw error;\n        }\n    };\n    // Axios interceptor to handle 401 errors\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const interceptor = axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].interceptors.response.use((response)=>response, (error)=>{\n            if (error.response && error.response.status === 401) {\n                setIsAuthenticated(false);\n            // Optionally redirect to login page\n            // router.push('/login');\n            }\n            return Promise.reject(error);\n        });\n        return ()=>{\n            axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].interceptors.response.eject(interceptor);\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            isAuthenticated,\n            login,\n            logout,\n            register\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/chidionyema/Documents/code/ecommerce-frontend/src/context/AuthContext.tsx\",\n        lineNumber: 92,\n        columnNumber: 5\n    }, undefined);\n};\n_s(AuthProvider, \"EGTiLDKWNMvtouyvOdXyeA8S950=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = AuthProvider;\nconst useAuth = ()=>{\n    _s1();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s1(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dHN4PzZlZTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIFJlYWN0Tm9kZSwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbmludGVyZmFjZSBBdXRoQ29udGV4dFByb3BzIHtcbiAgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuO1xuICBsb2dpbjogKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIGxvZ291dDogKCkgPT4gdm9pZDtcbiAgcmVnaXN0ZXI6IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xufVxuXG5jb25zdCBkZWZhdWx0QXV0aENvbnRleHQ6IEF1dGhDb250ZXh0UHJvcHMgPSB7XG4gIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXG4gIGxvZ2luOiBhc3luYyAoKSA9PiB7fSxcbiAgbG9nb3V0OiAoKSA9PiB7fSxcbiAgcmVnaXN0ZXI6IGFzeW5jICgpID0+IHt9LFxufTtcblxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFByb3BzPihkZWZhdWx0QXV0aENvbnRleHQpO1xuXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyOiBSZWFjdC5GQzx7IGNoaWxkcmVuOiBSZWFjdE5vZGUgfT4gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFtpc0F1dGhlbnRpY2F0ZWQsIHNldElzQXV0aGVudGljYXRlZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMO1xuXG4gIC8vIFJlbW92ZSB0aGUgdmVyaWZ5VG9rZW4gY2FsbFxuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xuICAvLyAgIGNvbnN0IGNoZWNrQXV0aCA9IGFzeW5jICgpID0+IHtcbiAgLy8gICAgIHRyeSB7XG4gIC8vICAgICAgIGF3YWl0IHZlcmlmeVRva2VuKCk7XG4gIC8vICAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcbiAgLy8gICAgIH0gY2F0Y2gge1xuICAvLyAgICAgICBzZXRJc0F1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAvLyAgICAgfVxuICAvLyAgIH07XG4gIC8vICAgY2hlY2tBdXRoKCk7XG4gIC8vIH0sIFtdKTtcblxuICBjb25zdCBsb2dpbiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoYCR7YXBpVXJsfS9hcGkvYXV0aGVudGljYXRpb24vbG9naW5gLCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9LCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGZhaWxlZCcsIGVycm9yKTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBheGlvcy5wb3N0KGAke2FwaVVybH0vYXBpL2F1dGhlbnRpY2F0aW9uL2xvZ291dGAsIHt9LCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICByb3V0ZXIucHVzaCgnL2xvZ2luJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvZ291dCBmYWlsZWQnLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgYXhpb3MucG9zdChgJHthcGlVcmx9L2FwaS9hdXRoZW50aWNhdGlvbi9yZWdpc3RlcmAsIHsgZW1haWwsIHBhc3N3b3JkLCB1c2VybmFtZSB9LCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgICAgIHNldElzQXV0aGVudGljYXRlZCh0cnVlKTtcbiAgICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1JlZ2lzdHJhdGlvbiBmYWlsZWQnLCBlcnJvcik7XG4gICAgICBzZXRJc0F1dGhlbnRpY2F0ZWQoZmFsc2UpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuXG4gIC8vIEF4aW9zIGludGVyY2VwdG9yIHRvIGhhbmRsZSA0MDEgZXJyb3JzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaW50ZXJjZXB0b3IgPSBheGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxuICAgICAgcmVzcG9uc2UgPT4gcmVzcG9uc2UsXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgIHNldElzQXV0aGVudGljYXRlZChmYWxzZSk7XG4gICAgICAgICAgLy8gT3B0aW9uYWxseSByZWRpcmVjdCB0byBsb2dpbiBwYWdlXG4gICAgICAgICAgLy8gcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmVqZWN0KGludGVyY2VwdG9yKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgaXNBdXRoZW50aWNhdGVkLCBsb2dpbiwgbG9nb3V0LCByZWdpc3RlciB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJheGlvcyIsInVzZVJvdXRlciIsImRlZmF1bHRBdXRoQ29udGV4dCIsImlzQXV0aGVudGljYXRlZCIsImxvZ2luIiwibG9nb3V0IiwicmVnaXN0ZXIiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwic2V0SXNBdXRoZW50aWNhdGVkIiwicm91dGVyIiwiYXBpVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicG9zdCIsIndpdGhDcmVkZW50aWFscyIsInB1c2giLCJlcnJvciIsImNvbnNvbGUiLCJlbWFpbCIsImludGVyY2VwdG9yIiwiaW50ZXJjZXB0b3JzIiwicmVzcG9uc2UiLCJ1c2UiLCJzdGF0dXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZWplY3QiLCJQcm92aWRlciIsInZhbHVlIiwidXNlQXV0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/context/AuthContext.tsx\n"));

/***/ })

});