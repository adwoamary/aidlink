import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { AidLinkTheme, CategoryColors } from '@/constants/theme';
import { getResourceById } from '@/services/resources';
import { FirestoreResource } from '@/types/resource';

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [resource, setResource] = useState<FirestoreResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadResource() {
      setIsLoading(true);
      setLoadMessage('');

      try {
        const result = await getResourceById(id);

        if (isMounted) {
          setResource(result.data);
          setLoadMessage(result.error ?? '');
        }
      } catch (error) {
        if (isMounted) {
          setLoadMessage('Unable to load this resource right now.');
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadResource();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Loading resource</Text>
          <Text style={styles.emptyText}>Checking Firebase first, then using mock data if needed.</Text>
        </View>
      </Screen>
    );
  }

  if (loadMessage && resource) {
    const categoryColors = CategoryColors[resource.category];

    return (
      <Screen>
        <Stack.Screen options={{ title: resource.name }} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Using starter data</Text>
            <Text style={styles.emptyText}>{loadMessage}</Text>
          </View>

          <View style={styles.heroCard}>
            <View style={[styles.categoryChip, { backgroundColor: categoryColors.fill }]}>
              <Text style={[styles.category, { color: categoryColors.text }]}>{resource.category}</Text>
            </View>
            <Text style={styles.title}>{resource.name}</Text>
            <Text style={styles.description}>{resource.description}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Quick details</Text>
            <Text style={styles.infoRow}>Location: {resource.location}</Text>
            <Text style={styles.infoRow}>Phone: {resource.phone}</Text>
            <Text style={styles.infoRow}>Hours: {resource.hours}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Services</Text>
            {resource.services.map((service) => (
              <Text key={service} style={styles.serviceItem}>
                • {service}
              </Text>
            ))}
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (!resource) {
    return (
      <Screen>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Resource not found</Text>
          <Text style={styles.emptyText}>
            The selected resource does not exist in the current mock data set.
          </Text>
        </View>
      </Screen>
    );
  }

  const categoryColors = CategoryColors[resource.category];

  return (
    <Screen>
      <Stack.Screen options={{ title: resource.name }} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={[styles.categoryChip, { backgroundColor: categoryColors.fill }]}>
            <Text style={[styles.category, { color: categoryColors.text }]}>{resource.category}</Text>
          </View>
          <Text style={styles.title}>{resource.name}</Text>
          <Text style={styles.description}>{resource.description}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Quick details</Text>
          <Text style={styles.infoRow}>Location: {resource.location}</Text>
          <Text style={styles.infoRow}>Phone: {resource.phone}</Text>
          <Text style={styles.infoRow}>Hours: {resource.hours}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Services</Text>
          {resource.services.map((service) => (
            <Text key={service} style={styles.serviceItem}>
              • {service}
            </Text>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: AidLinkTheme.spacing.screen,
    gap: 16,
  },
  heroCard: {
    backgroundColor: AidLinkTheme.colors.surfaceStrong,
    borderRadius: AidLinkTheme.radius.hero,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: AidLinkTheme.spacing.cardLarge,
    gap: 12,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    borderRadius: AidLinkTheme.radius.chip,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  category: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  title: {
    color: AidLinkTheme.colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  description: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 10,
  },
  messageCard: {
    backgroundColor: AidLinkTheme.colors.infoSoft,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: '#c7dae8',
    padding: 20,
    gap: 8,
  },
  messageTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  infoRow: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  serviceItem: {
    color: AidLinkTheme.colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  emptyTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  emptyText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
