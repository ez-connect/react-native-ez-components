import { AsyncStorage } from 'react-native';

export class Storage {
  public static async save(key: string, item: object, excludes: string[] = []) {
    try {
      const data = {};
      for (const key of Object.keys(item)) {
        if (!excludes.includes(key)) {
          data[key] = item[key];
        }
      }
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn(err);
    }
  }

  // Add `excludes` for safe in update, if before version was saved them
  public static async load(key, excludes: string[] = []) {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const item = JSON.parse(data);
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
