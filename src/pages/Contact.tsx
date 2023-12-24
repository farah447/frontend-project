import { Button, Stack, Typography, TextField, Container, Card, CardContent, CardActions } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import themes from '../Theme/Themes';

const Contact = () => {
    return (
        <ThemeProvider theme={themes} >
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            If you have any questions or inquiries, please feel free to get in touch with us.
                        </Typography>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                id="message"
                                label="Message"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                        </form>
                    </CardContent>
                    <CardActions>
                        <Stack>
                            <Button
                                className="send-btn"
                                variant="outlined"
                                type="submit"
                                color="secondary"
                                size="small">
                                Send Message
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default Contact;
