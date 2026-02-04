import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Smartphone,
    ShieldCheck,
    Cpu,
    Zap,
    Users as UsersIcon,
    Code2,
    BookOpen,
    MonitorPlay
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    features: string[];
    role: string;
    metrics: { label: string; value: string; icon: React.ReactNode }[];
    image: string;
    screenshots: string[];
}

const PROJECTS: Project[] = [
    {
        id: 'kritim-guru',
        title: 'Kritim Guru Platform',
        description: 'A comprehensive mobile learning platform serving thousands of students. Bridges the gap between traditional classrooms and digital education with real-time course delivery.',
        tech: ['Flutter', 'Dart', 'Spring Boot', 'MySQL', 'Firebase'],
        role: 'Frontend Lead & Backend API Integration',
        features: [
            'Interactive course modules with video playback',
            'Real-time quiz system with instant grading',
            'Student-Teacher collaboration hub',
            'Automated resource distribution'
        ],
        metrics: [
            { label: 'Rating', value: '4.6★', icon: <Zap size={14} /> },
            { label: 'Lines of Code', value: '25K+', icon: <Code2 size={14} /> },
            { label: 'Downloads', value: '5K+', icon: <UsersIcon size={14} /> }
        ],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop',
        screenshots: [
            'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    {
        id: 'kritimsms',
        title: 'KritimSMS (Educational ERP)',
        description: 'Enterprise-grade Student Management System (SMS) optimizing administrative workflows. Features a unique SMS-based parent communication gateway.',
        tech: ['Next.js', 'Spring Boot', 'MySQL', 'Node.js', 'Redis'],
        role: 'Full-Stack Developer',
        features: [
            'Template-based bulk messaging system',
            'Dynamic attendance and grade reporting',
            'Integrated billing and fee management',
            'Parent portal for real-time tracking'
        ],
        metrics: [
            { label: 'Efficiency', value: '+40%', icon: <Cpu size={14} /> },
            { label: 'Reliability', value: '99.9%', icon: <ShieldCheck size={14} /> },
            { label: 'User Base', value: '10+ Schools', icon: <UsersIcon size={14} /> }
        ],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
        screenshots: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    {
        id: 'hamrogharsewa',
        title: 'HamroGharSewa Marketplace',
        description: 'A trusted home service marketplace connecting verified professionals with homeowners in Nepal. Built with a focus on trust and localization.',
        tech: ['Flutter', 'Spring Boot', 'MySQL', 'JWT', 'JPA'],
        role: 'Mobile Developer (Academic Lead)',
        features: [
            'Real-time booking and scheduling',
            'Verified provider verification flow',
            'Secure JWT-based authentication',
            'In-app notification engine'
        ],
        metrics: [
            { label: 'Load Time', value: '<2s', icon: <Zap size={14} /> },
            { label: 'Platform', value: 'iOS/Android', icon: <Smartphone size={14} /> },
            { label: 'Architecture', value: 'Clean', icon: <BookOpen size={14} /> }
        ],
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=2070&auto=format&fit=crop',
        screenshots: [
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop'
        ]
    }
];

const ShowcaseApp: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'info' | 'screenshots'>('info');
    const project = PROJECTS[activeIndex];

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
        setViewMode('info');
    };
    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
        setViewMode('info');
    };

    return (
        <div style={{ height: '100%', display: 'flex', background: '#f8fafc', color: '#1e293b' }}>
            {/* Nav Sidebar */}
            <div style={{ width: '220px', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <MonitorPlay size={18} color="#772953" />
                    <span style={{ fontWeight: 800, fontSize: '16px', color: '#772953' }}>Showcase</span>
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    {PROJECTS.map((p, i) => (
                        <motion.div
                            key={p.id}
                            whileHover={{ x: 5, background: 'rgba(119, 41, 83, 0.04)' }}
                            onClick={() => { setActiveIndex(i); setViewMode('info'); }}
                            style={{
                                padding: '12px 14px',
                                marginBottom: '6px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: activeIndex === i ? 700 : 500,
                                background: activeIndex === i ? 'rgba(119, 41, 83, 0.08)' : 'transparent',
                                color: activeIndex === i ? '#772953' : '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                border: activeIndex === i ? '1px solid rgba(119, 41, 83, 0.1)' : '1px solid transparent'
                            }}
                        >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeIndex === i ? '#772953' : '#cbd5e1' }}></span>
                            {p.title.split(' ')[0]}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
                {/* Header Actions */}
                <div style={{ padding: '12px 25px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => setViewMode('info')} style={tabButtonStyle(viewMode === 'info')}>Project Info</button>
                        <button onClick={() => setViewMode('screenshots')} style={tabButtonStyle(viewMode === 'screenshots')}>Gallery</button>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={prev} style={circleBtn}><ChevronLeft size={16} /></button>
                        <button onClick={next} style={circleBtn}><ChevronRight size={16} /></button>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '25px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${project.id}-${viewMode}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {viewMode === 'info' ? (
                                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <div style={bannerStyle(project.image)}>
                                        <div style={bannerOverlay}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <span style={projectTagStyle}>FEATURED</span>
                                                <span style={projectStatusStyle}>Live</span>
                                            </div>
                                            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>{project.title}</h1>
                                            <p style={{ margin: '8px 0 0', opacity: 0.8, fontSize: '14px' }}>{project.role}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 3fr)', gap: '30px' }}>
                                        <div>
                                            <section style={{ marginBottom: '25px' }}>
                                                <h3 style={sectionLabel}>About Project</h3>
                                                <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#475569' }}>{project.description}</p>
                                            </section>

                                            <section>
                                                <h3 style={sectionLabel}>Core Features</h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                                    {project.features.map((f, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            style={featureCard}
                                                        >
                                                            <div style={featureCheck}><ShieldCheck size={14} color="#059669" /></div>
                                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>{f}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>

                                        <div>
                                            <h3 style={sectionLabel}>Quick Intelligence</h3>
                                            <div style={statsGrid}>
                                                {project.metrics.map((m, i) => (
                                                    <div key={i} style={statCard}>
                                                        <div style={{ color: '#772953', marginBottom: '4px' }}>{m.icon}</div>
                                                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{m.label}</div>
                                                        <div style={{ fontSize: '16px', fontWeight: 800 }}>{m.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <h3 style={sectionLabel}>Technology Stack</h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '25px' }}>
                                                {project.tech.map(t => <span key={t} style={pillStyle}>{t}</span>)}
                                            </div>

                                            <button style={ctaButton}>
                                                Explore Repository <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
                                    {project.screenshots.map((s, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.02 }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            style={galleryItem}
                                        >
                                            <img src={s} alt="screenshot" style={{ width: '100%', display: 'block' }} />
                                            <div style={galleryLabel}>Screen {i + 1}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Styles
const tabButtonStyle = (active: boolean): React.CSSProperties => ({
    background: 'transparent',
    border: 'none',
    padding: '8px 4px',
    fontSize: '14px',
    fontWeight: active ? 700 : 500,
    color: active ? '#772953' : '#64748b',
    borderBottom: active ? '3px solid #772953' : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s'
});

const circleBtn: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1px solid #e2e8f0',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#64748b'
};

const bannerStyle = (img: string): React.CSSProperties => ({
    height: '240px',
    width: '100%',
    borderRadius: '24px',
    background: `url(${img}) center/cover`,
    position: 'relative',
    marginBottom: '40px',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
});

const bannerOverlay: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '30px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    color: 'white'
};

const sectionLabel: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 800,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '20px'
};

const featureCard: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '16px',
    background: 'white',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
};

const statsGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '30px'
};

const statCard: React.CSSProperties = {
    padding: '15px',
    background: 'white',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
};

const pillStyle: React.CSSProperties = {
    padding: '6px 12px',
    background: '#f1f5f9',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#475569'
};

const ctaButton: React.CSSProperties = {
    marginTop: '30px',
    width: '100%',
    padding: '16px',
    background: '#772953',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 10px 25px rgba(119, 41, 83, 0.3)'
};

const galleryItem: React.CSSProperties = {
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative'
};

const projectTagStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 800,
    background: '#772953',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '1px'
};

const projectStatusStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 800,
    background: '#059669',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    letterSpacing: '1px'
};

const featureCheck: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'rgba(5, 150, 105, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
};

const galleryLabel: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    fontSize: '10px',
    fontWeight: 700,
    padding: '4px 8px',
    borderRadius: '4px',
    backdropFilter: 'blur(4px)'
};

export default ShowcaseApp;
