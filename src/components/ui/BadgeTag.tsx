import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface BadgeTagProps {
    status: 'Ongoing' | 'Upcoming' | 'Completed' | string;
}

export const BadgeTag: React.FC<BadgeTagProps> = ({ status }) => {
    const getBackgroundColor = () => {
        switch (status) {
            case 'Ongoing': return colors.status.success;
            case 'Completed': return colors.status.info;
            case 'Upcoming': return colors.status.warning;
            default: return colors.accent;
        }
    };

    return (
        <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
            <Text style={styles.text}>{status}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: spacing.m,
        paddingVertical: 4,
        borderRadius: 12,
    },
    text: {
        ...typography.caption,
        fontWeight: '700',
        color: colors.surface,
    },
});
