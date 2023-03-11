# JSON example

# --------------------------------------------------------------------------------------------------------
#   Fifa Leaderboards

#   Hugo Agnola
#   id: 40116274
# --------------------------------------------------------------------------------------------------------


# --------------------------------------------------------------------------------------------------------
# Introduction:
This project utilizes a football api (https://www.api-football.com/), which fetches in live time fifa data from games played in past seasons. In this app, we pull player data from every world cup since 2010, and every champion's league since 2011.
The server is hosted on port 3000 and only has a single webpage (single html file) which switches the stats displayed with javascript and the manipulation of elements by their ID. The dependencies can be installed with ("npm i --force").
# --------------------------------------------------------------------------------------------------------


# --------------------------------------------------------------------------------------------------------
# The design of the page:
For my web page I decided to opt for a minamalistic design with a sharp and slanted drop down menu where the user can select which stats they would like to display. The foundation of the drop down menu is courtesy of Catalin Red (https://catalin.red/dropdown-menu-concept/). I implemented it and modified it to fit my page. First and formost I modified the elements of the list (submenu) so instead of < a > tags, it uses < label > tags. Next I added < input type="checkbox"> tags for each item in the drop down submenu so my p5.js script can detect wether or not an option was selected by pulling it's .checked attribute (returns true or false). The reason I opted for a full css nav bar drop down menu was simple. The p5.js DOM element of 'selector' is incredibly ugly and I wanted my page to look sleek and minimalistic (the default selector has also very little customizability with css and makes the page look like it came from the windows XP era).

The page itself is layed out so the user can clearly see who the top players of each season of both leagues are, with the top three being displayed in large at the top with their respective team flags above them (funilly enough displaying the flags was also an issue which I will get into later in the "Issues Encountered Section"), and their scoring stats bellow them. The other twelve players in the top fifteen are displayed on the bottom left, next to the big year and league text. Since displaying flags already caused me so many headaches, I opted to simply have their team name written out next to their full name, with their stats under them. This worked.
# --------------------------------------------------------------------------------------------------------

# --------------------------------------------------------------------------------------------------------
# How the data is stored:
Once a socket connection is established between the user and the backend, the p5.js script emits in sequance, one by one, sockets with parameters for each season we want to store. These are stored in local arrays which can then be pulled easily since they are stored in the front end. In retrospect I could've organized these arrays better by putting them into a list or even better, a JSON.
# --------------------------------------------------------------------------------------------------------


# --------------------------------------------------------------------------------------------------------
# Why are there so many authenticators?:
Whilst pulling this data to store localy, I was constantly encountering issues with which array it would be stored to (aka. 2022 world cup data would be stored in the 2018 world cup array etc...). So once again I brute forced it by adding authenticators so the script would know when the data was already pulled and saved (both seperate bool authenticators). 

Having all of these proxy's makes it so, even when a socket with settings A is sent more then one time, it wont empeed on the saving of socket with settings B. Basically I started by adding one wall to block rogue data (switch statement daving function), when that didn't work completely I added a second wall (dataPulled bool). And finally to nail it in, since I still was encountering issues, a third wall (dataSaved bool). This worked
# --------------------------------------------------------------------------------------------------------


# --------------------------------------------------------------------------------------------------------
# Issues encountered:
I encountered some issues when it came to dynamically data fetching data from the api. My standard solution is emiting a socket to the node backendm, with a list of settings on which data is to be pulled from the api. That data upon being pulled will be sent back in socket form to the backend. This socket communication works perfectly when the user connects to the webpage. However once the connection was established, I had issues repeating this function. So I decided to brute force it, hence pulling all the data at once when the user connects.
Moving on to the issues I had in the frontend. The first was actually quite simple and straight forward. Some players just have insanely long names, so I had to kind of guess/estimate the size of the text box where the player name is stored and written. All and all a simple fix that took 20 mins. The real headache came from displaying the flags... oh boy was that kind of annoying... Since each team's flag is conveniently stored in the api as a url, I had to find a way to make this work with p5. My first crack at the porblem was to try and dynamically preloaded everything in an array in the front end, but that approach gave me a migraine as preload executes before the setup function where the script pulls all the data from the api (and I told myself I wasn't going to touch the backend AT ALL after I made it function correctly). So I scrapped that idea and moved on to my next idea, which consisted of displaying the image and an < img src > in the html and then modify the .src of the element by using the getDocumentById() method in js. This worked, however then came the next step, placing them accordingly. Since this DOM element doesn't like the .position() method in p5 (no matter how much I tried to make it), I begrungingly turned to using CSS. Before I get into that escapade, I must first insist on how silly it is that modifying the position of the canvas or, god forbid, an element in the HTML, creates an unholy amounts of overlapping issues (with the nav bar being behind the canvas, or the 'funniest' one I had was the nav bar being flipped upside down, I don't know how that happened but it did. I followed this up by pressing command + z until I felt satisfied). Going back to the CSS, which I ended up sticking to, I did some good old fashion brute forcing. I tried to first have the names of the top 3 played stacked on top of each other, but < img src > didn't like the idea of a vertical hierarchy so refuesed to comply. In the end I stuck to having the player's names side by side, to appease the concerns of < img src > and I ended up with what I have now.
# --------------------------------------------------------------------------------------------------------