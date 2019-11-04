import * as vscode from 'vscode';

export enum FileType {
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript'
}

export enum CssType {
  SCSS = 'scss',
  LESS = 'less',
}

export const TempList: TempInfo[] = [
  {name: 'default', title: '默认'},
  {name: 'component', title: '组件'},
  {name: 'functional', title: '函数组件'}
];

export interface TempInfo {
  title: string;
  name: string;
  description?: string
}

export enum TempType {
  Default = 'default',
  Component = 'component',
  Functional = 'functional'
}

export type FileName = string;

export type Options = [vscode.Uri, TempType ?, FileType ?, CssType ?, FileName ?]

export type CompleteOptions = [vscode.Uri, TempType, FileType, CssType, FileName]