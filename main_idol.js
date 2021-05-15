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
  var current_state = "main";
  var selected_filter;

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
          addqna(current);
        }
      });
  }

  function addqna(qnaval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "qnaline");
    var h1 = document.createElement("p");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute("style", "width: 10%");
    h1.innerHTML = qnaval.no;

    var h2 = document.createElement("p");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute("style", "width: 40%");
    h2.innerHTML = qnaval.title;

    var h3 = document.createElement("p");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute("style", "width: 25%");
    h3.innerHTML = qnaval.author;

    var h4 = document.createElement("p");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute("style", "width: 10%");
    h4.innerHTML = qnaval.answer;

    var h5 = document.createElement("p");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute("style", "width: 15%");
    h5.innerHTML = qnaval.date;

    div1.appendChild(h1);
    div1.appendChild(h2);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }
  function getphotoData() {
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
          addphoto(current);
        }
      });
  }
  function addphoto(photoval) {
    var target_div = document.getElementById("write-div");
    var parent = document.getElementById("bigdiv");
    var div1 = document.createElement("div");
    div1.setAttribute("class", "photochunk");
    var h1 = document.createElement("div");
    h1.setAttribute("class", "photoheader");
    h1.setAttribute("style", "height: 5%");
    h1.innerHTML = photoval.title;

    var h2 = document.createElement("img");
    h2.setAttribute("class", "photoheader");
    h2.setAttribute("style", "height: 80%");
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
      })
      .catch(function (error) {
        // Handle any errors
      });

    var h3 = document.createElement("div");
    h3.setAttribute("class", "photoheader");
    h3.setAttribute("style", "height: 5%");
    h3.innerHTML = photoval.author;

    var h4 = document.createElement("div");
    h4.setAttribute("class", "photoheader");
    h4.setAttribute("style", "height: 5%");
    h4.innerHTML = photoval.content;

    var h5 = document.createElement("div");
    h5.setAttribute("class", "photoheader");
    h5.setAttribute("style", "height: 5%");
    h5.innerHTML = photoval.date;

    div1.appendChild(h2);
    div1.appendChild(h1);
    div1.appendChild(h3);
    div1.appendChild(h4);
    div1.appendChild(h5);

    parent.insertBefore(div1, target_div);
  }

  function main() {
    var parent = document.getElementById("contents");
    var div0 = document.createElement("div");
    div0.setAttribute("ID", "bigdiv");

    var swipe = document.createElement("div");
    swipe.setAttribute("class", "swiper-container mySwiper");
    var swipe_wrapper = document.createElement("div");
    swipe_wrapper.setAttribute("class", "swiper-wrapper");
    var swipe1 = document.createElement("div");
    swipe1.setAttribute("class", "swiper-slide");
    var swipe2 = document.createElement("div");
    swipe2.setAttribute("class", "swiper-slide");
    var swipe3 = document.createElement("div");
    swipe3.setAttribute("class", "swiper-slide");
    var swipe4 = document.createElement("div");
    swipe4.setAttribute("class", "swiper-slide");
    var swipe5 = document.createElement("div");
    swipe5.setAttribute("class", "swiper-slide");
    imageadder(swipe1, "BTS_main_big.jpg", "img1", "image_main_idol_main");
    imageadder(
      swipe2,
      "g-idle_main_swipe.jpeg",
      "img2",
      "image_main_idol_main"
    );
    imageadder(swipe3, "BTS_main_swipe.jpeg", "img3", "image_main_idol_main");
    imageadder(
      swipe4,
      "g-idle_main_swipe_2.jpeg",
      "img4",
      "image_main_idol_main"
    );
    imageadder(swipe5, "BTS_main_swipe_2.jpeg", "img5", "image_main_idol_main");
    // var text1 = document.createTextNode("slide1");
    // var text2 = document.createTextNode("slide2");
    // var text3 = document.createTextNode("slide3");
    // var text4 = document.createTextNode("slide4");
    // var text5 = document.createTextNode("slide5");
    // swipe1.appendChild(text1);
    // swipe2.appendChild(text2);
    // swipe3.appendChild(text3);
    // swipe4.appendChild(text4);
    // swipe5.appendChild(text5);
    swipe_wrapper.appendChild(swipe1);
    swipe_wrapper.appendChild(swipe2);
    swipe_wrapper.appendChild(swipe3);
    swipe_wrapper.appendChild(swipe4);
    swipe_wrapper.appendChild(swipe5);
    swipe.appendChild(swipe_wrapper);
    var pagination = document.createElement("div");
    pagination.setAttribute("class", "swiper-pagination");
    swipe.appendChild(pagination);
    div0.appendChild(swipe);

    var myidol = document.createElement("div");
    myidol.setAttribute("style", "text-align:center;");

    imageadder(myidol, "yuqi.PNG", "img1", "image_main");
    imageadder(myidol, "yuqi.PNG", "img2", "image_main");
    imageadder(myidol, "yuqi.PNG", "img3", "image_main");

    var btn = document.createElement("button");
    btn.setAttribute(
      "style",
      "width:280px; height:200px; vertical-align:top; margin-top:20px; font-size:50px"
    );
    var plus = document.createTextNode("+");
    btn.appendChild(plus);
    myidol.appendChild(btn);

    div0.appendChild(myidol);
    parent.appendChild(div0);
    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
    });
  }

  function idolmain() {
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var parent = document.getElementById("contents");
    var div0 = document.createElement("div");
    div0.setAttribute("style", "float:left; width:80%;");

    var div1 = document.createElement("div");
    imageadder(div1, "BTS_main_big.jpg", "img0", "image_main_idol_1");
    div0.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("style", "text-align:center; width:1000px;");
    var text1 = document.createTextNode("Hot photos & videos");

    div2.appendChild(text1);
    div0.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("style", "width:1020px;");

    imageadder(div3, "BTS_main_big.jpg", "img1", "image_main_idol_2");
    imageadder(div3, "BTS_main_big.jpg", "img2", "image_main_idol_2");
    imageadder(div3, "BTS_main_big.jpg", "img3", "image_main_idol_2");
    imageadder(div3, "BTS_main_big.jpg", "img4", "image_main_idol_2");
    imageadder(div3, "BTS_main_big.jpg", "img5", "image_main_idol_2");
    imageadder(div3, "BTS_main_big.jpg", "img6", "image_main_idol_2");

    div0.appendChild(div3);
    div.appendChild(div0);

    var div4 = document.createElement("div");
    div4.setAttribute("style", "float:left; width: 20%;");

    var div5 = document.createElement("div");
    div5.setAttribute("style", "text-align:center");
    var text2 = document.createTextNode("Notice");
    div5.appendChild(text2);
    div4.appendChild(div5);

    var div6 = document.createElement("div");
    div6.setAttribute("style", "background:white");

    var list = document.createElement("ul");
    var li1 = document.createElement("li");

    li1.innerHTML = "one";
    var li2 = document.createElement("li");
    li2.innerHTML = "two";

    list.appendChild(li1);
    list.appendChild(li2);

    div6.appendChild(list);
    div4.appendChild(div6);

    div.appendChild(div4);
    parent.appendChild(div);
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
      "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px; margin-right:50px");

    var text1 = document.createTextNode("QnA Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid black");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute("style", "width: 10%");
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute("style", "width: 40%");
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute("style", "width: 25%");
    h3.innerHTML = "Author";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute("style", "width: 10%");
    h4.innerHTML = "Answer";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute("style", "width: 15%");
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
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #7ac3e6"
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
      "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color:#7ac3e6"
    );
    btn.setAttribute("ID", "submitqna");
    btn.innerHTML = "Submit";

    div4.appendChild(btn);
    div.appendChild(div4);

    parent.appendChild(div);
  }
  function photo() {
    var parent = document.getElementById("contents");
    var div = document.createElement("div");
    div.setAttribute("ID", "bigdiv");

    var div1 = document.createElement("div");
    div1.setAttribute(
      "style",
      "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px"
    );

    var strong1 = document.createElement("STRONG");
    strong1.setAttribute("style", "font-size:40px; margin-right:12%");

    var text1 = document.createTextNode("Photo Board");

    var small1 = document.createElement("SMALL");
    small1.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray"
    );

    var text2 = document.createTextNode("By Schedule");

    var small2 = document.createElement("SMALL");
    small2.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray"
    );

    var text3 = document.createTextNode("Latest");

    var small3 = document.createElement("SMALL");
    small3.setAttribute(
      "style",
      "font-size:20px; margin-right:3%; cursor:pointer;text-shadow: 4px 2px 2px gray;"
    );

    var text4 = document.createTextNode("Hottest");
    strong1.appendChild(text1);
    small1.appendChild(text2);
    small2.appendChild(text3);
    small3.appendChild(text4);

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
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #7ac3e6"
    );
    btn.innerHTML = "Write";

    div3.appendChild(btn);
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
    strong1.setAttribute("style", "font-size: 40px");
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
    var btn = document.createElement("button");
    btn.setAttribute(
      "style",
      "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color:#7ac3e6"
    );
    btn.setAttribute("ID", "submitphoto");
    btn.innerHTML = "Submit";

    div4.appendChild(btn);
    div.appendChild(div4);

    parent.appendChild(div);
  }
  function specific_photo() {
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

    var text1 = document.createTextNode("QnA Board");

    strong1.appendChild(text1);
    div1.appendChild(strong1);
    div.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "qnaline");
    div2.setAttribute("style", "border-bottom:4px solid black");

    var h1 = document.createElement("h5");
    h1.setAttribute("class", "qnaheader");
    h1.setAttribute("style", "width: 10%");
    h1.innerHTML = "No.";

    var h2 = document.createElement("h5");
    h2.setAttribute("class", "qnaheader");
    h2.setAttribute("style", "width: 40%");
    h2.innerHTML = "Title";

    var h3 = document.createElement("h5");
    h3.setAttribute("class", "qnaheader");
    h3.setAttribute("style", "width: 25%");
    h3.innerHTML = "Author";

    var h4 = document.createElement("h5");
    h4.setAttribute("class", "qnaheader");
    h4.setAttribute("style", "width: 10%");
    h4.innerHTML = "Answer";

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "qnaheader");
    h5.setAttribute("style", "width: 15%");
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
      "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #7ac3e6"
    );
    btn.innerHTML = "Write";

    div3.appendChild(btn);
    div.appendChild(div3);

    parent.appendChild(div);

    getqnaData();
  }

  function clear() {
    var div = document.getElementById("bigdiv");
    var parent = document.getElementById("contents");
    if (div != null) parent.removeChild(div);
  }

  function resetmenu() {
    var temp;
    temp = document.getElementById("main");
    temp.setAttribute("style", "cursor:pointer");
    temp = document.getElementById("notice");
    temp.setAttribute("style", "cursor:pointer");
    temp = document.getElementById("hot");
    temp.setAttribute("style", "cursor:pointer");
    temp = document.getElementById("shop");
    temp.setAttribute("style", "cursor:pointer");
    temp = document.getElementById("calendar");
    temp.setAttribute("style", "cursor:pointer");
    temp = document.getElementById("wiki");
    temp.setAttribute("style", "cursor:pointer");
  }

  function reshape(filter_change = false) {
    clear();
    resetmenu();
    selected_filter = $("#filter").val();
    if (current_state == "main") {
      var curr = document.getElementById("main");
      curr.setAttribute("style", "background-color: #4767ff; cursor:pointer");
      if (selected_filter == "BTS") idolmain();
      else main();
    } else if (current_state == "qna1") {
      qna1();
    } else if (current_state == "qna2") {
      if (filter_change) {
        current_state = "qna1";
        reshape();
      } else qna2();
    } else if (current_state == "photo") {
      photo();
    } else if (current_state == "photo2") {
      if (filter_change) {
        current_state = "photo";
        reshape();
      } else photo2();
    }
  }

  filter.addEventListener("change", function () {
    reshape(true);
  });

  $("#qna").click(function () {
    current_state = "qna1";
    reshape();
  });
  $("#photo").click(function () {
    current_state = "photo";
    reshape();
  });

  $("#contents").on("click", "#write_button", function () {
    current_state = "qna2";
    reshape();
  });
  $("#contents").on("click", "#write_button_photo", function () {
    current_state = "photo2";
    reshape();
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
      author: "김주호",
      answer: 0,
      date: date,
      content: content,
    });
    current_state = "qna1";
    reshape();
  });
  $("#contents").on("click", "#submitphoto", function () {
    var photo = document.getElementById("image").files[0];
    var storageRef = firebase.storage().ref();
    storageRef
      .child(`images/${photo.name}`)
      .put(photo)
      .then((snapshot) => {
        console.log("Uploaded.");
      });
    var photourl = "images/" + photo.name;
    var title = document.getElementById("photoTitle").value;
    var content = document.getElementById("photoContents").value;
    var newphoto = firebase.database().ref("/photo").push();
    var date = new Date().toLocaleDateString();
    newphoto.set({
      title: title,
      author: "김주호",
      date: date,
      content: content,
      photourl: photourl,
    });
    current_state = "photo";
    reshape();
  });
  reshape();
});
