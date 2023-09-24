<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// $to = "howelleric@yahoo.com"; // this is your Email address
		$to = "eric@howellstudio.com"; // this is your Email address
		$name = $_POST['name'];
		$email = $_POST['email']; // this is the sender's Email address
		$subject = "howellstudio Contact Form Mail from $name";
		$message = $_POST['message'];
		$silly = ($_POST['silly']!=="") ? $_POST['silly'] . " are the best donuts ever!" : "I do not like donuts and you are not funny.";
		$messageBody = "Name: $name\nEmail: $email\n\nWrote this message:\n$message\n\nP.S. $silly";
		// $messageBody = $name . " wrote the following:" . "\n\n" . $message . "\n\n" . $silly;

		// $headers = "From:" . $email;
		// $headers = "From: eric@howellstudio.com"; // authorized address to send from
		$headers = "From: $name <$email>";

		// Send the email
    if (mail($to, $subject, $messageBody, $headers, "-feric@howellstudio.com")) {
			// Form submitted successfully
				$response = ["success" => true, "message" => "Thank you for your message. We will get back to you soon!"];
		} else {
				// Email sending failed
				$response = ["success" => false, "message" => "Oops! Something went wrong. Please try again later."];
		}

		// Return the response as JSON
		header("Content-Type: application/json");
		echo json_encode($response);
		// You can also use header('Location: thank_you.php'); to redirect to another page.
		}else {
		// If the form wasn't submitted via POST, redirect or display an error message.
			echo "Oops - There was an error. Please try this again.";
		}
?>