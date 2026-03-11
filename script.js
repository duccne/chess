const PASSWORD = "1503"; // Thay mật mã của bạn ở đây

function goToAuth() {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

function checkUnlock() {
    const input = document.getElementById('password-input').value;
    const music = document.getElementById('bg-music');
    if (input === PASSWORD) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
        music.play();
        startSurprise();
    } else {
        document.getElementById('error-msg').classList.remove('hidden');
    }
}

function startSurprise() {
    // 1. Hoa rơi (Giữ nguyên)
    setInterval(createFlower, 300);

    // 2. Pháo hoa (Giữ nguyên)
    setInterval(createFirework, 500);

    // 3. Ảnh chạy dọc (Giữ nguyên)
    setInterval(createScrollingPhoto, 2000);

    // 4. LỜI CHÚC DÀY ĐẶC CHẠY QUANH MÀN HÌNH
    // Cứ mỗi 400ms (0.4 giây) sẽ hiện 1 câu chúc mới -> Rất dày
    setInterval(createDenseWishes, 400); 
}
function createDenseWishes() {
    const wishes = [
        "Chúc chị luôn xinh đẹp! 🌸", "Yêu chị nhất trên đời! ❤️", 
        "Hạnh phúc nha chị yêu! ✨", "Mãi rạng rỡ như thế này nhé! 🥰",
        "Happy Birthday My Queen! 👑", "Em luôn ở đây bên chị! 🌹",
        "Chị là điều tuyệt vời nhất! 💖", "Tuổi mới thật rực rỡ nhé! 🌟",
        "Love You Forever! 👩‍❤️‍💋‍👨", "Cảm ơn chị đã đến! 💐"
    ];

    const colors = ['#ffeb3b', '#ff4081', '#00e676', '#00e5ff', '#ffffffff', '#ff9100'];
    
    const div = document.createElement('div');
    div.className = 'floating-wish';
    div.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    
    // Cài đặt vị trí và kiểu dáng ngẫu nhiên
    div.style.top = Math.random() * 90 + 5 + 'vh'; // Chạy khắp từ trên xuống dưới
    div.style.left = '-300px'; 
    div.style.color = colors[Math.floor(Math.random() * colors.length)];
    div.style.fontSize = Math.random() * 1 + 1.2 + 'rem'; // Kích thước to nhỏ khác nhau
    div.style.opacity = Math.random() * 0.5 + 0.5; // Độ đậm nhạt khác nhau
    
    document.body.appendChild(div);

    // Tốc độ bay ngẫu nhiên (từ 4 đến 8 giây) để tạo sự đan xen
    const duration = 4000 + Math.random() * 4000;

    div.animate([
        { left: '-300px' },
        { left: '110vw' }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => div.remove();
}

function createFlower() {
    const flowers = ['🌸', '🌺', '🌹', '✨', '💖'];
    const f = document.createElement('div');
    f.style.position = 'absolute';
    f.style.top = '-20px';
    f.style.left = Math.random() * 100 + 'vw';
    f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.fontSize = Math.random() * 15 + 20 + 'px';
    f.style.zIndex = '40';
    document.body.appendChild(f);

    f.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: 4000 + Math.random() * 3000 });
    setTimeout(() => f.remove(), 7000);
}

function createScrollingPhoto() {
    const img = document.createElement('img');
    img.src = 'anh-chi.jpg'; // <-- Tên file ảnh bạn tải lên GitHub
    img.className = 'scrolling-photo';
    img.style.left = Math.random() * 80 + 5 + 'vw';
    document.body.appendChild(img);

    img.animate([
        { top: '110vh', opacity: 0, transform: 'scale(0.5)' },
        { top: '50vh', opacity: 1, transform: 'scale(1)', offset: 0.5 },
        { top: '-20vh', opacity: 0, transform: 'scale(0.5)' }
    ], { duration: 7000, easing: 'ease-in-out' });
    setTimeout(() => img.remove(), 7100);
}

function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const colors = ['#ff4d4d', '#ffd700', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = '5px'; p.style.height = '5px';
        p.style.borderRadius = '50%';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = x + 'px'; p.style.top = y + 'px';
        document.body.appendChild(p);

        const angle = (Math.PI * 2 / 10) * i;
        const dist = 50 + Math.random() * 50;
        p.animate([
            { transform: 'translate(0,0)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`, opacity: 0 }
        ], { duration: 800 }).onfinish = () => p.remove();
    }
}
