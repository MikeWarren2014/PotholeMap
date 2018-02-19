// Icons for markers
/* obtained from tutorial https://developers.google.com/maps/documentation/roads/inspector */
var RED_MARKER    = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
var GREEN_MARKER  = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
var BLUE_MARKER   = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var YELLOW_MARKER = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
var PURPLE_MARKER = 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
var ORANGE_MARKER = 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png';

// the different pothole states
var POTHOLE_STATES = {
	NEEDS_MEASURED : { toString : function() { return 'needs measured'; }, iconURL : YELLOW_MARKER },
    NEEDS_INSPECTED: { toString : function() { return 'needs inspected'; }, iconURL : ORANGE_MARKER },
	NEEDS_FILLED   : { toString : function() { return 'needs filled'; }, iconURL : RED_MARKER },
	FILLED         : { toString : function() { return 'filled'; }, iconURL : BLUE_MARKER }

};

/* No support for the Map object :'( */
/*var statesMap = new Map();
statesMap.set(POTHOLE_STATES.NEEDS_MEASURED, 'toBeMeasured');
statesMap.set(POTHOLE_STATES.NEEDS_INSPECTED, 'toBeInspected');
statesMap.set(POTHOLE_STATES.NEEDS_FILLED, 'toBeFilled');
statesMap.set(POTHOLE_STATES.FILLED, 'filled');*/

var INDY_CENTER = { lat: 39.7684, lng: -86.1581 };
