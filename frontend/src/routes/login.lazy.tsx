import { LoginCard } from '@/components/loginPage/LoginCard'
import { RegisterCard } from '@/components/loginPage/RegisterCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex items-center w-screen h-screen justify-center">
            <Tabs defaultValue="login" className="place-content-center w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginCard></LoginCard>
                </TabsContent>
                <TabsContent value="register">
                    <RegisterCard></RegisterCard>
                </TabsContent>
            </Tabs>
        </div>
    );
}
