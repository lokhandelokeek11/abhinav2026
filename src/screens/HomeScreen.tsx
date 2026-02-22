import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { CountdownCard } from '../components/cards/CountdownCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const GRID_ITEMS = [
    { id: '1', title: 'Venue & Classroom', icon: 'location-outline', route: 'Venue' },
    { id: '2', title: 'Schedule', icon: 'calendar-outline', route: 'Schedule' },
    { id: '3', title: 'Committee', icon: 'people-outline', route: 'Options' },
    { id: '4', title: 'Guidelines', icon: 'document-text-outline', route: 'Options' },
    { id: '5', title: 'Contact', icon: 'call-outline', route: 'Options' },
    { id: '6', title: 'Submissions Info', icon: 'cloud-upload-outline', route: 'Options' },
];

export const HomeScreen = () => {
    const navigation = useNavigation<BottomTabNavigationProp<any>>();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome to</Text>
                <Text style={styles.title}>Abhinav 2026</Text>
                <Text style={styles.subtitle}>Young Professional Conference</Text>
            </View>

            <CountdownCard />

            <View style={styles.searchShortcut}>
                <Text style={styles.searchTitle}>Looking for your paper?</Text>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => navigation.navigate('Papers')}
                >
                    <Icon name="search" size={20} color={colors.surface} />
                    <Text style={styles.searchButtonText}>Search by ID</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
                {GRID_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.gridItem}
                        onPress={() => item.route && navigation.navigate(item.route)}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name={item.icon} size={28} color={colors.primary} />
                        </View>
                        <Text style={styles.gridText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
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
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingTop: 60,
    },
    greeting: {
        ...typography.body,
        color: colors.surface,
        opacity: 0.8,
    },
    title: {
        ...typography.header,
        color: colors.surface,
        fontSize: 28,
        marginTop: spacing.xs,
    },
    subtitle: {
        ...typography.caption,
        color: colors.surface,
        opacity: 0.9,
        marginTop: spacing.xs,
    },
    searchShortcut: {
        margin: spacing.m,
        padding: spacing.m,
        backgroundColor: colors.surface,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchTitle: {
        ...typography.subtitle,
        color: colors.text.primary,
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        borderRadius: 8,
    },
    searchButtonText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.surface,
        marginLeft: spacing.xs,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.s,
        justifyContent: 'center',
        paddingBottom: spacing.xl,
    },
    gridItem: {
        width: '45%',
        backgroundColor: colors.surface,
        margin: spacing.s,
        padding: spacing.m,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    gridText: {
        ...typography.body,
        fontWeight: '600',
        color: colors.text.primary,
        textAlign: 'center',
    },
});
