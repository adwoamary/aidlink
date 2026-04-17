import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { firestore, isFirebaseConfigured } from '@/services/firebase';
import { FirestoreHelpRequest } from '@/types/help-request';

// This file keeps help request submission logic in one place.
// The screen can stay simple while this service decides whether to use Firestore
// or the local fallback success flow.

const helpRequestsCollectionName = 'help_requests';

export type HelpRequestFormInput = {
  fullName: string;
  contact: string;
  helpType: string;
  details: string;
};

export type HelpRequestSubmitResult = {
  error: string | null;
  isFallbackSubmission: boolean;
};

export async function submitHelpRequest(
  input: HelpRequestFormInput
): Promise<HelpRequestSubmitResult> {
  const requestToSave: Omit<FirestoreHelpRequest, 'id'> = {
    fullName: input.fullName.trim(),
    contact: input.contact.trim(),
    helpType: input.helpType.trim(),
    details: input.details.trim(),
    status: 'new',
  };

  if (isFirebaseConfigured() && firestore) {
    try {
      await addDoc(collection(firestore, helpRequestsCollectionName), {
        ...requestToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        error: null,
        isFallbackSubmission: false,
      };
    } catch (error) {
      console.warn('Firebase help request submission failed. Using local success fallback.', error);
    }
  }

  return {
    error: 'Live submission is unavailable right now. Your request was saved using the starter fallback flow.',
    isFallbackSubmission: true,
  };
}
