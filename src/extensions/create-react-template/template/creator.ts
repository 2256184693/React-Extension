/**
 * 模版生成
 * Created By SH at 2019.11.01
 */

import * as vscode from 'vscode';

import {
  Options,
  TempType,
  FileType,
  FileName,
  CssType,
  CompleteOptions,
} from '../typings';

import defaultJson from './default.json';

interface FileConfig {
  name: string;
  body: string[]
  type?: FileType;
}

interface CreateFileOptions {
  fileType: FileType;
  cssType: CssType;
  fileName: FileName;
  directory: vscode.Uri;
}

export const creator = async (options: Options) => {
  let [uri, tempType, fileType, cssType, fileName] = options as CompleteOptions;

  let directory: vscode.Uri = vscode.Uri.parse(`${uri.toString()}/${fileName}`);

  await createDirectory(directory);

  let configJson = getConfigJson(tempType as TempType);

  await createFiles(configJson, {
    fileType,
    cssType,
    fileName,
    directory
  });
  vscode.window.showInformationMessage(`新建成功`);
}

/**
 *  通过模版类型获取模版配置
 * @param tempType Template type
 */
const getConfigJson = (tempType: TempType) => {
  let data = null;
  switch (tempType) {
    case TempType.Default: {
      data = defaultJson;
      break;
    }
    default: {
      data = defaultJson;
    }
  }
  return data as FileConfig[];
}

const createDirectory = (uri: vscode.Uri) => {
  return new Promise((resolve, reject) => {
    vscode.workspace.fs.createDirectory(uri).then(() => {
      resolve();
    }, err => {
      reject();
      err && vscode.window.showErrorMessage(err.message);
    });
  })
}

const handleLine = (line: string, options: CreateFileOptions) => {
  let { fileName, cssType } = options;
  return line.replace('$FILE_NAME', fileName).replace('[cssext]', cssType);
}

const handleName = (name: string, options: CreateFileOptions) => {
  let { cssType } = options;
  return name.replace('[cssext]', cssType);
}

const createFiles = (configJson: FileConfig[], options: CreateFileOptions) => {
  let { fileType, directory } = options;
  configJson.forEach(async (fileConfig) => {
    let { name, type, body } = fileConfig;
    if (!type || type === fileType) {
      body = body.map(line => handleLine(line, options));
      let filePath = handleName(name, options);
      let fileUri = vscode.Uri.parse(`${directory}/${filePath}`);
      await vscode.workspace.fs.writeFile(fileUri, Buffer.from(body.join('\n'))).then(value => {}, err => {
        err && vscode.window.showErrorMessage(err.message);
      });
    }
  });
}