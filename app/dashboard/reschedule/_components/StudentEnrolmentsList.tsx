"use client"

import { use } from "react";
import SubjectEnrolledCard from "./SubjectEnrolledCard";
import { ClassDetails } from "@/types/enrolment";

export default function StudentEnrolmentsList(
    { enrolmentsPromise, selectedIndex, setSelectedIndex }: { 
        enrolmentsPromise: Promise<ClassDetails[]>, 
        selectedIndex: number | null, 
        setSelectedIndex: React.Dispatch<React.SetStateAction<number|null>>
    }
) {
    const enrolments = use(enrolmentsPromise)
    if (!enrolments) return <div>Loading enrolments...</div>;
    if (enrolments.length === 0) return <div>No enrolments found</div>;
    console.log(JSON.stringify(enrolments, null, 4))
    return (
        <div>
            {enrolments.map((enrolment, index) => (
                <SubjectEnrolledCard 
                    enrolment={enrolment}
                    selected={selectedIndex == index}
                    onClick={() => selectedIndex == index ? setSelectedIndex(null) : setSelectedIndex(index)}
                    key={index}
                />
            ))}
        </div>
    );
}
