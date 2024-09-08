// Select the canvas and message elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

// Spring color palette (soft pastels)
const springColors = ['#FFB6C1', '#FFC0CB', '#FFD700', '#98FB98', '#AFEEEE', '#FF69B4', '#FF1493', '#7FFFD4', '#87CEFA', '#20B2AA'];

// Sweet messages
const messages = [
    "Te amo Juli ❤️",
    "Si fuera hombre se me pararía cada vez que viera una foto tuya 💕",
    "DANIEL Y FULGENCIO LA TUVIERON MUY FACIL, PAR DE SAPOS HP 💖",
    "You Make Me Smile 😘",
    "mi juli mi juli mi juli 💓",
    "Te quiero comer 🥰",
    "I know one day we will fuck 💞",
    "i miiss you and i want to see you everyday 💗",
    "You're the sun to my moon and the moon to my sun, you are the stars, you are everything ☀️",
    "My Heart is Yours y todo lo demas tmb 7u7 💝",
    "vale mencionar que pienso en ti dia y noche 🥰",
    "lo que haria por robar una tardis por ir a verte 💞",
    "happy birthday my sunshine  💗",
    "me encantas y me haces querer probar cosas nuevas y descubrir mas cosas de mi, i think we make each other better ☀️",
    "Espero ser un gran apoyo para vos como lo eres tu para mi mimor 💝"
];

// Resize the canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Call the function initially to set up the canvas size
resizeCanvas();

// Function to draw a heart shape (more accurate)
function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 100, size / 100);  // Scale heart size relative to 100px size

    // Heart shape path
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.bezierCurveTo(25, -60, 75, -60, 75, -30);
    ctx.bezierCurveTo(75, 0, 37.5, 30, 0, 60);
    ctx.bezierCurveTo(-37.5, 30, -75, 0, -75, -30);
    ctx.bezierCurveTo(-75, -60, -25, -60, 0, -30);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}

// Heart object constructor
function Heart(x, y, dx, dy, size, color, message) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
    this.message = message;

    // Draw the heart
    this.draw = function() {
        drawHeart(this.x, this.y, this.size, this.color);
    };

    // Update the heart's position and check for edge collisions
    this.update = function() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

const hearts = [];
const numHearts = 15;  // Number of hearts
const heartSize = 50;  // Size of hearts

// Create hearts with random positions, velocities, colors, and messages
function createHearts() {
    hearts.length = 0;
    for (let i = 0; i < numHearts; i++) {
        const size = heartSize;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const color = springColors[i % springColors.length];
        const heartMessage = messages[i % messages.length];
        hearts.push(new Heart(x, y, dx, dy, size, color, heartMessage));
    }
}

// Initial heart creation
createHearts();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => heart.update());
}

animate();

// Function to display the message when a heart is clicked
canvas.addEventListener('click', function(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    hearts.forEach(heart => {
        const distance = Math.sqrt(
            (mouseX - heart.x) ** 2 + (mouseY - heart.y) ** 2
        );

        if (distance < heart.size) {
            message.innerHTML = heart.message;
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 7000);
        }
    });
});

// Adjust canvas size and recreate hearts when the window is resized
window.addEventListener('resize', function() {
    resizeCanvas();
    createHearts();
});
