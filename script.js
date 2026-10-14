/* =========================================
   A LITTLE LETTER FOR KRUPA
   Birthday envelope interactions
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. GET HTML ELEMENTS
    // =========================================

    const intro = document.getElementById("intro");
    const envelopeButton = document.getElementById("openEnvelope");
    const tapInstruction = document.getElementById("tapInstruction");

    const letterSection = document.getElementById("letterSection");
    const replayButton = document.getElementById("replayButton");

    const starsContainer = document.querySelector(".stars");

    // Animation state
    let isOpening = false;
    let isClosing = false;

    // =========================================
    // 2. CREATE BACKGROUND STARS
    // =========================================

    if (starsContainer) {

        const starFragment = document.createDocumentFragment();

        for (let i = 0; i < 55; i++) {

            const star = document.createElement("span");

            star.className = "star";

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            star.style.animationDelay = `${Math.random() * 3}s`;

            star.style.animationDuration =
                `${2 + Math.random() * 3}s`;

            starFragment.appendChild(star);
        }

        starsContainer.appendChild(starFragment);
    }

    // =========================================
    // 3. OPEN THE ENVELOPE
    // =========================================

    if (intro && envelopeButton && letterSection) {

        envelopeButton.addEventListener("click", () => {

            // Prevent repeated clicks during animation
            if (isOpening || isClosing) {
                return;
            }

            // Don't reopen an already-open letter
            if (letterSection.classList.contains("visible")) {
                return;
            }

            isOpening = true;

            // Start the envelope animation
            intro.classList.add("opening");

            // Update the instruction
            if (tapInstruction) {
                tapInstruction.textContent =
                    "A little surprise, just for you ♡";
            }

            // Wait for the envelope animation
            window.setTimeout(() => {

                // Hide the introduction
                intro.classList.add("hide");

                // Reveal the birthday letter
                letterSection.classList.add("visible");

                letterSection.setAttribute(
                    "aria-hidden",
                    "false"
                );

                // Move to the top of the letter
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                isOpening = false;

            }, 1200);

        });

    }

    // =========================================
    // 4. CLOSE THE LETTER
    // =========================================

    if (replayButton && intro && letterSection) {

        replayButton.addEventListener("click", () => {

            // Prevent repeated clicks while closing
            if (isOpening || isClosing) {
                return;
            }

            isClosing = true;

            // Hide the letter
            letterSection.classList.remove("visible");

            letterSection.setAttribute(
                "aria-hidden",
                "true"
            );

            // Restore the introduction
            intro.classList.remove("hide", "opening");

            // Restore the original instructions
            if (tapInstruction) {

                tapInstruction.innerHTML =
                    'A little letter, sealed with love.<br>' +
                    '<span>Tap the envelope to open it</span>';

            }

            // Return to the envelope
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            // Release the animation lock
            window.setTimeout(() => {
                isClosing = false;
            }, 400);

        });

    }

    // =========================================
    // 5. KEYBOARD ACCESSIBILITY
    // =========================================

    // The envelope and replay controls are HTML buttons,
    // so Enter and Space already activate them by default.

    console.log("Krupa's birthday surprise is ready ♡");

});