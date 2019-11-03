"use strict";
/**
 * 插件-新增一个包括常用代码模板的文件夹
 * Created By SH at 2019.10.31
 */
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
const config_1 = require("./config");
const creator_1 = require("./template/creator");
const templateCreate = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.getTempType([uri]).then(config_1.getFileType).then(config_1.getCssType).then(config_1.getFileName).then((args) => {
        creator_1.creator(args);
    }).catch((errorMsg) => {
        if (errorMsg) {
            vscode.window.showErrorMessage(`错误：${errorMsg}`);
        }
    });
});
const templateCreateCommand = (context) => {
    vscode.commands.registerCommand('extension.createReactTemplate', templateCreate);
};
exports.default = templateCreateCommand;
//# sourceMappingURL=index.js.map