"use strict";
/**
 * 模版生成
 * Created By SH at 2019.11.01
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
const typings_1 = require("../typings");
const default_json_1 = require("./default.json");
exports.creator = (options) => __awaiter(void 0, void 0, void 0, function* () {
    let [uri, tempType, fileType, cssType, fileName] = options;
    let directory = vscode.Uri.parse(`${uri.toString()}/${fileName}`);
    yield createDirectory(directory);
    let configJson = getConfigJson(tempType);
    yield createFiles(configJson, {
        fileType,
        cssType,
        fileName,
        directory
    });
    vscode.window.showInformationMessage(`新建成功`);
});
/**
 *  通过模版类型获取模版配置
 * @param tempType Template type
 */
const getConfigJson = (tempType) => {
    let data = null;
    switch (tempType) {
        case typings_1.TempType.Default: {
            data = default_json_1.default;
            break;
        }
        default: {
            data = default_json_1.default;
        }
    }
    return data;
};
const createDirectory = (uri) => {
    return new Promise((resolve, reject) => {
        vscode.workspace.fs.createDirectory(uri).then(() => {
            resolve();
        }, err => {
            reject();
            err && vscode.window.showErrorMessage(err.message);
        });
    });
};
const handleLine = (line, options) => {
    let { fileName, cssType } = options;
    return line.replace('$FILE_NAME', fileName).replace('[cssext]', cssType);
};
const handleName = (name, options) => {
    let { cssType } = options;
    return name.replace('[cssext]', cssType);
};
const createFiles = (configJson, options) => {
    let { fileType, directory } = options;
    configJson.forEach((fileConfig) => __awaiter(void 0, void 0, void 0, function* () {
        let { name, type, body } = fileConfig;
        if (!type || type === fileType) {
            body = body.map(line => handleLine(line, options));
            let filePath = handleName(name, options);
            let fileUri = vscode.Uri.parse(`${directory}/${filePath}`);
            yield vscode.workspace.fs.writeFile(fileUri, Buffer.from(body.join('\n'))).then(value => { }, err => {
                err && vscode.window.showErrorMessage(err.message);
            });
        }
    }));
};
//# sourceMappingURL=creator.js.map