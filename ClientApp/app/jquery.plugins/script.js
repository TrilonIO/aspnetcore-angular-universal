/* ----------------- Start JS Document ----------------- */

var $ = jQuery.noConflict(),
	deviceAgent = navigator.userAgent.toLowerCase(),
	isTouchDevice = Modernizr.touch || 
		(deviceAgent.match(/(iphone|ipod|ipad)/) ||
		deviceAgent.match(/(android)/)  || 
		deviceAgent.match(/(iemobile)/) || 
		deviceAgent.match(/iphone/i) || 
		deviceAgent.match(/ipad/i) || 
		deviceAgent.match(/ipod/i) || 
		deviceAgent.match(/blackberry/i) || 
		deviceAgent.match(/bada/i));

// Page Loader
$(window).load(function(){
    $('#loader').fadeOut();
    $('.ll').fadeOut();
});

$(document).ready(function($) {
	"use strict";
	
	
	
	/*----------------------------------------------------*/
	/*	Hidder Header
	/*----------------------------------------------------*/
	
	var headerEle = function(){
		var $headerHeight = $('header').height();
		$('.hidden-header').css({ 'height' : $headerHeight  + "px" });
	};
	
	$(window).load(function () {
	  headerEle();
	});
	
	$(window).resize(function () {
	   headerEle();
	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Nice-Scroll
	/*----------------------------------------------------*/
	
	if (!isTouchDevice) {
		$("html").niceScroll({
			scrollspeed: 70,
			mousescrollstep: 38,
			cursorwidth: 8,
			cursorborder: 0,
			cursorcolor: '#333',
			autohidemode: false,
			zindex: 999999999,
			horizrailenabled: false,
			cursorborderradius: 0,
		});
	}
		
	
	
	
	
	/*----------------------------------------------------*/
	/*	Nav Menu & Search
	/*----------------------------------------------------*/
	
	$(".nav > li:has(ul)").addClass("drop");
	$(".nav > li.drop > ul").addClass("dropdown");
	$(".nav > li.drop > ul.dropdown ul").addClass("sup-dropdown");
	
	$('.show-search').click(function() {
		$('.search-form').fadeIn(300);
		$('.search-form input').focus();
	});
	$('.search-form input').blur(function() {
		$('.search-form').fadeOut(300);
	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Back Top Link
	/*----------------------------------------------------*/
	
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    })
	
	
	
	
	/*----------------------------------------------------*/
	/*	Sliders & Carousel
	/*----------------------------------------------------*/
	
	////------- Touch Slider
	//var time = 4.4,
	//	$progressBar,
	//	$bar,
	//	$elem,
	//	isPause,
	//	tick,
	//	percentTime;
	//$('.touch-slider').each(function(){
	//	var owl = jQuery(this),
	//		sliderNav = $(this).attr('data-slider-navigation'),
	//		sliderPag = $(this).attr('data-slider-pagination'),
	//		sliderProgressBar = $(this).attr('data-slider-progress-bar');
			
	//	if ( sliderNav == 'false' || sliderNav == '0' ) {
	//		var returnSliderNav = false
	//	}else {
	//		var returnSliderNav = true
	//	}
		
	//	if ( sliderPag == 'true' || sliderPag == '1' ) {
	//		var returnSliderPag = true
	//	}else {
	//		var returnSliderPag = false
	//	}
		
	//	if ( sliderProgressBar == 'true' || sliderProgressBar == '1' ) {
	//		var returnSliderProgressBar = progressBar
	//		var returnAutoPlay = false
	//	}else {
	//		var returnSliderProgressBar = false
	//		var returnAutoPlay = true
	//	}
		
	//	owl.owlCarousel({
	//		navigation : returnSliderNav,
	//		pagination: returnSliderPag,
	//		slideSpeed : 400,
	//		paginationSpeed : 400,
	//		lazyLoad : true,
	//		singleItem: true,
	//		autoHeight : true,
	//		autoPlay: returnAutoPlay,
	//		stopOnHover: returnAutoPlay,
	//		transitionStyle : "fade",
	//		afterInit : returnSliderProgressBar,
	//		afterMove : moved,
	//		startDragging : pauseOnDragging
	//	});
		
	//});

    //function progressBar(elem){
	//	$elem = elem;
	//	buildProgressBar();
	//	start();
    //}
	
    //function buildProgressBar(){
	//	$progressBar = $("<div>",{
	//		id:"progressBar"
	//	});
	//	$bar = $("<div>",{
	//		id:"bar"
	//	});
	//	$progressBar.append($bar).prependTo($elem);
    //}
	
	//function start() {
	//	percentTime = 0;
	//	isPause = false;
	//	tick = setInterval(interval, 10);
    //};
 
    //function interval() {
	//	if(isPause === false){
	//		percentTime += 1 / time;
	//		$bar.css({
	//			width: percentTime+"%"
	//		});
	//		if(percentTime >= 100){
	//			$elem.trigger('owl.next')
	//		}
	//	}
    //}
	
    //function pauseOnDragging(){
    //  isPause = true;
    //}
	
    //function moved(){
    //  clearTimeout(tick);
    //  start();
    //}
	
	
	
	////------- Projects Carousel
	//$(".projects-carousel").owlCarousel({
	//	navigation : true,
	//	pagination: false,
	//	slideSpeed : 400,
	//	stopOnHover: true,
    //	autoPlay: 3000,
    //	items : 4,
    //	itemsDesktopSmall : [900,3],
	//	itemsTablet: [600,2],
	//	itemsMobile : [479, 1]
	//});
	
	
	
	////------- Testimonials Carousel
	$(".testimonials-carousel").owlCarousel({
		navigation : true,
		pagination: false,
		slideSpeed : 2500,
		stopOnHover: true,
    	autoPlay: 3000,
    	singleItem:true,
		autoHeight : true,
		transitionStyle : "fade"
	});
	
	
	
	
	////------- Testimonials Carousel
	//$(".fullwidth-projects-carousel").owlCarousel({
	//	navigation : false,
	//	pagination: false,
	//	slideSpeed : 400,
	//	stopOnHover: true,
    //	autoPlay: 3000,
    //	items : 5,
    //	itemsDesktopSmall : [900,3],
	//	itemsTablet: [600,2],
	//	itemsMobile : [479, 1]
	//});
	
	
	
	////------- Custom Carousel
	//$('.custom-carousel').each(function(){
	//	var owl = jQuery(this),
	//		itemsNum = $(this).attr('data-appeared-items'),
	//		sliderNavigation = $(this).attr('data-navigation');
			
	//	if ( sliderNavigation == 'false' || sliderNavigation == '0' ) {
	//		var returnSliderNavigation = false
	//	}else {
	//		var returnSliderNavigation = true
	//	}
	//	if( itemsNum == 1) {
	//		var deskitemsNum = 1;
	//		var desksmallitemsNum = 1;
	//		var tabletitemsNum = 1;
	//	} 
	//	else if (itemsNum >= 2 && itemsNum < 4) {
	//		var deskitemsNum = itemsNum;
	//		var desksmallitemsNum = itemsNum - 1;
	//		var tabletitemsNum = itemsNum - 1;
	//	} 
	//	else if (itemsNum >= 4 && itemsNum < 8) {
	//		var deskitemsNum = itemsNum -1;
	//		var desksmallitemsNum = itemsNum - 2;
	//		var tabletitemsNum = itemsNum - 3;
	//	} 
	//	else {
	//		var deskitemsNum = itemsNum -3;
	//		var desksmallitemsNum = itemsNum - 6;
	//		var tabletitemsNum = itemsNum - 8;
	//	}
	//	owl.owlCarousel({
	//		slideSpeed : 300,
	//		stopOnHover: true,
	//		autoPlay: 3000,
	//		navigation : returnSliderNavigation,
	//		pagination: false,
	//		lazyLoad : true,
	//		items : itemsNum,
	//		itemsDesktop : [1000,deskitemsNum],
	//		itemsDesktopSmall : [900,desksmallitemsNum],
	//		itemsTablet: [600,tabletitemsNum],
	//		itemsMobile : false,
	//		transitionStyle : "goDown",
	//	});
	//});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Tabs
	/*----------------------------------------------------*/
	
	$('#myTab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})
	
	
	
	
	/*----------------------------------------------------*/
	/*	Css3 Transition
	/*----------------------------------------------------*/
	
	$('*').each(function(){
		if($(this).attr('data-animation')) {
			var $animationName = $(this).attr('data-animation'),
				$animationDelay = "delay-"+$(this).attr('data-animation-delay');
			$(this).appear(function() {
				$(this).addClass('animated').addClass($animationName);
				$(this).addClass('animated').addClass($animationDelay);
			});
		}
	});
	
	
	
	
	/*----------------------------------------------------*/
	/*	Pie Charts
	/*----------------------------------------------------*/
	
	var pieChartClass = 'pieChart',
        pieChartLoadedClass = 'pie-chart-loaded';
		
	function initPieCharts() {
		var chart = $('.' + pieChartClass);
		chart.each(function() {
			$(this).appear(function() {
				var $this = $(this),
					chartBarColor = ($this.data('bar-color')) ? $this.data('bar-color') : "#F54F36",
					chartBarWidth = ($this.data('bar-width')) ? ($this.data('bar-width')) : 150
				if( !$this.hasClass(pieChartLoadedClass) ) {
					$this.easyPieChart({
						animate: 2000,
						size: chartBarWidth,
						lineWidth: 2,
						scaleColor: false,
						trackColor: "#eee",
						barColor: chartBarColor,
					}).addClass(pieChartLoadedClass);
				}
			});
		});
	}
	initPieCharts();
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Animation Progress Bars
	/*----------------------------------------------------*/
	
	$("[data-progress-animation]").each(function() {
		
		var $this = $(this);
		
		$this.appear(function() {
			
			var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
			
			if(delay > 1) $this.css("animation-delay", delay + "ms");
			
			setTimeout(function() { $this.animate({width: $this.attr("data-progress-animation")}, 800);}, delay);

		}, {accX: 0, accY: -50});

	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Milestone Counter
	/*----------------------------------------------------*/
	
	jQuery('.milestone-block').each(function() {
		jQuery(this).appear(function() {
			var $endNum = parseInt(jQuery(this).find('.milestone-number').text());
			jQuery(this).find('.milestone-number').countTo({
				from: 0,
				to: $endNum,
				speed: 4000,
				refreshInterval: 60,
			});
		},{accX: 0, accY: 0});
	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Nivo Lightbox
	/*----------------------------------------------------*/
	
	$('.lightbox').nivoLightbox({
		effect: 'fadeScale',
		keyboardNav: true,
		errorMessage: 'The requested content cannot be loaded. Please try again later.'
	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Change Slider Nav Icons
	/*----------------------------------------------------*/

	//$('.touch-slider').find('.owl-prev').html('<i class="icon-left-open-big"></i>');
	//$('.touch-slider').find('.owl-next').html('<i class="icon-right-open-big"></i>');
	//$('.touch-carousel, .testimonials-carousel').find('.owl-prev').html('<i class="icon-angle-left"></i>');
	//$('.touch-carousel, .testimonials-carousel').find('.owl-next').html('<i class="icon-angle-right"></i>');
	//$('.read-more').append('<i class="icon-right-open-mini"></i>');
	
	
	
	
	/*----------------------------------------------------*/
	/*	Tooltips & Fit Vids & Parallax & Text Animations
	/*----------------------------------------------------*/
	
	$("body").fitVids();
	
	//$('.sh-tooltip').tooltip();
	
	$('.bg-parallax').each(function() {
		$(this).parallax("30%", 0.2);
	});
	
	//$('.tlt').textillate({
	//	loop: true,
	//	in: {
	//		effect: 'fadeInUp',
	//		delayScale: 2,
	//		delay: 50,
	//		sync: false,
	//		shuffle: false,
	//		reverse: true,
	//	},
	//	out: {
	//		effect: 'fadeOutUp',
	//		delayScale: 2,
	//		delay: 50,
	//		sync: false,
	//		shuffle: false,
	//		reverse: true,
	//	},
	//});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Sticky Header
	/*----------------------------------------------------*/
	
	(function() {
		
		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 100;
			document.querySelector( 'header' );
			
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 250 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$('.top-bar').slideUp(300);
				$("header").addClass("fixed-header");
				$('.navbar-brand').css({ 'padding-top' : 8 + "px", 'padding-bottom' : 8 + "px", 'width' : 75 + "%" });
				
				if (/iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width() < 479 ){
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 0 + "px", 'padding-bottom' : 0 + "px" })
				}else{
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 20 + "px", 'padding-bottom' : 20 + "px" })
					$('.search-side').css({ 'margin-top' : -7 + "px" });
				};
				
			}
			else {
				$('.top-bar').slideDown(300);
				$("header").removeClass("fixed-header");
				$('.navbar-brand').css({ 'padding-top' : 8 + "px", 'padding-bottom' : 8 + "px", 'width' : 100 + "%" });
				
				if (/iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width() < 479 ){
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 0 + "px", 'padding-bottom' : 0 + "px" })
				}else{
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 28 + "px", 'padding-bottom' : 28 + "px" })
					$('.search-side').css({ 'margin-top' : 0  + "px" });
				};
				
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
		
		
	})();
});




/*----------------------------------------------------*/
/*	Portfolio Isotope
/*----------------------------------------------------*/

//jQuery(window).load(function(){
	
//	var $container = $('#portfolio');
//	$container.isotope({
//		layoutMode : 'masonry',
//		filter: '*',
//		animationOptions: {
//			duration: 750,
//			easing: 'linear',
//			queue: false,
//		}
//	});

//	$('.portfolio-filter ul a').click(function(){
//		var selector = $(this).attr('data-filter');
//		$container.isotope({
//			filter: selector,
//			animationOptions: {
//				duration: 750,
//				easing: 'linear',
//				queue: false,
//			}
//		});
//	  return false;
//	});

//	var $optionSets = $('.portfolio-filter ul'),
//	    $optionLinks = $optionSets.find('a');
//	$optionLinks.click(function(){
//		var $this = $(this);
//		if ( $this.hasClass('selected') ) { return false; }
//		var $optionSet = $this.parents('.portfolio-filter ul');
//		$optionSet.find('.selected').removeClass('selected');
//		$this.addClass('selected'); 
//	});
	
//});
/* ----------------- End JS Document ----------------- */








// Styles Switcher JS
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);



