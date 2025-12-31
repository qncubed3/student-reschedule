"use client"

import { EnrolledSubject } from "@/types/enrolment"
import { use } from "react"

export default function RescheduleMainPanel(
    { enrolmentsPromise, selectedIndex }: {
        enrolmentsPromise: Promise<EnrolledSubject[]>,
        selectedIndex: number|null
    }
) {
    const enrolments = use(enrolmentsPromise)

    const currentEnrolment =
        selectedIndex !== null && selectedIndex !== undefined
            ? enrolments[selectedIndex]
            : null

    return (
        <pre>
            {JSON.stringify(currentEnrolment ?? [], null, 4)}
        </pre>
    )
}
