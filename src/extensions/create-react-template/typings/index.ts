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
  {name: 'default', title: '默认'}
];

export interface TempInfo {
  title: string;
  name: string;
  description?: string
}

export enum TempType {
  Default = 'default'
}

export type FileName = string;

export type Options = [vscode.Uri, TempType ?, FileType ?, CssType ?, FileName ?]

export type CompleteOptions = [vscode.Uri, TempType, FileType, CssType, FileName]