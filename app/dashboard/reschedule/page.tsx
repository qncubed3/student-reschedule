import ReschedulePageClient from "./_components/ReschedulePageClient";
import { getEnrolledSubjects } from "@/lib/data/students";
import { cache } from "react";

const getEnrolmentsCached = cache(getEnrolledSubjects);

export default function ReschedulePage() {
    const enrolmentsPromise = getEnrolmentsCached();
    return <ReschedulePageClient enrolmentsPromise={enrolmentsPromise} />;
}