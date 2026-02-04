import React, { useState, useEffect } from 'react';
import {
    FolderClosed,
    FileText,
    Home,
    Download,
    Music,
    Image,
    Video as VideoIcon,
    ChevronRight,
    ChevronLeft,
    Search,
    Clock,
    Star,
    Trash2,
    Monitor,
    Terminal,
    User,
    Code
} from 'lucide-react';
import { findNodeByPath } from '../commands';
import type { FileSystemNode } from '../filesystem';
import { motion, AnimatePresence } from 'framer-motion';

const FileExplorer: React.FC<{ path?: string }> = ({ path: initialPath = '/' }) => {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [currentNode, setCurrentNode] = useState<FileSystemNode | null>(null);
    const [history, setHistory] = useState<string[]>([initialPath]);
    const [historyIndex, setHistoryIndex] = useState(0);

    useEffect(() => {
        const node = findNodeByPath(currentPath);
        setCurrentNode(node);
    }, [currentPath]);

    const navigateTo = (path: string) => {
        const newNode = findNodeByPath(path);
        if (newNode && newNode.type === 'directory') {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(path);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            setCurrentPath(path);
        }
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    const breadcrumbs = currentPath === '/' ? [''] : currentPath.split('/');

    return (
        <div style={containerStyle}>
            {/* Toolbar */}
            <div style={toolbarStyle}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={goBack} disabled={historyIndex === 0} style={navBtnStyle}><ChevronLeft size={18} /></button>
                    <button onClick={goForward} disabled={historyIndex === history.length - 1} style={navBtnStyle}><ChevronRight size={18} /></button>
                </div>

                <div style={addressBarStyle}>
                    <Home size={14} color="#64748b" />
                    {breadcrumbs.map((crumb, i) => (
                        <React.Fragment key={i}>
                            <span style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>
                                {crumb === '' ? 'Bhuban-PC' : crumb}
                            </span>
                            {i < breadcrumbs.length - 1 && <ChevronRight size={12} color="#94a3b8" />}
                        </React.Fragment>
                    ))}
                </div>

                <div style={searchBarStyle}>
                    <Search size={14} color="#94a3b8" />
                    <input type="text" placeholder="Search Files" style={inputStyle} />
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <div style={sidebarStyle}>
                    <div style={sideSectionLabel}>Favorites</div>
                    <SidebarItem icon={<Clock size={16} />} label="Recent" onClick={() => { }} />
                    <SidebarItem icon={<Home size={16} />} label="Home" active onClick={() => navigateTo('/')} />
                    <SidebarItem icon={<Star size={16} />} label="Starred" onClick={() => { }} />

                    <div style={sideSectionLabel}>Locations</div>
                    <SidebarItem icon={<Monitor size={16} />} label="Desktop" onClick={() => navigateTo('/Desktop')} />
                    <SidebarItem icon={<FolderClosed size={16} />} label="Documents" onClick={() => navigateTo('/Documents')} />
                    <SidebarItem icon={<Download size={16} />} label="Downloads" onClick={() => navigateTo('/Downloads')} />
                    <SidebarItem icon={<Music size={16} />} label="Music" onClick={() => { }} />
                    <SidebarItem icon={<Image size={16} />} label="Pictures" onClick={() => { }} />
                    <SidebarItem icon={<VideoIcon size={16} />} label="Videos" onClick={() => { }} />

                    <div style={sideSectionLabel}>System</div>
                    <SidebarItem icon={<Trash2 size={16} />} label="Trash" onClick={() => { }} />
                </div>

                {/* Main Content */}
                <div style={mainContentStyle}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPath}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            style={gridStyle}
                        >
                            {currentNode?.children?.map(node => (
                                <FileItem
                                    key={node.name}
                                    node={node}
                                    onDoubleClick={() => node.type === 'directory' ? navigateTo(`${currentPath === '/' ? '' : currentPath}/${node.name}`) : null}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Status Bar */}
            <div style={statusBarStyle}>
                <span>{currentNode?.children?.length || 0} items</span>
                <span>Space: 25.4 GB Free</span>
            </div>
        </div>
    );
};

// Sub-components
const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            ...sidebarItemStyle,
            background: active ? 'rgba(119, 41, 83, 0.1)' : 'transparent',
            color: active ? '#772953' : '#475569',
            fontWeight: active ? 700 : 500
        }}
    >
        {icon}
        <span>{label}</span>
    </div>
);

const FileItem: React.FC<{ node: FileSystemNode, onDoubleClick: () => void }> = ({ node, onDoubleClick }) => {
    const isDir = node.type === 'directory';

    return (
        <motion.div
            whileHover={{ backgroundColor: 'rgba(119, 41, 83, 0.05)' }}
            onDoubleClick={onDoubleClick}
            style={fileItemStyle}
        >
            <div style={iconContainerStyle}>
                {isDir ? (
                    <FolderClosed size={48} color="#f9c846" fill="#f9c846" />
                ) : (
                    getFileIcon(node.name)
                )}
            </div>
            <span style={fileNameStyle}>{node.name}</span>
        </motion.div>
    );
};

const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'txt') return <FileText size={48} color="#94a3b8" />;
    if (ext === 'sh') return <Terminal size={48} color="#38A169" />;
    if (ext === 'jsx' || ext === 'tsx' || ext === 'ts' || ext === 'js') return <Code size={48} color="#0E8EE9" />;
    if (name.toLowerCase().includes('cv') || name.toLowerCase().includes('resume')) return <User size={48} color="#772953" />;
    return <FileText size={48} color="#94a3b8" />;
};

// Styles
const containerStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    color: '#1e293b'
};

const toolbarStyle: React.CSSProperties = {
    padding: '8px 16px',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
};

const navBtnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: '6px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#64748b'
};

const addressBarStyle: React.CSSProperties = {
    flex: 1,
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
};

const searchBarStyle: React.CSSProperties = {
    width: '240px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
};

const inputStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    width: '100%'
};

const sidebarStyle: React.CSSProperties = {
    width: '200px',
    background: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
    padding: '20px 10px',
    overflowY: 'auto'
};

const sidebarItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.1s',
    marginBottom: '2px'
};

const sideSectionLabel: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '15px 0 8px 12px'
};

const mainContentStyle: React.CSSProperties = {
    flex: 1,
    padding: '25px',
    overflowY: 'auto',
    background: 'white'
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '20px'
};

const fileItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 10px',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'center'
};

const iconContainerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const fileNameStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    color: '#334155',
    wordBreak: 'break-all',
    maxWidth: '90px'
};

const statusBarStyle: React.CSSProperties = {
    padding: '6px 20px',
    background: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    fontSize: '11px',
    color: '#64748b',
    display: 'flex',
    justifyContent: 'space-between'
};

export default FileExplorer;
