import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/Ionicons';

interface InfoCardProps {
    icon: string;
    title: string;
    description: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color={colors.accent} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacing.m,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.m,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...typography.subtitle,
        color: colors.primary,
        marginBottom: 4,
    },
    description: {
        ...typography.caption,
        color: colors.text.secondary,
    },
});
