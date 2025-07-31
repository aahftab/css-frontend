import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Home</CardTitle>
          <CardDescription>Welcome to the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the home page with some sample content. You can customize this as needed for your application.</p>
        </CardContent>
      </Card>
    </div>
  );
}
