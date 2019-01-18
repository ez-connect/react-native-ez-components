import { AsyncStorage } from 'react-native';
export class Storage {
    static async save(key, item, excludes = []) {
        try {
            const data = {};
            for (const key of Object.keys(item)) {
                if (!excludes.includes(key)) {
                    data[key] = item[key];
                }
            }
            await AsyncStorage.setItem(key, JSON.stringify(data));
        }
        catch (err) {
            console.warn(err);
        }
    }
    static async load(key, excludes = []) {
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
        }
        catch (err) {
            console.warn(err);
            return null;
        }
    }
}
