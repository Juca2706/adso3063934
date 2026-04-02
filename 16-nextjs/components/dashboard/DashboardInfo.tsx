'use client'
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    Tooltip, Legend
} from 'recharts';
import { Gamepad2, Monitor, LayoutDashboard, Database, Sparkles } from 'lucide-react';
import CountUp from 'react-countup';

interface DashboardProps {
    totalGames: number;
    totalConsoles: number;
}

export default function DashboardInfo({ totalGames, totalConsoles }: DashboardProps) {

    const data = [
        { name: 'Videojuegos', value: totalGames, color: '#10b981' },
        { name: 'Consolas', value: totalConsoles, color: '#3b82f6' },
    ];

    return (
        <div className="p-6 lg:p-10 space-y-10 text-white animate-in fade-in duration-700">

            {/* TÍTULO Y ESTADO */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                <div className="flex items-center gap-5">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative p-3 bg-[#1a1d23] rounded-2xl border border-white/10">
                            <LayoutDashboard className="text-indigo-400" size={26} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                            <Sparkles size={10} className="text-indigo-400" /> Inventario de la plataforma
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-[10px] font-black text-emerald-400 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Sistema Online
                </div>
            </div>

            {/* TARJETAS RESUMEN CON ILUMINACIÓN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Card Juegos */}
                <div className="group relative bg-[#1a1d23] border border-white/5 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                    {/* Glow de fondo al hacer hover */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/15 transition-all duration-700"></div>

                    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-emerald-500/10 group-hover:scale-110 transition-all duration-700 transform rotate-12">
                        <Gamepad2 size={120} />
                    </div>

                    <div className="relative z-10">
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-emerald-400/80 transition-colors">Total Juegos</p>
                        <h3 className="text-7xl font-black italic tracking-tighter transition-all duration-500 group-hover:scale-105 origin-left">
                            <CountUp end={totalGames} />
                        </h3>
                        <div className="mt-4 w-12 h-1 bg-emerald-500/20 rounded-full group-hover:w-24 transition-all duration-700"></div>
                    </div>
                </div>

                {/* Card Consolas */}
                <div className="group relative bg-[#1a1d23] border border-white/5 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]">
                    {/* Glow de fondo al hacer hover */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/15 transition-all duration-700"></div>

                    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-blue-500/10 group-hover:scale-110 transition-all duration-700 transform -rotate-12">
                        <Monitor size={120} />
                    </div>

                    <div className="relative z-10">
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] mb-3 group-hover:text-blue-400/80 transition-colors">Total Consolas</p>
                        <h3 className="text-7xl font-black italic tracking-tighter transition-all duration-500 group-hover:scale-105 origin-left">
                            <CountUp end={totalConsoles} />
                        </h3>
                        <div className="mt-4 w-12 h-1 bg-blue-500/20 rounded-full group-hover:w-24 transition-all duration-700"></div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN GRÁFICO CON DISEÑO PULIDO */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-[#1a1d23] border border-white/5 p-10 rounded-[3rem] shadow-2xl transition-all duration-500 group-hover:border-white/10">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Database size={18} className="text-indigo-400" />
                            </div>
                            <h3 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Balance de Datos</h3>
                        </div>
                    </div>

                    <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={130}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={200}
                                    animationDuration={1200}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className="hover:opacity-80 transition-opacity cursor-pointer"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1d23',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '24px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        padding: '12px 20px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    iconSize={10}
                                    formatter={(value) => (
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors px-3">
                                            {value}
                                        </span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}