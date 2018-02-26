/* Helps map the columns of the spreadsheet to the correct arguments in a constructor
 * Parameters:
 *	• arguments : (String[]) the string representation of the arguments of a constructor
 * NOTE: be careful not to pass the constructor an Array, but to pass it a list of arguments. This class contains an argIndices array that specifies the index 
 *	of the spreadsheet column to use for this.argNames[j]
 * use this.argIndices to refer to get the index of the columns that the property identified by the jth element of this.argNames is supposed to point to
 */
function DataStoreHelper() {
  this.argNames = arguments;	// TODO: check type of arguments
  this.argIndices = new Array(this.argNames.length);
  /* takes an array of column names and assigns the indices where they can be found, to this.argIndices
   */
  this.sortColumns = function (columnNames) { 
    // for each argument name ...
    for (var j in this.argNames)
    {
    	var k = 0; 
        // ... sift thru the column names ...
        for (k in columnNames) {
          	// ... to find the column name that contains the argument name ...
        	if (columnNames[k].toLowerCase().indexOf(this.argNames[j]) !== -1) break;
          	else if (k == columnNames.length - 1) k = -1;
          
        }
      	// if we found it, we write it to this.argIndices
      	if (k > -1) this.argIndices[j] = k;
      	// otherwise, we have spreadsheet error.
      	else throw new Error('Spreadsheet is missing column for constructor argument: ' + this.argNames[j]);
    }
  }
}
// static const strings
DataStoreHelper.POTHOLE_NUMBER  = 'number';
DataStoreHelper.LATITUDE        = 'latitude';
DataStoreHelper.LONGITUDE       = 'longitude';
DataStoreHelper.ADDRESS         = 'address';
DataStoreHelper.SURFACE_AREA    = 'area';
DataStoreHelper.BAGS            = 'bags';
DataStoreHelper.SNAPPED_TO_ROAD = 'snappedtoroad';
DataStoreHelper.FILLED          = 'filled';
DataStoreHelper.IMAGE_URL       = 'imageurl';
// derived helper classes for PotholeData,PotholeDataNoCoords
function PotholeDataHelper() { 
  DataStoreHelper.call(this, 
                       DataStoreHelper.LATITUDE,
                       DataStoreHelper.LONGITUDE,
                       DataStoreHelper.SNAPPED_TO_ROAD,
                       DataStoreHelper.FILLED,
                       DataStoreHelper.SURFACE_AREA,
                       DataStoreHelper.BAGS,
                       DataStoreHelper.IMAGE_URL);
}
PotholeDataHelper.prototype = Object.create(DataStoreHelper.prototype);

function PotholeDataNoCoordsHelper() { 
  DataStoreHelper.call(this,
                       DataStoreHelper.ADDRESS,
                       DataStoreHelper.FILLED,
                       DataStoreHelper.SURFACE_AREA,
                       DataStoreHelper.BAGS,
                       DataStoreHelper.IMAGE_URL);
}
PotholeDataNoCoordsHelper.prototype = Object.create(DataStoreHelper.prototype);