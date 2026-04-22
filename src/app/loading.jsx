export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      
      <div className="relative z-10 text-center animate-pulse">
        <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-xl font-black italic tracking-tighter text-white">IDEA<span className="text-accent">REALITY.</span></span>
            <div className="w-12 h-[1px] bg-accent" />
        </div>
        
        <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-2 h-2 bg-accent rounded-full animate-bounce" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted mt-8">Synchronizing</p>
      </div>
    </div>
  );
}
