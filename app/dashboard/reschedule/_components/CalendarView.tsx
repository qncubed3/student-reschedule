import type { ClassDetails } from "@/types/enrolment"
import { getHourLabels } from "@/app/utils/time"
import { daysOfWeekMap } from "@/app/utils/time";
import { parseTime } from "@/app/utils/time";
import { motion, AnimatePresence } from "framer-motion";
import { capitaliseFirstLetter } from "@/app/utils/format";
import { formatTimeRange } from "@/app/utils/time";
import { modifyAlpha } from "@/app/utils/style";
import React, { useState } from "react";

const HOUR_HEIGHT = 35;
const START_TIME = 10;
const END_TIME = 21;

export default function CalendarView({ 
    classList, scheduledClassIds, daysList
}: { 
    classList: ClassDetails[], scheduledClassIds: number[], daysList: number[] | null
}) {

    const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);

    const [selectedReschedule, setSelectedReshcedule] = useState<ClassDetails | null>(null)

    const hours = getHourLabels(START_TIME, END_TIME)
    const classesByDay: Record<string, ClassDetails[]> = {}
    Object.keys(daysOfWeekMap).forEach((key) => {
        classesByDay[key] = classList.filter(c => c.day_of_week === key)
    })
    const getClassPosition = (classItem: ClassDetails) => {
        const startMinutes = parseTime(classItem.start_time);
        const endMinutes = parseTime(classItem.end_time);
        const top = ((startMinutes / 60) - START_TIME) * HOUR_HEIGHT;
        const height = ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;
        return { top, height };
    }

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
                            <div className="h-6 flex items-center justify-center text-[rgb(68,71,70)] text-[9pt] font-medium bg-white">
                                <h2>{daysOfWeekMap[day]}{daysList ? ` ${daysList[key]}` : ""}</h2>
                            </div>
                            <div className="h-2 border-l border-gray-200"></div>
                            <div className="relative">
                                {hours.map((hour, key) => (
                                    <div 
                                        key={key}
                                        className="border-l border-t border-gray-200"
                                        style={{ height: `${HOUR_HEIGHT}px`}}
                                    />
                                ))}
                                <AnimatePresence mode="sync">
                                    {classesByDay[day]?.map((classItem) => {
                                        const {top, height } = getClassPosition(classItem)
                                        const isScheduledClass = scheduledClassIds.includes(classItem.id)
                                        const backgroundColor = !isScheduledClass
                                                    ? classItem.subject.color ?? "gray"
                                                    : modifyAlpha(classItem.subject.color ?? "gray", 0.5)
                                        const isSelectedReschedule = classItem === selectedReschedule || (scheduledClassIds.includes(classItem.id) && selectedReschedule === null)
                                        return (
                                            <motion.div 
                                                key={`${classItem.subject_id}-${classItem.id}`}
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setPopupPosition({
                                                        top: rect.top,
                                                        left: rect.left - 330
                                                    });
                                                    setSelectedClass(classItem); 
                                                }}
                                                onDoubleClick={() => setSelectedReshcedule(classItem)}
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
                                                className={`absolute left-1 right-1 rounded px-1 py-0.5 text-white overflow-hidden cursor-pointer z-40 select-none ${
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
                                                <div className="font-medium text-[9pt]">{classItem.subject.code}</div>
                                                <div className="text-[9pt] italic font-normal">({capitaliseFirstLetter(classItem.class_type)})</div>
                                                <div className="text-[9pt]">{formatTimeRange(classItem.start_time, classItem.end_time)}</div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>
                {selectedClass && popupPosition && (
                    <>
                        {/* Invisible backdrop to close popup */}
                        <div 
                            className="fixed inset-0 z-30"
                            onClick={() => {
                                setSelectedClass(null);
                                setPopupPosition(null);
                            }}
                        />
                        <div
                            className="fixed z-50 bg-white rounded-lg shadow-2xl w-80 border border-gray-200"
                            style={{
                                top: `${popupPosition.top}px`,
                                left: `${popupPosition.left}px`
                            }}
                        >
                            <div 
                                className="p-4 rounded-t-lg text-white"
                                style={{ backgroundColor: selectedClass.subject.color ?? "gray" }}
                            >
                                <h2 className="text-lg font-bold">{selectedClass.subject.name}</h2>
                                <h3 className="text-md font-normal">({capitaliseFirstLetter(selectedClass.class_type)})</h3>
                            </div>
                            
                            <div className="p-4 space-y-3">
                                <div className="flex items-start">
                                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="font-medium">{selectedClass.day_of_week}</p>
                                    <p className="text-sm text-gray-600">
                                    {parseTime(selectedClass.start_time)} - {parseTime(selectedClass.end_time)}
                                    </p>
                                </div>
                                </div>

                                <div className="flex items-start">
                                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div>
                                    <p className="font-medium">{selectedClass.tutor.first_name} {selectedClass.tutor.last_name}</p>
                                    <p className="text-sm text-gray-600">{selectedClass.tutor.email}</p>
                                    <p className="text-sm text-gray-600">{selectedClass.tutor.phone}</p>
                                </div>
                                </div>

                                <div className="flex items-start">
                                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <p className="font-medium">{selectedClass.room?.campus.name ?? "None"}</p>
                                    <p className="text-sm text-gray-600">Room {selectedClass.room?.room_number ?? "None"}</p>
                                </div>
                                </div>

                                <div className="flex items-start">
                                <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                <div>
                                    <p className="font-medium">{selectedClass.name}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}