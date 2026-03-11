let currentInput = "";
const CORRECT_PASS = "123456"; // Thay mật mã của bạn ở đây

function showAuth() {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

function addNum(num) {
    if(currentInput.length < 6) {
        currentInput += num;
        // Hiệu ứng giả lập nhập mật mã
        document.querySelector('.heart-pass').innerText = "❤️".repeat(currentInput.length);
    }
}

function clearNum() {
    currentInput = "";
    document.querySelector('.heart-pass').innerText = "....";
}

function checkPass() {
    if(currentInput === CORRECT_PASS) {
        document.getElementById('status-text').style.display = 'block';
        setTimeout(() => {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('final-screen').classList.remove('hidden');
            document.getElementById('bg-music').play();
            startSurprise();
        }, 1500);
    } else {
        alert("Sai mật mã rồi chị ơi! 😜");
        clearNum();
    }
}

function startSurprise() {
    setInterval(createHeartFly, 300); // Tạo trái tim bay
    setInterval(createFirework, 500);
    setInterval(createDenseWishes, 400); 
    setInterval(createScrollingPhoto, 2500);
}

function createHeartFly() {
    const heart = document.createElement('div');
    heart.className = 'heart-fly';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.body.appendChild(heart);

    heart.animate([
        { bottom: '-20px', opacity: 1, transform: 'translateX(0)' },
        { bottom: '110vh', opacity: 0, transform: `translateX(${Math.random() * 100 - 50}px)` }
    ], { duration: 4000 + Math.random() * 2000 });
    
    setTimeout(() => heart.remove(), 6000);
}

// ... (Giữ các hàm createFirework, createDenseWishes, createScrollingPhoto từ bản trước của bạn)
