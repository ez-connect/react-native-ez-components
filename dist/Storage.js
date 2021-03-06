export class Storage {
    static setStorageBase(value) {
        Storage._storageBase = value;
    }
    static async save(key, item, excludes = [], encodeHandler) {
        Storage._logEnabled && console.info(`Storage.save: ${key}`);
        try {
            const data = {};
            for (const k of Object.keys(item)) {
                if (!excludes.includes(k)) {
                    data[k] = item[k];
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
            await Storage._storageBase.setItem(key, buf);
        }
        catch (err) {
            console.warn(err);
        }
    }
    static async load(key, excludes = [], decodeHandler) {
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
                    }
                    catch {
                        console.warn('Storage: Unable decode');
                        data = JSON.parse(buf);
                    }
                }
                else {
                    data = JSON.parse(buf);
                }
                for (const k of excludes) {
                    if (data.hasOwnProperty(k)) {
                        delete data[k];
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
