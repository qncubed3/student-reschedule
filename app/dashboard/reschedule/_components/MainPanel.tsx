"use client"

import { use } from "react"
import { getSubjectClasses, getWeekData } from "@/lib/data/students"
import { ClassDetails, WeekDetails } from "@/types/enrolment"
import { useState, useEffect } from "react"
import CalendarView from "./CalendarView"
import { ChevronDown } from "lucide-react"
import { formatDate } from "@/app/utils/format"

export default function MainPanel(
    { enrolmentsPromise, selectedIndex }: {
        enrolmentsPromise: Promise<ClassDetails[]>,
        selectedIndex: number|null
    }
) {

    const [classList, setClassList] = useState<ClassDetails[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isWeekDropdownOpen, setWeekDropdownOpen] = useState<boolean>(false)
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
    const [weekData, setWeekData] = useState<WeekDetails[]>([])

    const enrolments = use(enrolmentsPromise)
    const currentEnrolment =
        selectedIndex !== null && selectedIndex !== undefined
            ? enrolments[selectedIndex]
            : null

    const subjectId = currentEnrolment?.subject?.id;
    const classId = currentEnrolment?.id ?? null;
    
    useEffect(() => {
        (async () => {
            try {
                const collectedWeekData = await getWeekData()
                setWeekData(collectedWeekData)
                console.log(JSON.stringify(weekData, null, 4))
            } catch (error) {
                console.log(error)
                setWeekData([])
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if (subjectId == null) { 
                    setClassList([])
                } else {
                    const collectedClassList = await getSubjectClasses(subjectId)
                    setClassList(collectedClassList)
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

    // return (
    //     <>
    //         <pre>
    //             {JSON.stringify(classList, null, 4)}
    //         </pre>
    //     </>   
    // )
    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white rounded-2xl shadow-xl">
                <div className="p-8">
                    <h1 className="font-bold text-[22pt] text-[rgb(35,51,92)]">Reschedule your class</h1>

                    {/* Controls row */}
                    <div className="flex items-center justify-between my-4">

                        {/* Week selection */}
                        <div className="relative">
                            <button
                                onClick={() => setWeekDropdownOpen(!isWeekDropdownOpen)}
                                className={`flex items-center justify-between px-4 py-1.5 bg-blue-500 rounded-full text-white text-[10pt] hover:bg-blue-400 transition-all duration-300 shadow-lg ${
                                    selectedWeek ? "w-[7rem]" : "w-[8.5rem]"
                                }`}
                            >
                                {selectedWeek ? `Week ${selectedWeek}` : "Select Week"}
                                <ChevronDown
                                    className={`h-5 w-5 text-white transition-transform duration-200 ${
                                        isWeekDropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                />
                            </button>

                            {isWeekDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setWeekDropdownOpen(false)}/>
                                    <div className="absolute left-0 mt-2 w-[19rem] bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                                        {weekData.map((week) => (
                                            <button 
                                                key={week.id}
                                                onClick={() => {
                                                    setSelectedWeek(week.week_number);
                                                    setWeekDropdownOpen(false);
                                                }}
                                                className={`flex justify-between w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                                                    selectedWeek == week.week_number ? "bg-blue-50" : 'text-gray-700'
                                                }`}
                                            >
                                                <span className="font-medium">Week {week.week_number} </span>
                                                <span className="font-light text-gray-600">{formatDate(week.week_start)} - {formatDate(week.week_end)}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <CalendarView classList={classList} scheduledClassId={classId} />
                </div>
            </div>
        </div>
    )
}