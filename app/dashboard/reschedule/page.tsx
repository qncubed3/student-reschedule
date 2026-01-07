import ReschedulePageClient from "./_components/ReschedulePageClient";
import { getEnrolledClasses } from "@/lib/data/students";
import { cache } from "react";

const getEnrolmentsCached = cache(getEnrolledClasses);

export default function ReschedulePage() {
    const enrolmentsPromise = getEnrolmentsCached();
    return <ReschedulePageClient enrolmentsPromise={enrolmentsPromise} />;
}

// "use client"

// import ContentSidebar from "@/components/ContentSidebar";
// import StudentEnrolmentsList from "@/app/dashboard/reschedule/_components/StudentEnrolmentsList";
// import ContentSidebarHeader from "./_components/ContentSidebarHeader";
// import MainPanel from "./_components/MainPanel";
// import { ClassDetails } from "@/types/enrolment";
// import { Suspense } from "react";
// import { useState } from "react";

// export default function ReschedulePage() {
//     const [selectedIndex, setSelectedIndex] = useState<number|null>(null)
//     return (
//         <div className="flex h-full">
//             <ContentSidebar>
//                 <ContentSidebarHeader/>
//                 <Suspense fallback={<div className="p-6 text-gray-500">Loading enrolments...</div>}>
//                     <StudentEnrolmentsList 
//                         enrolmentsPromise={enrolmentsPromise}
//                         selectedIndex={selectedIndex} 
//                         setSelectedIndex={setSelectedIndex}
//                     />
//                 </Suspense>
//             </ContentSidebar>
//             <Suspense fallback={<div/>}>
//                 <MainPanel 
//                     enrolmentsPromise={enrolmentsPromise}
//                     selectedIndex={selectedIndex}
//                 />
//             </Suspense>
            
//         </div>
//     );
// }