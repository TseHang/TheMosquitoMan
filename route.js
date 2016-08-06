var path = require('path');
var url = require('url');

route = [
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
    layout:  "./layout/context.hbs",
    filename: "./public/context.html"
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
    layout:  "./layout/knowledge.hbs",
    filename: "./public/interacting.html"
  },
  {
    data: {
      path: '../'
    },
    partials: './partials.js',
    layout:  "./layout/content.hbs",
    filename: "./public/content/1.html"
  }
];

module.exports = route;
