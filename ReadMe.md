# VUE Component library App
Last edited: Jan 2018 - Dillan Simmons :robot:

TO DO: 
[] - Scoping styles so they don't bleed into global space (possibly by adding CSS input area)
[] - Live update html output instead of having to save
[] - Re-order components based on text

## Setup

Please download the files and update with your own firebase information

## Overview

Gulp is used in this project to:

* Compile our SASS file into CSS.
* Compress our CSS and JS files to improve load time.
* Gives us a server and the ability for live reload edits at: `http://localhost:8000/`

## Common Problems
1. Gulp will not run
	* Check to see what the error message is, it could be an issue in your JS or SASS file
	* Check to make sure you have gulp installed on your computer by typing `gulp -v` in terminal. If the terminal produces an error you'll need to install gulp. You can do so by entering `npm install -g gulp` into terminal and then following the normal To Use steps above. If you don't have node or npm installed there are steps to install those [here](https://travismaynard.com/writing/getting-started-with-gulp).
	* If you are getting this error `Error: listen EADDRINUSE :::8080` you likely have gulp running in a different folder already. Ensure Gulp isn't running elsewhere and try again. 

