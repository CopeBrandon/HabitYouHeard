# Things I'd Change
- Top priority: Fix useEffect running "fetchHabits" every time page resets, massive reason for any loss in performance... I think.
    - If fetchHabits is needed, then consider using [this](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
- General note on optimization: Each time you use an arrow function, it creates a new function each time the component renders, which may break optimizations based on strict identity comparison.
- Maybe allow you to pull up a list of habit meta?
- Finish email feature. Needs formatting, and a page or button.
- Responsive size for all components:
    - Clamp width of tooltip on habit description if it gets too long. Maybe force a maximum size?
    - Size of description box minimum size?
    - Home and Habits page "habit" buttons
    - Appbar gets taller as aspect ratio decreases, might require javascript to calculate whenever viewport changes?
    - Appbar back button needs to be centered better.
    - Possibly add a dropdown if aspect ratio decreases instead of the above.
- Rework getBadgeNameAndURL function to call an instance of an object that contains all data instead of using a series of arrays.
    - Basically, have a "Badge class" that contains the division, its colors, number, ranking in the division, and imgurl
- Calendar related stuff:
    - If previous habit-meta has no data and is from a past date, should be red.
    - Allow you to click in the calendar to change a habit meta.
    - Calendar styling. Today button is lower case??? Make it smaller on the page with some padding.
    - Display inactive habits with a toggle, and allow the user to reactivate or permanently disable them.
    - Possibly allow users to see inactive habitmeta in the calendar.
    - Method to build calendar is slow, might be intrinsic to full calendar, though.(look into only building the calendar once on navigation)
    - Consider how to add a weekly calendar.
- Home page related stuff:
    - Display home page message if user has no habits.
    - Page looks sparse when few habits.
- Sign in related stuff:
    - Color styling to make it stand out more.
    - Change password.
    - Forgot password feature.
    - Consider removing second password in sign up.
    - Add page that is routed from the sign-in page that explains what this website is about.
    - MIGHT add a dark mode toggle in the sign in/ sign up page that doesn't rely on user's token to work
    - Remove user not found and invalid password message, replace with generic so that it can't be brute forced as easily.
    - Users can create multiple users with the same username and email, causing a problem.
- Pruning
    - Consider whether we need theme toggle as a component or simply just move its code into the taskbar.


- Notes from the DOM:
    - [DOM] Input elements should have autocomplete attributes (suggested: "new-password"): (More info: https://goo.gl/9p2vKq) <input aria-invalid=​"false" id=​":​r5:​" type=​"password" class=​"MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input" value>​
signup:1 

    - [DOM] Input elements should have autocomplete attributes (suggested: "new-password"): (More info: https://goo.gl/9p2vKq) <input aria-invalid=​"false" id=​":​r7:​" type=​"password" class=​"MuiInputBase-input MuiInput-input css-1x51dt5-MuiInputBase-input-MuiInput-input" value>​
signin:1 

    - [DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq) <input aria-invalid=​"false" id=​"password-with-visibility-icon" type=​"password" class=​"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd css-1x51dt5-MuiInputBase-input-MuiInput-input" value>​