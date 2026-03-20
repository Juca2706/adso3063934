import { PrismaClient } from '@/app/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pencil, Trash2, PlusCircleIcon, GamepadDirectional } from 'lucide-react';

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    })
})

export default async function GamesInfo() {
    const games = await prisma.game.findMany({ include: { console: true } });

    return (
        <div className='w-full min-h-screen p-4 md:p-10'>
            <div className='w-full max-w-[1400px] mx-auto'>
                {/* CABECERA DEL APARTADO */}
                <div className='flex items-center justify-between mb-8 md:mb-12 border-b border-white/5 pb-6'>
                    {/* TITULO DEL APARTADO */}
                    <div className='flex items-center gap-4'>
                        <div className='p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20'>
                            <GamepadDirectional size={32} className='text-purple-500' />
                        </div>

                        <div>
                            <h1 className='text-4xl md:text-5xl font-black text-white tracking-tight'>
                                Games
                            </h1>
                            <p className='text-gray-500 text-[10px] md:text-xs font-bold mt-2 uppercase tracking-[0.2em]'>
                                Store
                            </p>
                        </div>
                    </div>

                    {/* AGREGAR NUEVO JUEGO */}
                    <a
                        href="/games/add"
                        className='group flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 hover:-translate-y-1'
                    >
                        <PlusCircleIcon size={20} className="transition-transform group-hover:rotate-90" />
                        <span className='hidden md:block'>Add New Game</span>
                        <span className='md:hidden'>Add</span>
                    </a>
                </div>

                {/* LISTADO DE JUEGOS */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="group relative w-full overflow-hidden rounded-[2rem] bg-[#1a1d23] shadow-2xl transition-all duration-500 hover:shadow-purple-500/20"
                        >
                            {/* ACCIONES*/}
                            <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-[-10px] md:group-hover:translate-y-0">
                                <a
                                    title="Editar"
                                    className="p-2.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                                >
                                    <Pencil size={18} />
                                </a>
                                <button
                                    title="Eliminar"
                                    className="p-2.5 bg-red-600/40 backdrop-blur-md border border-red-500/50 rounded-full text-white hover:bg-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 shadow-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* PRECIO DEL JUEGO */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-black shadow-xl">
                                    ${game.price}
                                </span>
                            </div>

                            {/* IMAGEN DEL JUEGO */}
                            <figure className="aspect-[3/2] w-full overflow-hidden">
                                <img
                                    src={'imgs/' + game.cover}
                                    alt={game.title}
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </figure>

                            {/* INFORMACIÓN DEL JUEGO */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-lg">
                                        {game.title}
                                    </h2>

                                    <div className="flex items-center gap-x-3 text-xs font-bold text-gray-300">
                                        <span className="text-purple-400 uppercase tracking-widest text-[10px]">
                                            {game.console.name}
                                        </span>
                                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                                        <span className="opacity-80">{game.genre}</span>
                                    </div>

                                    <p className="text-[11px] text-gray-400 font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                                        Developed by <span className="text-white">{game.developer}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}