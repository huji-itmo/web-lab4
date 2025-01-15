import { Loading } from '@/components/Loading'
import { useSelector } from "react-redux";
import { columns, HitResult } from '@/components/table/columns'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { RootState } from '@/state/state'
import { DataTable } from '@/components/table/data-table';

export const Route = createLazyFileRoute('/history')({
    component: RouteComponent,
    errorComponent: () => <div>Error!</div>
})

function getData(): HitResult[] {
    const pointsStatus = useSelector((state: RootState) => state.points);

    return pointsStatus;
}


function RouteComponent() {

    const data = getData()

    return (
        <Suspense fallback={<Loading></Loading>}>
            <DataTable data={data} columns={columns}></DataTable>
        </Suspense>
    );
}
