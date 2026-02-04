import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Wifi,
    Volume2,
    Battery,
    ChevronDown,
    Search,
    Shield,
    Users,
    Github,
    CloudSun,
    LayoutDashboard,
    Sun,
    Moon,
    X,
    Minus,
    Maximize2,
    Code as CodeIcon,
    Award,
    Settings,
    LogOut,
    Monitor
} from 'lucide-react';
import Terminal from './Terminal';
import MusicPlayer from './apps/MusicPlayer';
import FileExplorer from './apps/FileExplorer';
import AboutApp from './apps/AboutApp';
import ShowcaseApp from './apps/ShowcaseApp';
import CodeEditor from './apps/CodeEditor';
import ProjectManager from './apps/ProjectManager';
import BlogApp from './apps/BlogApp';
import BootSequence from './BootSequence';
import { CustomIcons } from './components/CustomIcons';
import HackerBackground from './components/HackerBackground';
import './styles.css';

export type AppId = 'terminal' | 'music' | 'files' | 'about' | 'showcase' | 'editor' | 'project-mgr' | 'blog';
export type Persona = 'recruiter' | 'developer' | 'guest' | 'hacker';

interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

const DESKTOP_BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

const ALL_APPS = [
    { id: 'terminal', name: 'Terminal', icon: <CustomIcons.terminal size={48} /> },
    { id: 'files', name: 'Files', icon: <CustomIcons.files size={48} /> },
    { id: 'about', name: 'About Me', icon: <CustomIcons.about size={48} /> },
    { id: 'showcase', name: 'Showcase', icon: <CustomIcons.showcase size={48} /> },
    { id: 'editor', name: 'Dev Studio', icon: <CustomIcons.terminal size={48} color="#0E8EE9" /> },
    { id: 'project-mgr', name: 'Operations', icon: <CustomIcons.showcase size={48} color="#38A169" /> },
    { id: 'blog', name: 'Dev Blog', icon: <CustomIcons.contact size={48} color="#772953" /> },
    { id: 'music', name: 'Music', icon: <CustomIcons.music size={48} /> }
];

