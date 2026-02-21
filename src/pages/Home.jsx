import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const animateCounter = (counterElement) => {
            const target = +counterElement.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counterElement.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counterElement.innerText = target;
                }
            };
            updateCounter();
        };

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    if (entry.target.classList.contains('stat-item') && !entry.target.classList.contains('counted')) {
                        const counter = entry.target.querySelector('.counter');
                        if (counter) {
                            animateCounter(counter);
                            entry.target.classList.add('counted');
                        }
                    }
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="home-page">
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="container">
                    <a href="#" className="logo">FRANCESCO<span>TILLS</span></a>
                    <ul className="nav-links">
                        <li><a href="#about" onClick={handleSmoothScroll}>About</a></li>
                        <li><a href="#text-testimonials" onClick={handleSmoothScroll}>Testimonials</a></li>
                        <li><Link to="/apply" className="btn btn-nav">Book Coaching</Link></li>
                    </ul>
                </div>
            </nav>

            <header className="hero" id="home">
                <div className="container hero-content">
                    <div className="hero-text hidden">
                        <h1>REDEFINE YOUR <span>LIMITS</span></h1>
                        <p>Join Francesco Tills to unlock your ultimate physical potential. Specialized 1:1 training, expert nutrition, and unyielding support.</p>
                        <div className="hero-btns">
                            <Link to="/apply" className="btn btn-primary">Start Your Journey</Link>
                            <a href="#about" className="btn btn-secondary" onClick={handleSmoothScroll}>Meet Francesco</a>
                        </div>
                    </div>
                    <div className="hero-image-wrapper hidden">
                        <div className="image-glow"></div>
                        <img src="/hero.png" alt="Francesco Tills Fitness Coach" className="hero-image" />
                    </div>
                </div>
            </header>

            <section className="stats">
                <div className="container stats-grid">
                    <div className="stat-item hidden delay-1">
                        <h2><span className="counter" data-target="500">0</span>+</h2>
                        <p>Lives Transformed</p>
                    </div>
                    <div className="stat-item hidden delay-2">
                        <h2><span className="counter" data-target="10">0</span>+</h2>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-item hidden delay-3">
                        <h2><span className="counter" data-target="100">0</span>%</h2>
                        <p>Commitment</p>
                    </div>
                </div>
            </section>

            <section className="testimonials" id="testimonials">
                <div className="container">
                    <div className="section-title hidden">
                        <h2>CLIENT <span>TRANSFORMATIONS</span></h2>
                        <p>Real results from dedicated individuals who put in the work.</p>
                    </div>
                    <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[...Array(6)].map((_, i) => (
                            <div className="testimonial-card hidden" key={i} style={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '12px', padding: '1rem', transitionDelay: `${(i % 3) * 0.1}s` }}>
                                <div className="testimonial-img" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                                    <img src="/testimonial-img.png" alt={`Transformation ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--accent-color)', color: '#fff', padding: '4px 8px', fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px' }}>Before & After</div>
                                </div>
                                <div className="testimonial-content">
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Client #{(i + 1) * 105}</h3>
                                    <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{(i % 4) + 3} Months Program</p>
                                    <p style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1rem' }}>"Working with Francesco completely changed my view on nutrition and lifting. It wasn't just about looks, it was about building unshakeable confidence and discipline."</p>
                                    <div style={{ color: '#FFD700', fontSize: '0.9rem' }}>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services" id="text-testimonials">
                <div className="container">
                    <div className="section-title hidden">
                        <h2>HEAR FROM <span>THEM</span></h2>
                        <p>Real stories from individuals who took the leap.</p>
                    </div>
                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="service-card hidden delay-1" style={{ textAlign: 'left', padding: '2rem' }}>
                            <div className="card-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}><i className="fa-solid fa-quote-left"></i></div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem' }}>"Francesco isn't just a coach; he's a mentor. The program pushed me past my limits safely, and I've never felt stronger. It's the best investment I've made in my health."</p>
                            <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>— James T.</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lost 30lbs, Gained Confidence</p>
                        </div>
                        <div className="service-card hidden delay-2" style={{ textAlign: 'left', padding: '2rem' }}>
                            <div className="card-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}><i className="fa-solid fa-quote-left"></i></div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem' }}>"I struggled with consistency for years. Between his personalized nutrition plans and weekly checks, I finally built habits that actually stuck. Francesco genuinely cares."</p>
                            <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>— Mark S.</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Added 15lbs of Lean Muscle</p>
                        </div>
                        <div className="service-card hidden delay-3" style={{ textAlign: 'left', padding: '2rem' }}>
                            <div className="card-icon" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}><i className="fa-solid fa-quote-left"></i></div>
                            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem' }}>"If you want someone who will hold you accountable while adjusting perfectly to your busy lifestyle, look nowhere else. The structured approach completely changed my life."</p>
                            <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>— Alex R.</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Overall Health & Mobility Focus</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about" id="about">
                <div className="container about-content">
                    <div className="about-text hidden">
                        <h2>MEET <span>FRANCESCO</span></h2>
                        <p>I started my fitness journey over a decade ago with a simple goal: to be stronger than yesterday. What began as a personal mission transformed into a lifelong passion for helping others discover their true potential.</p>
                        <p>I don't just give you a template. I analyze your lifestyle, your challenges, and your goals to build a roadmap that actually works. We build discipline, conquer weakness, and celebrate every victory.</p>
                    </div>
                    <div className="about-visual hidden delay-2" style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram-embed-card" style={{ display: 'block', background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.3s ease, boxShadow 0.3s ease', textDecoration: 'none', width: '100%', maxWidth: '380px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,87,34,0.2)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)'; }}>
                            <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '1.5rem' }}>
                                    <i className="fa-brands fa-instagram"></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.1rem', margin: 0, textTransform: 'lowercase' }}>@francescotills</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, textTransform: 'none', letterSpacing: 'normal' }}>Official Instagram</p>
                                </div>
                                <span style={{ background: 'var(--accent-color)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Follow</span>
                            </div>
                            <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
                                <img src="/hero.png" alt="Instagram Post" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 0, fontStyle: 'italic', textTransform: 'none', letterSpacing: 'normal' }}>"Consistency is the only magic pill. Building discipline and conquering weakness every single day. 🔥💪"</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="footer" id="contact">
                <div className="container footer-content" style={{ gridTemplateColumns: '1fr', textAlign: 'center' }}>
                    <div className="footer-info hidden">
                        <h2 style={{ fontSize: '3.5rem' }}>READY TO <span>WORK?</span></h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>Take the first step towards your dream physique. Join the elite 1:1 coaching program and start your transformation today.</p>

                        <Link to="/apply" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.3rem', marginBottom: '3rem' }}>
                            Apply for 1:1 coaching
                        </Link>

                        <div className="socials" style={{ justifyContent: 'center' }}>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-tiktok"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Francesco Tills. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
