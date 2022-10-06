require('jsdom-global')();


(() => {
    // Global definition is not possible to avoid global pollution!

    /**
    * Returns window
    * @returns {Window & typeof globalThis}
    */
    const getWindow = () => {
        return window
    }

    /**
     * Load the web library
     * @param {String} lib path, URL, or library contents
     * @returns {Promise<*>}
     */
    const loadLibrary = (lib) => {
        return new Promise(async (resolve, reject) => {
            // Do the reading inside the function to avoid global contamination, ahh
            const { parse } = require('node:path');
            const url = require('node:url');
            const { default: fetch } = require('node-fetch');
            try {
                const path = parse(lib);
                const { readFileSync } = require('node:fs');
                const data = readFileSync(path);
                resolve((() => new Function(data)())());
            } catch {
                try {
                    new url.URL(lib);
                    try {
                        const res = await fetch(lib);
                        const data = await res.text();
                        resolve((() => new Function(data)())());
                    } catch (err) {
                        try {
                            // There is a possibility of a file URL
                            const path = url.fileURLToPath(lib);
                            const { readFileSync } = require('node:fs');
                            const data = readFileSync(path);
                            resolve((() => new Function(data)())());
                        } catch {
                            reject(err);
                        }
                    }
                } catch {
                    resolve((() => new Function(lib)())());
                }
            }
        });
    }

    module.exports = {getWindow, loadLibrary}
})();