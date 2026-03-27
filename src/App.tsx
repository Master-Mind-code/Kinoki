/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight,
  MapPin,
  User,
  Package,
  AlertTriangle,
  Camera,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// Initialisation de l'IA pour la génération d'image "améliorée"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    city: 'Bouaké',
    neighborhood: '',
    quantity: '1'
  });

  const [showSticky, setShowSticky] = useState(false);
  const [heroImage, setHeroImage] = useState('https://picsum.photos/seed/kinoki/800/800');
  const [isGenerating, setIsGenerating] = useState(false);

  // Photos réelles supprimées à la demande de l'utilisateur

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Génération d'une image "améliorée" au chargement
    generateImprovedImage();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateImprovedImage = async () => {
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: "Professional e-commerce product photography of Kinoki Cleansing Detox Foot Pads. A high-quality box of Kinoki patches next to a few individual white patch sachets. Clean, bright studio lighting, soft shadows, white background with subtle green bamboo accents. 8k resolution, photorealistic, sharp focus, commercial quality." }
          ]
        }
      });
      
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setHeroImage(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error("Erreur de génération d'image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const isBouake = formData.city === 'Bouaké';
    const deliveryType = isBouake ? 'Livraison' : 'Expédition';
    
    const message = `Bonjour ! Je souhaite commander ${formData.quantity} boîte(s) de Kinoki Detox.
📍 ${deliveryType} à : ${formData.city} / ${formData.neighborhood}.
👤 Client : ${formData.fullName}.
Merci de me confirmer le montant total avec les frais de ${deliveryType.toLowerCase()} depuis Bouaké.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2250709905419?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-gray-900 selection:bg-[#22c55e] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#22c55e]">Kinoki Detox</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#benefits" className="hover:text-[#22c55e] transition-colors">Avantages</a>
            <a href="#how-it-works" className="hover:text-[#22c55e] transition-colors">Comment ça marche</a>
            <a href="#order-form" className="hover:text-[#22c55e] transition-colors">Commander</a>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-[#22c55e] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#16a34a] transition-all shadow-lg shadow-green-200"
          >
            Commander
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-rows-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Star className="w-3 h-3 fill-current" />
                Produit N°1 Bien-être à Bouaké
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900">
                Purifiez votre corps <span className="text-[#22c55e]">pendant votre sommeil</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Éliminez les toxines accumulées, réduisez le stress et retrouvez un sommeil réparateur avec les patchs Kinoki. Une cure simple de 5 jours pour revitaliser votre organisme.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToForm}
                  className="flex-1 bg-[#22c55e] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#16a34a] transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-200"
                >
                  Commander maintenant
                  <ChevronRight className="w-5 h-5" />
                </button>
                <a 
                  href="https://vm.tiktok.com/ZMAnDNQvK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:border-[#22c55e] hover:text-[#22c55e] transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Voir le guide (Vidéo)
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 bg-red-500 text-white px-6 py-3 rounded-2xl font-black text-xl rotate-12 shadow-xl z-10 animate-pulse">
                STOCK LIMITÉ !
              </div>
              <div className="bg-gradient-to-br from-green-100 to-white p-8 rounded-[2.5rem] relative overflow-hidden min-h-[400px] flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-gray-400">Amélioration de l'image...</p>
                  </div>
                ) : (
                  <img 
                    src={heroImage} 
                    alt="Kinoki Detox Foot Pads" 
                    className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white/50 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Format</p>
                    <p className="font-bold text-gray-900">Boîte de 10 patchs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase">Cure</p>
                    <p className="font-bold text-[#22c55e]">5 Jours complets</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Zoom Section */}
        <section className="py-20 bg-[#f3f4f6]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white p-4 rounded-[2.5rem] shadow-xl">
                  <img 
                    src="https://picsum.photos/seed/kinoki-detail/800/600" 
                    alt="Détail des patchs" 
                    className="w-full h-auto rounded-3xl"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/kinoki-detail/800/600`;
                    }}
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 bg-white text-[#22c55e] px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                  <Eye className="w-4 h-4" />
                  Qualité Supérieure
                </div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  Conception <span className="text-[#22c55e]">Naturelle</span> & Efficace
                </h2>
                <p className="text-gray-600 text-lg">
                  Nos patchs utilisent des extraits naturels de bambou pour une détoxification douce et efficace pendant votre sommeil. Chaque boîte contient 10 patchs emballés individuellement.
                </p>
                <ul className="space-y-4">
                  {[
                    "Extraits de vinaigre de bambou",
                    "Adhésif doux pour la peau",
                    "Ingrédients 100% naturels",
                    "Efficacité visible dès le matin"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-700">
                      <CheckCircle2 className="text-[#22c55e] w-5 h-5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-[#f3f4f6]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Pourquoi choisir Kinoki ?</h2>
              <p className="text-gray-600">Une solution naturelle et efficace pour purifier votre corps sans effort.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Élimination des Toxines", desc: "Purifie votre organisme en profondeur pendant la nuit.", icon: ShieldCheck },
                { title: "Réduction du Stress", desc: "Aide à apaiser les tensions nerveuses et la fatigue.", icon: Clock },
                { title: "Sommeil Réparateur", desc: "Retrouvez des nuits calmes et un réveil énergique.", icon: Star },
                { title: "Soulagement Douleurs", desc: "Atténue les douleurs articulaires et musculaires.", icon: CheckCircle2 },
              ].map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="text-[#22c55e] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-[#151619] rounded-[3rem] overflow-hidden relative">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-12 md:p-20 space-y-8">
                  <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 text-[#22c55e] px-4 py-2 rounded-full text-sm font-bold">
                    <PlayCircle className="w-4 h-4" />
                    Guide d'utilisation
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    Comment ça marche ?
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Appliquez les patchs sous vos pieds avant de dormir. Le matin, retirez-les et constatez l'élimination des toxines (le patch devient noir).
                  </p>
                  <a 
                    href="https://vm.tiktok.com/ZMAnDNQvK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#22c55e] hover:text-white transition-all group"
                  >
                    🎥 Voir la démonstration sur TikTok
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[#22c55e] to-green-800 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                  >
                    <PlayCircle className="text-white w-12 h-12" />
                  </motion.div>
                  {/* Decorative elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 left-10 w-32 h-32 bg-black/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="py-20 bg-[#f3f4f6]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <h2 className="text-4xl font-black leading-tight">
                  Prêt à transformer <br />
                  <span className="text-[#22c55e]">votre bien-être ?</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <MapPin className="text-[#22c55e] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Bouaké : Livraison Locale</h4>
                      <p className="text-gray-500">Livraison rapide à domicile ou au bureau partout dans la ville de Bouaké.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <Truck className="text-[#22c55e] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Autres Villes : Expédition</h4>
                      <p className="text-gray-500">Expédition sécurisée par transporteur (UTB, AVS, etc.) à la charge du client.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                      <ShieldCheck className="text-[#22c55e] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#22c55e]">Qualité Garantie</h4>
                      <p className="text-gray-500">Produits authentiques Kinoki pour une détoxification naturelle et efficace.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 text-[#22c55e] mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "Depuis que j'utilise les patchs Kinoki, je dors beaucoup mieux et je me sens moins fatigué au réveil. C'est vraiment efficace !"
                  </p>
                  <p className="font-bold">— Kouassi A., Bouaké</p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-2">Formulaire de Commande</h3>
                  <p className="text-gray-500">Remplissez vos infos pour valider sur WhatsApp.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#22c55e]" />
                      Nom Complet
                    </label>
                    <input 
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Kouassi"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#22c55e] focus:bg-white rounded-2xl outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#22c55e]" />
                        Ville
                      </label>
                      <select 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#22c55e] focus:bg-white rounded-2xl outline-none transition-all appearance-none"
                      >
                        <option value="Bouaké">Bouaké (Local)</option>
                        <option value="Abidjan">Abidjan</option>
                        <option value="Yamoussoukro">Yamoussoukro</option>
                        <option value="Korhogo">Korhogo</option>
                        <option value="Autre">Autre ville</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#22c55e]" />
                        Quartier précis
                      </label>
                      <input 
                        required
                        type="text"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        placeholder="Ex: Commerce, Air France..."
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#22c55e] focus:bg-white rounded-2xl outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#22c55e]" />
                      Quantité de boîtes
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {['1', '2', '3', '5'].map(q => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, quantity: q }))}
                          className={`py-3 rounded-xl font-bold transition-all border-2 ${
                            formData.quantity === q 
                              ? 'bg-[#22c55e] border-[#22c55e] text-white shadow-lg shadow-green-200' 
                              : 'bg-gray-50 border-transparent text-gray-600 hover:border-gray-200'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#22c55e] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#16a34a] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-200 mt-8"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Valider ma commande
                  </button>
                  <p className="text-center text-xs text-gray-400 font-medium">
                    Paiement à la livraison ou expédition sécurisée.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center">
              <ShieldCheck className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">Kinoki Detox Bouaké</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Boutique physique située à Bouaké, Côte d'Ivoire.
          </p>
          <div className="flex justify-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <span>© 2026 Kinoki Detox</span>
            <span>•</span>
            <span>Livraison Partout</span>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Button */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-4 right-4 z-[60] md:hidden"
          >
            <button 
              onClick={scrollToForm}
              className="w-full bg-[#22c55e] text-white py-4 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
              Commander sur WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
