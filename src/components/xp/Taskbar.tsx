import { useState } from 'react';
import { useWindowManager } from '../../context/WindowManager';
import { Volume2, Shield, Info, Database, Monitor } from 'lucide-react';
import { StartMenu } from './StartMenu';
import './RetroEffects.css';

// Helper for real-time clock
const Clock = () => {
    const [time, setTime] = useState(new Date());

    // In a real app we'd use useEffect interval, simplified here or assume parent tick
    // For now mostly static or just initial render time is ok for MVP unless user stares at it
    // Let's add interval for liveliness
    useState(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    });

    return (
        <div className="text-white text-xs font-sans px-2 flex items-center h-full bg-[#0b77e9] bg-gradient-to-b from-[#1290e8] to-[#0b77e9] border-l border-[#1999ee] shadow-[inset_1px_0_0_0_rgba(0,0,0,0.2)]">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
    );
};

// Windows XP Logo Icon Component
const WindowsXPLogo = () => (
    <div className="flex gap-[1.5px] scale-[0.85] mr-1.5 transform rotate-[-5deg] drop-shadow-sm group-hover:scale-95 transition-transform duration-300">
        <div className="flex flex-col gap-[1.5px]">
            <div className="w-[11px] h-[9px] bg-[#f26333] rounded-tl-[2px] skew-y-[-10deg] shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.3)] border-[0.5px] border-[#ff8e6b]/30" />
            <div className="w-[11px] h-[9px] bg-[#0052cc] rounded-bl-[2px] skew-y-[-10deg] shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.3)] border-[0.5px] border-[#4d86e0]/30" />
        </div>
        <div className="flex flex-col gap-[1.5px] mt-[1px]">
            <div className="w-[11px] h-[9px] bg-[#75bb2a] rounded-tr-[2px] skew-y-[-10deg] shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.3)] border-[0.5px] border-[#9ed661]/30" />
            <div className="w-[11px] h-[9px] bg-[#fabb02] rounded-br-[2px] skew-y-[-10deg] shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.3)] border-[0.5px] border-[#ffe06b]/30" />
        </div>
    </div>
);

export const Taskbar = () => {
    const { openWindows, minimizeWindow, focusWindow } = useWindowManager();
    const [isStartOpen, setIsStartOpen] = useState(false);

    return (
        <>
            {/* Start Menu Overlay */}
            {isStartOpen && (
                <div className="absolute bottom-[30px] left-0 z-[1000]">
                    <StartMenu onClose={() => setIsStartOpen(false)} />
                </div>
            )}

            {/* Overlay to close start menu on click outside */}
            {isStartOpen && <div className="fixed inset-0 z-[990]" onClick={() => setIsStartOpen(false)} />}

            {/* Taskbar Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#245edb] border-t border-[#4686ea] shadow-[0_-2px_4px_rgba(0,0,0,0.2)] flex items-center z-[2000] select-none">

                {/* Start Button */}
                <button
                    onClick={() => setIsStartOpen(!isStartOpen)}
                    className="h-full px-3 flex items-center gap-1 rounded-r-[15px] 
                    bg-gradient-to-b from-[#3ea534] via-[#3a9648] to-[#1e5821] 
                    hover:brightness-110 active:brightness-90 transition-all
                    shadow-[inset_2px_2px_2px_rgba(255,255,255,0.4),2px_0_5px_rgba(0,0,0,0.3)] mr-2 relative overflow-hidden group"
                    style={{
                        boxShadow: 'inset 2px 2px 2px rgba(255,255,255,0.4), 2px 0 5px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className="italic font-bold text-white text-lg drop-shadow-md flex items-center">
                        <WindowsXPLogo />
                        <span className="mb-[1px]">start</span>
                    </div>
                </button>

                {/* Quick Launch / Divider */}
                <div className="w-[2px] h-[80%] bg-black/20 mx-1 border-r border-white/20" />

                {/* Window Tabs */}
                <div className="flex-1 flex items-center gap-1 px-1 overflow-hidden">
                    {openWindows.map((win) => {
                        // Determine if this window is currently active (highest zIndex among open, non-minimized windows)
                        const isTopmost = !win.isMinimized && openWindows
                            .filter(w => !w.isMinimized)
                            .every(w => w.zIndex <= win.zIndex);

                        return (
                            <button
                                key={win.id}
                                onClick={() => {
                                    if (win.isMinimized || !isTopmost) {
                                        focusWindow(win.id);
                                    } else {
                                        minimizeWindow(win.id);
                                    }
                                }}
                                className={`
                                    h-[22px] max-w-[150px] w-full flex items-center gap-2 px-2 text-xs text-white rounded-[2px]
                                    ${!win.isMinimized && isTopmost ? 'bg-[#1e52b7] shadow-[inset_2px_2px_2px_rgba(0,0,0,0.4)] opacity-100 font-bold' : ''}
                                    ${!win.isMinimized && !isTopmost ? 'bg-[#3c81f3] hover:bg-[#5394fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] opacity-90' : ''}
                                    ${win.isMinimized ? 'bg-[#3c81f3] hover:bg-[#5394fb] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] opacity-80' : ''}
                                    transition-colors truncate
                                `}
                            >
                                <div className="w-4 h-4 bg-gray-400 rounded-sm" /> {/* Placeholder icon */}
                                <span className="truncate">{win.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* System Tray (Notification Area) */}
                <div className="h-full bg-[#0b77e9] border-l border-[#1fa3ec] pl-2 pr-2 flex items-center gap-1.5 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] relative overflow-hidden">
                    <div className="crt-overlay opacity-20" />

                    <div className="flex items-center gap-1.5 px-1">
                        <Shield className="w-3.5 h-3.5 text-[#3ea41d] xp-glow" />
                        <Info className="w-3.5 h-3.5 text-white xp-glow" />
                        <Database className="w-3.5 h-3.5 text-[#e0e0e0] xp-glow" />
                    </div>

                    <div className="w-[1px] h-4 bg-black/20 mx-0.5" />

                    <button
                        onClick={() => {
                            if (!document.fullscreenElement) {
                                document.documentElement.requestFullscreen();
                            } else {
                                if (document.exitFullscreen) {
                                    document.exitFullscreen();
                                }
                            }
                        }}
                        className="hover:bg-white/10 p-0.5 rounded transition-colors"
                        title="Toggle Fullscreen"
                    >
                        <Monitor className="w-3.5 h-3.5 text-white" />
                    </button>

                    <Volume2 className="w-4 h-4 text-white" />
                    <Clock />
                </div>
            </div>
        </>
    );
};
