import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
};

const facultyData = [
    { id: '1', room: 'Room 6101', faculty: 'Dr. Sonali Patil', track: 'Inauguration', session: 'Morning Session' },
    { id: '2', room: 'Room 6102', faculty: 'Dr. Meghana Lokhande', track: 'Image Processing', session: 'Morning Session' },
    { id: '3', room: 'Room 6103', faculty: 'Dr. Anagha Chaudhari', track: 'Data Science', session: 'Morning Session' },
    { id: '4', room: 'Room 6104', faculty: 'Dr. Asmita Manna', track: 'IoT & Robotics', session: 'Afternoon Session' },
    { id: '5', room: 'Room 6105', faculty: 'Prof. Vikram Malhotra', track: 'Networks & Security', session: 'Afternoon Session' },
    { id: '6', room: 'Room 6106', faculty: 'Dr. Sarah Jenkins', track: 'AI & Machine Learning', session: 'Morning Session' },
    { id: '7', room: 'Room 6107', faculty: 'Prof. Rahul Deshmukh', track: 'Computer Vision', session: 'Afternoon Session' },
    { id: '8', room: 'Room 6108', faculty: 'Dr. Pooja Kulkarni', track: 'Poster Presentation', session: 'Morning Session' },
];

export const FacultySeatingScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={THEME_COLORS.white} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Faculty Room Allocation</Text>
                    <Text style={styles.headerSubtitle}>Faculty assigned for paper presentation supervision</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    {facultyData.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.roomText}>{item.room}</Text>
                                <Icon name="business-outline" size={24} color={THEME_COLORS.primary} style={{ opacity: 0.2 }} />
                            </View>
                            <Text style={styles.facultyText}>Faculty: {item.faculty}</Text>
                            
                            <View style={styles.divider} />
                            
                            <View style={styles.detailsRow}>
                                <View style={styles.detailItem}>
                                    <Icon name="layers-outline" size={16} color={THEME_COLORS.primary} />
                                    <Text style={styles.detailText}>Track: {item.track}</Text>
                                </View>
                            </View>
                            <View style={styles.detailsRow}>
                                <View style={styles.detailItem}>
                                    <Icon name="time-outline" size={16} color={THEME_COLORS.primary} />
                                    <Text style={styles.detailText}>Session: {item.session}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: spacing.m,
    },
    backButton: {
        marginRight: spacing.m,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 22,
    },
    headerSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        marginTop: 4,
    },
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    content: {
        padding: spacing.m,
    },
    card: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        padding: spacing.l,
        marginBottom: spacing.m,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    roomText: {
        ...typography.header,
        color: THEME_COLORS.textPrimary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    facultyText: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: '600',
        marginBottom: spacing.s,
    },
    divider: {
        height: 1,
        backgroundColor: THEME_COLORS.border,
        marginVertical: spacing.s,
    },
    detailsRow: {
        marginTop: 4,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginLeft: 6,
    },
});

export default FacultySeatingScreen;
