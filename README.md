# ES6_WEB_ACCELERATOR\

**Application Name:** Node JS Web Accelerator (No Authentication).

**Application Description:** A simple Node / Express accelerator which includes "[Express-Handlebars] (https://www.npmjs.com/package/express-handlebars)", "[New Relic APM] (https://www.npmjs.com/package/newrelic)".
This application is ready to use and comes with extra features. (ES6)

**Prefix:** CIRR_ES6_HANDLEBARS

**Author:** Nick Liffen

**Team:** Cirrus

**Information Classification:** Green

**Development Languages / Frameworks(s):** Node, Express, Handlebars, Gulp, Browserify, ES6, SASS, ESLINT,

**Development Add-Ons:** New Relic APM

---

**Get Started:**

1. Clone the Repo.
2. run `npm install`
3. Open up another tab in your terminal or command line. In one terminal / command line run `gulp`. This will start your task wastchers.
3. In your other tab run `heroku local` (if using heroku) or `npm start`.
1. Go to localhost and your sever should be running there.

---

**Folder Structure:**

-bin :: *This folder contains the file which starts the node server [DO NOT CHANGE THIS FILE]*

-lib :: *This folder contains the transpiled code from the `src` folder. [DO NOT CHANGE ANYTHING FROM THIS FOLDER]*

-src :: *This folder contains all the server controllers, server routes and front end files as well*

--controllers :: *This file contains all the server side controllers [TRY AND MAKE MODULAR CODE ]*

--public :: *This folder contains all the front end scss javascript and images*

---scss :: *SASS files*

---img :: *All Images*

---js :: *All Client-Side JavaScript files. Browserify is ran on these files so you are able to write modular code*

--routes :: *All the Express Routes belong in this file*

-views :: *Contains all the handlebars views*

---

**Import features:**

1. SASS is an ability to extend CSS. It allows you to write SCSS code. However, you DO NOT HAVE TO, you are able to write normal CSS within a SCSS file.
2. Browserify is an ability to write modular code front end. In the src/public/js file try and write modular code. However you don't have to - you can just write Javascript like you normally would and that would be fine. At the bottom of any handlebars file remember to include bundle.js
