/* Function that initializes a pothole collection object.
 * Parameters: 
 *	• toBeMeasured : an Array of coordinates (or locations) of potholes to be measured
 *	• toBeInspected: an Array of coordinates (or locations) of potholes to be inspected
 *	• toBeFilled   : an Array of coordinates (or locations) of potholes to be filled
 *	• filled       : an Array of coordinates (or locations) of potholes that are filled
 * Returns:
 *	• an object that contains the arrays specified by the arguments
 */
function PotholeCollectionObject(toBeMeasured, toBeInspected, toBeFilled, filled)
{
	// verify that all the parameters are arrays or things that are falsy (null, undefined, false, ...)
    if ((toBeMeasured) &&(!Array.isArray(toBeMeasured))) return null;
    if ((toBeInspected) && (!Array.isArray(toBeInspected))) return null;
    if ((toBeFilled) && (!Array.isArray(toBeFilled))) return null;
    if ((filled) && (!Array.isArray(filled))) return null;
    // build this
    this.toBeMeasured  = (toBeMeasured === undefined) ? [] : toBeMeasured;
    this.toBeInspected = (toBeInspected === undefined) ? [] : toBeInspected;
    this.toBeFilled    = (toBeFilled === undefined) ? [] : toBeFilled;
    this.filled        = (filled === undefined) ? [] : filled;
}