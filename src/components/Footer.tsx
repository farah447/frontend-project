
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Information</h3>
                    <address>
                        123 Main Street<br />
                        City, Country<br />
                        Phone: (123) 456-7890<br />
                        Email: info@example.com
                    </address>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://youtube.com">youtube</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;