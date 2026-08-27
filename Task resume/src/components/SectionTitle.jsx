function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-16 sm:mb-20 lg:mb-24">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
        <div className="w-12 h-0.5 bg-lime-400/30 rounded-full" />
        <div className="w-2.5 h-2.5 bg-lime-400 rounded-full" />
        <div className="w-12 h-0.5 bg-lime-400/30 rounded-full" />
      </div>
    </div>
  );
}

export default SectionTitle;
