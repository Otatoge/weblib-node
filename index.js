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
        return (()=>new Function(lib)())();
    }

    module.exports = {getWindow, loadLib}
})();