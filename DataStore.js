// NOTE: The logic to write for this file is already being implemented in Code.gs
var POTHOLE_SPREADSHEET = 'https://docs.google.com/spreadsheets/d/1gxDeZUSykyEtL4B7WUYLeKqkDJpuc1uF02Jp_p2lfOg/edit';

/* Reads in data from spreadsheet and returns it in the form of a PotholeCollectionObject 
 *
 *
 */
function getDataFromSpreadsheet() {
	// opening the pothole spreadsheet and getting the data sheet
	var dataStore = SpreadsheetApp.openByUrl(POTHOLE_SPREADSHEET),
		sheet = dataStore.getActiveSheet();
	// get all the data, including the title row, via Range object
	
	// from this point on, let's assume the first row is always the title row
	// let's map the title row's data to the helper objects
	
	// TODO: implement this further
  
}
