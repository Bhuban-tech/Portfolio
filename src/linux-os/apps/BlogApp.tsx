import React, { useState } from 'react';
import {
    BookOpen,
    Search,
    Heart,
    MessageSquare,
    Share2,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
    image: string;
}

const BlogApp: React.FC = () => {
    const [posts] = useState<Post[]>([
        {
            id: '1',
            title: 'Mastering Spring Boot Microservices for Scale',
            excerpt: "How we optimized Kritim Guru's educational ERP to handle 10k+ concurrent students using message brokers...",
            date: 'Jan 15, 2024',
            readTime: '8 min read',
            category: 'Engineering',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
            content: "Spring Boot has become the de-facto standard for building microservices in the Java ecosystem. In this article, we'll dive deep into Service Discovery, Load Balancing, and Circuit Breakers..."
        },
        {
            id: '2',
            title: 'Flutter vs React Native in 2024: A Developer\'s Perspective',
            excerpt: "After building 3+ production apps in each, here is the honest truth about performance and developer velocity...",
            date: 'Dec 22, 2023',
            readTime: '12 min read',
            category: 'Mobile',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
            content: "Choosing between Flutter and React Native is often more about the team's familiarity than the tech itself, but there are key differences in rendering engines..."
        },
        {
            id: '3',
            title: 'Building bhubanOS: Reimagining the Web Portfolio',
            excerpt: "Why I decided to build a Linux-based operating system inside a browser to showcase my development career...",
            date: 'Today',
            readTime: '5 min read',
            category: 'Personal',
            image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop',
            content: "Modern portfolios are boring. They are static lists of skills. I wanted to create an experience that feels alive..."
        }
    ]);

    const [activePost, setActivePost] = useState<Post | null>(null);

    return (
        <div style={containerStyle}>
            {/* Sidebar / Navigation */}
            <div style={sidebarStyle}>
                <div style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                        <div style={logoBadge}><BookOpen size={20} color="white" /></div>
                        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Bhuban Blogs</h2>
                    </div>

                    <div style={searchBox}>
                        <Search size={16} color="#94a3b8" />
                        <input type="text" placeholder="Search articles..." style={searchInput} />
                    </div>

                    <div style={navSection}>
                        <div style={navLabel}>CATEGORIES</div>
                        <NavItem label="Engineering" count={12} active />
                        <NavItem label="Mobile Dev" count={8} />
                        <NavItem label="Tutorials" count={24} />
                        <NavItem label="Personal" count={5} />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={mainRegion}>
                <AnimatePresence mode="wait">
                    {activePost ? (
                        <motion.div
                            key="reader"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={readerArea}
                        >
                            <button onClick={() => setActivePost(null)} style={backBtn}>← Back to Blog</button>
                            <img src={activePost.image} style={heroImage} alt="" />
                            <div style={postMeta}>
                                <span style={catTag}>{activePost.category}</span>
                                <span>{activePost.date}</span>
                                <span>•</span>
                                <span>{activePost.readTime}</span>
                            </div>
                            <h1 style={readerTitle}>{activePost.title}</h1>
                            <div style={readerContent}>
                                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#334155' }}>{activePost.content}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <div style={readerFooter}>
                                <button style={footerAction}><Heart size={18} /> Like</button>
                                <button style={footerAction}><MessageSquare size={18} /> Comment</button>
                                <button style={footerAction}><Share2 size={18} /> Share</button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={listArea}
                        >
                            <h1 style={pageTitle}>Recent Articles</h1>
                            <div style={blogGrid}>
                                {posts.map(post => (
                                    <PostCard key={post.id} post={post} onClick={() => setActivePost(post)} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Components
const NavItem: React.FC<{ label: string, count: number, active?: boolean }> = ({ label, count, active }) => (
    <div style={{
        ...navItemStyle,
        background: active ? 'rgba(119, 41, 83, 0.08)' : 'transparent',
        color: active ? '#772953' : '#64748b'
    }}>
        <span>{label}</span>
        <span style={navCount}>{count}</span>
    </div>
);

const PostCard: React.FC<{ post: Post, onClick: () => void }> = ({ post, onClick }) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        style={postCardStyle}
    >
        <div style={{ ...cardImage, backgroundImage: `url(${post.image})` }}></div>
        <div style={{ padding: '25px' }}>
            <div style={cardMeta}>
                <span style={catTag}>{post.category}</span>
                <span>{post.readTime}</span>
            </div>
            <h3 style={cardTitle}>{post.title}</h3>
            <p style={cardExcerpt}>{post.excerpt}</p>
            <div style={cardFooter}>
                <span>{post.date}</span>
                <ChevronRight size={16} color="#772953" />
            </div>
        </div>
    </motion.div>
);

// Styles
const containerStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    background: '#ffffff',
    color: '#1e293b'
};

const sidebarStyle: React.CSSProperties = {
    width: '320px',
    background: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
};

const logoBadge: React.CSSProperties = {
    width: '40px',
    height: '40px',
    background: '#772953',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const searchBox: React.CSSProperties = {
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '30px'
};

const searchInput: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '100%'
};

const navSection: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const navLabel: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 800,
    color: '#94a3b8',
    letterSpacing: '1px',
    marginBottom: '10px'
};

const navItemStyle: React.CSSProperties = {
    padding: '12px 18px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s'
};

const navCount: React.CSSProperties = {
    fontSize: '11px',
    opacity: 0.6
};

const mainRegion: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto'
};

const listArea: React.CSSProperties = {
    padding: '50px 60px'
};

const pageTitle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 800,
    marginBottom: '40px',
    letterSpacing: '-1px'
};

const blogGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px'
};

const postCardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid #f1f5f9',
    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
    cursor: 'pointer'
};

const cardImage: React.CSSProperties = {
    height: '200px',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};

const cardMeta: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '15px'
};

const catTag: React.CSSProperties = {
    padding: '4px 10px',
    background: 'rgba(119, 41, 83, 0.08)',
    color: '#772953',
    borderRadius: '8px',
    fontWeight: 700
};

const cardTitle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 800,
    lineHeight: '1.4',
    marginBottom: '12px',
    color: '#1e293b'
};

const cardExcerpt: React.CSSProperties = {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '20px'
};

const cardFooter: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: '#94a3b8',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '15px'
};

const readerArea: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px'
};

const backBtn: React.CSSProperties = {
    padding: '10px 0',
    background: 'none',
    border: 'none',
    color: '#772953',
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: '30px'
};

const heroImage: React.CSSProperties = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '24px',
    marginBottom: '30px'
};

const postMeta: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '20px'
};

const readerTitle: React.CSSProperties = {
    fontSize: '44px',
    fontWeight: 900,
    lineHeight: '1.1',
    letterSpacing: '-2px',
    marginBottom: '40px',
    color: '#1e293b'
};

const readerContent: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#334155'
};

const readerFooter: React.CSSProperties = {
    marginTop: '60px',
    paddingTop: '30px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    gap: '20px'
};

const footerAction: React.CSSProperties = {
    background: '#f8fafc',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#64748b',
    cursor: 'pointer'
};

export default BlogApp;
