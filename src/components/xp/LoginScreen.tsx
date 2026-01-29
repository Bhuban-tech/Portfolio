import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowManager';
import { ChevronRight } from 'lucide-react';
import profileImg from '../../assets/profile-suit.png';
import { useState } from 'react';


export const LoginScreen = () => {
    const { login } = useWindowManager();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = () => {
        setIsLoggingIn(true);
        const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-startup.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio play failed", e));

        // Wait for welcome animation before actually logging in
        setTimeout(() => {
            login();
        }, 3000);
    };

    return (
        <div className="absolute inset-0 bg-[#003399] overflow-hidden flex flex-col font-sans select-none z-50">
            {/* Top Bar */}
            <div className="w-full h-[90px] bg-[#003399] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#003399] via-[#004e9a] to-[#003399]" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff8d40] to-transparent opacity-80" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center relative bg-gradient-to-r from-[#003399] via-[#104aaddd] to-[#003399]">
                <AnimatePresence mode="wait">
                    {!isLoggingIn ? (
                        <motion.div
                            key="login-selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.5 } }}
                            className="w-full max-w-5xl grid grid-cols-2 gap-0 relative z-10"
                        >
                            {/* Center Divider */}
                            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#7aaaff] to-transparent opacity-40 transform -translate-x-1/2" />

                            {/* Left Side - Logo */}
                            <div className="flex flex-col items-end pr-16 justify-center pb-20">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="text-right"
                                >
                                    <h1 className="text-white text-4xl font-bold tracking-tight mb-4 drop-shadow-xl flex items-center gap-2 justify-end">
                                        <span className="text-white italic text-6xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'Franklin Gothic Medium, Arial, sans-serif' }}>Bhuban</span>
                                        <span className="text-[#ff6600] text-3xl align-top relative -top-4 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">xp</span>
                                    </h1>
                                    <p className="text-white/90 text-2xl font-medium tracking-wide drop-shadow-md pl-20 uppercase" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                                        Professional
                                    </p>
                                </motion.div>
                            </div>

                            {/* Right Side - User Login */}
                            <div className="flex flex-col items-start pl-16 justify-center pb-20">
                                <div className="mb-6 text-white text-xl font-light tracking-wide opacity-90 drop-shadow-md">
                                    To begin, click on Bhuban Bhandari to login in
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="flex items-center gap-6 group cursor-pointer p-4 rounded-full hover:bg-[#004e9a]/30 transition-colors border border-transparent hover:border-white/20"
                                    onClick={handleLogin}
                                >
                                    <div className="relative w-24 h-24 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] overflow-hidden border-[3px] border-[#fff]/40 group-hover:border-[#fffdce] transition-all duration-500 bg-yellow-100 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]">
                                        <img
                                            src={profileImg}
                                            alt="User"
                                            className="w-full h-full object-cover brightness-[1.1] contrast-[1.1] saturate-[1.2] group-hover:brightness-[1.2] transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 pointer-events-none" />
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-white text-3xl font-normal drop-shadow-md group-hover:text-white transition-all duration-300" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                                            Bhuban Bhandari
                                        </span>
                                        <span className="text-white/70 text-sm font-light tracking-wide group-hover:text-blue-200 transition-colors uppercase">
                                            Software Developer
                                        </span>
                                        <span className="text-blue-200 text-xs mt-1 group-hover:text-white font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            Click to begin
                                        </span>
                                    </div>

                                    <div className="w-8 h-8 bg-gradient-to-b from-[#4bcf5e] to-[#40b350] rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-2 border border-[#fff]/50">
                                        <ChevronRight className="text-white w-6 h-6 drop-shadow-sm" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="welcome-screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center justify-center z-20"
                        >
                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-end">
                                    <h1 className="text-white italic text-8xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]" style={{ fontFamily: 'Franklin Gothic Medium, Arial, sans-serif' }}>
                                        welcome
                                    </h1>
                                </div>
                                <div className="w-[2px] h-32 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                <div className="flex items-center gap-6">
                                    <div className="relative w-32 h-32 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden border-[4px] border-white/80 bg-white/10 p-1">
                                        <img
                                            src={profileImg}
                                            alt="Welcome User"
                                            className="w-full h-full object-cover rounded-full brightness-[1.15] contrast-[1.1] saturate-[1.3] shadow-inner"
                                        />
                                        {/* Cinematic overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-white/20 pointer-events-none" />
                                        {/* Outer soft glow */}
                                        <div className="absolute inset-[-4px] rounded-full border-2 border-white/20 animate-pulse" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white text-4xl font-medium drop-shadow-lg" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                                            Bhuban Bhandari
                                        </span>
                                        <span className="text-white/80 text-xl font-light tracking-wider mt-1 drop-shadow-md">
                                            Loading your settings...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="h-[90px] bg-[#003399] relative flex items-center justify-between px-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff8d40] to-transparent opacity-80" />

                <div className="flex items-center gap-3">
                    {/* Empty space where Turn off computer was */}
                </div>

                <div className="flex">
                    <span className="text-white/60 text-sm italic text-right">
                        After you log on, you can add or change accounts. <br />
                        Just go to Control Panel and click User Accounts.
                    </span>
                </div>
            </div>
        </div>
    );
};
