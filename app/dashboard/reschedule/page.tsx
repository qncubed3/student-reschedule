import ReschedulePageClient from "./_components/ReschedulePageClient";
import { getEnrolledClasses } from "@/lib/data/students";
import { cache } from "react";

const getEnrolmentsCached = cache(getEnrolledClasses);

export default function ReschedulePage() {
    const enrolmentsPromise = getEnrolmentsCached();
    return <ReschedulePageClient enrolmentsPromise={enrolmentsPromise} />;
}