<?php

function is_valid_ajax_request() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if (is_valid_ajax_request()) {
  $ajax_request = true;
} else {
  $ajax_request = false;
}

if ( strtolower($_SERVER['REQUEST_METHOD']) !== 'post' || empty($_POST) ) {
  header("Location: index.php");
  exit();
} else if ( !isset($_POST['nonce']) ) {

  if ($ajax_request == true) {
    $return = array(
      "type" => "error",
      "message" => "Error: Invalid nonce. Please try again."
    );
    echo json_encode($return);
  } else {
    header("Location: index.php");
    exit();
  }
}


// Server side validation

$user_name = htmlspecialchars(trim($_POST['user_name']));
$user_email = trim($_POST['user_email']);
$user_message = htmlspecialchars($_POST['user_message']);

if (empty($user_email)) {

  if ($ajax_request == true) {
    $return = array(
      "type" => "error",
      "message" => "Error: Please include your email address."
    );
    echo json_encode($return);
  } else {
    echo "Error: Please include your email address.";
    exit();
  }

} else if (empty($user_message)) {

  if ($ajax_request == true) {
    $return = array(
      "type" => "error",
      "message" => "Error: Can't submit an empty message."
    );
    echo json_encode($return);
  } else {
    echo "Error: Can't submit an empty message.";
    exit();
  }

}

require_once 'config/nonce_secret.php';

//https://github.com/timostamm/NonceUtil-PHP
require_once 'includes/nonce-util.php';


$nonce = NonceUtil::check(NONCE_SECRET, $_POST['nonce']);

if (!$nonce) {

  if ($ajax_request == true) {
    $return = array(
      'type' => 'error',
      'message' => 'Error: invalid nonce. Please try again.'
    );
    echo json_encode($return);
  } else {
    header("Location: index.php");
    exit();
  }
}

// Set up mail
require_once 'includes/swiftmailer/lib/swift_required.php';

require_once 'config/smtp_secrets.php';

// Create the mail transport config
$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
  ->setUsername(SMTP_USERNAME)
  ->setPassword(SMTP_PASSWORD);

// Create the message
$message = Swift_Message::newInstance();
$message->setTo(array(
  "tim@timrourke.com" => "Tim Rourke"
));
$message->setSubject('New message from Turnip the Beet site!');
$message->setBody($user_message);
$message->setFrom($user_email, $user_name);

$mailer = Swift_Mailer::newInstance($transport);

$mailer->send($message, $failedRecipients);

if (!empty($failedRecipients)) {

  if ($ajax_request == true) {
    $return = array(
      "type" => "error",
      "message" => "Error: message failed to send to intended recipients."
    );
    echo json_encode($return);
  } else {
    echo "Error: message failed to send to intended recipients.";
    exit();
  }

} else {

  if ($ajax_request == true) {
    $return = array(
      "type" => "success",
      "message" => "Success! Your message was sent."
    );
    echo json_encode($return);
  } else {
    echo "Success! Your message was sent.";
    exit();
  }

}

?>
