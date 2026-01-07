"use client"

import type { ClassDetails } from "@/types/enrolment"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { capitaliseFirstLetter, formatTime } from "@/app/utils/format"
import { modifyAlpha } from "@/app/utils/style"

export default function SubjectEnrolledCard({ 
    enrolment, 
    selected=false, 
    onClick 
}: {
  enrolment: ClassDetails
  selected?: boolean
  onClick?: () => void
}) {
    const subjectCodeSplit = enrolment?.subject?.code?.split("-") ?? []
    const subjectColor = enrolment?.subject?.color
    const subjectColorLightened = modifyAlpha(subjectColor, 0.05)
    const [isHover, setHover] = useState(false)
    return (
        <div
            className={"pl-6 pr-4 py-4 overflow-hidden transition-colors relative shrink-0 cursor-pointer"}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="flex items-center justify-between">

                {/* Circle with subject code */}
                <div className="flex items-center gap-4">
                    <div 
                        className={"flex flex-col h-10 w-10 items-center justify-center rounded-full"}
                        style={{ 
                            backgroundColor: subjectColorLightened ?? undefined,
                        }}
                    >
                        <div 
                            className="text-[12px] font-bold text-white font-mono"
                            style={{
                                color: subjectColor ?? undefined
                            }}
                        >
                            {subjectCodeSplit[1]}
                        </div>
                    </div>
                    
                    {/* Subject title */}

                    <div className="flex flex-col space-y-0">
                        <h5 className={`text-[16px] text-[rgb(35,51,92)] transition-all duration-500 ${
                            selected ? "font-semibold text-black" : "font-medium"
                        }`}>
                            {enrolment?.subject?.name}
                        </h5>
                        <p className="text-[14px] font-normal text-[rgb(147,162,199)]">
                            {capitaliseFirstLetter(enrolment?.class_type)}
                        </p>
                    </div>
                </div>

                {/* Chevron */}
                <div className={`rounded-full h-6 w-6 flex items-center justify-center transition-all duration-300 ${
                    isHover ? "bg-gray-100" : ""
                }`}>
                    <ChevronDown
                        className={`h-5 w-5 text-[rgb(112,128,153)] transition-transform duration-200 ${
                            selected ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </div>
                

            </div>
            {/* Expandable content */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                selected ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
                }`}
            >
                <div className="pl-[56px] py-1 text-sm text-gray-500 space-y-1">
                    <p className="italic">
                        <span className="font-medium text-gray-600">Tutor: </span>{enrolment.tutor?.first_name} {enrolment.tutor?.last_name}
                    </p>
                    <p className="italic">
                        <span className="font-medium text-gray-600">Location: </span>{enrolment.room?.campus.name}, Room {enrolment.room?.room_number}
                    </p>
                    <p className="italic">
                        <span className="font-medium text-gray-600">Schedule: </span>{enrolment.day_of_week}, {formatTime(enrolment.start_time)} - {formatTime(enrolment.end_time)}
                    </p>
                </div>
            </div>
        </div>
    )
}
