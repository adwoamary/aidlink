import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AidLinkTheme, CategoryColors } from '@/constants/theme';
import { Resource } from '@/types/resource';

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const categoryColors = CategoryColors[resource.category];

  return (
    <Link href={`/resources/${resource.id}`} asChild>
      <View style={styles.card}>
        <View style={[styles.categoryChip, { backgroundColor: categoryColors.fill }]}>
          <Text style={[styles.category, { color: categoryColors.text }]}>{resource.category}</Text>
        </View>
        <Text style={styles.name}>{resource.name}</Text>
        <Text style={styles.description}>{resource.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Location</Text>
          <Text style={styles.metaText}>{resource.location}</Text>
          <Text style={styles.metaLabel}>Hours</Text>
          <Text style={styles.metaText}>{resource.hours}</Text>
        </View>

        <Text style={styles.linkText}>View details</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AidLinkTheme.colors.surfaceStrong,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 10,
    shadowColor: '#20313d',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 2,
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
  name: {
    color: AidLinkTheme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    gap: 2,
    marginTop: 2,
  },
  metaLabel: {
    color: AidLinkTheme.colors.textSoft,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  metaText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  linkText: {
    color: AidLinkTheme.colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
});
