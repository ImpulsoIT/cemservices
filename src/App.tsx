/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  FileText, 
  Zap, 
  AlertTriangle, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Settings, 
  Wrench, 
  Activity, 
  Flame, 
  Smartphone,
  Menu,
  X,
  Mail,
  Video,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CalibrationSimulator from './components/CalibrationSimulator';

const WHATSAPP_LINK = "https://wa.link/62av5e";
const WHATSAPP_FLOAT_LINK = "https://wa.link/ykyxe9";

const BG_STATIONS = [
  {
    id: "vaca-muerta",
    label: "POZO / DRILL VACA MUERTA",
    shortLabel: "Vaca Muerta (Drone)",
    desc: "Yacimiento en la estepa de Añelo, región núcleo de la cuenca neuquina.",
    video: "https://player.vimeo.com/external/510850877.hd.mp4?s=d4f20387498c09a89c9fdcf6ec9bb2807e494a8f&profile_id=170&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1441850688944-1b9bb48fc43c?auto=format&fit=crop&q=80&w=1920",
    badge: "Drone Vaca Muerta",
    location: "Añelo, Neuquén"
  },
  {
    id: "extraccion",
    label: "BOMBEO ACTIVO / CIGÜEÑA",
    shortLabel: "Atardecer Industrial",
    desc: "Cigüeña de extracción petrolera activa durante el atardecer patagónico.",
    video: "https://player.vimeo.com/external/371433846.hd.mp4?s=2bc4b840e698188bd2f0fa9b93ee6fed15ae50f8&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920",
    badge: "Extracción Loma Campana",
    location: "Cuenca Neuquina"
  },
  {
    id: "refineria",
    label: "PLANTA REGULADORA DE GAS",
    shortLabel: "Planta de Gas & Petróleo",
    desc: "Ductos de flujo, válvulas y colectores de gas natural en Plaza Huincul.",
    video: "https://player.vimeo.com/external/459389137.hd.mp4?s=8039dfc823f6e1cca24c965ea4e411b43d3b7bbb&profile_id=170&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&q=80&w=1920",
    badge: "Procesamiento de Gas",
    location: "Plaza Huincul, Neuquén"
  },
  {
    id: "neuquen-capital",
    label: "LOGÍSTICA Y BASE NEUQUÉN CAPITAL",
    shortLabel: "Neuquén Capital (Base)",
    desc: "Centro de soporte, calibración y distribución de detectores para toda la Patagonia.",
    video: "https://player.vimeo.com/external/498263725.hd.mp4?s=4bbfe2fdf7ffb6b7cb0dfa908cfdff96a1da9a48&profile_id=174&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1920",
    badge: "Lab Neuquén Capital",
    location: "Neuquén Capital"
  }
];

