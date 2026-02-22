export interface Room {
    id: string;
    roomNumber: string;
    floor: string;
    sessionName: string;
    time: string;
    status: 'Ongoing' | 'Upcoming' | 'Completed';
}

export const venues: Room[] = [
    { id: 'v1', roomNumber: 'Room 101', floor: 'Ground', sessionName: 'Opening Keynote', time: '09:00 AM - 10:00 AM', status: 'Completed' },
    { id: 'v2', roomNumber: 'Room 201', floor: '1st', sessionName: 'AI Panel Discussion', time: '10:30 AM - 12:00 PM', status: 'Ongoing' },
    { id: 'v3', roomNumber: 'Room 305', floor: '2nd', sessionName: 'Cybersecurity Workshop', time: '01:00 PM - 03:00 PM', status: 'Upcoming' },
    { id: 'v4', roomNumber: 'Room 402', floor: '3rd', sessionName: 'Startup Pitching', time: '03:30 PM - 05:00 PM', status: 'Upcoming' },
    { id: 'v5', roomNumber: 'Room 102', floor: 'Ground', sessionName: 'Web Dev Best Practices', time: '02:00 PM - 04:00 PM', status: 'Upcoming' },
    { id: 'v6', roomNumber: 'Room 205', floor: '1st', sessionName: 'Mobile Dev Future', time: '11:00 AM - 12:30 PM', status: 'Ongoing' },
];
