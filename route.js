var path = require('path');
var url = require('url');
var fs = require('fs');

var route = [
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/index.hbs",
      filename: "./public/index.html"
    },
   {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/killer.hbs",
      filename: "./public/killer.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/realTime.hbs",
      filename: "./public/realTime.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/knowledge.hbs",
      filename: "./public/knowledge.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/qa.hbs",
      filename: "./public/qa.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/interacting.hbs",
      filename: "./public/interacting.html"
    }
  ];
module.exports = route;
