import "./ContactForm.css";

export default function ContactForm() {
  return (
    <form action="#">
      <h1>Contact us</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="250" maxLength={250} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
