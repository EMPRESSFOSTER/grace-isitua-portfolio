import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";

const graphicsCatalogue = [
  {
    id: 1,
    title: "Brand Guideline Book",
    category: "Brand Identity",
    image: "/design-brand-guideline.jpg",
  },
  {
    id: 2,
    title: "Arrow Logo System",
    category: "Logo Design",
    image: "/design-arrow-logo.png",
  },
  {
    id: 3,
    title: "Fruity Zobo Drink Flyer",
    category: "Marketing Materials",
    image: "/design-zobo-drink.jpg",
  },
  {
    id: 4,
    title: "Empresstech Business Flyer",
    category: "Marketing Materials",
    image: "/design-empresstech.jpg",
  },
  {
    id: 5,
    title: "Sucy Couture Valentines Offer",
    category: "Marketing Materials",
    image: "/design-sucy-couture.jpg",
  },
  {
    id: 6,
    title: "Happy New Month May",
    category: "Social Media Graphics",
    image: "/design-new-month-may.jpg",
  },
  {
    id: 7,
    title: "Welcome to August",
    category: "Social Media Graphics",
    image: "/design-august.jpg",
  },
  {
    id: 8,
    title: "Monday Motivation",
    category: "Social Media Graphics",
    image: "/design-monday-motivation.jpg",
  },
  {
    id: 9,
    title: "Happy New Week Aurora",
    category: "Social Media Graphics",
    image: "/design-new-week-aurora.jpg",
  },
  {
    id: 10,
    title: "Happy New Week Kadence",
    category: "Social Media Graphics",
    image: "/design-new-week-kadence.jpg",
  },
];

export default function Catalogue() {
  return (
    <div className="min-h-screen text-[#e5e5e5] font-sans selection:bg-purple-900 selection:text-white relative">
      {/* Animated Floating Background Video */}
      <div className="fixed top-[-10%] left-[-10%] w-[120%] h-[120%] overflow-hidden pointer-events-none z-0 animate-float" style={{ animationDuration: '12s' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30"
        >
          {/* Using the uploaded network background video */}
          <source src="/Video%20background.mp4" type="video/mp4" />
        </video>
        
        {/* Color Blobs Behind Video */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-white">
            Grace<span className="text-purple-500">Isitua.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/#services" className="hover:text-purple-400 transition-colors">Expertise</Link>
            <Link href="/#work" className="hover:text-purple-400 transition-colors">Case Studies</Link>
            <Link href="/catalogue" className="text-white hover:text-purple-400 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">Catalogue</Link>
            <Link 
              href="https://wa.me/2349015028666?text=Hello%20Grace%20%F0%9F%91%8B%0AI%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20learning%20more%20about%20your%20services.%20Please%20I%27d%20like%20to%20discuss%20a%20project%20with%20you." 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all border border-white/10 hover:border-purple-500/50"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 overflow-hidden relative z-10 bg-black/40 backdrop-blur-sm min-h-screen">
        {/* Header Section */}
        <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium mb-4 glass-card backdrop-blur-md">
            Creative Portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-6">
            Graphic <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Design</span> Catalogue
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            A curated collection of brand identities, social media campaigns, UI/UX designs, and marketing assets crafted to elevate modern brands.
          </p>
        </header>

        {/* Masonry-Style Grid for Catalogue */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graphicsCatalogue.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/5] relative w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    className="group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  
                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 border border-white/20 hover:bg-pink-500 hover:border-pink-500 cursor-pointer">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <p className="text-pink-400 text-sm font-bold tracking-widest uppercase mb-2 drop-shadow-md">{item.category}</p>
                    <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center px-6 py-20">
          <div className="glass-card p-12 rounded-[3xl] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-pink-500/10 to-transparent blur-3xl -z-10" />
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">Need custom graphics?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Let's craft visually compelling assets that communicate your brand's clear message.</p>
            <Link 
              href="https://wa.me/2349015028666?text=Hello%20Grace%20%F0%9F%91%8B%0AI%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20learning%20more%20about%20your%20services.%20Please%20I%27d%20like%20to%20discuss%20a%20project%20with%20you." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* WhatsApp Floating Button */}
        <Link 
          href="https://wa.me/2349015028666?text=Hello%20Grace%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business.%20I%20would%20like%20to%20get%20more%20details." 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] group flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <div className="absolute -inset-2 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:rotate-6 transition-all duration-300">
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </Link>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex gap-6">
            <Link href="https://www.linkedin.com/in/isitua-grace/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </Link>
            <Link href="https://x.com/AntonyGrace20" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="https://www.instagram.com/grace_isitua/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
            <Link href="https://wa.me/2349015028666?text=Hello%20Grace%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business.%20I%20would%20like%20to%20get%20more%20details." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </Link>
            <Link href="mailto:graceantony202@gmail.com?subject=Project%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099l3.83-3.104 5.612 8.818h-18.895l5.629-8.813zm9.201-1.259l4.623-3.746v9.458l-4.623-5.712z"/></svg>
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Grace Isitua. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
