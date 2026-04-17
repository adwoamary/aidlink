import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
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
    return (
      <Screen>
        <Stack.Screen options={{ title: resource.name }} />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Using starter data</Text>
            <Text style={styles.emptyText}>{loadMessage}</Text>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.category}>{resource.category}</Text>
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

  return (
    <Screen>
      <Stack.Screen options={{ title: resource.name }} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.category}>{resource.category}</Text>
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
    padding: 20,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#162033',
    borderRadius: 24,
    padding: 24,
    gap: 10,
  },
  category: {
    color: '#8bd3ff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  description: {
    color: '#d8e3f0',
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  messageCard: {
    backgroundColor: '#eef6ff',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  messageTitle: {
    color: '#162033',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#162033',
    fontSize: 18,
    fontWeight: '700',
  },
  infoRow: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
  serviceItem: {
    color: '#162033',
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
    color: '#162033',
    fontSize: 22,
    fontWeight: '700',
  },
  emptyText: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
