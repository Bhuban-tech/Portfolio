import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Search, Home, ArrowLeft, ArrowRight, Star, Sun, ArrowRight as ArrowGo, Image as ImageIcon, Globe, Video, UserCircle, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useWindowManager } from '../../context/WindowManager';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

const IE6ToolbarButton = ({ icon: Icon, label, disabled = false }: { icon: any, label: string, disabled?: boolean }) => (
    <button className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors ${disabled ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
        <div className="text-[#3c3c3c]">
            <Icon size={22} className="stroke-[1.5px]" />
        </div>
        <span className="text-[10px] text-[#3c3c3c]">{label}</span>
    </button>
);

const SidebarItem = ({ icon: Icon, label, active = false, onClick, isDarkMode }: { icon: any, label: string, active?: boolean, onClick: () => void, isDarkMode: boolean }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? (isDarkMode ? 'bg-white/10 text-white border-l-4 border-red-500' : 'bg-black/10 text-black border-l-4 border-red-500') : (isDarkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-black/5 hover:text-black')}`}
    >
        <Icon size={20} />
        <span className="text-sm font-medium">{label}</span>
    </button>
);

const ProjectCard = ({ project, idx, isDarkMode }: { project: any, idx: number, isDarkMode: boolean }) => {
    const { openWindow } = useWindowManager();

    const handleClick = () => {
        if (project.title === 'SMS Projects') {
            openWindow('SMS_DASHBOARD', 'KritimSMS Dashboard');
        }
    };

    return (
        <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={handleClick}
            className={`${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:border-white/10' : 'bg-black/[0.03] border-black/5 hover:border-black/10'} border rounded-lg overflow-hidden group transition-all shadow-xl cursor-pointer`}
        >
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                    <div className={`${isDarkMode ? 'bg-black/60 text-white/80 border-white/10' : 'bg-white/60 text-black/80 border-black/10'} backdrop-blur-md px-3 py-1 rounded-full text-[10px] border`}>
                        {project.tech.length} Items
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col">
                <h3 className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-lg leading-tight group-hover:text-red-500 transition-colors`}>{project.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mt-2 line-clamp-3`}>{project.description}</p>
                <p className="text-gray-500 text-[10px] mt-3 uppercase tracking-wider font-bold">Personal Work • Web</p>
            </div>
        </motion.div>
    );
};

export const Projects = () => {
    const { items } = PORTFOLIO_DATA.projects;
    const { minimizeWindow, toggleMaximizeWindow, closeWindow } = useWindowManager();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
    const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const categories = [
        { id: 'All', icon: Home, label: 'All' },
        { id: 'Image', icon: ImageIcon, label: 'Image' },
        { id: 'Web', icon: Globe, label: 'Web' },
        { id: 'Video', icon: Video, label: 'Video' },
        { id: 'Client', icon: UserCircle, label: 'Client' },
        { id: 'Personal', icon: Briefcase, label: 'Personal' }
    ];

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-sans selection:bg-[#316ac5] selection:text-white">
            {/* IE6 Header Area */}
            <div className="flex flex-col border-b border-[#ACA899] shadow-sm flex-shrink-0">
                {/* Menu Bar */}
                <div className="flex items-center gap-4 px-2 py-0.5 text-xs text-[#3c3c3c] border-b border-white/50 relative">
                    <div className="relative">
                        <span
                            className={`cursor-default px-1 ${isFileMenuOpen ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white'}`}
                            onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
                        >
                            File
                        </span>
                        {isFileMenuOpen && (
                            <div className="absolute top-full left-0 w-32 bg-[#fafafa] border border-[#aca899] shadow-[2px_2px_0_rgba(0,0,0,0.2)] z-[100] flex flex-col py-1 text-black">
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => setIsFileMenuOpen(false)}>New Window</button>
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => setIsFileMenuOpen(false)}>Print...</button>
                                <div className="h-[1px] bg-[#aca899] my-1 mx-1" />
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => setIsFileMenuOpen(false)}>Close</button>
                            </div>
                        )}
                    </div>
                    {/* Overlay to close menu */}
                    {isFileMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsFileMenuOpen(false)} />}

                    <div className="relative">
                        <span
                            className={`cursor-default px-1 ${isViewMenuOpen ? 'bg-[#316ac5] text-white' : 'hover:bg-[#316ac5] hover:text-white'}`}
                            onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
                        >
                            View
                        </span>
                        {isViewMenuOpen && (
                            <div className="absolute top-full left-0 w-36 bg-[#fafafa] border border-[#aca899] shadow-[2px_2px_0_rgba(0,0,0,0.2)] z-[100] flex flex-col py-1 text-black">
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => { setIsViewMenuOpen(false); minimizeWindow('PROJECTS'); }}>Minimize</button>
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => { setIsViewMenuOpen(false); toggleMaximizeWindow('PROJECTS'); }}>Maximize</button>
                                <div className="h-[1px] bg-[#aca899] my-1 mx-1" />
                                <button className="px-4 py-1 text-left hover:bg-[#316ac5] hover:text-white transition-colors" onClick={() => { setIsViewMenuOpen(false); closeWindow('PROJECTS'); }}>Close Window</button>
                            </div>
                        )}
                    </div>
                    {/* Overlay to close menu */}
                    {isViewMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsViewMenuOpen(false)} />}

                    <span className="cursor-default hover:bg-[#316ac5] hover:text-white px-1">Favorites</span>
                    <span className="cursor-default hover:bg-[#316ac5] hover:text-white px-1">Tools</span>
                    <span className="cursor-default hover:bg-[#316ac5] hover:text-white px-1">Help</span>
                    <div className="flex-1" />
                    <div className="flex items-center">
                        <div className="w-5 h-5 scale-75 transform rotate-[-5deg]">
                            <div className="grid grid-cols-2 gap-[1px]">
                                <div className="w-2 h-2 bg-red-500" /><div className="w-2 h-2 bg-green-500" />
                                <div className="w-2 h-2 bg-blue-500" /><div className="w-2 h-2 bg-yellow-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center px-1 py-1 border-b border-white/50 gap-0.5 bg-gradient-to-b from-[#f0f0f0] to-[#ECE9D8]">
                    <IE6ToolbarButton icon={Home} label="Home" />
                    <div className="w-[1px] h-8 bg-[#ACA899] mx-0.5 self-center opacity-40 shadow-[1px_0_0_rgba(255,255,255,0.5)]" />
                    <IE6ToolbarButton icon={ArrowLeft} label="Back" />
                    <IE6ToolbarButton icon={ArrowRight} label="Forward" />
                    <div className="w-[1px] h-8 bg-[#ACA899] mx-0.5 self-center opacity-40 shadow-[1px_0_0_rgba(255,255,255,0.5)]" />
                    <IE6ToolbarButton icon={Star} label="Favorites" />
                    <div className="w-[1px] h-8 bg-[#ACA899] mx-0.5 self-center opacity-40 shadow-[1px_0_0_rgba(255,255,255,0.5)]" />
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded hover:bg-black/5 active:bg-black/10 transition-colors`}
                    >
                        <div className={isDarkMode ? 'text-yellow-500' : 'text-blue-600'}>
                            <Sun size={22} className="stroke-[1.5px]" />
                        </div>
                        <span className="text-[10px] text-[#3c3c3c]">Light/Dark</span>
                    </button>
                </div>

                {/* Address Bar */}
                <div className="flex items-center gap-2 px-2 py-1.5 bg-[#ECE9D8]">
                    <span className="text-xs text-[#3c3c3c] mr-1">Address</span>
                    <div className="flex-1 bg-white border border-[#7f9db9] flex items-center px-2 py-0.5 shadow-inner rounded-sm">
                        <div className="text-blue-600 mr-1.5"><Globe size={14} /></div>
                        <input
                            readOnly
                            value="https://www.myprojects.com"
                            className="text-xs w-full bg-transparent focus:outline-none text-[#3c3c3c]"
                        />
                        <div className="text-gray-400"><ArrowRight size={14} /></div>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#ACA899]/20 rounded transition-colors text-[#3c3c3c]">
                        <ArrowGo size={14} className="text-green-600" />
                        <span className="text-xs">Go</span>
                    </button>
                    <div className="w-[1px] h-6 bg-[#ACA899] opacity-40" />
                </div>
            </div>

            {/* Main Application Area */}
            <div className={`flex-1 flex overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#ffffff]'}`}>
                {/* Sidebar */}
                <div className={`w-[200px] border-r flex flex-col p-4 ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-gray-100 border-black/5'}`}>
                    <div className="flex items-center gap-3 px-4 mb-10">
                        <h2 className={`font-bold text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>MyProjects</h2>
                    </div>

                    <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <SidebarItem
                                key={cat.id}
                                icon={cat.icon}
                                label={cat.label}
                                isDarkMode={isDarkMode}
                                active={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Top Bar for Search and Socials */}
                    <div className={`h-20 flex items-center justify-between px-8 border-b ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                        <div className="relative w-[350px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full border rounded-full py-2.5 pl-12 pr-4 transition-all shadow-lg focus:outline-none focus:border-red-500/50 ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10' : 'bg-black/5 border-black/10 text-black placeholder:text-gray-400 focus:bg-black/10'}`}
                            />
                        </div>

                        <div className={`flex items-center gap-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <a href="https://linkedin.com" target="_blank" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}><Linkedin size={22} /></a>
                            <a href="https://instagram.com" target="_blank" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}><Instagram size={22} /></a>
                            <a href="https://github.com" target="_blank" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}><Github size={22} /></a>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="flex-1 overflow-auto p-8">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            {items
                                .filter(p => searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((project, idx) => (
                                    <ProjectCard key={idx} project={project} idx={idx} isDarkMode={isDarkMode} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
