const CORRECT_PASSWORD = "123"; // <-- THAY MẬT MÃ CỦA BẠN VÀO ĐÂY

function showPasswordInput() {
    document.getElementById('gift-container').classList.add('hidden');
    document.getElementById('password-screen').classList.remove('hidden');
}

function checkPassword() {
    const input = document.getElementById('password-input').value;
    if (input === CORRECT_PASSWORD) {
        startCelebration();
    } else {
        document.getElementById('error-msg').classList.remove('hidden');
    }
}

function startCelebration() {
    document.getElementById('password-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    
    // 1. Tạo pháo hoa (giả lập đơn giản)
    setInterval(createFirework, 500);
    
    // 2. Tạo lời chúc chạy quanh màn hình
    const wishes = [
        "Chúc chị mãi xinh đẹp! 🌸",
        "Yêu chị nhất trên đời! ❤️",
        "Tuổi mới rực rỡ nhé chị yêu! ✨",
        "Hạnh phúc bên em mãi nhé! 🥰",
        "Món quà lớn nhất của em là chị! 🎁"
    ];

    setInterval(() => {
        const wish = wishes[Math.floor(Math.random() * wishes.length)];
        createFloatingText(wish);
    }, 800);
}

function createFloatingText(text) {
    const div = document.createElement('div');
    div.className = 'floating-wish';
    div.innerText = text;
    div.style.top = Math.random() * 80 + 10 + 'vh';
    div.style.left = '-200px';
    document.body.appendChild(div);

    const duration = 5000 + Math.random() * 3000;
    div.animate([
        { left: '-250px' },
        { left: '110vw' }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => div.remove();
}

function createFirework() {
    const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#ffffff'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = '5px';
        p.style.height = '5px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        document.body.appendChild(p);

        const angle = (Math.PI * 2 / 15) * i;
        const velocity = 50 + Math.random() * 50;
        
        p.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => p.remove();
    }
}
