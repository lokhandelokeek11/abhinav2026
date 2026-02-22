import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color={colors.text.secondary} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.text.secondary}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 8,
        paddingHorizontal: spacing.m,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    icon: {
        marginRight: spacing.s,
    },
    input: {
        flex: 1,
        height: 48,
        ...typography.body,
        color: colors.text.primary,
    },
});
