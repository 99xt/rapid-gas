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
  var response = undefined;
  
  //If the filters are defined in the GET query, lets apply
  //TODO we need to support multiple filters
  var filter = request.parameter["$filter"];
  if (filter) {
    var response = getFiltered_(sheetData, filter);  
  } else {
    var response = getAll_(sheetData);
    
  }
  return JSON.stringify(response); 
}

/*
 * Apply the filter on the sheet
 */
function getFiltered_(sheetData, filter) {
  var filterField = filter.split("eq")[0].trim();
  var filterValue = filter.split("eq")[1].trim(); //.replace(/'/g, "");
  
  var columnIndex = sheetData.headerIndexes[filterField];
  if(columnIndex) {
    var columnChar = String.fromCharCode(64 + columnIndex);
    var query = "=QUERY(" + sheetData.entityName + "!$A$1:$YY, \"select * where (" + columnChar + "=" + filterValue + ")\")";
    
    return query_(sheetData, query);
  }
  throw "Filter field is not available in the entity schema";
}

/*
 * Since GAS doesnot support QUERY function, we have to do this via a ugly hack
 */
function query_(sheetData, query) { 
  var tempSheet = sheetData.spreadsheet.insertSheet();
  var r = tempSheet.getRange(1, 1).setFormula(query);
  
  var result = getAll_({
    sheet: tempSheet,
    headerIndexes: sheetData.headerIndexes
  });

  //var reply = tempSheet.getDataRange().getValues();
  sheetData.spreadsheet.deleteSheet(tempSheet);
  
  return result;
}

/*
 * Get all the data on the sheet
 */
function getAll_(sheetData) {
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
  return response;
}