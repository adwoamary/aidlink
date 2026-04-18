import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/screen';
import { AidLinkTheme } from '@/constants/theme';
import { HelpRequestFormInput, submitHelpRequest } from '@/services/help-requests';

export default function RequestHelpScreen() {
  const [form, setForm] = useState<HelpRequestFormInput>({
    fullName: '',
    contact: '',
    helpType: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function validateForm() {
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your name.';
    }

    if (!form.contact.trim()) {
      nextErrors.contact = 'Please enter a phone number or email.';
    }

    if (!form.helpType.trim()) {
      nextErrors.helpType = 'Please describe the type of help you need.';
    }

    if (form.details.trim().length < 10) {
      nextErrors.details = 'Please add at least 10 characters so the request has enough detail.';
    }

    return nextErrors;
  }

  async function handleSubmit() {
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage('');
      setSubmitMessage('');
      return;
    }

    setErrors({});
    setSuccessMessage('');
    setSubmitMessage('');
    setIsSubmitting(true);

    try {
      const result = await submitHelpRequest(form);

      setSuccessMessage(
        result.isFallbackSubmission
          ? 'Your request was submitted successfully. The app used the local starter fallback because Firestore is not available right now.'
          : 'Your request was submitted successfully and saved to Firebase.'
      );
      setSubmitMessage(result.error ?? '');
      setForm({
        fullName: '',
        contact: '',
        helpType: '',
        details: '',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Support intake</Text>
          <Text style={styles.title}>Request help</Text>
          <Text style={styles.description}>
            Share a few details so a support team can understand the situation and follow up
            quickly.
          </Text>
        </View>

        <View style={styles.formCard}>
          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Request received</Text>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          {submitMessage ? (
            <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>Submission note</Text>
              <Text style={styles.noteText}>{submitMessage}</Text>
            </View>
          ) : null}

          <FieldLabel>Full name</FieldLabel>
          <TextInput
            value={form.fullName}
            onChangeText={(value) => updateField('fullName', value)}
            placeholder="Jane Doe"
            placeholderTextColor={AidLinkTheme.colors.textSoft}
            style={[styles.input, errors.fullName ? styles.inputError : undefined]}
            editable={!isSubmitting}
          />
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

          <FieldLabel>Phone or email</FieldLabel>
          <TextInput
            value={form.contact}
            onChangeText={(value) => updateField('contact', value)}
            placeholder="jane@example.com"
            placeholderTextColor={AidLinkTheme.colors.textSoft}
            style={[styles.input, errors.contact ? styles.inputError : undefined]}
            editable={!isSubmitting}
          />
          {errors.contact ? <Text style={styles.errorText}>{errors.contact}</Text> : null}

          <FieldLabel>Type of help needed</FieldLabel>
          <TextInput
            value={form.helpType}
            onChangeText={(value) => updateField('helpType', value)}
            placeholder="Food, shelter, transportation, legal support..."
            placeholderTextColor={AidLinkTheme.colors.textSoft}
            style={[styles.input, errors.helpType ? styles.inputError : undefined]}
            editable={!isSubmitting}
          />
          {errors.helpType ? <Text style={styles.errorText}>{errors.helpType}</Text> : null}

          <FieldLabel>Details</FieldLabel>
          <TextInput
            value={form.details}
            onChangeText={(value) => updateField('details', value)}
            placeholder="Share any details that would help a support team respond."
            placeholderTextColor={AidLinkTheme.colors.textSoft}
            style={[
              styles.input,
              styles.multilineInput,
              errors.details ? styles.inputError : undefined,
            ]}
            multiline
            textAlignVertical="top"
            editable={!isSubmitting}
          />
          {errors.details ? <Text style={styles.errorText}>{errors.details}</Text> : null}

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : undefined]}>
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting request...' : 'Submit request'}
            </Text>
          </Pressable>

          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Next step</Text>
            <Text style={styles.noteText}>
              This screen keeps the validation simple, tries Firebase first, and falls back to the
              local starter flow if live submission is unavailable.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  content: {
    padding: AidLinkTheme.spacing.screen,
    gap: 16,
  },
  heroCard: {
    backgroundColor: AidLinkTheme.colors.surface,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 8,
  },
  eyebrow: {
    color: AidLinkTheme.colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
  formCard: {
    backgroundColor: AidLinkTheme.colors.surfaceStrong,
    borderRadius: AidLinkTheme.radius.card,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.borderSoft,
    padding: 20,
    gap: 10,
  },
  label: {
    color: AidLinkTheme.colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  input: {
    backgroundColor: AidLinkTheme.colors.backgroundMuted,
    borderRadius: AidLinkTheme.radius.input,
    borderWidth: 1,
    borderColor: AidLinkTheme.colors.border,
    color: AidLinkTheme.colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: AidLinkTheme.colors.danger,
    backgroundColor: AidLinkTheme.colors.dangerSoft,
  },
  multilineInput: {
    minHeight: 120,
  },
  errorText: {
    color: AidLinkTheme.colors.danger,
    fontSize: 13,
    lineHeight: 18,
    marginTop: -2,
  },
  submitButton: {
    backgroundColor: AidLinkTheme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 15,
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: AidLinkTheme.colors.headingOnDark,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  successBox: {
    backgroundColor: AidLinkTheme.colors.successSoft,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c3e1d2',
    padding: 16,
    gap: 6,
    marginBottom: 2,
  },
  successTitle: {
    color: AidLinkTheme.colors.success,
    fontSize: 16,
    fontWeight: '800',
  },
  successText: {
    color: AidLinkTheme.colors.success,
    fontSize: 14,
    lineHeight: 21,
  },
  noteBox: {
    backgroundColor: AidLinkTheme.colors.infoSoft,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c7dae8',
    padding: 16,
    gap: 6,
    marginTop: 6,
  },
  noteTitle: {
    color: AidLinkTheme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  noteText: {
    color: AidLinkTheme.colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
});
