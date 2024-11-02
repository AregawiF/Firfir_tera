import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email using EmailJS
    emailjs.send('service_l9jwdio', 'template_ubh5zeg', formData, 'zV4Bj2pXk7VryjGL4')
      .then((result) => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold text-center mb-5">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
