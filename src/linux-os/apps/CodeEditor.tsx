import React, { useState } from 'react';
import {
    FileCode,
    Save,
    Play,
    Settings,
    ChevronDown,
    X,
    Check,
    GitBranch,
    Search,
    BookOpen
} from 'lucide-react';

const CodeEditor: React.FC = () => {
    const [files] = useState([
        {
            name: 'Portfolio.tsx', language: 'typescript', code: `// Welcome to bhubanOS Code Editor
import React from 'react';

const Portfolio = () => {
    const skills = ['Flutter', 'Spring Boot', 'React'];
    
    return (
        <div className="portfolio">
            <h1>Bhuban Bhandari</h1>
            <p>Full Stack Developer</p>
        </div>
    );
};

export default Portfolio;` },
        {
            name: 'App.css', language: 'css', code: `.portfolio {
    background: linear-gradient(135deg, #772953 0%, #E95420 100%);
    color: white;
    padding: 40px;
    border-radius: 20px;
}` },
        {
            name: 'config.json', language: 'json', code: `{
  "version": "1.0.0",
  "theme": "ubuntu-dark",
  "features": ["terminal", "showcase", "pro-explorer"]
}` }
    ]);

    const [activeFileIndex, setActiveFileIndex] = useState(0);
    const activeFile = files[activeFileIndex];

    return (
        <div style={editorContainer}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
                <div style={sideIcon}><FileCode size={20} color="#772953" /></div>
                <div style={sideIcon}><Search size={20} /></div>
                <div style={sideIcon}><GitBranch size={20} /></div>
                <div style={sideIcon}><BookOpen size={20} /></div>
                <div style={{ flex: 1 }}></div>
                <div style={sideIcon}><Settings size={20} /></div>
            </div>

            {/* File Explorer (Internal) */}
            <div style={fileTreeStyle}>
                <div style={treeHeader}>EXPLORER</div>
                <div style={sectionLabel}>
                    <ChevronDown size={14} /> BHUBAN-PORTFOLIO
                </div>
                {files.map((file, i) => (
                    <div
                        key={file.name}
                        onClick={() => setActiveFileIndex(i)}
                        style={{
                            ...fileItem,
                            background: activeFileIndex === i ? 'rgba(119, 41, 83, 0.1)' : 'transparent',
                            color: activeFileIndex === i ? '#772953' : '#64748b'
                        }}
                    >
                        <FileCode size={14} />
                        {file.name}
                    </div>
                ))}
            </div>

            {/* Main Editor */}
            <div style={mainRegion}>
                {/* Tabs */}
                <div style={tabRow}>
                    {files.map((file, i) => (
                        <div key={file.name} style={i === activeFileIndex ? activeTab : tab}>
                            <FileCode size={12} color={getLangColor(file.language)} />
                            {file.name}
                            {i === activeFileIndex && <X size={12} style={{ marginLeft: '10px', opacity: 0.5 }} />}
                        </div>
                    ))}
                </div>

                {/* Editor Content */}
                <div style={codeArea}>
                    <div style={lineNumbers}>
                        {activeFile.code.split('\n').map((_, i) => (
                            <div key={i} style={lineNum}>{i + 1}</div>
                        ))}
                    </div>
                    <pre style={codeContent}>
                        <code dangerouslySetInnerHTML={{ __html: highlightCode(activeFile.code) }} />
                    </pre>
                </div>

                {/* Status Bar */}
                <div style={statusBar}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={statusItem}><GitBranch size={12} /> main*</div>
                        <div style={statusItem}><Check size={12} /> No Problems</div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={statusItem}>UTF-8</div>
                        <div style={statusItem}>{activeFile.language.toUpperCase()}</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={quickActions}>
                <button style={actionBtn}><Save size={16} /> Save</button>
                <button style={{ ...actionBtn, background: '#38A169' }}><Play size={16} /> Run</button>
            </div>
        </div>
    );
};

// Utilities
const getLangColor = (lang: string) => {
    if (lang === 'typescript') return '#007acc';
    if (lang === 'css') return '#264de4';
    if (lang === 'json') return '#f9c846';
    return '#64748b';
};

const highlightCode = (code: string) => {
    // Basic regex-based highlighting for simulation
    return code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"(.*?)"/g, '<span style="color: #059669">"$1"</span>')
        .replace(/'(.*?)'/g, '<span style="color: #059669">\'$1\'</span>')
        .replace(/\b(import|export|const|return|default|if|else|for|while|await|async)\b/g, '<span style="color: #772953; font-weight: 700">$1</span>')
        .replace(/\b(React|Portfolio|skills|className)\b/g, '<span style="color: #0284c7">$1</span>')
        .replace(/\/\/(.*?)\n/g, '<span style="color: #94a3b8; font-style: italic">// $1</span>\n');
};

// Styles
const editorContainer: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    background: '#ffffff',
    color: '#334155',
    position: 'relative',
    overflow: 'hidden'
};

const sidebarStyle: React.CSSProperties = {
    width: '48px',
    background: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 0'
};

const sideIcon: React.CSSProperties = {
    padding: '12px',
    cursor: 'pointer',
    color: '#94a3b8',
    transition: 'color 0.2s',
    '&:hover': { color: '#772953' }
} as any;

const fileTreeStyle: React.CSSProperties = {
    width: '240px',
    background: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
};

const treeHeader: React.CSSProperties = {
    padding: '12px 20px',
    fontSize: '11px',
    fontWeight: 800,
    color: '#94a3b8',
    background: '#f8fafc',
    letterSpacing: '1px'
};

const sectionLabel: React.CSSProperties = {
    padding: '10px 15px',
    fontSize: '11px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#1e293b'
};

const fileItem: React.CSSProperties = {
    padding: '8px 30px',
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.1s'
};

const mainRegion: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
};

const tabRow: React.CSSProperties = {
    height: '35px',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex'
};

const tab: React.CSSProperties = {
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#64748b',
    borderRight: '1px solid #e2e8f0',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.5)'
};

const activeTab: React.CSSProperties = {
    ...tab,
    background: '#ffffff',
    color: '#1e293b',
    borderBottom: '1px solid #ffffff',
    fontWeight: 600,
    marginTop: '-1px',
    zIndex: 1
};

const codeArea: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    padding: '10px 0'
};

const lineNumbers: React.CSSProperties = {
    width: '45px',
    padding: '0 15px',
    textAlign: 'right',
    color: '#cbd5e1',
    fontSize: '12px',
    borderRight: '1px solid #f1f5f9',
    userSelect: 'none'
};

const lineNum: React.CSSProperties = {
    lineHeight: '20px'
};

const codeContent: React.CSSProperties = {
    flex: 1,
    padding: '0 20px',
    margin: 0,
    fontSize: '13px',
    fontFamily: '"Ubuntu Mono", monospace',
    lineHeight: '20px',
    overflowY: 'auto'
};

const statusBar: React.CSSProperties = {
    height: '25px',
    background: '#772953',
    color: 'rgba(255,255,255,0.8)',
    padding: '0 15px',
    fontSize: '11px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const statusItem: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
};

const quickActions: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px',
    right: '30px',
    display: 'flex',
    gap: '12px'
};

const actionBtn: React.CSSProperties = {
    padding: '10px 20px',
    background: '#772953',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
};

export default CodeEditor;
