# Rapid development framework for Google Apps Scripts (rapid-gas)
Google Apps Scripts (GAS) is a powerful platform where Google products and third party services can be integrated and automated to create a products. GAS combined with Google Spreadsheets can be used to rapidly build applications/products in a blazingly shorter time. The idea is that;
 - Use Google spreadsheets as the data storing and administration platform
 - Each spreadsheet (multiple sheets) will act as a business module providing users data manipulation functioanlity
 - Spreadsheets can have own REST API making them act as micro services
 - External systems such as mobile, web front ends can be built on top of the REST APIs
 
Rapid-gas project provide necessary framework functions to rapidly develop these microservices and allows easy integrations inbetween. Also it introduces conventions that can make the spreadsheets to look more like datatables with business schemas.

## How to use Rapid-gas
Rapid-gas is available as a GAS library. If you want your spreadsheet to be available as a REST API follow following steps.
Create the spreadsheet and add the column names to the header row as below:
![alt tag](https://cloud.githubusercontent.com/assets/1892961/19616526/b8ee4290-9832-11e6-8fb1-d9e9d15db908.png)

Now go to Tools->Script Editor and paste below code
```javascript
var config = {
  entities: {
    students: {
      spreadsheetId: "spreadsheet_id",
      sheetName: "sheet_name",
      endpoint: "webapp_url",
      columns: ["Name", "Age", "Birthday", "Address"]
    }
  }
};

RapidGas.initializeByJson(config);

function doGet(request) {
  var response = RapidGas.REST.getResponse(request, "students");
  return ContentService.createTextOutput(response);
}
```

Replace [spreadsheet_id] with https://docs.google.com/spreadsheets/d/spreadsheet_id/edit you find on the URL
sheet_name is the name of the sheet you want to expose as a web api
Update the columns array to suit your column names in the spreadsheet
Now "publish -> deploy as webapp" and deploy a new version of this service to obtain the webapp_url and update the same

Go to "Resources -> Libraries" to refer to RapidGas library by the project key "M4fJ-YgsEJvPfAud5g00eJ3mq3AJFwtDu" and add the latest version.

Now if you go to the webapp_url of your published service, you should get the Json results of your spreadsheet data.

If you want to query data, follow a similar syntax as below:
https://script.google.com/macros/s/spreadsheet_id/exec?$filter=Name eq 'Jehan'

## Limitations
Currently only filtering on GET requests is implemented. Filtering is only possible on one field as of now.

