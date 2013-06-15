// Unveil.js
// Copyright 2013 Luís Almeida
// Licensed under the MIT license
// luis-almeida.github.com/unveil

;(function($) {

  $.fn.unveil = function(threshold) {

    var th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        images = this;

    images.one("unveil", function() {
      var src = retina ? this.getAttribute("data-src-retina") : null;
      src = src || this.getAttribute("data-src");
      if (src) this.setAttribute("src", src);
    });

    function unveil() {
      var inview, loaded;

      inview = images.filter(function() {
        var el = this,
            wt = window.pageYOffset,
            wb = wt + document.documentElement.clientHeight,
            et = el.offsetTop,
            eb = et + el.height;
        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $(window).on("scroll resize", unveil);

    unveil();

    return this;

  };

})(jQuery);
