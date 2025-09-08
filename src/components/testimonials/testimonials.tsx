import Slider from "react-slick";
import testimonials from "../../assets/testimonials.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    responsive: [
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            fade: true,
        }
        }
    ]
};

function TestimonialCard({ name, quote, rating }) {
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
                See what students are saying about Campus Exchange!
            </h2>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </Slider>
        </section>
    );
}

export default Testimonials;
