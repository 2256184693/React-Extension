/**
 * 插件-新增一个包括常用代码模板的文件夹
 * Created By SH at 2019.10.31
 */


import * as vscode from 'vscode';

import {
  getFileType,
  getCssType,
  getFileName,
  getTempType,
  getTempList,
  updateTempList
} from './config';

import { 
  Settings,
  Template,
  SettingKeys,
  Options
} from './typings';

import { success, fail } from '../utils/tools';

import {
  creator
} from './template/creator';

/**
 * 通过Vscode默认配置快速创建模版
 * @param uri 新建模板的路径
 * @param settings Vscode的默认配置
 */
const fastCreate = (uri: vscode.Uri, settings: Settings) => {
  const {tempType, fileType, cssType} = settings;
  let template = getTempList().find(template => template.type = tempType) as Template;
  if(!template) {
    fail('找不到指定的模版');
  }
  getFileName({uri, template, fileType, cssType})
    .then(creator)
    .then(success, fail);
}

/**
 * 基本的新建方法
 * @param uri 新建模版的路径
 */
const defaultCreate = (uri: vscode.Uri) => {
  getTempType({uri}).then((args: Options) => {
    let template = args.template as Template;
    // 判断选择的模版的类型   1 default  2 *.json 3 directory
    if(template.key || (template.path && /\.json$/.test(template.path))) {
      getFileType(args)
        .then(getCssType)
        .then(getFileName)
        .then(creator)
        .then(success, fail);
    }else {
      getFileName(args)
        .then(creator)
        .then(success, fail);
    }
  })
}

const templateCreate = (uri: vscode.Uri) => {
  const settings = vscode.workspace.getConfiguration().get(SettingKeys.prefix) as Settings;
  
  // 同步用户设置中增加的模板列表
  updateTempList(settings.template);
  
  if(settings.autoCreate) {
    // 配置了快速新建
    fastCreate(uri, settings);
  }else {
    defaultCreate(uri);
  }
}

export const templateCreateCommand = (context: vscode.ExtensionContext) => {
  vscode.commands.registerCommand('extension.templateCreate', templateCreate);
}