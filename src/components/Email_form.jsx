import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'; // npm i @emailjs/browser
import '../styles/email_form.css'

// Faire compte sur https://www.emailjs.com/docs/examples/reactjs/

//créer fichier .env
// REACT_APP_PUBLIC_KEY=my_public_key
// .env dans .gitignore

function EmailForm() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_8ubk8ua', 'template_tzp8mpv', form.current, {
        publicKey: process.env.REACT_APP_PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus('success');
          form.current.reset(); // Réinitialisation du formulaire
        },
        (error) => {
          setStatus('failed');
          console.error('FAILED...', error.text);
        }
      );
  };

  return (
    <div className="email-form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="name">Name</label>
        <input type="text" name="from_name" id="name" required />

        <label htmlFor="email">Email</label>
        <input type="email" name="from_email" id="email" required />

        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" required />

        <input type="submit" value="Send" />
      </form>

      {/* Message de succès ou d'erreur */}
      {status === 'success' && <div className="success-message">Email sent successfully!</div>}
      {status === 'failed' && <div className="error-message">Failed to send email. Please try again later.</div>}
    </div>
  );
}

export default EmailForm;
