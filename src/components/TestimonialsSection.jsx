import React from 'react';
import '../styles/TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <h2>Trusted by Fisheries Across Sri Lanka</h2>
      <p>See what our customers are saying about us.</p>

      <div className="testimonials-grid">
        <div className="testimonial-card">
          <img src="src/assets/ravi.jpg" alt="Ravi Kumar" className="testimonial-image" />
          <h4>Ravi Kumar</h4>
          <p className="role">Fisherman, Galle</p>
          <p className="quote">"FishMarket has transformed how I sell my catch. I’ve doubled my profits since joining the platform!"</p>
        </div>

        <div className="testimonial-card">
          <img src="src/assets/priya.jpg" alt="Priya Silva" className="testimonial-image" />
          <h4>Priya Silva</h4>
          <p className="role">Restaurant Owner, Colombo</p>
          <p className="quote">"The quality and freshness of fish I get through FishMarket is unmatched. My customers can taste the difference."</p>
        </div>

        <div className="testimonial-card">
          <img src="src/assets/michael.jpg" alt="Michael Fernando" className="testimonial-image" />
          <h4>Michael Fernando</h4>
          <p className="role">Exporter, Negombo</p>
          <p className="quote">"The platform’s inventory management tools have streamlined our operations significantly."</p>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;


