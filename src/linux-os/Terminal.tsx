import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { processCommand, getTabSuggestions } from './commands';
import type { CommandResponse } from './commands';

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'component' | 'success' | 'ascii';
    content: string | ReactNode;
    path?: string;
}

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [currentPath, setCurrentPath] = useState('/home/bhuban');
    const [inputValue, setInputValue] = useState('');
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState(-1);
    const [isMatrixActive, setIsMatrixActive] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    useEffect(scrollToBottom, [history]);

    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        if (!isMatrixActive) {
            window.addEventListener('click', focusInput);
            focusInput();
        }
        return () => window.removeEventListener('click', focusInput);
    }, [isMatrixActive]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setHistory(prev => [...prev, { type: 'input', content: '', path: currentPath }]);
            setInputValue('');
            return;
        }

        const command = inputValue.trim();
        setHistory(prev => [...prev, { type: 'input', content: command, path: currentPath }]);
        setCmdHistory(prev => [command, ...prev]);
        setHistoryPointer(-1);

        const response: CommandResponse = processCommand(command, currentPath);

        if (response.clear) {
            setHistory([]);
        } else if (response.exit) {
            setHistory(prev => [...prev, { type: 'output', content: response.output }]);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else if (response.type === 'matrix') {
            setIsMatrixActive(true);
            setTimeout(() => setIsMatrixActive(false), 8000);
        } else {
            if (response.output) {
                if (response.output === 'NEOFETCH_MARKER') {
                    setHistory(prev => [...prev, { type: 'component', content: <Neofetch /> }]);
                } else {
                    setHistory(prev => [...prev, {
                        type: response.type === 'error' ? 'error' : (response.type === 'success' ? 'success' : (response.type === 'ascii' ? 'ascii' : 'output')),
                        content: response.output
                    }]);
                }
            }

            if (response.download) {
                console.log(`Triggering download for ${response.download}`);
                // Real implementation would use an actual PDF link
            }

            if (response.newPath) {
                setCurrentPath(response.newPath);
            }
        }

        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyPointer < cmdHistory.length - 1) {
                const next = historyPointer + 1;
                setHistoryPointer(next);
                setInputValue(cmdHistory[next]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyPointer > 0) {
                const next = historyPointer - 1;
                setHistoryPointer(next);
                setInputValue(cmdHistory[next]);
            } else {
                setHistoryPointer(-1);
                setInputValue('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const suggestions = getTabSuggestions(inputValue, currentPath);
            if (suggestions.length === 1) {
                const parts = inputValue.trim().split(/\s+/);
                if (parts.length === 1 && !inputValue.endsWith(' ')) {
                    setInputValue(suggestions[0] + ' ');
                } else {
                    const prefix = parts.slice(0, -1).join(' ');
                    setInputValue((prefix ? prefix + ' ' : '') + suggestions[0]);
                }
            } else if (suggestions.length > 1) {
                setHistory(prev => [...prev, { type: 'output', content: suggestions.join('  ') }]);
            }
        }
    };

    if (isMatrixActive) {
        return <MatrixRain onComplete={() => setIsMatrixActive(false)} />;
    }

    return (
        <div className="terminal" ref={terminalRef}>
            {history.map((line, i) => (
                <div key={i} className={`line-container ${line.type === 'error' ? 'shake' : ''}`}>
                    {line.type === 'input' ? (
                        <div className="prompt-line">
                            <span className="user-host">bhuban@portfolio</span>
                            <span className="separator">:</span>
                            <span className="path">{line.path === '/home/bhuban' ? '~' : line.path}</span>
                            <span className="symbol">$</span>
                            <span className="input-echo">{line.content as string}</span>
                        </div>
                    ) : (
                        <div className={`output-line ${line.type === 'error' ? 'error-text' : (line.type === 'success' ? 'success-text' : '')}`}
                            style={line.type === 'ascii' ? { fontFamily: 'monospace', whiteSpace: 'pre', lineHeight: '1.2' } : {}}>
                            {line.type === 'component' ? (line.content as ReactNode) :
                                (line.type === 'ascii' ? <span>{line.content as string}</span> : <TypingText text={line.content as string} />)}
                        </div>
                    )}
                </div>
            ))}

            <form onSubmit={handleCommand} className="prompt-line">
                <span className="user-host">bhuban@portfolio</span>
                <span className="separator">:</span>
                <span className="path">{currentPath === '/home/bhuban' ? '~' : currentPath}</span>
                <span className="symbol">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="terminal-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};

const TypingText: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 5);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayedText}</span>;
};

const Neofetch: React.FC = () => {
    return (
        <div className="neofetch-container">
            <pre className="ascii-logo">
                {`            .-/+oossssoo+/-.
        .:+ssssssssssssssssss+:.
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+ssssssssNMMMyssssssssssssdMMMMssssssss+
+ssssssssNMMMyssssssssssssdMMMMssssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
   /ssssssssssshdmmNNmmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+ssssssssssssssssssyyssss+-
        .:+ssssssssssssssssss+:.
            .-/+oossssoo+/-.`}
            </pre>
            <div className="system-info">
                <div><span className="user-host">bhuban</span>@<span className="user-host">portfolio</span></div>
                <div>-----------------------</div>
                <div><span className="info-label">OS</span>: Ubuntu 22.04.3 LTS</div>
                <div><span className="info-label">Kernel</span>: 5.15.0-generic</div>
                <div><span className="info-label">Uptime</span>: Since 1999</div>
                <div><span className="info-label">Shell</span>: bash 5.1.16</div>
                <div><span className="info-label">Resolution</span>: 1920x1080</div>
                <div><span className="info-label">DE</span>: GNOME 42.9</div>
                <div><span className="info-label">WM</span>: Mutter</div>
                <div><span className="info-label">CPU</span>: React Core i9</div>
                <div><span className="info-label">Memory</span>: 2048MiB / 16384MiB</div>
            </div>
        </div>
    );
};

const MatrixRain: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 800;
        canvas.height = canvas.parentElement?.clientHeight || 500;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops: number[] = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'black', overflow: 'hidden' }}>
            <canvas ref={canvasRef} />
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#0F0',
                fontSize: '12px',
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px 10px',
                borderRadius: '4px',
                border: '1px solid #0F0'
            }} onClick={onComplete}>
                ESC MATRIX
            </div>
        </div>
    );
};

export default Terminal;
