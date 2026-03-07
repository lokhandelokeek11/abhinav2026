import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { CountdownCard } from '../components/cards/CountdownCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const GRID_ITEMS = [
    { id: '1', title: 'Venue & Classroom', icon: 'location-outline', route: 'Venue' },
    { id: '2', title: 'Schedule', icon: 'calendar-outline', route: 'Schedule' },
    { id: '3', title: 'Committee', icon: 'people-outline', route: 'Committee' },
    { id: '4', title: 'Guidelines', icon: 'document-text-outline', route: 'Guidelines' },
    { id: '5', title: 'Conference Tracks', icon: 'layers-outline', route: 'ConferenceTracks' },
    { id: '6', title: 'Contact', icon: 'call-outline', route: 'Options' },
];

const TRACKS_PREVIEW = [
    {
        id: '1',
        title: 'Image Processing',
        description: 'Focuses on techniques to analyze and improve digital images using modern algorithms.',
        icon: 'image-outline',
        bulletPoints: ['Enhancement & Segmentation', 'Biomedical Processing', 'Deep Learning Analysis'],
    },
    {
        id: '2',
        title: 'IoT & Robotics',
        description: 'Explores intelligent systems built using IoT technologies and robotics automation.',
        icon: 'hardware-chip-outline',
        bulletPoints: ['Smart Systems', 'Autonomous Robots', 'Sensor Networks'],
    },
    {
        id: '3',
        title: 'Data Science & Big Data',
        description: 'Research in extracting insights from large-scale data using analytics and AI models.',
        icon: 'bar-chart-outline',
        bulletPoints: ['Predictive Analytics', 'Big Data Processing', 'Business Intelligence'],
    },
    {
        id: '4',
        title: 'Networks and Security',
        description: 'Covers modern communication networks and advanced cybersecurity systems.',
        icon: 'shield-checkmark-outline',
        bulletPoints: ['Secure Communication', 'Cloud Computing', 'Blockchain Tech'],
    },
    {
        id: '5',
        title: 'Computer Vision, AR & VR',
        description: 'Focuses on immersive technologies and intelligent vision-based systems.',
        icon: 'eye-outline',
        bulletPoints: ['3D Vision', 'Metaverse and Gaming', 'Object Recognition'],
    },
    {
        id: '6',
        title: 'Cognitive Computing & ML',
        description: 'Research on intelligent systems that simulate human thinking using AI and ML.',
        icon: 'bulb-outline',
        bulletPoints: ['ML & Deep Learning', 'Natural Language Processing', 'Generative AI'],
    },
];

