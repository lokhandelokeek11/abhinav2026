import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { alerts } from '../data/alerts';
import Icon from 'react-native-vector-icons/Ionicons';

export const AlertsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Announcements</Text>
            </View>

            <FlatList
                data={alerts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.titleRow}>
                                <Icon name="alert-circle" size={20} color={colors.accent} />
                                <Text style={styles.cardTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.timestamp}>{item.timestamp}</Text>
                        </View>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No new announcements yet.</Text>
                    </View>
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.l,
        paddingTop: 60,
        backgroundColor: colors.primary,
        marginBottom: spacing.m,
    },
    title: {
        ...typography.header,
        color: colors.surface,
    },
    listContainer: {
        paddingBottom: spacing.xl,
    },
    card: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
        padding: spacing.m,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardTitle: {
        ...typography.subtitle,
        color: colors.primary,
        marginLeft: spacing.xs,
        flexShrink: 1,
    },
    timestamp: {
        ...typography.caption,
        color: colors.text.secondary,
    },
    message: {
        ...typography.body,
        color: colors.text.primary,
        marginLeft: 24,
    },
    emptyContainer: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        ...typography.body,
        color: colors.text.secondary,
    },
});
