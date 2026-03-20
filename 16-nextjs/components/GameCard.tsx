"use client";
import { Pencil, Trash2, Info, Calendar, Notebook, CodeXml } from 'lucide-react';

export default function GameCard({ game }: { game: any }) {
    // Función para abrir el modal de DaisyUI
    const openModal = () => {
        const modal = document.getElementById(`modal_${game.id}`) as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    return (
        <div className="group relative w-full overflow-hidden rounded-[2rem] bg-[#1a1d23] shadow-2xl transition-all duration-500 hover:shadow-purple-500/20">

            {/* BOTONES DE ACCIÓN (Tu diseño original) */}
            <div className="absolute top-4 left-4 z-20 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-[-10px] md:group-hover:translate-y-0">
                <a title="Editar" className="p-2.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg cursor-pointer">
                    <Pencil size={18} />
                </a>

                {/* BOTÓN DE INFO (Nuevo, manteniendo tu estilo de botón circular) */}
                <button
                    onClick={openModal}
                    title="Ver Detalles"
                    className="p-2.5 bg-purple-600/60 backdrop-blur-md border border-purple-500/50 rounded-full text-white hover:bg-purple-500 transition-all duration-300 shadow-lg"
                >
                    <Info size={18} />
                </button>

                <button title="Eliminar" className="p-2.5 bg-red-600/40 backdrop-blur-md border border-red-500/50 rounded-full text-white hover:bg-red-600 transition-all duration-300 shadow-lg">
                    <Trash2 size={18} />
                </button>
            </div>

            {/* PRECIO (Tu diseño original) */}
            <div className="absolute top-4 right-4 z-10">
                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-black shadow-xl">
                    ${game.price}
                </span>
            </div>

            {/* IMAGEN (Tu diseño original) */}
            <figure className="aspect-[3/2] w-full overflow-hidden">
                <img src={'imgs/' + game.cover} alt={game.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </figure>

            {/* INFORMACIÓN (Tu diseño original) */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-lg">{game.title}</h2>
                    <div className="flex items-center gap-x-3 text-xs font-bold text-gray-300">
                        <span className="text-purple-400 uppercase tracking-widest text-[10px]">{game.console.name}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="opacity-80">{game.genre}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                        Developed by <span className="text-white">{game.developer}</span>
                    </p>
                </div>
            </div>

            {/* MODAL */}
            <dialog id={`modal_${game.id}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-[#1a1d23] border border-white/10 p-0 overflow-hidden max-w-xl shadow-2xl rounded-[2.5rem]">
                    {/* Banner del Modal */}
                    <div className="relative h-40 w-full">
                        <img src={'imgs/' + game.cover} className="w-full h-full object-cover opacity-30" alt="banner" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] to-transparent" />
                    </div>

                    <div className="px-8 pb-8 -mt-12 relative">
                        <h3 className="text-4xl font-black text-white mb-2">{game.title}</h3>
                        <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-black rounded-lg uppercase tracking-widest">
                            {game.console.name} • {game.genre}
                        </span>

                        <div className="grid grid-cols-1 gap-4 mt-8">
                            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                                    <Notebook size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Description</p>
                                    <p className="text-sm text-gray-300 leading-relaxed">{game.description || "No description provided."}</p>
                                </div>
                            </div>

                            {/* Cambiamos grid-cols-2 por grid-cols-1 y md:grid-cols-2 para que sea responsivo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* RELEASE DATE */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-green-500/20 rounded-xl text-green-400 shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="min-w-0"> {/* min-w-0 ayuda a controlar el truncado de texto */}
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Releasedate</p>
                                        <p className="text-sm text-white font-bold truncate">
                                            {new Date(game.releasedate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                timeZone: 'UTC'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* DEVELOPER */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                        <CodeXml size={20} />
                                    </div>
                                    <div className="min-w-0 w-full"> {/* Aseguramos que el contenedor respete el ancho */}
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Developer</p>
                                        <p className="text-sm text-white font-bold truncate block" title={game.developer}>
                                            {game.developer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action mt-8">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full bg-white text-black hover:bg-gray-200 border-none rounded-2xl font-black transition-all uppercase tracking-widest">Close Details</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/60">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}