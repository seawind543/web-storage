const inMemoryStorage = {};

module.exports = (options = {}) => {
    const {
        namespace = 'default',
        sessionStorage = false
    } = options;
    const settings = {
        namespace,
        storage: sessionStorage ? window.sessionStorage : window.localStorage
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    // If it does exist, that is still no guarantee that localStorage is actually available,
    // as various browsers offer settings that disable localStorage.
    // So a browser may support localStorage, but not make it available to the scripts on the page.
    //
    // Another reference: https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
    const isAvailable = () => {
        try {
            const key = '__STORAGE_TEST__';
            settings.storage.setItem(key, key);
            settings.storage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    };

    const translateKey = (key) => {
        const { namespace } = settings;

        if (typeof key !== 'undefined') {
            return `NS:${namespace}:${key}`;
        }

        return `NS:${namespace}`;
    };

    const getItem = (key, defaultValue) => {
        if (!settings.namespace) {
            throw new Error('The namespace cannot be an empty string');
        }

        const itemKey = translateKey(key);

        let json = null;
        if (isAvailable()) {
            json = settings.storage.getItem(itemKey);
        } else {
            json = inMemoryStorage[itemKey];
        }

        if (json === null || typeof json === 'undefined') {
            return defaultValue;
        }

        let value;
        try {
            value = JSON.parse(json);
        } catch (err) {
            value = defaultValue;
        }
        return value;
    };

    const setItem = (key, value) => {
        if (!settings.namespace) {
            throw new Error('The namespace cannot be an empty string');
        }

        const itemKey = translateKey(key);
        const json = JSON.stringify(value);

        if (isAvailable()) {
            settings.storage.setItem(itemKey, json);
        } else {
            inMemoryStorage[itemKey] = json;
        }
    };

    const removeItem = (key) => {
        if (!settings.namespace) {
            throw new Error('The namespace cannot be an empty string');
        }

        const itemKey = translateKey(key);

        if (isAvailable()) {
            settings.storage.removeItem(itemKey);
        } else {
            delete inMemoryStorage[itemKey];
        }
    };

    const size = () => {
        if (!settings.namespace) {
            throw new Error('The namespace cannot be an empty string');
        }

        const keyStart = translateKey();
        let count = 0;

        if (isAvailable()) {
            const { storage } = settings;

            for (let i = 0; i < storage.length; i++) {
                if (storage.key(i).startsWith(keyStart)) {
                    count++;
                }
            }

            return count;
        }

        // inMemoryStorage
        const allKeys = Object.keys(inMemoryStorage);
        for (let i = 0; i < allKeys.length; i++) {
            if (allKeys[i].startsWith(keyStart)) {
                count++;
            }
        }

        return count;
    };

    return {
        getItem,
        setItem,
        removeItem,
        size
    };
};
