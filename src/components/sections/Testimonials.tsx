import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { PORTFOLIO_DATA, ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const Testimonials = () => {
    const { title, tag, description, items } = PORTFOLIO_DATA.testimonials;

    return (
        <section id="testimonials" className="min-h-screen py-24 px-6 bg-background relative overflow-hidden flex items-center justify-center">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono tracking-wider">
                        {tag}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white">
                        {title.split(' ').map((word, i) => i === 0 ? word + ' ' : <span key={i} className="text-neon-purple">{word}</span>)}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        {description}
                    </p>
                    <p className="text-xs text-accent/50 font-mono animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.visual[0]}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="bg-card-bg/5 backdrop-blur-md border border-border-color/10 p-8 rounded-2xl relative hover:bg-card-bg/10 hover:border-accent/30 transition-all shadow-lg group"
                        >
                            <Quote className="absolute top-8 right-8 text-accent/20 w-12 h-12 rotate-180 group-hover:text-accent/40 transition-colors" />

                            <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-neon-purple flex items-center justify-center text-black font-bold text-xl">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-accent transition-colors">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
