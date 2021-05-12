$( document ).ready(function() {
    var filter = document.getElementById("filter");
    
    function drawmain() {
        var parent = document.getElementById("contents");
        var div0 = document.createElement("div");
        div0.setAttribute("class", "bigdiv");

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
    
    function drawidolmain(){
        var div = document.createElement("div");
        div.setAttribute("class", "bigdiv");

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
        //li1.setAttribute("style", "font-size:5px");
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
        div.setAttribute("class", "bigdiv");

        var div1 = document.createElement("div");
        div1.setAttribute("style", "width:75%; float:right");

        var strong1 = document.createElement("STRONG");
        strong1.setAttribute("style", "font-size:40px; float:right");

        var text1 = document.createTextNode("QnA Board");

        strong1.appendChild(text1);
        div1.appendChild(strong1);
        div.appendChild(div1);

        var div2 = document.createElement("div");
        div2.setAttribute("style", "border-bottom: 4px solid black; display: flex; flex-direction: row; margin-left:20px;margin-right:20px;padding: -20px;");

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

        parent.appendChild(div);


        //     <div style= "border-bottom: 4px solid black; display: flex; flex-direction: row; margin-left:20px;margin-right:20px;padding: -20px;">
        //         <h5 class="qnaheader" style="width: 10%">No.</h5>
        //         <h5 class="qnaheader" style="width: 40%">Title</h5>
        //         <h5 class="qnaheader" style="width: 25%">Author</h5>
        //         <h5 class="qnaheader" style="width: 10%">Answers</h5>
        //         <h5 class="qnaheader" style="width: 15%">Date</h5>
        //     </div>
        //     <div>
        //         <button style="float: right;margin-top: 10px;font-size: 20px;margin-right:20px; background-color: #7ac3e6;"  onclick="location.href='./qnawrite.html' ">Write</button>
        //     </div>
    }



    // function reshape(){
    //     var selected_filter = $("#filter").val();
    //     var div = document.getElementsByClassName("bigdiv")[0];
    //     var parent = document.getElementById("contents");
    //     if (div != null) parent.removeChild(div);

    //     if (selected_filter == "BTS") drawidolmain();
    //     else drawmain();
    // }

    // filter.addEventListener("change", function(){
    //     reshape();
    //     });

    // $('#qna').get(0).click()
    // reshape();
    
    qna1();
});