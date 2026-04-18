import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ResourceCard } from '@/components/resource-card';
import { Screen } from '@/components/screen';
import { AidLinkTheme } from '@/constants/theme';
import { resources } from '@/data/resources';

export default function HomeScreen() {
  const featuredResources = resources.slice(0, 2);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.eyebrow}>Community support, simplified</Text>
          </View>
          <Text style={styles.title}>Trusted local help, presented with clarity and care.</Text>
          <Text style={styles.description}>
            AidLink helps people browse support resources, understand what is available, and start
            a request without extra friction.
          </Text>

          <View style={styles.heroHighlights}>
            <View style={styles.heroHighlightCard}>
              <Text style={styles.heroHighlightValue}>Local</Text>
              <Text style={styles.heroHighlightLabel}>Resource discovery</Text>
            </View>
            <View style={styles.heroHighlightCard}>
              <Text style={styles.heroHighlightValue}>Simple</Text>
              <Text style={styles.heroHighlightLabel}>Request intake flow</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <Link href="/resources" style={[styles.button, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>Browse resources</Text>
            </Link>
            <Link href="/request-help" style={[styles.button, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Request help</Text>
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured resources</Text>
          <Text style={styles.sectionText}>
            A small selection of support options to help people quickly orient themselves and take
            the next step.
          </Text>
        </View>

        {featuredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}

        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoTitle}>What this version includes</Text>
          <Text style={styles.quickInfoText}>Home screen for entry points and featured content</Text>
          <Text style={styles.quickInfoText}>Resources list and detail screens powered by mock data</Text>
          <Text style={styles.quickInfoText}>Request Help screen with a simple starter form layout</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: AidLinkTheme.spacing.screen,
    gap: 18,
  },
  hero: {
    backgroundColor: AidLinkTheme.colors.primary,
    borderRadius: AidLinkTheme.radius.hero,
    padding: AidLinkTheme.spacing.cardLarge,
    gap: 14,
    borderWidth: 1,
    borderColor: '#355f67',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 250, 245, 0.12)',
    borderRadius: AidLinkTheme.radius.chip,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  eyebrow: {
    color: '#d5ebe7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: AidLinkTheme.colors.headingOnDark,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
  },
  description: {
    color: AidLinkTheme.colors.textOnDark,
    fontSize: 16,
    lineHeight: 24,
  },
  heroHighlights: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  heroHighlightCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 250, 245, 0.1)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 250, 245, 0.14)',
    padding: 14,
    gap: 2,
  },
  heroHighlightValue: {
    color: AidLinkTheme.colors.headingOnDark,
    fontSize: 17,
    fontWeight: '800',
  },
  heroHighlightLabel: {
    color: AidLinkTheme.colors.textOnDark,
    fontSize: 13,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  button: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: AidLinkTheme.colors.secondary,
  },
  secondaryButton: {
    backgroundColor: AidLinkTheme.colors.surfaceStrong,
  },
  primaryButtonText: {
    color: AidLinkTheme.colors.headingOnDark,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: AidLinkTheme.colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    gap: 8,
    marginTop: 6,
  },
  sectionTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  sectionText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  quickInfoCard: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 10,
    marginBottom: 8,
  },
  quickInfoTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  quickInfoText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
