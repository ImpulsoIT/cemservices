import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, ShieldCheck, Cpu, Volume2, Beaker, Check, RefreshCw } from 'lucide-react';

type SimulatorState = 'IDLE' | 'INJECTING' | 'ALARM' | 'CALIBRATING' | 'SUCCESS';

export default function CalibrationSimulator() {
  const [simState, setSimState] = useState<SimulatorState>('IDLE');
  
  // Real-time gas values
  const [gasValues, setGasValues] = useState({
    o2: 20.9,
    co: 0,
    h2s: 0.0,
    lel: 0
  });

  const [progress, setProgress] = useState(0);
  const [certCode, setCertCode] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fluctuating values when idle for realistic technical aesthetic
  useEffect(() => {
    if (simState !== 'IDLE') return;

    const interval = setInterval(() => {
      setGasValues(prev => ({
        o2: +(20.9 + (Math.random() * 0.2 - 0.1)).toFixed(1),
        co: Math.random() > 0.85 ? Math.floor(Math.random() * 2) : 0,
        h2s: +(Math.random() > 0.85 ? Math.random() * 0.2 : 0).toFixed(1),
        lel: Math.random() > 0.9 ? Math.floor(Math.random() * 2) : 0
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [simState]);

  // Handle simulation sequence
  const startSimulation = () => {
    if (simState !== 'IDLE') return;
    
    setSimState('INJECTING');
    setProgress(0);
    
    // Animate gas injection
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setGasValues({
        o2: +(20.9 - step * 0.9).toFixed(1),
        co: step * 6,
        h2s: +(step * 2.8).toFixed(1),
        lel: step * 5
      });
      setProgress(Math.min((step / 6) * 100, 100));

      if (step >= 6) {
        clearInterval(interval);
        setSimState('ALARM');
      }
    }, 400);
  };

  const runCalibration = () => {
    if (simState !== 'ALARM') return;
    setSimState('CALIBRATING');
    setProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setGasValues(prev => ({
        o2: +(prev.o2 + (20.9 - prev.o2) * 0.35).toFixed(1),
        co: Math.max(0, Math.floor(prev.co * 0.6) - 2),
        h2s: +(Math.max(0, prev.h2s * 0.5) - 0.1).toFixed(1),
        lel: Math.max(0, Math.floor(prev.lel * 0.6) - 2)
      }));
      setProgress(step * 10);

      if (step >= 10) {
        clearInterval(interval);
        setGasValues({
          o2: 20.9,
          co: 0,
          h2s: 0.0,
          lel: 0
        });
        
        // Generate random realistic certificate ID
        const code = `CEM-CAL-${Math.floor(Math.random() * 90000 + 10000)}-NQN`;
        setCertCode(code);
        setSimState('SUCCESS');
      }
    }, 450);
  };

  const resetSimulator = () => {
    setSimState('IDLE');
    setGasValues({
      o2: 20.9,
      co: 0,
      h2s: 0.0,
      lel: 0
    });
    setCertCode('');
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 rounded-3xl p-6 border-4 border-amber-500/80 shadow-2xl relative overflow-hidden text-white font-sans">
      {/* Absolute top glowing strip for simulation status */}
      <div className={`absolute top-0 left-0 right-0 h-2 transition-all duration-500 ${
        simState === 'IDLE' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]' :
        simState === 'INJECTING' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]' :
        simState === 'ALARM' ? 'bg-rose-600 animate-pulse shadow-[0_0_20px_rgba(225,29,72,1)]' :
        simState === 'CALIBRATING' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' :
        'bg-green-500 shadow-[0_0_25px_rgba(34,197,94,1)]'
      }`} />

      {/* Header section of the detector device */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-500 animate-pulse" />
          <span className="font-mono text-[11px] font-black tracking-widest text-[#28F08C]">
            CEM MULTI-GAS DETECTOR SIM V4
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${
            simState === 'ALARM' ? 'bg-rose-500 animate-ping' : 'bg-[#00B450] animate-pulse'
          }`} />
          <span className="font-mono text-[9px] tracking-widest text-white/50 uppercase">
            {simState === 'IDLE' ? 'A SALVO' : simState}
          </span>
        </div>
      </div>

      {/* Main instrument LCD display screen */}
      <div className={`rounded-2xl p-4 transition-all duration-500 relative ${
        simState === 'ALARM' 
          ? 'bg-rose-950/90 border-2 border-rose-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.4)] text-rose-100' 
          : simState === 'SUCCESS'
            ? 'bg-emerald-950/90 border-2 border-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.4)] text-emerald-100'
            : 'bg-slate-950 border border-slate-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] text-[#28F08C]'
      }`}>
        <div className="flex justify-between text-[10px] uppercase font-bold text-white/40 tracking-widest mb-2 font-mono">
          <span>Toma de Muestra Activa</span>
          <span className="animate-pulse text-[#28F08C]">● LIVE FEED</span>
        </div>

        {/* The 4-Gas Grid readings */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* O2 sensor */}
          <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 flex flex-col justify-between h-20">
            <div className="flex justify-between text-[9px] font-black text-white/50">
              <span>O₂</span>
              <span className="text-white/35">Lím: 19.5%</span>
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-300 ${
                gasValues.o2 < 19.5 ? 'text-rose-500 font-extrabold animate-pulse' : ''
              }`}>{gasValues.o2}</span>
              <span className="text-[10px] font-bold text-white/40">%VOL</span>
            </div>
          </div>

          {/* LEL (Explosivos) */}
          <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 flex flex-col justify-between h-20">
            <div className="flex justify-between text-[9px] font-black text-white/50">
              <span>LEL (Gases Inf.)</span>
              <span className="text-white/35">Lím: 10%</span>
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-300 ${
                gasValues.lel >= 10 ? 'text-rose-500 font-extrabold animate-pulse' : ''
              }`}>{gasValues.lel}</span>
              <span className="text-[10px] font-bold text-white/40">%LEL</span>
            </div>
          </div>

          {/* CO (Monóxido de Carbono) */}
          <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 flex flex-col justify-between h-20">
            <div className="flex justify-between text-[9px] font-black text-white/50">
              <span>CO</span>
              <span className="text-white/35">Lím: 25ppm</span>
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-300 ${
                gasValues.co >= 25 ? 'text-rose-500 font-extrabold animate-pulse' : ''
              }`}>{gasValues.co}</span>
              <span className="text-[10px] font-bold text-white/40">PPM</span>
            </div>
          </div>

          {/* H2S (Sulfhídrico) */}
          <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 flex flex-col justify-between h-20">
            <div className="flex justify-between text-[9px] font-black text-white/50">
              <span>H₂S</span>
              <span className="text-white/35">Lím: 10ppm</span>
            </div>
            <div className="flex items-baseline justify-end gap-1">
              <span className={`text-2xl sm:text-3xl font-black font-mono transition-colors duration-300 ${
                gasValues.h2s >= 10 ? 'text-rose-500 font-extrabold animate-pulse' : ''
              }`}>{gasValues.h2s}</span>
              <span className="text-[10px] font-bold text-white/40">PPM</span>
            </div>
          </div>
        </div>

        {/* Central Display message bar */}
        <div className="rounded-xl p-2 bg-black/50 font-mono text-center text-xs border border-white/5 min-h-[44px] flex items-center justify-center">
          {simState === 'IDLE' && (
            <div className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5 animate-pulse">
              <ShieldCheck className="w-4 h-4" /> RECURSOS EN RANDO NOMINAL OK
            </div>
          )}
          {simState === 'INJECTING' && (
            <div className="text-amber-400 font-bold flex flex-col items-center gap-1">
              <span>INYECTANDO CO / H₂S / LEL...</span>
              <div className="w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          {simState === 'ALARM' && (
            <div className="text-rose-500 font-black animate-pulse flex items-center flex-col gap-1 text-[11px] uppercase tracking-wide">
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" /> ALARMA: GAS CRÍTICO DETECTADO
              </span>
              <span className="text-[9px] text-white/80 font-normal">EQUIPO REQUIERE VERIFICACIÓN / CALIBRACIÓN</span>
            </div>
          )}
          {simState === 'CALIBRATING' && (
            <div className="text-[#28F08C] font-semibold flex flex-col items-center gap-1 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 animate-spin">
                <RefreshCw className="w-3.5 h-3.5" />
              </span>
              <span>CALIBRACIÓN EN PROCESO DE TRAZABILIDAD... ({progress}%)</span>
            </div>
          )}
          {simState === 'SUCCESS' && (
            <div className="text-emerald-300 font-bold flex flex-col items-center text-[11px] gap-0.5">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4 fill-emerald-500/10" /> CERTIFICACIÓN SATISFACTORIA
              </span>
              <span className="text-white select-all text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                REGISTRO: {certCode}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons interface */}
      <div className="mt-5 space-y-2.5">
        {simState === 'IDLE' && (
          <button
            type="button"
            onClick={startSimulation}
            className="w-full bg-amber-500 hover:bg-amber-400 hover:scale-[1.01] active:scale-[0.99] text-slate-950 font-black py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            <Beaker className="w-4.5 h-4.5 shrink-0" />
            Provocar Fuga de Gas (Bump Test)
          </button>
        )}

        {simState === 'INJECTING' && (
          <button
            disabled
            className="w-full bg-amber-500/40 text-slate-950/50 cursor-not-allowed font-black py-3 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Cargando Gas Patrón...
          </button>
        )}

        {simState === 'ALARM' && (
          <button
            type="button"
            onClick={runCalibration}
            className="w-full bg-[#00B450] hover:bg-[#28F08C] hover:scale-[1.01] active:scale-[0.99] text-slate-950 font-black py-4 rounded-xl transition-all shadow-xl animate-pulse flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider"
          >
            <ShieldCheck className="w-5 h-5 shrink-0" />
            Calibrar y Certificar con CEM™
          </button>
        )}

        {simState === 'CALIBRATING' && (
          <button
            disabled
            className="w-full bg-blue-500/30 text-blue-300 cursor-not-allowed font-black py-3 rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-mono animate-pulse"
          >
            Sintonizando sensores...
          </button>
        )}

        {simState === 'SUCCESS' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={resetSimulator}
              className="bg-slate-800 hover:bg-slate-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              Reiniciar
            </button>
            <a
              href="https://wa.link/62av5e"
              target="_blank"
              rel="noreferrer"
              className="bg-[#00B450] hover:bg-[#28F08C] text-slate-950 font-black py-3 px-4 rounded-xl transition-colors text-sm text-center flex items-center justify-center"
            >
              Pedir Cotización
            </a>
          </div>
        )}

        {/* Small explainer footnote */}
        <p className="text-[9.5px] text-white/40 leading-relaxed text-center font-mono mt-2">
          Demostración interactiva de calibración técnica CEM Services. Nos especializamos en mantener seguras e inteligentes las operaciones de Gas y Petróleo de Neuquén.
        </p>
      </div>
    </div>
  );
}
