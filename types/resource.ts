export type ResourceCategory =
  | 'Food'
  | 'Shelter'
  | 'Medical'
  | 'Jobs'
  | 'Financial Help';

// Firestore often stores dates as server timestamps later on.
// For this starter foundation, a string keeps the app easy to understand.
export type FirestoreDateString = string;

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  location: string;
  phone: string;
  hours: string;
  services: string[];
};

// The Firestore resource document shape intentionally matches the app's
// Resource type exactly. That keeps the first database version easy to seed
// and easy to understand.
export type FirestoreResource = Resource;
