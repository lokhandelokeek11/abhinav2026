import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { schedule } from '../data/schedule';
import { TimelineItem } from '../components/cards/TimelineItem';

const TABS = ['Day 1', 'Day 2'];

export const ScheduleScreen = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const filteredSchedule = schedule.filter(s => s.day === activeTab);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Event Schedule</Text>
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
                data={filteredSchedule}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <TimelineItem item={item} isLast={index === filteredSchedule.length - 1} />
                )}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No schedule available.</Text>
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
