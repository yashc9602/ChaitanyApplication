import React from 'react';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Send the form data to the server or an email service
    console.log(data);
    // Implement the logic to send the email here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" ref={register({ required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          ref={register({ required: true, pattern: /^[0-9]{10}$/ })}
        />
        {errors.phoneNumber && (
          <span>Valid 10-digit phone number is required</span>
        )}
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" ref={register({ required: true })} />
        {errors.city && <span>City is required</span>}
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" ref={register({ required: true })} />
        {errors.message && <span>Message is required</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Valid email is required</span>}
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ContactForm;
