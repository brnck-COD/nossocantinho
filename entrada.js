document.getElementById('enterButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redireciona para a página principal
});
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[(index + slides.length) % slides.length].style.display = 'block';
    }

    function nextSlide() {
        currentIndex++;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        showSlide(currentIndex);
    }

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Para iniciar o carrossel na primeira imagem
    showSlide(currentIndex);
});