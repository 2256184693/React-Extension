
import * as vscode from 'vscode';

import {
  templateCreateCommand
} from './create-template';

export function activate(context: vscode.ExtensionContext) {


	templateCreateCommand(context);
}

export function deactivate() {}
