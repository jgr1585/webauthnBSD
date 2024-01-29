<?php
// (A) INIT & CHECK
require "init.php";
use Ramsey\Uuid\Uuid;
 
switch ($_POST["phase"]) {
  // (B) REGISTRATION PART 1 - GET ARGUMENTS
  case "a":
    $args = $WebAuthn->getCreateArgs(
      Uuid::uuid4(), $_POST["username"], $_POST["displayName"],
      30, false, true
    );
    $_SESSION["challenge"] = ($WebAuthn->getChallenge())->getBinaryString();
    echo json_encode($args);
    break;
 
  // (C) REGISTRATION PART 2 - SAVE USER CREDENTIAL
  // should be saved in database, but we save into a file instead
  case "b":
    // (C1) VALIDATE & PROCESS
    try {
      $data = $WebAuthn->processCreate(
        base64_decode($_POST["client"]),
        base64_decode($_POST["attest"]),
        $_SESSION["challenge"],
        true, true, false
      );
    } catch (Exception $ex) { exit("ERROR - "); print_r($ex); }
 
    // (C2) SAVE
    file_put_contents(getFileForUser($_POST["id"]), serialize($data));
    echo "OK";
    break;
}
