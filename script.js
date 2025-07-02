document.addEventListener("DOMContentLoaded", () => {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Parallax Effect for Home Section ---
    const homeSection = document.getElementById('home');
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            homeSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; // Adjust speed (0.3)
        });
    }

    // --- Romantic Message Randomizer ---
    const kataArray = [
        "Kamu adalah alasan aku tersenyum lebih lebar, bercanda lebih keras, dan mencintai lebih dalam.",
        "Setiap detik yang kita habiskan bersama adalah anugerah. Terima kasih telah membuat hidupku sempurna.",
        "Cinta ini adalah perjalanan, dan aku beruntung bisa berjalan bersamamu.",
        "Bersamamu adalah perjalanan indah yang tak ingin kuakhiri. Happy Anniversary, sayang!",
        "Di setiap langkah kita, aku semakin yakin kamu adalah bagian terbaik dalam hidupku. Selamat Ulang Tahun Cinta!",
        "Kamu adalah melodi terindah dalam simfoni hidupku, tak pernah bosan kudengarkan.",
        "Setiap hari bersamamu adalah lembaran baru yang ingin kubaca berulang kali.",
        "Dulu aku bertanya-tanya, apa arti cinta sejati. Lalu aku bertemu denganmu.",
        "Kaulah bintang yang selalu menuntunku pulang, bahkan dalam kegelapan sekalipun.",
        "Kamu bau ketek.",
        "Selamat Anniversary, belahan jiwaku. Semoga kisah kita tak lekang oleh waktu."
    ];

    const kataElem = document.getElementById("kata");
    const randomButton = document.getElementById("randomButton");

    function tampilkanKata() {
        kataElem.style.opacity = 0;
        kataElem.style.transition = "none";

        setTimeout(() => {
            const randomKata = kataArray[Math.floor(Math.random() * kataArray.length)];
            kataElem.textContent = randomKata;
            kataElem.style.transition = "opacity 0.8s ease-in-out";
            kataElem.style.opacity = 1;
        }, 50);
    }

    if (randomButton) {
        randomButton.addEventListener("click", tampilkanKata);
        tampilkanKata(); // Tampilkan pesan pertama kali saat halaman dimuat
    }

    // --- Photo Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightboxButton = document.getElementById('closeLightbox');
    const prevImageButton = document.getElementById('prevImage');
    const nextImageButton = document.getElementById('nextImage');
    const galleryItems = document.querySelectorAll('.photo-gallery-item');

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-full-img'),
        caption: item.getAttribute('data-caption')
    }));

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox(currentImageIndex);
        });
    });

    closeLightboxButton.addEventListener('click', hideLightbox);
    prevImageButton.addEventListener('click', showPreviousImage);
    nextImageButton.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            hideLightbox();
        }
    });

    function showLightbox(index) {
        lightboxImage.src = images[index].src;
        lightboxCaption.textContent = images[index].caption;
        lightbox.classList.remove('hidden');
    }

    function hideLightbox() {
        lightbox.classList.add('hidden');
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightbox(currentImageIndex);
    }

    // --- Heart Falling Animation ---
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️'; // Unicode heart symbol
        document.body.appendChild(heart);

        // Debugging logs:
        // console.log("Heart created:", heart);
        // console.log("Computed style before animation:", getComputedStyle(heart).position, getComputedStyle(heart).zIndex);

        // Pastikan properti posisi disetel secara langsung di sini
        // Ini adalah perubahan penting!
        heart.style.position = 'fixed'; // Pastikan fixed
        heart.style.zIndex = '9999';   // Pastikan z-index tinggi
        heart.style.top = `${-50 + Math.random() * -100}px`; // Mulai dari posisi negatif acak di atas layar
        heart.style.left = Math.random() * window.innerWidth + 'px'; // Posisi horizontal acak

        // Atur durasi dan delay animasi
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4-7 seconds
        heart.style.animationDelay = (Math.random() * 2) + 's'; // 0-2 seconds delay
        heart.style.animationName = 'heartFall'; // Pastikan nama animasi diterapkan

        // Remove heart after animation ends to prevent memory leak
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    };

    // Create hearts periodically
    setInterval(createHeart, 1000); // Create a new heart every 300ms

    // --- Optional: Audio Control ---
    // (Kode ini tetap tidak berubah dari sebelumnya)
    /*
    const audio = document.getElementById('backgroundAudio');
    const toggleAudioButton = document.getElementById('toggleAudio');
    const audioIcon = document.getElementById('audioIcon');
    let isPlaying = false; // Initially not playing

    if (audio) {
        audio.volume = 0.4; // Adjust as needed
    }

    if (toggleAudioButton) {
        toggleAudioButton.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                audioIcon.textContent = '🔇';
            } else {
                audio.play();
                audioIcon.textContent = '🎵';
            }
            isPlaying = !isPlaying;
        });
    }

    document.body.addEventListener('click', function setupAudio() {
        if (audio && audio.paused) {
            audio.play().then(() => {
                isPlaying = true;
                audioIcon.textContent = '🎵';
            }).catch(e => {
                console.log("Autoplay blocked, user interaction needed:", e);
                audioIcon.textContent = '🔇'; 
            });
        }
        document.body.removeEventListener('click', setupAudio);
    });
    */
});