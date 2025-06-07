"use client";

import React, { useState } from "react";
import AnimUp from "../animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";

// Define the form data interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  from_name: string;
  botcheck: boolean;
  access_key?: string;
}

function ContactForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      from_name: "Portfolio Contact Form",
      botcheck: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "acf20b58-5fb9-4d3d-90f0-f8cb5095fbd3", 
          ...data
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setMessage(result.message);
        reset();
      } else {
        setIsSuccess(false);
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred. Please try again later.");
      console.error("Form submission error:", error);
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div ref={ref} className="w-full md:w-3/4 py-10">
        <AnimUp inView={inView} duration={1}>
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <h3 className="text-2xl font-Antonio mb-4">
              {isSuccess ? "Thank You!" : "Oops!"}
            </h3>
            <p className="mb-6 opacity-80">{message}</p>
            <button
              onClick={() => reset(
                { 
                  name: "", 
                  email: "", 
                  subject: "", 
                  message: "", 
                  from_name: "Portfolio Contact Form", 
                  botcheck: false 
                }, 
                { keepIsSubmitSuccessful: false }
              )}
              className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 font-Antonio text-lg uppercase transition-all duration-500 hover:border-white hover:bg-white hover:text-background"
            >
              Send Another Message
            </button>
          </div>
        </AnimUp>
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full md:w-3/4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <input type="hidden" {...register("from_name")} />
        <input type="checkbox" id="" className="hidden" style={{ display: "none" }} {...register("botcheck")} />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <AnimUp inView={inView} duration={1}>
              <label htmlFor="name" className="block text-sm font-Antonio uppercase opacity-50 mb-2">
                Name *
              </label>
            </AnimUp>
            <AnimUp inView={inView} duration={1.2}>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 80,
                    message: "Name cannot exceed 80 characters"
                  }
                })}
                className="w-full border-b border-white/20 bg-transparent py-3 font-Antonio text-lg focus:border-white focus:outline-none transition-colors"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-red-400 text-sm">{errors.name.message as string}</p>
              )}
            </AnimUp>
          </div>

          <div>
            <AnimUp inView={inView} duration={1.4}>
              <label htmlFor="email" className="block text-sm font-Antonio uppercase opacity-50 mb-2">
                Email *
              </label>
            </AnimUp>
            <AnimUp inView={inView} duration={1.6}>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className="w-full border-b border-white/20 bg-transparent py-3 font-Antonio text-lg focus:border-white focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-400 text-sm">{errors.email.message as string}</p>
              )}
            </AnimUp>
          </div>
        </div>

        <div>
          <AnimUp inView={inView} duration={1.8}>
            <label htmlFor="subject" className="block text-sm font-Antonio uppercase opacity-50 mb-2">
              Subject *
            </label>
          </AnimUp>
          <AnimUp inView={inView} duration={2}>
            <input
              type="text"
              id="subject"
              {...register("subject", {
                required: "Subject is required"
              })}
              className="w-full border-b border-white/20 bg-transparent py-3 font-Antonio text-lg focus:border-white focus:outline-none transition-colors"
              placeholder="Project inquiry, collaboration, etc."
            />
            {errors.subject && (
              <p className="mt-1 text-red-400 text-sm">{errors.subject.message as string}</p>
            )}
          </AnimUp>
        </div>

        <div>
          <AnimUp inView={inView} duration={2.2}>
            <label htmlFor="message" className="block text-sm font-Antonio uppercase opacity-50 mb-2">
              Message *
            </label>
          </AnimUp>
          <AnimUp inView={inView} duration={2.4}>
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters"
                }
              })}
              rows={6}
              className="w-full border-b border-white/20 bg-transparent py-3 font-Antonio text-lg focus:border-white focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project or idea..."
            />
            {errors.message && (
              <p className="mt-1 text-red-400 text-sm">{errors.message.message as string}</p>
            )}
          </AnimUp>
        </div>

        <AnimUp inView={inView} duration={2.6}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-4 font-Antonio text-lg uppercase transition-all duration-500 hover:border-white hover:bg-white hover:text-background disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </AnimUp>
      </form>
    </div>
  );
}

export default ContactForm; 