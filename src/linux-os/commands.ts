import { fileSystem } from './filesystem';
import type { FileSystemNode } from './filesystem';
import type { ReactNode } from 'react';

export type CommandResponse = {
    output: string | ReactNode;
    newPath?: string;
    type?: 'text' | 'component' | 'error' | 'success' | 'matrix' | 'ascii';
    clear?: boolean;
    exit?: boolean;
    openFile?: string;
    download?: string;
};

export const processCommand = (
    command: string,
    currentPath: string
): CommandResponse => {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
        case 'help':
            return {
                output: `Available commands:
  help      - Display this help message
  ls        - List directory contents
  cd <dir>  - Change directory
  cat <file>- Display file contents
  neofetch  - Display system information
  matrix    - Enter the matrix
  fortune   - Get a random tech quote
  resume    - View formatted resume
  contact   - Show contact info
  whoami    - ASCII bio
  sl        - Run the train!
  cowsay    - Cow speaks!
  clear     - Clear terminal
  open <f>  - Open file in viewer
  download  - Download resume PDF
  exit      - Terminate session`,
                type: 'text'
            };

        case 'ls':
            const currentDir = findNodeByPath(currentPath);
            if (currentDir && currentDir.children) {
                return {
                    output: currentDir.children
                        .map(child => (child.type === 'directory' ? child.name + '/' : child.name))
                        .join('  '),
                    type: 'text'
                };
            }
            return { output: '', type: 'text' };

        case 'cd':
            if (!args[0]) return { output: '', newPath: '/home/bhuban' };
            const targetPath = resolvePath(currentPath, args[0]);
            const targetNode = findNodeByPath(targetPath);
            if (targetNode && targetNode.type === 'directory') {
                return { output: '', newPath: targetPath };
            }
            return {
                output: `bash: cd: ${args[0]}: No such file or directory`,
                type: 'error'
            };

        case 'cat':
            if (!args[0]) return { output: 'cat: missing operand', type: 'error' };
            const node = findNodeByPath(resolvePath(currentPath, args[0]));
            if (node && node.type === 'file') {
                return { output: node.content || '', type: 'text' };
            }
            return { output: `cat: ${args[0]}: No such file or directory`, type: 'error' };

        case 'resume':
            return { output: 'Opening resume in viewer...', openFile: 'resume' };

        case 'contact':
            return {
                output: `📧 Email: bhuban.bhandari05@gmail.com
📞 Phone: 9763497318
🔗 GitHub: github.com/Bhuban-tech
📍 Location: Kathmandu, Nepal`,
                type: 'success'
            };

        case 'whoami':
            return {
                output: `
   ____  _           _                 
  | __ )| |__  _   _| |__   __ _ _ __  
  |  _ \\| '_ \\| | | | '_ \\ / _\` | '_ \\ 
  | |_) | | | | |_| | | | | (_| | | | |
  |____/|_| |_|\\__,_|_| |_|\\__,_|_| |_|
                                       
  > Full-Stack Developer
  > BCA Student @ Aadim National College
  > Building the future with Flutter & Spring Boot.`,
                type: 'ascii'
            };

        case 'sl':
            return {
                output: `
      ====        ________                ___________
  _D__G____  _r__R_|_ ______|        _f__F_|_ ______|
 |    |  __  |__   |__   |__   |__   |__   |__   |__   |
 |____|__||__|__||__|__||__|__||__|__||__|__||__|__||__|
  oo  oo      oo  oo      oo  oo      oo  oo      oo  oo
                `,
                type: 'ascii'
            };

        case 'cowsay':
            const msg = args.join(' ') || "Hire Bhuban!";
            return {
                output: `
  < ${msg} >
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
                `,
                type: 'ascii'
            };

        case 'download':
            return {
                output: "Preparing your resume PDF for download... 📥",
                type: 'success',
                download: 'Bhuban_Bhandari_CV.pdf'
            };

        case 'matrix':
            return {
                output: "Entering the matrix...",
                type: 'matrix'
            };

        case 'fortune':
            const fortunes = [
                "The best way to predict the future is to invent it.",
                "Code is like humor. When you have to explain it, it’s bad.",
                "Simplicity is the soul of efficiency.",
                "First, solve the problem. Then, write the code.",
                "Experience is the name everyone gives to their mistakes.",
                "Talk is cheap. Show me the code.",
                "Debugging is like being the detective in a crime movie where you are also the murderer."
            ];
            return {
                output: fortunes[Math.floor(Math.random() * fortunes.length)],
                type: 'text'
            };

        case 'clear':
            return { output: '', clear: true };

        case 'exit':
            return { output: 'logout\nConnection to portfolio closed.', exit: true };

        case 'neofetch':
            return { output: 'NEOFETCH_MARKER', type: 'component' };

        case 'open':
            if (!args[0]) return { output: 'open: missing filename', type: 'error' };
            return { output: `Opening ${args[0]}...`, openFile: args[0] };

        default:
            if (cmd === '') return { output: '' };
            return {
                output: `bash: ${cmd}: command not found`,
                type: 'error'
            };
    }
};

export const findNodeByPath = (path: string): FileSystemNode | null => {
    if (path === '/') return fileSystem;
    const parts = path.split('/').filter(p => p !== '');
    let current: FileSystemNode | undefined = fileSystem;

    for (const part of parts) {
        if (!current || !current.children) return null;
        current = current.children.find(child => child.name === part);
    }
    return current || null;
};

const resolvePath = (current: string, target: string): string => {
    if (target.startsWith('/')) return target;
    if (target === '..') {
        const parts = current.split('/').filter(p => p !== '');
        if (parts.length === 0) return '/';
        return '/' + parts.slice(0, -1).join('/');
    }
    if (target === '.') return current;

    const currentClean = current === '/' ? '' : current;
    return `${currentClean}/${target}`.replace(/\/+/g, '/');
};

export const getTabSuggestions = (input: string, currentPath: string): string[] => {
    const parts = input.trim().split(/\s+/);
    const lastPart = parts[parts.length - 1];

    const commands = ['help', 'ls', 'cd', 'cat', 'neofetch', 'clear', 'exit', 'open', 'download', 'matrix', 'fortune', 'resume', 'contact', 'whoami', 'sl', 'cowsay'];
    if (parts.length === 1 && !input.endsWith(' ')) {
        return commands.filter(c => c.startsWith(lastPart.toLowerCase()));
    }

    const currentDir = findNodeByPath(currentPath);
    if (currentDir && currentDir.children) {
        const search = input.endsWith(' ') ? '' : lastPart;
        return currentDir.children
            .map(c => c.name)
            .filter(name => name.startsWith(search));
    }

    return [];
};
