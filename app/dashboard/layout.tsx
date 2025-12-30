// app/protected/layout.tsx
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            
            <div className="bg-gray-50 min-h-screen">
                <Header />
                <main>{children}</main>
            </div>
        </>
    );
}
