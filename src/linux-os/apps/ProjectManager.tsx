import React, { useState } from 'react';
import {
    Layout,
    Plus,
    MoreHorizontal,
    Clock,
    Users,
    Filter,
    Settings
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';

interface Task {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
    tags: string[];
}

const ProjectManager: React.FC = () => {
    const [todo, setTodo] = useState<Task[]>([
        { id: '1', title: 'Optimize Spring Boot Microservices', priority: 'high', dueDate: 'Feb 10', tags: ['Backend', 'Kritim'] },
        { id: '2', title: 'Implement AI Chatbot in Portfolio', priority: 'medium', dueDate: 'Feb 15', tags: ['Feature', 'AI'] }
    ]);

    const [inProgress, setInProgress] = useState<Task[]>([
        { id: '3', title: 'Revamp About Me UI', priority: 'high', dueDate: 'Today', tags: ['Design', 'Phase 5'] },
        { id: '4', title: 'Connect Visitor Analytics', priority: 'medium', dueDate: 'Feb 06', tags: ['Data', 'SEO'] }
    ]);

    const [done, setDone] = useState<Task[]>([
        { id: '5', title: 'BIOS Boot Sequence', priority: 'high', dueDate: 'Done', tags: ['Core', 'OS'] },
        { id: '6', title: 'Persona Login System', priority: 'high', dueDate: 'Done', tags: ['UX', 'System'] }
    ]);

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={iconBadge}><Layout size={20} color="white" /></div>
                    <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Project Operations</h1>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={toolBtn}><Filter size={16} /> Filter</button>
                    <button style={toolBtn}><Settings size={16} /></button>
                    <button style={addBtn}><Plus size={18} /> New Task</button>
                </div>
            </div>

            {/* Kanban Board */}
            <div style={boardStyle}>
                <BoardColumn title="To Do" count={todo.length} tasks={todo} setTasks={setTodo} />
                <BoardColumn title="In Progress" count={inProgress.length} tasks={inProgress} setTasks={setInProgress} accent="#0E8EE9" />
                <BoardColumn title="Done" count={done.length} tasks={done} setTasks={setDone} accent="#38A169" />
            </div>
        </div>
    );
};

// Sub-components
const BoardColumn: React.FC<{ title: string, count: number, tasks: Task[], setTasks: any, accent?: string }> = ({ title, count, tasks, setTasks, accent = '#772953' }) => (
    <div style={columnStyle}>
        <div style={{ ...columnHeader, borderTop: `4px solid ${accent}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{title}</span>
                <span style={countBadge}>{count}</span>
            </div>
            <MoreHorizontal size={18} color="#94a3b8" cursor="pointer" />
        </div>

        <Reorder.Group axis="y" values={tasks} onReorder={setTasks} style={taskListStyle}>
            {tasks.map(task => (
                <Reorder.Item key={task.id} value={task}>
                    <TaskCard task={task} />
                </Reorder.Item>
            ))}
        </Reorder.Group>

        <button style={addTaskInner}><Plus size={14} /> Add Task</button>
    </div>
);

const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={taskCardStyle}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={priorityBadge(task.priority)}>{task.priority.toUpperCase()}</span>
            <MoreHorizontal size={14} color="#cbd5e1" />
        </div>
        <div style={taskTitle}>{task.title}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '15px 0' }}>
            {task.tags.map(tag => (
                <span key={tag} style={tagStyle}>{tag}</span>
            ))}
        </div>

        <div style={taskFooter}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: task.dueDate === 'Today' ? '#ef4444' : '#64748b' }}>
                <Clock size={12} />
                {task.dueDate}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ ...avatarMini, background: '#772953' }}>B</div>
                <div style={{ ...avatarMini, background: '#0E8EE9', marginLeft: '-8px' }}><Users size={8} /></div>
            </div>
        </div>
    </motion.div>
);

// Styles & Utils
const priorityBadge = (p: string): React.CSSProperties => ({
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: 800,
    background: p === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(148, 163, 184, 0.1)',
    color: p === 'high' ? '#ef4444' : '#64748b'
});

const containerStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#f1f5f9',
    color: '#1e293b'
};

const headerStyle: React.CSSProperties = {
    padding: '30px 40px',
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const iconBadge: React.CSSProperties = {
    width: '44px',
    height: '44px',
    background: '#772953',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 16px rgba(119, 41, 83, 0.2)'
};

const toolBtn: React.CSSProperties = {
    padding: '10px 16px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#64748b'
};

const addBtn: React.CSSProperties = {
    padding: '10px 20px',
    background: '#772953',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(119, 41, 83, 0.2)'
};

const boardStyle: React.CSSProperties = {
    flex: 1,
    padding: '30px 40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    overflowX: 'auto'
};

const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
};

const columnHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingTop: '10px'
};

const countBadge: React.CSSProperties = {
    padding: '2px 8px',
    background: '#cbd5e1',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#475569'
};

const taskListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1,
    overflowY: 'auto'
};

const taskCardStyle: React.CSSProperties = {
    background: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    border: '1px solid #e2e8f0',
    marginBottom: '15px',
    cursor: 'pointer'
};

const taskTitle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '1.4',
    color: '#1e293b'
};

const tagStyle: React.CSSProperties = {
    padding: '4px 10px',
    background: '#f8fafc',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#64748b',
    border: '1px solid #f1f5f9'
};

const taskFooter: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px'
};

const avatarMini: React.CSSProperties = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '9px',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white'
};

const addTaskInner: React.CSSProperties = {
    marginTop: '10px',
    padding: '12px',
    background: 'transparent',
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
};

export default ProjectManager;
