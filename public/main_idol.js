$(document).ready(function () {
  var filter = document.getElementById("filter");

  var firebaseConfig = {
    apiKey: "AIzaSyACT6acGeh9iFqQBDmkcAQc1Hzs9obUzr8",
    authDomain: "starlight-5a11b.firebaseapp.com",
    databaseURL: "https://starlight-5a11b-default-rtdb.firebaseio.com",
    projectId: "starlight-5a11b",
    storageBucket: "starlight-5a11b.appspot.com",
    messagingSenderId: "725820928370",
    appId: "1:725820928370:web:77593ae49597a445acadeb",
    measurementId: "G-L5J6STQN97",
  };
  firebase.initializeApp(firebaseConfig);

  var qnanum = 0;
  var freenum = 0;
  var starnum = 0;
  var photonum = 0;
  var historynum = 0;
  var current_state = "main";
  var selected_filter;
  var f_qna;
  var f_key;
  var f_qnaanswer;
  var author_of_question;

  var fr_qna;
  var fr_key;
  var fr_freecomments;

  var letter_key;
  var letter_val;

  var f_photo;
  var f_key_photo;
  var f_total_commentnum;

  var selected_answer;
  var idol = $("#filter").val();
  var current_user = "nologin";

  function getCommentData() {
    firebase
      .database()
      .ref("/qna/" + f_key)
      .once("value")
      .then((snapshot) => {
        var qnaval = snapshot.val();
        if (qnaval.comments == null) return;
        var keyList = Object.keys(qnaval.comments);
        qnanum = keyList.length;
        var current;
        var state = qnaval.selected;

        for (var i = qnanum - 1; i >= 0; i--) {
          current = qnaval.comments[keyList[i]];
          addcomment(current, state);
        }
      });
  }

  function getCommentData_photo() {
    firebase
      .database()
      .ref("/photo/" + f_key_photo)
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        if (photoval.comments == null) return;
        var keyList = Object.keys(photoval.comments);
        photonum = keyList.length;
        var current;

        for (var i = photonum - 1; i >= 0; i--) {
          current = photoval.comments[keyList[i]];
          addcomment_photo(current);
        }
      });
  }

  function getFreeCommentData() {
    firebase
      .database()
      .ref("/free/" + fr_key)
      .once("value")
      .then((snapshot) => {
        var freeval = snapshot.val();
        if (freeval.comments == null) return;
        var keyList = Object.keys(freeval.comments);
        freenum = keyList.length;
        var current;
        var state = freeval.selected;

        for (var i = freenum - 1; i >= 0; i--) {
          current = freeval.comments[keyList[i]];
          addfreecomment(current, state);
        }
      });
  }

  function getqnaData() {
    firebase
      .database()
      .ref("/qna")
      .once("value")
      .then((snapshot) => {
        var qnaval = snapshot.val();
        if (qnaval == null) return;
        var keyList = Object.keys(qnaval);
        qnanum = keyList.length;
        var current;

        for (var i = qnanum - 1; i >= 0; i--) {
          current = qnaval[keyList[i]];
          if (current.idol == idol || idol == "All") addqna(current);
        }
      });
  }

  function getHistoryData(author) {
    firebase
      .database()
      .ref("/history/" + author)
      .once("value")
      .then((snapshot) => {
        var historyval = snapshot.val();
        if (historyval == null) return;
        var keyList = Object.keys(historyval);
        historynum1 = keyList.length;
        var historynum = document.getElementById("historynum");
        historynum.innerHTML = "log : " + historynum1.toString();
        var current;
        for (var i = historynum1 - 1; i >= 0; i--) {
          current = historyval[keyList[i]];
          addhistory(current);
        }
      });
  }

  function getnoticeData() {
    firebase
      .database()
      .ref("/notice")
      .once("value")
      .then((snapshot) => {
        var noticeval = snapshot.val();
        if (noticeval == null) return;
        var keyList = Object.keys(noticeval);
        noticenum = keyList.length;
        var current;

        for (var i = noticenum - 1; i >= 0; i--) {
          current = noticeval[keyList[i]];
          if (current.idol == idol || idol == "All") addnotice(current);
        }
      });
  }

  function getfreeData() {
    firebase
      .database()
      .ref("/free")
      .once("value")
      .then((snapshot) => {
        var freeval = snapshot.val();
        if (freeval == null) return;
        var keyList = Object.keys(freeval);
        freenum = keyList.length;
        var current;

        for (var i = freenum - 1; i >= 0; i--) {
          current = freeval[keyList[i]];
          if (current.idol == idol || idol == "All") addfree(current);
        }
      });
  }

  function getStarData() {
    firebase
      .database()
      .ref("/star")
      .once("value")
      .then((snapshot) => {
        var starval = snapshot.val();
        if (starval == null) return;
        var keyList = Object.keys(starval);
        starnum = keyList.length;
        var current;

        for (var i = starnum - 1; i >= 0; i--) {
          current = starval[keyList[i]];
          if (current.idol == idol || idol == "All") addstar(current);
        }
      });
  }

  function addstar(starval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "text-align:center;");

    var h1 = document.createElement("p");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = starval.no;

    var h2 = document.createElement("p");
    h2.setAttribute("class", "star_post_title");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;cursor:pointer;"
    );
    h2.innerHTML = starval.title;

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = starval.author;

    var h4 = document.createElement("p");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = starval.idol;

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = starval.date;

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function addqna(qnaval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "text-align:center;");

    var h1 = document.createElement("p");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = qnaval.no;

    var h2 = document.createElement("p");
    h2.setAttribute("class", "question");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;"
    );
    h2.innerHTML = qnaval.title;

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 25%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = qnaval.author;

    var h4 = document.createElement("p");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = qnaval.answer;

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = qnaval.date;

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function addhistory(qnaval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");

    var h2 = document.createElement("p");
    h2.setAttribute("class", "history_specific");
    h2.setAttribute(
      "style",
      "width: 60%;font-family: Roboto, serif;margin-left:20px"
    );
    if (
      qnaval.type == "photocomment" ||
      qnaval.type == "qnacomment" ||
      qnaval.type == "freecomment"
    ) {
      h2.innerHTML = qnaval.content;
    } else {
      h2.innerHTML = qnaval.title;
    }

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 25%;font-family: Roboto, serif;text-align:right;margin-right:20px"
    );
    h3.innerHTML = qnaval.date;

    var h4 = document.createElement("p");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;display:none"
    );
    if (qnaval.type == "photocomment" || qnaval.type == "qnacomment") {
      h4.innerHTML = qnaval.question_key;
    } else if (qnaval.type == "freecomment") {
      h4.innerHTML = qnaval.free_key;
    } else {
      h4.innerHTML = qnaval.index;
    }

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;display:none"
    );
    h5.innerHTML = qnaval.type;

    // div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function addnotice(qnaval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "text-align:center;");

    var h1 = document.createElement("p");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = qnaval.no;

    var h2 = document.createElement("p");
    h2.setAttribute("class", "notice");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;cursor:pointer;"
    );
    h2.innerHTML = qnaval.title;

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = qnaval.author;

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = qnaval.date;

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function addcomment_photo(commentval) {
    var target_div = document.getElementById("photo_comments");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "height:auto;margin-left:0px;margin-right:0px");

    var h1 = document.createElement("p");
    h1.setAttribute("style", "width:20%;font-family: Roboto, serif;");
    h1.innerHTML = commentval.author;

    var h2 = document.createElement("p");
    h2.setAttribute("style", "width: 80%;font-family: Roboto, serif;");
    h2.innerHTML = commentval.content;

    var text1 = document.createElement("p");
    text1.setAttribute("ID", "history");
    text1.setAttribute(
      "style",
      "width: 5%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    );
    text1.innerHTML = "History";

    var text2 = document.createElement("p");
    text2.setAttribute(
      "style",
      "width: 6%;text-align:right;font-size:14px;color:red;cursor:pointer;font-family: Roboto, serif;"
    );
    text2.setAttribute("ID", "ban");
    text2.innerHTML = 'Report <i class="fas fa-ban"></i>';

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(text1);
    div1.appendChild(text2);

    target_div.appendChild(div1);
  }

  function addcomment_photo_new(commentval) {
    var target_div = document.getElementById("photo_comments");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "height:auto;margin-left:0px;margin-right:0px");

    var h1 = document.createElement("p");
    h1.setAttribute("style", "width:20%;font-family: Roboto, serif;");
    h1.innerHTML = commentval.author;

    var h2 = document.createElement("p");
    h2.setAttribute("style", "width: 80%;font-family: Roboto, serif;");
    h2.innerHTML = commentval.content;

    var text1 = document.createElement("p");
    text1.setAttribute("ID", "history");
    text1.setAttribute(
      "style",
      "width: 5%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    );
    text1.innerHTML = "History";
    var text2 = document.createElement("p");
    text2.setAttribute(
        "style",
        "width: 6%;text-align:right;font-size:14px;color:red;cursor:pointer;font-family: Roboto, serif;"
    );
    text2.setAttribute("ID", "ban");
    text2.innerHTML = 'Report <i class="fas fa-ban"></i>';

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(text1);
    div1.appendChild(text2);

    target_div.insertBefore(div1, target_div.firstChild);
  }

  function addfree(qnaval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "text-align:center;");

    var h1 = document.createElement("p");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = qnaval.no;

    var h2 = document.createElement("p");
    h2.setAttribute("class", "free_post_title");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;cursor:pointer;"
    );
    h2.innerHTML = qnaval.title;

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = qnaval.author;

    var h4 = document.createElement("p");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = qnaval.commentsnum;

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = qnaval.date;

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function addcomment(commentval, state) {
    var target_div = document.getElementById("qna_comments");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "height:auto");

    var h1 = document.createElement("p");
    if (commentval.selected == true) {
      h1.setAttribute("style", "color:#2f80ed;width:20%");
    } else h1.setAttribute("style", "width:20%;font-family: Roboto, serif");
    h1.innerHTML = commentval.author;

    var h2 = document.createElement("p");
    if (commentval.selected == true) {
      h2.setAttribute("style", "color:#2f80ed;width:80%");
    } else h2.setAttribute("style", "width: 80%;font-family: Roboto, serif");
    h2.innerHTML = commentval.content;

    var text1 = document.createElement("p");
    text1.setAttribute(
      "style",
      "margin-right:10px;width:5%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    );
    text1.setAttribute("ID", "history");
    text1.innerHTML = "History";

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(text1);

    var text2 = document.createElement("p");
    text2.setAttribute(
      "style",
      "margin-right:10px;width:6%;text-align:right;font-size:14px;color:red;cursor:pointer;font-family: Roboto, serif;"
    );
    text2.setAttribute("ID", "ban");
    text2.innerHTML = 'Report <i class="fas fa-ban"></i>';
    div1.appendChild(text2);

    if (!state) {
      if (f_qna.author == current_user) {
        var button1 = document.createElement("button");
        button1.setAttribute("class", "selectbtn");
        button1.setAttribute("style", "font-family: Roboto, serif;");
        button1.innerHTML = "SELECT";
        div1.appendChild(button1);
      }
    } else {
      if (commentval.selected == true) {
        var button1 = document.createElement("button");
        button1.setAttribute("class", "selectedbtn");
        button1.setAttribute("style", "font-family: Roboto, serif;");
        button1.innerHTML = "SELECTED";
        div1.appendChild(button1);
      }
    }

    target_div.appendChild(div1);
  }

  function addfreecomment(commentval, state) {
    var target_div = document.getElementById("free_comments");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    div1.setAttribute("style", "height:auto");

    var h1 = document.createElement("p");
    h1.setAttribute("style", "width:20%;font-family: Roboto, serif;");
    h1.innerHTML = commentval.author;

    var h2 = document.createElement("p");
    h2.setAttribute("style", "width: 80%;font-family: Roboto, serif;");
    h2.innerHTML = commentval.content;

    var text1 = document.createElement("p");
    text1.setAttribute(
      "style",
      "width: 5%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    );
    text1.setAttribute("ID", "history");
    text1.innerHTML = "History";

    var text2 = document.createElement("p");
    text2.setAttribute(
      "style",
      "width: 6%;text-align:right;font-size:14px;color:red;cursor:pointer;font-family: Roboto, serif;"
    );
    text2.setAttribute("ID", "ban");
    text2.innerHTML = 'Report <i class="fas fa-ban"></i>';

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(text1);
    div1.appendChild(text2);

    target_div.appendChild(div1);
  }

  function getswiperData(div) {
    firebase
      .database()
      .ref("/photo")
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        if (photoval == null) return;
        var keyList = Object.keys(photoval);
        var randList = [];
        photonum = keyList.length;

        for (var i = 0; i < 3; i++) {
          rand = Math.floor(Math.random() * photonum);
          if (randList.indexOf(rand) === -1) randList.push(rand);
          else i--;
        }

        for (var i = 0; i < 3; i++) {
          current = photoval[keyList[randList[i]]];
          readphoto(div, current, keyList[randList[i]]);
        }
      });
  }

  function readphoto(div, photoval, keyval) {
    var storage = firebase.storage().ref();
    var hidden = document.createElement("div");
    hidden.setAttribute("style", "display:none");
    hidden.innerHTML = keyval;
    storage
      .child(photoval.photourl)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        var swipe_page = document.createElement("div");
        swipe_page.setAttribute("class", "swiper-slide");
        var img = document.createElement("img");
        img.setAttribute("src", url);
        img.setAttribute("style", "object-fit: cover;");
        swipe_page.appendChild(img);
        swipe_page.appendChild(hidden);
        div.appendChild(swipe_page);
      });
  }

  function getidolData(div, target) {
    firebase
      .database()
      .ref("/idolinfo")
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        if (photoval == null) return;
        var keyList = Object.keys(photoval);
        photonum = keyList.length;
        var current;

        for (var i = 0; i < photonum; i++) {
          current = photoval[keyList[i]];
          addidol(div, current, target);
        }
      });
  }

  function addidol(div, current, target) {
    var div0 = document.createElement("div");
    div0.setAttribute("style", "display:inline-block;cursor: pointer;");
    var storage = firebase.storage().ref();
    storage
      .child(current.mainphoto)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        var img = document.createElement("img");
        img.setAttribute("src", url);
        img.setAttribute("class", "image_main");
        div0.appendChild(img);
        var hidden = document.createElement("div");
        hidden.setAttribute("style", "display:none");
        hidden.innerHTML = current.name;
        div0.appendChild(hidden);
        div.insertBefore(div0, target);
      });
  }

  function getphotoData(div) {
    firebase
      .database()
      .ref("/photo")
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        if (photoval == null) return;
        var keyList = Object.keys(photoval);
        photonum = keyList.length;
        var current;

        for (var i = photonum - 1; i >= 0; i--) {
          current = photoval[keyList[i]];
          if (current.idol == idol || idol == "All") {
            if (current_state == "main")
              addphoto_main(div, current, keyList[i]);
            else addphoto(current, i);
          }
        }
      });
  }

  function getphotoData_bySchedule(div) {
    firebase
      .database()
      .ref("/photo")
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        if (photoval == null) return;
        var keyList = Object.keys(photoval);
        photonum = keyList.length;
        var current;

        for (var i = photonum - 1; i >= 0; i--) {
          current = photoval[keyList[i]];
          if (current.idol == idol || idol == "All") {
            // if (current_state == "main")
            //   addphoto_main(div, current, keyList[i]);
            // else addphoto(current);
            addphoto(current);
          }
        }
      });
  }

  function addphoto(photoval, num) {
    var target_div = document.getElementById("write-div");
    var div_chunks = document.getElementById("photochunks");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "photochunk");
    var h1 = document.createElement("div");
    h1.setAttribute("class", "photoheader");
    h1.setAttribute("class", "photo_button_title");
    h1.setAttribute(
      "style",
      "height: 4%; cursor:pointer;margin-bottom: 10px;font-size: 23px;font-weight: bold;"
    );
    h1.innerHTML = photoval.title;

    var div_img = document.createElement("div");
    div_img.setAttribute(
      "style",
      "width: 200px; height: 200px; cursor:pointer;align-items:center;display:flex;align-items:center;justify-content:center"
    );
    div_img.setAttribute("class", "photo_button");
    var h2 = document.createElement("img");
    h2.setAttribute("class", "photoheader");
    var storage = firebase.storage().ref();
    storage
      .child(photoval.photourl)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        h2.src = url;
        return url;
      })
      .then((url) => {
        var img = new Image();
        img.onload = function () {
          if (this.width < this.height) {
            h2.setAttribute("style", "width: auto; height: 200px");
          } else {
            h2.setAttribute("style", "width: 200px; height: auto");
          }
        };
        img.src = url;

        div_img.appendChild(h2);
      });

    var h3 = document.createElement("div");
    h3.setAttribute("class", "photoheader");
    h3.setAttribute("style", "height: 4%;margin-bottom: 10px;");
    h3.innerHTML = photoval.author;

    var h5 = document.createElement("div");
    h5.setAttribute("class", "photoheader");
    h5.setAttribute("style", "height: 4%;margin-bottom: 10px;");
    h5.innerHTML = photoval.date;

    var h6 = document.createElement("div");
    h6.setAttribute("class", "photoheader");
    h6.setAttribute("style", "height: 4%;margin-bottom: 10px;");
    h6.innerHTML = "schedule: " + photoval.schedule;

    var h_content = document.createElement("div");
    h_content.setAttribute("class", "photoheader");
    h_content.setAttribute(
      "style",
      "height: 4%;margin-bottom: 10px;display:none"
    );
    h_content.innerHTML = photoval.content;

    var hidden = document.createElement("div");
    hidden.setAttribute("style", "display:none");
    hidden.innerHTML = num + 1;

    div1.appendChild(h6);
    div1.appendChild(div_img);
    div1.appendChild(h1);
    div1.appendChild(h3);
    div1.appendChild(h5);
    div1.appendChild(h_content);
    div1.appendChild(hidden);

    div_chunks.appendChild(div1);
  }

  function addphoto_main(div, photoval, keyval) {
    var div0 = document.createElement("div");
    div0.setAttribute("style", "display:inline-block");
    var h2 = document.createElement("img");
    var hidden = document.createElement("div");
    hidden.setAttribute("style", "display:none");
    hidden.innerHTML = keyval;

    h2.setAttribute("class", "image_main_idol_2");
    var storage = firebase.storage().ref();
    storage
      .child(photoval.photourl)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        h2.src = url;
        return url;
      })
      .then((url) => {
        var img = new Image();
        img.onload = function () {
          h2.setAttribute("class", "image_main_idol_2");
        };
        img.src = url;

        div0.appendChild(h2);
        div0.appendChild(hidden);
        div.appendChild(div0);
      });
  }

  function main() {
    var parent = document.getElementById("contents");
    var div0 = document.createElement("div");
    div0.setAttribute("ID", "bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left;margin-left:20px; margin-right:20px;border-bottom:4px solid black"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Featured");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div0.appendChild(div1);

    var swipe = document.createElement("div");
    swipe.setAttribute("class", "swiper-container mySwiper");
    var swipe_wrapper = document.createElement("div");
    swipe_wrapper.setAttribute("class", "swiper-wrapper");
    getswiperData(swipe_wrapper);
    swipe.appendChild(swipe_wrapper);
    var pagination = document.createElement("div");
    pagination.setAttribute("class", "swiper-pagination");
    swipe.appendChild(pagination);
    div0.appendChild(swipe);

    var div2 = document.createElement("div");
    div2.setAttribute(
      "style",
      "text-align:left;margin-top: 40px;margin-left:20px; margin-right:20px;"
    );

    var strong2 = document.createElement("STRONG");
    strong2.setAttribute("style", "font-size:30px;");

    var text2 = document.createTextNode("My Idols");

    strong2.appendChild(text2);
    div2.appendChild(strong2);
    div0.appendChild(div2);

    var myidol = document.createElement("div");
    myidol.setAttribute("style", "text-align:left;margin-left:20px");

    var btn = document.createElement("button");
    btn.setAttribute("ID", "main_btn");
    btn.setAttribute(
      "style",
      "width:280px; height:200px; vertical-align:top; margin-top:20px; font-size:50px;border-radius:10px"
    );
    var plus = document.createTextNode("+");
    btn.appendChild(plus);
    myidol.appendChild(btn);

    getidolData(myidol, btn);

    div0.appendChild(myidol);
    parent.appendChild(div0);
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  function idolmain() {
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var parent = document.getElementById("contents");
    var div0 = document.createElement("div");
    div0.setAttribute("style", "float:left; width:80%;margin-left:20px");

    var div1 = document.createElement("div");

    firebase
      .database()
      .ref("/idolinfo/" + idol)
      .once("value")
      .then((snapshot) => {
        var storage = firebase.storage().ref();
        var src = snapshot.val().mainphoto;
        var img0 = document.createElement("img");
        storage
          .child(src)
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            img0.src = url;
            img0.setAttribute("class", "image_main_idol_1");
            return url;
          });
        div1.appendChild(img0);
        div0.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute(
          "style",
          "text-align:left;margin-top: 40px;margin-left:20px; margin-right:20px;"
        );

        var strong2 = document.createElement("STRONG");
        strong2.setAttribute("style", "font-size:30px;");

        var text2 = document.createTextNode("Hot photos");

        strong2.appendChild(text2);
        div2.appendChild(strong2);
        div0.appendChild(div2);

        var div3 = document.createElement("div");
        div3.setAttribute("style", "width:1020px;");

        getphotoData(div3);
        div0.appendChild(div3);

        div.appendChild(div0);

        var div4 = document.createElement("div");
        div4.setAttribute("style", "float:left; width: 18%;margin-top:20px");

        var div5 = document.createElement("div");
        div5.setAttribute(
          "style",
          "text-align:center; border-top : 3px #1087FF solid;border-bottom : 3px #666666 solid"
        );
        var text2 = document.createElement("p");
        text2.setAttribute(
          "style",
          "font-family: Roboto, serif; font-size: 23px;line-height:5px"
        );
        text2.innerHTML = "Notice";
        div5.appendChild(text2);
        div4.appendChild(div5);

        var div6 = document.createElement("div");
        div6.setAttribute("style", "background:#E3EAF1;");
        div6.setAttribute("ID", "notice_list");

        getnoticeData_mainpage();
        div4.appendChild(div6);

        var div7 = document.createElement("div");
        div7.setAttribute(
          "style",
          "text-align:center; margin-top:20px;border-top : 3px #1087FF solid;border-bottom : 3px #666666 solid"
        );
        var text3 = document.createElement("p");
        text3.setAttribute(
          "style",
          "font-family: Roboto, serif; font-size: 23px;line-height:5px"
        );
        text3.innerHTML = "Schedule";
        div7.appendChild(text3);
        div4.appendChild(div7);

        var div8 = document.createElement("div");
        div8.setAttribute("style", "background:#E3EAF1;");
        if (idol == "BTS") {
          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "BTS 'Butter' group teaser 1";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "BTS 'Butter' group teaser 2";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "BTS 'Butter' Comeback Showcase";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "BTS BBMA";
          div9.appendChild(h1);
          div8.appendChild(div9);
        }
        if (idol == "G-IDLE") {
          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "G-IDLE Minnie Web Drama Poster";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "G-IDLE Minnie Web Drama Poster";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML =
            "• " + "G-IDLE Yuqi 'Bonnie & Clyde' Spoiler Selfie.ver";
          div9.appendChild(h1);
          div8.appendChild(div9);

          var div9 = document.createElement("div");
          div9.setAttribute(
            "style",
            "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
          );
          var h1 = document.createElement("p");
          h1.setAttribute("class", "main_schedule");
          h1.innerHTML = "• " + "G-IDLE Minnie Bazzar Magazine";
          div9.appendChild(h1);
          div8.appendChild(div9);
        }

        div4.appendChild(div8);

        div.appendChild(div4);
        parent.appendChild(div);
      });
  }

  function getnoticeData_mainpage() {
    firebase
      .database()
      .ref("/notice")
      .once("value")
      .then((snapshot) => {
        var noticeval = snapshot.val();
        if (noticeval == null) return;
        var keyList = Object.keys(noticeval);
        noticenum = keyList.length;
        var current;

        for (var i = noticenum - 1; i >= 0; i--) {
          current = noticeval[keyList[i]];
          if (current.idol == idol || idol == "All")
            addnotice_mainpage(current);
        }
      });
  }

  function addnotice_mainpage(noticeval) {
    var parent = document.getElementById("notice_list");
    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "border-radius:10px;background-color: white; text-align: left; margin-left: 10px; margin-right: 5px;"
    );

    var h1 = document.createElement("p");
    h1.innerHTML = "• " + noticeval.title;
    h1.setAttribute("class", "main_notice");
    div1.appendChild(h1);
    var div2 = document.createElement("div");
    div2.setAttribute("style", "display:none");
    div2.innerHTML = noticeval.no;
    div1.appendChild(div2);
    parent.appendChild(div1);
  }

  function imageadder(parent_div, img_src, img_alt, img_class) {
    var img = document.createElement("img");
    img.setAttribute("src", img_src);
    img.setAttribute("alt", img_alt);
    img.setAttribute("class", img_class);

    parent_div.appendChild(img);
  }

  function qna1() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("QnA Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline_ori");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;"
    );
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 25%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = "Author";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = "Answer";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = "Date";

    div2.appendChild(h1);
    div2.appendChild(h2);
    div2.appendChild(h3);
    div2.appendChild(h4);
    div2.appendChild(h5);

    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");

    var btn = document.createElement("button");
    btn.setAttribute("ID", "write_button");
    btn.setAttribute(
      "style",
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.innerHTML = "Write";

    div3.appendChild(btn);
    div.appendChild(div3);

    parent.appendChild(div);

    getqnaData();
  }

  function qna2() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size: 40px");
    strong1.innerHTML = "Write a Question!";

    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    var input1 = document.createElement("input");
    input1.setAttribute("placeholder", "Enter a Title...");
    input1.setAttribute(
      "style",
      "width: 98%;margin-bottom: 10px;height: 30px;margin-top: 8px"
    );
    input1.setAttribute("ID", "qnaTitle");

    div2.appendChild(input1);
    div.appendChild(div2);

    var div3 = document.createElement("div");
    var input2 = document.createElement("input");
    input2.setAttribute("placeholder", "Enter a Question...");
    input2.setAttribute("style", "width: 98%; height: 430px");
    input2.setAttribute("ID", "qnaContents");

    div3.appendChild(input2);
    div.appendChild(div3);

    var div4 = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute(
      "style",
      "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.setAttribute("ID", "submitqna");
    btn.innerHTML = "Submit";

    div4.appendChild(btn);
    div.appendChild(div4);

    parent.appendChild(div);
  }

  function free_write() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size: 40px");
    strong1.innerHTML = "Write a Free Post!";

    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    var input1 = document.createElement("input");
    input1.setAttribute("placeholder", "Enter a Title...");
    input1.setAttribute(
      "style",
      "width: 98%;margin-bottom: 10px;height: 30px;margin-top: 8px"
    );
    input1.setAttribute("ID", "freeTitle");

    div2.appendChild(input1);
    div.appendChild(div2);

    var div3 = document.createElement("div");
    var input2 = document.createElement("input");
    input2.setAttribute("placeholder", "Enter your free thoughts...");
    input2.setAttribute("style", "width: 98%; height: 430px");
    input2.setAttribute("ID", "freeContents");

    div3.appendChild(input2);
    div.appendChild(div3);

    var div4 = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute(
      "style",
      "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.setAttribute("ID", "submitfree");
    btn.innerHTML = "Submit";

    div4.appendChild(btn);
    div.appendChild(div4);

    parent.appendChild(div);
  }

  function star_page() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Star Letter");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline_ori");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;"
    );
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = "Author";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = "Idol";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = "Date";

    div2.appendChild(h1);
    div2.appendChild(h2);
    div2.appendChild(h3);
    div2.appendChild(h4);
    div2.appendChild(h5);

    div.appendChild(div2);
    parent.appendChild(div);

    getStarData();
  }

  function starpost() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Star Letter");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

    var letterno = document.createElement("div");
    letterno.setAttribute("class", "qnaheader");
    letterno.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    letterno.innerHTML = "Letter No." + letter_val.no;

    var letterauthor = document.createElement("div");
    letterauthor.setAttribute("class", "qnaheader");
    letterauthor.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    letterauthor.innerHTML = letter_val.author;

    div2.appendChild(letterno);
    div2.appendChild(letterauthor);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "qnaline");
    div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var lettertitle = document.createElement("div");
    lettertitle.setAttribute("class", "qnaheader");
    lettertitle.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    lettertitle.innerHTML = letter_val.title;

    var lettertime = document.createElement("div");
    lettertime.setAttribute("class", "qnaheader");
    lettertime.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    lettertime.innerHTML = letter_val.date;

    div3.appendChild(lettertitle);
    div3.appendChild(lettertime);

    var div4 = document.createElement("div");
    div4.innerHTML = letter_val.content;
    div4.setAttribute("style", "margin:20px;font-family: Roboto, serif;");

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);

    parent.appendChild(div);
  }

  function qnapost() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("QnA Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

    var qnano = document.createElement("div");
    qnano.setAttribute("class", "qnaheader");
    qnano.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnano.innerHTML = "Question No." + f_qna.no;

    var qnaauthor = document.createElement("div");
    qnaauthor.setAttribute("class", "qnaheader");
    qnaauthor.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnaauthor.innerHTML = f_qna.author;

    div2.appendChild(qnano);
    div2.appendChild(qnaauthor);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "qnaline");
    div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var qnatitle = document.createElement("div");
    qnatitle.setAttribute("class", "qnaheader");
    qnatitle.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnatitle.innerHTML = f_qna.title;

    var qnatime = document.createElement("div");
    qnatime.setAttribute("class", "qnaheader");
    qnatime.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnatime.innerHTML = f_qna.date;

    div3.appendChild(qnatitle);
    div3.appendChild(qnatime);

    var div4 = document.createElement("div");
    div4.innerHTML = f_qna.content;
    div4.setAttribute("style", "margin:20px;font-family: Roboto, serif;");

    var div5 = document.createElement("div");

    var leaveans = document.createElement("input");
    leaveans.setAttribute("ID", "comment_input");
    leaveans.setAttribute(
      "style",
      "height: 80px;width: 88%;margin-left:20px;margin-top:30px"
    );

    var enterans = document.createElement("button");
    enterans.setAttribute("ID", "enterans");
    enterans.setAttribute(
      "style",
      "height:86px;width:86px;margin-left:10px;font-family: Roboto, serif;"
    );
    enterans.innerHTML = "Enter";

    div5.appendChild(leaveans);
    div5.appendChild(enterans);
    // div5.appendChild(qnaedit);
    // div5.appendChild(qnadelete);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "qnaline");
    div6.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var answernum = document.createElement("h4");
    answernum.setAttribute("style", "font-family: Roboto, serif;");
    answernum.innerHTML = "Answers(" + f_qnaanswer + ")";

    div6.appendChild(answernum);

    var div7 = document.createElement("div");
    div7.setAttribute("ID", "qna_comments");

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);
    div.appendChild(div5);
    div.appendChild(div6);
    div.appendChild(div7);

    parent.appendChild(div);

    getCommentData();
    //reshape();
  }

  function noticepost(n_qna) {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Notice");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

    var qnano = document.createElement("div");
    qnano.setAttribute("class", "qnaheader");
    qnano.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnano.innerHTML = "Notice No." + n_qna.no;

    var qnaauthor = document.createElement("div");
    qnaauthor.setAttribute("class", "qnaheader");
    qnaauthor.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnaauthor.innerHTML = n_qna.author;

    div2.appendChild(qnano);
    div2.appendChild(qnaauthor);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "qnaline");
    div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var qnatitle = document.createElement("div");
    qnatitle.setAttribute("class", "qnaheader");
    qnatitle.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnatitle.innerHTML = n_qna.title;

    var qnatime = document.createElement("div");
    qnatime.setAttribute("class", "qnaheader");
    qnatime.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnatime.innerHTML = n_qna.date;

    div3.appendChild(qnatitle);
    div3.appendChild(qnatime);

    var div4 = document.createElement("div");
    div4.innerHTML = n_qna.content;
    div4.setAttribute(
      "style",
      "margin:20px;font-family: Roboto, serif;border-bottom:2px solid #2B5A89;padding-bottom: 20px;"
    );

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);

    parent.appendChild(div);
  }

  function freepost() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Free Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

    var qnano = document.createElement("div");
    qnano.setAttribute("class", "qnaheader");
    qnano.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnano.innerHTML = "Free No." + fr_qna.no;

    var qnaauthor = document.createElement("div");
    qnaauthor.setAttribute("class", "qnaheader");
    qnaauthor.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnaauthor.innerHTML = fr_qna.author;

    div2.appendChild(qnano);
    div2.appendChild(qnaauthor);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "qnaline");
    div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var qnatitle = document.createElement("div");
    qnatitle.setAttribute("class", "qnaheader");
    qnatitle.setAttribute(
      "style",
      "width:50%; text-align:left;font-family: Roboto, serif;"
    );
    qnatitle.innerHTML = fr_qna.title;

    var qnatime = document.createElement("div");
    qnatime.setAttribute("class", "qnaheader");
    qnatime.setAttribute(
      "style",
      "width:50%;text-align: right;font-family: Roboto, serif;"
    );
    qnatime.innerHTML = fr_qna.date;

    div3.appendChild(qnatitle);
    div3.appendChild(qnatime);

    var div4 = document.createElement("div");
    div4.innerHTML = fr_qna.content;
    div4.setAttribute("style", "margin:20px;font-family: Roboto, serif;");

    var div5 = document.createElement("div");

    var leaveans = document.createElement("input");
    leaveans.setAttribute("ID", "free_comment_input");
    leaveans.setAttribute(
      "style",
      "height: 80px;width: 88%;margin-left:20px;margin-top:30px"
    );

    var enterans = document.createElement("button");
    enterans.setAttribute("ID", "fr_entercomment");
    enterans.setAttribute(
      "style",
      "height:86px;width:86px;margin-left:10px;font-family: Roboto, serif;"
    );
    enterans.innerHTML = "Enter";

    div5.appendChild(leaveans);
    div5.appendChild(enterans);
    // div5.appendChild(qnaedit);
    // div5.appendChild(qnadelete);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "qnaline");
    div6.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var answernum = document.createElement("h4");
    answernum.setAttribute("style", "font-family: Roboto, serif;");
    answernum.innerHTML = "Comments(" + fr_freecomments + ")";

    div6.appendChild(answernum);

    var div7 = document.createElement("div");
    div7.setAttribute("ID", "free_comments");

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);
    div.appendChild(div5);
    div.appendChild(div6);
    div.appendChild(div7);

    parent.appendChild(div);

    getFreeCommentData();
    //reshape();
  }

  function photo() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");
    var div_chunks = document.createElement("div");
    div_chunks.setAttribute("ID", "photochunks");
    div_chunks.setAttribute(
      "style",
      "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;margin-top:10px;margin-left:10px"
    );

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px; margin-right:0%");

    var text1 = document.createTextNode("Photo Board");

    var small1 = document.createElement("SMALL");
    small1.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray;font-family: Roboto, serif;"
    );

    var text2 = document.createTextNode("By Schedule");

    var small2 = document.createElement("SMALL");
    small2.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray;font-family: Roboto, serif;"
    );

    var text3 = document.createTextNode("Latest");

    var small3 = document.createElement("SMALL");
    small3.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray;font-family: Roboto, serif;"
    );

    var text4 = document.createTextNode("Hottest");
    strong1.appendChild(text1);
    // small1.appendChild(text2);
    // small2.appendChild(text3);
    // small3.appendChild(text4);

    div1.appendChild(strong1);
    div1.appendChild(small1);
    div1.appendChild(small2);
    div1.appendChild(small3);

    div.appendChild(div1);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");

    var btn = document.createElement("button");
    btn.setAttribute("ID", "write_button_photo");
    btn.setAttribute(
      "style",
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.innerHTML = "Write";

    div3.appendChild(btn);
    div.appendChild(div_chunks);
    div.appendChild(div3);

    parent.appendChild(div);

    getphotoData();
  }
  function previewImage(f) {
    var file = f.files;
    if (!/\.(gif|jpg|jpeg|png)$/i.test(file[0].name)) {
      alert(
        "gif, jpg, png 파일만 선택해 주세요.\n\n현재 파일 : " + file[0].name
      );
      f.outerHTML = f.outerHTML;
      document.getElementById("image_container").innerHTML = "";
    } else {
      var reader = new FileReader();
      reader.onload = function (rst) {
        document.getElementById("image_container").innerHTML =
          '<img src="' + rst.target.result + '">';
      };
      reader.readAsDataURL(file[0]);
    }
  }
  function photo2() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute(
      "style",
      "font-size: 40px;font-family: Roboto, serif;"
    );
    strong1.innerHTML = "Upload a photo!";

    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    var input1 = document.createElement("input");
    input1.setAttribute("placeholder", "Enter a Title...");
    input1.setAttribute(
      "style",
      "width: 98%;margin-bottom: 10px;height: 30px;margin-top: 8px"
    );
    input1.setAttribute("ID", "photoTitle");

    div2.appendChild(input1);
    div.appendChild(div2);

    var div_file = document.createElement("div");
    var input_file = document.createElement("input");
    var image_container = document.createElement("div");
    image_container.setAttribute("ID", "image_container");
    input_file.setAttribute("type", "file");
    input_file.setAttribute("style", "width: 50%; height: 50px");
    input_file.setAttribute("ID", "image");
    input_file.onchange = function () {
      previewImage(this);
    };
    div_file.appendChild(input_file);
    div_file.appendChild(image_container);
    div.appendChild(div_file);

    var div3 = document.createElement("div");
    var input2 = document.createElement("input");
    input2.setAttribute("placeholder", "Write anything...");
    input2.setAttribute("style", "width: 98%; height: 430px");
    input2.setAttribute("ID", "photoContents");

    div3.appendChild(input2);
    div.appendChild(div3);

    var div4 = document.createElement("div");
    var schedule = document.createTextNode("Select schedule :");
    var input3 = document.createElement("input");
    input3.setAttribute("type", "date");
    input3.setAttribute("ID", "schedule");
    div4.appendChild(schedule);
    div4.appendChild(input3);
    div.appendChild(div4);

    var div4 = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute(
      "style",
      "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.setAttribute("ID", "submitphoto");
    btn.innerHTML = "Submit";

    div4.appendChild(btn);
    div.appendChild(div4);

    parent.appendChild(div);
  }

  function specific_photo(content) {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");
    var div_chunks = document.createElement("div");
    div_chunks.setAttribute("ID", "photochunks");
    div_chunks.setAttribute(
      "style",
      "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;"
    );

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;font-family: Roboto, serif;");

    var text1 = document.createTextNode("Photo Board");

    strong1.appendChild(text1);

    div1.appendChild(strong1);

    div.appendChild(div1);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");
    div3.setAttribute("style", "margin-left:20px;margin-right:20px;");
    var div_content = document.createElement("div");
    div_content.setAttribute(
      "style",
      "display : flex; flex-direction: column;"
    );
    var schedule_div = document.createElement("div");
    schedule_div.setAttribute("class", "qnaline");
    schedule_div.setAttribute(
      "style",
      "display : flex;height:40px;font-family: Roboto, serif;border-bottom:0px"
    );
    var schedule = document.createElement("div");
    schedule.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 35px;font-family: Roboto, serif;"
    );
    schedule.innerHTML = content[0].innerHTML;

    var img = document.createElement("img");
    img.setAttribute("src", content[1].firstChild.src);
    img.setAttribute(
      "style",
      "width: " +
        content[1].firstChild.width +
        "px; height: " +
        content[1].firstChild.height +
        "px"
    );

    var header = document.createElement("div");
    header.setAttribute("class", "qnaline");
    header.setAttribute(
      "style",
      "display : flex;border-bottom:4px solid #2B5A89;margin:0px"
    );
    var contents = document.createElement("div");
    contents.setAttribute("style", "display : flex;");

    var title = document.createElement("div");
    title.setAttribute(
      "style",
      "font-size: 18px;margin-left:10px;font-family: Roboto, serif"
    );
    title.innerHTML = "Title: " + content[2].innerHTML;
    var author = document.createElement("div");
    author.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 20px;font-family: Roboto, serif;margin-right:10px"
    );
    author.innerHTML = content[3].innerHTML;
    var date = document.createElement("div");
    date.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 20px;font-family: Roboto, serif;margin-right:10px"
    );
    date.innerHTML = "Date: " + content[4].innerHTML;
    var content_html = document.createElement("div");
    content_html.setAttribute(
      "style",
      "font-size: 30px;font-family: Roboto, serif;margin-left:10px"
    );
    content_html.innerHTML = content[5].innerHTML;

    header.appendChild(title);
    header.appendChild(date);
    schedule_div.appendChild(schedule);
    contents.appendChild(content_html);
    contents.appendChild(author);
    div_content.appendChild(header);

    div_content.appendChild(schedule_div);
    div_content.appendChild(img);

    div_content.appendChild(contents);

    div3.appendChild(div_content);

    var div5 = document.createElement("div");
    var leavecomment = document.createElement("input");
    leavecomment.setAttribute("ID", "comment_input_photo");
    leavecomment.setAttribute(
      "style",
      "height: 80px;width: 88%;margin-left:20px;margin-top:30px"
    );

    var entercomment = document.createElement("button");
    entercomment.setAttribute("ID", "entercomment");
    entercomment.setAttribute(
      "style",
      "height:86px;width:86px;margin-left:10px;font-family: Roboto, serif;"
    );
    entercomment.innerHTML = "Enter";

    div5.appendChild(leavecomment);
    div5.appendChild(entercomment);
    // div5.appendChild(qnaedit);
    // div5.appendChild(qnadelete);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "commentline");
    div6.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var commentnum = document.createElement("h4");
    commentnum.setAttribute("style", "font-family: Roboto, serif;");
    commentnum.setAttribute("ID", "comment_number");
    commentnum.innerHTML = "Comments (" + f_total_commentnum + ")";
    // commentnum.innerHTML = "Comments(2)";

    // var text1 = document.createElement("p");
    // text1.setAttribute(
    //   "style",
    //   "width: 10%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    // );
    // text1.setAttribute("ID", "history");
    // text1.innerHTML = "History";

    div6.appendChild(commentnum);
    // div6.appendChild(text1);

    var div7 = document.createElement("div");
    div7.setAttribute("ID", "photo_comments");

    div3.appendChild(div5);
    div3.appendChild(div6);
    div3.appendChild(div7);

    div.appendChild(div_chunks);
    div.appendChild(div3);

    parent.appendChild(div);
    getCommentData_photo();
  }

  function free_page() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Free Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline_ori");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;"
    );
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = "Author";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h4.innerHTML = "Comments";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = "Date";

    div2.appendChild(h1);
    div2.appendChild(h2);
    div2.appendChild(h3);
    div2.appendChild(h4);
    div2.appendChild(h5);

    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");

    var btn = document.createElement("button");
    btn.setAttribute("ID", "free_write_button");
    btn.setAttribute(
      "style",
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;"
    );
    btn.innerHTML = "Write";

    div3.appendChild(btn);
    div.appendChild(div3);

    parent.appendChild(div);

    getfreeData();
  }

  function notice_page() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Notice");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline_ori");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute(
      "style",
      "width: 10%;font-family: Roboto, serif;margin:auto;"
    );
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute(
      "style",
      "width: 40%;font-family: Roboto, serif;margin:auto;"
    );
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute(
      "style",
      "width: 35%;font-family: Roboto, serif;margin:auto;"
    );
    h3.innerHTML = "Author";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 15%;font-family: Roboto, serif;margin:auto;"
    );
    h5.innerHTML = "Date";

    div2.appendChild(h1);
    div2.appendChild(h2);
    div2.appendChild(h3);
    div2.appendChild(h5);

    div.appendChild(div2);

    parent.appendChild(div);

    getnoticeData();
  }

  function shop_page() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("Shop");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline_ori");

    var p1 = document.createElement("p");
    p1.setAttribute("style", "font-family: Roboto, serif");
    p1.setAttribute("ID", "shop_yourpts");
    p1.innerHTML = "Your Points : 4360 points";

    div2.appendChild(p1);
    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("style", "display: flex");

    var div4 = document.createElement("div");
    div4.setAttribute("style", "width:25%;");
    var img1 = document.createElement("img");
    //img1.setAttribute("src", '../images/bts_emoticon1.jpg');
    img1.setAttribute("height", "280");
    img1.setAttribute("style", "margin-left: 20px; margin-top: 10px");
    var img1_title = document.createElement("h4");
    img1_title.innerHTML = "[BTS]Emoticon ver.4";
    img1_title.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-3px;text-decoration: underline;"
    );
    var img1_cost = document.createElement("p");
    img1_cost.innerHTML = "300 points";
    img1_cost.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-15px;font-family: Roboto,serif;"
    );
    var img1_btn_div = document.createElement("div");
    img1_btn_div.setAttribute("style", "text-align:center");
    var img1_btn = document.createElement("button");
    img1_btn.innerHTML = "BUY";
    img1_btn.setAttribute("ID", "img1_btn");
    img1_btn.setAttribute(
      "style",
      "font-size: 20px;background-color:#2b5a89;color:white;margin-top:-1px"
    );
    img1_btn_div.appendChild(img1_btn);

    var div5 = document.createElement("div");
    div5.setAttribute("style", "width:25%;");
    var img2 = document.createElement("img");
    //img2.setAttribute("src", '../images/bts_emoticon2.jpg');
    img2.setAttribute("height", "280");
    img2.setAttribute("style", "margin-left: 38px; margin-top: 10px");
    var img2_title = document.createElement("h4");
    img2_title.innerHTML = "[BTS]Emoticon ver.3";
    img2_title.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-3px;text-decoration: underline"
    );
    var img2_cost = document.createElement("p");
    img2_cost.innerHTML = "300 points";
    img2_cost.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-15px;font-family: Roboto,serif;"
    );
    var img2_btn_div = document.createElement("div");
    img2_btn_div.setAttribute("style", "text-align:center");
    var img2_btn = document.createElement("button");
    img2_btn.innerHTML = "BUY";
    img2_btn.setAttribute("ID", "img2_btn");
    img2_btn.setAttribute(
      "style",
      "font-size: 20px;background-color:#2b5a89;color:white;margin-top:-1px"
    );
    img2_btn_div.appendChild(img2_btn);

    var div6 = document.createElement("div");
    div6.setAttribute("style", "width:25%;");
    var img3 = document.createElement("img");
    //img3.setAttribute("src", '../images/bts_emoticon3.jpg');
    img3.setAttribute("height", "280");
    img3.setAttribute("style", "margin-left: 38px; margin-top: 10px");
    var img3_title = document.createElement("h4");
    img3_title.innerHTML = "[BTS]Emoticon ver.2";
    img3_title.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-3px;text-decoration: underline"
    );
    var img3_cost = document.createElement("p");
    img3_cost.innerHTML = "300 points";
    img3_cost.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-15px;font-family: Roboto,serif;"
    );
    var img3_btn_div = document.createElement("div");
    img3_btn_div.setAttribute("style", "text-align:center");
    var img3_btn = document.createElement("button");
    img3_btn.innerHTML = "BUY";
    img3_btn.setAttribute("ID", "img3_btn");
    img3_btn.setAttribute(
      "style",
      "font-size: 20px;background-color:#2b5a89;color:white;margin-top:-1px"
    );
    img3_btn_div.appendChild(img3_btn);

    var div7 = document.createElement("div");
    div7.setAttribute("style", "width:25%;margin-right:20px");
    var img4 = document.createElement("img");
    //img4.setAttribute("src", '../images/bts_emoticon4.jpg');
    img4.setAttribute("height", "280");
    img4.setAttribute("style", "margin-left: 38px; margin-top: 10px");
    var img4_title = document.createElement("h4");
    img4_title.innerHTML = "[BTS]Emoticon ver.1";
    img4_title.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-3px;text-decoration: underline"
    );
    var img4_cost = document.createElement("p");
    img4_cost.innerHTML = "300 points";
    img4_cost.setAttribute(
      "style",
      "margin-left: 20px;text-align: center;margin-top:-15px;font-family: Roboto,serif;"
    );
    var img4_btn_div = document.createElement("div");
    img4_btn_div.setAttribute("style", "text-align:center");
    var img4_btn = document.createElement("button");
    img4_btn.innerHTML = "BUY";
    img4_btn.setAttribute("ID", "img4_btn");
    img4_btn.setAttribute(
      "style",
      "font-size: 20px;background-color:#2b5a89;color:white;margin-top:-1px"
    );
    img4_btn_div.appendChild(img4_btn);

    firebase
      .database()
      .ref("/shop/" + "1")
      .once("value")
      .then((snapshot) => {
        var storage = firebase.storage().ref();
        var src = snapshot.val().src;
        storage
          .child(src)
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            img1.src = url;
            return url;
          });
      });

    firebase
      .database()
      .ref("/shop/" + "2")
      .once("value")
      .then((snapshot) => {
        var storage = firebase.storage().ref();
        var src = snapshot.val().src;
        storage
          .child(src)
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            img2.src = url;
            return url;
          });
      });

    firebase
      .database()
      .ref("/shop/" + "3")
      .once("value")
      .then((snapshot) => {
        var storage = firebase.storage().ref();
        var src = snapshot.val().src;
        storage
          .child(src)
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            img3.src = url;
            return url;
          });
      });

    firebase
      .database()
      .ref("/shop/" + "4")
      .once("value")
      .then((snapshot) => {
        var storage = firebase.storage().ref();
        var src = snapshot.val().src;
        storage
          .child(src)
          .getDownloadURL()
          .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();
            img4.src = url;
            return url;
          });
      });

    div4.appendChild(img1);
    div4.appendChild(img1_title);
    div4.appendChild(img1_cost);
    div4.appendChild(img1_btn_div);

    div5.appendChild(img2);
    div5.appendChild(img2_title);
    div5.appendChild(img2_cost);
    div5.appendChild(img2_btn_div);

    div6.appendChild(img3);
    div6.appendChild(img3_title);
    div6.appendChild(img3_cost);
    div6.appendChild(img3_btn_div);

    div7.appendChild(img4);
    div7.appendChild(img4_title);
    div7.appendChild(img4_cost);
    div7.appendChild(img4_btn_div);

    div3.appendChild(div4);
    div3.appendChild(div5);
    div3.appendChild(div6);
    div3.appendChild(div7);

    div.appendChild(div3);

    parent.appendChild(div);
  }

  function history(author) {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px; margin-right:50px");

    var text1 = document.createTextNode("User History");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid black");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute("style", "width: 10%");
    h1.innerHTML = author;

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute("style", "width: 40%");
    h2.innerHTML = "";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute("style", "width: 30%");
    h3.innerHTML = "";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute("style", "width: 15%;text-align: right");
    h4.setAttribute("ID", "historynum");
    h4.innerHTML = "log : " + historynum;

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute(
      "style",
      "width: 7%;cursor:pointer;margin-left:10px;color:red"
    );
    h5.setAttribute("ID", "ban");
    h5.innerHTML = 'Report <i class="fas fa-ban"></i>';

    div2.appendChild(h1);
    div2.appendChild(h2);
    div2.appendChild(h3);
    div2.appendChild(h4);
    div2.appendChild(h5);

    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");

    // var siren = document.createElement("h5");
    // siren.innerHTML = '<i class="fas fa-ban"></i>';

    div.appendChild(div3);

    // div.appendChild(siren);

    parent.appendChild(div);

    getHistoryData(author);
  }
  function calendar() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");
    var div_calendar = document.createElement("div");
    div_calendar.setAttribute("ID", "calendar1");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px"
    );

    div1.appendChild(div_calendar);

    div.appendChild(div1);

    parent.appendChild(div);
    let calendarEl = document.getElementById("calendar1");
    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      contentHeight: 600,
      events: [
        {
          title: "BTS 'Butter' group teaser 1",
          start: "2021-05-10T12:00:00+09:00",
          color: "#8b00ff",
          idol: "BTS",
        },
        {
          title: "BTS 'Butter' group teaser 2",
          start: "2021-05-18T12:00:00+09:00",
          color: "#8b00ff",
          idol: "BTS",
        },
        {
          title: "BTS 'Butter' Comeback Showcase",
          start: "2021-05-21T15:00:00+09:00",
          color: "#8b00ff",
          idol: "BTS",
        },
        {
          title: "BTS BBMA",
          start: "2021-05-24T18:00:00+09:00",
          color: "#8b00ff",
          idol: "BTS",
        },
        {
          title: "G-IDLE Minnie Web Drama Poster",
          start: "2021-05-21T19:00:00+09:00",
          color: "#e11900",
          idol: "G-IDLE",
        },
        {
          title: "G-IDLE Yuqi 'Bonnie & Clyde' Spoiler Selfie.ver",
          start: "2021-05-22T14:00:00+09:00",
          color: "#e11900",
          idol: "G-IDLE",
        },
        {
          title: "G-IDLE Minnie Bazzar Magazine",
          start: "2021-05-24T21:00:00+09:00",
          color: "#e11900",
          idol: "G-IDLE",
        },
      ],
      eventDidMount: function (arg) {
        var filter = document.getElementById("filter");
        var val = filter.options[filter.selectedIndex].value;
        if (val === "All") {
          arg.el.style.display = "auto";
        } else if (arg.event.extendedProps.idol != val) {
          arg.el.style.display = "none";
        }
      },
      eventClick: function (info) {
        var schedule = document.getElementById("schedule_id");
        schedule.innerHTML = "Schedule : " + info.event.title;
        var date = document.getElementById("date_id");
        date.innerHTML = "Date : " + info.event.start;

        $("#calendar_popup").dialog("open");
      },
    });

    calendar.render();
    $("#filter").on("change", function () {
      calendar.refetchEvents();
    });
  }

  function clear() {
    var div = document.getElementById("bigdiv");
    var parent = document.getElementById("contents");
    if (div != null) parent.removeChild(div);
  }

  function resetmenu() {
    var temp;
    temp = document.getElementById("main");
    temp.setAttribute("class", "default_side");
    temp = document.getElementById("notice");
    temp.setAttribute("class", "default_side");
    temp = document.getElementById("shop");
    temp.setAttribute("class", "default_side");
    temp = document.getElementById("calendar");
    temp.setAttribute("class", "default_side");
    temp = document.getElementById("blank");
    temp.setAttribute("style", "border-right:2px solid #666666;height:260px");
    temp = document.getElementById("free");
    temp.setAttribute("class", "default_top");
    temp = document.getElementById("qna");
    temp.setAttribute("class", "default_top");
    temp = document.getElementById("photo");
    temp.setAttribute("class", "default_top");
    temp = document.getElementById("star");
    temp.setAttribute("class", "default_top");
    temp = document.getElementById("SNS");
    temp.setAttribute("class", "default_top");
  }

  function historyPhoto(content) {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");
    var div_chunks = document.createElement("div");
    div_chunks.setAttribute("ID", "photochunks");
    div_chunks.setAttribute(
      "style",
      "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;"
    );
    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;font-family: Roboto, serif;");

    var text1 = document.createTextNode("Photo Board");

    strong1.appendChild(text1);

    div1.appendChild(strong1);

    div.appendChild(div1);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");
    div3.setAttribute("style", "margin-left:20px;margin-right:20px;");

    var div_content = document.createElement("div");
    div_content.setAttribute(
      "style",
      "display : flex; flex-direction: column;"
    );
    var schedule_div = document.createElement("div");
    schedule_div.setAttribute("class", "qnaline");
    schedule_div.setAttribute(
      "style",
      "display : flex;height:40px;font-family: Roboto, serif;border-bottom:0px"
    );
    var schedule = document.createElement("div");
    schedule.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 35px;font-family: Roboto, serif;"
    );
    schedule.innerHTML = "schedule: " + content.schedule;

    var img = document.createElement("img");
    var storage = firebase.storage().ref();
    storage
      .child(content.photourl)
      .getDownloadURL()
      .then(function (url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        img.src = url;
        return url;
      })
      .then((url) => {
        var img1 = new Image();
        img1.onload = function () {
          img.setAttribute(
            "style",
            "width: " + this.width + "px; height: " + this.height + "px"
          );
        };
        img1.src = url;
      });

    var header = document.createElement("div");
    header.setAttribute("class", "qnaline");
    header.setAttribute(
      "style",
      "display : flex;border-bottom:4px solid #2B5A89;margin:0px"
    );
    var contents = document.createElement("div");
    contents.setAttribute("style", "display : flex;");

    var title = document.createElement("div");
    title.setAttribute(
      "style",
      "font-size: 18px;margin-left:10px;font-family: Roboto, serif"
    );
    title.innerHTML = "Title: " + content.title;
    var author = document.createElement("div");
    author.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 20px;font-family: Roboto, serif;margin-right:10px"
    );
    author.innerHTML = content.author;
    var date = document.createElement("div");
    date.setAttribute(
      "style",
      "font-size: 18px;position: absolute; right: 20px;font-family: Roboto, serif;margin-right:10px"
    );
    date.innerHTML = "Date: " + content.date;
    var content_html = document.createElement("div");
    content_html.setAttribute(
      "style",
      "font-size: 30px;font-family: Roboto, serif;margin-left:10px"
    );
    content_html.innerHTML = content.content;

    header.appendChild(title);
    header.appendChild(date);
    schedule_div.appendChild(schedule);
    contents.appendChild(content_html);
    contents.appendChild(author);
    div_content.appendChild(header);

    div_content.appendChild(schedule_div);
    div_content.appendChild(img);

    div_content.appendChild(contents);

    div3.appendChild(div_content);
    var div5 = document.createElement("div");
    var leavecomment = document.createElement("input");
    leavecomment.setAttribute("ID", "comment_input_photo");
    leavecomment.setAttribute(
      "style",
      "height: 80px;width: 88%;margin-left:20px;margin-top:30px"
    );

    var entercomment = document.createElement("button");
    entercomment.setAttribute("ID", "entercomment");
    entercomment.setAttribute(
      "style",
      "height:86px;width:86px;margin-left:10px;font-family: Roboto, serif;"
    );
    entercomment.innerHTML = "Enter";

    div5.appendChild(leavecomment);
    div5.appendChild(entercomment);
    // div5.appendChild(qnaedit);
    // div5.appendChild(qnadelete);

    var div6 = document.createElement("div");
    div6.setAttribute("class", "commentline");
    div6.setAttribute("style", "border-bottom:2px solid #2B5A89");

    var commentnum = document.createElement("h4");
    commentnum.setAttribute("style", "font-family: Roboto, serif;");
    commentnum.setAttribute("ID", "comment_number");
    commentnum.innerHTML = "Comments (" + f_total_commentnum + ")";
    // commentnum.innerHTML = "Comments(2)";

    // var text1 = document.createElement("p");
    // text1.setAttribute(
    //   "style",
    //   "width: 10%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;"
    // );
    // text1.setAttribute("ID", "history");
    // text1.innerHTML = "History";

    div6.appendChild(commentnum);
    // div6.appendChild(text1);

    var div7 = document.createElement("div");
    div7.setAttribute("ID", "photo_comments");

    div3.appendChild(div5);
    div3.appendChild(div6);
    div3.appendChild(div7);
    div.appendChild(div_chunks);
    div.appendChild(div3);

    parent.appendChild(div);
    getCommentData_photo();
  }

  function gotophoto(content, src) {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");
    var div_chunks = document.createElement("div");
    div_chunks.setAttribute("ID", "photochunks");
    div_chunks.setAttribute(
      "style",
      "display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr;"
    );
    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;font-family: Roboto, serif;");

    var text1 = document.createTextNode("Photo Board");

    strong1.appendChild(text1);

    div1.appendChild(strong1);

    div.appendChild(div1);

    var div3 = document.createElement("div");
    div3.setAttribute("ID", "write-div");

    var div_content = document.createElement("div");
    div_content.setAttribute(
      "style",
      "display : flex; flex-direction: column;"
    );
    var schedule_div = document.createElement("div");
    schedule_div.setAttribute(
      "style",
      "display : flex;height:40px;font-family: Roboto, serif;"
    );
    var schedule = document.createElement("STRONG");
    schedule.setAttribute(
      "style",
      "font-size: 30px;position: absolute; right: 20px"
    );
    schedule.innerHTML = "schedule: " + content.schedule;

    var img = document.createElement("img");
    img.setAttribute("src", src);
    var w = img.width;
    var h = img.height;
    img.setAttribute("style", "width: " + w + "px; height: " + h + "px");

    var header = document.createElement("div");
    header.setAttribute("style", "display : flex;");
    var contents = document.createElement("div");
    contents.setAttribute("style", "display : flex;");

    var title = document.createElement("div");
    title.setAttribute("style", "font-size: 30px");
    title.innerHTML = "Title: " + content.title;
    var author = document.createElement("div");
    author.setAttribute(
      "style",
      "font-size: 30px;position: absolute; right: 20px;font-family: Roboto, serif;"
    );
    author.innerHTML = content.author;
    var date = document.createElement("div");
    date.setAttribute(
      "style",
      "font-size: 30px;position: absolute; right: 20px;font-family: Roboto, serif;"
    );
    date.innerHTML = "Date: " + content.date;
    var content_html = document.createElement("div");
    content_html.setAttribute("style", "font-size: 30px");
    content_html.innerHTML = content.content;

    header.appendChild(title);
    header.appendChild(date);
    schedule_div.appendChild(schedule);
    contents.appendChild(content_html);
    contents.appendChild(author);
    div_content.appendChild(header);

    div_content.appendChild(schedule_div);
    div_content.appendChild(img);

    div_content.appendChild(contents);

    div3.appendChild(div_content);

    div.appendChild(div_chunks);
    div.appendChild(div3);

    parent.appendChild(div);
  }

  function SNS_page() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px;");

    var text1 = document.createTextNode("SNS of Idols");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);
    if (idol == "All" || idol == "BTS") {
      var div2 = document.createElement("div");
      div2.setAttribute(
        "style",
        "text-align:left; margin-left:20px;font-family:Roboto, serif;border-bottom:3px solid #2B5A89; margin-right:20px"
      );
      var text2 = document.createElement("p");
      text2.innerHTML = "☞ BTS Official SNS : ";
      text2.setAttribute("style", "font-size: 20px;");
      var div2_2 = document.createElement("div");
      div2_2.setAttribute("style", "margin-bottom: 5px");
      var a2_1 = document.createElement("a");
      a2_1.setAttribute(
        "href",
        "https://instagram.com/bts.bighitofficial?utm_medium=copy_link"
      );
      a2_1.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_1.setAttribute("target", "_blank");
      a2_1.setAttribute("rel", "noreferrer noopener");
      a2_1.innerHTML = "Instagram";
      var a2_2 = document.createElement("a");
      a2_2.setAttribute("href", "https://www.facebook.com/bangtan.official");
      a2_2.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_2.setAttribute("target", "_blank");
      a2_2.setAttribute("rel", "noreferrer noopener");
      a2_2.innerHTML = "Facebook";
      var a2_3 = document.createElement("a");
      a2_3.setAttribute("href", "https://twitter.com/BTS_twt");
      a2_3.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_3.setAttribute("target", "_blank");
      a2_3.setAttribute("rel", "noreferrer noopener");
      a2_3.innerHTML = "Twitter";
      var a2_4 = document.createElement("a");
      a2_4.setAttribute("href", "https://www.youtube.com/BANGTANTV");
      a2_4.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_4.setAttribute("target", "_blank");
      a2_4.setAttribute("rel", "noreferrer noopener");
      a2_4.innerHTML = "Youtube";
      var a2_5 = document.createElement("a");
      a2_5.setAttribute("href", "https://www.tiktok.com/@bts_official_bighit?");
      a2_5.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_5.setAttribute("target", "_blank");
      a2_5.setAttribute("rel", "noreferrer noopener");
      a2_5.innerHTML = "TikTok";
      var a2_6 = document.createElement("a");
      a2_6.setAttribute("href", "https://www.vlive.tv/channel/FE619");
      a2_6.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_6.setAttribute("target", "_blank");
      a2_6.setAttribute("rel", "noreferrer noopener");
      a2_6.innerHTML = "V LIVE";
      var a2_7 = document.createElement("a");
      a2_7.setAttribute("href", "https://btsblog.ibighit.com/");
      a2_7.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_7.setAttribute("target", "_blank");
      a2_7.setAttribute("rel", "noreferrer noopener");
      a2_7.innerHTML = "Blog";
      var a2_8 = document.createElement("a");
      a2_8.setAttribute("href", "https://ibighit.com/bts/kor/");
      a2_8.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a2_8.setAttribute("target", "_blank");
      a2_8.setAttribute("rel", "noreferrer noopener");
      a2_8.innerHTML = "Official Homepage";

      div2_2.appendChild(a2_1);
      div2_2.appendChild(a2_2);
      div2_2.appendChild(a2_3);
      div2_2.appendChild(a2_4);
      div2_2.appendChild(a2_5);
      div2_2.appendChild(a2_6);
      div2_2.appendChild(a2_7);
      div2_2.appendChild(a2_8);
      div2.appendChild(text2);
      div2.appendChild(div2_2);

      div.appendChild(div2);
    }

    if (idol == "All" || idol == "G-IDLE") {
      var div3 = document.createElement("div");
      div3.setAttribute(
        "style",
        "text-align:left; margin-left:20px;font-family:Roboto, serif;border-bottom:3px solid #2B5A89; margin-right:20px"
      );
      var text3 = document.createElement("p");
      text3.innerHTML = "☞ G-Idle Official SNS : ";
      text3.setAttribute("style", "font-size: 20px;");
      var div3_2 = document.createElement("div");
      div3_2.setAttribute("style", "margin-bottom: 5px");
      var a3_1 = document.createElement("a");
      a3_1.setAttribute(
        "href",
        "https://instagram.com/official_g_i_dle?utm_medium=copy_link"
      );
      a3_1.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_1.setAttribute("target", "_blank");
      a3_1.setAttribute("rel", "noreferrer noopener");
      a3_1.innerHTML = "Instagram";
      var a3_2 = document.createElement("a");
      a3_2.setAttribute("href", "https://www.facebook.com/G.I.DLE.CUBE");
      a3_2.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_2.setAttribute("target", "_blank");
      a3_2.setAttribute("rel", "noreferrer noopener");
      a3_2.innerHTML = "Facebook";
      var a3_3 = document.createElement("a");
      a3_3.setAttribute("href", "https://twitter.com/G_I_DLE");
      a3_3.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_3.setAttribute("target", "_blank");
      a3_3.setAttribute("rel", "noreferrer noopener");
      a3_3.innerHTML = "Twitter";
      var a3_4 = document.createElement("a");
      a3_4.setAttribute("href", "https://www.youtube.com/gidleofficial");
      a3_4.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_4.setAttribute("target", "_blank");
      a3_4.setAttribute("rel", "noreferrer noopener");
      a3_4.innerHTML = "Youtube";
      var a3_5 = document.createElement("a");
      a3_5.setAttribute("href", "https://www.tiktok.com/@official_gidle?");
      a3_5.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_5.setAttribute("target", "_blank");
      a3_5.setAttribute("rel", "noreferrer noopener");
      a3_5.innerHTML = "TikTok";
      var a3_6 = document.createElement("a");
      a3_6.setAttribute("href", "https://www.vlive.tv/channel/CE2621");
      a3_6.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_6.setAttribute("target", "_blank");
      a3_6.setAttribute("rel", "noreferrer noopener");
      a3_6.innerHTML = "V LIVE";
      var a3_7 = document.createElement("a");
      a3_7.setAttribute("href", "https://cafe.daum.net/cube-g-i-dle");
      a3_7.setAttribute(
        "style",
        "font-family:Roboto, serif;font-weight: bolder;margin-right: 20px;"
      );
      a3_7.setAttribute("target", "_blank");
      a3_7.setAttribute("rel", "noreferrer noopener");
      a3_7.innerHTML = "Fan Cafe";

      div3_2.appendChild(a3_1);
      div3_2.appendChild(a3_2);
      div3_2.appendChild(a3_3);
      div3_2.appendChild(a3_4);
      div3_2.appendChild(a3_5);
      div3_2.appendChild(a3_6);
      div3_2.appendChild(a3_7);

      div3.appendChild(text3);
      div3.appendChild(div3_2);

      div.appendChild(div3);
    }
    parent.appendChild(div);
  }

  function showPopup() {
    $("#ban_popup").dialog("open");
  }

  function reshape(options) {
    options = options || {};
    var defaults = {
      filter_change: false,
      photo_content: "",
      pval: "",
      src: "",
    };
    for (var prop in defaults) {
      options[prop] =
        typeof options[prop] !== "undefined" ? options[prop] : defaults[prop];
    }
    clear();
    resetmenu();
    selected_filter = $("#filter").val();
    if (current_state == "main") {
      var curr = document.getElementById("main");
      curr.setAttribute("class", "selected_side");
      if (selected_filter == "All") main();
      else idolmain();
    } else if (current_state == "qna1") {
      qna1();
      var curr = document.getElementById("qna");
      curr.setAttribute("class", "selected_top");
    } else if (current_state == "qna2") {
      qna2();
      var curr = document.getElementById("qna");
      curr.setAttribute("class", "selected_top");
    } else if (current_state == "qnapost") {
      var curr = document.getElementById("qna");
      curr.setAttribute("class", "selected_top");
      if (options.filter_change) {
        current_state = "qna1";
        reshape();
      } else qnapost();
    } else if (current_state == "noticepost") {
      var curr = document.getElementById("notice");
      curr.setAttribute("class", "selected_side");
      if (options.filter_change) {
        current_state = "notice";
        reshape();
      } else noticepost(options.pval);
    } else if (current_state == "photo") {
      var curr = document.getElementById("photo");
      curr.setAttribute("class", "selected_top");
      photo();
    } else if (current_state == "photo2") {
      var curr = document.getElementById("photo");
      curr.setAttribute("class", "selected_top");
      photo2();
    } else if (current_state == "photo_specific") {
      var curr = document.getElementById("photo");
      curr.setAttribute("class", "selected_top");
      if (options.filter_change) {
        current_state = "photo";
        reshape();
      } else {
        specific_photo(options.photo_content);
      }
    } else if (current_state == "goto") {
      current_state = "photo_specific";
      var curr = document.getElementById("photo");
      curr.setAttribute("class", "selected_top");
      gotophoto(options.pval, options.src);
    } else if (current_state == "notice") {
      var curr = document.getElementById("notice");
      curr.setAttribute("class", "selected_side");
      notice_page();
    } else if (current_state == "free") {
      var curr = document.getElementById("free");
      curr.setAttribute("class", "selected_top");
      free_page();
    } else if (current_state == "free_write") {
      var curr = document.getElementById("free");
      curr.setAttribute("class", "selected_top");
      free_write();
    } else if (current_state == "freepost") {
      var curr = document.getElementById("free");
      curr.setAttribute("class", "selected_top");
      if (options.filter_change) {
        current_state = "free";
        reshape();
      } else freepost();
    } else if (current_state == "calendar") {
      var curr = document.getElementById("calendar");
      curr.setAttribute("class", "selected_side");
      calendar();
    } else if (current_state == "history") {
      history(options.src);
    } else if (current_state == "shop") {
      var curr = document.getElementById("shop");
      curr.setAttribute("class", "selected_side");
      shop_page();
    } else if (current_state == "SNS") {
      var curr = document.getElementById("SNS");
      curr.setAttribute("class", "selected_top");
      SNS_page();
    } else if (current_state == "star") {
      var curr = document.getElementById("star");
      curr.setAttribute("class", "selected_top");
      star_page();
    } else if (current_state == "starpost") {
      var curr = document.getElementById("star");
      curr.setAttribute("class", "selected_top");
      if (options.filter_change) {
        current_state = "star";
        reshape();
      } else starpost();
    }
  }

  filter.addEventListener("change", function () {
    if (current_state == "qna2" || current_state == "photo2") {
      var temp = $("#filter").val();
      if (temp == "All") {
        $("#filter option[value=" + idol + "]").prop("selected", true);
        alert("You can't select All when posting");
      } else idol = temp;
    } else if (current_state == "history") {
      idol = $("#filter").val();
    } else {
      idol = $("#filter").val();
      reshape({ filter_change: true });
    }
  });

  $("#calendar").click(function () {
    current_state = "calendar";
    reshape();
  });

  $("#SNS").click(function () {
    current_state = "SNS";
    reshape();
  });
  $("#contents").on("click", "#history", function () {
    current_state = "history";
    reshape({ src: $(this).parent().children()[0].innerHTML });
  });
  $("#contents").on("click", "#ban", function () {
    showPopup();
  });

  $("#contents").on("click", ".main_schedule", function () {
    current_state = "calendar";
    reshape();
  });

  $("#photo").click(function () {
    current_state = "photo";
    reshape();
  });

  $("#contents").on("click", ".photo_button", function () {
    var question_no = $(this).parent().children()[6].innerHTML - 1;
    firebase
      .database()
      .ref("/photo")
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        var keyList = Object.keys(photoval);
        var currentkey = keyList[question_no];
        f_key_photo = currentkey;
        f_photo = photoval[currentkey];
        f_total_commentnum = photoval[currentkey].commentnum;

        current_state = "photo_specific";
        reshape({ photo_content: $(this).parent().children() });
      });
  });

  $("#contents").on("click", ".image_main_idol_2", function () {
    current_state = "goto";
    var key = $(this).parent().children().text();
    var src = $(this).attr("src");
    firebase
      .database()
      .ref("/photo/" + key)
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        reshape({ pval: photoval, src: src });
      });
  });

  $("#contents").on("click", ".swiper-slide", function () {
    current_state = "goto";
    var key = $(this).children().text();
    var src = $(this).children()[0].src;
    firebase
      .database()
      .ref("/photo/" + key)
      .once("value")
      .then((snapshot) => {
        var photoval = snapshot.val();
        reshape({ pval: photoval, src: src });
      });
  });

  $("#contents").on("click", ".image_main", function () {
    var temp = $(this).parent().children().text();
    $("#filter option[value=" + temp + "]").prop("selected", true);
    idol = $("#filter").val();
    reshape({ filter_change: true });
  });

  $("#contents").on("click", ".photo_button_title", function () {
    $(this).parent().children()[1].click();
  });

  $("#contents").on("click", "#write_button_photo", function () {
    if (current_user == "nologin") alert("Please log-in");
    else if (idol == "All") alert("Please select an Idol");
    else {
      current_state = "photo2";
      reshape();
    }
  });

  $("#shop").click(function () {
    current_state = "shop";
    reshape();
  });

  $("#contents").on("click", ".question", function () {
    var question_no = $(this).parent().children()[0].innerHTML - 1;
    firebase
      .database()
      .ref("/qna")
      .once("value")
      .then((snapshot) => {
        var qnaval = snapshot.val();
        var keyList = Object.keys(qnaval);
        var currentkey = keyList[question_no];
        f_qna = qnaval[currentkey];
        f_key = currentkey;
        f_qnaanswer = qnaval[currentkey].answer;

        current_state = "qnapost";
        reshape();
      });
  });

  $("#star").click(function () {
    current_state = "star";
    reshape();
  });

  $("#contents").on("click", ".star_post_title", function () {
    var letter_no = $(this).parent().children()[0].innerHTML - 1;
    firebase
      .database()
      .ref("/star")
      .once("value")
      .then((snapshot) => {
        var letterval = snapshot.val();
        var keyList = Object.keys(letterval);
        var currentkey = keyList[letter_no];
        letter_val = letterval[currentkey];
        letter_key = currentkey;
        current_state = "starpost";
        reshape();
      });
  });

  $("#contents").on("click", ".history_specific", function () {
    // gotophoto(options.pval, options.src);
    var type = $(this).parent().children()[3].innerHTML;
    var postorcomment = $(this).parent().children()[2].innerHTML;
    if (type == "photocomment") {
      firebase
        .database()
        .ref("/photo")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          for (let key of keyList) {
            if (key == postorcomment) {
              f_photo = qnaval[key];
              f_key_photo = key;
              f_total_commentnum = qnaval[key].commentnum;
              current_state = "photo_specific";
              clear();
              resetmenu();
              var curr = document.getElementById("photo");
              curr.setAttribute("class", "selected_top");
              historyPhoto(qnaval[key]);
            }
          }
        });
    } else if (type == "qnacomment") {
      firebase
        .database()
        .ref("/qna")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          for (let key of keyList) {
            if (key == postorcomment) {
              f_qna = qnaval[key];
              f_key = key;
              f_qnaanswer = qnaval[key].answer;
              current_state = "qnapost";
              reshape();
            }
          }
        });
    } else if (type == "freecomment") {
      firebase
        .database()
        .ref("/free")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          for (let key of keyList) {
            if (key == postorcomment) {
              fr_qna = qnaval[key];
              fr_key = key;
              fr_freecomments = qnaval[key].commentsnum;
              current_state = "freepost";
              reshape();
            }
          }
        });
    } else if (type == "photo") {
      firebase
        .database()
        .ref("/photo")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          var key = keyList[postorcomment - 1];
          f_photo = qnaval[key];
          f_key_photo = key;
          // f_qnaanswer = qnaval[key].answer;
          current_state = "photo_specific";
          clear();
          resetmenu();
          var curr = document.getElementById("photo");
          curr.setAttribute("class", "selected_top");
          historyPhoto(qnaval[key]);
        });
    } else if (type == "qnapost") {
      var question_no = postorcomment - 1;
      firebase
        .database()
        .ref("/qna")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          var currentkey = keyList[question_no];
          f_qna = qnaval[currentkey];
          f_key = currentkey;
          f_qnaanswer = qnaval[currentkey].answer;

          current_state = "qnapost";
          reshape();
        });
    } else if (type == "freepost") {
      var question_no = postorcomment - 1;
      firebase
        .database()
        .ref("/free")
        .once("value")
        .then((snapshot) => {
          var qnaval = snapshot.val();
          var keyList = Object.keys(qnaval);
          var currentkey = keyList[question_no];
          fr_qna = qnaval[currentkey];
          fr_key = currentkey;
          fr_freecomments = qnaval[currentkey].commentsnum;

          current_state = "qnapost";
          reshape();
        });
    }
  });

  $("#qna").click(function () {
    current_state = "qna1";
    reshape();
  });

  $("#contents").on("click", "#write_button", function () {
    if (current_user == "nologin") alert("Please log-in");
    else if (idol == "All") alert("Please select an Idol");
    else {
      current_state = "qna2";
      reshape();
    }
  });

  $("#contents").on("click", "#free_write_button", function () {
    if (current_user == "nologin") alert("Please log-in");
    else {
      current_state = "free_write";
      reshape();
    }
  });

  $("#main").click(function () {
    current_state = "main";
    reshape();
  });

  $("#starlight").click(function () {
    current_state = "main";
    reshape();
  });

  $("#notice").click(function () {
    current_state = "notice";
    reshape();
  });

  $("#free").click(function () {
    current_state = "free";
    reshape();
  });

  $("#contents").on("click", ".main_notice", function () {
    var question_no = $(this).parent().children()[1].innerHTML - 1;
    firebase
      .database()
      .ref("/notice")
      .once("value")
      .then((snapshot) => {
        var noticeval = snapshot.val();
        var keyList = Object.keys(noticeval);
        var currentkey = keyList[question_no];
        n_key = currentkey;
        current_state = "noticepost";
        reshape({ pval: noticeval[currentkey] });
      });
  });

  $("#contents").on("click", ".notice", function () {
    var question_no = $(this).parent().children()[0].innerHTML - 1;
    firebase
      .database()
      .ref("/notice")
      .once("value")
      .then((snapshot) => {
        var noticeval = snapshot.val();
        var keyList = Object.keys(noticeval);
        var currentkey = keyList[question_no];
        n_key = currentkey;
        current_state = "noticepost";
        reshape({ pval: noticeval[currentkey] });
      });
  });

  $("#contents").on("click", ".free_post_title", function () {
    var question_no = $(this).parent().children()[0].innerHTML - 1;
    firebase
      .database()
      .ref("/free")
      .once("value")
      .then((snapshot) => {
        var freeval = snapshot.val();
        var keyList = Object.keys(freeval);
        var currentkey = keyList[question_no];
        fr_qna = freeval[currentkey];
        fr_key = currentkey;
        fr_freecomments = freeval[currentkey].commentsnum;

        current_state = "freepost";
        reshape();
      });
  });

  $("#contents").on("click", "#enterans", function () {
    if (current_user == "nologin") alert("Please log-in");
    else {
      var comment_input = document.getElementById("comment_input").value;
      firebase
        .database()
        .ref("/qna/" + f_key + "/author")
        .once("value")
        .then((snapshot) => {
          if (snapshot.val() == current_user)
            alert("You can't answer your own question");
          else {
            var date = new Date().toLocaleDateString();
            var newcomment = firebase
              .database()
              .ref("/qna/" + f_key + "/comments")
              .push();
            newcomment.set({
              content: comment_input,
              author: current_user,
              selected: false,
            });

            f_qnaanswer += 1;

            var update = {};
            update["/qna/" + f_key + "/answer"] = f_qnaanswer;

            firebase.database().ref().update(update);

            var history = firebase
              .database()
              .ref("/history/" + current_user)
              .push();
            history.set({
              type: "qnacomment",
              content: comment_input,
              index: f_qnaanswer,
              question_key: f_key,
              date: date,
            });
            reshape();
          }
        });
    }
  });

  $("#contents").on("click", "#entercomment", function () {
    if (current_user == "nologin") alert("Please log-in");
    else {
      var comment_input = document.getElementById("comment_input_photo").value;
      var newcomment = firebase
        .database()
        .ref("/photo/" + f_key_photo + "/comments")
        .push();
      var history = firebase
        .database()
        .ref("/history/" + current_user)
        .push();
      var date = new Date().toLocaleDateString();
      newcomment.set({
        content: comment_input,
        author: current_user,
      });

      f_total_commentnum += 1;

      var update = {};
      update["/photo/" + f_key_photo + "/commentnum"] = f_total_commentnum;

      history.set({
        type: "photocomment",
        content: comment_input,
        index: f_total_commentnum,
        question_key: f_key_photo,
        date: date,
      });
      firebase.database().ref().update(update);
      addcomment_photo_new({ content: comment_input, author: current_user });
      var commentnum = document.getElementById("comment_number");
      commentnum.innerHTML = "Comments (" + f_total_commentnum + ")";
      var commentnum = document.getElementById("comment_number");
      document.getElementById("comment_input_photo").value = "";
    }
  });

  $("#contents").on("click", "#fr_entercomment", function () {
    if (current_user == "nologin") alert("Please log-in");
    else {
      var date = new Date().toLocaleDateString();
      var free_comment_input =
        document.getElementById("free_comment_input").value;
      firebase
        .database()
        .ref("/free/" + fr_key + "/author")
        .once("value")
        .then((snapshot) => {
          var newcomment = firebase
            .database()
            .ref("/free/" + fr_key + "/comments")
            .push();
          newcomment.set({
            content: free_comment_input,
            author: current_user,
          });

          fr_freecomments += 1;

          var update = {};
          update["/free/" + fr_key + "/commentsnum"] = fr_freecomments;

          firebase.database().ref().update(update);

          var history = firebase
            .database()
            .ref("/history/" + current_user)
            .push();
          history.set({
            type: "freecomment",
            content: free_comment_input,
            index: fr_freecomments,
            free_key: fr_key,
            date: date,
          });
          reshape();
        });
    }
  });

  $("#contents").on("click", "#submitqna", function () {
    qnanum++;
    var title = document.getElementById("qnaTitle").value;
    var content = document.getElementById("qnaContents").value;
    var newqna = firebase.database().ref("/qna").push();
    var date = new Date().toLocaleDateString();
    newqna.set({
      no: qnanum,
      title: title,
      author: current_user,
      idol: idol,
      answer: 0,
      date: date,
      content: content,
      selected: false,
    });
    var history = firebase
      .database()
      .ref("/history/" + current_user)
      .push();
    history.set({
      type: "qnapost",
      title: title,
      index: qnanum,
      date: date,
    });
    current_state = "qna1";
    reshape();
  });

  $("#contents").on("click", "#submitfree", function () {
    freenum++;
    var title = document.getElementById("freeTitle").value;
    var content = document.getElementById("freeContents").value;
    var newqna = firebase.database().ref("/free").push();
    var date = new Date().toLocaleDateString();
    newqna.set({
      no: freenum,
      title: title,
      author: current_user,
      idol: idol,
      commentsnum: 0,
      date: date,
      content: content,
    });
    var history = firebase
      .database()
      .ref("/history/" + current_user)
      .push();
    history.set({
      type: "freepost",
      title: title,
      index: freenum,
      date: date,
    });
    current_state = "free";
    reshape();
  });

  $("#login_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#login_popup").dialog("option", "width", 500);

  $("#nav1").on("click", "#login", function () {
    $("#login_popup").dialog("open");
  });

  $("#login_popup").keypress(function (key) {
    if (key.which == 13) {
      $("#login-ok").click();
    }
  });

  $("#login-ok").click(function () {
    var logininput = document.getElementById("login_id");
    current_user = logininput.value;
    $("#login_popup").dialog("close");
    var login_id = document.getElementById("login_id");
    var passwd = document.getElementById("passwd");
    login_id.value = "";
    passwd.value = "";

    var parent = document.getElementById("nav1");
    var btn = document.getElementById("login");
    parent.removeChild(btn);

    var target = document.getElementById("back");
    var logout = document.createElement("button");
    logout.setAttribute(
      "style",
      "float: right;align-items: center;margin-right: 20px;font-size: 20px;margin-top: 10px"
    );
    logout.setAttribute("ID", "logout");
    logout.innerHTML = "LOGOUT";

    var img = document.createElement("img");
    img.setAttribute("style", "float:right; margin-right:20px");
    img.setAttribute("alt", "user-img");
    var usr = document.createElement("a");
    usr.setAttribute("style", "float:right; margin-right:20px;cursor:pointer;");
    usr.setAttribute("ID", "username");
    usr.innerHTML = current_user;

    parent.insertBefore(logout, target);
    //parent.insertBefore(img, target);
    parent.insertBefore(usr, target);
    if (current_state != "photo_specific") reshape();
  });

  $("#nav1").on("click", "#logout", function () {
    current_user = "nologin";
    var parent = document.getElementById("nav1");
    var btn = document.getElementById("logout");
    var usr = document.getElementById("username");

    parent.removeChild(btn);
    parent.removeChild(usr);

    var target = document.getElementById("back");
    var login = document.createElement("button");
    login.setAttribute(
      "style",
      "float: right;align-items: center;margin-right: 20px;font-size: 20px;margin-top: 10px"
    );
    login.setAttribute("ID", "login");
    login.innerHTML = "LOGIN";

    parent.insertBefore(login, target);
    if (current_state != "photo_specific") reshape();
  });

  $("#contents").on("click", "#submitphoto", function () {
    photonum++;
    var photo = document.getElementById("image").files[0];
    var storageRef = firebase.storage().ref();
    storageRef
      .child(`images/${photo.name}`)
      .put(photo)
      .then((snapshot) => {});
    var photourl = "images/" + photo.name;
    var title = document.getElementById("photoTitle").value;
    var content = document.getElementById("photoContents").value;
    var schedule = document.getElementById("schedule").value;
    var newphoto = firebase.database().ref("/photo").push();
    var history = firebase
      .database()
      .ref("/history/" + current_user)
      .push();
    var date = new Date().toLocaleDateString();
    newphoto.set({
      title: title,
      author: current_user,
      idol: idol,
      date: date,
      commentnum: 0,
      content: content,
      photourl: photourl,
      schedule: schedule,
    });
    history.set({
      type: "photo",
      title: title,
      index: photonum,
      date: date,
    });
    current_state = "photo";
    reshape();
  });

  $("#ban_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
    title: "Report User",
  });
  $("#ban_popup").dialog("option", "width", 850);
  $("#ban_popup").dialog("option", "height", 500);

  $("#calendar_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
    title: "Calendar",
  });
  $("#calendar_popup").dialog("option", "width", 700);
  $("#calendar_popup").dialog("option", "height", 200);

  $("#contents").on("click", "#img1_btn", function () {
    $("#img1_popup").dialog("open");
  });

  $("#img1_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "[Shop] Buy an item!",
  });
  $("#img1_popup").dialog("option", "width", 700);

  $("#img1_popup_yes").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "Completed!",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#img1_popup_yes").dialog("option", "width", 700);

  $("#img1_yes").click(function () {
    $("#img1_popup").dialog("close");
    $("#img1_popup_yes").dialog("open");
  });

  $("#img1_ok").click(function () {
    $("#img1_popup_yes").dialog("close");
  });

  $("#img1_no").click(function () {
    $("#img1_popup").dialog("close");
  });

  $("#contents").on("click", "#img2_btn", function () {
    $("#img2_popup").dialog("open");
  });

  $("#img2_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "[Shop] Buy an item!",
  });
  $("#img2_popup").dialog("option", "width", 700);

  $("#img2_popup_yes").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "Completed!",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#img2_popup_yes").dialog("option", "width", 700);

  $("#img2_yes").click(function () {
    $("#img2_popup").dialog("close");
    $("#img2_popup_yes").dialog("open");
  });

  $("#contents").on("click", "#img3_btn", function () {
    $("#img3_popup").dialog("open");
  });

  $("#img3_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "[Shop] Buy an item!",
  });
  $("#img3_popup").dialog("option", "width", 700);

  $("#img3_popup_yes").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "Completed!",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#img3_popup_yes").dialog("option", "width", 700);

  $("#img3_yes").click(function () {
    $("#img3_popup").dialog("close");
    $("#img3_popup_yes").dialog("open");
  });

  $("#img3_ok").click(function () {
    $("#img1_popup_yes").dialog("close");
  });

  $("#img3_no").click(function () {
    $("#img1_popup").dialog("close");
  });

  $("#contents").on("click", "#img4_btn", function () {
    $("#img4_popup").dialog("open");
  });

  $("#img4_popup").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "[Shop] Buy an item!",
  });
  $("#img4_popup").dialog("option", "width", 700);

  $("#img4_popup_yes").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    title: "Completed!",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#img4_popup_yes").dialog("option", "width", 700);

  $("#img4_yes").click(function () {
    $("#img4_popup").dialog("close");
    $("#img4_popup_yes").dialog("open");
  });

  $("#img4_ok").click(function () {
    $("#img4_popup_yes").dialog("close");
  });

  $("#img4_no").click(function () {
    $("#img4_popup").dialog("close");
  });

  $("#img2_ok").click(function () {
    $("#img2_popup_yes").dialog("close");
  });

  $("#img2_no").click(function () {
    $("#img2_popup").dialog("close");
  });

  $("#img3_ok").click(function () {
    $("#img3_popup_yes").dialog("close");
  });

  $("#img3_no").click(function () {
    $("#img3_popup").dialog("close");
  });

  $("#img4_ok").click(function () {
    $("#img4_popup_yes").dialog("close");
  });

  $("#img4_no").click(function () {
    $("#img4_popup").dialog("close");
  });

  $("#my_page").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
    title: "My Page",
  });
  $("#my_page").dialog("option", "width", 400);
  $("#my_page").dialog("option", "height", 400);

  $("#nav1").on("click", "#username", function () {
    var my_page_id = document.getElementById("my_page_id");
    my_page_id.innerHTML = "ID : " + current_user;
    $("#my_page").dialog("open");
  });

  $("#select").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });
  $("#select").dialog("option", "width", 650);

  $("#select2").dialog({
    autoOpen: false,
    dialogClass: "dialog_title",
    show: {
      duration: 0,
    },
    hide: {
      duration: 0,
    },
  });

  $("#contents").on("click", ".selectbtn", function () {
    author_of_question = $(this).parent().children()[0].innerHTML;
    var select_content = document.getElementById("select_content");
    select_content.innerHTML =
      "Will you select " + author_of_question + "'s answer";
    selected_answer = $(this).parent().index();
    $("#select").dialog("open");
  });

  $("#yes").click(function () {
    $("#select").dialog("close");
    var select2_content = document.getElementById("select2_content");
    select2_content.innerHTML = author_of_question + " got 20 points also.";

    $("#select2").dialog("open");

    firebase
      .database()
      .ref("/qna/" + f_key)
      .once("value")
      .then((snapshot) => {
        var qnaval = snapshot.val();
        var keyList = Object.keys(qnaval.comments);
        var currentkey = keyList[keyList.length - Number(selected_answer) - 1];

        var update = {};
        update["/qna/" + f_key + "/selected"] = true;
        update[
          "/qna/" + f_key + "/comments/" + currentkey + "/selected"
        ] = true;
        firebase.database().ref().update(update);
      });
  });

  $("#no").click(function () {
    $("#select").dialog("close");
  });

  $("#close").click(function () {
    $("#select2").dialog("close");
    reshape();
  });
  reshape();
});
