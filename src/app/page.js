"use client";
import React from 'react';
import Home from './components/Home';
import Skills from './components/Skills';
import About from './components/About';
import ContactMe from './components/ContactMe';
import './components/Styles/home.css';

export default function Page() {
    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <Home />
                <Skills />
                <About />
                <ContactMe />
            </div>
        </div>
    );
}
