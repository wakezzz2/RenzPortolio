<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'clarenceemmanueljamora@gmail.com';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = "Portfolio Contact Form";
  $contact->from_email = "noreply@yourportfolio.com";
  $contact->subject = $_POST['subject'];

  // SMTP configuration for Gmail
  $contact->smtp = array(
    'host' => 'smtp.gmail.com',
    'username' => 'clarenceemmanueljamora@gmail.com',
    'password' => 'ywye ntev lmlb wqcg',
    'port' => '587',
    'encryption' => 'tls'
  );

  $contact->add_message($_POST['message'], 'Message');

  echo $contact->send();
?>
