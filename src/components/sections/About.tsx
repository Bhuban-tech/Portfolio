import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import profileImg from '../../assets/profile-suit.png';

import { PORTFOLIO_DATA, ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const About = () => {
    const { title, tag, description, stats } = PORTFOLIO_DATA.about;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // "Like big then go in side": Image scales down as you scroll into view
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.4, 1]);
    const imageRotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} id="about" className="min-h-screen flex items-center justify-center bg-black/90 py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono tracking-wider">
                        {tag}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                        {title.split(' ').map((word, i) => i === 1 ? <span key={i} className="text-accent">{word} </span> : word + ' ')}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        {description}
                    </p>
                    <p className="text-xs text-accent/50 mb-8 font-mono animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.sectionDividers[0]}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-card-bg/5 border border-border-color/10 flex items-center gap-4 hover:border-accent/50 transition-colors shadow-sm dark:shadow-none hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] group/stat">
                                <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover/stat:rotate-12 transition-transform">
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground group-hover/stat:text-accent transition-colors">{stat.label}</h4>
                                    <p className="text-sm text-gray-400">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual / Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-black border border-border-color/10 relative group shadow-2xl">
                        {/* Decorative glowing gradient behind */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:text-accent transition-colors">
                            <motion.img
                                style={{ scale: imageScale, rotate: imageRotate, opacity: imageOpacity }}
                                src={profileImg}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-neon-purple/10 rounded-full blur-xl" />
                </motion.div>
            </div>
        </section>
    );
};
