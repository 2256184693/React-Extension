/**
 * 插件-新增一个包括常用代码模板的文件夹
 * Created By SH at 2019.10.31
 */


import * as vscode from 'vscode';

import {
  Options
} from './typings';

import {
  getFileType,
  getCssType,
  getFileName,
  getTempType
} from './config';


import {
  creator
} from './template/creator';

const templateCreate = async (uri: vscode.Uri) => {
  getTempType([uri]).then(getFileType).then(getCssType).then(getFileName).then((args: Options) => {
    creator(args);
  }).catch((errorMsg: string) => {
    if(errorMsg) {
      vscode.window.showErrorMessage(`错误：${errorMsg}`);
    }
  });
}

const templateCreateCommand = (context: vscode.ExtensionContext) => {
  vscode.commands.registerCommand('extension.createReactTemplate', templateCreate);
}

export default templateCreateCommand;