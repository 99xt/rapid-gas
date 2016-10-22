var RapidGas = RapidGas || this;

RapidGas.config = null; // this will be initiated on a call
RapidGas.sheets = RapidGas.sheets || {}; //here we keep all the datasheets

/**
* Initializes the RapidGas with the given configuration
*
* @param {string} config json
*/
RapidGas.initializeByJson = function(config) {
    if(!RapidGas.config) {
        RapidGas.config = config;
    } 
}
