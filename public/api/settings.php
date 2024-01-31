<?php
require "init.php";

switch ($_GET["setting"]) {
    case "allowRegistration":
        echo $allowRegistration;
        break;
    case "downloadKeyFileOnly":
        echo $downloadKeyFileOnly;
        break;
    default:
        http_response_code(400);
        echo "Invalid setting";
        break;
}