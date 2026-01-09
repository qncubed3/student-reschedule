import { ClassDetails, WeekDetails } from "@/types/enrolment"

export default function SelectedClassCard({
    fromClassDetails, toClassDetails, week
}: {
    fromClassDetails: ClassDetails,
    toClassDetails: ClassDetails,
    week: WeekDetails | null
}) {
    return (
        <div className="w-full p-4 border border-black rounded-lg">
            <div>
                <div>
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