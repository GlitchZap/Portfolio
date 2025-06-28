"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaHeart, FaPaperPlane } from 'react-icons/fa';
import { AccentricityBackground } from "../ui/aceternity/Container";
import emailjs from 'emailjs-com';

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"] 
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Form hover state for dynamic effects
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const serviceId = 'service_jc10tsf';
    const ownerTemplateId = 'template_yn9bqvf'; // Your notification template
    const confirmationTemplateId = 'template_2xymcr8'; // Create this in EmailJS
    const userId = 'AWkjMPX6HuTGs1CI4';

    try {
        // Send to you
        await emailjs.send(serviceId, ownerTemplateId, formData as unknown as Record<string, unknown>, userId);
        // Send confirmation to sender
        await emailjs.send(serviceId, confirmationTemplateId, formData as unknown as Record<string, unknown>, userId);

        setSubmitSuccess(true);
        setFormData({ from_name: '', from_email: '', message: '' });

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 5000);
    } catch {
        setSubmitError('There was an error sending your message. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
};
  

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'aayushkripl@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+91 93118-26989' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'New Delhi, India' }
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/GlitchZap', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/aayush-kumar-30019728a/', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://x.com/AayushKumar666', label: 'Twitter' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Accentricity Background Component - Full width */}
      <motion.div style={{ y: bgY }}>
        <AccentricityBackground 
          variant="cosmos"
          intensity={0.5}
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Get in <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Touch</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            I am currently available for freelance work or full-time positions. 
            Feel free to reach out if you have a project in mind or just want to connect!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left side - Contact Form */}
          <motion.div 
            ref={formRef}
            className="bg-gradient-to-br from-purple-900/20 via-black/60 to-blue-900/20 p-10 rounded-xl border border-white/10 backdrop-blur-md relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            {/* Animated reflective highlights */}
            <motion.div 
              className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-45"
              animate={{ 
                left: ['100%', '-100%'],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 7,
                ease: "linear",
              }}
            />
            
            <h3 className="text-2xl font-bold mb-10 text-white flex items-center">
              <FaPaperPlane className="mr-3 text-purple-400" /> Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name field - improved design */}
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <motion.div 
                  className="relative"
                  onMouseEnter={() => setHoveredField('from_name')}
                  onMouseLeave={() => setHoveredField(null)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                  {/* Subtle glow effect on hover/focus */}
                  <motion.div 
                    className="absolute inset-0 -z-10 rounded-lg opacity-0 pointer-events-none"
                    animate={{ 
                      opacity: hoveredField === 'from_name' || document.activeElement?.id === 'from_name' ? 0.2 : 0,
                      boxShadow: hoveredField === 'from_name' || document.activeElement?.id === 'from_name' 
                        ? '0 0 20px 5px rgba(168, 85, 247, 0.3)' 
                        : '0 0 0px 0px rgba(168, 85, 247, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <motion.div 
                  className="relative"
                  onMouseEnter={() => setHoveredField('from_email')}
                  onMouseLeave={() => setHoveredField(null)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="your.email@example.com"
                  />
                  {/* Subtle glow effect on hover/focus */}
                  <motion.div 
                    className="absolute inset-0 -z-10 rounded-lg opacity-0 pointer-events-none"
                    animate={{ 
                      opacity: hoveredField === 'from_email' || document.activeElement?.id === 'from_email' ? 0.2 : 0,
                      boxShadow: hoveredField === 'from_email' || document.activeElement?.id === 'from_email' 
                        ? '0 0 20px 5px rgba(168, 85, 247, 0.3)' 
                        : '0 0 0px 0px rgba(168, 85, 247, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              
              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <motion.div 
                  className="relative"
                  onMouseEnter={() => setHoveredField('message')}
                  onMouseLeave={() => setHoveredField(null)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white resize-none placeholder-gray-500"
                    placeholder="Your message..."
                  ></textarea>
                  {/* Subtle glow effect on hover/focus */}
                  <motion.div 
                    className="absolute inset-0 -z-10 rounded-lg opacity-0 pointer-events-none"
                    animate={{ 
                      opacity: hoveredField === 'message' || document.activeElement?.id === 'message' ? 0.2 : 0,
                      boxShadow: hoveredField === 'message' || document.activeElement?.id === 'message' 
                        ? '0 0 20px 5px rgba(168, 85, 247, 0.3)' 
                        : '0 0 0px 0px rgba(168, 85, 247, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              
              {/* Success/Error messages */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 rounded-lg bg-green-600/20 border border-green-500/30 text-green-300"
                >
                  Your message has been sent successfully! I will get back to you soon.
                </motion.div>
              )}
              
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300"
                >
                  {submitError}
                </motion.div>
              )}
              
              {/* Submit button with enhanced animation */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white rounded-lg group focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button background */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                        >
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
          
                    {/* Right side - Contact Info and Map */}
                    <div className="space-y-10">
            {/* Contact Information Card */}
            <motion.div 
              className="bg-gradient-to-br from-purple-900/20 via-black/60 to-blue-900/20 p-10 rounded-xl border border-white/10 backdrop-blur-md relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              viewport={{ once: true }}
            >
              {/* Animated reflective highlight */}
              <motion.div 
                className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-45"
                animate={{ 
                  left: ['100%', '-100%'],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear",
                  delay: 1.5
                }}
              />
              
              <h3 className="text-2xl font-bold mb-10 text-white">Lets Connect</h3>
              
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-purple-400 text-xl">{item.icon}</span>
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                      <div className="font-medium text-white text-lg">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-6 text-white">Find me online</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-gray-300 hover:text-purple-400 hover:border-purple-400/50 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: '0 0 20px 2px rgba(168, 85, 247, 0.3)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Location Card with enhanced map */}
            <motion.div 
              className="bg-gradient-to-br from-purple-900/20 via-black/60 to-blue-900/20 p-10 rounded-xl border border-white/10 backdrop-blur-md relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-white">Location</h3>
              <div className="aspect-video rounded-lg overflow-hidden border border-white/10 relative">
                {/* Fake map with animated elements */}
                <div className="absolute inset-0 bg-[url('/map.png')] bg-cover bg-center opacity-70"></div>
                
                {/* Map overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                
                {/* City grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                {/* Location marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="relative"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "easeInOut" 
                    }}
                  >
                    {/* Animated pulsing circles */}
                    <div className="absolute -inset-1">
                      <motion.div
                        className="w-14 h-14 rounded-full bg-purple-500/20"
                        animate={{ 
                          scale: [1, 2.5, 1],
                          opacity: [0.4, 0, 0.4]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    
                    {/* Location dot */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white shadow-lg shadow-purple-500/30"></div>
                  </motion.div>
                </div>
                
                {/* Location label */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 text-white text-base font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  New Delhi, India
                </motion.div>
              </div>
              
              {/* Available status */}
              <div className="flex items-center mt-8">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-medium">Available for work!!</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Copyright and Made With Footer */}
        <motion.div 
          className="mt-24 pt-10 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GlitchZap. All rights reserved.
            </div>
            
            {/* Made With */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>Made with</span>
              <motion.span
                className="mx-1 text-red-400"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  repeatType: "loop" 
                }}
              >
                <FaHeart />
              </motion.span>
              <span>using</span>
              <span className="ml-1 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 font-medium">
                Next.js, TypeScript & Tailwind CSS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}