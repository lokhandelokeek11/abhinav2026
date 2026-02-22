export interface Alert {
    id: string;
    title: string;
    message: string;
    timestamp: string;
}

export const alerts: Alert[] = [
    { id: 'a1', title: 'Registration Opens', message: 'Registration desk is now open at the Main Lobby.', timestamp: 'Just now' },
    { id: 'a2', title: 'Lunch Delay', message: 'Lunch service will start 15 minutes late due to unforeseen circumstances.', timestamp: '1 hour ago' },
    { id: 'a3', title: 'Schedule Update', message: 'The AI workshop has been moved to Hall C.', timestamp: '2 hours ago' },
];
