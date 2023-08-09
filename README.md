# Co-operative bank -  Technical test

To compile the technical test:

 - Run [ git clone https://github.com/PatDobson1/Co-Op.git ]
 - Navigate into Co-op directory [ cd Co-op ]
 - Install [ npm install ]
 - Run [ npm start ]

 Notes:

  - No external libraries used
  - Hooks used - useState, useEffect
  - CSS - all CSS written as basic CSS, generally I would use SCSS (All CSS in 'App.css')
  - Unit testing - I am relatively new to unit testing (especially in React) so, for times sake, I didn't attempt to write unit tests.
  - Bonus (compromise) - For times sake, I didn't create a custom drop-down (as I would need to do add images by the names), instead, to use the image CDN, I placed the country images outside the drop-down
  - Error handling - I have handled the following errors:
    - Non-numeric input (I used a 'text' input element to enable this, generally I'd use a 'number' element and therefore have built in validation)
    - Input less than 0
    - Selection of country with missing data (e.g. 'BTC / Bitcoin')
  - Accessibility -  The app has been checked with ARC Toolkit and passed with some alerts (mainly due to missing header & navigation)
  - Responsive design - As the app is relatively straightforward, only one media query was required - to change the margins at the 840px breakpoint
  - There are a relatively large amount of states in the app, to optimise I would consider combining some of these into larger state objects
