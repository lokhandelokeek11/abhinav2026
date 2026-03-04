import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const CountdownCard: React.FC = () => {
  const targetDate = new Date(2026, 2, 13, 10, 0, 0);

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

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Conference Starts In</Text>

      <View style={styles.row}>
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Mins" />
        <TimeBox value={timeLeft.seconds} label="Secs" />
      </View>
    </View>
  );
};

const TimeBox = ({ value, label }: any) => (
  <View style={styles.timeBox}>
    <View style={styles.tile}>
      <Text style={styles.timeText}>{String(value).padStart(2, '0')}</Text>
    </View>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    margin: spacing.m,
    padding: spacing.l,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    ...typography.subtitle,
    color: colors.surface,
    marginBottom: spacing.l,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeBox: {
    alignItems: 'center',
    flex: 1,
  },
  tile: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: spacing.m,
    borderRadius: 16,
    minWidth: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  timeText: {
    ...typography.header,
    color: colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  timeLabel: {
    ...typography.caption,
    color: colors.surface,
    marginTop: 8,
    fontWeight: '600',
    opacity: 0.8,
  },
});
