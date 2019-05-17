type CryptHandler = (data: string) => string;

export class Storage {
  public static setStorageBase(value) {
    Storage._storageBase = value;
  }

  public static async save(key: string, item: object | string, excludes: string[] = [], encodeHandler?: CryptHandler): Promise<void> {
    Storage._logEnabled && console.info(`Storage.save: ${key}`);
    try {
      const data = {};
      for (const key of Object.keys(item)) {
        if (!excludes.includes(key)) {
          data[key] = item[key];
        }
      }

      Storage._logEnabled && console.info(` -> ${JSON.stringify(data).length}`);

      let buf;
      if (encodeHandler) {
        try {
          buf = encodeHandler(JSON.stringify(data));
          Storage._logEnabled && console.info('Encode data');
          Storage._logEnabled && console.info(` -> ${buf.length}`);
        } catch {
          console.warn('Storage: Unable encode');
          buf = JSON.stringify(data);
        }
      } else {
        buf = JSON.stringify(data);
      }

      await Storage._storageBase.setItem(key, buf);
    } catch (err) {
      console.warn(err);
    }
  }

  // Add `excludes` for safe in update, if before version was saved them
  public static async load(key: string, excludes: string[] = [], decodeHandler?: CryptHandler): Promise<any> {
    Storage._logEnabled && console.info(`Store.load: ${key}`);
    try {
      const buf = await Storage._storageBase.getItem(key);
      if (buf) {
        Storage._logEnabled && console.info(buf);

        let data;
        if (decodeHandler) {
          try {
            data = JSON.parse(decodeHandler(buf));
            Storage._logEnabled && console.info(` -> ${buf.length}`);
            Storage._logEnabled && console.info('Decode data');
          } catch {
            console.warn('Storage: Unable decode');
            data = JSON.parse(buf);
          }
        } else {
          data = JSON.parse(buf);
        }

        for (const key of excludes) {
          if (data.hasOwnProperty(key)) {
            delete data[key];
          }
        }

        return data;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  public static setLogEnabled(value: boolean) {
    Storage._logEnabled = value;
  }

  private static _logEnabled?: boolean;
  private static _storageBase: any;
}
