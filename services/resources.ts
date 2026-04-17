import { getResourceById as getMockResourceById, resources as mockResources } from '@/data/resources';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

import { firestore, getMissingFirebaseConfigKeys, isFirebaseConfigured } from '@/services/firebase';
import { FirestoreResource } from '@/types/resource';

// This file is the app's resource data layer.
// Screens call these functions instead of importing Firebase or mock data directly.
// The app tries Firestore first and falls back to local sample data when needed.

const resourcesCollectionName = 'resources';

export type ResourceServiceResult<T> = {
  data: T;
  error: string | null;
  isFallbackData: boolean;
};

export type SeedResourcesResult = {
  error: string | null;
  seededCount: number;
};

export async function getResources(): Promise<ResourceServiceResult<FirestoreResource[]>> {
  if (isFirebaseConfigured()) {
    try {
      return {
        data: await getResourcesFromFirebase(),
        error: null,
        isFallbackData: false,
      };
    } catch (error) {
      console.warn('Firebase resource loading failed. Falling back to mock data.', error);

      return createFallbackResult(
        mockResources,
        'Live resource data is unavailable right now. Showing sample resources instead.'
      );
    }
  }

  return createFallbackResult(
    mockResources,
    buildFirebaseNotReadyMessage()
  );
}

export async function getResourceById(
  id?: string
): Promise<ResourceServiceResult<FirestoreResource | null>> {
  if (!id) {
    return {
      data: null,
      error: 'A resource id is required before the app can load details.',
      isFallbackData: true,
    };
  }

  if (isFirebaseConfigured()) {
    try {
      return {
        data: await getResourceByIdFromFirebase(id),
        error: null,
        isFallbackData: false,
      };
    } catch (error) {
      console.warn('Firebase resource lookup failed. Falling back to mock data.', error);

      return createFallbackResult(
        getMockResourceById(id) ?? null,
        'Live resource details are unavailable right now. Showing sample data instead.'
      );
    }
  }

  return createFallbackResult(getMockResourceById(id) ?? null, buildFirebaseNotReadyMessage());
}

export async function seedResources(): Promise<SeedResourcesResult> {
  if (!isFirebaseConfigured() || !firestore) {
    return {
      error: buildFirebaseNotReadyMessage(),
      seededCount: 0,
    };
  }

  try {
    await Promise.all(
      mockResources.map((resource) =>
        setDoc(doc(firestore, resourcesCollectionName, resource.id), createFirestoreResource(resource))
      )
    );

    return {
      error: null,
      seededCount: mockResources.length,
    };
  } catch (error) {
    console.warn('Firebase resource seed failed.', error);

    return {
      error: 'Unable to seed Firestore right now. The app will keep using mock resource data.',
      seededCount: 0,
    };
  }
}

async function getResourcesFromFirebase(): Promise<FirestoreResource[]> {
  if (!firestore) {
    throw new Error('Firestore is not initialized.');
  }

  const snapshot = await getDocs(collection(firestore, resourcesCollectionName));

  return snapshot.docs.map((resourceDocument) => {
    const data = resourceDocument.data() as Partial<FirestoreResource>;

    return normalizeResourceDocument({
      id: resourceDocument.id,
      ...data,
    });
  });
}

async function getResourceByIdFromFirebase(id?: string): Promise<FirestoreResource | null> {
  if (!id || !firestore) {
    return null;
  }

  const resourceSnapshot = await getDoc(doc(firestore, resourcesCollectionName, id));

  if (!resourceSnapshot.exists()) {
    return null;
  }

  const data = resourceSnapshot.data() as Partial<FirestoreResource>;

  return normalizeResourceDocument({
    id: resourceSnapshot.id,
    ...data,
  });
}

function createFallbackResult<T>(data: T, error: string): ResourceServiceResult<T> {
  return {
    data,
    error,
    isFallbackData: true,
  };
}

function buildFirebaseNotReadyMessage() {
  const missingKeys = getMissingFirebaseConfigKeys();

  if (missingKeys.length === 0) {
    return 'Firebase is connected, but this starter app is still using sample resource data.';
  }

  return `Firebase is not configured yet. Missing: ${missingKeys.join(', ')}. Showing sample resources for now.`;
}

function normalizeResourceDocument(resource: Partial<FirestoreResource> & { id: string }): FirestoreResource {
  return {
    id: resource.id,
    name: resource.name ?? 'Unnamed resource',
    category: resource.category ?? 'Food',
    description: resource.description ?? 'No description available yet.',
    location: resource.location ?? 'Location not available',
    phone: resource.phone ?? 'Contact not available',
    hours: resource.hours ?? 'Hours not available',
    services: Array.isArray(resource.services) ? resource.services : [],
  };
}

function createFirestoreResource(resource: FirestoreResource): FirestoreResource {
  return {
    id: resource.id,
    name: resource.name,
    category: resource.category,
    description: resource.description,
    location: resource.location,
    phone: resource.phone,
    hours: resource.hours,
    services: resource.services,
  };
}
