import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from 'react-native';
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
    rowBg: '#F9FAFB',
};

const groups = [
    { id: "101", leader: "Rahul Sharma", title: "AI-based Crop Disease Detection" },
    { id: "102", leader: "Priya Patel", title: "Smart Traffic Control using IoT" },
    { id: "103", leader: "Amit Verma", title: "Deep Learning for Medical Imaging" },
    { id: "104", leader: "Sneha Kulkarni", title: "Blockchain-based Voting System" },
    { id: "105", leader: "Rohan Mehta", title: "Gesture Controlled Robot" },
    { id: "106", leader: "Ananya Gupta", title: "Autonomous Drone Navigation" },
    { id: "107", leader: "Vikram Singh", title: "Predictive Analytics for Healthcare" },
    { id: "108", leader: "Neha Joshi", title: "Augmented Reality Learning System" },
    { id: "109", leader: "Arjun Desai", title: "Secure Cloud Storage Model" },
    { id: "110", leader: "Pooja Nair", title: "Smart Home Automation System" },
    { id: "111", leader: "Karan Shah", title: "NLP based Chatbot Assistant" },
    { id: "112", leader: "Divya Reddy", title: "AI-powered Resume Analyzer" },
    { id: "113", leader: "Sahil Khan", title: "Face Recognition Attendance System" },
    { id: "114", leader: "Meera Iyer", title: "Virtual Reality Therapy Platform" },
    { id: "115", leader: "Aditya Patil", title: "IoT Water Quality Monitoring" }
];

export const GroupListScreen = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGroups, setFilteredGroups] = useState(groups);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = groups.filter(
            group => group.id.toLowerCase().includes(lowerQuery) ||
                group.leader.toLowerCase().includes(lowerQuery)
        );
        setFilteredGroups(filtered);
    }, [searchQuery]);

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colId]}>Paper ID</Text>
            <Text style={[styles.headerText, styles.colLeader]}>Group Leader</Text>
            <Text style={[styles.headerText, styles.colTitle]}>Paper Title</Text>
        </View>
    );

    const renderItem = ({ item }: { item: typeof groups[0] }) => (
        <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Search', { paperId: item.id })}
            activeOpacity={0.7}
        >
            <View style={styles.colId}>
                <Text style={styles.idText}>{item.id}</Text>
            </View>
            <View style={styles.colLeader}>
                <Text style={styles.leaderText}>{item.leader}</Text>
            </View>
            <View style={styles.colTitle}>
                <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={THEME_COLORS.textSecondary} style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerTitleRow}>
                    <Text style={styles.headerTitle}>Conference Paper Groups</Text>
                </View>
                <Text style={styles.headerSubtitle}>Browse groups and locate your paper ID</Text>
            </View>


            <View style={styles.content}>
                {/* Search Filter Section */}
                <View style={styles.searchContainer}>
                    <Icon name="search-outline" size={20} color={THEME_COLORS.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Paper ID or Leader Name"
                        placeholderTextColor={THEME_COLORS.textSecondary}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Icon name="close-circle" size={20} color={THEME_COLORS.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Table Layout Section */}
                <View style={styles.tableContainer}>
                    {renderHeader()}
                    <FlatList
                        data={filteredGroups}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Icon name="alert-circle-outline" size={48} color={THEME_COLORS.textSecondary} style={{ opacity: 0.5 }} />
                                <Text style={styles.emptyText}>No groups found matching your search</Text>
                            </View>
                        }
                    />
                </View>
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
        paddingTop: spacing.xl * 1.2,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
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
        textAlign: 'center',
    },
    content: {
        flex: 1,
        padding: spacing.m,
        marginTop: -10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: spacing.m,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        ...typography.body,
        color: THEME_COLORS.textPrimary,
    },
    tableContainer: {
        flex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: THEME_COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: spacing.s,
        elevation: 2,
    },
    headerText: {
        ...typography.caption,
        color: THEME_COLORS.white,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        marginBottom: spacing.s,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    colId: {
        width: 60,
    },
    colLeader: {
        width: 100,
        paddingHorizontal: 4,
    },
    colTitle: {
        flex: 1,
        paddingHorizontal: 4,
    },
    idText: {
        ...typography.body,
        fontWeight: 'bold',
        color: THEME_COLORS.primary,
    },
    leaderText: {
        ...typography.body,
        fontWeight: '600',
        color: THEME_COLORS.textPrimary,
    },
    titleText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
    },
    chevron: {
        marginLeft: 4,
    },
    listContent: {
        paddingBottom: spacing.xl,
    },

    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
        opacity: 0.6,
    },
    emptyText: {
        ...typography.body,
        color: THEME_COLORS.textSecondary,
        marginTop: 12,
    },
});
