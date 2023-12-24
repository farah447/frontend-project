import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Link, TextField, Button } from '@mui/material';

import themes from '../Theme/Themes';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <ThemeProvider theme={themes} >
            <Box component="footer" className="footer">
                <Box className="footer-content">
                    <Box className="footer-section">
                        <Typography variant="h6">Quick Links</Typography>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </Box>
                    <Box className='footer-section'>
                        <section className="newsletter">
                            <Typography variant="h6">Subscribe to Our Newsletter</Typography>
                            <form className="post">
                                <Box className="news-container">
                                    <Typography>Enter your email to receive the offers!</Typography><br /><br />
                                    <TextField type="email" id="email" name="email" placeholder="Enter your email address" required />
                                    <Button type="submit">Subscribe</Button>
                                </Box>
                            </form>
                        </section>
                    </Box>
                    <Box className="footer-section">
                        <Typography variant="h6">Contact Information</Typography>
                        <address>
                            123 Main Street<br />
                            City, Country<br />
                            Phone: (123) 456-7890<br />
                            Email: FutureTech@gmail.com
                        </address>
                    </Box>
                    <Box className="footer-section">
                        <Typography variant="h6">Follow Us</Typography>
                        <ul>
                            <li><Link href="https://twitter.com"><TwitterIcon /></Link></li>
                            <li><Link href="https://facebook.com"><FacebookIcon /></Link></li>
                            <li><Link href="https://youtube.com"><YouTubeIcon /></Link></li>
                        </ul>
                    </Box>
                </Box>
                <Box className="footer-bottom">
                    <Typography>&copy; {new Date().getFullYear()} Future Tech. All rights reserved.</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Footer;
