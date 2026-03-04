import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export const AboutScreen = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.logo}>🎓</Text>
          <Text style={styles.title}>Abhinav 2026</Text>
          <Text style={styles.subtitle}>Young Professional Conference</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.heading}>About</Text>
          <Text style={styles.paragraph}>
            Welcome to the Abhinav 2026 Young Professional Conference. This
            annual gathering brings together the brightest minds and most
            innovative thinkers across multiple disciplines.
          </Text>
          <Text style={styles.paragraph}>
            Our mission is to foster collaboration, spark new ideas, and provide
            a platform for young professionals to showcase their cutting-edge
            research and projects.
          </Text>

          <Text style={styles.heading}>Contact Information</Text>
          <Text style={styles.paragraph}>Email: contact@abhinav2026.org</Text>
          <Text style={styles.paragraph}>Phone: 020 - 2760 0050</Text>
          <Text style={styles.paragraph}>Address: Pimpri Chinchwad College of Engineering, Nigdi, Pune-411033</Text>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heroSection: {
        backgroundColor: colors.primary,
        padding: spacing.xl,
        alignItems: 'center',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    logo: {
        fontSize: 60,
        marginBottom: spacing.m,
    },
    title: {
        ...typography.header,
        color: colors.surface,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.subtitle,
        color: colors.surface,
        opacity: 0.8,
    },
    contentSection: {
        padding: spacing.l,
    },
    heading: {
        ...typography.title,
        color: colors.primary,
        marginTop: spacing.m,
        marginBottom: spacing.s,
    },
    paragraph: {
        ...typography.body,
        color: colors.text.primary,
        lineHeight: 22,
        marginBottom: spacing.m,
    },
});
