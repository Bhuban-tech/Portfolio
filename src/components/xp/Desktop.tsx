import { useWindowManager } from '../../context/WindowManager';
import { Taskbar } from './Taskbar';
import { WindowFrame } from './WindowFrame';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';
import { Resume } from '../sections/Resume';
import { Contact } from '../sections/Contact';
import { Testimonials } from '../sections/Testimonials';
import { SMSDashboard } from '../sections/SMSDashboard';
import { Terminal } from '../sections/Terminal';
import { User, Briefcase, Star, Mail, Monitor } from 'lucide-react';
import './DesktopIcons.css';
import './RetroEffects.css';

import blissImg from '../../assets/bliss-bhuban.png';

const DesktopIcon = ({ label, icon, onClick, type }: { label: string, icon: any, onClick: () => void, type: 'ie' | 'pdf' | 'email' | 'system' | 'default' }) => (
    <div
        onClick={onClick}
        className="w-[80px] flex flex-col items-center gap-1 p-2 cursor-pointer rounded-sm hover:bg-[#316ac5]/40 group"
    >
        <div className="w-10 h-10 drop-shadow-xl relative flex items-center justify-center">
            {type === 'ie' && <div className="xp-icon-ie w-full h-full text-xl">e</div>}
            {type === 'pdf' && <div className="xp-icon-pdf w-8 h-10 flex items-center justify-center border border-gray-300"><div className="text-[8px] font-bold text-red-600 mt-2">PDF</div></div>}
            {type === 'email' && <div className="xp-icon-email w-full h-full flex items-center justify-center rounded-sm"><Mail size={20} /></div>}
            {type === 'system' && <div className="xp-icon-system w-full h-full flex items-center justify-center"><User size={20} className="text-white" /></div>}
            {type === 'default' && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg opacity-80" />
                    <div className="relative z-10 text-white drop-shadow-md">
                        {icon}
                    </div>
                </>
            )}
        </div>
        <span className="text-white text-xs text-center font-medium drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] line-clamp-2 bg-[#0b77e9]/0 group-hover:bg-[#0b77e9] px-1 rounded-sm">
            {label}
        </span>
    </div>
);

import { ShutdownDialog } from './ShutdownDialog';

export const Desktop = () => {
    const { openWindow, isShutdownModalOpen } = useWindowManager();

    return (
        <div className="absolute inset-0 bg-blue-500 overflow-hidden font-sans select-none">

            {/* Bliss Wallpaper */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: `url(${blissImg})`,
                    filter: 'saturate(1.2) contrast(1.1)'
                }}
            />

            {/* Desktop Icons Grid */}
            <div className="absolute top-0 left-0 bottom-[30px] w-full p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,80px)] gap-4 content-start items-start justify-start z-0">
                <DesktopIcon label="About Me" icon={User} type="system" onClick={() => openWindow('ABOUT', 'About Me')} />
                <DesktopIcon label="My Projects" icon={Briefcase} type="ie" onClick={() => openWindow('PROJECTS', 'My Projects')} />
                <DesktopIcon label="My Resume" icon={Star} type="pdf" onClick={() => openWindow('EXPERIENCE', 'My Resume')} />
                <DesktopIcon label="Contact Me" icon={Mail} type="email" onClick={() => openWindow('CONTACT', 'Contact Me')} />
                <DesktopIcon label="Command Prompt" icon={<Monitor size={24} />} type="default" onClick={() => openWindow('TERMINAL', 'Command Prompt')} />
                <DesktopIcon label="Testimonials" icon={<Star size={24} />} type="default" onClick={() => openWindow('TESTIMONIALS', 'Testimonials')} />
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Only allow pointer events on the windows themselves */}
                <div className="w-full h-full pointer-events-auto">
                    <WindowFrame id="ABOUT" title="About Me">
                        <About />
                    </WindowFrame>
                    <WindowFrame id="PROJECTS" title="My Projects" hideMenuBar>
                        <Projects />
                    </WindowFrame>
                    <WindowFrame id="SKILLS" title="My Skills">
                        <Skills />
                    </WindowFrame>
                    <WindowFrame id="EXPERIENCE" title="My Resume">
                        <Resume />
                    </WindowFrame>
                    <WindowFrame id="CONTACT" title="Contact Me">
                        <Contact />
                    </WindowFrame>
                    <WindowFrame id="TESTIMONIALS" title="Testimonials">
                        <Testimonials />
                    </WindowFrame>
                    <WindowFrame id="SMS_DASHBOARD" title="KritimSMS Dashboard">
                        <SMSDashboard />
                    </WindowFrame>
                    <WindowFrame id="TERMINAL" title="Command Prompt" hideMenuBar>
                        <Terminal />
                    </WindowFrame>
                </div>
            </div>

            {/* Shutdown Dialog Overlay */}
            {isShutdownModalOpen && <ShutdownDialog />}

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
};
