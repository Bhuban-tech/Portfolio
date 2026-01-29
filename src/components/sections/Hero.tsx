import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

import { ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const Hero = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">

            {/* Background Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-accent mb-4 uppercase">
                        Senior Full Stack Developer
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold font-heading tracking-tight mb-8"
                >
                    Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Bhuban</span>. <br />
                    Architecting <span className="text-accent underline decoration-2 decoration-accent/50 underline-offset-8">Excellence</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Transforming complex ideas into high-performance, cinematic digital experiences. Specializing in scalable React & Node.js systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-3 bg-foreground text-background font-semibold rounded-full overflow-hidden transition-all hover:scale-105"
                    >
                        <div className="absolute inset-0 w-full h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                            View Work <ArrowRight className="w-4 h-4" />
                        </span>
                    </a>

                    <a
                        href="#contact"
                        className="px-8 py-3 border border-foreground/10 hover:bg-foreground/5 rounded-full backdrop-blur-sm transition-all hover:border-accent/50 hover:text-accent text-foreground"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-center"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-gray-500 animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.scroll[0]}
                    </span>
                    <ChevronDown className="w-6 h-6 text-accent animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
};
