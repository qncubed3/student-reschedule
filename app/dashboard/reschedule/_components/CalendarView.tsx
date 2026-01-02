import type { ClassDetails } from "@/types/enrolment"
import { getHourLabels } from "@/app/utils/time"
import { daysOfWeekMap } from "@/app/utils/time";
import { parseTime } from "@/app/utils/time";
import { motion, AnimatePresence } from "framer-motion";
import { capitaliseFirstLetter } from "@/app/utils/format";
import { formatTimeRange } from "@/app/utils/time";
import { modifyAlpha } from "@/app/utils/style";

const HOUR_HEIGHT = 40;
const START_TIME = 10;
const END_TIME = 21;

export default function CalendarView({ classList, scheduledClassId }: { classList: ClassDetails[], scheduledClassId: number | null }) {
    
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
                                <h2>{daysOfWeekMap[day]}</h2>
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
                                        const isScheduledClass = classItem.id === scheduledClassId
                                        const backgroundColor =
                                            scheduledClassId === null
                                                ? classItem.subject.color ?? "gray"
                                                : !isScheduledClass
                                                    ? classItem.subject.color ?? "gray"
                                                    : modifyAlpha(classItem.subject.color ?? "gray", 0.3)
                                        return (
                                            <motion.div 
                                                key={`${classItem.subject_id}-${classItem.id}`}
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
                                                className={`absolute left-1 right-1 rounded px-1 py-0.5 text-white overflow-hidden cursor-pointer hover:opacity-90 ${
                                                    isScheduledClass ? "outline outline-blue-500 outline-2 outline-offset-2" : ""
                                                }`}
                                                style={{
                                                    top: `${top}px`,
                                                    height: `${height}px`,
                                                }}
                                            >
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
                
            </div>
        </div>
    )
}