import { AnimatePresence, motion } from "framer-motion";
import { capitaliseFirstLetter } from "@/app/utils/format";
import { formatTimeRange } from "@/app/utils/time";
import { ClassDetails } from "@/types/enrolment";

export default function PopupCard({ 
    classDetails, onClickAway, onSelectReschedule, popupPosition
}: {
    classDetails: ClassDetails | null,
    onClickAway: () => void,
    onSelectReschedule: () => void,
    popupPosition: { top: number; left: number } | null
}) {
    return (
        <AnimatePresence>
            {classDetails && popupPosition && (
                <>

                    {/* Invisible backdrop to close popup */}
                    <div 
                        className="fixed inset-0 z-30"
                        onClick={onClickAway}
                    />

                    {/* The actual card */}
                    <motion.div
                        key="class-popup"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className="fixed w-[20.2rem] bg-gray-100 z-popupCard rounded-3xl shadow-2xl ring-1 ring-black/5 border border-gray-200 transition-all duration-300"
                        style={{
                            top: `${popupPosition.top}px`,
                            left: `${popupPosition.left}px`
                        }}
                    >

                        {/* Card heading */}
                        <div 
                            className="px-6 pt-6 pb-4"
                        >
                            <h2 className="text-lg font-medium">{classDetails.subject.name} ({capitaliseFirstLetter(classDetails.class_type)})</h2>
                        </div>

                        {/* Card body */}
                        <div className="px-6 space-y-3">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-light text-gray-700">{classDetails.day_of_week}, {formatTimeRange(classDetails.start_time, classDetails.end_time)}</p>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-sm font-light text-gray-700">{classDetails.room?.campus.name ?? "Error"} Campus, Room {classDetails.room?.room_number ?? "None"}</p>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <p className="text-sm font-light text-gray-700">Tutor: {classDetails.tutor.first_name} {classDetails.tutor.last_name}</p>
                            </div>                            
                        </div>

                        {/* Reschedule button */}
                        <div className="p-4">
                            <button                                                              
                                className={`ml-auto flex px-4 py-1.5 bg-blue-500 rounded-full text-white text-[10pt] hover:bg-blue-400 transition-all duration-300 shadow-lg`}
                                onClick={onSelectReschedule}
                            >
                                Select
                            </button>
                        </div>
                        
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}