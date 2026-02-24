/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_LINK = "https://wa.link/62av5e";
const WHATSAPP_FLOAT_LINK = "https://wa.link/ykyxe9";

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10 flex shrink-0">
      <div className="absolute inset-0 bg-brand-green skew-x-[-20deg] translate-x-[-4px]"></div>
      <div className="absolute inset-0 bg-zinc-800 skew-x-[-20deg] translate-x-[4px]"></div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-xl font-black tracking-tighter text-white">
        CEM<span className="text-brand-green">SERVICES</span>
      </span>
      <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
        Calibración de equipos y detectores
      </span>
    </div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      title: "Calibración de Detectores de Gas",
      desc: "Calibración con gases patrón certificados. Trazabilidad completa y certificado post-calibración incluido.",
      icon: <Activity className="w-8 h-8 text-brand-green" />
    },
    {
      title: "Detectores Portátiles",
      desc: "ALTAIR 5X, 4X, 2X y similares. Detección de H₂S, CO, O₂, LEL, SO₂ y VOCs certificada.",
      icon: <Smartphone className="w-8 h-8 text-brand-green" />
    },
    {
      title: "Detectores Fijos y de Llama",
      desc: "ULTIMA X5000, S5000 y similares. Calibración para monitoreo continuo 24/7 en zonas clasificadas.",
      icon: <Flame className="w-8 h-8 text-brand-green" />
    },
    {
      title: "Reparación y Mantenimiento",
      desc: "Reemplazo de sensores, firmware, inspección IP65/IP66 y verificación de alarmas.",
      icon: <Wrench className="w-8 h-8 text-brand-green" />
    },
    {
      title: "Bump Test / Verificación Funcional",
      desc: "Prueba de respuesta real ante gas. Informe técnico de resultado incluido.",
      icon: <ShieldCheck className="w-8 h-8 text-brand-green" />
    },
    {
      title: "Puesta en Marcha",
      desc: "Configuración inicial, parametrización de umbrales y integración con sistemas de emergencia.",
      icon: <Settings className="w-8 h-8 text-brand-green" />
    }
  ];

  const differentials = [
    {
      title: "Traslado Sin Cargo",
      desc: "Retiramos y devolvemos tu equipo sin costo adicional.",
      icon: <Truck className="w-12 h-12 text-brand-green mb-4" />
    },
    {
      title: "Certificado Incluido",
      desc: "Cada trabajo incluye informe técnico y certificado de calibración con trazabilidad.",
      icon: <FileText className="w-12 h-12 text-brand-green mb-4" />
    },
    {
      title: "Respuesta Inmediata",
      desc: "Coordinamos por WhatsApp al instante. Sin burocracia.",
      icon: <Zap className="w-12 h-12 text-brand-green mb-4" />
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
    <div className="min-h-screen bg-black selection:bg-brand-green selection:text-black">
      {/* Background Glow Blobs */}
      <div className="glow-mesh">
        <div className="glow-blob top-[-10%] left-[-10%] animate-drift" />
        <div className="glow-blob bottom-[-10%] right-[-10%] animate-drift" style={{ animationDelay: '-5s' }} />
        <div className="glow-blob top-[40%] right-[20%] animate-drift" style={{ animationDelay: '-10s', opacity: 0.05 }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
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
                  className="text-sm font-medium hover:text-brand-green transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                href={WHATSAPP_LINK} 
                className="btn-primary py-2 px-4 text-sm"
              >
                WhatsApp
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
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
              className="md:hidden bg-zinc-900 border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Servicios</a>
                <a href="#diferencial" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Diferencial</a>
                <a href="#ubicacion" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Ubicación</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Contacto</a>
                <a href={WHATSAPP_LINK} className="btn-primary w-full">
                  Contactar ahora
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:h-screen flex items-center pt-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHR4eXh4eXh4eXh4eXh4eXh4eXh4eXh4eXh4eXh4eXh4eXh4eXh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx8W4XW6qc/giphy.gif" 
            alt="Industrial Motion" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1920" 
            alt="Industrial Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block mb-6">
                <span className="badge-animated">
                  🚗 Traslado de equipos SIN CARGO
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-4 tracking-tighter">
                TU EQUIPO <br />
                <span className="text-brand-green italic">CALIBRADO.</span> <br />
                TU OPERACIÓN <br />
                <span className="text-brand-green italic">SEGURA.</span>
              </h1>
              <p className="text-base md:text-lg text-zinc-400 mb-8 leading-relaxed max-w-xl">
                Especialistas en calibración de detectores de gas para la industria Oil & Gas. 
                Garantizamos precisión técnica y cumplimiento normativo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WHATSAPP_LINK} className="btn-primary text-base px-6 py-3 group">
                  Solicitar calibración ahora 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </a>
                <a href="#servicios" className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                  Ver servicios
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-brand-green/20 blur-[100px] rounded-full animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                alt="Equipment" 
                className="relative z-10 rounded-3xl border border-white/10 shadow-2xl animate-float"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl z-20 animate-float" style={{ animationDelay: '-3s' }}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-green rounded-full">
                    <ShieldCheck className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest">Certificación</p>
                    <p className="text-xl font-black">ISO / ATEX</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">NUESTROS SERVICIOS</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Soluciones integrales de calibración y mantenimiento con los más altos estándares de calidad.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 rounded-3xl group transition-all duration-500 hover:border-brand-green hover:shadow-[0_0_40px_rgba(0,191,99,0.15)]"
              >
                <div className="mb-6 p-4 bg-brand-green/5 rounded-2xl inline-block group-hover:bg-brand-green group-hover:text-black transition-all duration-500">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-10 h-10 transition-colors group-hover:text-black" })}
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-brand-green transition-colors">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section id="diferencial" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {differentials.map((diff, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center group"
              >
                <div className="p-6 rounded-full bg-zinc-900 mb-6 group-hover:bg-brand-green transition-all duration-500 group-hover:rotate-12">
                  {React.cloneElement(diff.icon as React.ReactElement, { className: "w-12 h-12 text-brand-green group-hover:text-black transition-colors" })}
                </div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">{diff.title}</h3>
                <p className="text-zinc-400 text-lg">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gases Section */}
      <section className="py-24 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Detectores de todos los gases críticos en Oil & Gas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {gases.map((gas, idx) => (
              <motion.span 
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="px-8 py-3 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-full text-xl font-bold"
              >
                {gas}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-brand-green/90 text-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10">
          <div className="bg-black p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-brand-green" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black mb-4 uppercase italic">¿Por qué calibrar?</h2>
            <p className="text-xl font-medium mb-6 leading-relaxed">
              Un detector sin calibración vigente es una <span className="underline decoration-4">NO CONFORMIDAD</span> ante auditorías ATEX / IECEx / SRT / ISO. 
              No esperes a que falle — mantené tus equipos en norma.
            </p>
            <a href={WHATSAPP_LINK} className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:scale-105 transition-transform">
              Calibrá hoy <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Cómo Trabajamos</h2>
            <p className="text-zinc-400">Proceso ágil y transparente para tu comodidad.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-zinc-900 border-2 border-brand-green text-brand-green rounded-full flex items-center justify-center text-2xl font-black mb-6 group-hover:bg-brand-green group-hover:text-black transition-all duration-300">
                  {step.num}
                </div>
                <p className="text-lg font-bold">{step.text}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-brand-green/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="ubicacion" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Ubicación</h2>
            <p className="text-zinc-400">Visitanos en nuestro taller especializado en Neuquén.</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 h-[450px] shadow-2xl">
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
              className="text-brand-green hover:underline font-bold text-lg"
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-3xl border-brand-green/40">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solicitá tu Presupuesto</h2>
              <p className="text-zinc-400">Completá el formulario y te contactaremos por WhatsApp al instante.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 focus:border-brand-green outline-none transition-colors"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Empresa</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 focus:border-brand-green outline-none transition-colors"
                    placeholder="Nombre de la empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Teléfono</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 focus:border-brand-green outline-none transition-colors"
                    placeholder="Ej: +54 9 11 ..."
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Tipo de equipo</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 focus:border-brand-green outline-none transition-colors appearance-none"
                    value={formData.equipo}
                    onChange={(e) => setFormData({...formData, equipo: e.target.value})}
                  >
                    <option>Detector Portátil</option>
                    <option>Detector Fijo</option>
                    <option>Detector de Llama</option>
                    <option>Reparación / Mantenimiento</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Mensaje / Consulta</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 focus:border-brand-green outline-none transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-lg">
                Enviar consulta por WhatsApp <MessageCircle className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-zinc-400 max-w-sm mb-6">
                Líderes en servicios técnicos para la industria Oil & Gas. 
                Especialistas en seguridad y precisión.
              </p>
              <div className="flex gap-4">
                <a href={WHATSAPP_LINK} className="p-2 bg-zinc-900 rounded-full hover:bg-brand-green hover:text-black transition-all">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span>Av. Del Trabajador 4185, Neuquén</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span>cemservices.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-brand-green transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-brand-green transition-colors">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-zinc-500 text-sm">
            este sitio web fue desarrollado y producido por <a href="https://impulsoit.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">https://impulsoit.com/</a> todos los derechos reservados
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <a 
          href={WHATSAPP_FLOAT_LINK}
          className="flex items-center justify-center gap-2 bg-brand-green text-black font-bold py-2.5 px-4 rounded-full animate-pulse-green shadow-[0_0_20px_rgba(0,191,99,0.4)] hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">¡Consultanos!</span>
        </a>
      </div>
    </div>
  );
}
