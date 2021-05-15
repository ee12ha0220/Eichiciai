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
    
    function getqnaData() {
        firebase.database().ref('/qna').once('value').then((snapshot) => {
        var qnaval = snapshot.val();
        if (qnaval == null) return;
        var keyList = Object.keys(qnaval);
        qnanum = keyList.length;
        var current;

        for(var i=qnanum-1; i>=0; i--){
            current = qnaval[keyList[i]];
            addqna(current);
        }
        });
    }

    function addqna(qnaval) {
        var target_div = document.getElementById("write-div");
        var parent = document.getElementById("bigdiv");
        var div1 = document.createElement("div");
        div1.setAttribute("class","qnaline");
        var h1 = document.createElement("p");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%")
        h1.innerHTML = qnaval.no;

        var h2 = document.createElement("p");
        h2.setAttribute("class", "question");
        h2.setAttribute("style", "width: 40%")
        h2.innerHTML = qnaval.title;

        var h3 = document.createElement("p");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 25%")
        h3.innerHTML = qnaval.author;

        var h4 = document.createElement("p");
        h4.setAttribute("class", "qnaheader");
        h4.setAttribute("style", "width: 10%")
        h4.innerHTML = qnaval.answer;

        var h5 = document.createElement("p");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%")
        h5.innerHTML = qnaval.date;

        div1.appendChild(h1);
        div1.appendChild(h2);
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
        var text1 = document.createTextNode("slide1");
        var text2 = document.createTextNode("slide2");
        var text3 = document.createTextNode("slide3");
        var text4 = document.createTextNode("slide4");
        var text5 = document.createTextNode("slide5");
        swipe1.appendChild(text1);
        swipe2.appendChild(text2);
        swipe3.appendChild(text3);
        swipe4.appendChild(text4);
        swipe5.appendChild(text5);
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
        myidol.setAttribute("style", "text-align:center;")

        imageadder(myidol, "yuqi.PNG", "img1", "image_main");
        imageadder(myidol, "yuqi.PNG", "img2", "image_main");
        imageadder(myidol, "yuqi.PNG", "img3", "image_main");

        var btn = document.createElement("button");
        btn.setAttribute("style", "width:280px; height:200px; vertical-align:top; margin-top:20px; font-size:50px");
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
    
    function idolmain(){
        var div = document.createElement("div");
        div.setAttribute("ID", "bigdiv");

        var parent = document.getElementById("contents");
        var div0 = document.createElement("div");
        div0.setAttribute("style", "float:left; width:80%;")

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
        div1.setAttribute("style", "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px; margin-right:50px");

        var text1 = document.createTextNode("QnA Board");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("class","qnaline");
        div2.setAttribute("style", "border-bottom:4px solid black");

        var h1 = document.createElement("h5");
        h1.setAttribute("class", "qnaheader");
        h1.setAttribute("style", "width: 10%")
        h1.innerHTML ="No.";

        var h2 = document.createElement("h5");
        h2.setAttribute("class", "qnaheader");
        h2.setAttribute("style", "width: 40%")
        h2.innerHTML = "Title";

        var h3 = document.createElement("h5");
        h3.setAttribute("class", "qnaheader");
        h3.setAttribute("style", "width: 25%")
        h3.innerHTML = "Author";

        var h4 = document.createElement("h5");
        h4.setAttribute("class", "qnaheader");
        h4.setAttribute("style", "width: 10%")
        h4.innerHTML = "Answer";

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "qnaheader");
        h5.setAttribute("style", "width: 15%")
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
        btn.setAttribute("style", "float:right; margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #7ac3e6");
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
        input1.setAttribute("value", "Enter a Title...");
        input1.setAttribute("style", "width: 98%;margin-bottom: 10px;height: 30px;margin-top: 8px");
        input1.setAttribute("ID", "qnaTitle");

        div2.appendChild(input1);
        div.appendChild(div2);

        var div3 = document.createElement("div");
        var input2 = document.createElement("input");
        input2.setAttribute("value", "Enter a Question...");
        input2.setAttribute("style", "width: 98%; height: 430px");
        input2.setAttribute("ID", "qnaContents");

        div3.appendChild(input2);
        div.appendChild(div3);

        var div4 = document.createElement("div");
        var btn = document.createElement("button");
        btn.setAttribute("style", "float:right; margin-top:10px; font-size:20px; margin-right:20px; background-color:#7ac3e6");
        btn.setAttribute("ID", "submitqna");
        btn.innerHTML = "Submit";
        
        div4.appendChild(btn);
        div.appendChild(div4);

        parent.appendChild(div);
    }

    function qnapost(){
        var parent = document.getElementById("contents");;
        var div = document.createElement("div");
        div.setAttribute("class", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "text-align:right; border-bottom:8px solid black; margin-left:20px; margin-right:20px; margin-bottom:-23px");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px; margin-right:50px");

        var text1 = document.createTextNode("QnA Board");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("style", "border-bottom: 4px solid black; display: flex; flex-direction: row; margin-left:20px;margin-right:20px;padding: -20px;");

        var text2 = document.createTextNode("Question No.1234");
        div2.appendChild(text2);

        div.appendChild(div2);

        parent.appendChild(div);
    }

    function clear(){
        var div = document.getElementById("bigdiv");
        var parent = document.getElementById("contents");
        if (div != null) parent.removeChild(div);
    }

    function resetmenu(){
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

    function reshape(filter_change = false){
        clear();
        resetmenu();
        selected_filter = $("#filter").val();
        if (current_state == "main"){
            var curr = document.getElementById("main");
            curr.setAttribute("style", "background-color: #4767ff; cursor:pointer");
            if (selected_filter == "BTS") idolmain();
            else main();
        }
        else if (current_state == "qna1"){
            qna1();
        }
        else if (current_state == "qna2"){
            if (filter_change){
                current_state = "qna1";
                reshape();
            }
            else qna2();
        }
        else if (current_state == "qnapost"){
            if (filter_change){
                current_state = "qna1";
                reshape();
            }
            else qnapost();
        }
    }

    filter.addEventListener("change", function(){
        reshape(true);
        });


    $('.question').click(function(){
        current_state = "qnapost";
        reshape();
    });

    $('#qna').click(function(){
        current_state = "qna1";
        reshape();
    });

    $('#contents').on("click", "#write_button", function(){
        current_state = "qna2";
        reshape();
    });

    $('#contents').on("click" , "#submitqna", function() {
        qnanum++;
        var title = document.getElementById("qnaTitle").value;
        var content = document.getElementById("qnaContents").value;
        var newqna = firebase.database().ref('/qna').push();
        var date = new Date().toLocaleDateString();
        newqna.set({
            no : qnanum,
            title: title,
            author : "김주호",
            answer: 0,
            date: date,
            content: content
        });
        current_state = "qna1";
        reshape();
    });

    reshape();
}); 