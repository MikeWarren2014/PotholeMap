/* Creates PotholeData object 
 *
 * Parameters:
 *	• latitude      : number (or null)
 *	• longitude     : number (or null)
 *	• snappedToRoad : boolean
 *	• filled        : boolean
 *	• surfaceArea   : number
 *	• bagsNeeded    : number
 *	• imageURL      : string
 * Methods:
 *	• setCoordinates() : sets latitude,longitude (and lat,lng) of this
 *		-Parameters:
 *		 • coordorLatitude : coordinates object or number
 *		 • longitude: number
 *	• setAddress() : sets street address of this
 *		-Parameters:
 *		 • address : string
 *	• isSnappedToRoad() : sets/returns whether or not coordinates of this have been snapped to road
 *		-Parameters:
 *		 • snapped : boolean (optional)
 *		-NOTE: if no parameters have been specified, function simply returns this._snappedToRoad
 */
// TODO: implement way to check for string first or second argument
function PotholeData(latitude, longitude, snappedToRoad, filled, surfaceArea, bagsNeeded, imageURL)
{
  this._streetAddress = '';
  this._snappedToRoad = snappedToRoad || false;  // assume coordinates have not been snapped to road
  this.lat = latitude;
  this.lng = longitude;
  // For good measure, we give this latitude,longitude members
  this.latitude = this.lat;
  this.longitude= this.lng;
  // now, onto the rest of the members...
  this.isFilled = filled || false;
  this.area = Number(surfaceArea);
  this.bagsNeeded = Number(bagsNeeded);
  this.imageURL = imageURL;
  
  this.potholeState = getPotholeStateFor(this);
  // methods
  this.setCoordinates = function(coordinateOrLatitude, longitude) { 
    // if coordinateOrLatitude is a coordinates object
    if ((coordinateOrLatitude.lat !== undefined) || (coordinateOrLatitude.latitude !== undefined)) {
      // we use it to set this.lat,this.lng, this.latitude,this.longitude
      this.lat = Number(coordinateOrLatitude.lat) || Number(coordinateOrLatitude.latitude);
      this.lng = Number(coordinateOrLatitude.lng) || Number(coordinateOrLatitude.longitude);
    }
    // otherwise, we assume it's a number and use it and longitude to set those members
    else
    {
      this.lat = coordinateOrLatitude;
      this.lng = longitude;
    }
    this.latitude = this.lat;
    this.longitude = this.lng;
  };
  this.setStreetAddress = function(address) { 
    this._streetAddress = address;
  }
  this.isSnappedToRoad = function(snapped) { 
    if (snapped === undefined) return this._snappedToRoad;
    // make sure snapped is boolean at this point
    snapped = !(!(snapped));
    this._snappedToRoad = snapped;
  }
  // for the Mustache.js rendering. Computes volume of this in cubic feet. 1 bag needed == 5/12 cubic foot
  this.volume = function() { return this.bagsNeeded * 5/12; };
}
/* Checks whether or not a provided coordinate is valid
 * Parameters: 
 *	• coord      : (number) the coordinate to check 
 *	• isLatitude : (boolean) whether or not this coordinate is a latitude
 * Returns:
 *	• whether or not coord is valid
 */
PotholeData.isValidCoord = function(coord, isLatitude) { 
  isLatitude = !(!(isLatitude));
  return (coord === parseFloat(coord)) && (isLatitude ? 
    (Math.abs(coord) <= 90) : 
    (Math.abs(coord) <= 180));
};
/* Checks whether or not lat,lng (and latitude,longitude) of this are valid
 * Parameters: none
 * Returns :
 *	• whether or not this contains valid lat,lng and latitude,longitude
 */
PotholeData.prototype.hasValidGPSCoords = function() { 
  return (
  	(PotholeData.isValidCoord(this.lat, true) && PotholeData.isValidCoord(this.latitude, true)) && 
    (PotholeData.isValidCoord(this.lng, false) && PotholeData.isValidCoord(this.longitude, false))
  );
  //return true;
}