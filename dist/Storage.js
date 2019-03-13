import AsyncStorage from '@react-native-community/async-storage';
export class Storage {
    static async save(key, item, excludes = [], encodeHandler) {
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
                }
                catch {
                    console.warn('Storage: Unable encode');
                    buf = JSON.stringify(data);
                }
            }
            else {
                buf = JSON.stringify(data);
            }
            await AsyncStorage.setItem(key, buf);
        }
        catch (err) {
            console.warn(err);
        }
    }
    static async load(key, excludes = [], decodeHandler) {
        Storage._logEnabled && console.info(`Store.load: ${key}`);
        try {
            const buf = await AsyncStorage.getItem(key);
            if (buf) {
                Storage._logEnabled && console.info(buf);
                let data;
                if (decodeHandler) {
                    try {
                        data = JSON.parse(decodeHandler(buf));
                        Storage._logEnabled && console.info(` -> ${buf.length}`);
                        Storage._logEnabled && console.info('Decode data');
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
    static setLogEnabled(value) {
        Storage._logEnabled = value;
    }
}
