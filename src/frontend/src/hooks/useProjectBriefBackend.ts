import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ProjectBrief } from '../backend';
import { useState, useEffect } from 'react';

export function useGetCallerProjectBrief() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ProjectBrief | null>({
    queryKey: ['callerProjectBrief'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerProjectBrief();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useProjectBriefBackend() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (brief: ProjectBrief) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveProjectBrief(brief);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerProjectBrief'] });
      setSaveError(null);
      setSaveSuccess(true);
    },
    onError: (error: any) => {
      setSaveError(error.message || 'Failed to save to backend');
      setSaveSuccess(false);
    },
  });

  // Clear success message after 3 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  // Clear error message after 5 seconds
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(() => setSaveError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [saveError]);

  return {
    saveBrief: mutation.mutate,
    isSaving: mutation.isPending,
    saveError,
    saveSuccess,
  };
}
