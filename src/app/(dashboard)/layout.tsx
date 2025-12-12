import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
