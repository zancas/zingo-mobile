import ServerType from '../types/ServerType';

export default class SettingsFileClass {
  server: ServerType;
  currency: 'USD' | '';
  language: 'en' | 'es';
  sendAll: boolean;
  privacy: boolean;
  mode: 'basic' | 'advanced';
  firstInstall: boolean;
  basicFirstViewSeed: boolean;
  version: string | null;
  // three values:
  // - '': means the prior version doesn't have this field in settings
  // - null: means is a fresh install
  // - string: means it have a normal value

  constructor(
    server: ServerType,
    currency: 'USD' | '',
    language: 'en' | 'es',
    sendAll: boolean,
    privacy: boolean,
    mode: 'basic' | 'advanced',
    firstInstall: boolean,
    basicFirstViewSeed: boolean,
    version: string,
  ) {
    this.server = server;
    this.currency = currency;
    this.language = language;
    this.sendAll = sendAll;
    this.privacy = privacy;
    this.mode = mode;
    this.firstInstall = firstInstall;
    this.basicFirstViewSeed = basicFirstViewSeed;
    this.version = version;
  }
}
