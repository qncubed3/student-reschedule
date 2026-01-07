export default function ContentSidebar( { children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card relative z-sidebar shrink-0 overflow-hidden w-[384px] h-full shadow">
            {children}
        </div>
    )
}
