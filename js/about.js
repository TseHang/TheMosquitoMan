(function(window) {

  var body = document.querySelector('body');
  var about = document.getElementById('about');
  var team = document.getElementById('team');

  $('.s-menu').click(function() {
    $('li').css('opacity', '1');
    if (this.id === 'page2') {
      this.style.opacity = 0.6;
      team.className = 'main active';
      about.className = 'main';
      body.className = 'green';
    }
    else {
      this.style.opacity = 0.6;
      team.className = 'main';
      about.className = 'main active';
      body.className = '';
    }
  });

})(window);
