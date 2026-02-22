import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { InfoCard } from '../components/cards/InfoCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const OptionsScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Options</Text>
            </View>

            <SectionHeader title="Conference Information" />

            <TouchableOpacity onPress={() => navigation.navigate('About')} activeOpacity={0.7}>
                <InfoCard
                    icon="information-circle-outline"
                    title="About the Conference"
                    description="Learn more about Abhinav 2026."
                />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
                <InfoCard
                    icon="document-text-outline"
                    title="Code of Conduct"
                    description="Read our community guidelines."
                />
            </TouchableOpacity>

            <SectionHeader title="Help & Support" />

            <TouchableOpacity activeOpacity={0.7}>
                <InfoCard
                    icon="call-outline"
                    title="Contact Support"
                    description="Need help? Reach out to us."
                />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
                <InfoCard
                    icon="help-circle-outline"
                    title="FAQ"
                    description="Frequently asked questions."
                />
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.version}>App Version 1.0.0</Text>
            </View>
        </ScrollView>
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
    footer: {
        alignItems: 'center',
        padding: spacing.xl,
        marginTop: spacing.xl,
    },
    version: {
        ...typography.caption,
        color: colors.text.secondary,
    }
});
