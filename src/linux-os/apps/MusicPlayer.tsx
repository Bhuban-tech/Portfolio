import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc } from 'lucide-react';

const MusicPlayer: React.FC = () => {
    const bars = Array.from({ length: 45 });
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="music-app">
            <div className="music-visualizer">
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '180px',
                    background: 'linear-gradient(45deg, #e95420, #300a24)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    <Disc size={100} className={isPlaying ? 'animate-spin-slow' : ''} style={{ animation: isPlaying ? 'spin 5s linear infinite' : 'none' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', height: '100px', marginTop: '160px' }}>
                    {bars.map((_, i) => (
                        <div
                            key={i}
                            className={`viz-bar ${isPlaying ? 'viz-bar-anim' : ''}`}
                            style={{
                                height: isPlaying ? '20px' : '5px',
                                animationDelay: `${i * 0.03}s`,
                                animationDuration: `${0.4 + Math.random() * 0.4}s`,
                                opacity: 0.6 + (i % 5) * 0.1,
                                width: '3px',
                                margin: '0 1px'
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="music-controls">
                <div className="song-info">
                    <div className="song-name">Lofi Coding Session</div>
                    <div className="artist-name">Bhuban's Portfolio Radio</div>
                    <div style={{ width: '100%', height: '4px', background: '#444', marginTop: '8px', borderRadius: '2px' }}>
                        <div style={{ width: '65%', height: '100%', background: '#e95420', borderRadius: '2px' }}></div>
                    </div>
                </div>

                <div className="playback-btns" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button style={btnStyle} type="button"><SkipBack size={20} fill="currentColor" /></button>
                    <button
                        style={{ ...btnStyle, padding: '10px', background: 'var(--ubuntu-orange)', borderRadius: '50%', margin: '0 10px' }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        type="button"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />}
                    </button>
                    <button style={btnStyle} type="button"><SkipForward size={20} fill="currentColor" /></button>
                </div>

                <div className="volume" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#888' }}>
                    <Volume2 size={18} />
                    <div style={{ width: '80px', height: '4px', background: '#444', borderRadius: '2px' }}>
                        <div style={{ width: '75%', height: '100%', background: '#888', borderRadius: '2px' }}></div>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none'
};

export default MusicPlayer;
