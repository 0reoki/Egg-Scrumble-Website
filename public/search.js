$(document).ready(function() {
    $(window).click(function() {
        // hide sidebar
        document.getElementById("searchHistory").style.visibility = "hidden";
        document.getElementById("searchHistory").style.display = "none";
    });

    $('#searchBar').on('click', function() {
        // open sidebar
        event.stopPropagation();
        document.getElementById("searchHistory").style.visibility = "visible";
        document.getElementById("searchHistory").style.display = "inherit";
    });

    $("#searchHistory").on('click', function() {
        event.stopPropagation();
    });
    
});

