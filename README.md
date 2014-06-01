jquery-element-scroll
=====================
Scroll to the preceding / following element

Intended to be used for 100% height divs (for SPAs) to imitate scrolling by
applications such as mediafire, etc.

Recommended to be paired with hidden body scroll bar,
however not implemented with this library for it is beyond the purpose
of this library.

Thinking of renaming this library to 'jquery-div-scroller'

## Instructions ##

To use, simply:
	
    $('.my-element').elmScroll();
    
```elmScroll()``` accepts 1 int argument for custom scrolling speed

	$('.my-element').elmScroll(700);

## Credits ##

See this [stackoverflow answer](http://jsfiddle.net/dPWV8/)
