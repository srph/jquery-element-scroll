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
 * @version 0.6.1
 * @todo 	tests
 * 			elements other than 100% divs
 *
 * @example	http://jsfiddle.net/dPWV8/2/
 *
 * @see http://stackoverflow.com/a/18953765
 * 		Most of the credits and algorithm actually belongs to this post
 */

(function($) {
	/**
	 * {@inherit}
	 *
	 * @param 	integer 	speed
	 * @return 	void
	 */
	var elementScroll = function(speed) {
		// Elements to scroll to
		var _elms = this;

		// Default settings
		var _default = { speed: 400 };

		// Custom settings passed to the function
		var _custom = { speed: speed };

		// Fn settings
		var _settings = $.extend(_default, _custom);

		// Body element
		var body = $(document.body);
			
		// When the DOM is scrolled
		body.on('DOMMouseScroll mousewheel', function (e) {
			e.preventDefault();

			// Event data
			var detail = e.originalEvent.detail;
			var wheelDelta = e.originalEvent.wheelDelta;

			// Scroll direction
			var _dir = getDirection(detail, wheelDelta);

			// Get the current and next element (based on the direction)
			var curElm = getCurrentElm(_elms, _dir);
			var nextElm = getNextElm(curElm, _elms, _dir);

			// Scroll to the next element
			scroll({
				elements: _elms,
				next: nextElm,
				speed: _settings.speed
			});

			// Avoid flickering and stop event
			// IDK lel
			return false;
		});

		// When the arrow key is pressed
		body.keydown(function(e) {
			e.preventDefault();

			// Key code pressed
			var key = e.keyCode;

			// Scroll direction
			var _dir = getArrowPressed(key);

			// Get the current and next element (based on the direction)
			var curElm = getCurrentElm(_elms, _dir);
			var nextElm = getNextElm(curElm, _elms, _dir);

			// Scroll to the next element
			scroll({
				elements: _elms,
				next: nextElm,
				speed: _settings.speed
			});

			return false;
		});
	}

	/**
	 * Get arrow pressed
	 *
	 * @param 	int 	key
	 * @return 	int
	 */
	var getArrowPressed = function(key) {
		switch(key) {
			case 38:
				return 1;
			case 40:
				return 0;
		}

		return;
	}

	/**
	 * Return scroll direction
	 * 1: up
	 * 0: down
	 *
	 * @return 	bool|int
	 */
	var getDirection = function(detail, delta) {
		return ( detail > 0 || delta < 0 )
			? 0
			: 1;
	}

	/**
	 * Get the current element where the window is
	 *
	 * @param 	$ 		elms
	 * @param 	int 	dir
	 * @return 	int
	 */
	var getCurrentElm = function(elms, dir) {
		// Body element
		var body = $(document.body);

		// Window element
		var win = $(window);

		// Reset the element to negative one to
		// assure the dom that we are not on the first element
		var elm = -1;

		// Iterate through each element
		elms.each(function( index ) {
			var current = $(this),
				offset = current.offset();

			// Window current top
			var winTop = win.scrollTop();

			// Determine the index of the current element
			// Apparently, If the body is currently not on
			// the first element, set it to the current
			if ( elm < 0 && offset.top >= winTop ) {
				elm = index;
			}
		});

		return elm;
	}

	/**
	 * Get next element
	 *
	 * @param 	int	elm
	 * @param 	$ 	elms
	 * @param 	int dir
	 * @return 	int
	 */
	var getNextElm = function(elm, elms, dir) {
		// If direction is both upwards and
		// the current element index precedes the first element,
		// continue scrolling upwards
		if ( dir == 1 && elm > 0 ) {
			elm--;
		}

		// If direction is downwards
		// and as long the current element is not the last element
		// Animate the screen downwards towards the next element
		if ( dir == 0 && elm < elms.length - 1 ) {
			elm++;
		}

		return elm;
	}

	/**
	 * Scroll to the provided eq
	 *
	 * @param	obj	opts
	 * @return 	bool
	 */
	var scroll = function(opts) {
		var elements = opts.elements;
		var eq = opts.next;
		var speed = opts.speed;
		// Stop current screen animation
		// then animate by given speed
		$('html, body').stop().animate({
			scrollTop: elements.eq(eq).offset().top
		}, speed);

		return false;
	}

	// Register fn
	$.fn.elmScroll = elementScroll;
})(jQuery);