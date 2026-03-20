import { PrismaClient } from '@/app/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PlusCircleIcon, Monitor } from 'lucide-react';
import ConsoleCard from './ConsoleCard';

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    })
})

export default async function ConsolesInfo() {
    // Aquí traemos las consolas de tu BD
    const consoles = await prisma.console.findMany();

    return (
        <div className='w-full min-h-screen p-4 md:p-10'>
            <div className='w-full max-w-[1400px] mx-auto'>
                {/* CABECERA DEL APARTADO */}
                <div className='flex items-center justify-between mb-8 md:mb-12 border-b border-white/5 pb-6'>
                    {/* TITULO DEL APARTADO */}
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20'>
                            <Monitor size={32} className='text-purple-500' />
                        </div>

                        <div>
                            <h1 className='text-5xl font-black text-white tracking-tighter'>
                                Consoles
                            </h1>
                            <p className='text-blue-500/60 text-xs font-black mt-1 uppercase tracking-[0.3em]'>
                                Store
                            </p>
                        </div>
                    </div>

                    {/* AGREGAR NUEVA CONSOLA */}
                    <a
                        href="/consoles/add"
                        className='group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 hover:-translate-y-1'
                    >
                        <PlusCircleIcon size={20} className="transition-transform group-hover:rotate-90" />
                        <span className='hidden md:block'>Add New Console</span>
                        <span className='md:hidden'>Add</span>
                    </a>
                </div>


                {/* LISTADO */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {consoles.map((item: any) => (
                        <ConsoleCard key={item.id} console={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}