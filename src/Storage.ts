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

  public static async load(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const item = JSON.parse(data);
        return item;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}
