// Define a single interface for the card props
export interface SubjectEnrolledCardProps {
    subjectName: string;
    subjectCode: string;
}

// Component using that interface
export default function SubjectEnrolledCard({ subjectName, subjectCode }: SubjectEnrolledCardProps) {
    return (
        <div className="p-6 shadow-sm">
            <div className="font-bold">{subjectName}</div>
            <div className="text-sm text-muted-foreground">{subjectCode}</div>
        </div>
    )
}
