import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const CountdownCard: React.FC = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Conference Starts In</Text>
            <View style={styles.row}>
                <View style={styles.timeBox}>
                    <Text style={styles.timeText}>12</Text>
                    <Text style={styles.timeLabel}>Days</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeBox}>
                    <Text style={styles.timeText}>08</Text>
                    <Text style={styles.timeLabel}>Hours</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeBox}>
                    <Text style={styles.timeText}>45</Text>
                    <Text style={styles.timeLabel}>Mins</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primary,
        margin: spacing.m,
        padding: spacing.l,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    title: {
        ...typography.subtitle,
        color: colors.surface,
        marginBottom: spacing.m,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeBox: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding: spacing.s,
        borderRadius: 8,
        minWidth: 70,
    },
    timeText: {
        ...typography.header,
        color: colors.surface,
        fontSize: 28,
    },
    timeLabel: {
        ...typography.caption,
        color: colors.surface,
        marginTop: 4,
    },
    colon: {
        ...typography.header,
        color: colors.surface,
        marginHorizontal: spacing.s,
    },
});
