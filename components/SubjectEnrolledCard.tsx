import { SubjectEnrolledCardProps } from "@/types/enrolment"

export default function SubjectEnrolledCard({ enrolment, selected=false, onClick }: SubjectEnrolledCardProps) {
    return (
        <div 
            className={`p-6 shadow-sm cursor-pointer transition-colors ${ selected ? "bg-indigo-100" : ""}`}
            onClick={onClick}
        >
            {/* {JSON.stringify(enrolment.classes)} */}
            <div className="font-bold">{enrolment.classes.subjects.name}</div>
            <div className="text-sm text-muted-foreground">{enrolment.classes.subjects.code}</div>
        </div>
    )
}
