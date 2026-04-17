import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ResourceCard } from '@/components/resource-card';
import { Screen } from '@/components/screen';
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
            placeholderTextColor="#8a94a6"
            style={styles.searchInput}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
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
    padding: 20,
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  searchInput: {
    backgroundColor: '#f3f6fb',
    borderRadius: 14,
    color: '#162033',
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
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedChip: {
    backgroundColor: '#162033',
  },
  unselectedChip: {
    backgroundColor: '#eef2f8',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#ffffff',
  },
  unselectedChipText: {
    color: '#526077',
  },
  title: {
    color: '#162033',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
  resultsText: {
    color: '#526077',
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  messageTitle: {
    color: '#162033',
    fontSize: 18,
    fontWeight: '700',
  },
  messageText: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
  devCard: {
    backgroundColor: '#fff8e8',
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  seedButton: {
    backgroundColor: '#162033',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  seedButtonDisabled: {
    opacity: 0.7,
  },
  seedButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  seedMessage: {
    color: '#526077',
    fontSize: 14,
    lineHeight: 21,
  },
  emptyTitle: {
    color: '#162033',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: '#526077',
    fontSize: 15,
    lineHeight: 22,
  },
});
