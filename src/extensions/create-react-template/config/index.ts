import * as vscode from 'vscode';

import {
  CssType,
  FileName,
  FileType,
  Options,
  TempType,
  TempList,
  TempInfo
} from '../typings';

export const getTempType = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let tempTitle = await vscode.window.showQuickPick((() => {
      return TempList.map(tempInfo => tempInfo.title)
    })(), {
      placeHolder: '请选择模版类型'
    }) as (TempType | undefined);
    if(tempTitle === undefined) {
      reject();
    }else {
      let tempInfo = TempList.find(tempInfo => tempTitle === tempInfo.title) as TempInfo;
      resolve([...args, tempInfo.name] as Options);
    }
  });
}

export const getFileType = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let fileType = await vscode.window.showQuickPick([
      FileType.TYPESCRIPT,
      FileType.JAVASCRIPT
    ], {
      placeHolder: '请选择组件类型'
    }) as (FileType | undefined);
    if(fileType === undefined) {
      reject();
    }else {
      resolve([...args, fileType] as Options);
    }
  });
}

export const getCssType = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let cssType = await vscode.window.showQuickPick([
      CssType.LESS,
      CssType.SCSS
    ], {
      placeHolder: '请选择预处理器类型'
    }) as (FileType | undefined);
    if(cssType === undefined) {
      reject();
    }else {
      resolve([...args, cssType] as Options);
    }
  });
}

export const  getFileName = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let fileName: FileName | undefined = await vscode.window.showInputBox({placeHolder: '请输入文件夹名称'});
    if(fileName === '') {
      getFileName(args);
    }else if(fileName === undefined) {
      reject();
    }else {
      resolve([...args, fileName] as Options);
    }
  })
}