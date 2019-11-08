import * as vscode from 'vscode';

export enum FileTypeList {
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript'
}

export enum CssTypeList {
  SCSS = 'scss',
  LESS = 'less',
}

export type FileType = string;

export type CssType = string;

export type TempType = string;

export type FileName = string;

export interface Options {
  uri: vscode.Uri;
  template?: Template;
  fileType?: FileType;
  cssType?: CssType;
  fileName?: FileName;
}

export interface CompleteOptions {
  uri: vscode.Uri;
  template: Template;
  fileType: FileType;
  cssType: CssType;
  fileName: FileName;
}

export interface Template {
  type: string;
  key: string;
  path?: string;
}

export interface Settings {
  autoCreate: boolean;
  tempType: TempType;
  fileType: FileType;
  cssType: CssType;
  template: Template[];
  defaultTemplate: string;
}

export enum SettingKeys {
  prefix = 'react.extension.snippets',
  autoCreate = 'autoCreate',
  tempType = 'tempType',
  fileType = 'fileType',
  cssType = 'cssType',
  template = 'template',
  defaultTemplate = 'defaultTemplate'
}

export interface TemplateConfig {
  name: string;
  body: string[]
  type?: FileType;
  cssType?: CssType;
}