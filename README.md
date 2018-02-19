# PotholeMap
A read-only map app, written in Google Apps Script, which displays to the end user every pothole/cluster that has been spotted, surveyed, measured, or filled. 
## IMPORTANT
This is currently work in progress. It is not production-ready yet, and has to somehow get authorized by Google OAuth, as well as get some major performance issues taken care of, before it is ready to be deployed for real. 
## How this works
This displays to the end user a map marked with all the potholes either pointed out, surveyed, measured, and/or filled by me or my org Open Source Roads. 
The map markers represent either individual potholes or clusters of pohtoles. They are clickable, and when clicked, display the state of the pothole/cluster, including the estimated number of 50-pound bags of asphalt needed to fill them. 
## To contribute to this project
I am personally glad you came here to help out the open-source effort of ours. To help, you should create your own branch, get your own `API_KEY` for the Google Maps APIs, and hard-code it into the code base. 
Some other things to note: 
 - This project is written in Google Apps Script, a JavaScript-based scripting environment for interfacing with core Google services (Sheets, Drive, GMail, ...). I used it because the data store is a Sheet, which provides maintainers of the data a way to quickly make changes to the data without needing to know something like, for example, SQL. 
 - This project's source code was obtained from my Google Apps Script project via [google-apps-script Node package](https://www.npmjs.com/package/google-apps-script)
   - What that tool did, was convert all the `.gs` files to `.js`. Do *not* get those confused with the client-side JavaScript, which, for some reason, Google Apps Script requires to be in a `<script>` tag in an `.html` file.
- The app needs to transform the data from the spreadsheet (which is specified by, more often than not, street address) using the Google Geolocation API, and then the Google Maps Roads API. Because of that, I wrote function wrappers around those AJAX calls, which necessitated my whole codebase to become async. 
 - to make that happen, and to avoid callback hell, I made use of `async.js`, client-side edition.
