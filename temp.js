$( document ).ready(function() {
    function drawmain() {
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

        var target = document.getElementById("contents");
        target.appendChild(swipe);

        var swiper = new Swiper(".mySwiper", {
            pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            },
        });
        
        var myidol = document.createElement("div");
        myidol.setAttribute("style", "text-align:center;")

        var img1 = document.createElement("img");
        img1.setAttribute("src", "yuqi.PNG");
        img1.setAttribute("alt", "img1");
        img1.setAttribute("class", "photo");

        var img2 = document.createElement("img");
        img2.setAttribute("src", "yuqi.PNG");
        img2.setAttribute("alt", "img2");
        img2.setAttribute("class", "photo");

        var img3 = document.createElement("img");
        img3.setAttribute("src", "yuqi.PNG");
        img3.setAttribute("alt", "img3");
        img3.setAttribute("class", "photo");

        var btn = document.createElement("button");
        btn.setAttribute("style", "width:280px; height:200px; vertical-align:top; margin-top:20px; font-size:50px");
        var plus = document.createTextNode("+");
        btn.appendChild(plus);
        
        myidol.appendChild(img1);
        myidol.appendChild(img2);
        myidol.appendChild(img3);
        myidol.appendChild(btn);

        target.appendChild(myidol);
    }
    drawmain();
});