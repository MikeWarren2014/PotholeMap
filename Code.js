
function myFunction() {
  doGet();
}


function doGet() {
  return HtmlService.createTemplateFromFile(
    'potholeMap'
  ).evaluate()
   .setTitle('Pothole Map')
   .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(resource) {
  return HtmlService.createHtmlOutputFromFile(resource).getContent();
}

/* determines if user is on mobile device */
function userIsOnMobileDevice() {
  var userAgentString = HtmlService.getUserAgent(),
      mobileKeywords = [ 'mobile', 'android', 'iphone' ];
  for (var j in mobileKeywords) {
    if (userAgentString.toLowerCase().indexOf(mobileKeywords[j]) !== -1) return true;
  }
  return false;
}

/* Function that determines the state of a pothole
 * Parameters:
 *	• potholeData : the PotholeData (or PotholeDataFromCoords) object
 * Returns :
 *	• the member of POTHOLE_STATES for the PotholeData
 */
function getPotholeStateFor(potholeData) {
	// check parameters before using them
    
    // if the pothole has been filled 
    if (potholeData.isFilled)
    	// we return state for that
        return POTHOLE_STATES.FILLED;
    // if there's no surface area data or volume data for this pothole
    if ((!potholeData.area) && (!potholeData.bagsNeeded))
    	// the pothole needs to be measured
        return POTHOLE_STATES.NEEDS_MEASURED;
    // if there's no volume data for this pothole (maybe or imageURL)
    if ((!potholeData.bagsNeeded) && (!potholeData.imageURL))
    	// the pothole needs to be inspected
    	return POTHOLE_STATES.NEEDS_INSPECTED;
    return POTHOLE_STATES.NEEDS_FILLED;
}

/* Returns data array of 2 objects to client, in the form of a String:
 * Objects:
 *	• containers for the PotholeData objects, sorted by PotholeState . Each Object corresponds to an equivalence class for the PotholeData:
 *		- the PotholeData has valid GPS coordinates
 *		- the PotholeData does not have valid GPS coordinates; // to do anything with this, use its address member
 * 	Members of each object:
 *		• toBeMeasured : Array<PotholeData> 
 *		• toBeInspected: Array<PotholeData>
 *		• toBeFilled   : Array<PotholeData>
 *		• filled       : Array<PotholeData>
 */
function getPotholeData() {
  var DEBUG = true;
  /*var dataStore = [
  	// let's put a 2-square-foot pothole, that requires 2 bags of asphalt on the map, at 706 North Grant Avenue
    new PotholeData(0, 39.7766788, -86.0977357, false, false, 2, 2 ),
    // now, let's put a filled 4-square-foot pothole on the map, at 706 North Denny Street
    new PotholeData(1, 39.7766617, -86.10012239999999, false, true, 4),
    // now, let's put a filled pothole that required 1 bag of asphalt on the map, at 3901 East Michigan Street
    new PotholeDataNoCoords(2, '3901 East Michigan Street', true, null, 1)
  ];*/
  var dataStore = getPotholesFromDataStore();
  /*
  return [
    // let's put a 2-square-foot pothole, that requires 2 bags of asphalt on the map, on the street outside 706 North Grant Avenue
    new PotholeData(0, 39.7766788, -86.0977357, true, false, 2, 2 ),
    // now, let's put a filled 4-square-foot pothole on the map, outside 706 North Denny Street
    new PotholeData(1, 39.7766617, -86.10012239999999, true, true, 4)
  ];
  */
  var potholesWithCoords    = [],
      potholesWithoutCoords = [];
  // sort the PotholeData by whether or not it contains valid GPS coordinates
  for (var j in dataStore) // subject to change
  {
    if (DEBUG) Logger.log('dataStore[' + j + '].hasValidGPSCoords() == ' + dataStore[j].hasValidGPSCoords());
    if (dataStore[j].hasValidGPSCoords()) potholesWithCoords.push(dataStore[j]);
    else potholesWithoutCoords.push(dataStore[j]);
  }
  return JSON.stringify({ potholesWithCoords   : sortPotholeData(potholesWithCoords), 
                         potholesWithoutCoords : sortPotholeData(potholesWithoutCoords)},
                        stringifyMethod,
                       '\t');
}

/* Fetches data from data store
 * Returns: 
 *	• Array<PotholeData>
 */
// TODO: increment all indices of the helper objects by 1
function getPotholesFromDataStore() {
  var POTHOLE_SPREADSHEET = 'https://docs.google.com/spreadsheets/d/1gxDeZUSykyEtL4B7WUYLeKqkDJpuc1uF02Jp_p2lfOg/edit?usp=sharing';
  var dataStore = SpreadsheetApp.openByUrl(POTHOLE_SPREADSHEET).getDataRange().getValues();
  var columnNames = dataStore[0];
  var helperA = new PotholeDataHelper(),
      helperB = new PotholeDataNoCoordsHelper();
  helperA.sortColumns(columnNames);
  helperB.sortColumns(columnNames); 
  var potholes = [];
  for (var j = 1; j < dataStore.length; j++) {
    // check for latitude,longitude of the pothole on the current row, using the PotholeDataHelper
    var latLngPresent = PotholeData.isValidCoord(dataStore[j][helperA.argIndices[1]], true) && 
              PotholeData.isValidCoord(dataStore[j][helperA.argIndices[2]], false);
    // if the latitude and the longitude are present (and valid!)
    var pothole;
    if (latLngPresent) {
      // create PotholeData object out of this row
      pothole = new PotholeData(parseInt(dataStore[j][helperA.argIndices[0]]),
        Number(dataStore[j][helperA.argIndices[1]]),
        Number(dataStore[j][helperA.argIndices[2]]),
        !(!(dataStore[j][helperA.argIndices[3]])),
        !(!(dataStore[j][helperA.argIndices[4]])),
        Number(dataStore[j][helperA.argIndices[5]]),
        Number(dataStore[j][helperA.argIndices[6]]),
        dataStore[j][helperA.argIndices[7]]);
        
    }
    // otherwise
    else {
      // create PotholeDataNoCoords object out of this row
      pothole = new PotholeDataNoCoords(parseInt(dataStore[j][helperB.argIndices[0]]),
        dataStore[j][helperB.argIndices[1]],
        !(!(dataStore[j][helperB.argIndices[2]])),
        Number(dataStore[j][helperB.argIndices[3]]),
        Number(dataStore[j][helperB.argIndices[4]]),
        dataStore[j][helperB.argIndices[5]]
      );
    }
    // push our created object to potholes
    potholes.push(pothole);
  }
  return potholes;
}

/* returns sample pothole */
function getSamplePothole() { 
  return JSON.stringify(new PotholeData(0, 39.7766788, -86.0977357, true, false, 2, 2 ),
                        stringifyMethod
  );
}

/* Sorts data into an object of Array<PotholeData>
 * Parameters:
 *	• rawPotholeData : Array<PotholeData>
 * Returns: 
 *	• Object<Array<PotholeData> > containing all the rawPotholeData
 */
function sortPotholeData(rawPotholeData) {
  var sortedData = {
    toBeMeasured : [],
    toBeInspected: [],
    toBeFilled   : [],
    filled       : [],
    // just for the client side
    isEmpty      : function() { 
      for (var key in this) {
        if ((Array.isArray(this[key])) && (this[key].length > 0)) return false;
      }
      return true;
    }
  }
  for (var j in rawPotholeData) {
    var potholeToSort = rawPotholeData[j];
    switch (potholeToSort.potholeState) {
      case POTHOLE_STATES.NEEDS_MEASURED:
        sortedData.toBeMeasured.push(potholeToSort);
        break;
      case POTHOLE_STATES.NEEDS_INSPECTED:
        sortedData.toBeInspected.push(potholeToSort);
        break;
      case POTHOLE_STATES.NEEDS_FILLED:
        sortedData.toBeFilled.push(potholeToSort);
        break;
      case POTHOLE_STATES.FILLED:
        sortedData.filled.push(potholeToSort);
        break;
        
    }
  }
  return sortedData;
}  

/* returns the stringification of any methods
 * Parameters: 
 *	• key   : the member of the object
 *	• value : the value of that member (the value of object[key])
 */
function stringifyMethod(key, value) {
  if (typeof(value) === 'function') { 
    return value.toString();
  }
  return value;
}
