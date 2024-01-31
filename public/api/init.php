<?php
require "vendor/autoload.php";
use Ramsey\Uuid\Uuid;

// Configuration
$dataFolder = "/usr/webauthn";
$keyStorage = "$dataFolder/keys";
$logFile = "$dataFolder/logs/webauthn.log";


// If set to true, the user can register new keys
$allowRegistration = true;
// If set to true, the keyfile will be downloaded instead of put inside the keyStorage folder
// The file has to be put in the keyStorage folder manually
$downloadKeyFileOnly = false;

// RELYING PARTY - CHANGE TO YOUR OWN!
$rp = [
  "name" => "ServerBSD",
  "id" => "serverbsd.home" // SHOULD BE THE DOMAIN NAME OF THE SERVER
];

$nameSpace = "cb2cda1f-6764-411c-a2b6-5f3f5e397116"; // Needs to be a UUID

// Functions

session_start();
$WebAuthn = new lbuchs\WebAuthn\WebAuthn($rp["name"], $rp["id"]);

function getFileName(string $id): string {
  global $nameSpace;

  $uuid = Uuid::uuid5($nameSpace, $id);
  return "$uuid";
}

function getFileForUser(string $id): string {
  global $keyStorage;

  return "$keyStorage/" . getFileName($id);
}
