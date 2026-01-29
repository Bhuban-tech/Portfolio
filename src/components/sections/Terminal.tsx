import React, { useState, useEffect, useRef } from 'react';

export const Terminal = () => {
    const [history, setHistory] = useState<string[]>([
        'MitchIvin XP v3.0 (Nov 2025)',
        'Inspired by Windows XP',
        '',
        'Type \'help\' for a list of commands.',
        'Press ENTER/RETURN to execute commands.',
        ''
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        let response = '';
        if (cmd === 'help') {
            response = 'Available commands: help, about, projects, contact, clear, exit';
        } else if (cmd === 'about') {
            response = 'Bhuban Bhandari - Software Developer specialized in Flutter and Spring Boot.';
        } else if (cmd === 'projects') {
            response = 'HamroGharSewa, Portfolio, etc. Type "projects" to see more.';
        } else if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        } else if (cmd === 'exit') {
            // In a real app we might close the window here
            response = 'Type exit to close (Simulation)';
        } else if (cmd !== '') {
            response = `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`;
        }

        setHistory(prev => [...prev, `C:\\>${input}`, response].filter(line => line !== ''));
        setInput('');
    };

    return (
        <div
            ref={scrollRef}
            className="w-full h-full bg-black text-white font-mono p-4 overflow-y-auto selection:bg-white selection:text-black"
            onClick={() => document.getElementById('terminal-input')?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
            ))}
            <form onSubmit={handleCommand} className="flex">
                <span className="mr-2">C:\&gt;</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
