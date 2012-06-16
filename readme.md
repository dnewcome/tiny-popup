# About

TinyPopup is designed to be the most minimal lightbox-style popup window while still
providing robust behavioral characteristics. These are, ability to handle scrolling
without losing position, handling resizing of the browser window, and handling
click-to-close such that we almost can't create an un-dismissable dialog.

# Goals

Single file with all needed styling and behavior. No external css or image 
files required. The total minified size is a bit over 1k, I'd like to keep
it hovering just at the 1k mark.

No external dependencies. We don't need jQuery or anything like that for 
this to work. My initial use case for this library is a userjs/Greasemonkey
script so I don't want to have to pull in any external things to make
this work.

Robust behavior - no funny stuff on different browsers with regards to 
scaling, scrolling, window resizing, getting stuck open, etc.

Mobile support - I'm aiming to fully support mobile devices, although
I've only tested things out on iOS thus far.

Nothing but what is necessary to show a centered popup dialog. No 
extra styling beyond the css positioning code needed to make it show/hide
properly. However, it is styleable externally using css. This is the 
preferred method of working with TinyPopup.

# Future Work

* Provide callback registration for notification of popup dismissal. 
I didn't need this right away so I didn't implement it. However, it 
may fall within scope here.

* Register and coordinate multiple popups. I didn't need this right away
but I'm thinking about providing some support for several different named
popups based on html template chunks. We'd want to use the same shadow
element I think and we'd want to ensure that only one popup can show
at once.

