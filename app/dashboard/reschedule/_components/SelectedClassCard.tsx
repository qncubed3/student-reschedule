import { ClassDetails } from "@/types/enrolment"

export default function SelectedClassCard({
    classDetails
}: {
    classDetails: ClassDetails
}) {
    return (
        <div className="w-full p-4 border border-black rounded-lg">
            <div>
                <div>
                    {classDetails.name}
                </div>
                <div className="flex">
                    <div>
                        Reschedule from:
                    </div>
                    <div>
                        Reschedule to:
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div>
                    Request Reschedule
                </div>
                <div>
                    Cancel
                </div>
            </div>
        </div>
    )
}