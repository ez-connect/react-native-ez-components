import { AsyncStorage } from 'react-native';
export class Storage {
    static async save(key, item, excludes = [], encodeHandler) {
        try {
            const data = {};
            for (const key of Object.keys(item)) {
                if (!excludes.includes(key)) {
                    data[key] = item[key];
                }
            }
            const s = encodeHandler
                ? encodeHandler(JSON.stringify(data))
                : JSON.stringify(data);
            await AsyncStorage.setItem(key, JSON.stringify(data));
        }
        catch (err) {
            console.warn(err);
        }
    }
    static async load(key, excludes = [], decodeHandler) {
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
        }
        catch (err) {
            console.warn(err);
            return null;
        }
    }
}
