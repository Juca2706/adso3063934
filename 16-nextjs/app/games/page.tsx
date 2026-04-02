// archivo page.tsx
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/layout/SideBar";
import GamesInfo from "@/components/games/GamesInfo";

// 1. Agregamos searchParams a los argumentos de la función
export default async function GamesPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string }>
}) {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect('/');
    }

    // 2. Esperamos los parámetros para usarlos en la "key"
    const params = await searchParams;

    return (
        <SideBar currentPath={"/games"}>
            {/* 3. PASAMOS LOS PARÁMETROS Y LA KEY */}
            <GamesInfo
                key={params.query || 'default'}
                searchParams={searchParams}
            />
        </SideBar>
    );
}