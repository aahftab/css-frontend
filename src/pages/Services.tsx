import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>Our available services</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the services page that lists all our offerings. You can add more content here to showcase your services.</p>
        </CardContent>
      </Card>
    </div>
  );
}
