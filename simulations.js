document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Fun Facts Rotator ---
    const facts = [
        "Dolphins sleep with one eye open!",
        "A group of dolphins is called a pod.",
        "Dolphins can swim up to 20 miles per hour.",
        "Dolphins have 2 stomachs: one for food storage and one for digestion.",
        "Killer whales are actually a species of dolphin!",
        "Dolphins give themselves names (signature whistles).",
        "Some dolphins can live to be 50 years old.",
        "Dolphins help sick or injured members of their pod.",
        "Dolphins can recognize themselves in a mirror.",
        "The killer whale (orca) is the largest member of the dolphin family.",
        "Dolphins have been known to protect swimmers from sharks.",
        "Some dolphins can jump as high as 20 feet out of the water.",
        "Dolphins use echolocation to find food and navigate.",
        "A baby dolphin is called a calf.",
        "Dolphins are mammals, not fish!"
    ];

    const factElement = document.getElementById('fact-display');
    if (factElement) {
        let currentFact = 0;

        // Initial fact
        factElement.textContent = facts[currentFact];

        setInterval(() => {
            factElement.style.opacity = 0;
            setTimeout(() => {
                currentFact = (currentFact + 1) % facts.length;
                factElement.textContent = facts[currentFact];
                factElement.style.opacity = 1;
            }, 500);
        }, 6000);
    }

    // --- 2. Gravity Box Simulation ---
    const canvas = document.getElementById('gravityCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const clearBtn = document.getElementById('clearBallsBtn');
        let balls = [];
        const gravity = 0.5;
        const friction = 0.8;

        class Ball {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.dy = 0;
                this.dx = (Math.random() - 0.5) * 4;
                this.radius = 10 + Math.random() * 10;
                this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.y + this.radius + this.dy > canvas.height) {
                    this.dy = -this.dy * friction;
                    this.dx = this.dx * friction;
                } else {
                    this.dy += gravity;
                }

                if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
                    this.dx = -this.dx;
                }

                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => ball.update());
        }

        animate();

        // Add ball on click
        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            balls.push(new Ball(x, y));
        });

        clearBtn.addEventListener('click', () => {
            balls = [];
        });
    }

    // --- 3. Click Speed Test ---
    const clickBtn = document.getElementById('clickBtn');
    const scoreDisplay = document.getElementById('clickScore');
    const timerDisplay = document.getElementById('clickTimer');

    if (clickBtn) {
        let score = 0;
        let timeLeft = 10;
        let isPlaying = false;
        let timerId = null;

        clickBtn.addEventListener('click', () => {
            if (!isPlaying) {
                // Start Game
                if (clickBtn.textContent === "Play Again") {
                    score = 0;
                    timeLeft = 10;
                    scoreDisplay.textContent = `Score: ${score}`;
                    timerDisplay.textContent = `Time: ${timeLeft}s`;
                }

                isPlaying = true;
                clickBtn.textContent = "CLICK ME!";

                timerId = setInterval(() => {
                    timeLeft--;
                    timerDisplay.textContent = `Time: ${timeLeft}s`;
                    if (timeLeft <= 0) {
                        clearInterval(timerId);
                        isPlaying = false;
                        clickBtn.textContent = "Play Again";
                        alert(`Time's up! You got ${score} clicks!`);
                    }
                }, 1000);

                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else {
                // Count Clicks
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });
    }

    // --- 4. Color Reactor ---
    const reactionBox = document.getElementById('reactionBox');
    const reactionResult = document.getElementById('reactionResult');

    if (reactionBox) {
        let startTime;
        let timeoutId;
        let isWaiting = false;

        function startReactionTest() {
            reactionBox.style.backgroundColor = '#e74c3c'; // Red
            reactionBox.textContent = "Wait for Green...";
            reactionResult.textContent = "";
            isWaiting = true;

            const randomTime = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds

            timeoutId = setTimeout(() => {
                reactionBox.style.backgroundColor = '#2ecc71'; // Green
                reactionBox.textContent = "CLICK NOW!";
                startTime = Date.now();
                isWaiting = false;
            }, randomTime);
        }

        reactionBox.addEventListener('click', () => {
            if (reactionBox.textContent === "Click to Start") {
                startReactionTest();
                return;
            }

            if (isWaiting) {
                // Clicked too early
                clearTimeout(timeoutId);
                reactionBox.style.backgroundColor = '#e74c3c';
                reactionBox.textContent = "Too Early!";
                reactionResult.textContent = "You clicked too soon. Try again.";
                setTimeout(() => {
                    reactionBox.textContent = "Click to Start";
                    reactionBox.style.backgroundColor = '#3498db';
                }, 1500);
                isWaiting = false;
            } else if (reactionBox.textContent === "CLICK NOW!") {
                // Success
                const reactionTime = Date.now() - startTime;
                reactionBox.textContent = `${reactionTime}ms`;
                reactionResult.textContent = reactionTime < 250 ? "Super Fast! ⚡" : "Good job! 👍";

                setTimeout(() => {
                    reactionBox.textContent = "Click to Start";
                    reactionBox.style.backgroundColor = '#3498db';
                }, 2000);
            }
        });

        // Initial State
        reactionBox.textContent = "Click to Start";
        reactionBox.style.backgroundColor = '#3498db';
    }

});
