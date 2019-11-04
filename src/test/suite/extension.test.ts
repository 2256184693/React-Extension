import * as assert from 'assert';

import * as vscode from 'vscode';

import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// const myExtension = require('../extension');
import {
  handleLine,
  handleName,
  CreateFileOptions
} from '../../extensions/create-react-template/template/creator';
import { CssType, FileType } from '../../extensions/create-react-template/typings';

suite('Create-React-Template插件测试', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('名称处理函数与行文本处理函数测试', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
    assert.equal(-1, [1, 2, 3].indexOf(0));
    let options: CreateFileOptions = {
      fileType: FileType.TYPESCRIPT,
      fileName: 'TestFileName',
      cssType: 'less' as CssType,
      directory: vscode.Uri.parse(`${__dirname}`)
    };
    assert.equal('index.less', handleName('index.[cssext]', options));
    assert.equal('index.less.d.ts', handleName('index.[cssext].d.ts', options));
    assert.equal('class TestFileName extends', handleLine('class $FILE_NAME extends', options));
    assert.equal(
      'class TestFileName extends React.Component<TestFileNameProps, TestFileNameState> {', 
      handleLine('class $FILE_NAME extends React.Component<$FILE_NAMEProps, $FILE_NAMEState> {', options)
    );
	});
});
