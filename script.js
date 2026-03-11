const PASSWORD = "123"; // <-- Thay mật mã của bạn ở đây

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
    // 1. Hoa rơi
    setInterval(createFlower, 300);

    // 2. Pháo hoa
    setInterval(createFirework, 500);

    // 3. Ảnh chạy dọc từ dưới lên trên
    setInterval(createScrollingPhoto, 2500);

    // 4. LỜI CHÚC DÀY ĐẶC CHẠY QUANH MÀN HÌNH
    setInterval(createDenseWishes, 400); // 1 giây hiện 2.5 câu chúc -> Dày đặc
}

function createDenseWishes() {
    const wishes = ["Yêu chị nhất! ❤️", "Xinh đẹp mãi nhé! 🌸", "Hạnh phúc nha chị yêu! ✨", "Tuổi mới rực rỡ! 🥰", "Happy Birthday Queen! 👑", "Em luôn ở đây bên chị! 🌹", "Chị là tuyệt vời nhất! 💖", "Mãi rạng rỡ nha! 🌟", "Cảm ơn chị đã đến! 💐", "Love You Forever! 👩‍❤️‍💋‍👨"];
    const colors = ['#ffeb3b', '#ff4081', '#00e676', '#00e5ff', '#ffffffff', '#ff9100'];
    const div = document.createElement('div');
    div.className = 'floating-wish';
    div.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    div.style.top = Math.random() * 90 + 5 + 'vh'; // Phủ kín từ đỉnh đến đáy
    div.style.left = '-300px'; 
    div.style.color = colors[Math.floor(Math.random() * colors.length)];
    div.style.fontSize = Math.random() * 0.8 + 1 + 'rem'; // Kích thước khác nhau
    div.style.opacity = Math.random() * 0.5 + 0.5; // Độ đậm nhạt khác nhau
    document.body.appendChild(div);

    // Thời gian bay đan xen nhanh chậm (từ 4 đến 8 giây)
    const duration = 4000 + Math.random() * 4000;
    div.animate([{ left: '-300px' }, { left: '110vw' }], { duration: duration, easing: 'linear' }).onfinish = () => div.remove();
}

function createFlower() {
    const flowers = ['🌸', '🌺', '🌹', '✨', '💖'];
    const f = document.createElement('div');
    f.style.position = 'absolute'; f.style.top = '-20px'; f.style.left = Math.random() * 100 + 'vw';
    f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.fontSize = Math.random() * 15 + 20 + 'px'; f.style.zIndex = '40';
    document.body.appendChild(f);
    f.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }], { duration: 4000 + Math.random() * 3000 });
    setTimeout(() => f.remove(), 7000);
}

function createScrollingPhoto() {
    const img = document.createElement('img');
    img.src = 'anh-chi.jpg'; // <-- Tên file ảnh của chị
    img.className = 'scrolling-photo';
    img.style.left = Math.random() * 80 + 10 + 'vw';
    document.body.appendChild(img);
    img.animate([{ top: '110vh', opacity: 0 }, { top: '50vh', opacity: 1, offset: 0.5 }, { top: '-20vh', opacity: 0 }], { duration: 7000, easing: 'ease-in-out' });
    setTimeout(() => img.remove(), 7100);
}

function createFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const colors = ['#ff4d4d', '#ffd700', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute'; p.style.width = '6px'; p.style.height = '6px'; p.style.borderRadius = '50%';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = x + 'px'; p.style.top = y + 'px';
        document.body.appendChild(p);
        const angle = (Math.PI * 2 / 10) * i; const dist = 60 + Math.random() * 40;
        p.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`, opacity: 0 }], { duration: 1000 }).onfinish = () => p.remove();
    }
}
