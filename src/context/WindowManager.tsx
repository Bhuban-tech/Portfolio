import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type WindowType = 'ABOUT' | 'PROJECTS' | 'SKILLS' | 'EXPERIENCE' | 'CONTACT' | 'TESTIMONIALS' | 'NOTEPAD' | 'SMS_DASHBOARD' | 'TERMINAL';

interface WindowState {
    id: WindowType;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface WindowManagerContextType {
    isBooting: boolean;
    completeBoot: () => void;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    openWindows: WindowState[];
    openWindow: (id: WindowType, title?: string) => void;
    closeWindow: (id: WindowType) => void;
    minimizeWindow: (id: WindowType) => void;
    toggleMaximizeWindow: (id: WindowType) => void;
    focusWindow: (id: WindowType) => void;
    isShutdownModalOpen: boolean;
    openShutdownModal: () => void;
    closeShutdownModal: () => void;
    shutdown: () => void;
    restart: () => void;
    isShuttingDown: boolean;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const WindowManagerProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state from localStorage if available
    const [isBooting, setIsBooting] = useState(() => {
        const saved = localStorage.getItem('isBooting');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved !== null ? JSON.parse(saved) : false;
    });

    const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const [isShutdownModalOpen, setIsShutdownModalOpen] = useState(false);
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    const completeBoot = () => {
        setIsBooting(false);
        localStorage.setItem('isBooting', 'false');
    };

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        // Play logout sound
        const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio play failed", e));

        // Small delay to allow sound to start
        setTimeout(() => {
            setIsLoggedIn(false);
            setIsBooting(true); // Optionally reset boot screen for next "session" or keep it false
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('isBooting', 'true');
            setOpenWindows([]);
        }, 1000);
    };

    const openShutdownModal = () => setIsShutdownModalOpen(true);
    const closeShutdownModal = () => setIsShutdownModalOpen(false);

    const shutdown = () => {
        setIsShutdownModalOpen(false);
        setIsShuttingDown(true);
        const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio play failed", e));

        setTimeout(() => {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('isBooting', 'true');
            // Just stay on a black screen or something
            // We'll set a state that App.tsx can use to show absolutely nothing
        }, 3000);
    };

    const restart = () => {
        setIsShutdownModalOpen(false);
        setIsShuttingDown(true);
        const audio = new Audio('https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error("Audio play failed", e));

        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('isBooting', 'true');
            window.location.reload();
        }, 3000);
    };

    const openWindow = (id: WindowType, title: string = 'Application') => {
        setOpenWindows((prev) => {
            const existing = prev.find((w) => w.id === id);
            if (existing) {
                // Bring to front if already open
                return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w);
            }
            setZIndexCounter(c => c + 1);
            return [...prev, { id, title: title, isOpen: true, isMinimized: false, isMaximized: false, zIndex: zIndexCounter + 1 }];
        });
        setZIndexCounter((prev) => prev + 1);
    };

    const closeWindow = (id: WindowType) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    };

    const minimizeWindow = (id: WindowType) => {
        setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
    };

    const toggleMaximizeWindow = (id: WindowType) => {
        setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    };

    const focusWindow = (id: WindowType) => {
        setZIndexCounter((prev) => prev + 1);
        setOpenWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w));
    };

    return (
        <WindowManagerContext.Provider value={{
            isBooting,
            completeBoot,
            isLoggedIn,
            login,
            logout,
            openWindows,
            openWindow,
            closeWindow,
            minimizeWindow,
            toggleMaximizeWindow,
            focusWindow,
            isShutdownModalOpen,
            openShutdownModal,
            closeShutdownModal,
            shutdown,
            restart,
            isShuttingDown
        }}>
            {children}
        </WindowManagerContext.Provider>
    );
};

export const useWindowManager = () => {
    const context = useContext(WindowManagerContext);
    if (context === undefined) {
        throw new Error('useWindowManager must be used within a WindowManagerProvider');
    }
    return context;
};
