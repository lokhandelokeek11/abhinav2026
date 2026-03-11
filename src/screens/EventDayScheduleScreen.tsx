import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#2E7BCF', // Blue accent matching the app
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    shadow: '#000',
    border: '#EEEEEE',
};

const SCHEDULE_DATA = [
    {
        id: '1',
        time: '09:00 AM – 09:30 AM',
        title: 'Registration & Welcome',
        location: 'Venue: Main Lobby',
        icon: 'person-add-outline'
    },
    {
        id: '2',
        time: '09:30 AM – 10:00 AM',
        title: 'Inauguration Ceremony',
        speaker: 'Speaker: Dr. Sonali Patil',
        location: 'Venue: Auditorium',
        icon: 'ribbon-outline'
    },
    {
        id: '3',
        time: '10:00 AM – 11:30 AM',
        title: 'Paper Presentations – Session 1',
        tracks: ['Image Processing', 'IoT & Robotics'],
        rooms: ['6102 – Image Processing', '6103 – IoT & Robotics'],
        icon: 'document-text-outline'
    },
    {
        id: '4',
        time: '11:30 AM – 12:00 PM',
        title: 'Tea Break',
        location: 'Venue: Conference Hall Lobby',
        icon: 'cafe-outline',
        isBreak: true,
    },
    {
        id: '5',
        time: '12:00 PM – 01:30 PM',
        title: 'Paper Presentations – Session 2',
        tracks: ['Data Science & Big Data', 'Networks & Security'],
        rooms: ['6104 – Data Science', '6105 – Networks & Security'],
        icon: 'document-text-outline'
    },
    {
        id: '6',
        time: '01:30 PM – 02:30 PM',
        title: 'Lunch Break',
        location: 'Venue: Cafeteria',
        icon: 'restaurant-outline',
        isBreak: true,
    },
    {
        id: '7',
        time: '02:30 PM – 04:00 PM',
        title: 'Paper Presentations – Session 3',
        tracks: ['Computer Vision', 'Cognitive Computing & ML'],
        rooms: ['6106 – Computer Vision', '6107 – AI & ML'],
        icon: 'document-text-outline'
    },
    {
        id: '8',
        time: '04:00 PM – 04:30 PM',
        title: 'Valedictory & Awards',
        location: 'Venue: Auditorium',
        icon: 'trophy-outline'
    }
];

export const EventDayScheduleScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={THEME_COLORS.white} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Event Day Schedule</Text>
                    <Text style={styles.headerSubtitle}>13th March 2026</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.timelineContainer}>
                    {SCHEDULE_DATA.map((item, index) => (
                        <View key={item.id} style={styles.timelineRow}>
                            <View style={styles.timeColumn}>
                                <Text style={styles.timeText}>{item.time.split(' – ')[0]}</Text>
                                <Text style={styles.timeSubtext}>{item.time.split(' – ')[1]}</Text>
                            </View>

                            <View style={styles.timelineIndicators}>
                                <View style={[styles.timelineNode, item.isBreak && styles.breakNode]} />
                                {index !== SCHEDULE_DATA.length - 1 && <View style={styles.timelineLine} />}
                            </View>

                            <View style={[styles.cardContainer, item.isBreak && styles.breakCard]}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, item.isBreak && styles.breakIconBox]}>
                                        <Icon name={item.icon} size={20} color={item.isBreak ? THEME_COLORS.textSecondary : THEME_COLORS.primary} />
                                    </View>
                                    <Text style={[styles.cardTitle, item.isBreak && styles.breakTitle]}>{item.title}</Text>
                                </View>

                                {item.speaker && (
                                    <Text style={styles.speakerText}>{item.speaker}</Text>
                                )}
                                
                                {item.location && (
                                    <Text style={styles.locationText}>{item.location}</Text>
                                )}

                                {item.tracks && (
                                    <View style={styles.tracksContainer}>
                                        <Text style={styles.sectionLabel}>Tracks:</Text>
                                        {item.tracks.map((t, i) => (
                                            <View key={i} style={styles.trackBadge}>
                                                <Text style={styles.trackBadgeText}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {item.rooms && (
                                    <View style={styles.roomsContainer}>
                                        <Text style={styles.sectionLabel}>Rooms:</Text>
                                        {item.rooms.map((r, i) => (
                                            <Text key={i} style={styles.roomText}>• {r}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.background,
    },
    header: {
        backgroundColor: THEME_COLORS.primary,
        padding: spacing.l,
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 8,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: spacing.m,
    },
    backButton: {
        marginRight: spacing.m,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 22,
    },
    headerSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        marginTop: 4,
    },
    scrollContent: {
        paddingBottom: spacing.xl * 2,
    },
    timelineContainer: {
        paddingTop: spacing.l,
        paddingHorizontal: spacing.s,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: spacing.l,
    },
    timeColumn: {
        width: 80,
        alignItems: 'flex-end',
        paddingRight: spacing.s,
        paddingTop: 4,
    },
    timeText: {
        ...typography.caption,
        fontWeight: 'bold',
        color: THEME_COLORS.primary,
        fontSize: 13,
    },
    timeSubtext: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    timelineIndicators: {
        width: 30,
        alignItems: 'center',
    },
    timelineNode: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: THEME_COLORS.accent,
        borderWidth: 3,
        borderColor: THEME_COLORS.background,
        zIndex: 2,
        marginTop: 6,
    },
    breakNode: {
        backgroundColor: THEME_COLORS.textSecondary,
    },
    timelineLine: {
        position: 'absolute',
        top: 20,
        bottom: -spacing.l,
        width: 2,
        backgroundColor: THEME_COLORS.border,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        padding: spacing.m,
        marginRight: spacing.m,
        elevation: 3,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    breakCard: {
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: THEME_COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.s,
    },
    breakIconBox: {
        backgroundColor: 'transparent',
    },
    cardTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.textPrimary,
        fontWeight: 'bold',
        flex: 1,
    },
    breakTitle: {
        color: THEME_COLORS.textSecondary,
        fontWeight: '600',
    },
    speakerText: {
        ...typography.body,
        fontSize: 13,
        color: THEME_COLORS.primary,
        fontWeight: '600',
        marginBottom: 4,
    },
    locationText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginBottom: spacing.xs,
    },
    sectionLabel: {
        ...typography.caption,
        fontWeight: 'bold',
        color: THEME_COLORS.textPrimary,
        marginTop: spacing.s,
        marginBottom: 4,
    },
    tracksContainer: {
        marginTop: 4,
    },
    trackBadge: {
        backgroundColor: THEME_COLORS.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 4,
        alignSelf: 'flex-start',
    },
    trackBadgeText: {
        ...typography.caption,
        color: THEME_COLORS.primary,
        fontSize: 11,
    },
    roomsContainer: {
        marginTop: 4,
    },
    roomText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginBottom: 2,
    },
});

export default EventDayScheduleScreen;
