export const StatusBadge = ({ status }) => {
    let colorStyles = '';
    let dotColor = '';

    switch (status) {
        case 'RUNNING':
        case 'COMPLETED':
            colorStyles = 'bg-emerald-50 text-emerald-600 border-emerald-100';
            dotColor = 'bg-emerald-500';
            break;
        case 'IN_PROGRESS': // <-- STATUS BARU DITAMBAHKAN
            colorStyles = 'bg-blue-50 text-blue-600 border-blue-100';
            dotColor = 'bg-blue-500';
            break;
        case 'DOWN':
            colorStyles = 'bg-rose-50 text-rose-600 border-rose-100';
            dotColor = 'bg-rose-500';
            break;
        case 'MAINTENANCE':
        case 'OPEN':
            colorStyles = 'bg-amber-50 text-amber-600 border-amber-100';
            dotColor = 'bg-amber-500';
            break;
        default:
            colorStyles = 'bg-slate-50 text-slate-600 border-slate-100';
            dotColor = 'bg-slate-500';
            break;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${colorStyles}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
            {status}
        </span>
    );
};

export const PriorityBadge = ({ priority }) => {
    let colorStyles = '';

    switch (priority) {
        case 'HIGH':
            colorStyles = 'bg-rose-50 text-rose-600 border-rose-100';
            break;
        case 'MEDIUM':
        default:
            colorStyles = 'bg-indigo-50 text-indigo-600 border-indigo-100';
            break;
    }

    return (
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${colorStyles}`}>
            {priority}
        </span>
    );
};