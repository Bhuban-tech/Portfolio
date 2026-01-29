import { useWindowManager } from '../../context/WindowManager';
import { User, Briefcase, Mail, LogOut, Linkedin, Github, Instagram, Image, Clock, Play, Music, Gamepad2, ChevronRight, Power } from 'lucide-react';
import profileImg from '../../assets/profile-suit.png';
import './StartMenuIcons.css';

export const StartMenu = ({ onClose }: { onClose: () => void }) => {
    const { logout, openWindow, openShutdownModal } = useWindowManager();

    const handleOpen = (id: any, title: string) => {
        openWindow(id, title);
        onClose();
    };

    const openLink = (url: string) => {
        window.open(url, '_blank');
        onClose();
    };

    return (
        <div className="w-[380px] h-[520px] bg-white rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden font-sans border-2 border-[#245edb] select-none">
            {/* Header */}
            <div className="h-[72px] bg-gradient-to-b from-[#245edb] to-[#4585f3] flex items-center px-4 gap-4 border-b border-orange-400 shadow-md relative z-10 overflow-hidden">
                <div className="w-14 h-14 rounded-full border-2 border-white/80 overflow-hidden bg-yellow-200 shadow-xl relative z-20 group cursor-pointer hover:scale-105 transition-all">
                    <img
                        src={profileImg}
                        alt="User"
                        className="w-full h-full object-cover brightness-[1.1] contrast-[1.1] saturate-[1.2] group-hover:brightness-[1.2] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none" />
                </div>
                <div className="flex flex-col relative z-20">
                    <span className="text-white font-bold text-lg drop-shadow-md tracking-wide leading-none">Bhuban Bhandari</span>
                    <span className="text-blue-100 text-xs font-light tracking-wider opacity-80 mt-0.5">Software Developer</span>
                </div>

                {/* Cinematic Gloss effects */}
                <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                <div className="absolute -right-4 -top-10 w-32 h-32 bg-white/10 blur-2xl rounded-full pointer-events-none" />
            </div>

            {/* Body */}
            <div className="flex-1 flex relative">
                <div className="absolute top-0 bottom-0 left-0 w-full bg-white" /> {/* Left background */}

                {/* Left Column (White) - Programs */}
                <div className="relative w-[190px] bg-white py-2 flex flex-col gap-1 z-10 pl-1 pr-1">

                    <div className="px-1 text-[10px] uppercase font-bold text-gray-400 mb-1 hidden">Internet</div>
                    <button onClick={() => handleOpen('PROJECTS', 'My Projects')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-8 h-8 flex-shrink-0">
                            {/* Custom IE-style icon */}
                            <div className="w-full h-full bg-[#e3e9f0] rounded-full border border-blue-200 flex items-center justify-center text-blue-500 font-serif font-extrabold italic text-xl shadow-sm">e</div>
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                            <span className="font-bold text-sm text-[#333] group-hover:text-white">My Projects</span>
                            <span className="text-[10px] text-gray-500 group-hover:text-blue-100">View my work</span>
                        </div>
                    </button>

                    <button onClick={() => handleOpen('CONTACT', 'Contact Me')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-sm transform rotate-3" />
                            <div className="absolute inset-0 flex items-center justify-center text-[#245edb]"><Mail size={24} /></div>
                            <div className="absolute -bottom-1 -right-1 bg-orange-400 rounded-full w-3 h-3 border border-white" />
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                            <span className="font-bold text-sm text-[#333] group-hover:text-white">Contact Me</span>
                            <span className="text-[10px] text-gray-500 group-hover:text-blue-100">Send a message</span>
                        </div>
                    </button>

                    {/* Common Apps List */}
                    <div className="mt-1 flex flex-col gap-0.5">
                        <button onClick={() => handleOpen('ABOUT', 'About Me')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                <div className="w-full h-full bg-gray-200 rounded-full border border-gray-400 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-green-300 to-green-500" />
                                    <User size={14} className="text-white relative z-10 mx-auto mt-1" />
                                </div>
                            </div>
                            <span className="text-sm text-[#333] group-hover:text-white">About Me</span>
                        </button>

                        <button className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[#4caf50]">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-sm text-[#333] group-hover:text-white"></span>
                        </button>

                        <button onClick={() => handleOpen('TESTIMONIALS', 'Testimonials')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-blue-500">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <span className="text-sm text-[#333] group-hover:text-white">Media Player</span>
                        </button>

                        <button className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-yellow-600">
                                <Gamepad2 size={20} />
                            </div>
                            <span className="text-sm text-[#333] group-hover:text-white">World of Warcraft</span>
                        </button>

                        <button className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors text-left">
                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-purple-500">
                                <Music size={20} />
                            </div>
                            <span className="text-sm text-[#333] group-hover:text-white">Music Player</span>
                        </button>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center justify-center py-2 border-t border-gray-200">
                        <button className="flex items-center gap-1 font-bold text-xs hover:bg-[#316ac5] hover:text-white px-2 py-1 rounded-[2px] transition-colors w-full justify-center">
                            All Programs
                            <div className="w-4 h-4 bg-[#238a31] rounded-full flex items-center justify-center text-white">
                                <ChevronRight size={10} strokeWidth={4} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Column (Blue) - System & Socials */}
                <div className="relative w-[186px] bg-[#d3e5fa] border-l border-[#95bdee] py-2 flex flex-col gap-1 z-10 px-1 shadow-[inset_3px_0_10px_-5px_rgba(0,0,0,0.1)]">

                    {/* Socials */}
                    <button onClick={() => openLink('https://instagram.com')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 start-icon-instagram flex-shrink-0">
                            <Instagram size={16} />
                        </div>
                        <span className="text-sm font-bold text-[#1e2e4e] group-hover:text-white">Instagram</span>
                    </button>

                    <button onClick={() => openLink('https://github.com/Bhuban-Bhandari')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 start-icon-github flex-shrink-0">
                            <Github size={16} />
                        </div>
                        <span className="text-sm font-bold text-[#1e2e4e] group-hover:text-white">Github</span>
                    </button>

                    <button onClick={() => openLink('https://linkedin.com')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 start-icon-linkedin flex-shrink-0">
                            <Linkedin size={16} />
                        </div>
                        <span className="text-sm font-bold text-[#1e2e4e] group-hover:text-white">LinkedIn</span>
                    </button>

                    <div className="my-1 border-t border-[#aebdd6] border-b border-white opacity-50" />

                    {/* System */}
                    <button className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <Clock size={20} className="text-[#1e2e4e] group-hover:text-white" />
                        </div>
                        <div className="flex items-center gap-1 flex-1">
                            <span className="text-sm text-[#1e2e4e] group-hover:text-white">Recently Used</span>
                            <ChevronRight size={10} className="ml-auto text-[#1e2e4e] group-hover:text-white" />
                        </div>
                    </button>

                    <button onClick={() => handleOpen('TERMINAL', 'Command Prompt')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 bg-black rounded-[2px] flex items-center justify-center flex-shrink-0 border border-gray-500">
                            <span className="text-white font-mono text-[10px] font-bold">C:\_</span>
                        </div>
                        <span className="text-sm text-[#1e2e4e] group-hover:text-white">Command Prompt</span>
                    </button>

                    <button className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Image size={20} className="group-hover:text-white" />
                        </div>
                        <span className="text-sm text-[#1e2e4e] group-hover:text-white">Image Viewer</span>
                    </button>

                    <button onClick={() => handleOpen('EXPERIENCE', 'My Resume')} className="group flex items-center gap-2 p-1.5 hover:bg-[#316ac5] hover:text-white rounded-[2px] transition-colors">
                        <div className="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-300 relative">
                            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-sm" />
                            <span className="text-[6px] font-bold text-gray-800">PDF</span>
                        </div>
                        <span className="text-sm font-bold text-[#1e2e4e] group-hover:text-white">My Resume</span>
                    </button>

                </div>
            </div>

            {/* Footer */}
            <div className="h-[44px] bg-gradient-to-b from-[#4585f3] to-[#245edb] flex items-center justify-end px-4 gap-3 shadow-[inset_0_3px_5px_rgba(0,0,0,0.2)] border-t border-[#346dc2]">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-2 py-1 bg-[#e99f16] hover:bg-[#f3a426] text-white text-xs rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.3)] border border-[#a86500] hover:scale-[1.02] active:scale-95 transition-all"
                >
                    <LogOut size={14} className="text-white drop-shadow-md" />
                    <span className="font-bold drop-shadow-md">Log Off</span>
                </button>
                <button
                    onClick={() => {
                        openShutdownModal();
                        onClose();
                    }}
                    className="flex items-center gap-2 px-2 py-1 bg-[#d5362e] hover:bg-[#e6473f] text-white text-xs rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.3)] border border-[#851813] hover:scale-[1.02] active:scale-95 transition-all"
                >
                    <Power size={14} className="text-white drop-shadow-md" />
                    <span className="font-bold drop-shadow-md">Shut Down</span>
                </button>
            </div>
        </div>
    );
};