$(document).ready(function(){
	
	// Styles Switcher
	$(document).ready(function(){
		$('.open-switcher').click(function(){
			if($(this).hasClass('show-switcher')) {
				$('.switcher-box').css({'left': 0});
				$('.open-switcher').removeClass('show-switcher');
				$('.open-switcher').addClass('hide-switcher');
			}else if(jQuery(this).hasClass('hide-switcher')) {
				$('.switcher-box').css({'left': '-212px'});
				$('.open-switcher').removeClass('hide-switcher');
				$('.open-switcher').addClass('show-switcher');
			}
		});
	});
	
	//Top Bar Switcher
	$(".topbar-style").change(function(){
		if( $(this).val() == 1){
			$(".top-bar").removeClass("dark-bar"),
			$(".top-bar").removeClass("color-bar"),
			$(window).resize();
		} else if( $(this).val() == 2){
			$(".top-bar").removeClass("color-bar"),
			$(".top-bar").addClass("dark-bar"),
			$(window).resize();
		} else if( $(this).val() == 3){
			$(".top-bar").removeClass("dark-bar"),
			$(".top-bar").addClass("color-bar"),
			$(window).resize();
		}
	});
	
	//Layout Switcher
	$(".layout-style").change(function(){
		if( $(this).val() == 1){
			$("#container").removeClass("boxed-page"),
			$(window).resize();
		} else{
			$("#container").addClass("boxed-page"),
			$(window).resize();
		}
	});
	
	//Background Switcher
	$('.switcher-box .bg-list li a').click(function() {
		var current = $('.switcher-box select[id=layout-style]').find('option:selected').val();
		if(current == '2') {
			var bg = $(this).css("backgroundImage");
			$("body").css("backgroundImage",bg);
		} else {
			alert('Please select boxed layout');
		}
	});

});