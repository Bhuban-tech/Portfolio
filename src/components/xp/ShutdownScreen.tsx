import { motion } from 'framer-motion';

export const ShutdownScreen = () => {
    return (
        <div className="fixed inset-0 bg-[#003399] flex flex-col items-center justify-center z-[10000] font-sans">
            <div className="flex flex-col items-center gap-8">
                {/* Windows XP Logo Style */}
                <div className="flex gap-2 mb-4 opacity-80">
                    <div className="flex flex-col gap-2">
                        <div className="w-8 h-8 bg-[#f26333] rounded-tl-lg skew-x-[-10deg] border border-[#ff8e6b]" />
                        <div className="w-8 h-8 bg-[#0052cc] rounded-bl-lg skew-x-[-10deg] border border-[#4d86e0]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-8 h-8 bg-[#75bb2a] rounded-tr-lg skew-x-[-10deg] border border-[#9ed661]" />
                        <div className="w-8 h-8 bg-[#fabb02] rounded-br-lg skew-x-[-10deg] border border-[#ffe06b]" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-white text-3xl font-bold tracking-wide drop-shadow-md">
                        Windows is shutting down...
                    </h2>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-blue-200 text-sm font-medium italic tracking-widest uppercase"
                    >
                        Please wait
                    </motion.div>
                </div>
            </div>

            {/* Cinematic background effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>
    );
};
