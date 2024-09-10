const skipElement=document.getElementById("skip");
skipElement.addEventListener('click',() =>{
    window.location.href = '../authentication/doc-pat.html';
    
})


let redirectTimeout; 

new Swiper('.img-slice', {
    spaceBetween: 30,
    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

   
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    on: {
        slideChange: function () {

            if (redirectTimeout) {
                clearTimeout(redirectTimeout);
            }


            if (this.isEnd) {

                redirectTimeout = setTimeout(function () {
                    window.location.href = '../authentication/doc-pat.html';
                 
                }, 3000);
            }
        }
    }
});
