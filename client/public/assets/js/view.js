// expand all collapsible items
function expandAll() {
    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({accordion: false});
    console.log(`expanding`);
}


// collapse all collapsible items
function collapseAll() {
    $(".collapsible-header").removeClass(function() {
        return "active";
    });
    $(".collapsible").collapsible({accordion: true});
    $(".collapsible").collapsible({accordion: false});
}

let dt;
function drawCallback() {
    console.log(`table was drawn`);
}



// document load
$(document).ready(function() {
    console.log(`> loading view controller...`);

    // expand collections
    setTimeout(expandAll, 1000);

    // scrollY: 300,    // size of the table in pixels
    // paging: false,   // don't do pagination
    dt = $('#data-table-transactions').DataTable({
        drawCallback: drawCallback,
        paging: true,
        lengthChange: false,
        pageLength: 10
    })
});
