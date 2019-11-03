"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const typings_1 = require("../typings");
exports.getTempType = (args) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let tempTitle = yield vscode.window.showQuickPick((() => {
            return typings_1.TempList.map(tempInfo => tempInfo.title);
        })(), {
            placeHolder: '请选择模版类型'
        });
        if (tempTitle === undefined) {
            reject();
        }
        else {
            let tempInfo = typings_1.TempList.find(tempInfo => tempTitle === tempInfo.title);
            resolve([...args, tempInfo.name]);
        }
    }));
};
exports.getFileType = (args) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let fileType = yield vscode.window.showQuickPick([
            typings_1.FileType.TYPESCRIPT,
            typings_1.FileType.JAVASCRIPT
        ], {
            placeHolder: '请选择组件类型'
        });
        if (fileType === undefined) {
            reject();
        }
        else {
            resolve([...args, fileType]);
        }
    }));
};
exports.getCssType = (args) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let cssType = yield vscode.window.showQuickPick([
            typings_1.CssType.LESS,
            typings_1.CssType.SCSS
        ], {
            placeHolder: '请选择预处理器类型'
        });
        if (cssType === undefined) {
            reject();
        }
        else {
            resolve([...args, cssType]);
        }
    }));
};
exports.getFileName = (args) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let fileName = yield vscode.window.showInputBox({ placeHolder: '请输入文件夹名称' });
        if (fileName === '') {
            exports.getFileName(args);
        }
        else if (fileName === undefined) {
            reject();
        }
        else {
            resolve([...args, fileName]);
        }
    }));
};
//# sourceMappingURL=index.js.map