// app/protected/layout.tsx
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
            <div className="bg-gray-50 min-h-screen">
                <main>{children}</main>
            </div>
        </>
    );
}
