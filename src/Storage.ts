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

      const s: string = encodeHandler
        ? encodeHandler(JSON.stringify(data))
        : JSON.stringify(data);
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn(err);
    }
  }

  // Add `excludes` for safe in update, if before version was saved them
  public static async load(key: string, excludes: string[] = [], decodeHandler?: CryptHandler): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const item = decodeHandler
          ? JSON.parse(decodeHandler(data))
          : JSON.parse(data);
        for (const key of excludes) {
          if (item.hasOwnProperty(key)) {
            delete item[key];
          }
        }

        return item;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}
