import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sha256 } from "js-sha256";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

export function LoginCard() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { toast } = useToast();
    const navigate = useNavigate();

    function tryLogin() {

        fetch('/api/account/login', {
            method: 'GET',
            headers: {
                'Authorization': `${username}:${sha256(password)}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success == true) {
                    window.localStorage.setItem("session", data.session);

                    navigate({ to: "/" });


                } else {
                    toast({
                        title: "Failure.",
                        description: `${data.error}`,
                    });
                }


            })
            .catch(error => console.error('Error:', error));
    }

    return <Card>
        <CardHeader>
            <CardTitle>Login to existing account</CardTitle>
            <CardDescription>
                Type the credentials for your account. Click login when you think they are right.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">

            <div className="space-y-1">
                <Label htmlFor="name">Username</Label>
                <Input placeholder="name" id="name" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
            </div>

            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="password" id="current" type="password" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
            </div>

        </CardContent>
        <CardFooter>
            <Button onClick={tryLogin}>Login</Button>
        </CardFooter>
    </Card>
}
