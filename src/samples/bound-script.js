/*
 * Define the schema of the entity here
 */
var config = {
  entities: {
    students: {
      spreadsheetId: "",
      sheetName: "",
      endpoint: "",
      columns: ["Column A", "Column B", "Column C"]
    }
  }
};

RapidGas.initializeByJson(config);


function doGet(request) {
  var response = RapidGas.REST.getResponse(request, "students");
  return ContentService.createTextOutput(response);
}
