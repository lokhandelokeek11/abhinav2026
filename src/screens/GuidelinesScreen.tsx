import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const THEME_COLORS = {
    primary: '#0B4A6F',
    secondary: '#E9EEF3',
    accent: '#2E7BCF',
    white: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    border: '#EEEEEE',
};

const GuidelineSection = ({ title, icon, children }: { title: string, icon: string, children: React.ReactNode }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.cardHeader}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <View style={styles.cardTitleRow}>
                    <Icon name={icon} size={22} color={THEME_COLORS.primary} style={styles.cardIcon} />
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <Icon
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={THEME_COLORS.textSecondary}
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.cardContent}>
                    <View style={styles.divider} />
                    {children}
                </View>
            )}
        </View>
    );
};

const BulletPoint = ({ text }: { text: string }) => (
    <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{text}</Text>
    </View>
);

const TemplateModal = ({ visible, onClose, title, children }: { visible: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name="close" size={24} color={THEME_COLORS.textPrimary} />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.modalScroll}>
                    {children}
                </ScrollView>
                <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

export const GuidelinesScreen = () => {
    const navigation = useNavigation();
    const [pptModalVisible, setPptModalVisible] = useState(false);
    const [posterModalVisible, setPosterModalVisible] = useState(false);

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
                    <Text style={styles.headerTitle}>Conference Guidelines</Text>
                    <Text style={styles.headerSubtitle}>Abhinav 2026 – Young Professional Conference</Text>
                </View>

                <View style={styles.content}>
                    {/* SECTION 1 — General Instructions */}
                    <GuidelineSection title="General Instructions" icon="information-circle-outline">
                        <Text style={styles.contentText}>
                            Authors from Computer Department of PCCOE are invited to submit original research papers.
                        </Text>
                        <BulletPoint text="Submissions should align with the conference themes." />
                    </GuidelineSection>

                    {/* SECTION 2 — Plagiarism Guidelines */}
                    <GuidelineSection title="Plagiarism Guidelines" icon="shield-checkmark-outline">
                        <BulletPoint text="The work must be entirely original" />
                        <BulletPoint text="Self-plagiarism is strictly prohibited" />
                        <BulletPoint text="Proper permissions for third-party materials must be obtained" />
                    </GuidelineSection>

                    {/* SECTION 3 — Format of Paper */}
                    <GuidelineSection title="Paper Submission Format" icon="document-text-outline">
                        <View style={styles.subSection}>
                            <Text style={styles.subHeading}>File Format & Style</Text>
                            <BulletPoint text="Format: PDF Only" />
                            <BulletPoint text="Page Limit: Maximum 6 pages" />
                            <BulletPoint text="Font: Times New Roman, 12-point" />
                            <BulletPoint text="Margins: 1-inch all sides" />
                        </View>
                        <View style={styles.subSection}>
                            <Text style={styles.subHeading}>Required Sections</Text>
                            <View style={styles.tagContainer}>
                                {['Abstract', 'Introduction', 'Methodology', 'Results', 'Conclusion'].map((tag) => (
                                    <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                                ))}
                            </View>
                        </View>
                    </GuidelineSection>

                    {/* SECTION 4 — Format of Presentation (PPT) */}
                    <GuidelineSection title="Presentation Guidelines" icon="desktop-outline">
                        <BulletPoint text="Slide Limit: Maximum 10 slides" />
                        <BulletPoint text="Font: Arial or Calibri (min 24pt)" />
                        <BulletPoint text="Time Limit: Max 15 mins per team" />
                        <Text style={[styles.contentText, { marginTop: 8, fontStyle: 'italic' }]}>
                            Recommendation: Focus on results and visuals. Avoid overcrowding text.
                        </Text>

                        <TouchableOpacity
                            style={styles.templateButton}
                            onPress={() => setPptModalVisible(true)}
                        >
                            <Icon name="eye-outline" size={20} color={THEME_COLORS.white} />
                            <Text style={styles.templateButtonText}>View PPT Template Format</Text>
                        </TouchableOpacity>
                    </GuidelineSection>

                    {/* SECTION 5 — Originality Requirements */}
                    <GuidelineSection title="Originality Requirements" icon="analytics-outline">
                        <Text style={styles.contentText}>
                            We maintain high standards for academic integrity.
                        </Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statValue}>15%</Text>
                                <Text style={styles.statLabel}>Max Plagiarism</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statValue}>25%</Text>
                                <Text style={styles.statLabel}>Max AI Content</Text>
                            </View>
                        </View>
                    </GuidelineSection>

                    {/* SECTION 6 — Eligible Submissions */}
                    <GuidelineSection title="Eligible Submissions" icon="school-outline">
                        <View style={styles.subSection}>
                            <Text style={styles.subHeading}>Second Year (SE)</Text>
                            <BulletPoint text="CEP – Poster Presentation" />
                        </View>
                        <View style={styles.subSection}>
                            <Text style={styles.subHeading}>Third Year (TE)</Text>
                            <BulletPoint text="Technical Seminar – Research Papers" />
                        </View>
                        <View style={styles.subSection}>
                            <Text style={styles.subHeading}>Final Year (BE)</Text>
                            <BulletPoint text="Final Year Project – Research Papers" />
                        </View>
                    </GuidelineSection>

                    {/* SECTION 7 — Team Size */}
                    <GuidelineSection title="Team Size" icon="people-outline">
                        <Text style={styles.contentText}>
                            Each submission may consist of 1 to 4 members.
                        </Text>
                        <BulletPoint text="Participants can submit individually or as a group." />
                    </GuidelineSection>

                    {/* SECTION 8 — Poster Format */}
                    <GuidelineSection title="Poster Format" icon="image-outline">
                        <Text style={styles.contentText}>Must include:</Text>
                        <View style={styles.tagContainer}>
                            {['Title', 'Abstract', 'Problem Statement', 'Architecture', 'Methodology', 'Results', 'Conclusion'].map((tag) => (
                                <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                            ))}
                        </View>
                        <Text style={[styles.contentText, { marginTop: 8 }]}>
                            Poster must include PCCOE header with AI Year logo.
                        </Text>

                        <TouchableOpacity
                            style={[styles.templateButton, { backgroundColor: THEME_COLORS.accent }]}
                            onPress={() => setPosterModalVisible(true)}
                        >
                            <Icon name="eye-outline" size={20} color={THEME_COLORS.white} />
                            <Text style={styles.templateButtonText}>View Poster Format</Text>
                        </TouchableOpacity>
                    </GuidelineSection>
                </View>
            </ScrollView>

            {/* PPT Template Modal */}
            <TemplateModal
                visible={pptModalVisible}
                onClose={() => setPptModalVisible(false)}
                title="PPT Template Format"
            >
                <Text style={styles.modalSubHeading}>General Guidelines</Text>
                <BulletPoint text="Length: Limit presentation to 7–8 slides" />
                <BulletPoint text="Plagiarism: Ensure all content is original or properly cited" />

                <Text style={styles.modalSubHeading}>Slide Structure</Text>
                <View style={styles.slideMap}>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>1</Text><Text style={styles.slideText}>Title Slide (Title, Team, Date)</Text></View>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>2</Text><Text style={styles.slideText}>Introduction (Topic & Objectives)</Text></View>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>3</Text><Text style={styles.slideText}>Methodology (Research Methods)</Text></View>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>4-6</Text><Text style={styles.slideText}>Results (Visuals, Charts, Graphs)</Text></View>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>7</Text><Text style={styles.slideText}>Discussion (Analysis & Implications)</Text></View>
                    <View style={styles.slideItem}><Text style={styles.slideNum}>8</Text><Text style={styles.slideText}>Conclusion (Summary & Future Work)</Text></View>
                </View>

                <Text style={styles.modalSubHeading}>Formatting Guidelines</Text>
                <BulletPoint text="Font: Arial or Calibri" />
                <BulletPoint text="Headings: Min 32pt" />
                <BulletPoint text="Body Text: Min 24pt" />
                <BulletPoint text="Contrast: High contrast (Dark on Light)" />
            </TemplateModal>

            {/* Poster Template Modal */}
            <TemplateModal
                visible={posterModalVisible}
                onClose={() => setPosterModalVisible(false)}
                title="Poster Format Structure"
            >
                <View style={styles.posterLayoutPreview}>
                    <View style={styles.posterHeader}><Text style={styles.posterHeaderText}>PCCOE Header & AI Year Logo</Text></View>
                    <View style={styles.posterTitle}><Text style={styles.posterTitleText}>POSTER TITLE</Text></View>
                    <View style={styles.posterBody}>
                        <View style={styles.posterColumn}>
                            <View style={styles.posterSection}><Text style={styles.posterSectionText}>Abstract</Text></View>
                            <View style={styles.posterSection}><Text style={styles.posterSectionText}>Problem Statement</Text></View>
                            <View style={styles.posterSection}><Text style={styles.posterSectionText}>Architecture</Text></View>
                        </View>
                        <View style={styles.posterColumn}>
                            <View style={styles.posterSection}><Text style={styles.posterSectionText}>Methodology</Text></View>
                            <View style={styles.posterSection}><Text style={styles.posterSectionText}>Results</Text></View>
                            <View style={[styles.posterSection, { flex: 1 }]}><Text style={styles.posterSectionText}>Conclusion</Text></View>
                        </View>
                    </View>
                </View>
                <BulletPoint text="You may design any poster layout of your choice" />
                <BulletPoint text="Must include PCCOE logo and AI Year logo header" />
            </TemplateModal>
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
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        elevation: 5,
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
    card: {
        backgroundColor: THEME_COLORS.white,
        borderRadius: 16,
        marginBottom: spacing.m,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.m,
        backgroundColor: THEME_COLORS.white,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        marginRight: 12,
    },
    cardTitle: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: '700',
    },
    cardContent: {
        padding: spacing.m,
        paddingTop: 0,
    },
    divider: {
        height: 1,
        backgroundColor: THEME_COLORS.border,
        marginBottom: spacing.m,
    },
    contentText: {
        ...typography.body,
        color: THEME_COLORS.textPrimary,
        lineHeight: 20,
    },
    bulletRow: {
        flexDirection: 'row',
        marginTop: 6,
        paddingRight: 10,
    },
    bullet: {
        ...typography.body,
        color: THEME_COLORS.accent,
        marginRight: 8,
        fontWeight: 'bold',
    },
    bulletText: {
        ...typography.body,
        color: THEME_COLORS.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
    subSection: {
        marginTop: 12,
    },
    subHeading: {
        ...typography.caption,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    tag: {
        backgroundColor: THEME_COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: THEME_COLORS.accent + '20',
    },
    tagText: {
        ...typography.caption,
        color: THEME_COLORS.primary,
        fontWeight: '600',
    },
    templateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME_COLORS.primary,
        padding: 12,
        borderRadius: 12,
        marginTop: 16,
        elevation: 2,
    },
    templateButtonText: {
        ...typography.body,
        color: THEME_COLORS.white,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-around',
    },
    statBox: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: THEME_COLORS.secondary,
        borderRadius: 12,
        width: '45%',
    },
    statValue: {
        ...typography.header,
        color: THEME_COLORS.primary,
        fontSize: 22,
    },
    statLabel: {
        ...typography.caption,
        color: THEME_COLORS.textSecondary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: THEME_COLORS.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
        padding: spacing.l,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.l,
    },
    modalTitle: {
        ...typography.title,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
    },
    modalScroll: {
        paddingBottom: spacing.xl,
    },
    modalSubHeading: {
        ...typography.subtitle,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    modalCloseButton: {
        backgroundColor: THEME_COLORS.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    modalCloseButtonText: {
        ...typography.body,
        color: THEME_COLORS.white,
        fontWeight: 'bold',
    },
    slideMap: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
    },
    slideItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    slideNum: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: THEME_COLORS.accent,
        color: THEME_COLORS.white,
        textAlign: 'center',
        lineHeight: 32,
        fontWeight: 'bold',
        marginRight: 12,
    },
    slideText: {
        ...typography.body,
        color: THEME_COLORS.textPrimary,
        flex: 1,
    },
    posterLayoutPreview: {
        height: 300,
        backgroundColor: '#FAFAFA',
        borderWidth: 2,
        borderColor: THEME_COLORS.border,
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    posterHeader: {
        height: 30,
        backgroundColor: THEME_COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    posterHeaderText: {
        fontSize: 10,
        color: THEME_COLORS.primary,
        fontWeight: 'bold',
    },
    posterTitle: {
        height: 40,
        borderWidth: 1,
        borderColor: THEME_COLORS.border,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME_COLORS.textPrimary,
    },
    posterBody: {
        flex: 1,
        flexDirection: 'row',
    },
    posterColumn: {
        flex: 1,
        paddingHorizontal: 4,
    },
    posterSection: {
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 4,
        padding: 4,
        backgroundColor: '#FFF',
    },
    posterSectionText: {
        fontSize: 8,
        color: THEME_COLORS.textSecondary,
    },
});
