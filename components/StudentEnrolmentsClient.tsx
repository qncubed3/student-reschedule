"use client"

import SubjectEnrolledCard from "./SubjectEnrolledCard";
import { StudentEnrolmentsClientProps } from "@/types/enrolment";
import { Enrolment } from "@/types/enrolment";
import { useState } from "react";

export default function StudentEnrolmentsClient({ enrolments }: StudentEnrolmentsClientProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    return (
        <div>
            
            {/* <pre>{JSON.stringify(enrolments, null, 2)}</pre> */}

            {enrolments?.map((enrolment: Enrolment, index: number) => (
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