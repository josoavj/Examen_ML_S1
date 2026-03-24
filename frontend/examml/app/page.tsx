import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      
      <main className="z-10 flex flex-col items-center w-full max-w-4xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10 hover:border-white/20">
        
        {/* Logos Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12 w-full">
          <div className="flex flex-col items-center gap-4 group">
             <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl bg-white/5 border border-white/10 p-4 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-400/30">
                <img src="/ISPM.ico" alt="Logo ISPM" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
             </div>
             <span className="text-sm sm:text-base font-semibold text-neutral-400 tracking-wide uppercase group-hover:text-blue-400 transition-colors">ISPM</span>
          </div>

          {/* Divider */}
          <div className="w-16 h-px md:w-px md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col items-center gap-4 group">
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl relative border-2 border-dashed border-white/20 bg-black/20 flex flex-col items-center justify-center transition-all duration-300 hover:border-purple-400/50 hover:bg-purple-900/10 hover:scale-105 overflow-hidden">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white/30 group-hover:text-purple-400/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="mt-3 text-[10px] md:text-xs text-white/40 group-hover:text-purple-300 transition-colors font-bold tracking-widest uppercase">Futur Logo</span>
            </div>
             <span className="text-sm sm:text-base font-semibold text-neutral-400 tracking-wide uppercase group-hover:text-purple-400 transition-colors">Application</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-pulse">
            Examen 1er Semestre INFO5
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Bienvenue sur l'interface de l'application. Préparez-vous à découvrir la suite du projet.
          </p>
        </div>

      </main>
    </div>
  );
}
