import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

import { PORTFOLIO_DATA, ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const Contact = () => {
    const { title, tag, description, email, location } = PORTFOLIO_DATA.contact;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate sending
        setTimeout(() => {
            alert('Message sent through the antigravity portal!');
            setFormState({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section id="contact" className="min-h-screen py-20 px-6 flex items-center justify-center bg-background relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono tracking-wider">
                        {tag}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        {title.split(' ').map((word, i) => i === 0 ? word + ' ' : <span key={i} className="text-accent">{word}</span>)}
                    </h2>
                    <p className="text-gray-400">
                        {description}
                    </p>
                    <p className="text-xs text-accent/50 mt-4 mb-12 font-mono animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.sectionDividers[2]}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 bg-card-bg/5 border border-border-color/10 rounded-full text-accent">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Email</h4>
                                <p className="text-sm">{email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 bg-card-bg/5 border border-border-color/10 rounded-full text-accent">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">Location</h4>
                                <p className="text-sm">{location}</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                {[Github, Linkedin, Twitter].map((Icon, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="p-3 bg-card-bg/5 border border-border-color/10 rounded-full hover:bg-accent hover:text-black transition-all hover:scale-110 text-foreground"
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-card-bg/5 border border-border-color/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-card-bg/10 transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-card-bg/5 border border-border-color/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-card-bg/10 transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-card-bg/5 border border-border-color/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:bg-card-bg/10 transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-accent text-black font-bold rounded-lg hover:bg-accent/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
