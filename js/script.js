const { block, none, active } = {
    block: 'block',
    none: 'none',
    active: 'active'
}

$('.home-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 3,
    // centerPadding: '60px',
    // centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }
    ]
});


$('.menu-site-item h5').on('click', function (){
    // $('.menu-item-children').hide(500).children('.fa-chevron-down').css('transform', 'rotate(0)');
    const thisElem = $(this);
    const nextElement = thisElem.next('.menu-item-children');
    nextElement.toggle( function (){
        const elementStyle = $(this).css('display');
        if(elementStyle === block){
            thisElem.children('.fa-chevron-down').css('transform', 'rotate(-180deg)')
        } else {
            thisElem.children('.fa-chevron-down').css('transform', 'rotate(0)')
        }
    })
})


// $(window).on('scroll', function (){
//     console.log($(window).scrollTop())
// })

const navMobileIcon = $('.mobile-menu-block');

navMobileIcon.on('click', function (){
    $(this).toggleClass(active);
    checkMobileMenu()
});

$('.img-block').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
});


function checkMobileMenu(){
    const menuSite = $('.menu-site');
    if(navMobileIcon.hasClass(active)){
        menuSite.css('transform', 'translateX(0)')
    } else {
        menuSite.css('transform', 'translateX(-100%')
    }
}