function master() {
  
  var folder = DriveApp.getFolderById("1-jpKk39FnhtrGVcSQD-ON_tdGv-APf5D");
  
  var pastatotal = folder.getFiles();
  
  
  var file;
  var fileType;
  var sheetID;
  var combineData = [];
  var data;
  
  while(pastatotal.hasNext()){
    file = pastatotal.next();
    fileType = file.getMimeType();
    if(fileType === "application/vnd.google-apps.spreadsheet"){
      sheetID = file.getId();
      data = getDataFromSpreadsheet(sheetID);
      data = data.map(function(r){ return r. concat([file.getName()]); });
      combineData = combineData.concat(data);
    } // se regra
  } // wehile termina aqui
   
  var ws = SpreadsheetApp.getActive().getSheetByName("Geral");
  ws.getRange("A2:H").clearContent();
  ws.getRange(2, 1, combineData.length, combineData[0].length).setValues(combineData);
}

function getDataFromSpreadsheet(sheetID){
  
  var ss = SpreadsheetApp.openById(sheetID);
  var ws = ss.getSheets()[0];
  var data = ws.getRange("A2:H" + ws.getLastRow()).getValues();
  return data;

}