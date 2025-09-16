import Slider from "react-slick";
import testimonials from "./testimonials.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.css";
import type { TestimonialCardProps } from "../../types/testimonialCardProps";
import { sliderSettings } from "./sliderSettings";

function TestimonialCard({ name, quote, rating }: TestimonialCardProps) {
    const star = '\u2605';

    return (
        <div className="testimonial-card">
            <h3>{name}</h3>
            <p>"{quote}"</p>
            <div className="stars">{star.repeat(rating)}</div>
        </div>
    );
}

function Testimonials() {
    return (
        <section className="testimonial-section">
            <h2 className="testimonial-heading">
                See what students are saying about Discount Ebay!
            </h2>
            <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </Slider>
        </section>
    );
}

export default Testimonials;
