import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Apply = () => {
    const [formStatus, setFormStatus] = useState({ text: 'Send Application', isSent: false });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Reveal animation for components
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus({ text: 'Application Sent!', isSent: true });
        setTimeout(() => {
            setFormStatus({ text: 'Send Application', isSent: false });
            e.target.reset();
        }, 3000);
    };

    return (
        <div className="apply-page" style={{ minHeight: '100vh', padding: '120px 0 60px' }}>
            <nav className="navbar scrolled" id="navbar">
                <div className="container">
                    <Link to="/" className="logo">FRANCESCO<span>TILLS</span></Link>
                    <ul className="nav-links">
                        <li><Link to="/">Back to Home</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="footer-info hidden" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '3.5rem' }}>START YOUR <span>TRANSFORMATION</span></h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Fill out the form below and Francesco will personally review your application and get in touch within 24 hours.</p>
                    </div>

                    <form className="contact-form hidden delay-2" onSubmit={handleSubmit} style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--surface-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                            <input type="email" placeholder="Your Email" required />
                        </div>
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>Program</label>
                            <select required defaultValue="" style={{ display: 'block' }}>
                                <option value="1on1">1-on-1 Coaching</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Fitness Goals</label>
                            <textarea placeholder="Tell me about your current situation, your goals, and why you want to start now..." rows="6" required></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{
                                height: '60px',
                                fontSize: '1.2rem',
                                ...(formStatus.isSent ? { backgroundColor: '#4CAF50', boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)' } : {})
                            }}
                        >
                            {formStatus.text}
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom" style={{ marginTop: '4rem' }}>
                <p>&copy; 2026 Francesco Tills. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Apply;
