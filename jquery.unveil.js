/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, options) {

    var defaults = { 
        horizontal: false
    }; 

    var options = $.extend({}, defaults, options);

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded,
        inview,
        source;

    this.one("unveil", function() {
      source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) this.setAttribute("src", source);
    });

    function unveil() {
      var counter = 0;
      inview = images.filter(function() {
        var $e = $(this),
            wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height(),
            inViewPort = (eb >= wt - th && et <= wb + th)
            ;

            if (options.horizontal) {
              var wl = $w.scrollLeft(),
              ww = wl + $w.width(),
              ew = $e.offset().left
              ;
              inViewPort = (inViewPort && ww >= ew - th);
            };

            counter++;

        return inViewPort;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    function veil() {
      source = this.getAttribute(attrib);
      source = source || this.getAttribute("src");
      if (source) this.setAttribute("data-src", source);
    }

    $w.scroll(unveil);
    $w.resize(unveil);

    unveil();

    return this;

  };

})(jQuery);


