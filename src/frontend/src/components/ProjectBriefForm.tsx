import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Save, CheckCircle2, AlertCircle, Plus, X } from 'lucide-react';
import { useProjectBriefBackend } from '../hooks/useProjectBriefBackend';
import { useProjectBriefDraft } from '../hooks/useProjectBriefDraft';
import type { ProjectBrief } from '../backend';

interface ProjectBriefFormProps {
  isAuthenticated: boolean;
}

export default function ProjectBriefForm({ isAuthenticated }: ProjectBriefFormProps) {
  const { saveBrief, isSaving, saveError, saveSuccess } = useProjectBriefBackend();
  const { draft, saveDraft } = useProjectBriefDraft();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [validationError, setValidationError] = useState('');

  // Load draft on mount
  useEffect(() => {
    if (draft) {
      setProjectName(draft.projectName);
      setDescription(draft.description);
      setGoals(draft.goals);
      setBudget(draft.budget ? draft.budget.toString() : '');
      setTimeline(draft.timeline || '');
    }
  }, [draft]);

  const handleSave = async () => {
    // Validation
    if (!projectName.trim()) {
      setValidationError('Project name is required');
      return;
    }
    if (!description.trim()) {
      setValidationError('Description is required');
      return;
    }
    if (!goals.trim()) {
      setValidationError('Goals are required');
      return;
    }

    setValidationError('');

    const brief: ProjectBrief = {
      projectName: projectName.trim(),
      description: description.trim(),
      goals: goals.trim(),
      budget: budget ? BigInt(budget) : undefined,
      timeline: timeline.trim() || undefined,
    };

    // Always save to local storage first
    saveDraft(brief);

    // If authenticated, try to save to backend
    if (isAuthenticated) {
      await saveBrief(brief);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Project Brief</CardTitle>
        <CardDescription>
          Define your web app project details. Your progress is automatically saved locally.
          {isAuthenticated && ' Login to sync across devices.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">
            Project Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="projectName"
            placeholder="My Awesome Web App"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="A brief description of what your web app does..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals">
            Key Goals & Features <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="goals"
            placeholder="List at least 3 key features or goals for your app..."
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={6}
          />
          <p className="text-xs text-muted-foreground">
            Tip: List each feature on a new line for better readability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (optional)</Label>
            <Input
              id="budget"
              type="number"
              placeholder="10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline (optional)</Label>
            <Input
              id="timeline"
              placeholder="e.g., 3 months"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
          </div>
        </div>

        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {saveError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to save to backend: {saveError}. Your draft is saved locally.
            </AlertDescription>
          </Alert>
        )}

        {saveSuccess && (
          <Alert className="border-green-500 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Project brief saved successfully!</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Project Brief
            </>
          )}
        </Button>

        {!isAuthenticated && (
          <p className="text-sm text-muted-foreground text-center">
            Login to save your project brief to the cloud and access it from any device.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
