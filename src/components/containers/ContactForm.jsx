import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { settings } from "../../settings/settings";

const ContactForm = () => {
  const currentForm = useRef();

  const [serverSuccess, setServerSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with public key
    if (settings.emailjs_publickey) {
      emailjs.init(settings.emailjs_publickey);
      setIsInitialized(true);
      console.log("EmailJS initialized with key:", settings.emailjs_publickey);
    } else {
      console.error("EmailJS public key is missing!");
      setServerError("Email service configuration error");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!isInitialized) {
      setServerError("Email service is not initialized. Please refresh the page.");
      return;
    }

    // Clear previous messages
    setServerSuccess("");
    setServerError("");
    setIsSending(true);
    
    console.log("Attempting to send email with:", {
      serviceId: settings.emailjs_serviceid,
      templateId: settings.emailjs_templateid,
      publicKey: settings.emailjs_publickey,
      formData: data
    });
    
    try {
      const result = await emailjs.sendForm(
        settings.emailjs_serviceid,
        settings.emailjs_templateid,
        currentForm.current,
        settings.emailjs_publickey
      );
      
      console.log("EmailJS Success:", result);
      
      if (result.status === 200) {
        setServerError("");
        setServerSuccess("Email sent successfully!");
        reset();
      } else {
        throw new Error(`Unexpected status: ${result.status}`);
      }
    } catch (error) {
      console.error("EmailJS Error Details:", error);
      setServerSuccess("");
      
      // More detailed error messages
      if (error.text) {
        setServerError(`Error: ${error.text}`);
      } else if (error.message) {
        setServerError(`Error: ${error.message}`);
      } else {
        setServerError("Failed to send email. Please check your internet connection and try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      ref={currentForm}
      className="card -mt-1.5  space-y-4 p-4 md:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="inputbox">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter your name..."
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <>
            {errors.name.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Name is required!
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email..."
          id="email"
          {...register("email", {
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.email && (
          <>
            {errors.email.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Email is required!
              </p>
            )}
            {errors.email.type === "pattern" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Invalid email address!
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          placeholder="Enter subject..."
          id="subject"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <>
            {errors.subject.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Subject is required!
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Enter you message..."
          cols="1"
          rows="5"
          id="message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <>
            {errors.message.type === "required" && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Message is required!
              </p>
            )}
          </>
        )}
      </div>
      {!serverSuccess && serverError && (
        <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
          {serverError}
        </p>
      )}
      {!serverError && serverSuccess && (
        <p className="bg-green-500 bg-opacity-5 text-center text-sm text-green-500">
          {serverSuccess}
        </p>
      )}
      <button type="submit" className="btn" disabled={isSending}>
        <span>{isSending ? "Sending..." : "Send Mail"}</span>
      </button>
    </form>
  );
};

export default ContactForm;
