import { useState, useCallback, useEffect } from 'react';
import type { ProjectBrief } from '../backend';

const DRAFT_STORAGE_KEY = 'projectBriefDraft';

export function useProjectBriefDraft() {
  const [draft, setDraft] = useState<ProjectBrief | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert budget back to BigInt if it exists
        if (parsed.budget) {
          parsed.budget = BigInt(parsed.budget);
        }
        setDraft(parsed);
      }
    } catch (error) {
      console.error('Failed to load draft from localStorage:', error);
    }
  }, []);

  const saveDraft = useCallback((brief: ProjectBrief) => {
    try {
      // Convert BigInt to string for JSON serialization
      const serializable = {
        ...brief,
        budget: brief.budget ? brief.budget.toString() : undefined,
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(serializable));
      setDraft(brief);
    } catch (error) {
      console.error('Failed to save draft to localStorage:', error);
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setDraft(null);
    } catch (error) {
      console.error('Failed to clear draft from localStorage:', error);
    }
  }, []);

  return { draft, saveDraft, clearDraft };
}
