import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#FF9F1C',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    shadow: '#000',
};

const TIMELINE_DATA = [
    {
        date: '5th February, 2026',
        title: 'Registration & Submission Starts',
        description: 'Start registration and paper submission by Paper-Call Emails.',
        isMain: false,
    },
    {
        date: '16th February, 2026',
        title: 'Registration & Submission End',
        description: 'Formation of team and registration must be completed before the deadline.',
        isMain: false,
    },
    {
        date: '18th February, 2026',
        title: 'Status Update',
        description: 'Paper Accepted or Rejected with attached suggestions of major and minor changes.',
        isMain: false,
    },
    {
        date: '26th February, 2026',
        title: 'Final Submission',
        description: 'Final paper must be submitted with corrected major and minor changes.',
        isMain: false,
    },
    {
        date: '11th March, 2026',
        title: 'Final List of Accepted Papers',
        description: 'Final list of accepted papers will be published.',
        isMain: false,
    },
    {
        date: 'Friday, 13th March 2026',
        title: 'Young Professional Conference',
        description: 'Commencement of the event. Join us for a day of innovation and excellence.',
        isMain: true,
    },
];

const TimelineCard = ({ item, isLast, index }: { item: typeof TIMELINE_DATA[0], isLast: boolean, index: number }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: index * 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                delay: index * 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.timelineRow}>
            {/* Left Side: Node and Line */}
            <View style={styles.timelineIndicators}>
                <View style={[styles.timelineNode, item.isMain && styles.mainNode]}>
                    {item.isMain && <View style={styles.nodeGlow} />}
                </View>
                {!isLast && <View style={styles.timelineLine} />}
            </View>

            {/* Right Side: Card */}
            <Animated.View
                style={[
                    styles.cardContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    },
                    item.isMain && styles.mainCard
                ]}
            >
                <View style={styles.dateLabel}>
                    <Icon name="calendar-clear-outline" size={14} color={THEME_COLORS.accent} />
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={[styles.cardTitle, item.isMain && styles.mainTitle]}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </Animated.View>
        </View>
    );
};

export const ScheduleScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color={THEME_COLORS.white} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleRow}>
                        <Icon name="calendar" size={28} color={THEME_COLORS.accent} style={styles.headerIcon} />
                        <Text style={styles.headerTitle}>Conference Schedule</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>Event Timeline – Abhinav 2026</Text>
                </View>

                {/* Timeline Section */}
                <View style={styles.timelineContainer}>
                    {TIMELINE_DATA.map((item, index) => (
                        <TimelineCard
                            key={index}
                            item={item}
                            index={index}
                            isLast={index === TIMELINE_DATA.length - 1}
                        />
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
    scrollContent: {
        paddingBottom: spacing.xl * 2,
    },
    header: {
        backgroundColor: THEME_COLORS.primary,
        padding: spacing.l,
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        elevation: 10,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        position: 'relative',
        marginBottom: spacing.l,
    },
    backButton: {
        position: 'absolute',
        left: spacing.m,
        top: spacing.xl * 1.5,
        zIndex: 10,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: spacing.s,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 26,
    },
    headerSubtitle: {
        ...typography.subtitle,
        color: THEME_COLORS.white,
        opacity: 0.9,
        marginTop: 4,
    },
    timelineContainer: {
        paddingHorizontal: spacing.m,
        marginTop: spacing.m,
    },
    timelineRow: {
        flexDirection: 'row',
        minHeight: 120,
    },
    timelineIndicators: {
        width: 40,
        alignItems: 'center',
    },
    timelineNode: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: THEME_COLORS.primary,
        borderWidth: 3,
        borderColor: THEME_COLORS.accent,
        zIndex: 2,
        marginTop: spacing.s,
    },
    mainNode: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: THEME_COLORS.accent,
        borderColor: THEME_COLORS.white,
        elevation: 8,
        shadowColor: THEME_COLORS.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    nodeGlow: {
        position: 'absolute',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        borderRadius: 20,
        backgroundColor: THEME_COLORS.accent,
        opacity: 0.2,
    },
    timelineLine: {
        position: 'absolute',
        top: spacing.s + 16,
        bottom: 0,
        width: 2,
        backgroundColor: THEME_COLORS.primary + '30', // Semi-transparent
    },
    cardContainer: {
        flex: 1,
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        padding: spacing.m,
        marginLeft: spacing.s,
        marginBottom: spacing.l,
        elevation: 4,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: THEME_COLORS.primary,
    },
    mainCard: {
        borderLeftColor: THEME_COLORS.accent,
        borderWidth: 1,
        borderColor: THEME_COLORS.accent + '30',
        backgroundColor: THEME_COLORS.white,
        elevation: 8,
        shadowColor: THEME_COLORS.accent,
        shadowOpacity: 0.2,
    },
    dateLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    dateText: {
        ...typography.caption,
        color: THEME_COLORS.accent,
        fontWeight: '700',
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    mainTitle: {
        fontSize: 18,
        color: THEME_COLORS.primary,
    },
    cardDescription: {
        ...typography.body,
        color: THEME_COLORS.textSecondary,
        marginTop: 6,
        lineHeight: 18,
    },
});
