import { Container, Row, Col } from "react-bootstrap";
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row className="footer-top">


                    <Col md={4}>
                        <h5> Trustpilot</h5>
                        <p>TrustScore 4.7 • 800k recensioni</p>
                    </Col>


                    <Col md={4}>
                        <ul className="footer-links">
                            <li>Condizioni di vendita</li>
                            <li>Privacy</li>
                            <li>Contatti</li>
                            <li>Blog</li>
                        </ul>
                    </Col>


                    <Col md={4}>
                        <h5>Unisciti alla community</h5>
                        <div className="social-icons">
                            <FaDiscord />
                            <FaTwitter />
                            <FaInstagram />
                            <FaYoutube />
                        </div>
                    </Col>

                </Row>

                <hr />

                <Row className="footer-bottom">
                    <Col md={6}>
                        <p>© 2026 GameStore</p>
                    </Col>

                    <Col md={6} className="text-end">
                        <p>Italia • Italiano • EUR</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}