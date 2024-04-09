<?php

include('database.php');

if (isset($_POST['title'])) {
  $task_name = $_POST['title'];
  $task_description = $_POST['content'];
  $query = "INSERT into task(title, content) VALUES ('$task_name', '$task_description')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }

  echo "Task Added Successfully";
}
