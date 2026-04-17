import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ResourceCard } from '@/components/resource-card';
import { Screen } from '@/components/screen';
import { resources } from '@/data/resources';

export default function HomeScreen() {
  const featuredResources = resources.slice(0, 2);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Community support, simplified</Text>
          <Text style={styles.title}>Find trusted help and make requests in one place.</Text>
          <Text style={styles.description}>
            AidLink helps people browse local support resources and quickly start a help request.
          </Text>

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
            These examples use mock data for now, so you can focus on app structure first.
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
    padding: 20,
    gap: 18,
  },
  hero: {
    backgroundColor: '#162033',
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  eyebrow: {
    color: '#8bd3ff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  description: {
    color: '#d8e3f0',
    fontSize: 16,
    lineHeight: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: '#7ce0b8',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
  },
  primaryButtonText: {
    color: '#162033',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#162033',
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    color: '#162033',
    fontSize: 22,
    fontWeight: '700',
  },
  sectionText: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
  quickInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 10,
    marginBottom: 8,
  },
  quickInfoTitle: {
    color: '#162033',
    fontSize: 18,
    fontWeight: '700',
  },
  quickInfoText: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
});
