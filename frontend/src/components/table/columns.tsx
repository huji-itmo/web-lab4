"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HitResult = {
    x: number,
    y: number,
    r: number,
    hit: boolean,
    serverTime: string
    durationInMilliseconds: string
}

export const columns: ColumnDef<HitResult>[] = [
    {
        accessorKey: "x",
        header: "X",
    },
    {
        accessorKey: "y",
        header: "Y",
    },
    {
        accessorKey: "r",
        header: "R",
    },
    {
        accessorKey: "hit",
        header: "Is Hit",
    },
    {
        accessorKey: "serverTime",
        header: "Server Time",
    },
    {
        accessorKey: "durationInMilliseconds",
        header: "Duration In Milliseconds",
    },
]
