# VMWebServer_Sample_Site

VM Webserver tips:
For this case I am describing tweaking the provided sample site to suit your needs. Some simple Ionic programing tips will alter the sample site easily.

First right click on the webserver script and select 'Server Menu'. Then click 'Server Settings'. Set html path to the 'index.html' file provided by the sample. Leave all other settings as is unless you wish to add a password to the server.
Inside the 'index.html' file you will find the website written in an open source framework called Ionic (2) that works with Angular. When searching to customize your app/site you will need to use them to find the multitude of functions and features you can alter.
The first thing you need to know before altering the sample site is that when you want to see your changes, you will need to clear your cache from whatever browser you are using and THEN refresh.
The first customization you will likely wish to make is to change the webpage's title. To do this, simply locate the 6th line from the top on the 'index.html' file, and replace the text located in between <title></title> with your desired title.
Below this line are the files that this sample site refers to in order to apply css styles, icons, etc. If you need to find or change anything, you will need to use those files in order to do so.
As the sample site sits, it works perfectly on desktops on every browser I used. However, when using mobile devices, the code isn't quite robust enough to handle the different operating systems and the look develops some quirks!
On IOS devices it seemed to transfer fine, but when using an android tablet or phone, the tab bar (the blue bar with the two icons on it) repositioned itself at the top of the page on top of the first row of buttons.The easiest fix for this is to add 3 simple HTML breaks at the top of the page. The actual issue is that the setup files aren't set to read the OS and make the appropriate alterations. I didn't have time to figure out how to fix that but there was lots of material online for it if you wish to properly fix the issue! add:
<br>          
</br>
<br>          
</br>
<br>          
</br>
on the line below this line:
<ion-content ng-controller="FetchController">
Again this is only necessary on mobile android devices!!
Now, if you are needing more than two tabs (either for greater organization or you don't wish to have so many buttons per tab/page, it is simple to add as many tabs as you'd like as well as change the icon representing each tab.
To customize the tab, you will need to change a couple of things. If you pull up the 'ionic.app.css' file, you will see the color scheme syntax at the top. The sample is set to the 'positive' scheme. But if you wish to try a different scheme just locate the 19th line on the 'index.html' file and replace 'positive' with the scheme name of your choosing. This only changes the look and is NOT necessary for functionality!
On the line below you can change the title of the first tab by replacing the text that is inside the quotation marks following 'ion-tab title=' with your desired text.
In order to change the icon representing the first tab you will need to look up the Ionicon name in that same 'ionic.app.css' file. In that file, you can see all the Ionicons that are loaded for use. To see them use this link:
https://infinitered.github.io/ionicons-version-3-search/
Remember it is Ionic 2.0 so the newer icons are not there! Once you have found your desired icon name, copy it and replace the text located in between the quotation marks following 'icon-on=' and then again following 'icon-off='.
 
The next section below the tabs declarations on 'index.html' are the actual buttons. Now you want to make sure your project has all the cue buttons setup as desired before altering the index file yet.
The sample site is already setup to run cue buttons from your project. However there are several other functions that can be utilized. Thos functions and the syntax for them can be found in the 'vmfunctions.js' file which is located in the 'js' folder. The functions are all listed within that document. To use a different function besides a cue button press, you will need to replace the function from the index.html file with the desired function from 'vmfunctions.js'. You do this by copying the text located after the word 'function' from the 'vmfunctions.js' file, and place it in the 'index.html' file inside of the quotation marks where it reads 'VMRunCueButton...'.
This will change the function of the button that line refers to.
For this description we will assume you are simply going to use the cue buttons you've already programmed inside of VM.
IF you are using android mobile devices you will want to change the div class declaration to the following:
<div class="row responsive-sm">
This will make the buttons snap themselves to an invisible grid in a more intuitive and clean way.
Below that line and before this line:
</div>
Are your actual buttons. I found that the buttons being set to '<button on-touch="">' was impractical on mobile devices as when you went to scroll, it would press any button your finger happened to land on to start the scroll or stop the scroll. So I changed this button event to:
on-hold
instead of 'on-touch'. This requires a 500ms hold in order to register a button press. This is not a necessary step IF you are using a non touchscreen device.
The next step is to alter the sample site cue button and group titles to reflect your project. Following 'VMRunCueButton(', is the title of the group of cue buttons in your project you wish to be represented in your website. the second title is the name of the cue button within that group you wish to represent on the site. THESE ARE CASE AND SPACING SENSITIVE! They must be exactly as they are in the project. I found that simply copying and pasting, no matter how simple, was the best method to prevent buttons from not working! At the end of this button's line you will see the sample site's title that appears ON the button itself. Again, simply replace the sample title with your own.
Each row of buttons are contained within the following:
<div class="row responsive-sm">

</div>
If you wish to add more buttons in a given row, simply copy and past another button line and alter the group title, cue button title, and then the website button's title.
For example, here is a single row that has two buttons:
<div class="row responsive-sm">
               <div class="col"><button on-hold="VMRunCueButton('Staff Buttons', 'Start Briefing')" class="button button-full button-large button-balanced">Start Briefing</button></div>
               <div class="col"><button on-hold="VMRunCueButton('Staff Buttons', 'Start Training')" class="button button-full button-large button-balanced">Start Training</button></div>
             </div>

And here is a single row that has three buttons:
<div class="row responsive-sm">
               <div class="col"><button on-hold="VMRunCueButton('Staff Buttons', 'Last Game')" class="button button-full button-large button-balanced">Last Game</button></div>
               <div class="col"><button on-hold="VMRunCueButton('Staff Buttons', 'Cancel Last Game')" class="button button-full button-large button-balanced">Cancel Last Game</button></div>
               <div class="col"><button on-hold="VMRunCueButton('Staff Buttons', 'Reset Votes')" class="button button-full button-large button-balanced">Reset ALL Votes</button></div>
             </div>

Repeat this process until you have every cue button represented, on this first tab, that you desire.
Now, if you don't need any other tabs/pages, you may delete every line from AFTER: '</ion-tab>'
and BEFORE:
     </ion-tabs>

  </body>
</html>

If you wish to alter the next tab, follow the earlier steps on the sample site's next tab which begins at:
<ion-tab title=".....etc.
Again you will want to alter the title, the icon, and then remember to add 3 html breaks if you are using android mobile devices.

Be sure to test on every browser and device that you may be using as it will have slight appearance changes on each. Alter as needed, but what I have above seems to be the simplest and fastest way to make the sample site work to your specifications.
