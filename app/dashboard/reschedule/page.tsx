import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { getEnrolledSubjects, getStudentEnrolments } from "@/lib/data/students";
import ContentSidebar from "@/components/ContentSidebar";
import SubjectEnrolledCard from "@/components/SubjectEnrolledCard";
import { SubjectEnrolledData } from "@/components/SubjectEnrolledCard";
import { ClipboardList } from "lucide-react";


async function StudentsList() {
    const supabase = await createClient();
    const { data: students, error } = await supabase
        .from("students")
        .select("*");
    
    if (error) {
        console.log("Error: ", error.message);
        return <div>Error loading students: {error.message}</div>;
    }

    return (
        <pre>
            {JSON.stringify(students, null, 2)}
        </pre>
    );
}

async function StudentEnrolments() {
    const enrolments = await getEnrolledSubjects();

    return (
        <div>
            <div className="p-6 overflow-hidden transition-all relative shrink-0 border-b">
                
                <div className="flex items-center gap-4 ">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(0,88,200,0.2)] text-brand-blue">
                        <ClipboardList className="h-5 w-5 stroke-[2.2] text-[rgb(0,88,200)]" />
                    </div>

                    <div className="flex flex-col space-y-0">
                        <h1 className="text-[22px] font-bold text-[rgb(35,51,92)]">Your Enrolments</h1>
                        <p className="text-[14px] font-normal text-[rgb(112,128,166)]">Select a class to reschedule</p>
                    </div>
                </div>

            </div>
            {/* <pre>{JSON.stringify(enrolments, null, 2)}</pre> */}

            {enrolments?.map((enrolment, index) => (
                <SubjectEnrolledCard
                    key={index}
                    subjectName={enrolment.classes.subjects.name}
                    subjectCode={enrolment.classes.subjects.code}
                />
            ))}


        </div>
    );
}


export default function ReschedulePage() {
    return (
        <div className="flex">
            <ContentSidebar>
                <Suspense fallback={<div>Loading enrolments...</div>}>
                    <StudentEnrolments />
                </Suspense>
            </ContentSidebar>
            <Suspense fallback={<div>Loading students...</div>}>
                <StudentsList />
            </Suspense>
            
        </div>
    );
}