$(document).ready(function() {
   
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss').on('click', function() {
        // hide sidebar
        $('#sidebar').removeClass('active');
        $('#sidebar.collapse.in').toggleClass('in');
    });

    $(window).click(function() {
        // hide sidebar
        $('#sidebar').removeClass('active');
        $('#sidebar.collapse.in').toggleClass('in');
    });

    $('#sidebarCollapse').on('click', function() {
        // open sidebar
        event.stopPropagation();
        $('#sidebar').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $("#sidebar").on('click', function() {
        event.stopPropagation();
    });

    $("a").click(function() {
        var linkFromDropdown = $(this).attr("href");
        $(linkFromDropdown).toggle();
    });
});
