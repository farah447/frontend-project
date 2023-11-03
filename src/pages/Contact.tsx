import { Button, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import themes from '../Theme/Themes';

const Contact = () => {
    return (
        <ThemeProvider theme={themes} >
            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>If you have any questions or inquiries, please feel free to get in touch with us.</p>
                <div className="contact-details">
                    <div className="contact-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={4}></textarea>
                            </div>
                            <Stack>
                                <Button
                                    className="send-btn"
                                    variant="outlined"
                                    type="submit"
                                    color="secondary"
                                    size="small">
                                    Send Message</Button>
                            </Stack>
                        </form>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Contact;
