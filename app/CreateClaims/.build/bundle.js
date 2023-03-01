(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/CreateClaims/i18n/i18n.properties":
/*!*************************************************************!*\
  !*** ./build.definitions/CreateClaims/i18n/i18n.properties ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/AppUpdateFailure.js":
/*!******************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/AppUpdateFailure.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/CreateClaims/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/AppUpdateSuccess.js":
/*!******************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/AppUpdateSuccess.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/CreateClaims/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/CreateClaims/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/Claims_Cancel.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/Claims_Cancel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/DraftDiscardEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'Claims'
        },
        'OnSuccess': '/CreateClaims/Actions/CloseModalPage_Cancel.action'
      }
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/CloseModalPage_Cancel.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/Claims_CreateEntity.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/Claims_CreateEntity.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/Claims/Claims_CreateEntity.action',
      'Properties': {
        'OnSuccess': ''
      }
    }).then(result => {
      let newEntity = JSON.parse(result.data);
      return clientAPI.executeAction({
        'Name': '/CreateClaims/Actions/DraftSaveEntity.action',
        'Properties': {
          'Target': {
            'EntitySet': 'Claims',
            'ReadLink': newEntity['@odata.readLink']
          }
        }
      });
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Claims/Claims_CreateEntity.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/Claims_CreateReceipts.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/Claims_CreateReceipts.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
  let readLink = clientAPI.binding['@odata.readLink'];
  return clientAPI.executeAction({
    'Name': '/CreateClaims/Actions/Claims/Claims_CreateReceipts.action',
    'Properties': {
      'OnSuccess': ''
    }
  }).then(result => {
    let newEntity = JSON.parse(result.data);
    if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
      return clientAPI.executeAction({
        'Name': '/CreateClaims/Actions/Receipts/Receipts_UploadStream.action',
        'Properties': {
          'Target': {
            'ReadLink': newEntity['@odata.readLink']
          },
          'OnSuccess': ''
        }
      }).then(result => {
        return clientAPI.executeAction({
          'Name': '/CreateClaims/Actions/DraftSaveEntity.action',
          'Properties': {
            'Target': {
              'EntitySet': 'Claims',
              'ReadLink': readLink
            }
          }
        });
      });
    } else {
      return clientAPI.executeAction({
        'Name': '/CreateClaims/Actions/Receipts/Receipts_UploadStream.action',
        'Properties': {
          'Target': {
            'ReadLink': newEntity['@odata.readLink']
          }
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/Claims_DeleteConfirmation.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/Claims_DeleteConfirmation.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/CreateClaims/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/CreateClaims/Actions/Claims/Claims_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/Claims_UpdateEntity.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/Claims_UpdateEntity.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/Claims/Claims_UpdateEntity.action',
      'Properties': {
        'OnSuccess': ''
      }
    }).then(result => {
      return clientAPI.executeAction({
        'Name': '/CreateClaims/Actions/DraftSaveEntity.action',
        'Properties': {
          'Target': {
            'EntitySet': 'Claims'
          }
        }
      });
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Claims/Claims_UpdateEntity.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/NavToClaims_CreateReceipts.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/NavToClaims_CreateReceipts.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/DraftEditEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'Claims'
        },
        'OnSuccess': '/CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action'
      }
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Claims/NavToClaims_Edit.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Claims/NavToClaims_Edit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Claims')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/DraftEditEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'Claims'
        },
        'OnSuccess': '/CreateClaims/Actions/Claims/NavToClaims_Edit.action'
      }
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Claims/NavToClaims_Edit.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/OnWillUpdate.js":
/*!**************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/OnWillUpdate.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/CreateClaims/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Receipts/NavToReceipts_Edit.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Receipts/NavToReceipts_Edit.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Receipts')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/DraftEditEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'Receipts'
        },
        'OnSuccess': '/CreateClaims/Actions/Receipts/NavToReceipts_Edit.action'
      }
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Receipts/NavToReceipts_Edit.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_Cancel.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Receipts/Receipts_Cancel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Receipts')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/DraftDiscardEntity.action',
      'Properties': {
        'Target': {
          'EntitySet': 'Receipts'
        },
        'OnSuccess': '/CreateClaims/Actions/CloseModalPage_Cancel.action'
      }
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/CloseModalPage_Cancel.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_DeleteConfirmation.js":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Receipts/Receipts_DeleteConfirmation.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/CreateClaims/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/CreateClaims/Actions/Receipts/Receipts_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_UpdateEntity.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/Receipts/Receipts_UpdateEntity.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
  if (clientAPI.getODataProvider('/CreateClaims/Services/service1.service').isDraftEnabled('Receipts')) {
    return clientAPI.executeAction({
      'Name': '/CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action',
      'Properties': {
        'OnSuccess': ''
      }
    }).then(result => {
      return clientAPI.executeAction({
        'Name': '/CreateClaims/Actions/DraftSaveEntity.action',
        'Properties': {
          'Target': {
            'EntitySet': 'Receipts'
          }
        }
      });
    });
  } else {
    return clientAPI.executeAction('/CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Rules/ResetAppSettingsAndLogout.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Rules/ResetAppSettingsAndLogout.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/CreateClaims/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/CreateClaims/Styles/Styles.css":
/*!**********************************************************!*\
  !*** ./build.definitions/CreateClaims/Styles/Styles.css ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/CreateClaims/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/CreateClaims/Styles/Styles.less":
/*!***********************************************************!*\
  !*** ./build.definitions/CreateClaims/Styles/Styles.less ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/CreateClaims/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/CreateClaims/Styles/Styles.light.css":
/*!****************************************************************!*\
  !*** ./build.definitions/CreateClaims/Styles/Styles.light.css ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/CreateClaims/Styles/Styles.light.nss":
/*!****************************************************************!*\
  !*** ./build.definitions/CreateClaims/Styles/Styles.light.nss ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js */ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js":
/*!**********************************************************************************************************!*\
  !*** ./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/api.js ***!
  \**********************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!*****************************************************************************************************************************!*\
  !*** ./.node_modules_global/lib/node_modules/@sap/mdk-tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Claims/Claims_Create.page":
/*!************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Claims/Claims_Create.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CreateClaims/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CreateClaims/Rules/Claims/Claims_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Claims Detail","Controls":[{"Sections":[{"Controls":[{"Mode":"Date","_Name":"ClaimDate","Caption":"ClaimDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Provider","_Name":"Provider","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Amount","KeyboardType":"Number","_Name":"Amount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Comment","_Name":"Comment","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ClaimTypes_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Description}","ReturnValue":"{ID}","Target":{"EntitySet":"ClaimTypes","Service":"/CreateClaims/Services/service1.service"}},"_Name":"ClaimTypes_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_Create"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Claims/Claims_CreateReceipts.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Claims/Claims_CreateReceipts.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/CreateClaims/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/CreateClaims/Rules/Claims/Claims_CreateReceipts.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Receipts","Controls":[{"Sections":[{"Controls":[{"Caption":"ReceiptNumber","_Name":"ReceiptNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"ReceiptDate","Caption":"ReceiptDate","_Type":"Control.Type.FormCell.DatePicker"},{"AttachmentTitle":"Attachment","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":[],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"},{"Caption":"FileType","_Name":"FileType","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_CreateReceipts"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Claims/Claims_Detail.page":
/*!************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Claims/Claims_Detail.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Claims Detail","DesignTimeTarget":{"Service":"/CreateClaims/Services/service1.service","EntitySet":"Claims","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CreateClaims/Rules/Claims/NavToClaims_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CreateClaims/Actions/Claims/Claims_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ClaimTypes_ID}","Subhead":"{ClaimDate}","BodyText":"","Footnote":"{Amount}","Description":"{Provider}","StatusText":"{Comment}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ClaimDate","Value":"{ClaimDate}"},{"KeyName":"Provider","Value":"{Provider}"},{"KeyName":"Amount","Value":"{Amount}"},{"KeyName":"Comment","Value":"{Comment}"},{"KeyName":"ClaimTypes_ID","Value":"{ClaimTypes_ID}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"ClaimReceipts"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{FileType}","AvatarStack":{"Avatars":[{"Image":"/CreateClaims/Services/service1.service/{@odata.readLink}/Attachment"}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ReceiptNumber}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{ReceiptDate}","SubstatusText":"","OnPress":"/CreateClaims/Actions/Receipts/NavToReceipts_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/ClaimReceipts","Service":"/CreateClaims/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Receipts"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Claims_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Claims/Claims_Edit.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Claims/Claims_Edit.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Claims Detail","DesignTimeTarget":{"Service":"/CreateClaims/Services/service1.service","EntitySet":"Claims","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CreateClaims/Rules/Claims/Claims_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CreateClaims/Rules/Claims/Claims_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Mode":"Date","_Name":"ClaimDate","Value":"{ClaimDate}","Caption":"ClaimDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Provider","_Name":"Provider","Value":"{Provider}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Amount","_Name":"Amount","Value":"{Amount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Comment","_Name":"Comment","Value":"{Comment}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ClaimTypes_ID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Description}","ReturnValue":"{ID}","Target":{"EntitySet":"ClaimTypes","Service":"/CreateClaims/Services/service1.service"}},"Value":"{ClaimTypes_ID}","_Name":"ClaimTypes_ID","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Claims_Edit"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Claims/Claims_List.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Claims/Claims_List.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Claims","ActionBar":{"Items":[{"OnPress":"/CreateClaims/Actions/Claims/NavToClaims_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Provider}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/CreateClaims/Actions/Claims/NavToClaims_Detail.action","StatusImage":"","Title":"{ClaimTypes_ID}","Footnote":"{Amount}","PreserveIconStackSpacing":false,"StatusText":"{Comment}","Subhead":"{ClaimDate}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Claims","Service":"/CreateClaims/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/CreateClaims/Actions/Logout.action"}]},"_Name":"Claims_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Receipts/Receipts_Detail.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Receipts/Receipts_Detail.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Receipts Detail","DesignTimeTarget":{"Service":"/CreateClaims/Services/service1.service","EntitySet":"Receipts","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/CreateClaims/Rules/Receipts/NavToReceipts_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/CreateClaims/Actions/Receipts/Receipts_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/CreateClaims/Services/service1.service/{@odata.readLink}/Attachment","HeadlineText":"{ReceiptNumber}","Subhead":"{ReceiptDate}","BodyText":"","Footnote":"","Description":"{FileType}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ReceiptNumber","Value":"{ReceiptNumber}"},{"KeyName":"ReceiptDate","Value":"{ReceiptDate}"},{"KeyName":"FileType","Value":"{FileType}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Receipts_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/CreateClaims/Pages/Receipts/Receipts_Edit.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Pages/Receipts/Receipts_Edit.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Receipts Detail","DesignTimeTarget":{"Service":"/CreateClaims/Services/service1.service","EntitySet":"Receipts","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/CreateClaims/Rules/Receipts/Receipts_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/CreateClaims/Rules/Receipts/Receipts_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"ReceiptNumber","_Name":"ReceiptNumber","Value":"{ReceiptNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"ReceiptDate","Value":"{ReceiptDate}","Caption":"ReceiptDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"FileType","_Name":"FileType","Value":"{FileType}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Receipts_Edit"}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"CreateClaims","Version":"/CreateClaims/Globals/AppDefinition_Version.global","MainPage":"/CreateClaims/Pages/Claims/Claims_List.page","OnLaunch":["/CreateClaims/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/CreateClaims/Rules/OnWillUpdate.js","OnDidUpdate":"/CreateClaims/Actions/Service/InitializeOnline.action","Styles":"/CreateClaims/Styles/Styles.css","Localization":"/CreateClaims/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/CreateClaims/Styles/Styles.light.css","ios":"/CreateClaims/Styles/Styles.light.nss","android":"/CreateClaims/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/CreateClaims/Styles/Styles.light.nss","android":"/CreateClaims/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/AppUpdate.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/AppUpdate.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/CreateClaims/Rules/AppUpdateFailure.js","OnSuccess":"/CreateClaims/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/AppUpdateFailureMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/AppUpdateFailureMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/AppUpdateProgressBanner.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/AppUpdateProgressBanner.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/CreateClaims/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/AppUpdateSuccessMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/AppUpdateSuccessMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/Claims_CreateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/Claims_CreateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/CreateClaims/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CreateClaims/Actions/CreateEntitySuccessMessage.action","Properties":{"ClaimDate":"#Control:ClaimDate/#Value","Provider":"#Control:Provider/#Value","Amount":"#Control:Amount/#Value","Comment":"#Control:Comment/#Value","ClaimTypes_ID":"#Control:ClaimTypes_ID/#SelectedValue"},"Target":{"EntitySet":"Claims","Service":"/CreateClaims/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/Claims_CreateReceipts.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/Claims_CreateReceipts.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"ClaimReceipts","Target":{"EntitySet":"Claims","ReadLink":"{@odata.readLink}"}},"OnFailure":"/CreateClaims/Actions/CreateEntityFailureMessage.action","OnSuccess":"/CreateClaims/Actions/CreateEntitySuccessMessage.action","Properties":{"ReceiptNumber":"#Control:ReceiptNumber/#Value","ReceiptDate":"#Control:ReceiptDate/#Value","FileType":"#Control:FileType/#Value"},"Target":{"EntitySet":"Receipts","Service":"/CreateClaims/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/Claims_DeleteEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/Claims_DeleteEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Claims","Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CreateClaims/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CreateClaims/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/Claims_DetailPopover.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/Claims_DetailPopover.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Receipts","OnPress":"/CreateClaims/Rules/Claims/NavToClaims_CreateReceipts.js"},{"Title":"Delete","OnPress":"/CreateClaims/Rules/Claims/Claims_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/Claims_UpdateEntity.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/Claims_UpdateEntity.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Claims","Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ClaimDate":"#Control:ClaimDate/#Value","Provider":"#Control:Provider/#Value","Amount":"#Control:Amount/#Value","Comment":"#Control:Comment/#Value","ClaimTypes_ID":"#Control:ClaimTypes_ID/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CreateClaims/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CreateClaims/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Create.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Create.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CreateClaims/Pages/Claims/Claims_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CreateClaims/Pages/Claims/Claims_CreateReceipts.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Detail.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Detail.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CreateClaims/Pages/Claims/Claims_Detail.page"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Edit.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Edit.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CreateClaims/Pages/Claims/Claims_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_List.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Claims/NavToClaims_List.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CreateClaims/Pages/Claims/Claims_List.page"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/CloseModalPage_Cancel.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/CloseModalPage_Cancel.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/CloseModalPage_Complete.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/CloseModalPage_Complete.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/ClosePage.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/ClosePage.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/CreateEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/CreateEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/CreateEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/CreateEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/CreateClaims/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DeleteConfirmation.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DeleteConfirmation.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DeleteEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DeleteEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DeleteEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DeleteEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/CreateClaims/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DraftDiscardEntity.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DraftDiscardEntity.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CreateClaims/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/CreateClaims/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DraftEditEntity.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DraftEditEntity.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CreateClaims/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/CreateClaims/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/DraftSaveEntity.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/DraftSaveEntity.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/CreateClaims/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/CreateClaims/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Logout.action":
/*!**************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Logout.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/LogoutMessage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/LogoutMessage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/CreateClaims/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/OnWillUpdate.action":
/*!********************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/OnWillUpdate.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Detail.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Detail.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/CreateClaims/Pages/Receipts/Receipts_Detail.page"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Edit.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Edit.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/CreateClaims/Pages/Receipts/Receipts_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_DeleteEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/Receipts_DeleteEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Receipts","Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/CreateClaims/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/CreateClaims/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_DetailPopover.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/Receipts_DetailPopover.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/CreateClaims/Actions/Receipts/Receipts_OpenDocument.action"},{"Title":"Delete","OnPress":"/CreateClaims/Rules/Receipts/Receipts_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_OpenDocument.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/Receipts_OpenDocument.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/CreateClaims/Services/service1.service/{@odata.readLink}/Attachment","MimeType":"{FileType}"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Receipts","Service":"/CreateClaims/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"ReceiptNumber":"#Control:ReceiptNumber/#Value","ReceiptDate":"#Control:ReceiptDate/#Value","FileType":"#Control:FileType/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/CreateClaims/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/CreateClaims/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_UploadStream.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Receipts/Receipts_UploadStream.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UploadStream","Target":{"Service":"/CreateClaims/Services/service1.service","EntitySet":"Receipts","ReadLink":"{@odata.readLink}"},"Properties":{"Attachment":"#Control:Attachment/#Value"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"uploadstream"},"OnSuccess":"/CreateClaims/Actions/UploadStreamSuccessMessage.action","OnFailure":"/CreateClaims/Actions/UploadStreamFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Service/InitializeOnline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Service/InitializeOnline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/CreateClaims/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/CreateClaims/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/CreateClaims/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Service/InitializeOnlineFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/UpdateEntityFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/UpdateEntityFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/UpdateEntitySuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/UpdateEntitySuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/CreateClaims/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/UploadStreamFailureMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/UploadStreamFailureMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload stream failure - {#ActionResults:uploadstream/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Actions/UploadStreamSuccessMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Actions/UploadStreamSuccessMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Stream uploaded","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/CreateClaims/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Globals/AppDefinition_Version.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/CreateClaims/Globals/AppDefinition_Version.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/CreateClaims/Services/service1.service":
/*!******************************************************************!*\
  !*** ./build.definitions/CreateClaims/Services/service1.service ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"BenefitsApplicationService","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/CreateClaims/Styles/Styles.light.json":
/*!*****************************************************************!*\
  !*** ./build.definitions/CreateClaims/Styles/Styles.light.json ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/CreateClaims/jsconfig.json":
/*!******************************************************!*\
  !*** ./build.definitions/CreateClaims/jsconfig.json ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let createclaims_actions_appupdate_action = __webpack_require__(/*! ./CreateClaims/Actions/AppUpdate.action */ "./build.definitions/CreateClaims/Actions/AppUpdate.action")
