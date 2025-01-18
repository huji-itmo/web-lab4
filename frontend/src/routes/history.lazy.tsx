import { Loading } from '@/components/Loading'
import { useDispatch, useSelector } from "react-redux";
import { columns } from '@/components/table/columns'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { addPointsFromQuery } from "@/state/points/PointesSlice";

import { AppDispatch, RootState } from '@/state/state'
import { DataTable } from '@/components/table/data-table';

export const Route = createLazyFileRoute('/history')({
    component: RouteComponent,
    errorComponent: () => <div>Error!</div>
})


function RouteComponent() {

    const dispatch = useDispatch<AppDispatch>();

    const pointsStatus = useSelector((state: RootState) => state.points);

    if (pointsStatus.length == 0) {
        fetch("/api/points/list", {
            method: "GET",
            headers: {
                'Authorization': `${window.localStorage.getItem("session")}`,
            },
        })
            .then(responce => responce.json())
            .then(data => {
                dispatch(addPointsFromQuery(data));
            })
    }


    return (
        <Suspense fallback={<Loading></Loading>}>
            <DataTable data={pointsStatus} columns={columns}></DataTable>
        </Suspense>
    );
}
