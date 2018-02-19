function expandAll() {
    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({accordion: false});
}

function collapseAll() {
    $(".collapsible-header").removeClass(function() {
        return "active";
    });
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
}

// document load
$(document).ready(function() {
    console.log(`> loading view controller...`);

});
