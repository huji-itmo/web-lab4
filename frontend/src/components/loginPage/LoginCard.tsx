import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export function LoginCard() {

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    function tryLogin() {


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
                <Input ref={usernameInput} placeholder="name" id="name" />
            </div>

            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input ref={passwordInput} placeholder="password" id="current" type="password" />
            </div>

        </CardContent>
        <CardFooter>
            <Button>Login</Button>
        </CardFooter>
    </Card>
}
