"use client";
import { Pencil, Trash2, Info, Calendar, Notebook, Building2} from 'lucide-react';

export default function ConsoleCard({ console }: { console: any }) {
    const openModal = () => {
        const modal = document.getElementById(`modal_con_${console.id}`) as HTMLDialogElement;
        if (modal) modal.showModal();
    };

    return (
        <div className="group relative flex flex-col h-full w-full overflow-hidden rounded-[2rem] bg-[#1a1d23] border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">

            {/* IMAGEN DE LA CARTA */}
            <figure className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f1115]">
                <img
                    src={'imgs/' + console.image}
                    alt={console.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] via-transparent to-transparent" />
            </figure>

            <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="mb-auto">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        {console.manufacturer}
                    </p>
                    <h2 className="text-2xl font-black text-white leading-tight line-clamp-2">
                        {console.name}
                    </h2>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={openModal}
                        className="flex-1 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-blue-500/20"
                    >
                        <Info size={18} />
                        <span className="text-xs uppercase tracking-wider">Details</span>
                    </button>

                    <div className="flex gap-2">
                        <button title="Editar" className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-xl transition-all border border-white/5">
                            <Pencil size={18} />
                        </button>
                        <button title="Eliminar" className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/10">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL con Informacion*/}
            <dialog id={`modal_con_${console.id}`} className="modal backdrop-blur-md">
                <div className="modal-box bg-[#1a1d23] border border-white/10 p-0 overflow-hidden max-w-xl shadow-2xl rounded-[2.5rem]">

                    {/* Banner del Modal - Ajustado a h-40 para igualar a Games */}
                    <div className="relative h-40 w-full">
                        <img src={'imgs/' + console.image} className="w-full h-full object-cover opacity-30" alt="banner" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] to-transparent" />
                    </div>

                    {/* CONTENIDO */}
                    <div className="px-8 pb-8 -mt-12 relative">
                        <h3 className="text-4xl font-black text-white mb-2">{console.name}</h3>

                        {/* Manufactura*/}
                        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-lg uppercase tracking-widest inline-block mb-8">
                            {console.manufacturer}
                        </span>

                        <div className="space-y-4">
                            {/* Descripción*/}
                            <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                    <Notebook size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Description</p>
                                    <p className="text-sm text-gray-300 leading-relaxed">{console.description || "No description provided."}</p>
                                </div>
                            </div>

                            {/* Releasedate y Manufactura */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-green-500/20 rounded-xl text-green-400 shrink-0">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Releasedate</p>
                                        <p className="text-sm text-white font-bold truncate">
                                            {new Date(console.releasedate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 shrink-0">
                                        <Building2 size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Manufacturer</p>
                                        <p className="text-sm text-white font-bold truncate">{console.manufacturer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón de cierre con estilo idéntico */}
                        <div className="modal-action mt-8">
                            <form method="dialog" className="w-full">
                                <button className="btn w-full bg-white text-black hover:bg-gray-200 border-none rounded-2xl font-black transition-all uppercase tracking-widest">
                                    Close Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/80"><button>close</button></form>
            </dialog>
        </div>
    );
}