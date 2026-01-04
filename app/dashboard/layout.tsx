// app/protected/layout.tsx
import Header from "@/components/Header";

export default function DashboardLayout({
    children,
 }: {
    children: React.ReactNode;
}) {
    return ( 
        <div className="flex flex-col h-screen bg-gray-50 ">
            <Header />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