const BhubanOS: React.FC = () => {
    const [booting, setBooting] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userPersona, setUserPersona] = useState<Persona | null>(null);
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [focusedId, setFocusedId] = useState<AppId | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isMobile, setIsMobile] = useState(false);
    const [notifications, setNotifications] = useState<{ id: number, text: string, type: 'achievement' | 'sys' }[]>([]);
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

    const addNotification = (text: string, type: 'achievement' | 'sys' = 'sys') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, text, type }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
        addNotification("Achievement: Night Owl!", "achievement");
    };

    const handleLogin = (persona: Persona) => {
        setUserPersona(persona);
        setLoggedIn(true);

        if (persona === 'recruiter') {
            setTimeout(() => openApp('about', 'About Me'), 800);
            setTimeout(() => openApp('showcase', 'Project Showcase'), 1600);
        } else if (persona === 'developer') {
            setTimeout(() => openApp('terminal', 'Terminal'), 800);
            setTimeout(() => openApp('showcase', 'Project Showcase'), 1600);
        } else if (persona === 'hacker') {
            setTimeout(() => openApp('terminal', 'Terminal'), 500);
            addNotification("Hacker Mode Engaged", "sys");
        }
    };

    const openApp = (id: AppId, title: string) => {
        setWindows(prev => {
            const exists = prev.find(w => w.id === id);
            const nextZIndex = Math.max(0, ...prev.map(win => win.zIndex)) + 1;

            if (exists) {
                if (focusedId === id && !exists.isMinimized) {
                    return prev.map(w => w.id === id ? { ...w, isMinimized: true } : w);
                }
                return prev.map(w => w.id === id
                    ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex }
                    : w
                );
            }
            return [...prev, { id, title, isOpen: true, isMinimized: false, isMaximized: false, zIndex: nextZIndex }];
        });
        setFocusedId(id);

        if (id === 'terminal' && userPersona === 'hacker') {
            addNotification("Secret Path Discovered!", "achievement");
        }
    };

    const closeApp = (id: AppId) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (focusedId === id) setFocusedId(null);
    };

    const toggleMinimize = (id: AppId) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
        if (focusedId === id) setFocusedId(null);
    };

    const toggleMaximize = (id: AppId) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
        focusApp(id);
    };

    const focusApp = (id: AppId) => {
        setWindows(prev => {
            const nextZIndex = Math.max(0, ...prev.map(win => win.zIndex)) + 1;
            return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w);
        });
        setFocusedId(id);
    };

    if (booting) {
        return <BootSequence onComplete={() => setBooting(false)} />;
    }

    if (!loggedIn) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="desktop-environment" style={{
            backgroundImage: userPersona === 'hacker' ? 'none' : `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${DESKTOP_BG})`,
            backgroundAttachment: 'fixed',
            overflow: 'hidden',
            backgroundColor: userPersona === 'hacker' ? '#000' : 'transparent'
        }}>
            {userPersona === 'hacker' && <HackerBackground />}
            {/* Top Bar */}
            <div className="top-bar" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(15px)', zIndex: 5000 }}>
                <div className="top-bar-left">
                    <span
                        onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                        style={{
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '0 12px',
                            background: isActivitiesOpen ? 'rgba(255,255,255,0.2)' : 'transparent',
                            borderRadius: '4px',
                            transition: 'all 0.2s'
                        }}
                    >
                        Activities
                    </span>
                    {!isMobile && (
                        <div style={topSearchPreview} onClick={() => { setIsActivitiesOpen(true); setTimeout(() => document.getElementById('global-search')?.focus(), 100); }}>
                            <Search size={14} opacity={0.7} />
                            <span style={{ opacity: 0.7 }}>Search bhubanOS...</span>
                        </div>
                    )}
                </div>

                <div className="top-bar-center" style={{ fontSize: '13px', fontWeight: 600 }}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>

                <div className="top-bar-right" style={{ position: 'relative' }}>
                    <div
                        onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                        style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', padding: '2px 10px', borderRadius: '4px', background: isControlCenterOpen ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                    >
                        <Wifi size={14} />
                        <Volume2 size={14} />
                        <Battery size={14} />
                        <ChevronDown size={14} />
                    </div>

                    <div onClick={toggleTheme} style={{ cursor: 'pointer', marginLeft: '12px', display: 'flex', alignItems: 'center' }}>
                        {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                    </div>

                    <AnimatePresence>
                        {isControlCenterOpen && (
                            <ControlCenter
                                theme={theme}
                                toggleTheme={toggleTheme}
                                onLogout={() => window.location.reload()}
                                onClose={() => setIsControlCenterOpen(false)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Desktop Layer with Widgets */}
            <div className="desktop-main-layer" style={{ display: 'flex', height: 'calc(100% - 28px)', padding: '20px' }}>
                {/* Desktop Icons */}
                <div className="desktop-icons" style={{ flex: 1 }}>
                    {ALL_APPS.filter(app => app.id !== 'music').map(app => (
                        <DesktopAppIcon
                            key={app.id}
                            id={app.id}
                            name={app.name}
                            icon={app.icon}
                            gradient="transparent"
                            onClick={() => openApp(app.id as AppId, app.name)}
                        />
                    ))}
                </div>

                {/* Sidebar Widgets */}
                {!isMobile && (
                    <div className="desktop-widgets" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={widgetCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 700 }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                <CloudSun color="#ffcc00" size={32} />
                            </div>
                            <div style={{ fontSize: '13px', opacity: 0.7, margin: '5px 0' }}>{currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>Kathmandu, 18°C</div>
                        </div>

                        <div style={widgetCard}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                                <Github size={18} />
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>GitHub Activity</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <ActivityItem time="2h ago" text="feat: add activities drawer" />
                                <ActivityItem time="1d ago" text="fix: window management" />
                                <ActivityItem time="3d ago" text="docs: refined about app" />
                            </div>
                        </div>

                        <div style={widgetCard}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <LayoutDashboard size={18} />
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>System Resources</span>
                            </div>
                            <ResourceBar label="Memory" value={42} color="var(--ubuntu-orange)" />
                            <ResourceBar label="CPU" value={18} color="#00ffcc" />
                        </div>
                    </div>
                )}
            </div>

            {/* Windows Layer */}
            <AnimatePresence>
                {windows.filter(w => w.isOpen && !w.isMinimized).map(win => (
                    <motion.div
                        key={win.id}
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            width: win.isMaximized ? '100vw' : (['showcase', 'editor', 'project-mgr', 'blog'].includes(win.id) ? '850px' : (win.id === 'terminal' ? '580px' : '780px')),
                            height: win.isMaximized ? 'calc(100vh - 28px)' : (['showcase', 'editor', 'project-mgr', 'blog'].includes(win.id) ? '580px' : '420px'),
                            left: win.isMaximized ? '0' : '50%',
                            top: win.isMaximized ? '28px' : '50%',
                            x: win.isMaximized ? '0' : '-50%',
                            y: win.isMaximized ? '0' : '-50%',
                            borderRadius: win.isMaximized ? '0' : '12px'
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        onMouseDown={() => focusApp(win.id)}
                        className={`os-window ${win.id === 'terminal' ? 'window-terminal' : ''}`}
                        style={{
                            zIndex: win.zIndex,
                            position: 'absolute',
                            boxShadow: focusedId === win.id ? '0 35px 90px rgba(0,0,0,0.65)' : '0 10px 25px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="window-header" style={{
                            height: '38px',
                            background: win.id === 'terminal' ? '#3c3c3c' : 'var(--window-header-bg)',
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <div className="window-controls" style={{
                                zIndex: 100,
                                position: 'absolute',
                                left: '15px',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                height: '100%'
                            }}>
                                <button className="control-btn btn-close" title="Close" onClick={(e) => { e.stopPropagation(); closeApp(win.id); }}>
                                    <X size={10} strokeWidth={4} />
                                </button>
                                <button className="control-btn btn-min" title="Minimize" onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}>
                                    <Minus size={10} strokeWidth={4} />
                                </button>
                                <button className="control-btn btn-max" title="Maximize" onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}>
                                    <Maximize2 size={10} strokeWidth={4} />
                                </button>
                            </div>
                            <div className="window-title" style={{ fontWeight: 600, color: 'var(--window-header-text)', fontSize: '13px' }}>{win.title}</div>
                        </div>
                        <div className="window-content" style={{ background: win.id === 'terminal' ? 'var(--terminal-bg)' : '#fff', position: 'relative', overflow: 'hidden', height: 'calc(100% - 40px)' }}>
                            {win.id === 'terminal' && <Terminal />}
                            {win.id === 'music' && <MusicPlayer />}
                            {win.id === 'files' && <FileExplorer path="/" />}
                            {win.id === 'about' && <AboutApp />}
                            {win.id === 'showcase' && <ShowcaseApp />}
                            {win.id === 'editor' && <CodeEditor />}
                            {win.id === 'project-mgr' && <ProjectManager />}
                            {win.id === 'blog' && <BlogApp />}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Dock */}
            <div className="dock-container" style={{ zIndex: 4000 }}>
                {['terminal', 'showcase', 'files', 'about'].map(id => (
                    <DockIcon
                        key={id}
                        id={id}
                        active={windows.find(w => w.id === id)?.isOpen}
                        minimized={windows.find(w => w.id === id)?.isMinimized}
                        onClick={() => openApp(id as AppId, ALL_APPS.find(a => a.id === id)?.name || '')}
                        icon={ALL_APPS.find(a => a.id === id)?.icon}
                    />
                ))}
            </div>

            {/* Activities Overlay */}
            <AnimatePresence>
                {isActivitiesOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        style={activitiesOverlayStyle}
                        onClick={() => setIsActivitiesOpen(false)}
                    >
                        <div
                            style={activitiesContentStyle}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={searchContainerStyle}>
                                <Search size={24} color="rgba(255,255,255,0.6)" />
                                <input
                                    id="global-search"
                                    type="text"
                                    placeholder="Type to search apps and files..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={activitiesSearchInput}
                                    autoFocus
                                    autoComplete="off"
                                />
                            </div>

                            <div style={appGridStyle}>
                                {ALL_APPS.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase())).map(app => (
                                    <motion.div
                                        key={app.id}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => { openApp(app.id as AppId, app.name); setIsActivitiesOpen(false); setSearchQuery(''); }}
                                        style={appCardStyle}
                                    >
                                        <div style={appIconWrapper}>
                                            {app.icon}
                                        </div>
                                        <span style={appNameStyle}>{app.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notifications */}
            <div style={{ position: 'absolute', top: '40px', right: '20px', zIndex: 6000, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
                <AnimatePresence>
                    {notifications.map(n => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            style={{
                                background: n.type === 'achievement' ? 'linear-gradient(135deg, #772953, #E95420)' : 'rgba(0,0,0,0.85)',
                                color: 'white',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: '1px solid rgba(255,255,255,0.1)',
                                minWidth: '240px',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                                {n.type === 'achievement' ? <Award size={18} /> : <Shield size={18} />}
                            </div>
                            {n.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Helper Components ---

const ControlCenter: React.FC<{ theme: string, toggleTheme: () => void, onLogout: () => void, onClose: () => void }> = ({ theme, toggleTheme, onLogout, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        style={controlCenterStyle}
    >
        <div style={controlSection}>
            <div style={controlItem} onClick={() => { toggleTheme(); onClose(); }}>
                <div style={controlIconWrapper}>{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</div>
                <span>{theme === 'dark' ? 'Dark Mode On' : 'Light Mode On'}</span>
            </div>
            <div style={controlItem}>
                <div style={controlIconWrapper}><Wifi size={18} /></div>
                <span>Strong Wi-Fi</span>
            </div>
            <div style={controlItem}>
                <div style={controlIconWrapper}><Battery size={18} /></div>
                <span>100% (Charging)</span>
            </div>
        </div>
        <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={controlItem} onClick={onLogout}>
                <div style={controlIconWrapper}><LogOut size={16} /></div>
                <span>Log Out</span>
            </div>
            <div style={controlItem}>
                <div style={controlIconWrapper}><Settings size={16} /></div>
                <span>Settings</span>
            </div>
        </div>
    </motion.div>
);

const DesktopAppIcon: React.FC<{ id: string, name: string, icon: React.ReactNode, gradient: string, onClick: () => void }> = ({ name, icon, gradient, onClick }) => (
    <div className="desktop-icon" onDoubleClick={onClick}>
        <div className="icon-wrapper" style={{ background: gradient }}>
            {icon}
        </div>
        <span>{name}</span>
    </div>
);

const DockIcon: React.FC<{ id: string, active?: boolean, minimized?: boolean, icon: React.ReactNode, onClick: () => void }> = ({ active, minimized, icon, onClick }) => (
    <div className={`dock-item ${active ? 'active' : ''}`} onClick={onClick}>
        {icon}
        {minimized && <div className="minimized-dot"></div>}
    </div>
);

const LoginScreen: React.FC<{ onLogin: (p: Persona) => void }> = ({ onLogin }) => (
    <div className="login-screen" style={{
        background: 'linear-gradient(135deg, #300a24 0%, #1e0616 100%)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ width: '100px', height: '100px', background: 'var(--ubuntu-orange)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={60} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Bhuban Bhandari</h1>
            <p style={{ opacity: 0.7 }}>Welcome back to bhubanOS</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%', maxWidth: '800px', padding: '0 40px' }}>
            <PersonaCard icon={<Users size={24} />} title="Recruiter" desc="Quick portfolio view" onClick={() => onLogin('recruiter')} />
            <PersonaCard icon={<CodeIcon size={24} />} title="Developer" desc="Technical exploration" onClick={() => onLogin('developer')} />
            <PersonaCard icon={<Shield size={24} />} title="Hacker" desc="Terminal access" onClick={() => onLogin('hacker')} />
            <PersonaCard icon={<Monitor size={24} />} title="Standard" desc="General tour" onClick={() => onLogin('guest')} />
        </div>
    </div>
);

const PersonaCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, onClick: () => void }> = ({ icon, title, desc, onClick }) => (
    <motion.div whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }} onClick={onClick} style={personaCardStyle}>
        <div style={{ color: 'var(--ubuntu-orange)', marginBottom: '10px' }}>{icon}</div>
        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{title}</div>
        <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>{desc}</div>
    </motion.div>
);

const ResourceBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
    <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', opacity: 0.8 }}>
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: '2px' }}></div>
        </div>
    </div>
);

const ActivityItem: React.FC<{ time: string, text: string }> = ({ time, text }) => (
    <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '13px', fontWeight: 500 }}>{text}</div>
        <div style={{ fontSize: '11px', opacity: 0.5 }}>{time}</div>
    </div>
);

// --- Styles ---

const topSearchPreview: React.CSSProperties = {
    marginLeft: '20px',
    background: 'rgba(255,255,255,0.1)',
    padding: '2px 14px',
    borderRadius: '14px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(255,255,255,0.05)',
    cursor: 'pointer'
};

const widgetCard: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '20px',
    padding: '24px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
};

const activitiesOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)',
    zIndex: 9000,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10vh'
};

const activitiesContentStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const searchContainerStyle: React.CSSProperties = {
    width: '600px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    marginBottom: '60px'
};

const activitiesSearchInput: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'white',
    fontSize: '18px',
    width: '100%',
    marginLeft: '15px'
};

const appGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '30px',
    width: '100%',
    padding: '0 40px'
};

const appCardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
};

const appIconWrapper: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '18px',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)'
};

const appNameStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center'
};

const controlCenterStyle: React.CSSProperties = {
    position: 'absolute',
    top: '35px',
    right: '0',
    width: '240px',
    background: 'rgba(40,40,40,0.85)',
    backdropFilter: 'blur(25px)',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    zIndex: 10000,
    overflow: 'hidden'
};

const controlSection: React.CSSProperties = {
    padding: '12px'
};

const controlItem: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': { background: 'rgba(255,255,255,0.1)' }
} as any;

const controlIconWrapper: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const personaCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '24px',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backdropFilter: 'blur(5px)'
};

export default BhubanOS;
