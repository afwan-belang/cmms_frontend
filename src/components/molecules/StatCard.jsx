import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-3">
            <div className={`p-2.5 rounded-xl ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <span className="flex items-center text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    +{trend}% <ArrowUpRight size={12} className="ml-1"/>
                </span>
            )}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-0.5">{value}</h3>
            <p className="text-slate-500 text-[13px] font-medium">{title}</p>
        </div>
    </div>
);

export default StatCard;