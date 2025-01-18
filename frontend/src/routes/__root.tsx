import { createRootRoute, Link, Outlet, useBlocker } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect, useState } from 'react'

export const Route = createRootRoute({
    component: RouteComponent,
})


function RouteComponent() {

    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const session = window.localStorage.getItem("session");

        setAuthorized(session != null);
    });

    useBlocker({
        shouldBlockFn: () => {
            if (authorized) {
                return false;
            }

            return false;

            // return (
            //     next.fullPath !== '/about' &&
            //     next.fullPath !== '/login'
            // )
        },
        withResolver: true,
    });

    return (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
                {authorized ?
                    <>
                        <Link to="/game" className="[&.active]:font-bold">
                            Game
                        </Link>{' '}
                        <Link to="/history" className="[&.active]:font-bold">
                            History
                        </Link>{' '}
                    </> : <></>
                }

                <Link to="/login" className="[&.active]:font-bold">
                    {authorized ? "Change account" : "Login"}
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}
