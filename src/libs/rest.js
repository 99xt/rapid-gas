var RapidGas = RapidGas || this;
RapidGas.REST = RapidGas.REST || {};

/**
* Generate the GET response for the request recieved
*
* @param {object} GAS HTTP request instance
* @param {string} Which entity is this request related to
* @return {Object} Json formatted REST output
*/
RapidGas.REST.getResponse = function(request, entityName) {
  var sheetData = RapidGas.util.getSheetData(entityName);
  var lastRow = sheetData.sheet.getLastRow();
  var response = {value:[]};
  
  for (var i = 2; i < lastRow + 1; i++) { 
    var record = {};
    for (header in sheetData.headerIndexes) {
      var columnIndex = sheetData.headerIndexes[header];
      record[header] = sheetData.sheet.getRange(i, columnIndex).getValue();
    }
    response.value.push(record);
  }

  return JSON.stringify(response); 
}