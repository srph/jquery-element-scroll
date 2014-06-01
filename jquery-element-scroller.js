/**
 * jquery-element-scroll
 * 
 * Scroll to the preceding / following element
 *
 * Intended to be used for 100% height divs (for SPAs) to imitate scrolling by
 * applications such as mediafire, etc.
 *
 * Recommended to be paired with hidden body scroll bar,
 * however not implemented with this library for it is beyond the purpose
 * of this library.
 *
 * Thinking of renaming this library to 'jquery-div-scroller'
 *
 * @version 0.1
 * @todo 	tests
 * 			elements other than 100% divs
 *
 * @see http://stackoverflow.com/a/18953765
 * 		Most of the credits and algorithm actually belongs to this post
 */

(function($) {
	$.fn.elmScroll = function(speed) {
		// Body element
		var body = $(document.body);

		// Window element
		var win = $(window);

		// Elements to scroll to
		var elms = this; 

		// Fn settings
		var settings = $.extend({
			speed: '400'
		}, {
			speed: speed
		});
        
        // Starts with the first element
        // Zero by default since screen starts
        // with the zero/first element
       var elm = 0;
			
		body.on('DOMMouseScroll mousewheel', function (e) {
			// Event data
			var detail = e.originalEvent.detail;
			var wheelDelta = e.originalEvent.wheelDelta;

			// Scroll direction
			// 1: up
			// 0: down
			var dir = ( detail > 0 || wheelDelta < 0 )
				? 0
				: 1;

			// Window current top
			var winTop = win.scrollTop();

			// Currently visible div
			// Default by negative one to reset
			// *....
			var elm = -1;

			// Iterate through each element
			elms.each(function( index ) {
				var current = $(this),
					offset = current.offset();

				// Determine the index of the current element
				// Apparently, If the body is currently not on
				// the first element, set it to the current
				if (elm < 0 && offset.top >= winTop ) {
					elm = index;
				}
			});

			// If direction is upwards and
			// the current element is negative
			if ( dir && elm > 0) {
				elm--;
			}

			// If direction is downwards
			// and as long the current element is not the last element
			// Animate th screen downwards towards the next element
			if ( !dir && elm < elms.length ) {
				elm++;
			}		

			// Stop current screen animation
			// then animate by given speed
			body.stop().animate({
				scrollTop: elms.eq(elm).offset().top
			}, settings.speed);

			// Avoid flickering and stop event
			// IDK lel
			return false;
		});
	}
})(jQuery);