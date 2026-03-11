import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const THEME_COLORS = {
    primary: '#0B4A6F',
    secondary: '#E9EEF3',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
    shadow: '#000',
};

export const ScheduleMenuScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <Icon name="calendar" size={28} color={THEME_COLORS.accent} style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>Conference Schedule</Text>
                </View>
                <Text style={styles.headerSubtitle}>Select scheduling format to view</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate('EventTimeline')}
                    activeOpacity={0.8}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="time-outline" size={32} color={THEME_COLORS.primary} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Event Timeline</Text>
                        <Text style={styles.cardSubtitle}>Complete conference timeline from registration to the main event day</Text>
                    </View>
                    <Icon name="chevron-forward" size={24} color={THEME_COLORS.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate('EventDaySchedule')}
                    activeOpacity={0.8}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="calendar-outline" size={32} color={THEME_COLORS.primary} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Event Day Schedule</Text>
                        <Text style={styles.cardSubtitle}>13th March Conference Sessions</Text>
                    </View>
                    <Icon name="chevron-forward" size={24} color={THEME_COLORS.textSecondary} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.background,
    },
    header: {
        backgroundColor: THEME_COLORS.primary,
        padding: spacing.l,
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        elevation: 10,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        marginBottom: spacing.xl,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: spacing.s,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 26,
    },
    headerSubtitle: {
        ...typography.subtitle,
        color: THEME_COLORS.white,
        opacity: 0.9,
        marginTop: 4,
    },
    content: {
        paddingHorizontal: spacing.l,
    },
    card: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 20,
        padding: spacing.l,
        marginBottom: spacing.l,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: THEME_COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: THEME_COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.m,
    },
    textContainer: {
        flex: 1,
        paddingRight: spacing.m,
    },
    cardTitle: {
        ...typography.header,
        fontSize: 20,
        color: THEME_COLORS.primary,
        marginBottom: 4,
    },
    cardSubtitle: {
        ...typography.body,
        fontSize: 14,
        color: THEME_COLORS.textSecondary,
    },
});

export default ScheduleMenuScreen;
