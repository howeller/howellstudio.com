<?php 
if(isset($_POST['submit'])){
    $to = "eric@howellstudio.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    // $first_name = $_POST['first_name'];
    // $last_name = $_POST['last_name'];
    $subject = "Form submission";
    // $subject2 = "Copy of your form submission";
    $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];
    // $message = $first_name . " " . $last_name . " wrote the following:" . "\n\n" . $_POST['message'];
    // $message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];
    $headers = "From:" . $from;
    // $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    // mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $name . "! I will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>
/* 
if ($HTTP_POST_VARS['txtEmail']) {

		$bodytag = preg_replace("/\r\n|\n\r|\n|\r/", "\n", $HTTP_POST_VARS['txtMessage']);
		
		/* recipients */
		$recipient .= "eric@howellstudio.com";
		
		/* subject */
		$subject = $HTTP_POST_VARS['txtSubject'];
		
		/* message */
		$message = $bodytag . "\n";
		
		/* paste name and email together to create from variable */
		$from = $HTTP_POST_VARS['txtName'] . " " . "<" . $HTTP_POST_VARS['txtEmail'] . ">";
		
		/* headers, From cc's, bcc's, etc */
		$headers .= "From: $from\n";
				
		/* and now mail it */
		mail($recipient, $subject, $message, $headers);
		
		
		echo "Your mail has been sent.<br>";
} else {
	echo "Please go back to the email form.";
}
*/