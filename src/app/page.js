"use client"
import React, { useEffect } from 'react';
import "../app/components/text.css"

export default function Home() {
    useEffect(() => {
        const elts = {
            text1: document.getElementById("text1"),
            text2: document.getElementById("text2")
        };

        if (!elts.text1 || !elts.text2) {
            console.error('One or both elements are not found in the DOM.');
            return;
        }

        const texts = [
            "Pavan Khalyan ;)",
            "Coder",
            "Freelancer",
            "Photographer",
            "Video Editor",
        ];

        const morphTime = 1;
        const cooldownTime = 0.25;

        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction) {
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;

            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";

            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        function animate() {
            requestAnimationFrame(animate);

            let newTime = new Date();
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime - time) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => {
            // Cleanup function if needed (e.g., to stop animation)
        };
    }, []);

    return (
        <main>
            <div id="container">
                <span id = "text">hello,i'm</span> 
                <span id="text1"></span>
                <span id="text2"></span>
            </div>

            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140" />
                    </filter>
                </defs>
            </svg>
        </main>
    );
}
