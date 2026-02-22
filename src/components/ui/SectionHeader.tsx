import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface SectionHeaderProps {
    title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.s,
        borderLeftWidth: 4,
        borderLeftColor: colors.accent,
        marginBottom: spacing.m,
        marginLeft: spacing.m,
    },
    title: {
        ...typography.title,
        color: colors.primary,
    },
});
