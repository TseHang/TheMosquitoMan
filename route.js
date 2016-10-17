var path = require('path');
var url = require('url');
var fs = require('fs');

var route = [
    {
      data: {
        path: './',
        title: ''
      },
      partials: './partials.js',
      layout:  "./layout/index.hbs",
      filename: "./index.html"
    },
   {
      data: {
        path: './',
        title: '降蚊十八招'
      },
      partials: './partials.js',
      layout:  "./layout/killer.hbs",
      filename: "./killer.html"
    },
    {
      data: {
        title: '即時疫情',
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/realTime.hbs",
      filename: "./realTime.html"
    },
    {
      data: {
        title: '蚊風喪膽',
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/knowledge.hbs",
      filename: "./knowledge.html"
    },
    {
      data: {
        title: '練武功',
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/interacting.hbs",
      filename: "./interacting.html"
    },
    {
      data: {
        title: '關於我們',
        path: './'
      },
      partials: './partials.js',
      layout:  "./layout/about.hbs",
      filename: './about.html'
    },
    {
      data: {
        title: '即時病例統計',
        path: '../'
      },
      partials: './partials.js',
      layout:  "./layout/realTime_patient.hbs",
      filename: "./realMap/realTime_patient.html"
    },
    {
      data: {
        title: '群眾集力式蚊媒風險回報點分析',
        path: '../'
      },
      partials: './partials.js',
      layout:  "./layout/realTime_heat.hbs",
      filename: "./realMap/realTime_heat.html"
    },
    {
      data: {
        title: '「掌蚊人」遊戲',
        path: '../'
      },
      partials: './partials.js',
      layout:  "./layout/game.hbs",
      filename: "./interact/game.html"
    },
    {
      data: {
        title: '掌蚊人環境回報比賽',
        path: '../'
      },
      partials: './partials.js',
      layout:  "./layout/competition.hbs",
      filename: "./interact/competition.html"
    }
  ];
module.exports = route;
