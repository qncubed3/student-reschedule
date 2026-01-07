"use client"

import { getSubjectClasses, getWeekData } from "@/lib/data/students"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { extractDays, extractMonthYear} from "@/app/utils/time"
import { ClassDetails, WeekDetails } from "@/types/enrolment"
import { motion, AnimatePresence } from "framer-motion"
import { formatDate } from "@/app/utils/format"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { use } from "react"

import SelectedClassCard from "./SelectedClassCard"
import CalendarView from "./CalendarView"

export default function MainPanel({ 
    enrolmentsPromise, selectedIndex 
}: { 
    enrolmentsPromise: Promise<ClassDetails[]>,
    selectedIndex: number | null
}) {

    // States
    const [isWeekDropdownOpen, setWeekDropdownOpen] = useState<boolean>(false)
    const [selectedWeek, setSelectedWeek] = useState<WeekDetails | null>(null)
    const [selectedReschedule, setSelectedReschedule] = useState<ClassDetails | null>(null)

    // Resolve enroments promise
    const enrolments = use(enrolmentsPromise)
    const currentEnrolment =
        selectedIndex !== null && selectedIndex !== undefined
            ? enrolments[selectedIndex]
            : null

    // Get subject id for each enrolment and store in a list
    const subjectId = currentEnrolment?.subject?.id;
    const scheduledClassIds = enrolments.map(enrolments => enrolments.id)
    
    // Fetch academic week data from supabase
    const { 
        data: weekData = [], 
        isLoading: isLoadingWeeks,
        error: weekError
    } = useQuery({
        queryKey: ["academicWeekData"],
        queryFn: getWeekData,
        staleTime: Infinity
    })

    // Fetch class lists for each subject
    const { 
        data: classList = [], 
        isLoading: isLoadingClasses 
    } = useQuery({
        queryKey: ['subjectClasses', subjectId],
        queryFn: () => getSubjectClasses(subjectId!),
        enabled: subjectId != null,
        staleTime: 5 * 60 * 1000,
    });

    // Move to previous week
    const handlePreviousWeek = () => {
        if (!selectedWeek || weekData.length === 0) return;
        
        const currentIndex = weekData.findIndex(week => week.id === selectedWeek.id);
        if (currentIndex > 0) {
            setSelectedWeek(weekData[currentIndex - 1]);
        }
    };

    // Move to next week
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
                                
                                <AnimatePresence>
                                    {isWeekDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-invisibleBackground" onClick={() => setWeekDropdownOpen(false)}/>
                                            <motion.div 
                                                className="z-dropdown absolute left-0 mt-2 w-[19rem] bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {isLoadingWeeks ? (
                                                    <div className="p-4 text-gray-500">Loading weeks...</div>
                                                ) : weekError ? (
                                                    <div className="p-4 text-red-500">Failed to load</div>
                                                ) : (
                                                    weekData.map((week, index) => (
                                                        <motion.button 
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ 
                                                                opacity: { delay: index * 0.005, duration: 0.08 },
                                                                backgroundColor: { duration: 0.15 }
                                                            }}
                                                            key={week.id}
                                                            onClick={() => {
                                                                setSelectedWeek(week);
                                                                setWeekDropdownOpen(false);
                                                            }}
                                                            className={`flex justify-between w-full text-left px-4 py-2 ${
                                                                selectedWeek?.week_number == week.week_number ? "bg-blue-50" : 'text-gray-700'
                                                            }`}
                                                            whileHover={{ 
                                                                backgroundColor: "rgba(191, 219, 254, 0.8)",
                                                            }}
                                                        >
                                                            <span className="font-medium">Week {week.week_number} </span>
                                                            <span className="font-light text-gray-600">{formatDate(week.week_start)} - {formatDate(week.week_end)}</span>
                                                        </motion.button>
                                                    ))
                                                )}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
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
                            classList={isLoadingClasses ? [] : classList} 
                            scheduledClassIds={scheduledClassIds} 
                            daysList={extractDays(selectedWeek)}
                            selectedReschedule={selectedReschedule}
                            setSelectedReschedule={setSelectedReschedule}
                        />
                        {selectedReschedule && <SelectedClassCard
                                classDetails={selectedReschedule}
                            /> 
                        }
                    </div>
                </div>
            )}
        </div>
    )
}