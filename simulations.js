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

    // Gravity Box
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function resolveCollision(b1, b2) {
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist === 0) return;

    // Normalize
    const nx = dx / dist;
    const ny = dy / dist;

    // Relative velocity
    const dvx = b1.dx - b2.dx;
    const dvy = b1.dy - b2.dy;

    // Velocity along normal
    const impactSpeed = dvx * nx + dvy * ny;
    if (impactSpeed > 0) return;

    const restitution = 0.9; // bounciness
    const impulse = -(1 + restitution) * impactSpeed / 2;

    const ix = impulse * nx;
    const iy = impulse * ny;

    b1.dx += ix;
    b1.dy += iy;
    b2.dx -= ix;
    b2.dy -= iy;

    // Push balls apart so they don't overlap
    const overlap = (b1.radius * 2 - dist) / 2;
    b1.x -= nx * overlap;
    b1.y -= ny * overlap;
    b2.x += nx * overlap;
    b2.y += ny * overlap;
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
