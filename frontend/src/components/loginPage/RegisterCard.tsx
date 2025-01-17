import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RegisterCard() {
    return <Card>
        <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
                Type the credentials for your account. Click create account to define your online persona.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input placeholder="name" id="name" />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="password" id="current" type="password" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Create account</Button>
        </CardFooter>
    </Card>
}
