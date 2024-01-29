<?php
require "vendor/autoload.php";
use Ramsey\Uuid\Uuid;

// Configuration
$dataFolder = "/usr/webauthn";
$keyStorage = "$dataFolder/keys";

// RELYING PARTY - CHANGE TO YOUR OWN!
$rp = [
  "name" => "ServerBSD",
  "id" => "localhost" // SHOULD BE THE DOMAIN NAME OF THE SERVER
];

$nameSpace = "cb2cda1f-6764-411c-a2b6-5f3f5e397116"; // Needs to be a UUID

// Functions

session_start();
$WebAuthn = new lbuchs\WebAuthn\WebAuthn($rp["name"], $rp["id"]);

function getFileForUser(string $id): string {
  global $keyStorage;
  global $nameSpace;

  $uuid = Uuid::uuid5($nameSpace, $id);
  return "$keyStorage/$uuid";
}
