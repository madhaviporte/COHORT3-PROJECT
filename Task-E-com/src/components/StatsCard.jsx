export default function StatsCard({ icon, value, label, sublabel }) {
  return (
    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-7 min-w-0 hover:border-neon/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neon/10 text-neon shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-white truncate leading-tight">{value}</p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{label}</p>
        {sublabel && (
          <p className="text-[11px] text-gray-600 truncate mt-0.5">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
