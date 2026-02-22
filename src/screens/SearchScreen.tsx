import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { SearchInput } from '../components/ui/SearchInput';
import { papers } from '../data/papers';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPapers = searchQuery
        ? papers.filter(p => p.id.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Search Paper</Text>
                <Text style={styles.subtitle}>Enter your Paper ID to find details</Text>
            </View>

            <SearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="e.g. 101"
            />

            {searchQuery.length > 0 && filteredPapers.length === 0 && (
                <View style={styles.emptyContainer}>
                    <Icon name="search-outline" size={48} color={colors.text.secondary} />
                    <Text style={styles.emptyText}>No paper found with ID '{searchQuery}'</Text>
                </View>
            )}

            <FlatList
                data={filteredPapers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.paperId}>ID: {item.id}</Text>
                            <View style={styles.trackBadge}>
                                <Text style={styles.trackText}>{item.track}</Text>
                            </View>
                        </View>

                        <Text style={styles.paperTitle}>{item.title}</Text>

                        <View style={styles.infoRow}>
                            <Icon name="people-outline" size={16} color={colors.text.secondary} />
                            <Text style={styles.infoText}><Text style={styles.infoLabel}>Team:</Text> {item.teamName}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="person-outline" size={16} color={colors.text.secondary} />
                            <Text style={styles.infoText}><Text style={styles.infoLabel}>Guide:</Text> {item.guide}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.locationGrid}>
                            <View style={styles.locationItem}>
                                <Icon name="time-outline" size={16} color={colors.primary} />
                                <Text style={styles.locationText}>{item.time}</Text>
                            </View>
                            <View style={styles.locationItem}>
                                <Icon name="business-outline" size={16} color={colors.primary} />
                                <Text style={styles.locationText}>{item.roomNumber}</Text>
                            </View>
                            <View style={styles.locationItem}>
                                <Icon name="layers-outline" size={16} color={colors.primary} />
                                <Text style={styles.locationText}>{item.floor} Floor</Text>
                            </View>
                            <View style={styles.locationItem}>
                                <Icon name="cube-outline" size={16} color={colors.primary} />
                                <Text style={styles.locationText}>Block {item.block}</Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
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
    subtitle: {
        ...typography.body,
        color: colors.surface,
        opacity: 0.8,
        marginTop: 4,
    },
    listContainer: {
        paddingBottom: spacing.xl,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        marginTop: spacing.xl,
    },
    emptyText: {
        ...typography.body,
        color: colors.text.secondary,
        marginTop: spacing.m,
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
    paperId: {
        ...typography.title,
        color: colors.primary,
    },
    trackBadge: {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.s,
        paddingVertical: 4,
        borderRadius: 8,
    },
    trackText: {
        ...typography.caption,
        color: colors.accent,
        fontWeight: '600',
    },
    paperTitle: {
        ...typography.subtitle,
        color: colors.text.primary,
        marginBottom: spacing.m,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    infoText: {
        ...typography.body,
        color: colors.text.primary,
        marginLeft: spacing.s,
    },
    infoLabel: {
        fontWeight: '600',
        color: colors.text.secondary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.m,
    },
    locationGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    locationItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    locationText: {
        ...typography.caption,
        fontWeight: '500',
        color: colors.primary,
        marginLeft: 6,
    },
});
