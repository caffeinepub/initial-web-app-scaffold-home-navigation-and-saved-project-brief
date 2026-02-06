import { useEffect } from 'react';
import ProjectBriefForm from '../components/ProjectBriefForm';
import ProfileSetupDialog from '../components/ProfileSetupDialog';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerProjectBrief } from '../hooks/useProjectBriefBackend';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useProjectBriefDraft } from '../hooks/useProjectBriefDraft';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function HomePage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: backendBrief, isLoading: briefLoading } = useGetCallerProjectBrief();
  const { saveDraft } = useProjectBriefDraft();

  // Load backend brief into local draft when available
  useEffect(() => {
    if (backendBrief && isAuthenticated) {
      saveDraft(backendBrief);
    }
  }, [backendBrief, isAuthenticated, saveDraft]);

  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  if (isAuthenticated && (profileLoading || briefLoading)) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {isAuthenticated && userProfile ? `Welcome back, ${userProfile.name}!` : 'Create Your Project Brief'}
          </h1>
          <p className="text-lg text-muted-foreground">
            Define your web application project and track your progress.
          </p>
        </div>

        <ProjectBriefForm isAuthenticated={isAuthenticated} />
      </div>

      <ProfileSetupDialog open={showProfileSetup} />
    </>
  );
}
