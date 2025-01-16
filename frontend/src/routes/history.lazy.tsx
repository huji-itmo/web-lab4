import { Loading } from '@/components/Loading'
import { useSelector } from "react-redux";
import { columns } from '@/components/table/columns'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { RootState } from '@/state/state'
import { DataTable } from '@/components/table/data-table';

export const Route = createLazyFileRoute('/history')({
    component: RouteComponent,
    errorComponent: () => <div>Error!</div>
})


function RouteComponent() {
    const pointsStatus = useSelector((state: RootState) => state.points);

    return (
        <Suspense fallback={<Loading></Loading>}>
            <DataTable data={pointsStatus} columns={columns}></DataTable>
        </Suspense>
    );
}
