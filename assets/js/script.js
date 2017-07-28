$(document).ready(function () {

    var myVideo = document.getElementById("video1");

    function playPause() {
        if (myVideo.paused)
            myVideo.play();
        else
            myVideo.pause();
    }

    function makeBig() {
        myVideo.width = 560;
    }

    function makeSmall() {
        myVideo.width = 320;
    }

    function makeNormal() {
        myVideo.width = 420;
    }

    //Mouse click scroll
    $(document).ready(function () {
        $(".mouse").click(function () {
            $('html, body').animate({scrollTop: '+=750px'}, 1200);
        });
    });

    //Features appearance
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        //>=, not <=
        if (scroll >= 500) {
            $(".feature-icon").addClass("feature-display");
            $(".feature-head-text").addClass("feature-display");
            $(".feature-subtext").addClass("feature-display");
        }
    });

    //Subscribe to newsletter
    $('#email-form').on('submit', function (e) {
        e.preventDefault();


        $('#newsletter-spinner').css("display", "inline-block");

        var data = {
            email: $('#newsletter-email-input').val()
        }

        $.ajax({
            url: "/mailchimp.php",
            type: 'POST',
            data: data,
            success: function (data) {

                console.log(data);
                $('#newsletter-spinner').css("display", "none");
                $('#newsletter-loading-div').html("Success! Cool things are on their way")
                $('#newsletter-email-input').val("")

                window.location.href = '/nova.zip';
            },
            error: function (error) {
                console.log(error);
                $('#newsletter-spinner').fadeOut()
            }
        });
    })


//smooth scrolling

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


})





// Variable to hold request
var request;

// Bind to the submit event of our form
$("#form").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "/page.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        $( ".bluesection" ).html(response);
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

});