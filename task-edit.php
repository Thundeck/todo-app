<?php

include('database.php');

if (isset($_POST['id'])) {
  $task_name = $_POST['title'];
  $task_description = $_POST['content'];
  $id = $_POST['id'];
  $query = "UPDATE task SET title = '$task_name', content = '$task_description' WHERE id = '$id'";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Query Failed.');
  }
  echo "Task Update Successfully";
}
