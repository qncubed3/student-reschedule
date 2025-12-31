"use client"

import type { ClassDetails } from "@/types/enrolment"

type SubjectEnrolledCardProps = {
  enrolment: ClassDetails
  selected?: boolean
  onClick?: () => void
}

export default function SubjectEnrolledCard({ 
    enrolment, 
    selected=false, 
    onClick 
}: SubjectEnrolledCardProps) {
    return (
        <div 
            className={`p-6 shadow-sm cursor-pointer transition-colors ${ 
                selected ? "bg-indigo-100" : ""
            }`}
            onClick={onClick}
        >
            <div className="font-bold">{enrolment?.subject?.name}</div>
            <div className="text-sm text-muted-foreground">{enrolment?.subject?.code}</div>
        </div>
    )
}
