export interface ScheduleItem {
    id: string;
    time: string;
    title: string;
    track: string;
    speaker: string;
    venue: string;
    day: 'Day 1' | 'Day 2';
}

export const schedule: ScheduleItem[] = [
    { id: 's1', time: '09:00 AM', title: 'Registration & Breakfast', track: 'General', speaker: 'N/A', venue: 'Main Lobby', day: 'Day 1' },
    { id: 's2', time: '10:00 AM', title: 'Inaugural Ceremony', track: 'General', speaker: 'Chief Guest', venue: 'Auditorium', day: 'Day 1' },
    { id: 's3', time: '11:30 AM', title: 'The Future of AI', track: 'AI & ML', speaker: 'Dr. Andrew', venue: 'Hall A', day: 'Day 1' },
    { id: 's4', time: '09:00 AM', title: 'Networking Event', track: 'General', speaker: 'Various', venue: 'Cafeteria', day: 'Day 2' },
    { id: 's5', time: '10:30 AM', title: 'Blockchain Revolution', track: 'Web3', speaker: 'Alice M', venue: 'Hall B', day: 'Day 2' },
];
