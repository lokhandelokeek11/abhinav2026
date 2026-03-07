import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';


const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
};

const TRACKS = [
    {
        title: 'Image Processing',
        icon: 'image-outline',
        topics: [
            'Image Enhancement & Segmentation',
            'Medical & Biomedical Image Processing',
            'Deep Learning based Image Analysis',
        ],
    },
    {
        title: 'IoT & Robotics',
        icon: 'hardware-chip-outline',
        topics: [
            'IoT-based Smart Systems',
            'Autonomous Robots & Drones',
            'Embedded Systems & Sensor Networks',
        ],
    },
    {
        title: 'Data Science & Big Data',
        icon: 'bar-chart-outline',
        topics: [
            'Predictive Analytics',
            'Big Data Processing',
            'Data Visualization & Business Intelligence',
        ],
    },
    {
        title: 'Networks and Security',
        icon: 'shield-checkmark-outline',
        topics: [
            'Cryptography & Secure Communication',
            'Cloud Computing',
            'Blockchain Technology',
        ],
    },
    {
        title: 'Computer Vision, AR & VR',
        icon: 'eye-outline',
        topics: [
            '3D Vision',
            'Metaverse and Gaming',
            'Gesture, Object & Motion Recognition',
        ],
    },
    {
        title: 'Cognitive Computing & ML',
        icon: 'bulb-outline',
        topics: [
            'Machine Learning & Deep Learning Models',
            'Natural Language Processing',
            'Generative & Agentic AI',
        ],
    },
];

const TrackCard = ({ title, icon, topics }: { title: string, icon: string, topics: string[] }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.cardHeader}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <View style={styles.cardTitleRow}>
                    <Icon name={icon} size={24} color={THEME_COLORS.primary} style={styles.cardIcon} />
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <Icon
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={THEME_COLORS.textSecondary}
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.cardContent}>
                    <View style={styles.divider} />
                    {topics.map((topic) => (
                        <View key={topic} style={styles.bulletRow}>
                            <View style={styles.bullet} />
                            <Text style={styles.topicText}>{topic}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export const ConferenceTracksScreen = () => {
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
                    <Text style={styles.headerTitle}>Conference Tracks</Text>
                    <Text style={styles.headerSubtitle}>Research Domains – Abhinav 2026</Text>
                </View>

                <View style={styles.content}>
                    {TRACKS.map((track, index) => (
                        <TrackCard key={index} {...track} />
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
        paddingBottom: spacing.xl,
    },
    header: {
        backgroundColor: THEME_COLORS.primary,
        padding: spacing.l,
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        position: 'relative',
        marginBottom: spacing.m,
    },
    backButton: {
        position: 'absolute',
        left: spacing.m,
        top: spacing.xl * 1.5,
        zIndex: 10,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 24,
    },
    headerSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        marginTop: 4,
    },
    content: {
        padding: spacing.m,
    },
    card: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        marginBottom: spacing.m,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.l,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        marginRight: 12,
    },
    cardTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: '700',
    },
    cardContent: {
        padding: spacing.l,
        paddingTop: 0,
    },
    divider: {
        height: 1,
        backgroundColor: THEME_COLORS.border,
        marginBottom: spacing.m,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: THEME_COLORS.accent,
        marginRight: 10,
    },
    topicText: {
        ...typography.body,
        color: THEME_COLORS.textSecondary,
        flex: 1,
    },
});

export default ConferenceTracksScreen;
