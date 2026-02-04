import React from 'react';

// Common SVG Props for the icons
interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    active?: boolean;
}

// 1. Terminal Icon
export const TerminalIcon: React.FC<IconProps> = ({ size = 64, active = false, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="terminalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2C2C2C" />
                <stop offset="100%" stopColor="#0A0A0A" />
            </linearGradient>
            <filter id="terminalShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="10" fill="url(#terminalGrad)" filter="url(#terminalShadow)" stroke="#3A3A3A" strokeWidth="1.5" />
        <text x="12" y="32" fill="#4AF626" fontFamily="monospace" fontSize="18" fontWeight="bold" dominantBaseline="middle">$</text>
        <rect x="26" y="24" width="12" height="16" fill="#E95420" className={active ? "cursor-blink" : ""}>
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
        <path d="M 52 4 L 60 4 L 60 12 Z" fill="#E95420" opacity="0.6" />
    </svg>
);

// 2. File Manager (Folders)
export const FolderIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 12C4 9.79086 5.79086 8 8 8H24L30 14H56C58.2091 14 60 15.7909 60 18V52C60 54.2091 58.2091 56 56 56H8C5.79086 56 4 54.2091 4 52V12Z" fill="#CC4519" />
        <path d="M4 18C4 15.7909 5.79086 14 8 14H56C58.2091 14 60 15.7909 60 18V52C60 54.2091 58.2091 56 56 56H8C5.79086 56 4 54.2091 4 52V18Z" fill="#E95420" />
        <path d="M4 24C4 21.7909 5.79086 20 8 20H56C58.2091 20 60 21.7909 60 24V52C60 54.2091 58.2091 56 56 56H8C5.79086 56 4 54.2091 4 52V24Z" fill="#FF6B35" />
        <path d="M10 11H18V13H10V11Z" fill="white" opacity="0.4" />
        <rect x="12" y="32" width="40" height="2" rx="1" fill="white" opacity="0.2" />
        <rect x="12" y="38" width="30" height="2" rx="1" fill="white" opacity="0.2" />
    </svg>
);

// 3. About Me Icon
export const AboutMeIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#772953" />
                <stop offset="100%" stopColor="#0E8EE9" />
            </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#aboutGrad)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.3))" />
        <circle cx="32" cy="24" r="8" fill="white" />
        <path d="M16 46C16 38.268 22.268 32 30 32H34C41.732 32 48 38.268 48 46V50H16V46Z" fill="white" />
        <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
        <circle cx="50" cy="18" r="6" fill="#00ffcc" stroke="white" strokeWidth="2" />
        <path d="M48 18L49.5 19.5L52.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// 4. Resume Icon
export const ResumeIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="10" y="6" width="44" height="52" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M40 6L54 20H44C41.7909 20 40 18.2091 40 16V6Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="16" y="14" width="16" height="4" rx="2" fill="#E95420" />
        <rect x="16" y="26" width="32" height="2" rx="1" fill="#CBD5E1" />
        <rect x="16" y="32" width="32" height="2" rx="1" fill="#CBD5E1" />
        <rect x="16" y="38" width="24" height="2" rx="1" fill="#CBD5E1" />
        <circle cx="38" cy="14" r="5" fill="#E2E8F0" />
    </svg>
);

// 5. Projects Gallery Icon
export const ProjectsIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="6" y="6" width="24" height="24" rx="6" fill="#0E8EE9" />
        <rect x="34" y="6" width="24" height="24" rx="6" fill="#38A169" />
        <rect x="6" y="34" width="24" height="24" rx="6" fill="#E95420" />
        <rect x="34" y="34" width="24" height="24" rx="6" fill="#772953" />
        <rect x="12" y="12" width="12" height="12" rx="2" fill="white" opacity="0.3" />
        <rect x="40" y="12" width="12" height="12" rx="2" fill="white" opacity="0.3" />
        <rect x="12" y="40" width="12" height="12" rx="2" fill="white" opacity="0.3" />
        <path d="M46 41V51M41 46H51" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

