import * as assert from 'assert';

import * as vscode from 'vscode';

import * as path from 'path';

import {
  FileTypeList,
  CompleteOptions,
  SettingKeys,
  Settings
} from '../../extensions/create-template/typings';
import {
  handleLine,
  handleName,
  updateTempList,
  getTempList
} from '../../extensions/create-template/config';

suite('Create-React-Template插件测试', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('名称处理函数与行文本处理函数测试', () => {
    let options: CompleteOptions = {
      fileType: FileTypeList.TYPESCRIPT,
      fileName: 'TestFileName',
      cssType: 'less',
      template: {type: '默认', key: 'default'},
      uri: vscode.Uri.parse(`${__dirname}`)
    };
    assert.equal('index.less', handleName('index.[cssext]', options));
    assert.equal('index.less.d.ts', handleName('index.[cssext].d.ts', options));
    assert.equal('class TestFileName extends', handleLine('class $FILE_NAME extends', options));
    assert.equal(
      'class TestFileName extends React.Component<TestFileNameProps, TestFileNameState> {', 
      handleLine('class $FILE_NAME extends React.Component<$FILE_NAMEProps, $FILE_NAMEState> {', options)
    );
  });
  
  test('模版加载列表测试', () => {
    let defaultL = getTempList().length;
    const settings = vscode.workspace.getConfiguration().get(SettingKeys.prefix) as Settings;
    let customL = settings.template.length;
    updateTempList(settings.template);
    assert.equal(defaultL + customL, getTempList().length);
  });
});
