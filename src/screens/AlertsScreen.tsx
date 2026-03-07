import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Animated,
    SafeAreaView,
    Platform
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';

// Hosted JSON URL
const ANNOUNCEMENTS_URL = 'https://yourserver.com/announcements.json';

interface Announcement {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'urgent' | 'update';
}

const TYPE_CONFIG = {
    info: {
        icon: 'information-circle',
        color: '#0A79DF',
        badge: 'INFO'
    },
    urgent: {
        icon: 'alert-circle',
        color: '#E84118',
        badge: 'URGENT'
    },
    update: {
        icon: 'refresh-circle',
        color: '#FF9F1C',
        badge: 'UPDATE'
    }
};

const AnnouncementCard = ({ item }: { item: Announcement }) => {
    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;
    const isUrgent = item.type === 'urgent';
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[
            styles.card,
            isUrgent && styles.urgentCard,
            { opacity: fadeAnim }
        ]}>
            <View style={[styles.statusIndicator, { backgroundColor: config.color }]} />

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.titleRow}>
                        <Icon name={isUrgent ? 'warning' : config.icon} size={22} color={config.color} />
                        <View style={styles.titleTextWrapper}>
                            <View style={styles.titleBadgeContainer}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                {isUrgent && (
                                    <View style={styles.urgentBadge}>
                                        <Text style={styles.urgentBadgeText}>URGENT</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                    <Text style={styles.timestamp}>{item.time}</Text>
                </View>

                <Text style={styles.message}>{item.message}</Text>
            </View>
        </Animated.View>
    );
};

export const AlertsScreen = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const lastNotifiedId = useRef<number | null>(null);

    const fetchAnnouncements = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            // Note: In a real app, this would be a fetch(ANNOUNCEMENTS_URL)
            // Mocking the fetch for demonstration since URL might not exist
            const response = await fetch(ANNOUNCEMENTS_URL).catch(() => null);
            let data;

            if (response && response.ok) {
                data = await response.json();
            } else {
                // Fallback to mock data for preview if server is unreachable
                data = {
                    announcements: [
                        {
                            id: 3,
                            title: "Schedule Update",
                            message: "AI workshop has been moved to Hall C.",
                            time: "5 min ago",
                            type: "update"
                        },
                        {
                            id: 2,
                            title: "Presentation Call",
                            message: "Group 13 please report immediately to Room 6102 for your presentation.",
                            time: "Just now",
                            type: "urgent"
                        },
                        {
                            id: 1,
                            title: "Registration Opens",
                            message: "Registration desk is now open at the Main Lobby.",
                            time: "10:00 AM",
                            type: "info"
                        }
                    ]
                };
            }

            const sortedAnnouncements = data.announcements.sort((a: Announcement, b: Announcement) => b.id - a.id);

            // Notification logic
            if (sortedAnnouncements.length > 0) {
                const latest = sortedAnnouncements[0];
                if (lastNotifiedId.current !== null && latest.id > lastNotifiedId.current) {
                    Alert.alert(
                        "📢 New Announcement",
                        `${latest.title}\n\n${latest.message}`,
                        [{ text: "OK" }]
                    );
                }
                lastNotifiedId.current = latest.id;
            }

            setAnnouncements(sortedAnnouncements);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();

        // 🔄 Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchAnnouncements(true);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchAnnouncements(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Announcements</Text>
                <Text style={styles.headerSubtitle}>Live updates during the conference</Text>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loaderText}>Checking for live updates...</Text>
                </View>
            ) : (
                <FlatList
                    data={announcements}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <AnnouncementCard item={item} />}
                    contentContainerStyle={styles.listContainer}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="megaphone-outline" size={64} color={colors.border} />
                            <Text style={styles.emptyText}>No new announcements yet.</Text>
                            <Text style={styles.emptySubText}>We'll notify you when things happen!</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.l,
        paddingTop: Platform.OS === 'ios' ? 20 : 60,
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: spacing.m,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        ...typography.header,
        color: colors.surface,
        fontSize: 28,
    },
    headerSubtitle: {
        ...typography.caption,
        color: colors.surface,
        opacity: 0.8,
        marginTop: 4,
        fontWeight: '500',
    },
    listContainer: {
        padding: spacing.m,
        paddingBottom: spacing.xl * 2,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        marginBottom: spacing.m,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    urgentCard: {
        borderColor: '#FFD7D7',
        borderWidth: 1.5,
        backgroundColor: '#FFF9F9',
    },
    statusIndicator: {
        width: 6,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: spacing.m,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.s,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    titleTextWrapper: {
        marginLeft: 10,
        flex: 1,
    },
    titleBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    cardTitle: {
        ...typography.subtitle,
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    urgentBadge: {
        backgroundColor: '#E84118',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 8,
    },
    urgentBadgeText: {
        color: colors.surface,
        fontSize: 10,
        fontWeight: '900',
    },
    timestamp: {
        fontSize: 11,
        color: colors.text.secondary,
        fontWeight: '600',
        marginLeft: 8,
    },
    message: {
        ...typography.body,
        color: '#444',
        lineHeight: 20,
        marginLeft: 2,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        ...typography.body,
        color: colors.text.secondary,
        marginTop: spacing.m,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        ...typography.subtitle,
        color: colors.text.primary,
        fontWeight: 'bold',
        marginTop: 20,
    },
    emptySubText: {
        ...typography.caption,
        color: colors.text.secondary,
        marginTop: 8,
    },
});
