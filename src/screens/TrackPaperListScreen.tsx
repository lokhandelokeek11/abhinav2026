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
import { useNavigation, useRoute } from '@react-navigation/native';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { papersData } from '../data/papersData';

const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
};

export const TrackPaperListScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const track = route.params?.track || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPapers, setFilteredPapers] = useState(papersData.filter(p => p.track === track));

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase();
        const filtered = papersData.filter(paper => {
            if (paper.track !== track) return false;
            return (
                paper.paperId.toLowerCase().includes(lowerQuery) ||
                paper.leader.toLowerCase().includes(lowerQuery)
            );
        });
        setFilteredPapers(filtered);
    }, [searchQuery, track]);

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colId]}>Paper ID</Text>
            <Text style={[styles.headerText, styles.colGroup]}>Group ID</Text>
            <Text style={[styles.headerText, styles.colLeader]}>Leader</Text>
            <Text style={[styles.headerText, styles.colTitle]}>Title</Text>
        </View>
    );

    const renderItem = ({ item }: { item: typeof papersData[0] }) => (
        <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Search', { paperId: item.paperId })}
            activeOpacity={0.7}
        >
            <View style={styles.colId}>
                <Text style={styles.idText}>{item.paperId}</Text>
            </View>
            <View style={styles.colGroup}>
                <Text style={styles.groupText}>{item.groupId}</Text>
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
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color={THEME_COLORS.white} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{track}</Text>
                    <Text style={styles.headerSubtitle}>Papers under this track</Text>
                </View>
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
                        data={filteredPapers}
                        renderItem={renderItem}
                        keyExtractor={item => item.paperId}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Icon name="document-text-outline" size={48} color={THEME_COLORS.textSecondary} style={{ opacity: 0.5 }} />
                                <Text style={styles.emptyText}>No papers found</Text>
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
        paddingTop: spacing.xl * 1.5,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: spacing.m,
        top: spacing.xl * 1.5,
        zIndex: 10,
    },
    headerTitleContainer: {
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    headerTitle: {
        ...typography.header,
        color: THEME_COLORS.white,
        fontSize: 22,
        textAlign: 'center',
    },
    headerSubtitle: {
        ...typography.caption,
        color: THEME_COLORS.white,
        opacity: 0.8,
        textAlign: 'center',
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: spacing.m,
        marginTop: 10,
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
        paddingHorizontal: 8,
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
        paddingHorizontal: 8,
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
        width: 70,
    },
    colGroup: {
        width: 70,
        paddingHorizontal: 4,
    },
    colLeader: {
        width: 80,
        paddingHorizontal: 4,
    },
    colTitle: {
        flex: 1,
        paddingHorizontal: 4,
    },
    idText: {
        ...typography.caption,
        fontWeight: 'bold',
        color: THEME_COLORS.primary,
    },
    groupText: {
        ...typography.caption,
        fontWeight: '600',
        color: THEME_COLORS.textSecondary,
    },
    leaderText: {
        ...typography.caption,
        fontWeight: '600',
        color: THEME_COLORS.textPrimary,
    },
    titleText: {
        fontSize: 10,
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

export default TrackPaperListScreen;
