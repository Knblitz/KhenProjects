import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";

const Home = () => {
  const locations = [
    {
      name: "Garden By The Bay",
      image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=1935&auto=format&fit=crop",
    },
    {
      name: "Universal Studios",
      image: "https://images.unsplash.com/photo-1696851108364-5341c14c49cf?w=600&auto=format&fit=crop",
    },
    {
      name: "Singapore Botanic Gardens",
      image: "https://images.unsplash.com/photo-1669348685201-acaf8c9f69d9?w=600&auto=format&fit=crop",
    },
    {
      name: "Singapore Flyer",
      image: "https://images.unsplash.com/photo-1560594819-6cfe7ac2939f?w=600&auto=format&fit=crop",
    },
  ];

  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - carousel.offsetLeft);
      setScrollLeft(carousel.scrollLeft);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    carousel.addEventListener("mousedown", handleMouseDown);
    carousel.addEventListener("mousemove", handleMouseMove);
    carousel.addEventListener("mouseup", handleMouseUp);
    carousel.addEventListener("mouseleave", handleMouseUp);

    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
      carousel.removeEventListener("mousemove", handleMouseMove);
      carousel.removeEventListener("mouseup", handleMouseUp);
      carousel.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div>
      {/* Banner Section */}
      <section className={styles.banner}>
        <h1>Welcome to OneMap Tourist App</h1>
      </section>

      {/* Featured Locations Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.featuredTitle}>Featured Locations</h2>
        <div ref={carouselRef} className={styles.carousel}>
          {locations.map((location, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ backgroundImage: `url(${location.image})` }}
              onClick={() => window.open("#", "_blank")}
            >
              <div className={styles.cardText}>{location.name}</div>
            </div>
          ))}
        </div>
      </section>

    {/* About Us Section */}
<section className={styles.aboutSection}>
    <div className={styles.aboutContent}>
      {/* Text Section */}
      <div className={styles.aboutText}>
      <h2>About Us</h2>
        <p>
          This section provides details about the app and its purpose. We aim to deliver a simple user experience, 
          with accessible features to improve overall productivity. Stay tuned for more updates!
        </p>
      </div>
      {/* Image Section */}
      <div className={styles.aboutImage}>
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop"
          alt="About Us"
        />
      </div>
  </div>
</section>

      {/* Start Your Journey Section */}
      <section className={styles.journeySection}>
        <h2>Start Your Journey</h2>
        <p>Explore the best tourist destinations and plan your trip with ease.</p>
      </section>

      {/* Contact Us Section */}
      <section className={styles.contactSection}>
        <h2>Contact Us</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" className={styles.contactInput} />
          <input type="email" placeholder="Your Email" className={styles.contactInput} />
          <textarea placeholder="Your Message" rows="4" className={styles.contactInput}></textarea>
          <button type="submit" className={styles.contactButton}>
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;