/**
 * 模版生成
 * Created By SH at 2019.11.01
 */

import * as vscode from 'vscode';

import {
  Options,
  CompleteOptions,
  TemplateConfig,
} from '../typings';
import { copyDirectory, readFile, getFileConfig, handleLine, handleName } from '../config';
import { fail } from '../../utils/tools';

export const creator = async (opts: Options) => {
  
  let {
    uri,
    template,
    fileName
  } = opts as CompleteOptions;

  return new Promise(async (resolve, reject) => {
    if(template.key || (template.path && /\.json$/.test(template.path))) {
      // 创建目录
      await createDirectory(vscode.Uri.parse(`${uri.toString()}/${fileName}`)).catch(reject);
      let source;
      if(template.path) {
        source = vscode.Uri.parse(template.path);
      }else{
        source = vscode.Uri.parse(`${__dirname}/${template.key}.json`);
      }

      let tempInfoBuffer = await readFile(source).catch(reject) as Uint8Array;
      let fileConfigList = getFileConfig(tempInfoBuffer);
      createFiles(fileConfigList, opts as CompleteOptions).then(resolve, reject);
    }else {
      // TODO: 处理生成文件内部的一些预设常量
      let source = template.path;
      source && copyDirectory(vscode.Uri.parse(source), vscode.Uri.parse(`${uri.toString()}/${fileName}`)).then(resolve, reject);
    }
  });
}

const createDirectory = (uri: vscode.Uri) => {
  return new Promise((resolve, reject) => {
    vscode.workspace.fs.createDirectory(uri).then(() => {
      resolve();
    }, err => {
      reject();
      err && fail(err);
    });
  })
}

const createFiles = (configJson: TemplateConfig[], options: CompleteOptions) => {
  let { fileType, uri, fileName } = options;
  return new Promise((resolve, reject) => {
    configJson.forEach(async (fileConfig) => {
      let { name, body, type } = fileConfig;
      if (!type || type === fileType) {
        body = body.map(line => handleLine(line, options));
        let filePath = handleName(name, options);
        let fileUri = vscode.Uri.parse(`${uri.toString()}/${fileName}/${filePath}`);
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(body.join('\n'))).then(value => {}, reject);
      }
    });
    resolve();
  })
}