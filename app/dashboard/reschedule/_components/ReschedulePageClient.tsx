"use client"

import { Suspense } from "react";
import { useState } from "react";
import ContentSidebar from "@/components/ContentSidebar";
import StudentEnrolmentsList from "@/app/dashboard/reschedule/_components/StudentEnrolmentsList";
import ContentSidebarHeader from "./ContentSidebarHeader";
import { ClassDetails } from "@/types/enrolment";
import RescheduleMainPanel from "./RescheduleMainPanel";

export default function ReschedulePageClient({ enrolmentsPromise } : { enrolmentsPromise: Promise<ClassDetails[]> }) {
    const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
    return (
        <div className="flex">
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
            <Suspense fallback={<div className="flex-1 items-center justify-center h-32">Loading...</div>}>
                <RescheduleMainPanel 
                    enrolmentsPromise={enrolmentsPromise}
                    selectedIndex={selectedIndex}
                />
            </Suspense>
            
        </div>
    );
}