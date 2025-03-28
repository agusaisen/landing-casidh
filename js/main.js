document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const bars = document.querySelectorAll('.bar');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');

        // Animate bars to form X
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        }
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

async function enviarFormulario(event) {
    event.preventDefault(); // Evitar recargar la página
    document.getElementById('btn_enviar').innerHTML = 'Enviando...';
    document.getElementById('btn_enviar').disabled = true;
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('send.php', { // Apunta al archivo PHP
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Mostrar mensaje de éxito o error
        const mensaje = document.getElementById('mensaje');
        if (data.success) {

            mensaje.textContent = "El mensaje ha sido enviado con éxito.";

            mensaje.style.color = 'green';
            form.reset(); // Limpiar el formulario si se envió correctamente
        } else {
            console.error('Error:', data.message);

            mensaje.textContent = "Ocurrió un error al enviar el mensaje.";

            mensaje.style.color = 'red';
        }
        document.getElementById('btn_enviar').innerHTML = 'Enviar';
        document.getElementById('btn_enviar').disabled = false;
    } catch (error) {
        console.error('Error:', error);
        const mensaje = document.getElementById('mensaje');

        mensaje.textContent = 'Ocurrió un error inesperado.';

        mensaje.style.color = 'red';
        document.getElementById('btn_enviar').innerHTML = 'Enviar';
        document.getElementById('btn_enviar').disabled = false;
    }
}