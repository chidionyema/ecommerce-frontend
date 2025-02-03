
import {
    Cloud,
    Lock,
    Database,
    Cpu,
    Zap,
    Server,
    PieChart,
    Smartphone,
} from 'react-feather';

export const techIcons = [
    {
        id: 1,
        title: 'Cloud Computing',
        icon: <Cloud size={40} strokeWidth={1.2} />,
        color: '#673ab7',
    },
    {
        id: 2,
        title: 'Security & Encryption',
        icon: <Lock size={40} strokeWidth={1.2} />,
        color: '#f44336',
    },
    {
        id: 3,
        title: 'Data Storage & Management',
        icon: <Database size={40} strokeWidth={1.2} />,
        color: '#2196f3',
    },
    {
        id: 4,
        title: 'API Development',
        icon: <Cpu size={40} strokeWidth={1.2} />,
        color: '#4caf50',
    },
    {
        id: 5,
        title: 'Artificial Intelligence',
        icon: <Zap size={40} strokeWidth={1.2} />,
        color: '#ff9800',
    },
    {
        id: 6,
        title: 'Web & Mobile Development',
        icon: <Smartphone size={40} strokeWidth={1.2} />,
        color: '#009688',
    },
    {
        id: 7,
        title: 'High Performance Computing',
        icon: <Server size={40} strokeWidth={1.2} />,
        color: '#ff5722',
    },
    {
        id: 8,
        title: 'Big Data & Analytics',
        icon: <PieChart size={40} strokeWidth={1.2} />,
        color: '#3f51b5',
    },
];

// Rest of the component code remains the same...