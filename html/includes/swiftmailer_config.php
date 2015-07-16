<?php

require_once '../includes/swiftmailer/lib/swift_required.php';

// Create the mail transport config
$transport = Swift_MailTransport::newInstance();

// Create the message
$message = Swift_Message::newInstance();
$message->setTo(array(
  "tim@timrourke.com" => "Tim Rourke"
));
$message->setSubject("This is a test email from Swift Mailer");
$message->setBody("Test message body.");
$message->setFrom("tim@timrourke.com", "Tim Rourke");

$mailer = Swift_Mailer::newInstance($transport);
$mailer->send($message);

?>
