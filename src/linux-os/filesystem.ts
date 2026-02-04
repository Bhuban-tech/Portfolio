export interface FileSystemNode {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystemNode[];
}

export const fileSystem: FileSystemNode = {
    name: '/',
    type: 'directory',
    children: [
        {
            name: 'home',
            type: 'directory',
            children: [
                {
                    name: 'bhuban',
                    type: 'directory',
                    children: [
                        {
                            name: 'Quick-Access',
                            type: 'directory',
                            children: [
                                { name: 'Resume.pdf', type: 'file', content: "[Binary PDF Data] Trigger 'download' command to view." },
                                { name: 'Contact-Me.link', type: 'file', content: "Email: bhuban.bhandari05@gmail.com\nPhone: 9763497318\nGitHub: github.com/Bhuban-tech" }
                            ]
                        },
                        {
                            name: 'Professional',
                            type: 'directory',
                            children: [
                                {
                                    name: 'Experience',
                                    type: 'directory',
                                    children: [
                                        {
                                            name: 'Kritim-Mind-Tech',
                                            type: 'directory',
                                            children: [
                                                { name: 'role.md', type: 'file', content: "# Full-Stack Developer\nContributing to core platforms like Kritim Guru and KritimSMS." },
                                                { name: 'tech-stack.yaml', type: 'file', content: "Backend: Spring Boot\nFrontend: Flutter, React\nDB: MySQL" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'Education',
                                    type: 'directory',
                                    children: [
                                        { name: 'college.md', type: 'file', content: "Aadim National College\nBCA 4th Semester" }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Projects',
                            type: 'directory',
                            children: [
                                {
                                    name: 'kritim-guru',
                                    type: 'directory',
                                    children: [
                                        { name: 'README.md', type: 'file', content: "# Kritim Guru\nA comprehensive mobile learning application built with Flutter and Spring Boot." },
                                        { name: 'architecture.md', type: 'file', content: "High-level design: Microservices approach with Spring Cloud (Mockup)" }
                                    ]
                                },
                                {
                                    name: 'kritimsms',
                                    type: 'directory',
                                    children: [
                                        { name: 'README.md', type: 'file', content: "# KritimSMS\nFull-featured school management system with bulk messaging features." }
                                    ]
                                },
                                {
                                    name: 'hamrogharsewa',
                                    type: 'directory',
                                    children: [
                                        { name: 'README.md', type: 'file', content: "# HamroGharSewa\nMarketplace for home services." }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'Fun',
                            type: 'directory',
                            children: [
                                { name: 'secret.txt', type: 'file', content: "You found the hidden file! Type 'matrix' for a surprise." }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
