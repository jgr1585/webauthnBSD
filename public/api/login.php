<?php
// (A) INIT & CHECK
require "init.php";
 
switch ($_POST["phase"]) {
  // (B) VALIDATION PART 1 - GET ARGUMENTS
  case "a":
    $args = $WebAuthn->getGetArgs([], 30, true, true);
    $_SESSION["challenge"] = ($WebAuthn->getChallenge())->getBinaryString();
    echo json_encode($args);
    break;
 
  // (C) VALIDATION PART 2 - CHECKS & PROCESS
  case "b":
    $id = $_POST["id"];
    $file = getFileForUser($id);
    if (!file_exists($file)) { exit("Invalid credentials"); }
    $saved = unserialize(file_get_contents($file));
    if ($saved->credentialId !== base64_decode($id)) { exit("Invalid credentials"); }
    
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

      $ip = $_SERVER['REMOTE_ADDR'];
      $timestamp = date('Y-m-d\TH:i:s.Z\Z', time());

      $openLogFile = fopen($logFile, "a");
      fwrite($openLogFile, "$timestamp;$ip;1\n");
      fclose($openLogFile);


    } catch (Exception $ex) { echo "ERROR - "; print_r($ex); }
    break;
}
