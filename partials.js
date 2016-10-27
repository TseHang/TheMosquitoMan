var fs = require("fs");

module.exports= function (hbs) {
  // register partials
  hbs.registerPartial('head', getPartials('head'));
  hbs.registerPartial('head_content', getPartials('head_content'));
  hbs.registerPartial('header', getPartials('header'));
  hbs.registerPartial('footer', getPartials('footer'));
  hbs.registerPartial('led', getPartials('led'));
};

function getPartials(filename) {
  var template = fs.readFileSync('./layout/'+filename+'.hbs', 'utf8');
  template = template.replace(/[\t\n]/g, '');
  return template;
}
