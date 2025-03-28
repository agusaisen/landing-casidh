<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Ruta al autoload de Composer
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['message']);
    $asunto = htmlspecialchars($_POST['subject']);

    // Configuración del correo
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587; // or 587
        $mail->IsHTML(true);
        $mail->Username = 'mailercasi@gmail.com'; // Tu correo para autenticación SMTP
        $mail->Password = 'zfgc wzzb albo wfdg'; // Contraseña de tu correo
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // Configuración del remitente y destinatario
        $mail->setFrom('noreply@casidh.com.ar', 'CASI DH'); // Usa el correo del usuario como remitente
        $mail->addAddress('info@casidh.com.ar', 'CASI DH'); // Correo destinatario

        // Contenido del correo
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = "
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Correo:</strong> $email</p>
        <p><strong>Mensaje:</strong></p>
        <p>$mensaje</p>
    ";
        $mail->AltBody = "Nombre: $nombre\nCorreo: $email\nMensaje:\n$mensaje";
        $headers = "From: Sender\n";
        $headers .= 'Content-Type:text/calendar; Content-Disposition: inline; charset=utf-8;\r\n';
        $headers .= "Content-Type: text/plain;charset=\"utf-8\"\r\n"; #EDIT: TYPO
        // Enviar el correo
        $mail->send();
        $response['success'] = true;
        $response['message'] = 'El mensaje fue enviado correctamente.';
    } catch (Exception $e) {
        $response['message'] = "Error al enviar el correo: {$mail->ErrorInfo}";
    }
    // Respuesta JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

?>