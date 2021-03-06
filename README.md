jquery-element-scroll
=====================
A basic jquery plugin that allows you to smooth scroll to the preceding / next element

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
	
## Bower ##

	bower install jquery-element-scroll

## Credits ##

See this [stackoverflow answer](http://stackoverflow.com/a/18953765)

## Example ##

See this [fiddle] (http://jsfiddle.net/dPWV8/1/)

## Other Libraries ##

[jquery-scroll-to] (http://demos.flesler.com/jquery/scrollTo/)

[jquery-smooth-scrolling] (https://github.com/kswedberg/jquery-smooth-scroll/)
