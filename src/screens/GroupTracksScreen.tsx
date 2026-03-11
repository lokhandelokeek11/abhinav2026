import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

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
    { title: 'Image Processing', icon: 'image-outline' },
    { title: 'IoT & Robotics', icon: 'hardware-chip-outline' },
    { title: 'Data Science & Big Data', icon: 'bar-chart-outline' },
    { title: 'Networks and Security', icon: 'shield-checkmark-outline' },
    { title: 'Computer Vision, AR & VR', icon: 'eye-outline' },
    { title: 'Cognitive Computing & Machine Learning', icon: 'bulb-outline' },
];

export const GroupTracksScreen = () => {
    const navigation = useNavigation<any>();

    const handleTrackPress = (trackTitle: string) => {
        navigation.navigate('TrackPaperList', { track: trackTitle });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <Text style={styles.headerTitle}>Groups by Track</Text>
                </View>
                <Text style={styles.headerSubtitle}>Select a conference track to view papers</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {TRACKS.map((track, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() => handleTrackPress(track.title)}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.cardTitleRow}>
                                    <Icon name={track.icon} size={24} color={THEME_COLORS.primary} style={styles.cardIcon} />
                                    <Text style={styles.cardTitle}>{track.title}</Text>
                                </View>
                                <Icon name="chevron-forward" size={20} color={THEME_COLORS.textSecondary} />
                            </View>
                        </TouchableOpacity>
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
        paddingTop: spacing.xl * 1.2,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: spacing.m,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
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
        textAlign: 'center',
    },
    scrollContent: {
        paddingBottom: spacing.xl,
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
        color: THEME_COLORS.textPrimary,
        fontWeight: '600',
    },
});

export default GroupTracksScreen;
