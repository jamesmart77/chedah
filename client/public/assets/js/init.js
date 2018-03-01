// materialize initialization module

// document start
(function($) {
    $(function() {


        console.log(`> initializing Materialize...`);

        //Dropdowns
        $('select').material_select();

        //Modal Dialog for profile page
        // the 'href' attribute of the modal trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();

        //Modal Dialog Date Picker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 100,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
        });

        // user slide out menu
        $('.user-side-collapse').sideNav({
          menuWidth: 300,
          edge: 'right',
        });

        // initialize text fields
        Materialize.updateTextFields();
        $('select').material_select();


        $('.slider').slider({
            full_width: true
        });

        // dropdown menu positioning
        $('.dropdown-button').dropdown({
            hover: true,
            // gutter:100,         // push menu to the left
            belowOrigin: true,
            alignment: 'right',
            constrainWidth: false // don't force a fixed width
        });


        $('.gig-frequency').dropdown({
            hover: false,
            // gutter:100,         // push menu to the left
            belowOrigin: true,
            alignment: 'right',
            constrainWidth: false // don't force a fixed width
        });

        // dropdown items color
        $('.dropdown-content>li>a').css('color', '#666');

        // mobile side main menu
        $('.button-collapse').sideNav('hide');
        $('.button-collapse').sideNav({
            menuWidth: 300,
            edge: 'left',
        });

        $('ul.tabs').tabs();
        $('.materialboxed').materialbox();


        $('.chips').material_chip();
        $('.chips-initial').material_chip({
            data: [{
                tag: 'Apple',
            }, {
                tag: 'Microsoft',
            }, {
                tag: 'Google',
            }],
        });

        $('.chips-placeholder').material_chip({
            placeholder: 'Enter a tag',
            secondaryPlaceholder: '+Tag',
        });

        $('.chips-autocomplete').material_chip({
            autocompleteOptions: {
                data: {
                    'Apple': null,
                    'Microsoft': null,
                    'Google': null
                },
                limit: Infinity,
                minLength: 1
            }
        });

        $('.fixed-action-btn').floatingActionButton({
            toolbarEnabled: true
        });

    }); // end of document ready
})(jQuery); // end of jQuery namepace
