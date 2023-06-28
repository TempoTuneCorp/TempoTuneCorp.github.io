<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
//  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "rasmus.munk01@gmail.com";
  $subject = "New Form Submission";
  $body = "Name: $name\n$message";



  mail($to, $subject, $body);


  //header("Location: thank_you.html");
  exit();
}
?>
