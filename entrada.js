document.addEventListener('DOMContentLoaded', function() {
    // Adiciona a classe 'loaded' ao body para ativar as animações CSS
    document.body.classList.add('loaded');

    // --- Carrossel de Fotos ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showSlide(index) {
        // Garante que o índice esteja dentro dos limites válidos
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach(slide => slide.style.display = 'none');
        slides[currentIndex].style.display = 'flex'; // Use 'flex' para centralizar a imagem
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Para iniciar o carrossel na primeira imagem
    if (slides.length > 0) { // Garante que há slides antes de chamar showSlide
        showSlide(currentIndex);
    }


    // --- Player de Música ---
    const audio = document.getElementById('audio');
    const playPauseButton = document.querySelector('.play-pause');
    const prevTrackButton = document.querySelector('.prev-track');
    const nextTrackButton = document.querySelector('.next-track');
    const progressBar = document.getElementById('progress');
    const volumeControl = document.getElementById('volume');
    const songTitleDisplay = document.querySelector('.song-title');
    const artistNameDisplay = document.querySelector('.artist-name');
    const albumArtDisplay = document.querySelector('.album-art img');

    let isPlaying = false;
    let currentSongIndex = 0;
    const songs = [
        {
            title: 'Nosso Amor', // Exemplo de música
            artist: 'Você e Eu',
            src: 'audio/Justin Bieber - 2 Much (Visualizer).mp3', // Certifique-se de que este caminho está correto!
            albumArt: 'img/capaMsc.jpg'
        },
        {
            title: 'Momentos Felizes', // Exemplo de outra música
            artist: 'Nossa História',
            src: 'audio/Justin Bieber - 2 Much (Visualizer).mp3', // E este também!
            albumArt: 'img/capaMsc.jpg'
        }
        // Adicione mais objetos de música aqui, seguindo o mesmo formato
    ];

    function loadSong(songIndex) {
        // Garante que o índice esteja dentro dos limites válidos do array de músicas
        currentSongIndex = (songIndex + songs.length) % songs.length;
        const currentSong = songs[currentSongIndex];
        audio.src = currentSong.src;
        songTitleDisplay.textContent = currentSong.title;
        artistNameDisplay.textContent = currentSong.artist;
        albumArtDisplay.src = currentSong.albumArt || 'img/capaMsc.jpg';
        progressBar.value = 0;
        audio.removeEventListener('loadedmetadata', updateProgress); // Evita múltiplos listeners
        audio.addEventListener('loadedmetadata', updateProgress); // Adiciona para a nova música
        if (isPlaying) {
            audio.play();
        }
    }

    function playPause() {
        if (isPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/></svg>'; // Ícone de Play
        } else {
            audio.play();
            playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'; // Ícone de Pause
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        loadSong(currentSongIndex + 1);
    }

    function prevTrack() {
        loadSong(currentSongIndex - 1);
    }

    function updateProgress() {
        if (audio.duration) { // Garante que a duração do áudio está disponível
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            const progressPercent = (currentTime / duration) * 100;
            progressBar.value = progressPercent;
        }
    }

    function setProgress() {
        if (audio.duration) { // Garante que a duração do áudio está disponível
            const duration = audio.duration;
            const progress = progressBar.value;
            audio.currentTime = (progress / 100) * duration;
        }
    }

    function setVolume() {
        audio.volume = volumeControl.value / 100;
    }

    // Adiciona event listeners para o player
    audio.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('input', setProgress);
    playPauseButton.addEventListener('click', playPause);
    nextTrackButton.addEventListener('click', nextTrack);
    prevTrackButton.addEventListener('click', prevTrack);
    volumeControl.addEventListener('input', setVolume);
    audio.addEventListener('ended', nextTrack); // Reproduz a próxima música ao terminar

    // Carrega a primeira música ao iniciar a página
    if (songs.length > 0) { // Garante que há músicas antes de carregar
        loadSong(currentSongIndex);
    }
});