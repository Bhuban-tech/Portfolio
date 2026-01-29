import { motion } from 'framer-motion';

import { PORTFOLIO_DATA, ATMOSPHERIC_DESCRIPTIONS } from '../../data/portfolioData';

export const Skills = () => {
    const { title, tag, description, groups } = PORTFOLIO_DATA.skills;

    // Fallback Mock Data if fetching fails or loading (Optional: or show skeleton)
    const displayData = groups;

    return (
        <section id="skills" className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden bg-background">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="mb-4 inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono tracking-wider">
                        {tag}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        {title.split(' ').map((word, i) => i === 0 ? <span key={i} className="text-neon-purple">{word} </span> : word + ' ')}
                    </h2>
                    <p className="text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <p className="text-xs text-accent/50 mt-4 font-mono animate-pulse">
                        {ATMOSPHERIC_DESCRIPTIONS.microInteractions[1]}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayData.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-card-bg/5 backdrop-blur-sm border border-border-color/10 rounded-2xl p-8 hover:bg-card-bg/10 hover:border-accent/30 transition-all group shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-xl font-bold mb-6 text-foreground group-hover:text-accent transition-colors">
                                {group.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {group.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-card-bg/5 border border-border-color/10 rounded-full text-sm text-foreground/70 hover:text-foreground hover:border-accent hover:bg-accent/10 transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
