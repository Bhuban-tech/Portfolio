import React, { useState } from 'react';
import {
    Mail,
    Github,
    MapPin,
    Award,
    Heart,
    Terminal,
    User,
    Smartphone,
    Server,
    Code,
    Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

const AboutApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'bio' | 'timeline' | 'skills'>('bio');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc', color: '#1e293b' }}>
            {/* CV Header - Modern Overlay */}
            <div style={headerStyle}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <div style={avatarStyle}>
                        <User size={60} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: 0, fontSize: '38px', fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>BHUBAN BHANDARI</h1>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                            <span style={iconText}><MapPin size={14} /> Kathmandu, Nepal</span>
                            <span style={iconText}><Mail size={14} /> bhuban.bhandari05@gmail.com</span>
                            <span style={iconText}><Github size={14} /> Bhuban-tech</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={tabContainer}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '30px' }}>
                    {(['bio', 'timeline', 'skills'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={tabStyle(activeTab === tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '40px 20px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {activeTab === 'bio' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <section style={cardStyle}>
                                <h2 style={sectionTitle}><Award size={20} color="#772953" /> PROFESIONAL SUMMARY</h2>
                                <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569' }}>
                                    Motivated <strong>BCA undergraduate</strong> with practical experience in software development through internships and live projects. Skilled in <strong>Flutter, React, and Spring Boot</strong>, with hands-on involvement in real-world applications. Currently contributing to <strong>Kritim Guru</strong> projects and continuously improving technical and problem-solving skills.
                                </p>
                            </section>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginTop: '25px' }}>
                                <section style={cardStyle}>
                                    <h2 style={sectionTitle}><Terminal size={20} color="#772953" /> CURRENT FOCUS</h2>
                                    <p style={{ fontSize: '14px', color: '#64748b' }}>Developing scalable E-learning modules and optimizing microservices communications for high-traffic educational ERPs.</p>
                                </section>
                                <section style={cardStyle}>
                                    <h2 style={sectionTitle}><Heart size={20} color="#e11d48" /> INTERESTS</h2>
                                    <p style={{ fontSize: '14px', color: '#64748b' }}>Passionate about Open Source, System Design, and building community-driven tech solutions in Nepal.</p>
                                </section>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'timeline' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={timelineContainer}>
                            <TimelineItem
                                year="2024"
                                title="Developer"
                                company="Kritim Mind Technology"
                                desc="Leading frontend modules for Kritim Guru Platform using Flutter and managing Spring Boot microservices."
                            />
                            <TimelineItem
                                year="2023"
                                title="Intern"
                                company="Kritim Mind Technology"
                                desc="8-month intensive internship focusing on Dart/Flutter, Java/Spring Boot, and production-grade engineering practices."
                                active={false}
                            />
                            <TimelineItem
                                year="2022"
                                title="BCA Start"
                                company="Aadim National College"
                                desc="Began Bachelor of Computer Applications. Currently in 4th Semester with a focus on Algorithm design."
                                active={false}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'skills' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                <SkillGroup title="Frontend / Mobile" skills={['Flutter (Dart)', 'React.js', 'Next.js', 'HTML/CSS']} icon={<Smartphone size={18} />} />
                                <SkillGroup title="Backend / DB" skills={['Java Spring Boot', 'Node.js', 'MySQL', 'Firebase']} icon={<Server size={18} />} />
                                <SkillGroup title="Languages" skills={['Java', 'Dart', 'JavaScript', 'Python']} icon={<Code size={18} />} />
                                <SkillGroup title="Tools & Dev" skills={['Git', 'Linux (Ubuntu)', 'API Design', 'Postman']} icon={<Rocket size={18} />} />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Components
const TimelineItem: React.FC<{ year: string, title: string, company: string, desc: string, active?: boolean }> = ({ year, title, company, desc, active = true }) => (
    <div style={{ display: 'flex', gap: '30px', position: 'relative', marginBottom: '40px' }}>
        <div style={{ width: '80px', fontWeight: 800, color: active ? '#772953' : '#94a3b8', fontSize: '18px', textAlign: 'right' }}>{year}</div>
        <div style={{ position: 'relative' }}>
            <div style={{ width: '2px', height: '100%', background: '#e2e8f0', position: 'absolute', left: '7px', top: '10px' }}></div>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: active ? '#772953' : '#cbd5e1', border: '4px solid white', position: 'relative', zIndex: 1, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}></div>
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '18px', color: '#334155' }}>{title}</div>
            <div style={{ color: '#772953', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>{company}</div>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6' }}>{desc}</p>
        </div>
    </div>
);

const SkillGroup: React.FC<{ title: string, skills: string[], icon: React.ReactNode }> = ({ title, skills, icon }) => (
    <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#772953' }}>
            {icon}
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{title}</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map(s => (
                <span key={s} style={{ padding: '8px 12px', background: 'white', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>{s}</span>
            ))}
        </div>
    </div>
);

// Styles
const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #772953 0%, #401030 100%)',
    padding: '60px 40px',
    color: 'white'
};

const avatarStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '30px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)'
};

const iconText: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
};

const tabContainer: React.CSSProperties = {
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 40px'
};

const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '20px 0',
    background: 'none',
    border: 'none',
    fontSize: '13px',
    fontWeight: 800,
    letterSpacing: '1px',
    color: active ? '#772953' : '#94a3b8',
    borderBottom: active ? '3px solid #772953' : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s'
});

const cardStyle: React.CSSProperties = {
    padding: '30px',
    background: 'white',
    borderRadius: '24px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)in portfioli like cv '
};

const sectionTitle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '18px',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '20px'
};

const timelineContainer: React.CSSProperties = {
    padding: '20px 0'
};

export default AboutApp;
