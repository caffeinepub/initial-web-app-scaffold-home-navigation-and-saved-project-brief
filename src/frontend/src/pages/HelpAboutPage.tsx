import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Save, Cloud, Lock } from 'lucide-react';

export default function HelpAboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Help & About</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use ProjectBrief to plan your web applications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What is ProjectBrief?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ProjectBrief is a simple yet powerful tool to help you define and organize your web application
            projects. Whether you're planning a new startup idea or documenting an existing project, ProjectBrief
            keeps all your essential information in one place.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Create Your Brief</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fill in your project name, description, key goals, budget, and timeline. All fields marked with an
              asterisk (*) are required.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Save className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Auto-Save Locally</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your project brief is automatically saved to your browser's local storage. You can close the page
              and come back anytime without losing your work.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cloud className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Cloud Sync</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Login to save your project brief to the cloud. Access your projects from any device and keep
              everything in sync automatically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Secure & Private</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your data is stored securely on the Internet Computer blockchain. Only you can access your project
              briefs when logged in.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium">Fill in the Project Brief form</h4>
                <p className="text-sm text-muted-foreground">
                  Start by entering your project name, description, and at least 3 key goals or features.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium">Click Save</h4>
                <p className="text-sm text-muted-foreground">
                  Your brief will be saved locally. If you're logged in, it will also sync to the cloud.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium">Update anytime</h4>
                <p className="text-sm text-muted-foreground">
                  Come back and update your project brief as your ideas evolve. Changes are saved automatically.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Writing Great Project Briefs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Be specific about your project's purpose and target audience</li>
            <li>List concrete, measurable goals rather than vague aspirations</li>
            <li>Break down complex features into smaller, actionable items</li>
            <li>Include realistic budget and timeline estimates</li>
            <li>Review and update your brief regularly as the project evolves</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
