
const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>If you have any questions or inquiries, please feel free to get in touch with us.</p>
            <div className="contact-details">
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p>Email: contact@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Main Street, City, Country</p>
                </div>
                <div className="contact-form">
                    <h3>Contact Form</h3>
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
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
