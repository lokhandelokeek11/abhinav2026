import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { InfoCard } from '../components/cards/InfoCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const THEME_COLORS = {
    primary: '#0B4A6F',
    secondary: '#E9EEF3',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
};

const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
);

const OptionCard = ({ icon, title, subtitle, onPress }: { icon: string, title: string, subtitle: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.optionIconContainer}>
            <Icon name={icon} size={24} color={THEME_COLORS.primary} />
        </View>
        <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
        <Icon name="chevron-forward" size={20} color={THEME_COLORS.textSecondary} />
    </TouchableOpacity>
);

export const OptionsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings & More</Text>
                <Text style={styles.subtitle}>Configure your conference experience</Text>
            </View>

            <View style={styles.content}>
                <SectionHeader title="Conference Resources" />

                <OptionCard
                    icon="calendar-outline"
                    title="Schedule"
                    subtitle="View conference event timeline"
                    onPress={() => navigation.navigate('Schedule')}
                />

                <OptionCard
                    icon="people-outline"
                    title="Committee"
                    subtitle="Organizing members of the conference"
                    onPress={() => navigation.navigate('Committee')}
                />

                <OptionCard
                    icon="document-text-outline"
                    title="Guidelines"
                    subtitle="Paper submission and presentation rules"
                    onPress={() => navigation.navigate('Guidelines')}
                />

                <OptionCard
                    icon="layers-outline"
                    title="Conference Tracks"
                    subtitle="Research domains of the conference"
                    onPress={() => navigation.navigate('ConferenceTracks')}
                />

                <SectionHeader title="Conference Information" />

                <OptionCard
                    icon="information-circle-outline"
                    title="About"
                    subtitle="Learn more about Abhinav 2026"
                    onPress={() => navigation.navigate('About')}
                />

                <OptionCard
                    icon="shield-checkmark-outline"
                    title="Code of Conduct"
                    subtitle="Read our community guidelines"
                    onPress={() => { }}
                />

                <SectionHeader title="Help & Support" />

                <OptionCard
                    icon="help-circle-outline"
                    title="FAQ"
                    subtitle="Frequently asked questions"
                    onPress={() => { }}
                />

                <OptionCard
                    icon="mail-outline"
                    title="Contact Support"
                    subtitle="Need help? Reach out to us"
                    onPress={() => { }}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.version}>App Version 1.0.0</Text>
                <Text style={styles.copyright}>© 2026 PCCOE Computer Engineering</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.background,
    },
    header: {
        padding: spacing.l,
        paddingTop: 60,
        backgroundColor: THEME_COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginBottom: spacing.m,
    },
    title: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 26,
    },
    subtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        marginTop: 4,
    },
    content: {
        padding: spacing.m,
    },
    sectionHeader: {
        marginTop: spacing.m,
        marginBottom: spacing.s,
        paddingHorizontal: spacing.s,
    },
    sectionHeaderText: {
        ...typography.caption,
        color: THEME_COLORS.primary,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    optionCard: {
        backgroundColor: THEME_COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.m,
        borderRadius: 16,
        marginBottom: spacing.s,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    optionIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: THEME_COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.m,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.textPrimary,
        fontWeight: 'bold',
    },
    optionSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginTop: 2,
    },
    footer: {
        alignItems: 'center',
        padding: spacing.xl,
        marginTop: spacing.l,
    },
    version: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        fontWeight: 'bold',
    },
    copyright: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginTop: 4,
        opacity: 0.7,
    }
});
