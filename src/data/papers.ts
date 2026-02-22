export interface Paper {
    id: string;
    teamName: string;
    title: string;
    track: string;
    guide: string;
    time: string;
    roomNumber: string;
    floor: string;
    block: string;
}

export const papers: Paper[] = [
    { id: '101', teamName: 'Alpha Tech', title: 'AI in Healthcare', track: 'Artificial Intelligence', guide: 'Dr. Smith', time: '10:00 AM', roomNumber: 'Room 201', floor: '2nd', block: 'A' },
    { id: '102', teamName: 'Beta Bots', title: 'Robotics for Farming', track: 'Robotics', guide: 'Prof. Johnson', time: '11:00 AM', roomNumber: 'Room 105', floor: '1st', block: 'B' },
    { id: '103', teamName: 'Cyber Sec', title: 'Zero Trust Architecture', track: 'Cybersecurity', guide: 'Dr. Alice', time: '12:00 PM', roomNumber: 'Room 304', floor: '3rd', block: 'C' },
    { id: '104', teamName: 'Web Wizards', title: 'NextGen React Apps', track: 'Web Dev', guide: 'Dr. Dre', time: '02:00 PM', roomNumber: 'Room 104', floor: 'Ground', block: 'D' },
];
