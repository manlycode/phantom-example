"use strict";

// I was wrong about using PhantomJS directly
// This looks like the most popular PhantomJS wrapper
// for node on NPM: https://www.npmjs.com/package/phantom
var phantom = require('phantom');

var sitepage = null;
var phInstance = null;

phantom.create()
    .then((instance) => {
        phInstance = instance;
        return instance.createPage();
    })
    .then((page) => {
        sitepage = page;
        return page.open('https://stackoverflow.com/');
    })
    .then((status) => {
        console.log(status);
        return sitepage.property('content');
    })
    .then((content) => {
        console.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch((error) => {
        console.log(error);
        phInstance.exit();
    });
