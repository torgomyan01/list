const {block, none} = {
    block: 'block',
    none: 'none'
}

$('.home-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    centerPadding: '60px',
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
});


$('.menu-site-item h4').on('click', function (){
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