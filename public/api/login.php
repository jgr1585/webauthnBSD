<?php
// (A) INIT & CHECK
require "init.php";
 
switch ($_POST["phase"]) {
  // (B) VALIDATION PART 1 - GET ARGUMENTS
  case "a":
    $args = $WebAuthn->getGetArgs([], 30);
    $_SESSION["challenge"] = ($WebAuthn->getChallenge())->getBinaryString();
    echo json_encode($args);
    break;
 
  // (C) VALIDATION PART 2 - CHECKS & PROCESS
  case "b":
    $id = $_POST["id"];
    $saved = unserialize(file_get_contents(getFileForUser($id)));
    if ($saved->credentialId !== $id) { exit("Invalid credentials"); }
    try {
      $WebAuthn->processGet(
        base64_decode($_POST["client"]),
        base64_decode($_POST["auth"]),
        base64_decode($_POST["sig"]),
        $saved->credentialPublicKey,
        $_SESSION["challenge"]
      );
      echo "OK";
      // DO WHATEVER IS REQUIRED AFTER VALIDATION
    } catch (Exception $ex) { echo "ERROR - "; print_r($ex); }
    break;
}
