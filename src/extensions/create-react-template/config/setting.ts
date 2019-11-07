import { TempType, FileType, CssType } from "../typings";

export default {
  prefix: 'react.extension.snippets',
  autoCreate: 'react.extension.snippets.autoCreate',
  tempType: 'react.extension.snippets.tempType',
  fileType: 'react.extension.snippets.fileType',
  cssType: 'react.extension.snippets.cssType'
};

export interface Settings {
  autoCreate: boolean;
  tempType: TempType;
  fileType: FileType;
  cssType: CssType;
}