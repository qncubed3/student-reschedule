import { Suspense } from "react";
import QuickLinkHeader from "@/components/QuickLinkHeader";
import QuickLinkCard from "@/components/QuickLinkCard";
import DateDisplay from "@/components/ui/DateDisplay";

export default function DashboardPage() {

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div>
        <h4 className="text-[22px] font-bold text-[rgb(35,51,92)]">
          Welcome back, 
          <span> name</span>
        </h4>
        <div className="text-[14px] text-[rgb(112,128,153)]">
          <DateDisplay/>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl mt-6">
        <QuickLinkHeader/>
        {/* Cards */}
        <div className="p-6 space-y-4">
          <div className="grid w-full auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Book Trial */}
            <div className="col-span-2 row-span-2">
              <QuickLinkCard
                href="#"
                title="Book Trial"
                subtitle="Schedule a free trial session"
                colorClass="bg-[rgb(255,167,55)]"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white"
                    aria-hidden
                  >
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  </svg>
                }
              />
            </div>

            {/* Reschedule Class */}
            <div className="col-span-2 row-span-2">
              <QuickLinkCard
                href="dashboard/reschedule"
                title="Reschedule Class"
                subtitle="Change your upcoming lesson time"
                colorClass="bg-[rgb(0,88,200)]"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* User details */}
        {/* <div className="p-6 space-y-4">
          <Suspense
            fallback={
              <p className="text-sm text-gray-500">
                Loading user details…
              </p>
            }
          >
            <UserDetails />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}
