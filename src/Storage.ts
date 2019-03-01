import { AsyncStorage } from 'react-native';

type CryptHandler = (data: string) => string;

export class Storage {
  public static async save(key: string, item: object | string, excludes: string[] = [], encodeHandler?: CryptHandler): Promise<void> {
    try {
      const data = {};
      for (const key of Object.keys(item)) {
        if (!excludes.includes(key)) {
          data[key] = item[key];
        }
      }

      let buf;
      if (encodeHandler) {
        try {
          buf = encodeHandler(JSON.stringify(data));
        } catch {
          console.warn('Storage: Unable encode');
          buf = JSON.stringify(data);
        }
      } else {
        buf = JSON.stringify(data);
      }

      await AsyncStorage.setItem(key, buf);
    } catch (err) {
      console.warn(err);
    }
  }

  // Add `excludes` for safe in update, if before version was saved them
  public static async load(key: string, excludes: string[] = [], decodeHandler?: CryptHandler): Promise<any> {
    try {
      const buf = await AsyncStorage.getItem(key);
      if (buf) {
        let data;
        if (decodeHandler) {
          try {
            data = JSON.parse(decodeHandler(buf));
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
}
