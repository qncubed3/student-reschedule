"use client"

import { use } from "react"
import { getSubjectClasses, getWeekData } from "@/lib/data/students"
import { ClassDetails, WeekDetails } from "@/types/enrolment"
import { useState, useEffect } from "react"
import CalendarView from "./CalendarView"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { formatDate } from "@/app/utils/format"
import { useQuery } from "@tanstack/react-query"
import { extractDays, extractMonthYear} from "@/app/utils/time"

export default function MainPanel(
    { enrolmentsPromise, selectedIndex }: {
        enrolmentsPromise: Promise<ClassDetails[]>,
        selectedIndex: number|null
    }
) {

    const [isWeekDropdownOpen, setWeekDropdownOpen] = useState<boolean>(false)
    const [selectedWeek, setSelectedWeek] = useState<WeekDetails | null>(null)
    const [weekData, setWeekData] = useState<WeekDetails[]>([])

    const enrolments = use(enrolmentsPromise)
    const currentEnrolment =
        selectedIndex !== null && selectedIndex !== undefined
            ? enrolments[selectedIndex]
            : null

    const subjectId = currentEnrolment?.subject?.id;
    const scheduledClassIds = enrolments.map(enrolments => enrolments.id)
    
    // Fetch academic week data from supabase
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

    const { data: classList = [], isLoading } = useQuery({
        queryKey: ['subjectClasses', subjectId],
        queryFn: () => getSubjectClasses(subjectId!),
        enabled: subjectId != null,
        staleTime: 5 * 60 * 1000,
    });

    const handlePreviousWeek = () => {
        if (!selectedWeek || weekData.length === 0) return;
        
        const currentIndex = weekData.findIndex(week => week.id === selectedWeek.id);
        if (currentIndex > 0) {
            setSelectedWeek(weekData[currentIndex - 1]);
        }
    };

    // Navigate to next week
    const handleNextWeek = () => {
        if (!selectedWeek || weekData.length === 0) return;
        
        const currentIndex = weekData.findIndex(week => week.id === selectedWeek.id);
        if (currentIndex < weekData.length - 1) {
            setSelectedWeek(weekData[currentIndex + 1]);
        }
    };

    // Get current week index for UI feedback
    const currentWeekIndex = selectedWeek 
        ? weekData.findIndex(week => week.id === selectedWeek.id)
        : -1;
    const isFirstWeek = currentWeekIndex === 0;
    const isLastWeek = currentWeekIndex === weekData.length - 1;

    return (
        <div className="flex items-center justify-center w-full">
            {selectedIndex !== null && (
                <div className="bg-white rounded-2xl shadow-xl animate-in fade-in duration-300">
                    <div className="p-8">
                        <h1 className="font-bold text-[22pt] text-[rgb(35,51,92)]">Reschedule your class</h1>

                        {/* Controls row */}
                        <div className="flex items-center gap-4 my-4">

                            {/* Week selection */}
                            <div className="relative">
                                <button
                                    onClick={() => setWeekDropdownOpen(!isWeekDropdownOpen)}
                                    className={`flex items-center justify-between px-4 py-1.5 bg-blue-500 rounded-full text-white text-[10pt] hover:bg-blue-400 transition-all duration-300 shadow-lg ${
                                        selectedWeek ? "w-[7rem]" : "w-[8.5rem]"
                                    }`}
                                >
                                    {selectedWeek ? `Week ${selectedWeek.week_number}` : "Select Week"}
                                    <ChevronDown
                                        className={`h-5 w-5 text-white transition-transform duration-200 ${
                                            isWeekDropdownOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                    />
                                </button>

                                {isWeekDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-100" onClick={() => setWeekDropdownOpen(false)}/>
                                        <div className="absolute left-0 mt-2 w-[19rem] bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                                            {weekData.map((week) => (
                                                <button 
                                                    key={week.id}
                                                    onClick={() => {
                                                        setSelectedWeek(week);
                                                        setWeekDropdownOpen(false);
                                                    }}
                                                    className={`flex justify-between w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                                                        selectedWeek?.week_number == week.week_number ? "bg-blue-50" : 'text-gray-700'
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
                            <button
                                onClick={handlePreviousWeek}
                                disabled={!selectedWeek || isFirstWeek}
                                className={`p-1 rounded-full transition-colors ${
                                    !selectedWeek || isFirstWeek
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                }`}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            
                            <button
                                onClick={handleNextWeek}
                                disabled={!selectedWeek || isLastWeek}
                                className={`p-1 rounded-full transition-colors ${
                                    !selectedWeek || isLastWeek
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                                }`}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                            <div className="text-[14pt] font-light text-gray-600">
                                {extractMonthYear(selectedWeek)}
                            </div>
                        </div>
                        <CalendarView 
                            classList={isLoading ? [] : classList} 
                            scheduledClassIds={scheduledClassIds} 
                            daysList={extractDays(selectedWeek)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}