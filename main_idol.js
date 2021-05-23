$( document ).ready(function() {
    var filter = document.getElementById("filter");

    var firebaseConfig = {
        apiKey: "AIzaSyACT6acGeh9iFqQBDmkcAQc1Hzs9obUzr8",
        authDomain: "starlight-5a11b.firebaseapp.com",
        databaseURL: "https://starlight-5a11b-default-rtdb.firebaseio.com",
        projectId: "starlight-5a11b",
        storageBucket: "starlight-5a11b.appspot.com",
        messagingSenderId: "725820928370",
        appId: "1:725820928370:web:77593ae49597a445acadeb",
        measurementId: "G-L5J6STQN97"
    };
    firebase.initializeApp(firebaseConfig);

    var qnanum = 0;
    var current_state = "main";
    var selected_filter;
    var f_qna;
    var f_key;
    var f_qnaanswer;
    var selected_answer;
    var idol = $("#filter").val();
    var current_user = "nologin";

    function getCommentData(){
        firebase.database().ref('/qna/'+f_key).once('value').then((snapshot) => {
            var qnaval = snapshot.val();
            if (qnaval.comments == null) return;
            var keyList = Object.keys(qnaval.comments);
            qnanum = keyList.length;
            var current;
            var state = qnaval.selected;
    
            for(var i=qnanum-1; i>=0; i--){
                current = qnaval.comments[keyList[i]];
                addcomment(current, state);
            }
        });
    }

    function getqnaData() {
        firebase.database().ref('/qna').once('value').then((snapshot) => {
        var qnaval = snapshot.val();
        if (qnaval == null) return;
        var keyList = Object.keys(qnaval);
        qnanum = keyList.length;
        var current;


        for(var i=qnanum-1; i>=0; i--){
            current = qnaval[keyList[i]];
            if (current.idol == idol || idol == "All") addqna(current);
        }
        });
    }

    function getnoticeData() {
        firebase.database().ref('/notice').once('value').then((snapshot) => {
        var noticeval = snapshot.val();
        if (noticeval == null) return;
        var keyList = Object.keys(noticeval);
        noticenum = keyList.length;
        var current;

        for(var i=noticenum-1; i>=0; i--){
            current = noticeval[keyList[i]];
            if (current.idol == idol || idol == "All") addnotice(current);
        }
        });
    }

    function addqna(qnaval) {
        var target_div = document.getElementById("write-div");
        var parent = document.getElementById("bigdiv");
        var div1 = document.createElement("div");
        div1.setAttribute("class","qnaline");
        div1.setAttribute("style", "text-align:center;");

        var h1 = document.createElement("p");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h1.innerHTML = qnaval.no;

        var h2 = document.createElement("p");
        h2.setAttribute("class", "question");
        h2.setAttribute("style", "width: 40%;font-family: Roboto, serif;margin:auto;")
        h2.innerHTML = qnaval.title;

        var h3 = document.createElement("p");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 25%;font-family: Roboto, serif;margin:auto;")
        h3.innerHTML = qnaval.author;

        var h4 = document.createElement("p");
        h4.setAttribute("class", "qnaheader");
        h4.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h4.innerHTML = qnaval.answer;

        var h5 = document.createElement("p");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%;font-family: Roboto, serif;margin:auto;")
        h5.innerHTML = qnaval.date;

        div1.appendChild(h1);
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
        div1.setAttribute("class","qnaline");
        div1.setAttribute("style", "text-align:center;");

        var h1 = document.createElement("p");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h1.innerHTML = qnaval.no;

        var h2 = document.createElement("p");
        h2.setAttribute("class", "notice");
        h2.setAttribute("style", "width: 40%;font-family: Roboto, serif;margin:auto;cursor:pointer;")
        h2.innerHTML = qnaval.title;

        var h3 = document.createElement("p");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 35%;font-family: Roboto, serif;margin:auto;")
        h3.innerHTML = qnaval.author;

        var h5 = document.createElement("p");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%;font-family: Roboto, serif;margin:auto;")
        h5.innerHTML = qnaval.date;

        div1.appendChild(h1);
        div1.appendChild(h2);
        div1.appendChild(h3);
        div1.appendChild(h5);

        parent.insertBefore(div1, target_div);
    }

    function addcomment(commentval, state) {
        var target_div = document.getElementById("qna_comments");
        var div1 = document.createElement("div");
        div1.setAttribute("class","qnaline");
        div1.setAttribute("style", "height:auto")

        var h1 = document.createElement("p");
        if (commentval.selected == true){
            h1.setAttribute("style", "color:#2f80ed;width:20%");
        }
        else h1.setAttribute("style", "width:20%;font-family: Roboto, serif;");
        h1.innerHTML = commentval.author;    
        
        var h2 = document.createElement("p");
        if (commentval.selected == true){
            h2.setAttribute("style", "color:#2f80ed;width:60%");
        }
        else h2.setAttribute("style", "width: 60%;font-family: Roboto, serif;");
        h2.innerHTML = commentval.content;

        var text1 = document.createElement("p");
        text1.setAttribute("style", "width: 10%;text-align:right;font-size:14px;color:#858080;cursor:pointer;font-family: Roboto, serif;");
        text1.innerHTML = "History";

        div1.appendChild(h1);
        div1.appendChild(h2);
        div1.appendChild(text1);
        
        if (!state){
            var button1 = document.createElement("button");
            button1.setAttribute("class", "selectbtn");
            button1.setAttribute("style", "font-family: Roboto, serif;");
            button1.innerHTML = "SELECT";
            div1.appendChild(button1);
        }
        else {
            if (commentval.selected == true){
                var button1 = document.createElement("button");
                button1.setAttribute("class", "selectedbtn");
                button1.setAttribute("style", "font-family: Roboto, serif;");
                button1.innerHTML = "SELECTED";
                div1.appendChild(button1);
            }
        }

        target_div.appendChild(div1);
    }

    function getswiperData(div){
        firebase
            .database()
            .ref("/photo")
            .once("value")
            .then((snapshot) => {
                var photoval = snapshot.val();
                if (photoval == null) return;
                var keyList = Object.keys(photoval);
                var randList = []
                photonum = keyList.length;

                for (var i=0; i<3;i++){
                    rand = Math.floor(Math.random()*photonum);
                    if (randList.indexOf(rand) === -1) randList.push(rand);
                    else i--;
                }

                for (var i=0; i<3; i++){
                    current = photoval[keyList[randList[i]]];
                    readphoto(div, current, keyList[randList[i]]);
                }
            });
    }

    function readphoto(div, photoval, keyval){
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
            img.setAttribute("style", "width: 1200px;height: 400px; object-fit: cover;");
            swipe_page.appendChild(img);
            swipe_page.appendChild(hidden);
            div.appendChild(swipe_page);
            })
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
        div0.setAttribute("style", "display:inline-block");
        var storage = firebase.storage().ref();
        storage.child(current.mainphoto).getDownloadURL().then(function (url){
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
                    if (current_state == "main") addphoto_main(div, current, keyList[i]);
                    else addphoto(current);
                }
            }
            });
        }

        function addphoto(photoval) {
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
            console.log(storage.child(photoval.photourl));
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
        
            div1.appendChild(h6);
            div1.appendChild(div_img);
            div1.appendChild(h1);
            div1.appendChild(h3);
            div1.appendChild(h5);
            div1.appendChild(h_content);
        
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
        
        var myidol = document.createElement("div");
        myidol.setAttribute("style", "text-align:center;")

        var btn = document.createElement("button");
        btn.setAttribute("ID", "main_btn");
        btn.setAttribute("style", "width:280px; height:200px; vertical-align:top; margin-top:20px; font-size:50px");
        var plus = document.createTextNode("+");
        btn.appendChild(plus);
        myidol.appendChild(btn);

        getidolData(myidol, btn);

        div0.appendChild(myidol);
        parent.appendChild(div0);
        var swiper = new Swiper(".mySwiper", {
            pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            },
        });
    }
    
    function idolmain(){
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var parent = document.getElementById("contents");
        var div0 = document.createElement("div");
        div0.setAttribute("style", "float:left; width:80%;")

        var div1 = document.createElement("div");

        firebase.database().ref('/idolinfo/'+idol).once('value').then((snapshot) => {
            var storage = firebase.storage().ref();
            var src = snapshot.val().mainphoto;
            var img0 = document.createElement("img");
            storage.child(src).getDownloadURL().then(function (url){
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
            })
            div1.appendChild(img0);
            div0.appendChild(div1);

            var div2 = document.createElement("div");
            div2.setAttribute("style", "text-align:center; width:1000px;");
            var text1 = document.createElement("p");
            text1.setAttribute("style", "font-family: Roboto, serif");
            text1.innerHTML = "Hot Photos & Videos";

            div2.appendChild(text1); 
            div0.appendChild(div2);

            var div3 = document.createElement("div");
            div3.setAttribute("style", "width:1020px;");

            getphotoData(div3);
            div0.appendChild(div3);
            
            div.appendChild(div0);

            var div4 = document.createElement("div");
            div4.setAttribute("style", "float:left; width: 20%;");
            
            var div5 = document.createElement("div");
            div5.setAttribute("style", "text-align:center");
            var text2 = document.createElement("p");
            text2.setAttribute("style", "font-family: Roboto, serif; font-size: 23px;text-decoration : underline;");
            text2.innerHTML = "Notice";
            div5.appendChild(text2);
            div4.appendChild(div5);

            var div6 = document.createElement("div");
            div6.setAttribute("style", "background:white;height: 300px");
            div6.setAttribute("ID", "notice_list");

            getnoticeData_mainpage();
            // var list = document.createElement("ul");
            // var li1 = document.createElement("li");
            
            // li1.innerHTML = "one";
            // var li2 = document.createElement("li");
            // li2.innerHTML = "two";
            
            // list.appendChild(li1);
            // list.appendChild(li2);
            
            //div6.appendChild(list);
            div4.appendChild(div6);

            var div7 = document.createElement("div");
            div7.setAttribute("style", "text-align:center");
            var text3 = document.createElement("p");
            text3.setAttribute("style", "font-family: Roboto, serif; font-size: 23px;text-decoration : underline;");
            text3.innerHTML = "Schedule";
            div7.appendChild(text3);
            div4.appendChild(div7);

            var div8 = document.createElement("div");
            div8.setAttribute("style", "background:white;height: 500px;margin-bottom: 20px");

            var list2 = document.createElement("ul");
            var li3 = document.createElement("li");
            
            li3.innerHTML = "one";
            var li4 = document.createElement("li");
            li4.innerHTML = "two";
            
            list2.appendChild(li3);
            list2.appendChild(li4);
            
            div8.appendChild(list2);
            div4.appendChild(div8);

            div.appendChild(div4);
            parent.appendChild(div);
        });
    }

    function getnoticeData_mainpage(){
        firebase.database().ref('/notice').once('value').then((snapshot) => {
            var noticeval = snapshot.val();
            if (noticeval == null) return;
            var keyList = Object.keys(noticeval);
            noticenum = keyList.length;
            var current;

            for(var i = noticenum-1; i>=0; i--){
                current = noticeval[keyList[i]];
                if (current.idol == idol || idol == "All") addnotice_mainpage(current);
            }

            
        })
    }

    function addnotice_mainpage(noticeval){
        var parent = document.getElementById("notice_list");
        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align: left; margin-left: 10px; margin-right: 5px;");

        var h1 = document.createElement("p");
        h1.setAttribute("style", "font-family: Roboto, serif;margin-top: 5px;");
        h1.innerHTML = "※ " + noticeval.title;

        div1.appendChild(h1);
        parent.appendChild(div1);

    }

    function imageadder(parent_div, img_src, img_alt, img_class){
        var img = document.createElement("img");
        img.setAttribute("src", img_src);
        img.setAttribute("alt", img_alt);
        img.setAttribute("class", img_class);
        
        parent_div.appendChild(img);
    }

    function qna1(){
        var parent = document.getElementById("contents");
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px;");

        var text1 = document.createTextNode("QnA Board");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class","qnaline_ori");

        var h1 = document.createElement("h5");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h1.innerHTML ="No.";

        var h2 = document.createElement("h5");
        h2.setAttribute("class", "qnaheader");
        h2.setAttribute("style", "width: 40%;font-family: Roboto, serif;margin:auto;")
        h2.innerHTML = "Title";

        var h3 = document.createElement("h5");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 25%;font-family: Roboto, serif;margin:auto;")
        h3.innerHTML = "Author";

        var h4 = document.createElement("h5");
        h4.setAttribute("class", "qnaheader");
        h4.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h4.innerHTML = "Answer";

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%;font-family: Roboto, serif;margin:auto;")
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
        btn.setAttribute("style", "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;");
        btn.innerHTML = "Write";

        div3.appendChild(btn);
        div.appendChild(div3);
        
        parent.appendChild(div);

        getqnaData();
    }

    function qna2(){
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
        input1.setAttribute("style", "width: 98%;margin-bottom: 10px;height: 30px;margin-top: 8px");
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
        btn.setAttribute("style", "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color: #2B5A89;font-family: Roboto, serif;border-radius:10px;color:white;");
        btn.setAttribute("ID", "submitqna");
        btn.innerHTML = "Submit";
        
        div4.appendChild(btn);
        div.appendChild(div4);

        parent.appendChild(div);
    }

    function qnapost(){
        var parent = document.getElementById("contents");
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px;");

        var text1 = document.createTextNode("QnA Board");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class","qnaline");
        div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

        var qnano = document.createElement("div");
        qnano.setAttribute("class", "qnaheader");
        qnano.setAttribute("style", "width:50%; text-align:left;font-family: Roboto, serif;");
        qnano.innerHTML = "Question No."+f_qna.no;
        

        var qnaauthor = document.createElement("div");
        qnaauthor.setAttribute("class", "qnaheader");
        qnaauthor.setAttribute("style", "width:50%;text-align: right;font-family: Roboto, serif;");
        qnaauthor.innerHTML = f_qna.author;


        div2.appendChild(qnano);
        div2.appendChild(qnaauthor);
        

        var div3 = document.createElement("div");
        div3.setAttribute("class", "qnaline");
        div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

        var qnatitle = document.createElement("div");
        qnatitle.setAttribute("class", "qnaheader");
        qnatitle.setAttribute("style", "width:50%; text-align:left;font-family: Roboto, serif;");
        qnatitle.innerHTML = f_qna.title;

        var qnatime = document.createElement("div");
        qnatime.setAttribute("class", "qnaheader");
        qnatime.setAttribute("style", "width:50%;text-align: right;font-family: Roboto, serif;");
        qnatime.innerHTML = f_qna.date;

        div3.appendChild(qnatitle);
        div3.appendChild(qnatime);


        var div4 = document.createElement("div");
        div4.innerHTML = f_qna.content;
        div4.setAttribute("style", "margin:20px;font-family: Roboto, serif;");



        var div5 = document.createElement("div");

        var leaveans = document.createElement("input");
        leaveans.setAttribute("ID", "comment_input");
        leaveans.setAttribute("style", "height: 80px;width: 88%;margin-left:20px;margin-top:30px");

        var enterans = document.createElement("button");
        enterans.setAttribute("ID", "enterans");
        enterans.setAttribute("style", "height:86px;width:86px;margin-left:10px;font-family: Roboto, serif;")
        enterans.innerHTML = "Enter";

        div5.appendChild(leaveans);
        div5.appendChild(enterans);
        // div5.appendChild(qnaedit);
        // div5.appendChild(qnadelete);


        var div6 = document.createElement("div");
        div6.setAttribute("class", "qnaline");
        div6.setAttribute("style", "border-bottom:2px solid #2B5A89");

        var answernum = document.createElement("h4");
        answernum.setAttribute("style", "font-family: Roboto, serif;")
        answernum.innerHTML = "Answers("+f_qnaanswer+")";
        
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

    function noticepost(){
        var parent = document.getElementById("contents");
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px;");

        var text1 = document.createTextNode("Notice");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class","qnaline");
        div2.setAttribute("style", "border-bottom:4px solid #2B5A89");

        var qnano = document.createElement("div");
        qnano.setAttribute("class", "qnaheader");
        qnano.setAttribute("style", "width:50%; text-align:left;font-family: Roboto, serif;");
        qnano.innerHTML = "Notice No."+f_qna.no;
        

        var qnaauthor = document.createElement("div");
        qnaauthor.setAttribute("class", "qnaheader");
        qnaauthor.setAttribute("style", "width:50%;text-align: right;font-family: Roboto, serif;");
        qnaauthor.innerHTML = f_qna.author;


        div2.appendChild(qnano);
        div2.appendChild(qnaauthor);
        

        var div3 = document.createElement("div");
        div3.setAttribute("class", "qnaline");
        div3.setAttribute("style", "border-bottom:2px solid #2B5A89");

        var qnatitle = document.createElement("div");
        qnatitle.setAttribute("class", "qnaheader");
        qnatitle.setAttribute("style", "width:50%; text-align:left;font-family: Roboto, serif;");
        qnatitle.innerHTML = f_qna.title;

        var qnatime = document.createElement("div");
        qnatime.setAttribute("class", "qnaheader");
        qnatime.setAttribute("style", "width:50%;text-align: right;font-family: Roboto, serif;");
        qnatime.innerHTML = f_qna.date;

        div3.appendChild(qnatitle);
        div3.appendChild(qnatime);


        var div4 = document.createElement("div");
        div4.innerHTML = f_qna.content;
        div4.setAttribute("style", "margin:20px;font-family: Roboto, serif;border-bottom:2px solid #2B5A89;padding-bottom: 20px;");


        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);

        parent.appendChild(div);

    }


    function photo() {
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
        strong1.setAttribute("style", "font-size:40px; margin-right:20%");
    
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
        strong1.setAttribute("style", "font-size: 40px;font-family: Roboto, serif;");
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
        console.log(content[1].firstChild.width);
        console.log(content[1].firstChild.height);
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
        schedule_div.setAttribute("style", "display : flex;height:40px;font-family: Roboto, serif;");
        var schedule = document.createElement("STRONG");
        schedule.setAttribute(
            "style",
            "font-size: 30px;position: absolute; right: 20px"
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
        header.setAttribute("style", "display : flex;");
        var contents = document.createElement("div");
        contents.setAttribute("style", "display : flex;");
    
        var title = document.createElement("div");
        title.setAttribute("style", "font-size: 30px");
        title.innerHTML = "Title: " + content[2].innerHTML;
        var author = document.createElement("div");
        author.setAttribute(
            "style",
            "font-size: 30px;position: absolute; right: 20px;font-family: Roboto, serif;"
        );
        author.innerHTML = content[3].innerHTML;
        var date = document.createElement("div");
        date.setAttribute(
            "style",
            "font-size: 30px;position: absolute; right: 20px;font-family: Roboto, serif;"
        );
        date.innerHTML = "Date: " + content[4].innerHTML;
        var content_html = document.createElement("div");
        content_html.setAttribute("style", "font-size: 30px");
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
    
        var btn = document.createElement("button");
        btn.setAttribute("ID", "write_button_photo");
        btn.setAttribute(
            "style",
            "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #2B5A89;border-radius:10px; color:white"
        );
        btn.innerHTML = "Write";
    
        div3.appendChild(btn);
        div.appendChild(div_chunks);
        div.appendChild(div3);
    
        parent.appendChild(div);
        }

    function notice_page(){
        var parent = document.getElementById("contents");
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align:left; border-bottom:8px solid #2B5A89; margin-left:20px; margin-right:20px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px;");

        var text1 = document.createTextNode("Notice");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class","qnaline_ori");

        var h1 = document.createElement("h5");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%;font-family: Roboto, serif;margin:auto;")
        h1.innerHTML ="No.";

        var h2 = document.createElement("h5");
        h2.setAttribute("class", "qnaheader");
        h2.setAttribute("style", "width: 40%;font-family: Roboto, serif;margin:auto;")
        h2.innerHTML = "Title";

        var h3 = document.createElement("h5");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 35%;font-family: Roboto, serif;margin:auto;")
        h3.innerHTML = "Author";

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%;font-family: Roboto, serif;margin:auto;")
        h5.innerHTML = "Date";

        div2.appendChild(h1);
        div2.appendChild(h2);
        div2.appendChild(h3);
        div2.appendChild(h5);

        div.appendChild(div2);
        
        parent.appendChild(div);

        getnoticeData();
    }


    function clear(){
        var div = document.getElementById("bigdiv");
        var parent = document.getElementById("contents");
        if (div != null) parent.removeChild(div);
    }

    function resetmenu(){
        var temp;
        temp = document.getElementById("main");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
        temp = document.getElementById("notice");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
        temp = document.getElementById("hot");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
        temp = document.getElementById("shop");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
        temp = document.getElementById("calendar");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
        temp = document.getElementById("wiki");
        temp.setAttribute("style", "cursor:pointer;border-right:2px solid #666666;");
    }

    function blue_qna(){
        var t_qna = document.getElementById("qna");
        t_qna.setAttribute("style", "color: #1087FF;cursor:pointer;");
    }
    function black_qna(){
        var t_qna = document.getElementById("qna");
        t_qna.setAttribute("style", "color: #000000;cursor:pointer;");
    }
    function blue_photo(){
        var t_photo = document.getElementById("photo");
        t_photo.setAttribute("style", "color: #1087FF;cursor:pointer;");
    }
    function black_photo(){
        var t_photo = document.getElementById("photo");
        t_photo.setAttribute("style", "color: #000000;cursor:pointer;");
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
        schedule_div.setAttribute("style", "display : flex;height:40px;font-family: Roboto, serif;");
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
        img.setAttribute("style", "width: " + w + "px; height: " +
        h +"px" )
    
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

    function reshape(options){
        options = options || {};
        var defaults = {filter_change: false, photo_content: "", pval: "", src: ""};
        for (var prop in defaults)  {
            options[prop] = typeof options[prop] !== 'undefined' ? options[prop] : defaults[prop];
        }
        clear();
        resetmenu();
        selected_filter = $("#filter").val();
        if (current_state == "main"){
            black_photo();
            black_qna();
            var curr = document.getElementById("main");
            curr.setAttribute("style", "border-right: solid 4px #1087ff; cursor:pointer");
            if (selected_filter == "All") main();
            else idolmain();
        }
        else if (current_state == "qna1"){
            qna1();
            blue_qna();
            black_photo();
        }
        else if (current_state == "qna2"){
            qna2();
            blue_qna();
            black_photo();
        }
        else if (current_state == "qnapost"){
            blue_qna();
            black_photo();
            if (options.filter_change){
                current_state = "qna1";
                reshape();
            }
            else qnapost();
        }
        else if (current_state == "noticepost"){
            black_qna();
            black_photo();
            var curr = document.getElementById("notice");
            curr.setAttribute("style", "border-right: solid 4px #1087ff; cursor:pointer");
            if (filter_change){
                current_state = "notice";
                reshape();
            }
            else noticepost();
        }

        else if (current_state == "photo") {
            blue_photo();
            black_qna();
            photo();
        } 
        else if (current_state == "photo2") {
            blue_photo();
            black_qna();
            photo2();
        } 
        else if (current_state == "photo_specific") {
            blue_photo();
            black_qna();
            if (options.filter_change) {
                current_state = "photo";
                reshape();
            } 
            else {
                specific_photo(options.photo_content);
            }
        }
        else if (current_state == "goto"){
            blue_photo();
            gotophoto(options.pval,options.src);
        }
        else if (current_state == "notice"){
            black_photo();
            black_qna();
            var curr = document.getElementById("notice");
            curr.setAttribute("style", "border-right: solid 4px #1087ff; cursor:pointer");
            notice_page();
        }
    }

    filter.addEventListener("change", function(){
        idol = $("#filter").val();
        reshape({filter_change: true});
    });

    $("#photo").click(function () {
        current_state = "photo";
        reshape();
    });

    $("#contents").on("click", ".photo_button", function () {
        current_state = "photo_specific";
        console.log( $(this).parent().children());
        reshape({photo_content: $(this).parent().children()});
    });

    $("#contents").on("click", ".image_main_idol_2", function(){
        current_state = "goto";
        var key = $(this).parent().children().text();
        var src = $(this).attr('src');
        
        firebase.database().ref('/photo/'+key).once('value').then((snapshot) =>{
            var photoval = snapshot.val();
            reshape({pval: photoval, src: src});
        });
    });

    $("#contents").on("click", ".swiper-slide", function(){
        current_state = "goto";
        var key = $(this).children().text();
        var src = $(this).children()[0].src;
        firebase.database().ref('/photo/'+key).once('value').then((snapshot) =>{
            var photoval = snapshot.val();
            reshape({pval: photoval, src: src});
        });
    });

    $("#contents").on("click", ".image_main", function(){
        var temp = $(this).parent().children().text();
        $("#filter option[value=" + temp + "]").prop('selected', true);
        idol = $("#filter").val();
        reshape({filter_change: true});
    });

    $("#contents").on("click", ".photo_button_title", function () {
        $(this).parent().children()[1].click();
    });

    $("#contents").on("click", "#write_button_photo", function () {
        if (current_user == "nologin") alert("Please log-in")
        else{
            current_state = "photo2";
            reshape();
        }
    });


    $('#contents').on("click", ".question", function(){
        index = $(this).parent().index();
        firebase.database().ref('/qna').once('value').then((snapshot) => {
            var qnaval = snapshot.val()
            var keyList = Object.keys(qnaval);
            index = keyList.length - index + 1;
            var currentkey = keyList[index];
            console.log(qnaval[currentkey].no);
            f_qna = qnaval[currentkey];
            f_key = currentkey;
            f_qnaanswer = qnaval[currentkey].answer;
            
            current_state = "qnapost";
            reshape();
        });
    });

    $('#qna').click(function(){
        current_state = "qna1";
        reshape();
    });

    $('#contents').on("click", "#write_button", function(){
        if (current_user == "nologin") alert("Please log-in")
        else{
            current_state = "qna2";
            reshape();
        }
    });

    $('#main').click(function(){
        current_state = "main";
        reshape();
    });

    $('#notice').click(function(){
        current_state = "notice";
        reshape();
    });

    $('#contents').on("click", ".notice", function(){
        index = $(this).parent().index();
        firebase.database().ref('/notice').once('value').then((snapshot) => {
            var qnaval = snapshot.val()
            var keyList = Object.keys(qnaval);
            index = keyList.length - index + 1;
            var currentkey = keyList[index];
            console.log(qnaval[currentkey].no);
            f_qna = qnaval[currentkey];
            f_key = currentkey;
            
            current_state = "noticepost";
            reshape();
        });
    });

    $('#contents').on("click", "#enterans", function(){
        if (current_user == "nologin") alert("Please log-in")
        else{
            var comment_input = document.getElementById("comment_input").value;
            firebase.database().ref('/qna/'+f_key+'/author').once('value').then((snapshot) => {
                console.log(snapshot.val());
                if (snapshot.val() == current_user) alert("You can't answer your own question");
                else{
                    var newcomment = firebase.database().ref('/qna/'+f_key+'/comments').push();
                    newcomment.set({
                        content: comment_input,
                        author : current_user,
                        selected : false
                    })

                    f_qnaanswer += 1;
                    
                    var update = {};
                    update['/qna/' + f_key + '/answer'] = f_qnaanswer; 

                    firebase.database().ref().update(update);
                    reshape();
                }
        });
        }   
        
    });

    $('#contents').on("click" , "#submitqna", function() {
        if (idol=="All") alert("Choose an idol");
        else{
            qnanum++;
            var title = document.getElementById("qnaTitle").value;
            var content = document.getElementById("qnaContents").value;
            var newqna = firebase.database().ref('/qna').push();
            var date = new Date().toLocaleDateString();
            newqna.set({
                no : qnanum,
                title: title,
                author : current_user,
                idol : idol,
                answer: 0,
                date: date,
                content: content,
                selected : false
            });
            current_state = "qna1";
            reshape();
        }
    });

    $('#login_popup').dialog({
        autoOpen: false,
        dialogClass: 'dialog_title',
        show: {
            duration: 0
        },
        hide: {
            duration: 0
        }
    });
    $("#login_popup").dialog( "option", "width", 500 );

    $('#nav1').on("click", "#login", function() {
        $('#login_popup').dialog("open");
    })

    $('#login_popup').keypress(function(key){
        if(key.which == 13){
          $('#login-ok').click();
        }
      })

    $('#login-ok').click(function(){
        var logininput = document.getElementById('login_id');
        current_user = logininput.value;
        $('#login_popup').dialog("close");
        var login_id = document.getElementById("login_id");
        var passwd = document.getElementById("passwd");
        login_id.value = "";
        passwd.value = "";
        
        var parent = document.getElementById("nav1");
        var btn = document.getElementById("login");
        parent.removeChild(btn);

        var target = document.getElementById("back");
        var logout = document.createElement("button");
        logout.setAttribute("style", "float: right;align-items: center;margin-right: 20px;font-size: 20px;margin-top: 10px");
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
    })

    $("#nav1").on("click", "#logout", function() {
        current_user = "nologin";
        var parent = document.getElementById("nav1");
        var btn = document.getElementById("logout");
        var usr = document.getElementById("username");

        parent.removeChild(btn);
        parent.removeChild(usr);

        var target = document.getElementById("back");
        var login = document.createElement("button");
        login.setAttribute("style", "float: right;align-items: center;margin-right: 20px;font-size: 20px;margin-top: 10px");
        login.setAttribute("ID", "login");
        login.innerHTML = "LOGIN";

        parent.insertBefore(login, target);
    });

    $("#contents").on("click", "#submitphoto", function () {
        if (idol=="All") alert("Choose an idol");
        else{
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
            var schedule = document.getElementById("schedule").value;
            var newphoto = firebase.database().ref("/photo").push();
            var date = new Date().toLocaleDateString();
            newphoto.set({
                title: title,
                author: current_user,
                idol: idol,
                date: date,
                content: content,
                photourl: photourl,
                schedule: schedule,
            });
            current_state = "photo";
            reshape();
        }
        });

    $('#my_page').dialog({
        autoOpen: false,
        dialogClass: 'dialog_title',
        show: {
            duration: 0
        },
        hide: {
            duration: 0
        },
        title: "My Page"
    });
    $("#my_page").dialog( "option", "width", 400 );
    $("#my_page").dialog( "option", "height", 400 );

    $("#nav1").on("click", "#username", function(){
        var my_page_id = document.getElementById("my_page_id");
        my_page_id.innerHTML = "ID : " + current_user;
        $('#my_page').dialog("open");
    })

    $('#select').dialog({
        autoOpen: false,
        dialogClass: 'dialog_title',
        show: {
            duration: 0
        },
        hide: {
            duration: 0
        }
    });
    $("#select").dialog( "option", "width", 650 );

    $('#select2').dialog({
        autoOpen: false,
        show: {
            duration: 0
        },
        hide: {
            duration: 0
        }
    });

    $('#contents').on("click", ".selectbtn", function(){
        selected_answer = $(this).parent().index();
        $("#select").dialog("open");
    });

    $("#yes").click(function(){
        $("#select").dialog("close"); 
        $("#select2").dialog("open");

        firebase.database().ref('/qna/'+f_key).once('value').then((snapshot) => {
            var qnaval = snapshot.val()
            var keyList = Object.keys(qnaval.comments);
            var currentkey = keyList[keyList.length - Number(selected_answer)-1];
            
            var update = {};
            update['/qna/' + f_key + '/selected'] = true;
            update['/qna/' + f_key + '/comments/' + currentkey + '/selected'] = true;
            firebase.database().ref().update(update);
        });
    });

    $("#no").click(function(){
        $("#select").dialog("close");
    });

    $("#close").click(function(){
        $("#select2").dialog("close");
        reshape();
    });
    reshape();
}); 