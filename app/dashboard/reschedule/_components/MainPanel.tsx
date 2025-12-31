"use client"

import { use } from "react"
import { getSubjectClasses } from "@/lib/data/students"
import { ClassDetails } from "@/types/enrolment"
import { useState, useEffect } from "react"

export default function MainPanel(
    { enrolmentsPromise, selectedIndex }: {
        enrolmentsPromise: Promise<ClassDetails[]>,
        selectedIndex: number|null
    }
) {

    const [classList, setClassList] = useState<ClassDetails[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    const enrolments = use(enrolmentsPromise)
    const currentEnrolment =
        selectedIndex !== null && selectedIndex !== undefined
            ? enrolments[selectedIndex]
            : null

    const subjectId = currentEnrolment?.subject?.id;

    
    useEffect(() => {
        (async () => {
            try {
                if (subjectId == null) { 
                    setClassList([])
                } else {
                    const newClassList = await getSubjectClasses(subjectId)
                    setClassList(newClassList)
                }
            } catch (error) {
                console.error(error)
                setClassList([])
            } finally {
                setLoading(false)
            }
        })()
    }, [subjectId])

    if (isLoading) return <div>Loading classes...</div>

    return (
        <>
            <div>Subject ID: {subjectId}</div>
            <pre>
                {JSON.stringify(currentEnrolment ?? [], null, 4)}
            </pre>
            <pre>
                {JSON.stringify(classList, null, 4)}
            </pre>
        </>   
    )
}