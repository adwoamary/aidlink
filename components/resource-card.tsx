import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Resource } from '@/types/resource';

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={`/resources/${resource.id}`} asChild>
      <View style={styles.card}>
        <Text style={styles.category}>{resource.category}</Text>
        <Text style={styles.name}>{resource.name}</Text>
        <Text style={styles.description}>{resource.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{resource.location}</Text>
          <Text style={styles.metaText}>{resource.hours}</Text>
        </View>

        <Text style={styles.linkText}>View details</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  category: {
    color: '#10867a',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  name: {
    color: '#162033',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    gap: 4,
    marginTop: 4,
  },
  metaText: {
    color: '#6a7487',
    fontSize: 14,
  },
  linkText: {
    color: '#216bff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
});
