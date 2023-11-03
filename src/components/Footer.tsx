import { ThemeProvider } from '@mui/material/styles';

import themes from '../Theme/Themes';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <ThemeProvider theme={themes} >
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className='footer-section'>
                        <section className="newsletter">
                            <h3>Subscribe to Our Newsletter</h3>
                            <form className="post">
                                <div className="news-container">
                                    <p>Enter your email to receive the offers!</p><br /><br />
                                    <input type="email" id="email" name="email" placeholder="Enter your email address" required />
                                    <button type="submit">Subscribe</button>
                                </div>
                            </form>
                        </section>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Information</h3>
                        <address>
                            123 Main Street<br />
                            City, Country<br />
                            Phone: (123) 456-7890<br />
                            Email: FutureTech@gmail.com
                        </address>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <ul>
                            <li><a href="https://twitter.com"><TwitterIcon /></a></li>
                            <li><a href="https://facebook.com"><FacebookIcon /></a></li>
                            <li><a href="https://youtube.com"><YouTubeIcon /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Future Tech. All rights reserved.</p>
                </div>
            </footer>
        </ThemeProvider>
    );
}

export default Footer;
