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
     * @param {String} lib ibrary contents
     * @returns {Promise<*>}
     */
    const loadLib = (lib) => {
        return new Promise((resolve, reject) => {
            try {
                resolve((new Function(lib))());
            } catch (e) {
                reject(e);
            }
        });
    }

    module.exports = { getWindow, loadLib }
})();