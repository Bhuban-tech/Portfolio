import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useWindowManager } from '../../context/WindowManager';

import type { ReactNode } from 'react';

interface WindowFrameProps {
    id: any;
    title: string;
    children: ReactNode;
    initialPos?: { x: number, y: number };
    hideMenuBar?: boolean;
}

export const WindowFrame = ({ id, title, children, initialPos = { x: 50, y: 50 }, hideMenuBar = false }: WindowFrameProps) => {
    const { closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow, openWindows } = useWindowManager();
    const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
    const windowState = openWindows.find(w => w.id === id);
    const controls = useDragControls();

    if (!windowState || !windowState.isOpen) return null;

    const isMaximized = windowState.isMaximized;

    return (
        <motion.div
            drag={!isMaximized}
            dragControls={controls}
            dragListener={false} // Only drag from title bar
            dragMomentum={false}
            initial={initialPos}
            animate={isMaximized ? {
                x: 0,
                y: 0,
                width: "100%",
                height: "calc(100% - 30px)",
                borderRadius: 0
            } : {
                width: "min(800px, 95vw)",
                height: "min(600px, 80vh)",
                borderRadius: "0.5rem"
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
                zIndex: windowState.zIndex,
                display: windowState.isMinimized ? 'none' : 'flex',
                position: 'absolute'
            }}
            onPointerDown={() => focusWindow(id)}
            className={`flex flex-col bg-[#ECE9D8] shadow-2xl overflow-hidden border border-[#00138c] ${isMaximized ? '' : 'rounded-t-lg'}`}
        >
            {/* Title Bar */}
            <div
                onPointerDown={(e) => {
                    if (!isMaximized) {
                        controls.start(e);
                    }
                    focusWindow(id);
                }}
                onDoubleClick={() => toggleMaximizeWindow(id)}
                className="h-[30px] bg-gradient-to-r from-[#0058ee] via-[#3593ff] to-[#288eff] flex items-center justify-between px-2 cursor-default select-none shadow-sm flex-shrink-0"
            >
                <div className="flex items-center gap-2 text-white font-bold text-sm drop-shadow-md">
                    <div className="w-4 h-4 bg-white/20 rounded-sm" /> {/* App Icon */}
                    <span>{title}</span>
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-[21px] h-[21px] bg-gradient-to-b from-[#288eff] to-[#1e6fcf] hover:brightness-110 active:brightness-90 rounded-[2px] flex items-center justify-center border border-white/40 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] text-white">
                        <Minus size={14} strokeWidth={4} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(id); }} className={`w-[21px] h-[21px] bg-gradient-to-b from-[#288eff] to-[#1e6fcf] hover:brightness-110 active:brightness-90 rounded-[2px] flex items-center justify-center border border-white/40 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] text-white ${isMaximized ? 'opacity-80' : ''}`}>
                        <Square size={10} strokeWidth={3} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-[21px] h-[21px] bg-gradient-to-b from-[#e34234] to-[#bf2e22] hover:brightness-110 active:brightness-90 rounded-[2px] flex items-center justify-center border border-white/40 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] text-white ml-0.5">
                        <X size={14} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-white relative flex flex-col">
                {!hideMenuBar && (
                    <div className="h-[22px] bg-[#ECE9D8] flex items-center gap-4 px-2 text-xs border-b border-gray-300 select-none text-black z-10 flex-shrink-0 relative">
                        <div className="relative">
                            <span
                                className={`cursor-default px-1 ${isFileMenuOpen ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white'}`}
                                onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
                            >
                                File
                            </span>
                            {isFileMenuOpen && (
                                <div className="absolute top-full left-0 w-32 bg-[#fafafa] border border-[#aca899] shadow-[2px_2px_0_rgba(0,0,0,0.2)] z-[100] flex flex-col py-1">
                                    <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => setIsFileMenuOpen(false)}>New Folder</button>
                                    <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => setIsFileMenuOpen(false)}>Properties</button>
                                    <div className="h-[1px] bg-[#aca899] my-1 mx-1" />
                                    <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => { setIsFileMenuOpen(false); closeWindow(id); }}>Close</button>
                                </div>
                            )}
                        </div>
                        {isFileMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsFileMenuOpen(false)} />}
                        <span>Edit</span>
                        <span>View</span>
                        <span>Favorites</span>
                        <span>Tools</span>
                        <span>Help</span>
                    </div>
                )}

                <div className={`flex-1 overflow-auto ${hideMenuBar ? '' : 'p-4 mt-0'}`}>
                    {children}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-[20px] bg-[#ECE9D8] border-t border-gray-300 flex items-center px-2 text-[10px] text-gray-600 select-none flex-shrink-0">
                Done
            </div>
        </motion.div>
    );
};
