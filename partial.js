var fs = require("fs");

const DEFAULT_PATH = '';

module.exports= function (hbs) {
  // register partials
  hbs.registerPartial('head', getPartials('head.hbs', DEFAULT_PATH));
  hbs.registerPartial('head_content', getPartials('head_content.hbs', DEFAULT_PATH));
  hbs.registerPartial('header', getPartials('header.hbs', DEFAULT_PATH));
  hbs.registerPartial('footer', getPartials('footer.hbs', DEFAULT_PATH));
  hbs.registerPartial('led', getPartials('led.hbs', DEFAULT_PATH));
};

function getPartials(filename, path) {
  var template = fs.readFileSync(`./layout/${path}${filename}`, 'utf8');
  // template = template.replace(/[\t\n]/g, '');
  return template;
}
