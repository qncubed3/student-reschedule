"use client"

import ContentSidebar from "@/components/ContentSidebar";
import StudentEnrolmentsList from "@/app/dashboard/reschedule/_components/StudentEnrolmentsList";
import ContentSidebarHeader from "./ContentSidebarHeader";
import MainPanel from "./MainPanel";
import { ClassDetails } from "@/types/enrolment";
import { Suspense } from "react";
import { useState } from "react";

export default function ReschedulePageClient({ enrolmentsPromise } : { enrolmentsPromise: Promise<ClassDetails[]> }) {
    const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
    return (
        <div className="flex h-full">
            <ContentSidebar>
                <ContentSidebarHeader/>
                <Suspense fallback={<div className="p-6 text-gray-500">Loading enrolments...</div>}>
                    <StudentEnrolmentsList 
                        enrolmentsPromise={enrolmentsPromise}
                        selectedIndex={selectedIndex} 
                        setSelectedIndex={setSelectedIndex}
                    />
                </Suspense>
            </ContentSidebar>
            <Suspense fallback={<div/>}>
                <MainPanel 
                    enrolmentsPromise={enrolmentsPromise}
                    selectedIndex={selectedIndex}
                />
            </Suspense>
            
        </div>
    );
}