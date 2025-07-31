import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Projects() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Our featured projects</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can showcase your latest and greatest projects. Add images, descriptions, and links to make them stand out.</p>
        </CardContent>
      </Card>
    </div>
  );
}
