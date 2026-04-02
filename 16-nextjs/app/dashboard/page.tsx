import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/layout/SideBar";
import DashboardInfo from "@/components/dashboard/DashboardInfo";
import { prisma } from "@/prisma";

export default async function DashboardPage() {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect('/');
    }

    // Obtenemos los conteos directamente de la base de datos Neon DB
    const [totalGames, totalConsoles] = await Promise.all([
        prisma.game.count(),
        prisma.console.count()
    ]);

    return (
        <SideBar currentPath={"/dashboard"}>
            <DashboardInfo
                totalGames={totalGames}
                totalConsoles={totalConsoles}
            />
        </SideBar>
    );
}