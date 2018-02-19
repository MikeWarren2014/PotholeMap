/* Creates PotholeData object, but without coordinates
 * Parameters:
 *	• address    : string
 *	• filled     : boolean
 *	• surfaceArea: number
 *	• bagsNeeded : number
 *	• imageURL   : string
 */
function PotholeDataNoCoords(address, filled, surfaceArea, bagsNeeded, imageURL) {
  PotholeData.call(this, null, null, false, filled, surfaceArea, bagsNeeded, imageURL);
  this.setStreetAddress(address);
}

PotholeDataNoCoords.prototype = Object.create(PotholeData.prototype);