import { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Carousel, Row, Col, Form, Button } from 'react-bootstrap'
import {
  FaPhone, FaMapMarkerAlt, FaClock, FaStar, FaQuoteLeft,
  FaEnvelope, FaFacebook, FaInstagram,
} from 'react-icons/fa'
import {
  MdPets, MdBathtub, MdOutlineContentCut, MdVaccines,
} from 'react-icons/md'
import { GiDogBowl, GiPawHeart, GiSittingDog } from 'react-icons/gi'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Placeholder gradient images (no external URLs needed)
const HERO_SLIDES = [
  {
    bg: 'linear-gradient(135deg,#5c3d2e 0%,#3a9ea5 100%)',
    title: <>Your Pet Deserves the <span>Best Care</span></>,
    sub: 'Professional grooming that leaves tails wagging every time.',
  },
  {
    bg: 'linear-gradient(135deg,#3b2318 0%,#e07b39 100%)',
    title: <>Bath, Trim &amp; <span>Full Groom</span> Packages</>,
    sub: 'Customized grooming services for all breeds and sizes.',
  },
  {
    bg: 'linear-gradient(135deg,#1a4a4e 0%,#5c3d2e 100%)',
    title: <>Trusted by <span>500+ Pet Owners</span> in Town</>,
    sub: "Book your furry friend's appointment today — walk-ins welcome!",
  },
]

const SERVICES = [
  {
    icon: <MdBathtub />,
    name: 'Bath & Dry',
    desc: 'Shampoo, conditioner, blowdry, and brush-out for a fresh, fluffy finish.',
    price: 'From $35',
  },
  {
    icon: <MdOutlineContentCut />,
    name: 'Full Groom',
    desc: 'Bath + breed-specific haircut, nail trim, ear cleaning, and bandana.',
    price: 'From $60',
  },
  {
    icon: <GiPawHeart />,
    name: 'Nail Trim & File',
    desc: 'Quick and stress-free nail clipping and filing to protect your floors and pets.',
    price: 'From $18',
  },
  {
    icon: <MdPets />,
    name: 'De-Shedding Treatment',
    desc: 'Reduce shedding up to 80% with our professional de-shedding bath and brush.',
    price: 'From $50',
  },
  {
    icon: <GiSittingDog />,
    name: 'Puppy First Groom',
    desc: 'Gentle introduction grooming experience designed for puppies under 6 months.',
    price: 'From $45',
  },
  {
    icon: <GiDogBowl />,
    name: 'Teeth Brushing',
    desc: "Pet-safe toothpaste and soft brush to keep your pup's smile bright and fresh.",
    price: 'From $12',
  },
]

const REVIEWS = [
  {
    name: 'Sarah M.',
    text: 'My golden retriever always comes out looking incredible! The staff genuinely loves animals and it shows. We won\'t go anywhere else.',
    rating: 5,
  },
  {
    name: 'James T.',
    text: 'Outstanding service — my anxious rescue dog actually seemed calm after his groom. They were so patient and gentle. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Linda K.',
    text: 'Friendly staff, fair prices, and my poodle mix looks like she just stepped out of a show! We\'ve been coming here for 2 years.',
    rating: 5,
  },
]

const HOURS = [
  { day: 'Monday',    time: '9:00 AM – 6:00 PM', idx: 1 },
  { day: 'Tuesday',   time: '9:00 AM – 6:00 PM', idx: 2 },
  { day: 'Wednesday', time: '9:00 AM – 6:00 PM', idx: 3 },
  { day: 'Thursday',  time: '9:00 AM – 6:00 PM', idx: 4 },
  { day: 'Friday',    time: '9:00 AM – 6:00 PM', idx: 5 },
  { day: 'Saturday',  time: '9:00 AM – 5:00 PM', idx: 6 },
  { day: 'Sunday',    time: 'Closed',             idx: 0 },
]

