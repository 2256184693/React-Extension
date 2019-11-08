import * as vscode from 'vscode';

import {
  CssTypeList,
  FileName,
  FileTypeList,
  FileType,
  Options,
  TempType,
  Template,
  TemplateConfig,
  CompleteOptions
} from '../typings';
import { fail } from '../../utils/tools';

// 存储模版列表
let DefaultTemplateList: Template[] = [
  {key: 'default', type: '默认'},
  {key: 'component', type: '组件'},
  {key: 'functional', type: '函数组件'}
];

let TemplateList = [...DefaultTemplateList];

export const getTempList = () => {
  return TemplateList;
};

export const updateTempList = (customList: Template[]) => {
  TemplateList = customList.concat(DefaultTemplateList);
}

export const getTempType = (args: Options) => {
  let tempTypeList = TemplateList.map(template => template.type);
  return new Promise<Options>(async (resolve, reject) => {
    let tempType = await vscode.window.showQuickPick(tempTypeList, {
      placeHolder: '请选择模版类型'
    }) as (TempType | undefined);
    if(tempType === undefined) {
      reject();
    }else {
      let template = TemplateList.find(template => tempType === template.type) as Template;
      if(template) {
        resolve({...args, template} as Options);
      }else {
        fail({message: '模板不存在'});
        reject();
      }
    }
  });
}

export const getFileType = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let fileType = await vscode.window.showQuickPick([
      FileTypeList.TYPESCRIPT,
      FileTypeList.JAVASCRIPT
    ], {
      placeHolder: '请选择组件类型'
    }) as (FileType | undefined);
    if(fileType === undefined) {
      reject();
    }else {
      resolve({...args, fileType} as Options);
    }
  });
}

export const getCssType = (args: Options) => {
  return new Promise<Options>(async (resolve, reject) => {
    let cssType = await vscode.window.showQuickPick([
      CssTypeList.LESS,
      CssTypeList.SCSS
    ], {
      placeHolder: '请选择预处理器类型'
    }) as (FileType | undefined);
    if(cssType === undefined) {
      reject();
    }else {
      resolve({...args, cssType} as Options);
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
      resolve({...args, fileName} as Options);
    }
  })
}

export const copyDirectory = (source: vscode.Uri, target: vscode.Uri) => {
  return new Promise((resolve, reject) => {
    vscode.workspace.fs.copy(source, target, {overwrite: true}).then(resolve, err => {
      reject();
      fail(err);
    });
  });
}

export const readFile = (path: vscode.Uri) => {
  return new Promise((resolve, reject) => {
    vscode.workspace.fs.readFile(path).then(resolve, reject);
  });
}

export const getFileConfig = (buffer: Uint8Array) => {
  let bufferString = JSON.parse(buffer.toString());
  return (bufferString.fileList || []) as TemplateConfig[];
}

export const handleLine = (line: string, options: CompleteOptions) => {
  let { fileName, cssType } = options;
  return line.replace(/\$FILE_NAME/g, fileName).replace(/\[cssext\]/g, cssType);
}

export const handleName = (name: string, options: CompleteOptions) => {
  let { cssType } = options;
  return name.replace(/\[cssext\]/g, cssType);
}