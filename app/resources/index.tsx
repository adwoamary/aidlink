import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ResourceCard } from '@/components/resource-card';
import { Screen } from '@/components/screen';
import { AidLinkTheme } from '@/constants/theme';
import { resourceCategories, resources } from '@/data/resources';
import { getResources, seedResources } from '@/services/resources';
import { FirestoreResource, ResourceCategory } from '@/types/resource';

export default function ResourcesScreen() {
  const [resourceList, setResourceList] = useState<FirestoreResource[]>(resources);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState('');
  const [seedMessage, setSeedMessage] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadResources() {
      setIsLoading(true);
      setLoadMessage('');

      try {
        const result = await getResources();

        if (isMounted) {
          setResourceList(result.data);
          setLoadMessage(result.error ?? '');
        }
      } catch (error) {
        if (isMounted) {
          setLoadMessage('Unable to load resources right now.');
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadResources();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSeedResources() {
    setIsSeeding(true);
    setSeedMessage('');

    try {
      const result = await seedResources();

      setSeedMessage(
        result.error ?? `Firestore seed complete. Added or updated ${result.seededCount} resources.`
      );
    } finally {
      setIsSeeding(false);
    }
  }

  const normalizedSearchText = searchText.trim().toLowerCase();

  const filteredResources = resourceList.filter((resource) => {
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;

    const matchesSearch =
      normalizedSearchText.length === 0 ||
      resource.name.toLowerCase().includes(normalizedSearchText) ||
      resource.description.toLowerCase().includes(normalizedSearchText) ||
      resource.location.toLowerCase().includes(normalizedSearchText);

    return matchesCategory && matchesSearch;
  });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.title}>Available resources</Text>
          <Text style={styles.description}>
            Browse local programs, support services, and urgent help options. Each card opens a
            detail page with more information.
          </Text>

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by name, description, or location"
            placeholderTextColor={AidLinkTheme.colors.textSoft}
            style={styles.searchInput}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}>
            <FilterChip
              label="All"
              isSelected={selectedCategory === null}
              onPress={() => setSelectedCategory(null)}
            />
            {resourceCategories.map((category) => (
              <FilterChip
                key={category}
                label={category}
                isSelected={selectedCategory === category}
                onPress={() =>
                  setSelectedCategory((currentCategory) =>
                    currentCategory === category ? null : category
                  )
                }
              />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.resultsText}>
          {filteredResources.length} resource{filteredResources.length === 1 ? '' : 's'} found
        </Text>

        <View style={styles.devCard}>
          <Text style={styles.messageTitle}>Temporary developer seed tool</Text>
          <Text style={styles.messageText}>
            Use this temporary button to copy the current mock resources into the Firestore
            `resources` collection.
          </Text>
          <Pressable
            onPress={handleSeedResources}
            disabled={isSeeding}
            style={[styles.seedButton, isSeeding ? styles.seedButtonDisabled : undefined]}>
            <Text style={styles.seedButtonText}>
              {isSeeding ? 'Seeding resources...' : 'Seed Firestore resources'}
            </Text>
          </Pressable>
          {seedMessage ? <Text style={styles.seedMessage}>{seedMessage}</Text> : null}
        </View>

        {isLoading ? (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Loading resources</Text>
            <Text style={styles.messageText}>Checking Firebase first, then using mock data if needed.</Text>
          </View>
        ) : loadMessage ? (
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Using starter data</Text>
            <Text style={styles.messageText}>{loadMessage}</Text>
          </View>
        ) : filteredResources.length > 0 ? (
          filteredResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No resources match your filters</Text>
            <Text style={styles.emptyText}>
              Try a different search term or clear the selected category.
            </Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

function FilterChip({ label, isSelected, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, isSelected ? styles.selectedChip : styles.unselectedChip]}>
      <Text style={[styles.chipText, isSelected ? styles.selectedChipText : styles.unselectedChipText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: AidLinkTheme.spacing.screen,
    gap: 16,
  },
  headerCard: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 10,
  },
  searchInput: {
    backgroundColor: AidLinkTheme.colors.backgroundMuted,
    borderRadius: AidLinkTheme.radius.input,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.border,
    color: AidLinkTheme.colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 8,
  },
  chipsRow: {
    gap: 10,
    paddingTop: 8,
    paddingRight: 4,
  },
  chip: {
    borderRadius: AidLinkTheme.radius.chip,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedChip: {
    backgroundColor: AidLinkTheme.colors.primary,
    borderColor: AidLinkTheme.colors.primary,
  },
  unselectedChip: {
    backgroundColor: AidLinkTheme.colors.surfaceStrong,
    borderColor: AidLinkTheme.colors.border,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  selectedChipText: {
    color: AidLinkTheme.colors.headingOnDark,
  },
  unselectedChipText: {
    color: AidLinkTheme.colors.textMuted,
  },
  title: {
    color: AidLinkTheme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  description: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  resultsText: {
    color: AidLinkTheme.colors.textSoft,
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  emptyState: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 8,
  },
  messageCard: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 8,
  },
  messageTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  messageText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  devCard: {
    backgroundColor: '#fff4df',
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: '#ecd8b1',
    padding: 20,
    gap: 10,
  },
  seedButton: {
    backgroundColor: AidLinkTheme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  seedButtonDisabled: {
    opacity: 0.7,
  },
  seedButtonText: {
    color: AidLinkTheme.colors.headingOnDark,
    fontSize: 15,
    fontWeight: '700',
  },
  seedMessage: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  emptyTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
