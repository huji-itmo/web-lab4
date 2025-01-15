import { Loading } from '@/components/Loading'
import { useSelector } from "react-redux";
import { HitResult } from '@/components/table/columns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { RootState } from '@/state/state'

export const Route = createLazyFileRoute('/history')({
    component: RouteComponent,
    errorComponent: () => <div>Error!</div>
})

function getData(): HitResult[] {
    const pointsStatus = useSelector((state: RootState) => state.points);

    // dispatch(
    //     addPoint({
    //         pos: clickedPoint,
    //         radius,
    //         flag: response.flag,
    //         username: response.username,
    //     })
    // );

    // Fetch data from your API here.
    return pointsStatus;
}


function RouteComponent() {

    const data = getData()

    return (
        <div className="container mx-auto py-10">
            <Suspense fallback={<Loading></Loading>}>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>x</TableHead>
                            <TableHead>y</TableHead>
                            <TableHead>r</TableHead>
                            <TableHead>hit</TableHead>
                            <TableHead>serverTime</TableHead>
                            <TableHead>durationInMilliseconds</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((value: HitResult, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{value.x}</TableCell>
                                        <TableCell>{value.y}</TableCell>
                                        <TableCell>{value.r}</TableCell>
                                        <TableCell>{new String(value.hit)}</TableCell>
                                        <TableCell>{value.serverTime}</TableCell>
                                        <TableCell>{value.durationInMilliseconds}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Suspense>
        </div>
    );
}
