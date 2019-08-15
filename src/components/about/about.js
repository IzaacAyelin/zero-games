import React from 'react';
import './about.css';

export const About = () => {

    return (
        <div className="about-container">
            <div className="about-overlay">
                <div className="about-card">
                    <div className="card-header">
                        <div className="header-overlay"></div>
                    </div>
                    <div className="card-image">
                    </div>
                    <div className="card-details">
                        <h1>Izaac Ayelin</h1>
                        <h2>Full Stack Developer</h2>
                    </div>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/izaac-ayelin/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                        <a href="https://github.com/IzaacAyelin" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                        <a href="https://www.facebook.com" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook" rel="noopener noreferrer" target="_blank"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}