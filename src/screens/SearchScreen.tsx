import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { papers, Paper } from '../data/papers';

const THEME_COLORS = {
    primary: '#0B4A6F',
    accent: '#2E7BCF',
    background: '#F4F6F9',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
    success: '#4CAF50',
};

export const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<Paper | null>(null);
    const [recentSearches, setRecentSearches] = useState<string[]>(['101', '102', '103']);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (query: string = searchQuery) => {
        if (!query.trim()) return;

        const found = papers.find(p => p.id === query || p.id.toLowerCase() === query.toLowerCase());
        setResult(found || null);
        setHasSearched(true);

        if (found && !recentSearches.includes(query)) {
            setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setResult(null);
        setHasSearched(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* 1️⃣ Header Section */}
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <Icon name="search-circle-outline" size={32} color={THEME_COLORS.white} style={styles.headerIcon} />
                        <Text style={styles.headerTitle}>Search Your Paper</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>Enter your Paper ID to view presentation details</Text>
                </View>

                <View style={styles.content}>

                    {/* 2️⃣ Search Input Card */}
                    <View style={styles.searchCard}>
                        <View style={styles.inputWrapper}>
                            <Icon name="search-outline" size={20} color={THEME_COLORS.textSecondary} style={styles.searchBoxIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Paper ID (e.g. 101)"
                                placeholderTextColor={THEME_COLORS.textSecondary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                onSubmitEditing={() => handleSearch()}
                                keyboardType="numeric"
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={clearSearch}>
                                    <Icon name="close-circle" size={20} color={THEME_COLORS.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch()}>
                            <Text style={styles.searchButtonText}>Find Paper</Text>
                            <Icon name="arrow-forward" size={18} color={THEME_COLORS.white} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                    {/* 3️⃣ Tips Card (Shown when no result yet) */}
                    {!result && (
                        <View style={styles.infoCard}>
                            <View style={styles.infoTitleRow}>
                                <Icon name="bulb-outline" size={20} color={THEME_COLORS.accent} />
                                <Text style={styles.infoTitle}>Quick Tips</Text>
                            </View>
                            <View style={styles.infoList}>
                                <Text style={styles.infoText}>• Enter the Paper ID assigned during registration</Text>
                                <Text style={styles.infoText}>• Ensure the ID matches the submitted paper</Text>
                                <Text style={styles.infoText}>• Contact organizers if your paper is not found</Text>
                            </View>
                        </View>
                    )}

                    {/* 4️⃣ Search Result Card */}
                    {result ? (
                        <View style={styles.resultCard}>
                            <View style={styles.resultHeader}>
                                <Text style={styles.resultType}>Presentation Details</Text>
                                <View style={styles.idBadge}>
                                    <Text style={styles.idBadgeText}>#{result.id}</Text>
                                </View>
                            </View>

                            <Text style={styles.paperTitle}>{result.title}</Text>

                            <View style={styles.divider} />

                            <View style={styles.detailRow}>
                                <Icon name="people-outline" size={20} color={THEME_COLORS.primary} />
                                <View style={styles.detailTextWrapper}>
                                    <Text style={styles.detailLabel}>Authors</Text>
                                    <Text style={styles.detailValue}>{result.authors}</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Icon name="id-card-outline" size={20} color={THEME_COLORS.primary} />
                                <View style={styles.detailTextWrapper}>
                                    <Text style={styles.detailLabel}>Team ID</Text>
                                    <Text style={styles.detailValue}>{result.teamName}</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Icon name="layers-outline" size={20} color={THEME_COLORS.primary} />
                                <View style={styles.detailTextWrapper}>
                                    <Text style={styles.detailLabel}>Track</Text>
                                    <Text style={styles.detailValue}>{result.track}</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Icon name="business-outline" size={20} color={THEME_COLORS.primary} />
                                <View style={styles.detailTextWrapper}>
                                    <Text style={styles.detailLabel}>Physical Room</Text>
                                    <Text style={styles.detailValue}>{result.roomNumber} ({result.floor} Floor)</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <Icon name="time-outline" size={20} color={THEME_COLORS.primary} />
                                <View style={styles.detailTextWrapper}>
                                    <Text style={styles.detailLabel}>Presentation Time</Text>
                                    <Text style={styles.detailValue}>{result.time}</Text>
                                </View>
                            </View>

                            <View style={styles.statusBox}>
                                <Icon name="checkmark-circle" size={18} color={THEME_COLORS.success} />
                                <Text style={styles.statusText}>Report to your assigned room 15 mins early.</Text>
                            </View>
                        </View>
                    ) : hasSearched ? (
                        <View style={styles.emptyState}>
                            <Icon name="alert-circle-outline" size={64} color={THEME_COLORS.textSecondary} style={{ opacity: 0.5 }} />
                            <Text style={styles.emptyTitle}>Paper Not Found</Text>
                            <Text style={styles.emptySubtitle}>We couldn't find any paper with ID "{searchQuery}". Please check the ID and try again.</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Icon name="document-text-outline" size={64} color={THEME_COLORS.accent} style={{ opacity: 0.3 }} />
                            <Text style={styles.emptyTitle}>Looking for your presentation?</Text>
                            <Text style={styles.emptySubtitle}>Search for your Paper ID to view presentation venue, time, and track details.</Text>
                        </View>
                    )}

                    {/* 5️⃣ Recent Searches */}
                    {recentSearches.length > 0 && (
                        <View style={styles.recentSection}>
                            <Text style={styles.recentHeading}>Recent Searches</Text>
                            <View style={styles.recentList}>
                                {recentSearches.map((id) => (
                                    <TouchableOpacity
                                        key={`recent-${id}`}
                                        style={styles.recentItem}
                                        onPress={() => {
                                            setSearchQuery(id);
                                            handleSearch(id);
                                        }}
                                    >
                                        <Icon name="time-outline" size={14} color={THEME_COLORS.textSecondary} />
                                        <Text style={styles.recentText}>{id}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
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
    scrollContent: {
        paddingBottom: spacing.xl,
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
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    headerIcon: {
        marginRight: 8,
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
        textAlign: 'center',
    },
    content: {
        padding: spacing.m,
        marginTop: -20,
    },
    searchCard: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 24,
        padding: spacing.m,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        marginBottom: spacing.m,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingHorizontal: 12,
        marginBottom: spacing.m,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchBoxIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        ...typography.body,
        color: THEME_COLORS.textPrimary,
    },
    searchButton: {
        backgroundColor: THEME_COLORS.primary,
        borderRadius: 16,
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButtonText: {
        ...typography.body,
        color: THEME_COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoCard: {
        backgroundColor: '#EAF6FF',
        borderRadius: 16,
        padding: spacing.m,
        marginBottom: spacing.m,
        borderWidth: 1,
        borderColor: '#D4E9FF',
    },
    infoTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    infoList: {
        marginLeft: 4,
    },
    infoText: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        marginBottom: 4,
        lineHeight: 18,
    },
    resultCard: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 24,
        padding: spacing.l,
        elevation: 6,
        shadowColor: THEME_COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 6,
        borderLeftColor: THEME_COLORS.primary,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultType: {
        ...typography.caption,
        color: THEME_COLORS.accent,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    idBadge: {
        backgroundColor: '#EDF5FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    idBadgeText: {
        ...typography.caption,
        color: THEME_COLORS.primary,
        fontWeight: '800',
    },
    paperTitle: {
        ...typography.header,
        color: THEME_COLORS.textPrimary,
        fontSize: 20,
        lineHeight: 28,
        marginBottom: spacing.m,
    },
    divider: {
        height: 1,
        backgroundColor: THEME_COLORS.border,
        marginBottom: spacing.m,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    detailTextWrapper: {
        marginLeft: 14,
        flex: 1,
    },
    detailLabel: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        fontWeight: '600',
    },
    detailValue: {
        ...typography.body,
        color: THEME_COLORS.textPrimary,
        fontWeight: 'bold',
        marginTop: 2,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9F1',
        padding: 12,
        borderRadius: 12,
        marginTop: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
        marginLeft: 8,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.textPrimary,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptySubtitle: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    recentSection: {
        marginTop: spacing.xl,
    },
    recentHeading: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: spacing.m,
        marginLeft: spacing.m,
    },
    recentList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME_COLORS.white,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
    },
    recentText: {
        fontSize: 14,
        color: THEME_COLORS.textPrimary,
        fontWeight: '600',
        marginLeft: 6,
    },
});
