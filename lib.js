/**
 * Scroll to next element
 * jq-next-element-scroll
 *
 * http://stackoverflow.com/questions/18953652/scroll-a-full-page-height-up-or-down-with-jquery-javascript
 */
(function($) {
	$.fn.extend({
		divScroll: function(speed) {
			// Body element
			var body = $(document.body);

			// Elements to scroll to
			var elms = this;

			// Scroll speed
			speed = ( speed === undefined )
				? 400
				: speed;
			
			body.on('DOMMouseScroll mousewheel', function (e) {
				// Event data
				var detail = e.originalEvent.detail;
				var wheelDelta = e.originalEvent.wheelDelta;

				// Window
				var win = $(window),
					winTop = win.scrollTop();

				// SCreen
				var scr = $('html, body');

				// Scroll direction
				// 1: up
				// 0: down
				var dir = ( detail > 0 || wheelDelta < 0 )
					? 0
					: 1;

				// Currently visible div
				// Default by negative one to reset
				// *....
				var elm = -1;

				//
				elms.each(function( index ) {
					var current = $(this),
						offset = current.offset();

					// Set div to scroll if*....
					if (elm < 0 && offset.top >= winTop ) {
						elm = index;
					}
				});

				//
				if ( dir && div > 0) {
					elms--;
				}

				//
				if ( !dir && div < divs.length ) {
					elms++;
				}		

				// Stop current screen animation
				// then animate by given speed
				scr.stop().animate({
					scrollTop: divs.eq(div).offset().top
				}, speed);
				
				return false;
			});
		}
	});
})(jQuery);