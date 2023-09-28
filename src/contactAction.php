<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$hash = "Qwerty"; // Add a hash to form names to fight bots

	// Check the value of the "honeypot" radio button
	if (isset($_POST['email_honey']) && $_POST['email_honey'] == 1) {
		// Honeypot detected; let spammer think they got the message
		sleep(8);
		$response = ["success" => true, "message" => "Thank you for your message."];
		echo json_encode($response);
	} else {
		// Process the form
		$to = "eric@howellstudio.com"; // this is your Email address
		$name = $_POST['name' . $hash];
		$email = $_POST['email' . $hash];
		$subject = "howellstudio Contact Form Mail from $name";
		$message = $_POST['message' . $hash];
		$silly = ($_POST['silly'] !== "") ? $_POST['silly'] . " are the best donuts ever!" : "I do not like donuts and you are not funny.";
		$messageBody = "Name: $name\nEmail: $email\n\nWrote this message:\n$message\n\nP.S. $silly";

		$headers = "From: $name <$email>";

		// Send the email
		if (mail($to, $subject, $messageBody, $headers, "-feric@howellstudio.com")) {
				// Form submitted successfully
				$response = ["success" => true, "message" => "Thank you for your message. <br>We will get back to you soon!"];
		} else {
				// Email sending failed
				$response = ["success" => false, "message" => "Oops! Something went wrong. Please try again later."];
		}

		// Return the response as JSON
		header("Content-Type: application/json");
		echo json_encode($response);
	}
}
?>

