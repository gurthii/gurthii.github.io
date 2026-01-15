// --- 1. CANVAS BACKGROUND LOGIC ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; 
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.2; 
        this.color = 'rgba(0, 0, 0, 0.05)'; 
        this.lineWidth = Math.random() * 2 + 0.1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y < 0 - this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width + this.size) this.x = 0 - this.size;
        if (this.x < 0 - this.size) this.x = canvas.width + this.size;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 3;
            this.y -= forceDirectionY * force * 3;
            this.currentSize = this.size * 1.5;
        } else {
            this.currentSize = this.size;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentSize || this.size, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 4000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = 'rgba(250, 249, 246, 0.4)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();

// --- 2. POPUP MODAL LOGIC ---
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.getElementById('closeBtn');
const triggers = document.querySelectorAll('.screenshot-trigger');

triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const src = this.getAttribute('data-src');
        popupImg.src = src;
        popup.classList.add('show');
    });
});

closeBtn.addEventListener('click', function() {
    popup.classList.remove('show');
});

window.addEventListener('click', function(event) {
    if (event.target == popup) {
        popup.classList.remove('show');
    }
});

// scroll  navigation logic
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// get current year
document.getElementById('currentYear').innerText = new Date().getFullYear()