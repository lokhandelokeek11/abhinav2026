export interface Room {
    id: string;
    roomNumber: string;
    floor: string;
    sessionName: string;
    time: string;
    status: 'Ongoing' | 'Upcoming' | 'Completed';
}

export const venues: Room[] = [
    { id: 'v1', roomNumber: 'Room 6107', floor: '1st', sessionName: 'Image Processing', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v2', roomNumber: 'Room 6210', floor: '2nd', sessionName: 'IoT & Robotics', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v3', roomNumber: 'Room 6115', floor: '1st', sessionName: 'Data Science & Big Data', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v4', roomNumber: 'Room 6104', floor: '1st', sessionName: 'Networks and Security', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v5', roomNumber: 'Room 6109', floor: '1st', sessionName: 'Computer Vision / AR / VR', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v6', roomNumber: 'Room 6208', floor: '2nd', sessionName: 'Cognitive Computing & ML', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v7', roomNumber: 'Room 6209', floor: '2nd', sessionName: 'Cognitive Computing & ML', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v8', roomNumber: 'Room 6118', floor: '1st', sessionName: 'Cognitive Computing & ML', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v9', roomNumber: 'Room 6119', floor: '1st', sessionName: 'Cognitive Computing & ML', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v10', roomNumber: 'Room 6206', floor: '2nd', sessionName: 'CEP', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v11', roomNumber: 'Room 6218', floor: '2nd', sessionName: 'CEP', time: 'Morning Session', status: 'Upcoming' },
    { id: 'v12', roomNumber: 'Room 6201', floor: '2nd', sessionName: 'CEP', time: 'Morning Session', status: 'Upcoming' },
];
