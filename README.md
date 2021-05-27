# Eichiciai

We used HTML, CSS, and Javascript for our assignment. You can go to the public folder in our repository and view our code in the "main" branch. "index.html", "main_ido.css", "main_idol.js" are the codes we implemented. 

## Libraries and frameworks

- Swiper

  We used the [swiper library](https://swiperjs.com/get-started) in the main page of a specific idol. We just used the code in [here](https://codesandbox.io/s/0bwlg), which was provided in the website above. The swiper worked well, but when we put photos inside it, it loaded only after we have opend the developer tools in chrome. We couldn't find any similar expirience like this, so we figured that it was firebase loading issue. 
  
- Dialog

  We used the [dialog library](https://jqueryui.com/dialog/) when opening popups like selecting an answer, reporting a user and etc... 
  
  
## Some notes about our code

- Login

  We needed a login feature in order to add posts, add comments and answers, selecting the best answer. Setting the user ID was important, but we figured authentication will not be that important for our prototype. So we just allowed to login with any ID and password, just storing the information of the ID of the current logged in user. This ID information was used in various ways, for example you can't write anything if you are not logged in, you cannot answer to a question that you have posted, and you can only select the answer of the question that you have posted. 
  
- Shop

  We made the shop menu because the user can buy some miscs(like emoticons) useing their points, which can be obtained by leaving answers in the QnA board. The process of buying was not inculded in our task, but we thougt it would be better if the user can know what they can do with their points. So we made the shop menu to give the user just a feeling about shopping. 
  
  When the user is doing our tasks, he(or she) have to login only once. So we decieded to make a imaginary user that has 4360 points. No matter which ID the user logs in, if the user clicks on user info(which is on the top right of the screen) or goto shop menue the user will see 4360 points. We thought that this would not be a critical issue, because the user will play as a single ID throughout the task. 


## Some features we didn't implement
- Video board

  If you are geeking out on idols, watching video clips are mandatory. But seeing video clips was not in our tasks, so we decided to remove it from our prototype because dealing with videos with firebase was a litte tricky. 
  
 - Deleting and editing posts, answers and comments. 

    This was also not implemented because of the similar reason as the video board.  
