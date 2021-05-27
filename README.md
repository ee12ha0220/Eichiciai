# Eichiciai

We used HTML, CSS, and Javascript for our assignment. You can go to the public folder in our repository and view our code in the "main" branch. "index.html", "main_idol.css", "main_idol.js" are the codes we implemented. 

## Libraries and frameworks

- Swiper

  We used the [swiper library](https://swiperjs.com/get-started) in the main page of a specific idol. We just used the code in [here](https://codesandbox.io/s/0bwlg), which was provided in the website above. The swiper worked well, but when we put photos inside it, it loaded only after we have opend the developer tools in chrome. We couldn't find any similar experience like this on the internet, so we figured that it was firebase loading issue. 
  
- Dialog

  We used the [dialog library](https://jqueryui.com/dialog/) when opening popups like selecting an answer, reporting a user and etc... 
  
  
## Some notes about our code

- Login

  We needed a login feature in order to add posts, add comments and answers, selecting the best answer. Setting the user ID was important, but we figured authentication will not be that important for our prototype. So we just allowed to login with any ID and password, just storing the information of the ID of the current logged in user. This ID information was used in various ways, for example you can't write anything if you are not logged in, you cannot answer to a question that you have posted, and you can only select the answer of the question that you have posted. 
  
- Shop

  We made the shop menu because the user can buy some miscs(like emoticons) useing their points, which can be obtained by leaving answers in the QnA board. The process of buying was not inculded in our task, but we thougt it would be better if the user can know what they can do with their points. So we made the shop menu to give the user just a feeling about shopping. 
  
  When the user is doing our tasks, he(or she) have to login only once. So we decieded to make a imaginary user that has 4360 points. No matter which ID the user logs in, if the user clicks on user info(which is on the top right of the screen) or goto shop menue the user will see 4360 points. We thought that this would not be a critical issue, because the user will play as a single ID throughout the task. 
  
  
- Photo board

  We implemented photo board by mostly using photo(), photo2() and photo_specific() rendering functions that we've made. Most rendering functions are running by making html divs and images in the javascript.
  

   - photo() : renders photo list board, by making grid view of photo posts. Base design is made in the function and making photo posts preview is in the getphotoData(), which gets data from firebase and make lists of photo, author, schedule of idol of the photo, date, etc. We tried to make every photo thumbnails' size to be similar even if one photo's width > height and another photo's height > width.


   - photo2() : renders writing photo posts board. There are inputs of each category ( title, content , etc), and specifically, we make file uploading function when submitting. There is also calendar to select. 


  - photo_specific() : renders the specific photo post board. Mainly there is an original size of image ( we did not change the size since most user wants the original size) and there are comment lines too. You can add some comments on the photo board. If you click history of the comment, then you can go to the user history page of the user. Also you can report user by clicking report.


- User History

  In the user history page, you can see the specific user's comment history and post history. It is implemented with history function and we get history data from firebase. History data is stored when post is submitted or comment is submitted. If you click the specific post or comment in the history, you can go to the post or comment. Also, you can report the user by clicking report. It is implemented with dialog and if no checkbox is checked in the report, popup alerts.
  
  
- Calendar

  In the calendar page, you can see the whole schedule of idols in the calendar. You can use filter to see the calendar of specific idol that you want. If you click the calendar, you can see the dialog of the schedule.

## Some features we didn't implement
- Video board

  If you are geeking out on idols, watching video clips are mandatory. But seeing video clips was not in our tasks, so we decided to remove it from our prototype because dealing with videos with firebase was a litte tricky. 
  
 - Deleting and editing posts, answers and comments. 

    This was also not implemented because of the similar reason as the video board.  
