/* Creates PotholeData object, but without coordinates
 * Parameters:
 *  • id         : integer
 *	• address    : string
 *	• filled     : boolean
 *	• surfaceArea: number
 *	• bagsNeeded : number
 *	• imageURL   : string
 */
function PotholeDataNoCoords(id, address, filled, surfaceArea, bagsNeeded, imageURL) {
  PotholeData.call(this, id, null, null, false, filled, surfaceArea, bagsNeeded, imageURL);
  this.setStreetAddress(address);
}

PotholeDataNoCoords.prototype = Object.create(PotholeData.prototype);