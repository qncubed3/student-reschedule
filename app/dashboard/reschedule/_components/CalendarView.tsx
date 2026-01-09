import type { ClassDetails } from "@/types/enrolment"
import { getTextColorForBackground } from "@/app/utils/style";
import { motion, AnimatePresence } from "framer-motion";
import { capitaliseFirstLetter } from "@/app/utils/format";
import { formatTimeRange } from "@/app/utils/time";
import { daysOfWeekMap } from "@/app/utils/time";
import { getHourLabels } from "@/app/utils/time";
import { modifyAlpha } from "@/app/utils/style";
import { parseTime } from "@/app/utils/time";
import { useState, useEffect } from "react";
import PopupCard from "./PopupCard";

const HOUR_HEIGHT = 32;
const START_TIME = 10;
const END_TIME = 21;

export default function CalendarView({ 
    classList, scheduledClassId, daysList, selectedReschedule, setSelectedReschedule
}: { 
    classList: ClassDetails[], 
    scheduledClassId: number | null, 
    daysList: number[] | null,
    selectedReschedule: ClassDetails | null,
    setSelectedReschedule: React.Dispatch<React.SetStateAction<ClassDetails | null>>
}) {

    // States
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
    const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
    
    // Group list of classes by day
    const hours = getHourLabels(START_TIME, END_TIME)
    const classesByDay: Record<string, ClassDetails[]> = {}
    Object.keys(daysOfWeekMap).forEach((key) => {
        classesByDay[key] = classList.filter(c => c.day_of_week === key)
    })

    // Function to compute class event position on calendar
    const getClassPosition = (classItem: ClassDetails) => {
        const startMinutes = parseTime(classItem.start_time);
        const endMinutes = parseTime(classItem.end_time);
        const top = ((startMinutes / 60) - START_TIME) * HOUR_HEIGHT;
        const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
        return { top, height };
    }

    // Functions for popup card
    const onClickAway = () => {
        setSelectedClass(null);
        setPopupPosition(null);
    }
    const onSelectReschedule = () => {
        setSelectedReschedule(selectedClass)
        setSelectedClass(null)
    }

    // Remove popup on classlist change
    useEffect(() => {
        setPopupPosition(null)
    }, [classList])

    return (
        <div>
            <div className="flex mr-8">

                {/* Time column */}
                <div className="w-20 flex-shrink-0">
                    <div className="h-5"></div>
                        {hours.map((hour, key) => (
                        <div 
                            key={key}
                            className=" border-gray-200 text-[8pt] text-[rgb(68,71,70)] pr-2 text-right py-1"
                            style={{ height: `${HOUR_HEIGHT}px`}}
                            
                        >
                            {hour}
                        </div>
                    ))}
                </div>

                {/* Small space column */}
                <div>
                    <div className="h-8 w-2"></div>
                    {hours.map((hour, key) => (
                        <div
                            key={key}
                            className="border-t"
                            style={{ height: `${HOUR_HEIGHT}px`}}
                        >

                        </div>
                    ))}
                </div>

                {/* Days column */}
                <div className="flex flex-1 w-[50rem]">
                    {Object.keys(daysOfWeekMap).map((day, key) => (
                        <div key={key} className="flex-1 min-w-0">

                            {/* Day and date display */}
                            <div className="h-6 flex items-center justify-center text-[rgb(68,71,70)] text-[9pt] font-medium bg-white">
                                <h2>{daysOfWeekMap[day]}{daysList ? ` ${daysList[key]}` : ""}</h2>
                            </div>
                            <div className="h-2 border-l border-gray-200"></div>
                            <div className="relative">

                                {/* Rows for each hour */}
                                {hours.map((hour, key) => (
                                    <div 
                                        key={key}
                                        className="border-l border-t border-gray-200"
                                        style={{ height: `${HOUR_HEIGHT}px`}}
                                    />
                                ))}

                                {/* Display classes for that day */}
                                <AnimatePresence mode="sync">
                                    {classesByDay[day]?.map((classItem) => {
                                        const {top, height } = getClassPosition(classItem)
                                        const isScheduledClass = scheduledClassId == classItem.id
                                        const backgroundColor = !isScheduledClass
                                                    ? classItem.subject.color ?? "gray"
                                                    : modifyAlpha(classItem.subject.color ?? "gray", 0.5)
                                        const textColor = getTextColorForBackground(backgroundColor as string)
                                        const isSelectedReschedule = classItem === selectedReschedule || (scheduledClassId == classItem.id && selectedReschedule === null)
                                        return (
                                            <motion.div 
                                                key={`${classItem.subject_id}-${classItem.id}`}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setPopupPosition({
                                                        top: rect.top - 25,
                                                        left: rect.left - 331
                                                    });
                                                    setSelectedClass(classItem); 
                                                }}
                                                onDoubleClick={() => setSelectedReschedule(classItem)}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    scale: 1,
                                                    backgroundColor: backgroundColor ?? "grey"
                                                }}
                                                exit={{ opacity: 0, scale: 0.9}}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut"
                                                }}
                                                className={`absolute z-events left-1 right-1 rounded px-1 py-0.5 text-white overflow-hidden cursor-pointer select-none ${
                                                    isSelectedReschedule ? "outline outline-blue-500 outline-2 outline-offset-2" : ""
                                                }`}
                                                whileHover={{ 
                                                    scale: 1.03
                                                }}
                                                whileTap={{ 
                                                    scale: 0.95
                                                }}
                                                style={{
                                                    top: `${top}px`,
                                                    height: `${height}px`,
                                                }}
                                            >
                                                {isScheduledClass && (
                                                    <div 
                                                        className="absolute inset-0"
                                                        style={{
                                                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.15) 6px, rgba(255,255,255,0.15) 12px)',
                                                        }}
                                                    />
                                                )}
                                                <div className={`font-medium text-[9pt] text-${textColor}`}>{classItem.subject.code}</div>
                                                <div className={`text-[9pt] italic font-normal text-${textColor}`}>({capitaliseFirstLetter(classItem.class_type)})</div>
                                                <div className={`text-[9pt] text-${textColor}`}>{formatTimeRange(classItem.start_time, classItem.end_time)}</div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>                            
                        </div>
                    ))}
                </div>

                {/* Display popup card */}
                <PopupCard 
                    classDetails={selectedClass} 
                    onClickAway={onClickAway}
                    onSelectReschedule={onSelectReschedule}
                    popupPosition={popupPosition}
                />
            </div>
        </div>
    )
}