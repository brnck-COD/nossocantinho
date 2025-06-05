document.body.classList.add('loaded');
document.addEventListener('DOMContentLoaded', function() {
    const welcomeSection = document.getElementById('welcome-section');
    const enterButton = document.getElementById('enter-button');
    const mainContent = document.getElementById('main-content');

    if (welcomeSection && enterButton && mainContent) {
        enterButton.addEventListener('click', function() {
            welcomeSection.style.opacity = '0';
            welcomeSection.style.pointerEvents = 'none'; // Desabilita cliques após o fade
            setTimeout(() => {
                welcomeSection.style.display = 'none'; // Esconde a seção de boas-vindas
                mainContent.style.display = 'block'; // Mostra o conteúdo principal
                document.body.classList.add('loaded'); // Adiciona a classe para as animações das seções principais
            }, 1000); // Tempo para a seção de boas-vindas desaparecer (ajuste conforme a animação)
        });
    } else if (mainContent) {
        // Se a seção de boas-vindas não for encontrada (ex: para testes diretos do main-content)
        // Isso fará com que o conteúdo principal apareça diretamente
        mainContent.style.display = 'block';
        document.body.classList.add('loaded');
    }

    // --- Carrossel de Fotos ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.style.opacity = 0;
        });
        slides[currentIndex].style.display = 'flex';
        setTimeout(() => {
            slides[currentIndex].style.opacity = 1;
        }, 50);
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    if (prevButton && nextButton && slides.length > 0) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
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
            title: '2 Much',
            artist: 'Justin Bieber',
            src: 'audio/Justin Bieber - 2 Much (Visualizer).mp3',
            albumArt: 'img/capaMsc.jpg'
        },
        {
            title: 'Momentos Felizes',
            artist: 'Nossa História',
            src: 'audio/Justin Bieber - 2 Much (Visualizer).mp3',
            albumArt: 'img/capaMsc.jpg'
        }
        // Adicione mais objetos de música aqui
    ];

    function loadSong(songIndex) {
        currentSongIndex = (songIndex + songs.length) % songs.length;
        const currentSong = songs[currentSongIndex];
        audio.src = currentSong.src;
        songTitleDisplay.textContent = currentSong.title;
        artistNameDisplay.textContent = currentSong.artist;
        albumArtDisplay.src = currentSong.albumArt || 'img/capaMsc.jpg';
        progressBar.value = 0;
        audio.removeEventListener('loadedmetadata', updateProgress);
        audio.addEventListener('loadedmetadata', updateProgress);
        if (isPlaying) {
            audio.play();
        }
    }

    function playPause() {
        if (isPlaying) {
            audio.pause();
            playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/></svg>';
        } else {
            audio.play();
            playPauseButton.innerHTML = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
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
        if (audio.duration) {
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            const progressPercent = (currentTime / duration) * 100;
            progressBar.value = progressPercent;
        }
    }

    function setProgress() {
        if (audio.duration) {
            const duration = audio.duration;
            const progress = progressBar.value;
            audio.currentTime = (progress / 100) * duration;
        }
    }

    function setVolume() {
        audio.volume = volumeControl.value / 100;
    }

    audio.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('input', setProgress);
    playPauseButton.addEventListener('click', playPause);
    nextTrackButton.addEventListener('click', nextTrack);
    prevTrackButton.addEventListener('click', prevTrack);
    volumeControl.addEventListener('input', setVolume);
    audio.addEventListener('ended', nextTrack);

    if (songs.length > 0) {
        loadSong(currentSongIndex);
    }

    // --- Corações Flutuantes ---
    const heartContainer = document.querySelector('.heart-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth - (size / 2);
        const startY = window.innerHeight;
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;

        heart.style.setProperty('--x-end', `${(Math.random() - 0.5) * 400}px`);
        heart.style.setProperty('--y-end', `-${window.innerHeight * (0.8 + Math.random() * 0.2)}px`);
        heart.style.setProperty('--scale-end', `${1 + Math.random() * 0.5}`);

        heartContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    setInterval(createHeart, 250);
});