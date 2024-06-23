"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";



export function SiteHeader() {
    return (
        <div
            className="top-0 h-10 w-full bg-black flex flex-col"
        >
            <div
                className="container relative flex h-14 max-w-screen-2xl items-center justify-between px-4 py-4 sm:h-16"
            >
            </div>
            <Separator className="bg-slate-600" />
        </div >
    );
}
