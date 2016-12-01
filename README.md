# Cirrus Web Accelerator

**Application Name:** Node JS Web Accelerator.

**Application Description:** A simple Node Accelerator, allowing developers / projects to have a starting point when
creating a Node application. Comes with modern and the latest developer features such as: ES6, Gulp, Browserify, Sass,
Material Design, Developer Standards (Eslint) and Mocha.

**Prefix:** CIRR_Web_Accelerator.

**Author:** Nick Liffen

**Team:** Cirrus

**Information Classification:** Green

**Development Languages:** JavaScript (Node JS).

**Development Framework(s):** Mocha, Sass, Browserify,

**Development Add-Ons:** New Relic APM

**Development Standards:** This Accelerator comes with Developer Standards. These standards can be found in the `eslint.rc`
file. This file shouldn't be changed unless your code *has* a feature / framework that isn't included in the file.

------------------------------

**Get Started:**

1. Clone the Repo.
2. Run `npm install` to install all the node modules locally
3. Open up another tab in your terminal or command line. In one terminal / command line run `gulp`. This will start your task runners.
3. Rename the .envsample to .env and add your needed enviroment variables.
4. In your other tab run `heroku local` (if using heroku) or `npm start` to start your server.
5. Go to localhost on port 5000 and your sever should be running there.

------------------------------

**Authentication:**

This application comes with Single Sign On (Using Salesforce Authentication). In your .env file there is a Environment Variable called `AUTH`. If you set this to `false` authentication will be skipped. If set to `true` it will authenticated with Force. If set to `true` you will need to do the following steps:

1. Make a Change Request to create a Connected Application.
2. You will need to include the following details: *Callback URL* and *Start URL*.
3. You will get a Client Secret and Token. Put these in your .env file and it should authenticate.

------------------------------


**Folder Structure:**

**-bin** :: *This folder contains the file which starts the node server [DO NOT CHANGE THIS FILE]*

**-lib** :: *This folder contains the transpiled code from the `src` folder. [DO NOT CHANGE ANYTHING FROM THIS FOLDER]*

**-src** :: *This folder contains all the server controllers, server routes and front end files as well*

**--controllers** :: *This file contains all the server side controllers [TRY AND MAKE MODULAR CODE ]*

**--public** :: *This folder contains all the front end scss javascript and images*

**---scss** :: *SASS files*

**---img** :: *All Images*

**---js** :: *All Client-Side JavaScript files. Browserify is ran on these files so you are able to write modular code*

**--routes** :: *All the Express Routes belong in this file*

**-views** :: *Contains all the handlebars views*

------------------------------

**Import features:**

1. SASS is an ability to write *better* CSS. It allows you to write SCSS code. However, you DO NOT HAVE TO, you are able to write normal CSS within a SCSS file. Meaning if you don't know SASS you can write normal CSS and it will work.
2. Browserify is an ability to write modular code front end. In the src/public/js file try and write modular code. However you don't have to - you can just write Javascript like you normally would and that would be fine. At the bottom of any handlebars file remember to include bundle.js
