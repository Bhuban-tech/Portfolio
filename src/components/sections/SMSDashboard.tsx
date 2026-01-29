import { motion } from 'framer-motion';
import { MessageSquare, Zap, Shield, TrendingUp, ChevronRight, Globe, CheckCircle2 } from 'lucide-react';

const StatCard = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

export const SMSDashboard = () => {
    return (
        <div className="flex flex-col h-full bg-[#050505] text-white font-sans overflow-auto">
            {/* Hero Section */}
            <div className="relative pt-12 pb-8 px-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Trusted by 5,000+ businesses
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
                        >
                            Digital SMS service <br />
                            that <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">just works</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg mb-8 max-w-lg"
                        >
                            KritimSMS provides one-stop solutions for all your bulk SMS needs. Fast, reliable, and scalable messaging for modern businesses.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
                        >
                            <button className="px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 group">
                                Get Started
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all text-white font-medium">
                                Know More
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-4 mt-10 justify-center md:justify-start"
                        >
                            <MessageSquare className="text-cyan-500" size={20} />
                            <Zap className="text-yellow-500" size={20} />
                            <Shield className="text-emerald-500" size={20} />
                            <TrendingUp className="text-purple-500" size={20} />
                        </motion.div>
                    </div>

                    <div className="flex-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10 w-[240px] md:w-[280px] aspect-[9/19] bg-black border-[6px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
                        >
                            {/* Phone Screen Mockup */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-800 rounded-b-2xl z-20" />
                            <div className="p-4 pt-10 flex flex-col gap-3 h-full bg-[#0aa1a1]">
                                <div className="bg-white/90 rounded-xl h-16 w-full animate-pulse shadow-sm" />
                                <div className="bg-white/90 rounded-xl h-16 w-full animate-pulse delay-75 shadow-sm" />
                                <div className="bg-white/90 rounded-xl h-16 w-full animate-pulse delay-150 shadow-sm" />
                                <div className="mt-auto mb-4 flex justify-between">
                                    <div className="w-10 h-10 rounded-full bg-white/20" />
                                    <div className="w-10 h-10 rounded-full bg-white/20" />
                                    <div className="w-10 h-10 rounded-full bg-white/20" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative cards */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -right-4 top-20 z-20 w-32 h-44 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-3 border border-white/20 rotate-12 flex flex-col items-center justify-center gap-2"
                        >
                            <div className="w-full h-2 bg-white/30 rounded-full" />
                            <div className="w-3/4 h-2 bg-white/30 rounded-full" />
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mt-2">
                                <MessageSquare className="text-indigo-600" size={16} />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                            className="absolute -left-8 bottom-10 z-20 w-32 h-44 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-3 border border-white/20 -rotate-6 flex flex-col items-center justify-center gap-2"
                        >
                            <div className="w-full h-2 bg-white/30 rounded-full" />
                            <div className="w-3/4 h-2 bg-white/30 rounded-full" />
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mt-2">
                                <TrendingUp className="text-emerald-600" size={16} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats / Features Grid */}
            <div className="px-8 pb-20 max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <StatCard label="Messages Sent" value="2.4B+" />
                    <StatCard label="Active Clients" value="12k+" />
                    <StatCard label="Uptime Rate" value="99.9%" />
                    <StatCard label="Global Reach" value="190+" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Why choose KritimSMS?</h2>
                        <ul className="space-y-4">
                            {[
                                "99.9% Uptime Guarantee",
                                "Instant Delivery Tracking",
                                "Competitive Volume Pricing",
                                "24/7 Expert Priority Support",
                                "API Integration for Developers"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <CheckCircle2 size={20} className="text-cyan-500" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-8 rounded-3xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Globe className="text-cyan-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold mb-2">Global Connectivity</h3>
                        <p className="text-gray-400">Our SMPP infrastructure connects you directly to over 800 mobile networks worldwide, ensuring your messages reach their destination instantly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
