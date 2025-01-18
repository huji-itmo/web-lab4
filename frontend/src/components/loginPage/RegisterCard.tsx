import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sha256 } from "js-sha256";
import { useToast } from "@/hooks/use-toast";


export function RegisterCard() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();


    function tryLogin() {


        fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Authorization': `${username}:${sha256(password)}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    toast({
                        title: "Success.",
                        description: "Account created!"
                    });
                } else {
                    toast({
                        title: "Failure.",
                        description: `${data.error}`,
                    });
                }
            })
            .catch(error => {
                console.error('')
                toast({
                    title: "Error. ",
                    description: `${error}`,
                });
            }
            );
    }

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
                <Input placeholder="name" id="name" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input placeholder="password" id="current" type="password" onInput={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} />
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={tryLogin}>Create account</Button>
        </CardFooter>
    </Card>
}
