<?php
// Enquiry handler — sends via Zoho Mail over authenticated SMTP (PHPMailer).
// Front-end (contact.html) posts here and expects a JSON {ok:bool,error?:string}.

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Invalid request']);
    exit;
}

// Honeypot: bots fill this, humans don't
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]); // pretend success, send nothing
    exit;
}

$name        = trim($_POST['name'] ?? '');
$phone       = trim($_POST['phone'] ?? '');
$email        = trim($_POST['email'] ?? '');
$matter      = trim($_POST['matter'] ?? '');
$stage       = trim($_POST['stage'] ?? '');
$description = trim($_POST['description'] ?? '');

// Validate required fields
if ($name === '' || $email === '' || $matter === '' || $description === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill all required fields.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address.']);
    exit;
}

// ---- Load Zoho SMTP settings + PHPMailer -------------------
$cfg = require __DIR__ . '/mail-config.php';
require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

$subject = "New Enquiry: $matter";

$body  = "New enquiry submitted from the website:\n\n";
$body .= "Name:        $name\n";
$body .= "Phone:       $phone\n";
$body .= "Email:       $email\n";
$body .= "Matter:      $matter\n";
$body .= "Stage:       $stage\n";
$body .= "Description:\n$description\n";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $cfg['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['username'];
    $mail->Password   = $cfg['password'];
    $mail->SMTPSecure = ($cfg['encryption'] === 'tls')
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int) $cfg['port'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($cfg['from_email'], $cfg['from_name']);
    $mail->addAddress($cfg['to_email'], $cfg['to_name']);
    $mail->addReplyTo($email, $name); // hitting "Reply" answers the enquirer

    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    // Real reason is in $mail->ErrorInfo — logged for you, hidden from visitors
    error_log('send-enquiry Zoho SMTP error: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send. Please try again.']);
}
