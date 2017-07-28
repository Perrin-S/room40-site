<?php
    $your_secret = "6Ler1yoUAAAAAGiiNtTKXaLm3NSwRLu6JbOJ_WcJ";
    $client_captcha_response = $_POST['g-recaptcha-response'];
    $user_ip = $_SERVER['REMOTE_ADDR'];

    $captcha_verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$your_secret&response=$client_captcha_response&remoteip=$user_ip");
    $captcha_verify_decoded = json_decode($captcha_verify);

    $name = $_POST['name'];
    $homeroom = $_POST['homeroom'];
    $song = $_POST['song'];
    $from = 'From: room40@room40radio.biz';
    $to = 'lynehamradio@gmail.com';
    $subject = "$name from $homeroom Requested $song";

    $body = "Name: $name \n Homeroom: $homeroom \nSong:\n$song";

    if ($song != '') {
        if ($homeroom != '') {
            if ($name != '') {
            if ($captcha_verify_decoded->success) {                 
                if (mail ($to, $subject, $body, $from)) { 
                    echo '<p>You have successfully submitted your song request</p>';
                } else { 
                    echo '<p>Something went wrong, go back and try again!</p><p><input type="button" value="Go Back" onclick="location.reload();" class="goback" /></p>'; 
                } 
            } else if (!$captcha_verify_decoded->success) {
                echo '<p>You answered the anti-spam question incorrectly!</p><p><input type="button" value="Go Back" onclick="location.reload();" class="goback" /></p>';
            }
        } else {
            echo '<p>You need to fill in all required fields!!</p><p><input type="button" value="Go Back" onclick="location.reload();" class="goback" /></p>';
        }
        } else {
            echo '<p>You need to fill in all required fields!!</p><p><input type="button" value="Go Back" onclick="location.reload();" class="goback" /></p>';
        }
        } else {
            echo '<p>You need to fill in all required fields!!</p><p><input type="button" value="Go Back" onclick="location.reload();" class="goback" /></p>';
        }
?>