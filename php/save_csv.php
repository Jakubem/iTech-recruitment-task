<?php
/**
 * get browser name from UA string (https://php.net/manual/en/function.get-browser.php#101125)
 */
function get_browser_name($user_agent) {
    if (strpos($user_agent, 'Opera') || strpos($user_agent, 'OPR/')) return 'Opera';
    elseif (strpos($user_agent, 'Edge')) return 'Edge';
    elseif (strpos($user_agent, 'Chrome')) return 'Chrome';
    elseif (strpos($user_agent, 'Safari')) return 'Safari';
    elseif (strpos($user_agent, 'Firefox')) return 'Firefox';
    elseif (strpos($user_agent, 'MSIE') || strpos($user_agent, 'Trident/7')) return 'Internet Explorer';
    return 'Other';
}

$UA = get_browser_name($_SERVER['HTTP_USER_AGENT']);
$IP = $_SERVER['REMOTE_ADDR'];
$date = date('jS F Y h:i A');

// get result via post
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType === "application/json") {
    $content = trim(file_get_contents("php://input"));
    $result = json_decode($content, true);
}

$file = fopen("calculations.csv", "a");
$new_line = array($UA, $date, $result[result], $IP);

fputcsv($file, $new_line);
fclose($file);