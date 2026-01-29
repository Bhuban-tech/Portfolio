import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

import { PORTFOLIO_DATA, ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const Experience = () => {
    const { title, tag, description, items } = PORTFOLIO_DATA.experience;

    return (
        <section id="experience" className="min-h-screen py-20 px-6 bg-background">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono tracking-wider">
                        {tag}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        {title.split(' ').map((word, i) => i === 0 ? word + ' ' : <span key={i} className="text-neon-purple">{word}</span>)}
                    </h2>
                    <p className="text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <p className="text-xs text-accent/50 mt-4 font-mono animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.scroll[2]}
                    </p>
                </motion.div>

                <div className="relative border-l border-border-color/20 ml-6 md:ml-12 space-y-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot Indicator */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-accent shadow-[0_0_10px_rgba(0,243,255,0.5)]" />

                            <div className="bg-card-bg/5 border border-border-color/10 p-6 rounded-xl hover:bg-card-bg/10 transition-colors shadow-sm dark:shadow-none">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-foreground max-w-lg">{item.title}</h3>
                                    <span className="text-sm px-3 py-1 bg-accent/10 text-accent rounded-full w-fit">
                                        {item.period}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 mb-4">
                                    {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                                    <span className="font-medium">{item.company}</span>
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
