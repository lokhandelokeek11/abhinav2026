import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { BadgeTag } from '../ui/BadgeTag';
import Icon from 'react-native-vector-icons/Ionicons';
import { Room } from '../../data/venues';

interface RoomCardProps {
    room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.roomNumber}>{room.roomNumber}</Text>
                <BadgeTag status={room.status} />
            </View>
            <Text style={styles.sessionName}>{room.sessionName}</Text>
            <View style={styles.footer}>
                <Icon name="time-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.time}>{room.time}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        padding: spacing.m,
        marginHorizontal: spacing.m,
        marginBottom: spacing.m,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.s,
    },
    roomNumber: {
        ...typography.title,
        color: colors.primary,
    },
    sessionName: {
        ...typography.body,
        color: colors.text.primary,
        marginBottom: spacing.m,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        ...typography.caption,
        color: colors.text.secondary,
        marginLeft: spacing.xs,
    },
});
