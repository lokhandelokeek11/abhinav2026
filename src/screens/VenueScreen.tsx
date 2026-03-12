import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { venues } from '../data/venues';
import { RoomCard } from '../components/cards/RoomCard';

const TABS = ['Ground', '1st', '2nd', '3rd'];

export const VenueScreen = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const filteredVenues = venues.filter(v => v.floor === activeTab);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Venues & Classrooms</Text>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                    <Icon name="information-circle-outline" size={20} color={colors.primary} />
                    <Text style={styles.infoTitle}>Room Numbering Guide</Text>
                </View>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: 'bold'}}>Room: 6107</Text>{'\n'}
                    Building: 6{'\n'}
                    Floor: 1st Floor{'\n'}
                    Classroom: 07{'\n\n'}
                    <Text style={{fontWeight: 'bold'}}>Room: 6210</Text>{'\n'}
                    Building: 6{'\n'}
                    Floor: 2nd Floor{'\n'}
                    Classroom: 10
                </Text>
            </View>

            <View style={styles.tabContainer}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredVenues}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <RoomCard room={item} />}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No sessions scheduled on this floor.</Text>
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
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: spacing.m,
        marginBottom: spacing.l,
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    infoCard: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
        padding: spacing.m,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    infoTitle: {
        ...typography.subtitle,
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: spacing.xs,
    },
    infoText: {
        ...typography.caption,
        color: colors.text.secondary,
        lineHeight: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.s,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    tabText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.text.secondary,
    },
    activeTabText: {
        color: colors.surface,
    },
    listContainer: {
        paddingBottom: spacing.xl,
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