// 6. Kritim Guru Icon
export const KritimGuruIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="guruGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E8EE9" />
                <stop offset="100%" stopColor="#4A90E2" />
            </linearGradient>
        </defs>
        <rect x="12" y="6" width="40" height="52" rx="8" fill="url(#guruGrad)" stroke="white" strokeWidth="2" />
        <path d="M20 28L32 20L44 28V36L32 44L20 36V28Z" fill="white" />
        <path d="M32 20L44 28V30L32 22L20 30V28L32 20Z" fill="#E95420" />
        <rect x="44" y="6" width="16" height="16" rx="8" fill="#E95420" stroke="white" strokeWidth="2" />
        <text x="52" y="15" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">10K+</text>
    </svg>
);

// 7. KritimSMS Icon
export const KritimSMSIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="smsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38A169" />
                <stop offset="100%" stopColor="#2F855A" />
            </linearGradient>
        </defs>
        <rect x="8" y="8" width="48" height="48" rx="10" fill="url(#smsGrad)" />
        <path d="M16 20H48V44H16V20Z" fill="white" opacity="0.1" />
        <rect x="22" y="26" width="20" height="2" rx="1" fill="white" />
        <rect x="22" y="32" width="15" height="2" rx="1" fill="white" />
        <rect x="22" y="38" width="18" height="2" rx="1" fill="white" />
        <path d="M38 12L42 16L48 10" stroke="#00ffcc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// 8. HamroGharSewa Icon
export const HamroGharSewaIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E95420" />
                <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
        </defs>
        <path d="M32 8L6 30H12V54H52V30H58L32 8Z" fill="url(#houseGrad)" stroke="white" strokeWidth="1" />
        <rect x="26" y="40" width="12" height="14" fill="white" opacity="0.8" />
        <circle cx="32" cy="22" r="6" fill="white" opacity="0.2" />
        <path d="M18 42L46 14" stroke="white" strokeWidth="2" opacity="0.4" />
        <path d="M46 42L18 14" stroke="white" strokeWidth="2" opacity="0.4" />
    </svg>
);

// 9. Contact / Email Icon
export const ContactIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="6" y="14" width="52" height="36" rx="6" fill="#0E8EE9" />
        <path d="M6 14L32 34L58 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="34" r="8" fill="white" />
        <text x="32" y="35" fill="#0E8EE9" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">@</text>
        <circle cx="52" cy="14" r="5" fill="#E95420" stroke="white" strokeWidth="2" />
    </svg>
);

// 10. Games Icon
export const GamesIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="gameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#772953" />
                <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
        </defs>
        <rect x="8" y="20" width="48" height="24" rx="12" fill="url(#gameGrad)" />
        <path d="M14 32H22M18 28V36" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="42" cy="28" r="3" fill="#00ffcc" />
        <circle cx="48" cy="34" r="3" fill="#ffcc00" />
        <path d="M30 20C30 14 34 14 34 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// 11. Music Icon
export const MusicIcon: React.FC<IconProps> = ({ size = 64, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8E2DE2" />
                <stop offset="100%" stopColor="#4A00E0" />
            </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#musicGrad)" />
        <path d="M24 44V20L44 14V38" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="44" r="4" fill="white" />
        <circle cx="40" cy="38" r="4" fill="white" />
    </svg>
);

// Exports a map for easy lookup
export const CustomIcons = {
    terminal: TerminalIcon,
    files: FolderIcon,
    about: AboutMeIcon,
    resume: ResumeIcon,
    showcase: ProjectsIcon,
    kritimGuru: KritimGuruIcon,
    kritimSMS: KritimSMSIcon,
    hamrogharsewa: HamroGharSewaIcon,
    contact: ContactIcon,
    games: GamesIcon,
    music: MusicIcon
};
