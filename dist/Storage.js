import { AsyncStorage } from 'react-native';
export class Storage {
    static async save(key, item, excludes = [], encodeHandler) {
        console.debug('Save...');
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
                }
                catch {
                    console.warn('Storage: Unable encode');
                    buf = JSON.stringify(data);
                }
            }
            else {
                buf = JSON.stringify(data);
            }
            console.debug(buf);
            await AsyncStorage.setItem(key, buf);
        }
        catch (err) {
            console.warn(err);
        }
    }
    static async load(key, excludes = [], decodeHandler) {
        try {
            const buf = await AsyncStorage.getItem(key);
            console.debug('Load....');
            console.debug(buf);
            if (buf) {
                let data;
                if (decodeHandler) {
                    try {
                        data = JSON.parse(decodeHandler(buf));
                    }
                    catch {
                        console.warn('Storage: Unable decode');
                        data = JSON.parse(buf);
                    }
                }
                else {
                    data = JSON.parse(buf);
                }
                for (const key of excludes) {
                    if (data.hasOwnProperty(key)) {
                        delete data[key];
                    }
                }
                return data;
            }
        }
        catch (err) {
            console.warn(err);
            return null;
        }
    }
}
