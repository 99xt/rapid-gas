var RapidGas = RapidGas || this;
RapidGas.util = RapidGas.util || {};

/**
* Get the sheet data for the given entity
*
* @param {string} Name of the entity
* @return {Object} Sheet related data
*/
RapidGas.util.getSheetData = function(entityName) {
  if(!RapidGas.sheets[entityName]) {
    var entityConfig = RapidGas.config.entities[entityName];
    var spreadsheet = SpreadsheetApp.openById(entityConfig.spreadsheetId);
    var sheet = spreadsheet.getSheetByName(entityConfig.sheetName);
    var headerIndexes = parseHeaders_(sheet, entityConfig);
    RapidGas.sheets[entityName] = {
      entityName: entityName,
      spreadsheet: spreadsheet,
      sheet: sheet,
      headerIndexes: headerIndexes
    };
  }
  return RapidGas.sheets[entityName];
}


/**
* Private function to identify the headers and make an index of ehaders
*
* @param {Sheet} The Sheet instance from which to read data
* @return {Object} Header information
*/
function parseHeaders_(sheet, entityConfig){
  //get the first row
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn() + 1);
  var headerRow = range.getValues()[0];
  
  var headerIndexes = {};
  
  for (var col in headerRow) {  
    var headerValue = headerRow[col].trim();
    var index = entityConfig.columns.indexOf(headerValue);
    if(index > -1) { //column found in the entity config
      headerIndexes[headerValue] = parseInt(col) + 1;
    }
  }
  return headerIndexes;
}