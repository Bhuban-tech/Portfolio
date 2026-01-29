import { Code, Globe } from 'lucide-react';

import kritimGuruImg from '../assets/kritim-guru.png';
import smsProjectsImg from '../assets/sms-projects.png';
import hamroGhareSewaImg from '../assets/hamro-ghare-sewa.png';

export const ATMOSPHERIC_DESCRIPTIONS = {
    loading: "Initializing antigravity protocols... Suspending portfolio elements... Ready for liftoff.",
    scroll: [
        "Drift deeper into the experience",
        "Let gravity release its hold",
        "Float through my creative universe"
    ],
    hover: [
        "Window approaching your viewport",
        "Gravitational pull detected",
        "Project entering your orbit"
    ],
    visual: [
        "Soft particles drift lazily across the starfield backdrop",
        "Each window casts a subtle glow, illuminating the dark void",
        "Ethereal light beams connect floating elements",
        "Glass-morphic windows reflect the cosmos beyond",
        "Depth parallax creates layers of infinite space",
        "Smooth camera movements simulate zero-gravity drift"
    ],
    microInteractions: [
        "Windows gently rotate on hover, revealing dimensional depth",
        "Content fragments float independently within each frame",
        "Cursor creates ripples in the space-time fabric",
        "Elements respond to scroll with weightless momentum",
        "Transitions feel like drifting through space stations"
    ],
    sectionDividers: [
        "// Entering new dimension //",
        "/// Shifting perspective ///",
        ">> NEXT ORBITAL SECTOR >>"
    ]
};

export const PORTFOLIO_DATA = {
    about: {
        title: "Bhuban Bhandari",
        tag: "Software Engineer",
        description: "Undergraduate BCA student at Aadim National College. passionate about building scalable solutions.",
        stats: [
            { icon: Code, label: "Full Stack", value: "Web & Mobile" },
            { icon: Globe, label: "Kritim Guru", value: "Current Workplace" }
        ]
    },
    projects: {
        title: "Professional Projects",
        tag: "Work Gallery",
        description: "A collection of my professional work and personal projects developed with precision and care.",
        items: [
            {
                title: "Kritim Guru",
                description: "An AI-powered educational platform designed to enhance student engagement and personalized learning paths.",
                tech: ["React", "Node.js", "AI Integration", "PostgreSQL"],
                live: "#",
                github: "#",
                image: kritimGuruImg,
                color: "#ff6600"
            },
            {
                title: "SMS Projects",
                description: "A comprehensive bulk SMS management system for enterprises, featuring real-time analytics and delivery tracking.",
                tech: ["Java", "Spring Boot", "MySQL", "SMPP"],
                live: "#",
                github: "#",
                image: smsProjectsImg,
                color: "#0052cc"
            },
            {
                title: "Hamro Ghare sewa",
                description: "A digital marketplace connecting customers with professional home service providers for plumbing, electrical, and more.",
                tech: ["Flutter", "Firebase", "Google Maps API"],
                live: "#",
                github: "#",
                image: hamroGhareSewaImg,
                color: "#75bb2a"
            }
        ]
    },
    skills: {
        title: "Technical Expertise",
        tag: "Tools & Technologies",
        description: "Proficient in modern web and mobile development technologies.",
        groups: [
            {
                category: "Mobile & Web",
                stack: ["Flutter", "React", "HTML/CSS", "JavaScript"]
            },
            {
                category: "Backend",
                stack: ["Java", "Spring Boot", "Python", "Node.js"]
            },
            {
                category: "Database & Tools",
                stack: ["MySQL", "Git", "VS Code"]
            }
        ]
    },
    experience: {
        title: "Professional Journey",
        tag: "Experience & Education",
        description: "My academic and professional milestones.",
        items: [
            {
                title: "Software Developer",
                company: "Kritim Mind Technology",
                period: "Present",
                type: "work",
                description: "Working on Kritim Guru projects and various software solutions."
            },
            {
                title: "SMS Projects Developer",
                company: "Freelance",
                period: "2024",
                type: "work",
                description: "Developed and managed SMS-based projects."
            },
            {
                title: "Bachelor of Computer Application (BCA)",
                company: "Aadim National College",
                period: "Undergraduate",
                type: "education",
                description: "Pursuing degree in Computer Application."
            }
        ]
    },
    testimonials: {
        title: "Voices from the Ether",
        tag: "Client Transmissions",
        description: "Words of praise floating through space. Hear what collaborators say about working in a gravity-free creative environment.",
        items: [
            {
                name: "Sarah Jenkins",
                role: "Product Manager at Stratos",
                text: "Working with Bhuban was like zero-gravity - effortless and smooth. The final product exceeded our orbital expectations."
            },
            {
                name: "David Chen",
                role: "CTO at NebulaLabs",
                text: "A true architect of dreams. The attention to detail and antigravity animations brought our vision to life."
            },
            {
                name: "Elena Rodriguez",
                role: "Founder of VoidSpace",
                text: "Exceptional creativity. The project timeline floated perfectly on track."
            }
        ]
    },
    contact: {
        title: "Open Communication Channel",
        tag: "Reach Across Space",
        description: "Let's connect across the digital void. Send your message through the antigravity portal and watch collaboration take flight.",
        email: "bhuban@example.com",
        location: "Kathmandu, Nepal" // Assuming based on user name, or kept generic
    }
};
