"use client";
import React, { useEffect } from 'react';
import "../app/components/text.css";

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
            "Programmer",
            "Freelancer",
            "Photographer",
            "Video Editor"
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
                textIndex++;
            }

            setMorph(fraction);
        }

        function setMorph(fraction) {
            const scale = 1 + (1 - fraction) * 0.100; // Adjust scaling factor as needed
        
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            elts.text2.style.transform = `scale(${scale})`;
        
            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            elts.text1.style.transform = `scale(${scale})`;
        
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

        return () => {};
    }, []);

    return (
        <main>
            <div id='navbar' className='h-20 flex justify-center items-center ml-8'>
                <div className='space-x-12 px-6 py-3 rounded-full bg-white bg-gradient-to-tr from-pink-300 to-blue-400 fixed'>
                    <span>Home</span>
                    <span>Skills</span>
                    <span>About</span>
                    <span>Contact Me</span>
                </div>
            </div>

            <div id="container" className="text-left middle-screen">
                <h1>
                    Hello, I am <span id="text1"></span><span id="text2" className="invisible"></span>
                </h1>
            </div>

            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>
        </main>
    );
}
