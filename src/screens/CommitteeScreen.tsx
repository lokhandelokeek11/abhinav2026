import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

const THEME_COLORS = {
    primary: '#0B4A6F',
    secondary: '#E9EEF3',
    accent: '#2E7BCF',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
};

const MemberItem = ({ name, role, description = '', isMain = false, showDivider = true }: { name: string, role: string, description?: string, isMain?: boolean, showDivider?: boolean }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.memberItem, isMain && styles.mainMemberItem, { opacity: fadeAnim }]}>
            <View style={styles.textContainer}>
                <Text style={[styles.memberName, isMain && styles.mainMemberName]}>{name}</Text>
                <Text style={[styles.memberRole, isMain && styles.mainMemberRole]}>{role}</Text>
                {description ? <Text style={styles.descriptionText}>{description}</Text> : null}
            </View>
            {showDivider && !isMain && <View style={styles.itemDivider} />}
        </Animated.View>
    );
};

const SectionHeader = ({ title, icon }: { title: string, icon: string }) => (
    <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
            <Icon name={icon} size={20} color={THEME_COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.underline} />
    </View>
);

export const CommitteeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back" size={24} color={THEME_COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Organizing Committee</Text>
                    <Text style={styles.headerSubtitle}>Abhinav 2026 – Young Professional Conference</Text>
                </View>

                <View style={styles.content}>
                    {/* Section 1 - Head of Department */}
                    <View style={styles.section}>
                        <SectionHeader title="Head of Department" icon="school" />
                        <MemberItem
                            name="Dr. Sonali Patil"
                            role="Head of Computer Engineering"
                            description="Visionary Leader & Guide"
                            isMain
                        />
                    </View>

                    {/* Section 2 - Faculty Coordinators */}
                    <View style={styles.section}>
                        <SectionHeader title="Faculty Coordinators" icon="people" />
                        <View style={styles.listContainer}>
                            <MemberItem name="Dr. Meghana Lokhande" role="R&D Coordinator" />
                            <MemberItem name="Dr. Anagha Chaudhari" role="R&D Coordinator" />
                            <MemberItem name="Dr. Asmita Manna" role="R&D Coordinator" showDivider={false} />
                        </View>
                    </View>

                    {/* Section 3 - Student Committee */}
                    <View style={styles.section}>
                        <SectionHeader title="Student Committee" icon="ribbon" />
                        <View style={styles.listContainer}>
                            <MemberItem name="Ujwal Wagh" role="Founding President" />
                            <MemberItem name="Smera Nimje" role="Vice President" />
                            <MemberItem name="Mitali Chaudhari" role="Secretary" />
                            <MemberItem name="Vedant Maldure" role="Management Executive" />
                            <MemberItem name="Piyush Ahirao" role="Treasurer" />
                            <MemberItem name="Pranali Patil" role="Web Master" />
                            <MemberItem name="Sayali Pawar" role="Funding Chair" />
                            <MemberItem name="Rohit Lad" role="IPR Chair" />
                            <MemberItem name="Prathamesh Marathe" role="IPR Co-Chair" />
                            <MemberItem name="Sahil Patel" role="Publication Co-Chair" />
                            <MemberItem name="Abhishek Raje" role="Design Head" showDivider={false} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME_COLORS.white,
    },
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    header: {
        backgroundColor: THEME_COLORS.primary,
        padding: spacing.l,
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: spacing.m,
        top: spacing.xl * 1.5,
        zIndex: 10,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 24,
    },
    headerSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        marginTop: 4,
    },
    content: {
        padding: spacing.m,
    },
    section: {
        marginBottom: spacing.l,
    },
    sectionHeader: {
        marginBottom: spacing.m,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    sectionIcon: {
        marginRight: 8,
    },
    sectionTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    underline: {
        height: 2,
        backgroundColor: THEME_COLORS.accent,
        width: 30,
        borderRadius: 1,
    },
    listContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        padding: spacing.s,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    memberItem: {
        paddingVertical: spacing.s,
        paddingHorizontal: spacing.s,
    },
    mainMemberItem: {
        backgroundColor: THEME_COLORS.secondary,
        borderRadius: 12,
        padding: spacing.m,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: THEME_COLORS.accent + '30',
    },
    textContainer: {
        justifyContent: 'center',
    },
    memberName: {
        ...typography.body,
        color: THEME_COLORS.textPrimary,
        fontWeight: '700',
    },
    mainMemberName: {
        fontSize: 18,
        color: THEME_COLORS.primary,
        textAlign: 'center',
    },
    memberRole: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginTop: 2,
    },
    mainMemberRole: {
        fontSize: 14,
        color: THEME_COLORS.accent,
        fontWeight: '600',
        textAlign: 'center',
    },
    descriptionText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        fontStyle: 'italic',
        marginTop: 4,
        textAlign: 'center',
    },
    itemDivider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: spacing.s,
    },
});
