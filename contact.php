<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log the request method and POST data
error_log("Request Method: " . $_SERVER["REQUEST_METHOD"]);
error_log("POST Data: " . print_r($_POST, true));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Log the sanitized inputs
    error_log("Sanitized inputs - Name: $name, Email: $email, Message: $message");
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("Invalid email format: $email");
        header("Location: contact.html?message=invalid_email"); // Changed from index.html
        exit();
    }
    
    // Check if required fields are empty
    if (empty($name) || empty($email) || empty($message)) {
        error_log("Empty fields detected");
        header("Location: contact.html?message=empty_fields"); // Changed from index.html
        exit();
    }
    
    $to = "mussazulfikar9@gmail.com";
    $subject = "New Contact Form Submission";
    
    // Create email content with proper formatting
    $email_content = "Name: " . htmlspecialchars($name) . "\r\n";
    $email_content .= "Email: " . htmlspecialchars($email) . "\r\n\r\n";
    $email_content .= "Message:\r\n" . htmlspecialchars($message) . "\r\n";
    
    // Proper email headers
    $headers = array(
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8'
    );
    
    error_log("Attempting to send email...");
    
    // Try to send email and handle the result
    try {
        $mail_sent = mail($to, $subject, $email_content, implode("\r\n", $headers));
        
        error_log("Mail attempt result: " . ($mail_sent ? "Success" : "Failed"));
        
        if ($mail_sent) {
            header("Location: contact.html?message=success"); // Changed from index.html
        } else {
            $error = error_get_last();
            error_log("Mail error: " . ($error ? $error['message'] : 'Unknown error'));
            header("Location: contact.html?message=error"); // Changed from index.html
        }
    } catch (Exception $e) {
        error_log("Mail exception: " . $e->getMessage());
        header("Location: contact.html?message=error"); // Changed from index.html
    }
    
    exit();
}
?>