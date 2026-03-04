export interface Paper {
    id: string;
    teamName: string;
    authors: string;
    title: string;
    track: string;
    guide: string;
    time: string;
    roomNumber: string;
    floor: string;
    block: string;
}

export const papers: Paper[] = [
    {
        id: '101',
        teamName: 'Alpha Tech (Team 101)',
        authors: 'John Doe, Jane Smith',
        title: 'AI-Based Image Segmentation Using Deep Learning',
        track: 'Image Processing',
        guide: 'Dr. Smith',
        time: '13 March 2026 — 10:00 AM',
        roomNumber: 'Lab 302',
        floor: '3rd',
        block: 'C'
    },
    {
        id: '102',
        teamName: 'Beta Bots (Team 102)',
        authors: 'Alice Cooper, Bob Marley',
        title: 'Autonomous Robotics for Smart Farming',
        track: 'IoT & Robotics',
        guide: 'Prof. Johnson',
        time: '13 March 2026 — 11:30 AM',
        roomNumber: 'Lab 105',
        floor: '1st',
        block: 'A'
    },
    {
        id: '103',
        teamName: 'Cyber Sec (Team 103)',
        authors: 'Elon Mask, Bill Gates',
        title: 'Zero Trust Distributed Architecture for Edge Nodes',
        track: 'Networks and Security',
        guide: 'Dr. Alice',
        time: '13 March 2026 — 01:00 PM',
        roomNumber: 'Room 304',
        floor: '3rd',
        block: 'D'
    },
    {
        id: '201',
        teamName: 'Data Wizards (Team 201)',
        authors: 'Sunder Pichai, Satya Nadella',
        title: 'Predictive Analytics for Urban Traffic Management',
        track: 'Data Science & Big Data',
        guide: 'Dr. Raj',
        time: '13 March 2026 — 02:30 PM',
        roomNumber: 'Lab 204',
        floor: '2nd',
        block: 'B'
    },
    {
        id: '315',
        teamName: 'Visionaries (Team 315)',
        authors: 'Mark Zuckerberg, Tim Cook',
        title: 'Real-time Object Recognition for Augmented Reality',
        track: 'Computer Vision, AR & VR',
        guide: 'Dr. Watson',
        time: '13 March 2026 — 04:00 PM',
        roomNumber: 'Lab 401',
        floor: '4th',
        block: 'A'
    },
];
