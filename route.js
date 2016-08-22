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
      filename: "./index.html"
    },
   {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/killer.hbs",
      filename: "./killer.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/realTime.hbs",
      filename: "./realTime.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/knowledge.hbs",
      filename: "./knowledge.html"
    },
    {
      data: {
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/interacting.hbs",
      filename: "./interacting.html"
    }
  ];
module.exports = route;
