import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScheduleItem } from '../../data/schedule';

interface TimelineItemProps {
    item: ScheduleItem;
    isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
    return (
        <View style={styles.container}>
            <View style={styles.timeColumn}>
                <Text style={styles.time}>{item.time}</Text>
                {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.row}>
                    <Icon name="person-outline" size={14} color={colors.text.secondary} />
                    <Text style={styles.detail}>{item.speaker}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="location-outline" size={14} color={colors.text.secondary} />
                    <Text style={styles.detail}>{item.venue}</Text>
                </View>
                <View style={styles.trackBadge}>
                    <Text style={styles.trackText}>{item.track}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.m,
        marginBottom: spacing.m,
    },
    timeColumn: {
        width: 70,
        alignItems: 'center',
    },
    time: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: spacing.s,
    },
    line: {
        flex: 1,
        width: 2,
        backgroundColor: colors.border,
    },
    card: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: spacing.m,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
        marginLeft: spacing.s,
        marginBottom: spacing.xs,
    },
    title: {
        ...typography.subtitle,
        color: colors.text.primary,
        marginBottom: spacing.s,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    detail: {
        ...typography.caption,
        color: colors.text.secondary,
        marginLeft: spacing.xs,
    },
    trackBadge: {
        marginTop: spacing.s,
        backgroundColor: colors.background,
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.s,
        paddingVertical: 4,
        borderRadius: 8,
    },
    trackText: {
        ...typography.caption,
        color: colors.accent,
        fontWeight: '600',
    },
});
