<?php
$w = stream_get_wrappers();
echo 'openssl: ',  extension_loaded  ('openssl') ? 'yes':'no', "<br>";
echo 'http wrapper: ', in_array('http', $w) ? 'yes':'no', "<br>";
echo 'https wrapper: ', in_array('https', $w) ? 'yes':'no', "<br>";
echo 'wrappers: ', var_export($w);

phpinfo();