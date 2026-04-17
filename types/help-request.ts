import { FirestoreDateString, ResourceCategory } from '@/types/resource';

export type HelpRequestStatus = 'new' | 'in_review' | 'closed';

export type FirestoreHelpRequest = {
  id: string;
  fullName: string;
  contact: string;
  helpType: string;
  details: string;
  requestedCategory?: ResourceCategory;
  status: HelpRequestStatus;
  assignedTo?: string;
  notes?: string;
  createdAt?: FirestoreDateString;
  updatedAt?: FirestoreDateString;
};
