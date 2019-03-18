/*
 * Author: vi.ly
 * Created Date: 2018/08/05
 * Reference: https://stackoverflow.com/questions/18602331/why-is-this-jquery-click-function-not-working
 * I found the best solution for this problem by using ON with $(document).
 *      $(document).on('click', '#yourid', function() { alert("hello"); });
 * for id start with see below:
 *      $(document).on('click', 'div[id^="start"]', function() { alert ('hello'); });
*/

// --------- Click into toggle-sidebar-collapse for sidebar hide left or hide right --------



$(document).on('click', '.toggle-sidebar-collapse', function () {


    if ($(window).width() < 992) {

        console.log($(window).width());
        // use float sidebar
        if (!$('.left-sidebar').hasClass('sidebar-float-active')) {
            $('.left-sidebar').addClass('sidebar-float-active');
        } else {
            $('.left-sidebar').removeClass('sidebar-float-active');
        }
    } else {
        // use collapsed sidebar
        if (!$('.left-sidebar').hasClass('sidebar-hide-left')) {
            $('.left-sidebar').addClass('sidebar-hide-left');
            $('.content-wrapper').addClass('expanded-full');
        } else {
            $('.left-sidebar').removeClass('sidebar-hide-left');
            $('.content-wrapper').removeClass('expanded-full');
        }
    }
});

$(document).on('click', '.js-toggle-minified', function () {
    // checking for minified left sidebar
    checkMinified();

    $('.js-toggle-minified').on('click', function () {
        if (!$('.left-sidebar').hasClass('minified')) {
            $('.left-sidebar').addClass('minified');
            $('.content-wrapper').addClass('expanded');

        } else {
            $('.left-sidebar').removeClass('minified');
            $('.content-wrapper').removeClass('expanded');
        }

        checkMinified();
    });


    function checkMinified() {
        if (!$('.left-sidebar').hasClass('minified')) {
            setTimeout(function () {

                $('.left-sidebar .sub-menu.open')
                    .css('display', 'block')
                    .css('overflow', 'visible')
                    .siblings('.js-sub-menu-toggle').find('.toggle-icon').removeClass('fa-angle-left').addClass('fa-angle-down');
            }, 200);

            $('.main-menu > li > a > .text').animate({
                opacity: 1
            }, 1000);

        } else {
            $('.left-sidebar .sub-menu.open')
                .css('display', 'none')
                .css('overflow', 'hidden');

            $('.main-menu > li > a > .text').animate({
                opacity: 0
            }, 200);
        }
    }

});


// -------- Click into menu-toggle | main menu => hide --------
$(document).on('click', '.main-menu .js-sub-menu-toggle', function () {
    console.log("clicked: ");

    $li = $(this).parent('li');
    if (!$li.hasClass('active')) {
        $li.find(' > a .toggle-icon').removeClass('fa-angle-left').addClass('fa-angle-down');
        $li.addClass('active');
        $li.find('ul.sub-menu')
            .slideDown(300);
    }
    else {
        $li.find(' > a .toggle-icon').removeClass('fa-angle-down').addClass('fa-angle-left');
        $li.removeClass('active');
        $li.find('ul.sub-menu')
            .slideUp(300);
    }
});


$(document).ready(function () {
    console.log("Loading acs-advance.js ....... succeed!!!");
    console.log("Loading acs-advance.js ....... finished~~~");

    $(window).bind("load resize", determineSidebar);

    function determineSidebar() {
        if ($(window).width() < 992) {
            $('body').addClass('sidebar-float');    // add this for minimize

        } else {
            $('body').removeClass('sidebar-float');
        }
    }




    //*******************************************
    /*	WIDGET SLIM SCROLL
    /********************************************/

    //if ($('.widget-scrolling').length > 0) {

    //    console.log(".widget-scrolling.length > 0");
    //    $('.widget-scrolling .widget-content').slimScroll({
    //        height: '410px',
    //        wheelStep: 5,
    //    });
    //}


    // slimscroll left navigation
    if ($('body.sidebar-fixed').length > 0) {


        console.log("sidebar-fixed.length > 0 - v2.0");

        $('body.sidebar-fixed .sidebar-scroll').slimScroll({
            height: '20%',
            wheelStep: 5,
            color: '#00f',
            alwaysVisible: true
        });

        $('.sidebar-scroll').slimscroll();
    }



});