export const HomeScreen = () => {
    const navigation = useNavigation<BottomTabNavigationProp<any>>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 1️⃣ Welcome Header */}
            <View style={styles.header}>
                <View style={styles.headerOverlay}>
                    <Text style={styles.greeting}>Welcome to</Text>
                    <Text style={styles.title}>Abhinav 2026</Text>
                    <Text style={styles.subtitle}>Young Professional Conference</Text>
                </View>
            </View>

            {/* 2️⃣ Countdown Card */}
            <CountdownCard />

            {/* 3️⃣ Quick Action Card (Search) */}
            <View style={styles.searchShortcut}>
                <View style={styles.searchHeader}>
                    <Text style={styles.searchTitle}>Looking for your paper?</Text>
                    <Text style={styles.searchSubtitle}>Search by Unique Paper ID</Text>
                </View>
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => navigation.navigate('Search')}
                    activeOpacity={0.8}
                >
                    <Icon name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Enter Paper ID...</Text>
                    <View style={styles.searchButtonInner}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* 4️⃣ Conference Tracks Preview */}
            <View style={styles.tracksSection}>
                <View style={styles.sectionHeaderRow}>
                    <View>
                        <Text style={styles.sectionHeading}>Conference Tracks</Text>
                        <Text style={styles.sectionSubtitle}>Research domains featured in Abhinav 2026</Text>
                    </View>
                </View>

                {TRACKS_PREVIEW.map((track) => (
                    <TouchableOpacity
                        key={track.id}
                        style={styles.trackPreviewCard}
                        onPress={() => navigation.navigate('ConferenceTracks')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.trackIconBox}>
                            <Icon name={track.icon} size={32} color={colors.primary} />
                        </View>
                        <View style={styles.trackInfo}>
                            <Text style={styles.trackTitle}>{track.title}</Text>
                            <Text style={styles.trackDescription} numberOfLines={2}>{track.description}</Text>
                            <View style={styles.trackBullets}>
                                {track.bulletPoints.map((point, idx) => (
                                    <View key={idx} style={styles.bulletRow}>
                                        <View style={styles.bulletDot} />
                                        <Text style={styles.bulletText}>{point}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => navigation.navigate('ConferenceTracks')}
                >
                    <Text style={styles.viewAllText}>Explore All Tracks</Text>
                    <Icon name="arrow-forward" size={18} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* 5️⃣ Quick Links Grid */}
            <View style={styles.featuredSection}>
                <Text style={styles.sectionHeading}>Quick Links</Text>
                <View style={styles.gridContainer}>
                    {GRID_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.gridItem}
                            onPress={() => item.route && navigation.navigate(item.route)}
                        >
                            <View style={styles.iconContainer}>
                                <Icon name={item.icon} size={28} color={colors.primary} />
                            </View>
                            <Text style={styles.gridText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.l,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingTop: 80,
        paddingBottom: 40,
        elevation: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    headerOverlay: {
        // Here we could add a pattern or subtle gradient if needed
    },
    greeting: {
        ...typography.body,
        color: colors.surface,
        opacity: 0.8,
        fontWeight: '600',
    },
    title: {
        ...typography.header,
        color: colors.surface,
        fontSize: 34,
        marginTop: 4,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    subtitle: {
        ...typography.subtitle,
        color: colors.surface,
        opacity: 0.9,
        marginTop: 4,
        fontWeight: '500',
    },
    searchShortcut: {
        margin: spacing.m,
        padding: spacing.l,
        backgroundColor: colors.surface,
        borderRadius: 24,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    searchHeader: {
        marginBottom: spacing.m,
    },
    searchTitle: {
        ...typography.title,
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    searchSubtitle: {
        ...typography.caption,
        color: colors.text.secondary,
        marginTop: 4,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 6,
        paddingLeft: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchPlaceholder: {
        ...typography.body,
        color: colors.text.secondary,
        flex: 1,
    },
    searchButtonInner: {
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.m,
        paddingVertical: 10,
        borderRadius: 12,
    },
    searchButtonText: {
        ...typography.body,
        fontWeight: 'bold',
        color: colors.surface,
    },
    featuredSection: {
        padding: spacing.m,
        paddingBottom: spacing.xl * 2,
    },
    sectionHeading: {
        ...typography.subtitle,
        color: colors.text.primary,
        fontWeight: '800',
        marginBottom: spacing.m,
        marginLeft: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        backgroundColor: colors.surface,
        marginBottom: spacing.m,
        padding: spacing.m,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    gridText: {
        ...typography.body,
        fontWeight: '700',
        color: colors.text.primary,
        textAlign: 'center',
        fontSize: 13,
    },
    tracksSection: {
        padding: spacing.m,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.m,
    },
    sectionSubtitle: {
        ...typography.caption,
        color: colors.text.secondary,
        marginLeft: spacing.xs,
        marginTop: -spacing.s,
        marginBottom: spacing.m,
    },
    trackPreviewCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: spacing.m,
        flexDirection: 'row',
        marginBottom: spacing.m,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    trackIconBox: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.m,
    },
    trackInfo: {
        flex: 1,
    },
    trackTitle: {
        ...typography.subtitle,
        color: colors.text.primary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    trackDescription: {
        ...typography.caption,
        color: colors.text.secondary,
        lineHeight: 16,
        marginBottom: 8,
    },
    trackBullets: {
        marginTop: 4,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    bulletDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.accent,
        marginRight: 6,
    },
    bulletText: {
        fontSize: 11,
        color: colors.text.secondary,
        fontWeight: '500',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.m,
        marginTop: spacing.s,
    },
    viewAllText: {
        ...typography.body,
        color: colors.primary,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
