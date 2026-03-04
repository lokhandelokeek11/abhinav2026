import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useEffect, useState} from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const CountdownCard: React.FC = () => {
  const targetDate = new Date(2026, 2, 13, 10, 0, 0);
  // Example: 13 march 2026, 10:00 AM

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({days, hours, minutes, seconds});
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Conference Starts In</Text>

      <View style={styles.row}>
        <TimeBox value={timeLeft.days} label="Days" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.hours} label="Hours" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.minutes} label="Mins" />
        <Text style={styles.colon}>:</Text>
        <TimeBox value={timeLeft.seconds} label="Secs" />
      </View>
    </View>
  );
};

const TimeBox = ({value, label}: any) => (
  <View style={styles.timeBox}>
    <Text style={styles.timeText}>{String(value).padStart(2, '0')}</Text>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.primary,
        margin: spacing.m,
        padding: spacing.l,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    title: {
        ...typography.subtitle,
        color: colors.surface,
        marginBottom: spacing.m,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeBox: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        padding: spacing.s,
        borderRadius: 8,
        minWidth: 70,
    },
    timeText: {
        ...typography.header,
        color: colors.surface,
        fontSize: 28,
    },
    timeLabel: {
        ...typography.caption,
        color: colors.surface,
        marginTop: 4,
    },
    colon: {
        ...typography.header,
        color: colors.surface,
        marginHorizontal: spacing.s,
    },
});