export default function App() {
  // ── Site tracker ──────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const initiator = params.get('initiator') || params.get('initiatior')
    const initiatorKey = initiator ? `_tracked_initiator:${initiator}` : ''
    const shouldTrack =
      !sessionStorage.getItem('_tracked') ||
      (initiatorKey && !sessionStorage.getItem(initiatorKey))

    if (shouldTrack) {
      sessionStorage.setItem('_tracked', '1')
      if (initiatorKey) sessionStorage.setItem(initiatorKey, '1')
      fetch('https://site-tracker-delta.vercel.app/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: window.location.hostname,
          page: window.location.pathname,
          referrer: document.referrer,
          ...(initiator ? { initiator } : {}),
        }),
      }).catch(() => {})
    }
  }, [])

  const [navExpanded, setNavExpanded] = useState(false)
  const [formSent, setFormSent] = useState(false)

  const scrollTo = (id) => {
    setNavExpanded(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const todayIdx = new Date().getDay()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <>
      {/* ── Navbar ────────────────────────────────────────────────── */}
      <Navbar
        className="navbar-groomer sticky-top"
        expand="lg"
        expanded={navExpanded}
        onToggle={setNavExpanded}
      >
        <Container>
          <Navbar.Brand href="#">🐾 Paws &amp; Groom</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-main" />
          <Navbar.Collapse id="nav-main">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              {['services', 'reviews', 'contact'].map((id) => (
                <Nav.Link key={id} onClick={() => scrollTo(id)} style={{ textTransform: 'capitalize' }}>
                  {id === 'services' ? 'Services' : id === 'reviews' ? 'Reviews' : 'Book / Contact'}
                </Nav.Link>
              ))}
              <Nav.Link
                as="button"
                className="btn-grm ms-lg-2 mt-2 mt-lg-0"
                onClick={() => scrollTo('contact')}
              >
                Book Now
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ── Hero Carousel ──────────────────────────────────────────── */}
      <Carousel className="hero-carousel" interval={5000} fade>
        {HERO_SLIDES.map((slide, i) => (
          <Carousel.Item key={i}>
            <div style={{ background: slide.bg, minHeight: '92vh' }} />
            <div className="carousel-caption">
              <h1>{slide.title}</h1>
              <p>{slide.sub}</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn-grm" onClick={() => scrollTo('contact')}>
                  📅 Book an Appointment
                </button>
                <button className="btn-grm-outline" onClick={() => scrollTo('services')}>
                  Our Services
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section id="services" className="services-section">
        <Container>
          <div className="text-center mb-5">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Grooming Services</h2>
            <div className="section-divider mx-auto" />
            <p className="mt-3" style={{ color: 'var(--grm-muted)', maxWidth: 560, margin: '1rem auto 0' }}>
              From a quick freshen-up to a full spa day — we offer everything your pet needs to look and feel their best.
            </p>
          </div>
          <Row className="g-4">
            {SERVICES.map((s, i) => (
              <Col key={i} xs={12} sm={6} lg={4}>
                <div className="service-card">
                  <div className="svc-icon">{s.icon}</div>
                  <h5>{s.name}</h5>
                  <p>{s.desc}</p>
                  <span className="price">{s.price}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <section id="reviews" className="reviews-section">
        <Container>
          <div className="text-center mb-5">
            <p className="section-label">Happy Pet Parents</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <div className="section-divider mx-auto" />
          </div>
          <Row className="g-4 justify-content-center">
            {REVIEWS.map((r, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <div className="review-card">
                  <div className="stars">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>
                  <blockquote>
                    <FaQuoteLeft style={{ marginRight: 6, opacity: 0.5 }} />
                    {r.text}
                  </blockquote>
                  <div className="reviewer">{r.name}</div>
                  <span className="google-tag">⭐ Google Review</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Contact / Book ─────────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <Container>
          <div className="text-center mb-5">
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Book an Appointment</h2>
            <div className="section-divider mx-auto" />
          </div>
          <Row className="g-4 align-items-start">
            {/* Contact Form */}
            <Col xs={12} lg={7}>
              <div className="contact-form-card">
                {formSent ? (
                  <div className="text-center py-4">
                    <div style={{ fontSize: '3rem' }}>🐾</div>
                    <h4 className="mt-3" style={{ color: 'var(--grm-teal)' }}>Request Sent!</h4>
                    <p style={{ color: 'var(--grm-muted)' }}>
                      Thanks for reaching out! We'll confirm your appointment soon.
                    </p>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Your Name</Form.Label>
                          <Form.Control type="text" placeholder="Jane Smith" required />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control type="tel" placeholder="(204) 555-0100" required />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Pet's Name</Form.Label>
                          <Form.Control type="text" placeholder="Buddy" required />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Breed / Size</Form.Label>
                          <Form.Control type="text" placeholder="Golden Retriever / Large" />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Service Requested</Form.Label>
                          <Form.Select>
                            {SERVICES.map((s) => (
                              <option key={s.name}>{s.name}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Form.Group>
                          <Form.Label>Preferred Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Additional Notes</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Any special requests, allergies, or notes about your pet…" />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <button type="submit" className="btn-grm w-100" style={{ padding: '0.75rem' }}>
                          🐾 Request Appointment
                        </button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
            </Col>

            {/* Info Column */}
            <Col xs={12} lg={5}>
              <div className="info-box">
                <span className="info-icon"><FaPhone /></span>
                <div>
                  <h6>Call or Text Us</h6>
                  <p>(204) 555-0100</p>
                </div>
              </div>
              <div className="info-box">
                <span className="info-icon"><FaEnvelope /></span>
                <div>
                  <h6>Email</h6>
                  <p>hello@pawsandgroom.com</p>
                </div>
              </div>
              <div className="info-box">
                <span className="info-icon"><FaMapMarkerAlt /></span>
                <div>
                  <h6>Location</h6>
                  <p>123 Maple Ave, Winnipeg, MB R3C 0P4</p>
                </div>
              </div>
              <div className="info-box" style={{ flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
                  <span className="info-icon"><FaClock /></span>
                  <h6 style={{ margin: 0 }}>Hours of Operation</h6>
                </div>
                <table className="hours-table">
                  <tbody>
                    {HOURS.map((h) => (
                      <tr key={h.day} className={h.idx === todayIdx ? 'today' : ''}>
                        <td>{h.day}{h.idx === todayIdx ? ' ← Today' : ''}</td>
                        <td>{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Google Maps ────────────────────────────────────────────── */}
      <section className="map-section">
        <iframe
          title="Paws & Groom Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82819.05944764068!2d-97.23715!3d49.8954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea73826f345a05%3A0xef1a9b96700b2f4e!2sWinnipeg%2C%20MB!5e0!3m2!1sen!2sca!4v1700000000000"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="footer-groomer">
        <div style={{ marginBottom: '0.5rem' }}>
          <strong style={{ color: 'var(--grm-amber)' }}>🐾 Paws &amp; Groom</strong>
          {' — '}Professional Pet Grooming · 123 Maple Ave, Winnipeg, MB
        </div>
        <div style={{ marginBottom: '0.4rem' }}>
          <a href="tel:+12045550100">📞 (204) 555-0100</a>
          {' · '}
          <a href="mailto:hello@pawsandgroom.com">✉️ hello@pawsandgroom.com</a>
        </div>
        <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', opacity: 0.6 }}>
          © {new Date().getFullYear()} Paws &amp; Groom. All rights reserved.
        </div>
      </footer>
    </>
  )
}

