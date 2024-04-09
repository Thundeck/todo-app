<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$connection = mysqli_connect(
  $_ENV["HOST"],
  $_ENV["USER"],
  $_ENV["PASSWORD"],
  $_ENV["DB"]
);
