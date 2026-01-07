import { ClipboardList } from "lucide-react";

export default function ContentSidebarHeader() {
    return (
        <div className="p-6 overflow-hidden transition-all relative shrink-0 border-b z-sidebar">
            <div className="flex items-center gap-4 ">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(0,88,200,0.2)] text-brand-blue">
                    <ClipboardList className="h-5 w-5 stroke-[2.2] text-[rgb(0,88,200)]" />
                </div>
                <div className="flex flex-col space-y-0">
                    <h1 className="text-[22px] font-bold text-[rgb(35,51,92)]">Your Enrolments</h1>
                    <p className="text-[14px] font-normal text-[rgb(112,128,166)]">Select a class to request or view a reschedule</p>
                </div>
            </div>
        </div>
    )
}