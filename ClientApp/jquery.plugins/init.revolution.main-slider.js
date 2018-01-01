      var revapi;
      jQuery(document).ready(function () {
        alert('test');

        revapi = jQuery('.fullwidthbanner').revolution({

          delay: 9000,
          startwidth: 1140,
          startheight: 450,
          hideThumbs: 200,

          thumbWidth: 100,
          thumbHeight: 50,
          thumbAmount: 3,

          navigationType: "none",
          navigationArrows: "solo",
          navigationStyle: "round",

          touchenabled: "on",
          onHoverStop: "on",

          navigationHAlign: "center",
          navigationVAlign: "bottom",
          navigationHOffset: 0,
          navigationVOffset: 20,

          soloArrowLeftHalign: "left",
          soloArrowLeftValign: "center",
          soloArrowLeftHOffset: 20,
          soloArrowLeftVOffset: 0,

          soloArrowRightHalign: "right",
          soloArrowRightValign: "center",
          soloArrowRightHOffset: 20,
          soloArrowRightVOffset: 0,

          shadow: 0,
          fullWidth: "on",
          fullScreen: "off",
          lazyLoad: "on",

          stopLoop: "off",
          stopAfterLoops: -1,
          stopAtSlide: -1,

          shuffle: "off",

          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          startWithSlide: 0,
        });
      });