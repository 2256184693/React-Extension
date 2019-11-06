import { TempType, FileType, CssType } from "../typings";

export default {
  prefix: 'mobx.snippets',
  autoCreate: 'mobx.snippets.autoCreate',
  tempType: 'mobx.snippets.tempType',
  fileType: 'mobx.snippets.fileType',
  cssType: 'mobx.snippets.cssType'
};

export interface Settings {
  autoCreate: boolean;
  tempType: TempType;
  fileType: FileType;
  cssType: CssType;
}