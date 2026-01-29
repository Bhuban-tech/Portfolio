import './Resume.css';

export const Resume = () => {
    return (
        <div className="cv-container">
            <div className="cv-page">
                <header className="cv-header">
                    <h1 className="cv-name">BHUBAN BHANDARI</h1>
                    <div className="contact-line">
                        <span>Kathmandu, Nepal</span>
                        <span className="cv-dot">•</span>
                        <span>9763497318</span>
                        <span className="cv-dot">•</span>
                        <span>bhuban.bhandari05@gmail.com</span>
                        <span className="cv-dot">•</span>
                        <span>github.com/Bhuban-tech</span>
                    </div>
                </header>

                <main className="cv-content">
                    <section className="cv-section">
                        <h2 className="section-title">SUMMARY</h2>
                        <div className="section-divider"></div>
                        <p className="summary-text">
                            Motivated BCA undergraduate with practical experience in software development through internships
                            and live projects. Skilled in <strong>Flutter, React, and Spring Boot</strong>, with hands-on
                            involvement in real-world applications. Currently contributing to <strong>Kritim Guru</strong>
                            projects and continuously improving technical and problem-solving skills.
                        </p>
                    </section>

                    <section className="cv-section">
                        <h2 className="section-title">WORK EXPERIENCE</h2>
                        <div className="section-divider"></div>

                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company"><strong>Intern</strong>, Kritim Mind Technology</span>
                                <span className="item-date">8 Months</span>
                            </div>
                            <ul className="item-bullets">
                                <li>Participated in Python workshops and practical sessions to enhance backend logic.</li>
                                <li>Worked on real-world project tasks and feature implementation for production-ready apps.</li>
                                <li>Assisted in <strong>Flutter application development</strong>, focusing on UI/UX and state management.</li>
                                <li>Supported backend APIs using <strong>Spring Boot</strong> and Java for seamless data communication.</li>
                                <li>Gained exposure to teamwork, debugging, and SDLC practices in a professional environment.</li>
                            </ul>
                        </div>

                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company">
                                    <strong>Developer</strong>, Kritim Mind Technology (
                                    <a href="https://kritimmind.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#764bab', fontWeight: '600' }}>
                                        kritimmind.com
                                    </a>)
                                </span>
                                <span className="item-date">Present</span>
                            </div>
                            <ul className="item-bullets">
                                <li>Actively contributing to <strong>Kritim Guru</strong> and other core projects.</li>
                                <li>Developing <strong>Flutter frontend</strong> and <strong>Spring Boot backend</strong> modules.</li>
                                <li>Ensuring seamless integration and optimal performance of platform features.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="cv-section">
                        <h2 className="section-title">PROJECTS</h2>
                        <div className="section-divider"></div>

                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company"><strong>Kritim Guru Platform</strong></span>
                                <span className="item-date">Ongoing</span>
                            </div>
                            <ul className="item-bullets">
                                <li>Developing a comprehensive mobile application using <strong>Flutter</strong> and Dart.</li>
                                <li>Integrating backend services with <strong>Spring Boot</strong> and <strong>MySQL</strong> for efficient data management.</li>
                            </ul>
                        </div>

                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company"><strong>KritimSMS</strong></span>
                                <span className="item-date">Completed</span>
                            </div>
                            <ul className="item-bullets">
                                <li>Developed a robust management system using <strong>Next.js</strong> for the frontend and <strong>Spring Boot</strong> with <strong>MySQL</strong> for the backend.</li>
                                <li>Implemented a <strong>template-based bulk messaging</strong> system to facilitate efficient communication for educational institutions.</li>
                                <li>Built core modules for student enrollment, attendance tracking, and grading systems.</li>
                            </ul>
                        </div>

                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company"><strong>HamroGharSewa (Academic Project)</strong></span>
                                <span className="item-date">Ongoing</span>
                            </div>
                            <ul className="item-bullets">
                                <li>Developing a full-stack home service management platform as a key academic project.</li>
                                <li>Building a cross-platform mobile application using <strong>Flutter</strong> for seamless user interaction.</li>
                                <li>Implementing a robust backend using <strong>Spring Boot</strong> and <strong>MySQL</strong> to manage service bookings and user data.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="cv-section">
                        <h2 className="section-title">HACKATHONS & PARTICIPATION</h2>
                        <div className="section-divider"></div>
                        <div className="experience-item">
                            <div className="item-header">
                                <span className="position-company"><strong>Hackathon Participant</strong></span>
                            </div>
                            <ul className="item-bullets">
                                <li>Actively participated in competitive hackathons, collaborating with cross-functional teams to build MVP solutions.</li>
                                <li>Contributed to frontend development using Flutter and implemented logic for project tasks, utilizing knowledge from Python workshops and Spring Boot applications.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="cv-section">
                        <h2 className="section-title">EDUCATION</h2>
                        <div className="section-divider"></div>

                        <div className="education-item">
                            <div className="item-header">
                                <span className="degree-school"><strong>Bachelor of Computer Applications (BCA)</strong>, Aadim National College</span>
                                <span className="item-date">4th Semester</span>
                            </div>
                            <p className="school-info">Affiliated with Tribhuvan University</p>
                        </div>
                    </section>

                    <section className="cv-section">
                        <h2 className="section-title">ADDITIONAL INFORMATION</h2>
                        <div className="section-divider"></div>
                        <ul className="additional-bullets">
                            <li><strong>Technical Skills:</strong> Flutter (Dart), Next.js, React.js, Spring Boot, Java, MySQL</li>
                            <li><strong>Languages:</strong> English (Fluent), Nepali (Native)</li>
                            <li><strong>Soft Skills:</strong> Team collaboration, Problem-solving, Communication, Quick learner</li>
                        </ul>
                    </section>

                </main>
            </div>
        </div>
    );
};
