import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
    "[  BIOS  ] Initializing bhubanOS v2.0...",
    "[  GRUB  ] Loading professional.portfolio...",
    "[ KERNEL ] Mounting /career /skills /projects",
    "[ SYSTEM ] Starting creativity.service ✓",
    "[  SKILL ] Loading Flutter.framework... [ DONE ]",
    "[  SKILL ] Attaching SpringBoot.backend... [ DONE ]",
    "[  SKILL ] Mounting React.frontend... [ DONE ]",
    "[  INIT  ] Welcome, Recruiter!",
];

interface BootSequenceProps {
    onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<'bios' | 'logs' | 'complete'>('bios');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (phase === 'bios') {
            const timer = setTimeout(() => setPhase('logs'), 2000);
            return () => clearTimeout(timer);
        }

        if (phase === 'logs') {
            if (currentIndex < BOOT_LOGS.length) {
                const delay = Math.random() * 300 + 100;
                const timer = setTimeout(() => {
                    setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
                    setCurrentIndex(prev => prev + 1);
                    setProgress((currentIndex + 1) / BOOT_LOGS.length * 100);
                }, delay);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setPhase('complete'), 1000);
                return () => clearTimeout(timer);
            }
        }

        if (phase === 'complete') {
            onComplete();
        }
    }, [currentIndex, phase, onComplete]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Enter') onComplete();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onComplete]);

    return (
        <div className="boot-sequence" style={{
            background: 'black',
            color: '#eee',
            fontFamily: "'Ubuntu Mono', monospace",
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: phase === 'bios' ? 'center' : 'flex-start'
        }}>
            <AnimatePresence mode="wait">
                {phase === 'bios' && (
                    <motion.div
                        key="bios"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: 'center' }}
                    >
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>BHUBAN BHANDARI</h1>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Energy Efficient BIOS v4.0</p>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Copyright (C) 1999-2026</p>
                        <div style={{ marginTop: '40px', color: '#0f0' }}>CPU: React Core i9-14900K @ 6.0GHz</div>
                        <div style={{ color: '#0f0' }}>RAM: 65536MB [OK]</div>
                        <div style={{ marginTop: '20px' }}>Initializing System...</div>
                    </motion.div>
                )}

                {phase === 'logs' && (
                    <motion.div
                        key="logs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ width: '100%', maxWidth: '800px' }}
                    >
                        {logs.map((log, i) => (
                            <div key={i} style={{ marginBottom: '5px', fontSize: '0.95rem' }}>
                                <span style={{ color: '#0f0', marginRight: '10px' }}>{log.split(']')[0] + ']'}</span>
                                {log.split(']')[1]}
                            </div>
                        ))}

                        <div style={{ marginTop: '30px', width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem' }}>
                                <span>Loading Core Modules</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div style={{ height: '4px', width: '100%', background: '#333', borderRadius: '2px' }}>
                                <motion.div
                                    style={{ height: '100%', background: '#0f0', borderRadius: '2px' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="skip-hint" style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: 0.4,
                fontSize: '0.8rem'
            }}>
                Press ESC to skip or ENTER to start
            </div>
        </div>
    );
};

export default BootSequence;