let createclaims_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/AppUpdateFailureMessage.action */ "./build.definitions/CreateClaims/Actions/AppUpdateFailureMessage.action")
let createclaims_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./CreateClaims/Actions/AppUpdateProgressBanner.action */ "./build.definitions/CreateClaims/Actions/AppUpdateProgressBanner.action")
let createclaims_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/CreateClaims/Actions/AppUpdateSuccessMessage.action")
let createclaims_actions_claims_claims_createentity_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/Claims_CreateEntity.action */ "./build.definitions/CreateClaims/Actions/Claims/Claims_CreateEntity.action")
let createclaims_actions_claims_claims_createreceipts_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/Claims_CreateReceipts.action */ "./build.definitions/CreateClaims/Actions/Claims/Claims_CreateReceipts.action")
let createclaims_actions_claims_claims_deleteentity_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/Claims_DeleteEntity.action */ "./build.definitions/CreateClaims/Actions/Claims/Claims_DeleteEntity.action")
let createclaims_actions_claims_claims_detailpopover_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/Claims_DetailPopover.action */ "./build.definitions/CreateClaims/Actions/Claims/Claims_DetailPopover.action")
let createclaims_actions_claims_claims_updateentity_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/Claims_UpdateEntity.action */ "./build.definitions/CreateClaims/Actions/Claims/Claims_UpdateEntity.action")
let createclaims_actions_claims_navtoclaims_create_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/NavToClaims_Create.action */ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Create.action")
let createclaims_actions_claims_navtoclaims_createreceipts_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action */ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_CreateReceipts.action")
let createclaims_actions_claims_navtoclaims_detail_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/NavToClaims_Detail.action */ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Detail.action")
let createclaims_actions_claims_navtoclaims_edit_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/NavToClaims_Edit.action */ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_Edit.action")
let createclaims_actions_claims_navtoclaims_list_action = __webpack_require__(/*! ./CreateClaims/Actions/Claims/NavToClaims_List.action */ "./build.definitions/CreateClaims/Actions/Claims/NavToClaims_List.action")
let createclaims_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./CreateClaims/Actions/CloseModalPage_Cancel.action */ "./build.definitions/CreateClaims/Actions/CloseModalPage_Cancel.action")
let createclaims_actions_closemodalpage_complete_action = __webpack_require__(/*! ./CreateClaims/Actions/CloseModalPage_Complete.action */ "./build.definitions/CreateClaims/Actions/CloseModalPage_Complete.action")
let createclaims_actions_closepage_action = __webpack_require__(/*! ./CreateClaims/Actions/ClosePage.action */ "./build.definitions/CreateClaims/Actions/ClosePage.action")
let createclaims_actions_createentityfailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/CreateEntityFailureMessage.action */ "./build.definitions/CreateClaims/Actions/CreateEntityFailureMessage.action")
let createclaims_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/CreateClaims/Actions/CreateEntitySuccessMessage.action")
let createclaims_actions_deleteconfirmation_action = __webpack_require__(/*! ./CreateClaims/Actions/DeleteConfirmation.action */ "./build.definitions/CreateClaims/Actions/DeleteConfirmation.action")
let createclaims_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/CreateClaims/Actions/DeleteEntityFailureMessage.action")
let createclaims_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/CreateClaims/Actions/DeleteEntitySuccessMessage.action")
let createclaims_actions_draftdiscardentity_action = __webpack_require__(/*! ./CreateClaims/Actions/DraftDiscardEntity.action */ "./build.definitions/CreateClaims/Actions/DraftDiscardEntity.action")
let createclaims_actions_drafteditentity_action = __webpack_require__(/*! ./CreateClaims/Actions/DraftEditEntity.action */ "./build.definitions/CreateClaims/Actions/DraftEditEntity.action")
let createclaims_actions_draftsaveentity_action = __webpack_require__(/*! ./CreateClaims/Actions/DraftSaveEntity.action */ "./build.definitions/CreateClaims/Actions/DraftSaveEntity.action")
let createclaims_actions_logout_action = __webpack_require__(/*! ./CreateClaims/Actions/Logout.action */ "./build.definitions/CreateClaims/Actions/Logout.action")
let createclaims_actions_logoutmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/LogoutMessage.action */ "./build.definitions/CreateClaims/Actions/LogoutMessage.action")
let createclaims_actions_onwillupdate_action = __webpack_require__(/*! ./CreateClaims/Actions/OnWillUpdate.action */ "./build.definitions/CreateClaims/Actions/OnWillUpdate.action")
let createclaims_actions_receipts_navtoreceipts_detail_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/NavToReceipts_Detail.action */ "./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Detail.action")
let createclaims_actions_receipts_navtoreceipts_edit_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/NavToReceipts_Edit.action */ "./build.definitions/CreateClaims/Actions/Receipts/NavToReceipts_Edit.action")
let createclaims_actions_receipts_receipts_deleteentity_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/Receipts_DeleteEntity.action */ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_DeleteEntity.action")
let createclaims_actions_receipts_receipts_detailpopover_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/Receipts_DetailPopover.action */ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_DetailPopover.action")
let createclaims_actions_receipts_receipts_opendocument_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/Receipts_OpenDocument.action */ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_OpenDocument.action")
let createclaims_actions_receipts_receipts_updateentity_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action */ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_UpdateEntity.action")
let createclaims_actions_receipts_receipts_uploadstream_action = __webpack_require__(/*! ./CreateClaims/Actions/Receipts/Receipts_UploadStream.action */ "./build.definitions/CreateClaims/Actions/Receipts/Receipts_UploadStream.action")
let createclaims_actions_service_initializeonline_action = __webpack_require__(/*! ./CreateClaims/Actions/Service/InitializeOnline.action */ "./build.definitions/CreateClaims/Actions/Service/InitializeOnline.action")
let createclaims_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/CreateClaims/Actions/Service/InitializeOnlineFailureMessage.action")
let createclaims_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/CreateClaims/Actions/Service/InitializeOnlineSuccessMessage.action")
let createclaims_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/CreateClaims/Actions/UpdateEntityFailureMessage.action")
let createclaims_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/CreateClaims/Actions/UpdateEntitySuccessMessage.action")
let createclaims_actions_uploadstreamfailuremessage_action = __webpack_require__(/*! ./CreateClaims/Actions/UploadStreamFailureMessage.action */ "./build.definitions/CreateClaims/Actions/UploadStreamFailureMessage.action")
let createclaims_actions_uploadstreamsuccessmessage_action = __webpack_require__(/*! ./CreateClaims/Actions/UploadStreamSuccessMessage.action */ "./build.definitions/CreateClaims/Actions/UploadStreamSuccessMessage.action")
let createclaims_globals_appdefinition_version_global = __webpack_require__(/*! ./CreateClaims/Globals/AppDefinition_Version.global */ "./build.definitions/CreateClaims/Globals/AppDefinition_Version.global")
let createclaims_i18n_i18n_properties = __webpack_require__(/*! ./CreateClaims/i18n/i18n.properties */ "./build.definitions/CreateClaims/i18n/i18n.properties")
let createclaims_jsconfig_json = __webpack_require__(/*! ./CreateClaims/jsconfig.json */ "./build.definitions/CreateClaims/jsconfig.json")
let createclaims_pages_claims_claims_create_page = __webpack_require__(/*! ./CreateClaims/Pages/Claims/Claims_Create.page */ "./build.definitions/CreateClaims/Pages/Claims/Claims_Create.page")
let createclaims_pages_claims_claims_createreceipts_page = __webpack_require__(/*! ./CreateClaims/Pages/Claims/Claims_CreateReceipts.page */ "./build.definitions/CreateClaims/Pages/Claims/Claims_CreateReceipts.page")
let createclaims_pages_claims_claims_detail_page = __webpack_require__(/*! ./CreateClaims/Pages/Claims/Claims_Detail.page */ "./build.definitions/CreateClaims/Pages/Claims/Claims_Detail.page")
let createclaims_pages_claims_claims_edit_page = __webpack_require__(/*! ./CreateClaims/Pages/Claims/Claims_Edit.page */ "./build.definitions/CreateClaims/Pages/Claims/Claims_Edit.page")
let createclaims_pages_claims_claims_list_page = __webpack_require__(/*! ./CreateClaims/Pages/Claims/Claims_List.page */ "./build.definitions/CreateClaims/Pages/Claims/Claims_List.page")
let createclaims_pages_receipts_receipts_detail_page = __webpack_require__(/*! ./CreateClaims/Pages/Receipts/Receipts_Detail.page */ "./build.definitions/CreateClaims/Pages/Receipts/Receipts_Detail.page")
let createclaims_pages_receipts_receipts_edit_page = __webpack_require__(/*! ./CreateClaims/Pages/Receipts/Receipts_Edit.page */ "./build.definitions/CreateClaims/Pages/Receipts/Receipts_Edit.page")
let createclaims_rules_appupdatefailure_js = __webpack_require__(/*! ./CreateClaims/Rules/AppUpdateFailure.js */ "./build.definitions/CreateClaims/Rules/AppUpdateFailure.js")
let createclaims_rules_appupdatesuccess_js = __webpack_require__(/*! ./CreateClaims/Rules/AppUpdateSuccess.js */ "./build.definitions/CreateClaims/Rules/AppUpdateSuccess.js")
let createclaims_rules_claims_claims_cancel_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/Claims_Cancel.js */ "./build.definitions/CreateClaims/Rules/Claims/Claims_Cancel.js")
let createclaims_rules_claims_claims_createentity_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/Claims_CreateEntity.js */ "./build.definitions/CreateClaims/Rules/Claims/Claims_CreateEntity.js")
let createclaims_rules_claims_claims_createreceipts_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/Claims_CreateReceipts.js */ "./build.definitions/CreateClaims/Rules/Claims/Claims_CreateReceipts.js")
let createclaims_rules_claims_claims_deleteconfirmation_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/Claims_DeleteConfirmation.js */ "./build.definitions/CreateClaims/Rules/Claims/Claims_DeleteConfirmation.js")
let createclaims_rules_claims_claims_updateentity_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/Claims_UpdateEntity.js */ "./build.definitions/CreateClaims/Rules/Claims/Claims_UpdateEntity.js")
let createclaims_rules_claims_navtoclaims_createreceipts_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/NavToClaims_CreateReceipts.js */ "./build.definitions/CreateClaims/Rules/Claims/NavToClaims_CreateReceipts.js")
let createclaims_rules_claims_navtoclaims_edit_js = __webpack_require__(/*! ./CreateClaims/Rules/Claims/NavToClaims_Edit.js */ "./build.definitions/CreateClaims/Rules/Claims/NavToClaims_Edit.js")
let createclaims_rules_onwillupdate_js = __webpack_require__(/*! ./CreateClaims/Rules/OnWillUpdate.js */ "./build.definitions/CreateClaims/Rules/OnWillUpdate.js")
let createclaims_rules_receipts_navtoreceipts_edit_js = __webpack_require__(/*! ./CreateClaims/Rules/Receipts/NavToReceipts_Edit.js */ "./build.definitions/CreateClaims/Rules/Receipts/NavToReceipts_Edit.js")
let createclaims_rules_receipts_receipts_cancel_js = __webpack_require__(/*! ./CreateClaims/Rules/Receipts/Receipts_Cancel.js */ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_Cancel.js")
let createclaims_rules_receipts_receipts_deleteconfirmation_js = __webpack_require__(/*! ./CreateClaims/Rules/Receipts/Receipts_DeleteConfirmation.js */ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_DeleteConfirmation.js")
let createclaims_rules_receipts_receipts_updateentity_js = __webpack_require__(/*! ./CreateClaims/Rules/Receipts/Receipts_UpdateEntity.js */ "./build.definitions/CreateClaims/Rules/Receipts/Receipts_UpdateEntity.js")
let createclaims_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./CreateClaims/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/CreateClaims/Rules/ResetAppSettingsAndLogout.js")
let createclaims_services_service1_service = __webpack_require__(/*! ./CreateClaims/Services/service1.service */ "./build.definitions/CreateClaims/Services/service1.service")
let createclaims_styles_styles_css = __webpack_require__(/*! ./CreateClaims/Styles/Styles.css */ "./build.definitions/CreateClaims/Styles/Styles.css")
let createclaims_styles_styles_less = __webpack_require__(/*! ./CreateClaims/Styles/Styles.less */ "./build.definitions/CreateClaims/Styles/Styles.less")
let createclaims_styles_styles_light_css = __webpack_require__(/*! ./CreateClaims/Styles/Styles.light.css */ "./build.definitions/CreateClaims/Styles/Styles.light.css")
let createclaims_styles_styles_light_json = __webpack_require__(/*! ./CreateClaims/Styles/Styles.light.json */ "./build.definitions/CreateClaims/Styles/Styles.light.json")
let createclaims_styles_styles_light_nss = __webpack_require__(/*! ./CreateClaims/Styles/Styles.light.nss */ "./build.definitions/CreateClaims/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	createclaims_actions_appupdate_action : createclaims_actions_appupdate_action,
	createclaims_actions_appupdatefailuremessage_action : createclaims_actions_appupdatefailuremessage_action,
	createclaims_actions_appupdateprogressbanner_action : createclaims_actions_appupdateprogressbanner_action,
	createclaims_actions_appupdatesuccessmessage_action : createclaims_actions_appupdatesuccessmessage_action,
	createclaims_actions_claims_claims_createentity_action : createclaims_actions_claims_claims_createentity_action,
	createclaims_actions_claims_claims_createreceipts_action : createclaims_actions_claims_claims_createreceipts_action,
	createclaims_actions_claims_claims_deleteentity_action : createclaims_actions_claims_claims_deleteentity_action,
	createclaims_actions_claims_claims_detailpopover_action : createclaims_actions_claims_claims_detailpopover_action,
	createclaims_actions_claims_claims_updateentity_action : createclaims_actions_claims_claims_updateentity_action,
	createclaims_actions_claims_navtoclaims_create_action : createclaims_actions_claims_navtoclaims_create_action,
	createclaims_actions_claims_navtoclaims_createreceipts_action : createclaims_actions_claims_navtoclaims_createreceipts_action,
	createclaims_actions_claims_navtoclaims_detail_action : createclaims_actions_claims_navtoclaims_detail_action,
	createclaims_actions_claims_navtoclaims_edit_action : createclaims_actions_claims_navtoclaims_edit_action,
	createclaims_actions_claims_navtoclaims_list_action : createclaims_actions_claims_navtoclaims_list_action,
	createclaims_actions_closemodalpage_cancel_action : createclaims_actions_closemodalpage_cancel_action,
	createclaims_actions_closemodalpage_complete_action : createclaims_actions_closemodalpage_complete_action,
	createclaims_actions_closepage_action : createclaims_actions_closepage_action,
	createclaims_actions_createentityfailuremessage_action : createclaims_actions_createentityfailuremessage_action,
	createclaims_actions_createentitysuccessmessage_action : createclaims_actions_createentitysuccessmessage_action,
	createclaims_actions_deleteconfirmation_action : createclaims_actions_deleteconfirmation_action,
	createclaims_actions_deleteentityfailuremessage_action : createclaims_actions_deleteentityfailuremessage_action,
	createclaims_actions_deleteentitysuccessmessage_action : createclaims_actions_deleteentitysuccessmessage_action,
	createclaims_actions_draftdiscardentity_action : createclaims_actions_draftdiscardentity_action,
	createclaims_actions_drafteditentity_action : createclaims_actions_drafteditentity_action,
	createclaims_actions_draftsaveentity_action : createclaims_actions_draftsaveentity_action,
	createclaims_actions_logout_action : createclaims_actions_logout_action,
	createclaims_actions_logoutmessage_action : createclaims_actions_logoutmessage_action,
	createclaims_actions_onwillupdate_action : createclaims_actions_onwillupdate_action,
	createclaims_actions_receipts_navtoreceipts_detail_action : createclaims_actions_receipts_navtoreceipts_detail_action,
	createclaims_actions_receipts_navtoreceipts_edit_action : createclaims_actions_receipts_navtoreceipts_edit_action,
	createclaims_actions_receipts_receipts_deleteentity_action : createclaims_actions_receipts_receipts_deleteentity_action,
	createclaims_actions_receipts_receipts_detailpopover_action : createclaims_actions_receipts_receipts_detailpopover_action,
	createclaims_actions_receipts_receipts_opendocument_action : createclaims_actions_receipts_receipts_opendocument_action,
	createclaims_actions_receipts_receipts_updateentity_action : createclaims_actions_receipts_receipts_updateentity_action,
	createclaims_actions_receipts_receipts_uploadstream_action : createclaims_actions_receipts_receipts_uploadstream_action,
	createclaims_actions_service_initializeonline_action : createclaims_actions_service_initializeonline_action,
	createclaims_actions_service_initializeonlinefailuremessage_action : createclaims_actions_service_initializeonlinefailuremessage_action,
	createclaims_actions_service_initializeonlinesuccessmessage_action : createclaims_actions_service_initializeonlinesuccessmessage_action,
	createclaims_actions_updateentityfailuremessage_action : createclaims_actions_updateentityfailuremessage_action,
	createclaims_actions_updateentitysuccessmessage_action : createclaims_actions_updateentitysuccessmessage_action,
	createclaims_actions_uploadstreamfailuremessage_action : createclaims_actions_uploadstreamfailuremessage_action,
	createclaims_actions_uploadstreamsuccessmessage_action : createclaims_actions_uploadstreamsuccessmessage_action,
	createclaims_globals_appdefinition_version_global : createclaims_globals_appdefinition_version_global,
	createclaims_i18n_i18n_properties : createclaims_i18n_i18n_properties,
	createclaims_jsconfig_json : createclaims_jsconfig_json,
	createclaims_pages_claims_claims_create_page : createclaims_pages_claims_claims_create_page,
	createclaims_pages_claims_claims_createreceipts_page : createclaims_pages_claims_claims_createreceipts_page,
	createclaims_pages_claims_claims_detail_page : createclaims_pages_claims_claims_detail_page,
	createclaims_pages_claims_claims_edit_page : createclaims_pages_claims_claims_edit_page,
	createclaims_pages_claims_claims_list_page : createclaims_pages_claims_claims_list_page,
	createclaims_pages_receipts_receipts_detail_page : createclaims_pages_receipts_receipts_detail_page,
	createclaims_pages_receipts_receipts_edit_page : createclaims_pages_receipts_receipts_edit_page,
	createclaims_rules_appupdatefailure_js : createclaims_rules_appupdatefailure_js,
	createclaims_rules_appupdatesuccess_js : createclaims_rules_appupdatesuccess_js,
	createclaims_rules_claims_claims_cancel_js : createclaims_rules_claims_claims_cancel_js,
	createclaims_rules_claims_claims_createentity_js : createclaims_rules_claims_claims_createentity_js,
	createclaims_rules_claims_claims_createreceipts_js : createclaims_rules_claims_claims_createreceipts_js,
	createclaims_rules_claims_claims_deleteconfirmation_js : createclaims_rules_claims_claims_deleteconfirmation_js,
	createclaims_rules_claims_claims_updateentity_js : createclaims_rules_claims_claims_updateentity_js,
	createclaims_rules_claims_navtoclaims_createreceipts_js : createclaims_rules_claims_navtoclaims_createreceipts_js,
	createclaims_rules_claims_navtoclaims_edit_js : createclaims_rules_claims_navtoclaims_edit_js,
	createclaims_rules_onwillupdate_js : createclaims_rules_onwillupdate_js,
	createclaims_rules_receipts_navtoreceipts_edit_js : createclaims_rules_receipts_navtoreceipts_edit_js,
	createclaims_rules_receipts_receipts_cancel_js : createclaims_rules_receipts_receipts_cancel_js,
	createclaims_rules_receipts_receipts_deleteconfirmation_js : createclaims_rules_receipts_receipts_deleteconfirmation_js,
	createclaims_rules_receipts_receipts_updateentity_js : createclaims_rules_receipts_receipts_updateentity_js,
	createclaims_rules_resetappsettingsandlogout_js : createclaims_rules_resetappsettingsandlogout_js,
	createclaims_services_service1_service : createclaims_services_service1_service,
	createclaims_styles_styles_css : createclaims_styles_styles_css,
	createclaims_styles_styles_less : createclaims_styles_styles_less,
	createclaims_styles_styles_light_css : createclaims_styles_styles_light_css,
	createclaims_styles_styles_light_json : createclaims_styles_styles_light_json,
	createclaims_styles_styles_light_nss : createclaims_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map