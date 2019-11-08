/**
 * tools
 */

import * as vscode from 'vscode';

export const successMessage = '新建成功！';

export const success = () => {
  vscode.window.showInformationMessage(successMessage);
}

export const fail = (err: any) => {
  if(typeof err === 'string') {
    vscode.window.showErrorMessage(err);
  }else {
    err && err.message && vscode.window.showErrorMessage(err.message);
  }
}