import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
    // Determine progress visually or use a ref if logic requires it, but for simple timer we don't need state re-renders if just for logic
    // actually we are using it to trigger completion. Let's keep it but use it or remove if not needed for render.
    // The previous implementation used it to check >= 100.
    // To silence the warning, we can just use a ref or ignore it since it causes re-renders which is fine for a loading bar if we mapped it to width.
    // But here the width is animated by framer-motion independently.

    useEffect(() => {
        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += 2;
            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 500);
            }
        }, 50);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] font-sans">
            <div className="mb-16 flex flex-col items-center">
                {/* Windows XP Logo (CSS/SVG Version) */}
                <div className="flex gap-2 mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 bg-[#f26333] rounded-tl-xl skew-x-[-10deg] shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2)] border border-[#ff8e6b]" />
                        <div className="w-12 h-12 bg-[#0052cc] rounded-bl-xl skew-x-[-10deg] shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2)] border border-[#4d86e0]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 bg-[#75bb2a] rounded-tr-xl skew-x-[-10deg] shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2)] border border-[#9ed661]" />
                        <div className="w-12 h-12 bg-[#fabb02] rounded-br-xl skew-x-[-10deg] shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2)] border border-[#ffe06b]" />
                    </div>
                </div>

                <h1 className="text-white text-5xl font-bold tracking-tighter flex items-end gap-2 mt-4">
                    <span className="font-sans">Bhuban</span>
                    <span className="text-[#ff6600] text-3xl mb-1 align-baseline relative -top-3">xp</span>
                </h1>
                <p className="text-white/80 text-xl font-medium tracking-widest mt-2 uppercase">
                    Software Developer
                </p>
            </div>

            {/* Loading Bar */}
            <div className="w-64 h-5 border-[2px] border-[#b2b2b2] rounded-sm p-[2px] relative overflow-hidden bg-transparent">
                <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-[#2d66cf] to-transparent w-24 absolute top-0"
                    animate={{
                        x: [-100, 300]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                >
                    <div className="w-full h-full flex gap-1">
                        <div className="w-2 h-full bg-[#528af2]" />
                        <div className="w-2 h-full bg-[#528af2]" />
                        <div className="w-2 h-full bg-[#528af2]" />
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 text-white font-bold italic text-sm tracking-wider flex items-center gap-1 opacity-70">
                <span className="font-serif">Bhuban Bhandari</span>
                <span className="text-[10px] align-top">®</span>
            </div>
        </div>
    );
};
