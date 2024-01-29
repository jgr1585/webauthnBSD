<?php
require "vendor/autoload.php";
use Ramsey\Uuid\Uuid;

// Configuration
$dataFolder = "files";

// RELYING PARTY - CHANGE TO YOUR OWN!
$rp = [
  "name" => "ServerBSD",
  "id" => "localhost" // SHOULD BE THE DOMAIN NAME OF THE SERVER
];

$nameSpace = "cb2cda1f-6764-411c-a2b6-5f3f5e397116"; // Needs to be a UUID

// Functions
if (!file_exists($dataFolder)) {
  mkdir($dataFolder);
}

session_start();
$WebAuthn = new lbuchs\WebAuthn\WebAuthn($rp["name"], $rp["id"]);

function getFileForUser(string $id): string {
  global $dataFolder;
  global $nameSpace;

  $uuid = Uuid::uuid5($NameSpace, $id);
  return "$dataFolder/$uuid.bin";
}