const Logo = () => (
  <a href="https://infocemservices.com/" className="flex items-center gap-3 group">
    <div className="relative w-10 h-10 flex shrink-0">
      <div className="absolute inset-0 bg-brand-primary skew-x-[-20deg] translate-x-[-4px] group-hover:scale-110 transition-transform"></div>
      <div className="absolute inset-0 bg-brand-dark skew-x-[-20deg] translate-x-[4px]"></div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg sm:text-xl font-black tracking-tighter text-brand-dark group-hover:text-brand-primary transition-colors">
        CEM<span className="text-brand-primary">SERVICES</span>
      </span>
      <span className="text-[7px] font-bold text-brand-muted uppercase tracking-widest mt-1">
        Calibración de equipos y detectores
      </span>
    </div>
  </a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBgIdx, setCurrentBgIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const activeBg = BG_STATIONS[currentBgIdx];

  // Auto-advance background feeds every 12 seconds for spectacular ambiance unless manually override
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentBgIdx(prev => (prev + 1) % BG_STATIONS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    equipo: 'Detector Portátil',
    mensaje: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola CEM Services! Mi nombre es ${formData.nombre} de la empresa ${formData.empresa}. Mi teléfono es ${formData.telefono}. Consulto por la calibración de: ${formData.equipo}. Mensaje: ${formData.mensaje}`;
    const encodedText = encodeURIComponent(text);
    window.location.href = `${WHATSAPP_LINK}?text=${encodedText}`;
  };

  const services = [
    {
      title: "Calibración de Detectores de Gases",
      desc: "Calibración con gases patrón certificados. Trazabilidad completa y certificado post-calibración incluido.",
      icon: <Activity className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Detectores Portátiles",
      desc: "Todas las marcas",
      icon: <Smartphone className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Certificación de equipos de medición",
      desc: "Informes técnicos exhaustivos y certificación bajo normativas vigentes.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Anemómetros, Luxómetros, Telurímetros y Decibelímetros",
      desc: "Servicio especializado de calibración y verificación técnica para instrumental de medición ambiental y eléctrica.",
      icon: <Zap className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Reparación y Mantenimiento",
      desc: "Reemplazo de sensores, firmware, inspección IP65/IP66 y verificación de alarmas.",
      icon: <Wrench className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Bump Test / Verificación Funcional",
      desc: "Prueba de respuesta real ante Gases. Informe técnico de resultado incluido.",
      icon: <Activity className="w-8 h-8 text-brand-primary" />
    },
    {
      title: "Puesta en Marcha",
      desc: "Configuración inicial, parametrización de umbrales y integración con sistemas de emergencia.",
      icon: <Settings className="w-8 h-8 text-brand-primary" />
    }
  ];

  const differentials = [
    {
      title: "Calibración",
      desc: "Diagnóstico y pruebas de funcionamiento.",
      icon: <Activity className="w-12 h-12 text-brand-primary mb-4" />
    },
    {
      title: "Economía de consumo",
      desc: "Equipos calibrados que reducen errores.",
      icon: <Zap className="w-12 h-12 text-brand-primary mb-4" />
    },
    {
      title: "Soporte",
      desc: "Información clara para decisiones operativas.",
      icon: <FileText className="w-12 h-12 text-brand-primary mb-4" />
    },
    {
      title: "Productividad",
      desc: "Menos paradas y más rendimiento.",
      icon: <Activity className="w-12 h-12 text-brand-primary mb-4" />
    }
  ];

  const gases = ["H₂S", "CO", "O₂", "LEL", "SO₂", "VOCs"];

  const steps = [
    { num: "1", text: "Escribinos por WhatsApp" },
    { num: "2", text: "Coordinamos el retiro sin cargo" },
    { num: "3", text: "Calibración certificada en taller" },
    { num: "4", text: "Devolvemos el equipo con informe técnico" }
  ];

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white">
      {/* Background Glow Blobs */}
      <div className="glow-mesh opacity-20">
        <div className="glow-blob top-[-10%] left-[-10%] animate-drift bg-brand-primary/20" />
        <div className="glow-blob bottom-[-10%] right-[-10%] animate-drift bg-brand-secondary/20" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Logo />
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Servicios', 'Diferencial', 'Ubicación', 'Contacto'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm font-bold text-white hover:text-brand-primary transition-colors relative group uppercase tracking-widest"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                href={WHATSAPP_LINK} 
                className="btn-primary py-2 px-6 text-sm uppercase tracking-tighter"
              >
                WhatsApp
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-dark/95 border-b border-white/10 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-6 py-8 space-y-5">
                {['servicios', 'diferencial', 'ubicacion', 'contacto'].map((sec) => (
                  <a 
                    key={sec}
                    href={`#${sec}`} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="block text-xl font-black text-white uppercase tracking-wider hover:text-brand-primary transition-colors py-2 border-b border-white/5 last:border-0"
                  >
                    {sec === 'ubicacion' ? 'Ubicación' : sec}
                  </a>
                ))}
                <a href={WHATSAPP_LINK} className="btn-primary w-full text-center py-4 text-base font-black shadow-lg">
                  Contactar ahora (WhatsApp)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-brand-dark">
        {/* Background Video with Fallback Image and Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            key={activeBg.id}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75 filter brightness-[0.70] contrast-[1.20] saturate-[1.3] transition-opacity duration-1000"
            poster={activeBg.poster}
          >
            <source src={activeBg.video} type="video/mp4" />
            <img 
              src={activeBg.poster} 
              alt={activeBg.desc} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </video>
          {/* High-tech grid matrix overlay for an industrial monitoring aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00c16515_1px,transparent_1px),linear-gradient(to_bottom,#00c16515_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          {/* Crimson & Green subtle warning heat map layers for a realistic oilfield asset feel */}
          <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#00B450]/5 filter blur-[120px] pointer-events-none animate-pulse"></div>
          {/* Gradient to transition from dark hero to light services background smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F0F0F0] via-[#001428]/95 to-[#001428]/55"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Visual pitch and high-tech Sentinel video monitor feeds */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-slate-950/70 border border-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl relative mb-8"
              >
                {/* Scientific target marks to emulate a digital monitoring telemetry window */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-brand-secondary/50"></div>
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-brand-secondary/50"></div>
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-brand-secondary/50"></div>
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-brand-secondary/50"></div>

                <div className="inline-block mb-4">
                  <span className="badge-animated ring-4 ring-brand-primary/30">
                    🚗 Traslado de equipos SIN CARGO en Neuquén Capital
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[4.2rem] font-black leading-[0.9] mb-6 tracking-tighter text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  Medir con <br />
                  <span className="text-brand-secondary italic tracking-tight underline decoration-white decoration-4 underline-offset-8">Precisión,</span> <br />
                  operar con <br />
                  <span className="text-brand-secondary italic tracking-tight underline decoration-white decoration-4 underline-offset-8">confianza.</span>
                </h1>
                
                <div className="flex flex-col gap-2 mb-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-brand-secondary font-black italic uppercase tracking-tighter drop-shadow-md">
                    SOPORTE TÉCNICO & CALIBRACIÓN INDUSTRIAL
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-white/90 uppercase tracking-widest leading-relaxed drop-shadow-sm">
                    <span>CUENCA NEUQUINA & PATAGONIA</span>
                    <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-brand-secondary shrink-0 animate-pulse"></span>
                    <span className="text-brand-secondary font-black underline decoration-4 underline-offset-4">TRAZABILIDAD INTEGRAL</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center max-w-md mx-auto lg:max-w-none">
                  <a href={WHATSAPP_LINK} className="btn-primary w-full sm:w-auto text-base sm:text-lg px-8 py-4 group shadow-2xl shadow-brand-primary/40 ring-4 ring-white/10 justify-center">
                    Enviar WhatsApp
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </a>
                  <a href="#servicios" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-black rounded-lg hover:bg-white hover:text-brand-dark transition-all backdrop-blur-sm shadow-md text-base sm:text-lg">
                    Ver Servicios
                  </a>
                </div>
              </motion.div>

              {/* Interactive Camera Feeds (Vaca Muerta, Neuquén base) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full text-left p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
              >
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/15 bg-slate-950/40 rounded-t-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                    </span>
                    <span>SENTINEL FEED: <span className="text-brand-secondary">{activeBg.badge} ({activeBg.location})</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAutoPlay && (
                      <span className="text-[8px] text-brand-secondary bg-brand-primary/10 border border-brand-primary/30 px-1.5 py-0.5 rounded uppercase animate-pulse">
                        Auto-Secuencia
                      </span>
                    )}
                    <span className="text-[9px] font-mono text-white/70 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      DIAG-CONSOLE
                    </span>
                  </div>
                </div>
                
                <div className="p-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-black/60 rounded-b-2xl">
                  {BG_STATIONS.map((station, i) => {
                    const isActive = currentBgIdx === i;
                    return (
                      <button
                        key={station.id}
                        type="button"
                        onClick={() => {
                          setCurrentBgIdx(i);
                          setIsAutoPlay(false); // Pause auto rotation upon user interaction
                        }}
                        className={`group px-2.5 py-2 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between ${
                          isActive 
                            ? "bg-brand-primary text-slate-950 border-brand-secondary shadow-md scale-[1.02]" 
                            : "bg-white/5 hover:bg-white/10 text-white/90 border-white/10 hover:border-brand-secondary/30"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 w-full mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-wider truncate shrink-1 ${isActive ? "text-slate-950" : "text-white/60 group-hover:text-brand-primary"}`}>
                            {station.shortLabel}
                          </span>
                          {isActive ? (
                            <Eye className="w-3.5 h-3.5 text-slate-950 animate-pulse shrink-0" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-white/40 group-hover:text-[#28F08C] transition-colors shrink-0" />
                          )}
                        </div>
                        <p className={`text-[8px] leading-tight font-medium line-clamp-1 truncate ${isActive ? "text-slate-900/80" : "text-white/55"}`}>
                          {station.location}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column: High-tech Multigas Detector Calibration Simulator Widget */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* Floating indicator explaining what this is */}
                <div className="absolute -top-3 left-6 z-20 bg-brand-primary text-white font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1">
                  <span>PRUEBA INTERACTIVA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                </div>
                
                <CalibrationSimulator />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 bg-brand-surface relative overflow-hidden text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase">Nuestro <span className="text-brand-primary">Servicio</span></h2>
            <p className="text-brand-text max-w-2xl mx-auto text-base sm:text-lg mb-4 font-medium leading-relaxed">Asegurar precisión, trazabilidad y eficiencia en cada intervención. Integramos tecnología, método y experiencia para que tus operaciones en Neuquén trabajen con equipos confiables.</p>
            <p className="text-brand-dark/60 max-w-2xl mx-auto text-sm sm:text-base italic font-bold">Nuestro enfoque es simple: cumplir normas, optimizar tiempos y acompañarte con soporte técnico claro.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-brand-bg p-6 sm:p-8 rounded-3xl group transition-all duration-500 border border-brand-muted hover:border-brand-primary hover:shadow-xl"
              >
                <div className="mb-6 p-4 bg-brand-primary/5 rounded-2xl inline-block group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-10 h-10 transition-colors group-hover:text-white" })}
                </div>
                <h3 className="text-2xl font-black mb-4 text-brand-dark group-hover:text-brand-primary transition-colors uppercase tracking-tight">{service.title}</h3>
                <p className="text-brand-text leading-relaxed text-lg font-medium opacity-90">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="diferencial" className="py-24 bg-brand-bg relative text-brand-dark border-t border-brand-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Beneficios de nuestro <span className="text-brand-primary">servicio</span></h2>
            <p className="text-brand-text max-w-3xl mx-auto text-lg sm:text-xl font-medium leading-relaxed">La calibración profesional de tus detectores de Gases te permite trabajar con mayor seguridad, eficiencia and respaldo documental ante auditorías en la cuenca de Vaca Muerta.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center font-bold">
            {differentials.map((diff, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center group p-6 sm:p-8 rounded-3xl bg-brand-surface border border-brand-muted/30 hover:border-brand-primary transition-all duration-500"
              >
                <div className="p-6 rounded-full bg-brand-bg mb-6 group-hover:bg-brand-primary transition-all duration-500 group-hover:rotate-12 group-hover:shadow-lg">
                  {React.cloneElement(diff.icon as React.ReactElement, { className: "w-12 h-12 text-brand-primary group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tight text-brand-dark uppercase">{diff.title}</h3>
                <p className="text-brand-text text-base font-medium opacity-80">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gases Section */}
      <section className="py-16 sm:py-24 bg-brand-surface border-y border-brand-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-dark">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 sm:mb-12 uppercase tracking-tighter">Gases críticos que <span className="text-brand-primary">calibramos</span></h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {gases.map((gas, idx) => (
              <motion.span 
                key={idx}
                whileHover={{ scale: 1.1, backgroundColor: "#00B450", color: "#FFFFFF" }}
                className="px-6 py-3 sm:px-10 sm:py-4 bg-brand-bg border border-brand-muted text-brand-primary rounded-full text-base sm:text-xl font-black shadow-sm transition-colors cursor-default"
              >
                {gas}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / ¿Por qué elegirnos? */}
      <section className="py-16 sm:py-24 bg-brand-bg text-brand-dark border-t border-brand-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter uppercase text-center lg:text-left">¿Por qué <span className="text-brand-primary">elegirnos?</span></h2>
              <p className="text-lg sm:text-xl text-brand-text font-medium leading-relaxed mb-8 italic text-center lg:text-left">
                Precisión, eficiencia y soporte real. La calibración de detectores de Gases es esencial para garantizar la seguridad de tu entorno y la precisión de las mediciones técnicos para Vaca Muerta, Neuquén.
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: <ShieldCheck className="w-8 h-8 shrink-0" />, title: "Calibración certificada", desc: "Procesos trazables y cumplimiento normativo para garantizar precisión en cada instrumento." },
                  { icon: <CheckCircle2 className="w-8 h-8 shrink-0" />, title: "Compromiso industrial", desc: "Equipos y protocolos listos para condiciones exigentes en la industria energética de la región." },
                  { icon: <Activity className="w-8 h-8 shrink-0" />, title: "Soporte especializado", desc: "Reportes claros, tiempos comprometidos y asistencia técnica directa sin intermediarios." }
                ].map((item, i) => (
                  <div key={i} className="flex bg-brand-surface p-5 sm:p-6 rounded-2xl border border-brand-muted/30 hover:border-brand-primary transition-all duration-300">
                    <div className="bg-brand-primary text-white p-3 rounded-xl h-fit mr-4 shadow-md shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-brand-dark uppercase leading-tight mb-1">{item.title}</h3>
                      <p className="text-sm sm:text-base text-brand-text opacity-90 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative px-2 sm:px-4 lg:px-0 mt-8 lg:mt-0">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800" 
                  alt="Industrial High Tech Worker" 
                  className="w-full h-[320px] sm:h-[450px] lg:h-[600px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <p className="text-white text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">SEGURIDAD ANTE TODO</p>
                  <p className="text-brand-secondary font-black tracking-widest uppercase text-xs sm:text-sm">OPERACIONES EN NEUQUÉN</p>
                </div>
              </div>
              <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-4 bg-brand-primary text-white px-5 py-3 sm:px-8 sm:py-5 rounded-2xl shadow-xl font-black transform rotate-3 border-2 border-brand-secondary text-sm sm:text-base tracking-wider uppercase">
                TRAZABILIDAD TOTAL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 sm:py-24 bg-brand-bg text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Cómo <span className="text-brand-primary">Trabajamos</span></h2>
            <p className="text-brand-text font-medium">Proceso ágil y transparente para tu comodidad en Neuquén.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group p-4 rounded-2xl bg-brand-surface/20 border border-brand-muted/10 sm:border-transparent">
                <div className="w-16 h-16 bg-brand-surface border-2 border-brand-primary text-brand-primary rounded-full flex items-center justify-center text-2xl font-black mb-4 sm:mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-md">
                  {step.num}
                </div>
                <p className="text-base sm:text-lg font-black uppercase tracking-tight leading-snug">{step.text}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary opacity-30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="ubicacion" className="py-24 bg-brand-surface text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">Nuestra <span className="text-brand-primary">Ubicación</span></h2>
            <p className="text-brand-text font-medium">Visitanos en nuestro taller especializado en Neuquén, epicentro de Vaca Muerta.</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-brand-muted h-[450px] shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.834460495393!2d-68.11966418464804!3d-38.94051157956381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33687b01d6fb%3A0x6b3928c4b9337464!2sAv.%20del%20Trabajador%204185%2C%20Q8304CGL%20Neuqu%C3%A9n%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1708814500000!5m2!1ses-419!2sar" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-8 text-center">
            <a 
              href="https://www.google.com/maps/place/Av.+del+Trabajador+4185,+Q8304CGL+Neuqu%C3%A9n,+Argentina/@-38.9405116,-68.1170839,17z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-primary hover:text-brand-secondary font-black text-lg underline decoration-2 underline-offset-4"
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-16 sm:py-24 bg-brand-bg text-brand-dark border-t border-brand-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-surface p-6 sm:p-8 md:p-12 rounded-3xl border border-brand-muted shadow-xl">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Solicitá tu <span className="text-brand-primary">Presupuesto</span></h2>
              <p className="text-brand-text font-medium">Completá el formulario y te contactaremos por WhatsApp al instante brindando soporte en Vaca Muerta.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-brand-dark uppercase tracking-widest mb-2">Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-brand-bg border-2 border-brand-muted rounded-xl py-4 px-5 focus:border-brand-primary outline-none transition-colors text-brand-text font-medium"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-brand-dark uppercase tracking-widest mb-2">Empresa</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-brand-bg border-2 border-brand-muted rounded-xl py-4 px-5 focus:border-brand-primary outline-none transition-colors text-brand-text font-medium"
                    placeholder="Nombre de la empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-brand-dark uppercase tracking-widest mb-2">Teléfono</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-brand-bg border-2 border-brand-muted rounded-xl py-4 px-5 focus:border-brand-primary outline-none transition-colors text-brand-text font-medium"
                    placeholder="Ej: +54 9 299 ..."
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-brand-dark uppercase tracking-widest mb-2">Tipo de equipo</label>
                  <select 
                    className="w-full bg-brand-bg border-2 border-brand-muted rounded-xl py-4 px-5 focus:border-brand-primary outline-none transition-colors appearance-none text-brand-text font-medium cursor-pointer"
                    value={formData.equipo}
                    onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                  >
                    <option>Detector Portátil</option>
                    <option>Certificación de Equipos</option>
                    <option>Instrumental Especial (Anemómetros, etc.)</option>
                    <option>Reparación / Mantenimiento</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-black text-brand-dark uppercase tracking-widest mb-2">Mensaje / Consulta</label>
                <textarea 
                  rows={4}
                  className="w-full bg-brand-bg border-2 border-brand-muted rounded-xl py-4 px-5 focus:border-brand-primary outline-none transition-colors resize-none text-brand-text font-medium"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 sm:py-5 text-lg sm:text-xl uppercase tracking-widest shadow-2xl">
                Enviar consulta por WhatsApp <MessageCircle className="w-7 h-7" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-brand-dark text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-8 p-4 bg-white/5 rounded-2xl inline-block">
                <Logo />
              </div>
              <p className="text-white/70 max-w-sm mb-8 leading-relaxed font-medium">
                Líderes en servicios técnicos para la industria en Neuquén. 
                Especialistas en seguridad, precisión y trazabilidad nacional.
              </p>
              <div className="flex gap-4">
                <a href={WHATSAPP_LINK} className="p-3 bg-white/10 rounded-xl hover:bg-brand-primary transition-all shadow-lg group">
                  <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href="mailto:serviciotecnico@infocemservices.com" className="p-3 bg-white/10 rounded-xl hover:bg-brand-primary transition-all shadow-lg group">
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-brand-secondary font-black mb-8 uppercase tracking-widest text-sm">Ubicación y Contacto</h4>
              <ul className="space-y-5 text-white/80 font-medium">
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/20 p-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                  </div>
                  <span>Av. Del Trabajador 4185, Neuquén Capital</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/20 p-2 rounded-lg">
                    <Activity className="w-5 h-5 text-brand-primary shrink-0" />
                  </div>
                  <a href="https://infocemservices.com/" className="hover:text-brand-primary transition-colors">infocemservices.com</a>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-brand-primary/20 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:serviciotecnico@infocemservices.com" className="hover:text-brand-primary transition-colors text-sm">serviciotecnico@infocemservices.com</a>
                    <a href="mailto:administracion@infocemservices.com" className="hover:text-brand-primary transition-colors text-sm">administracion@infocemservices.com</a>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-secondary font-black mb-8 uppercase tracking-widest text-sm">Institucional</h4>
              <ul className="space-y-4 text-white/70 font-medium">
                <li><a href="#" className="hover:text-brand-primary transition-colors underline decoration-brand-primary/30">Términos del Servicio</a></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors underline decoration-brand-primary/30">Política de Privacidad</a></li>
                <li><a href="#servicios" className="hover:text-brand-primary transition-colors underline decoration-brand-primary/30">Nuestros Servicios</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 text-center flex flex-col gap-4">
            <div className="h-1 w-32 bg-gradient-to-r from-brand-secondary to-brand-primary mx-auto rounded-full"></div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              Desarrollado y producido por <a href="https://impulsoit.com/" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">impulsoit.com</a> — Todos los derechos reservados &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <a 
          href={WHATSAPP_FLOAT_LINK}
          className="flex items-center justify-center gap-3 bg-brand-primary text-white font-black py-4 px-6 rounded-2xl animate-pulse-green shadow-2xl hover:scale-105 hover:bg-brand-secondary transition-all group"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="hidden md:block uppercase tracking-widest text-sm">¡Consultanos!</span>
        </a>
      </div>
    </div>
  );
}
