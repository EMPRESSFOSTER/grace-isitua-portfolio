import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, Twitter, Instagram, Sparkles, GraduationCap, Building2, Palette } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-[#e5e5e5] font-sans selection:bg-purple-900 selection:text-white relative">
      {/* Animated Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Color Blobs with reduced opacity */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full filter blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-pink-600/5 rounded-full filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-600/5 rounded-full filter blur-[120px] animate-blob animation-delay-4000"></div>

        {/* Floating Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-[10%] left-[5%] text-purple-500/10 animate-float text-6xl" style={{ animationDuration: '12s' }}>▲</div>
          <div className="absolute top-[40%] right-[10%] text-pink-500/10 animate-float text-7xl" style={{ animationDuration: '15s', animationDelay: '2s' }}>+</div>
          <div className="absolute bottom-[15%] left-[20%] border-2 border-blue-500/10 rounded-full w-16 h-16 animate-float" style={{ animationDuration: '18s', animationDelay: '4s' }}></div>
          <div className="absolute top-[65%] left-[8%] text-orange-500/10 animate-float text-5xl" style={{ animationDuration: '14s', animationDelay: '1s' }}>×</div>
          <div className="absolute top-[15%] right-[25%] text-purple-500/10 animate-float text-4xl" style={{ animationDuration: '20s', animationDelay: '5s' }}>▲</div>
          <div className="absolute bottom-[35%] right-[15%] text-pink-500/10 animate-float text-5xl" style={{ animationDuration: '16s', animationDelay: '3s' }}>+</div>
          <div className="absolute top-[50%] left-[45%] border-2 border-orange-500/10 rounded-full w-8 h-8 animate-float" style={{ animationDuration: '13s', animationDelay: '6s' }}></div>
          <div className="absolute bottom-[10%] right-[40%] text-blue-500/10 animate-float text-6xl" style={{ animationDuration: '19s', animationDelay: '2s' }}>×</div>
        </div>
      </div>

      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-all font-medium group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back Home
          </Link>
          <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-white">
            Grace<span className="text-purple-500">Isitua.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/catalogue" className="text-sm font-medium hover:text-purple-400 text-gray-400 transition-colors hidden md:block">Catalogue</Link>
            <Link 
              href="https://wa.me/2349015028666?text=Hello%20Grace%20%F0%9F%91%8B%0AI%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20learning%20more%20about%20your%20services.%20Please%20I%27d%20like%20to%20discuss%20a%20project%20with%20you." 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full transition-all border border-white/10 text-sm"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center py-12 md:py-24">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                The Story Behind the Vision
              </div>
              <h1 className="text-5xl md:text-8xl font-bold font-heading leading-none tracking-tight text-white drop-shadow-2xl">
                Creative Mind, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">Strategic Soul.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed">
                I help brands find their digital heartbeat. By blending elite design with performance technology, I turn complex challenges into seamless online experiences.
              </p>
              <div className="flex gap-4">
                <Link href="https://www.linkedin.com/in/isitua-grace/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="https://x.com/AntonyGrace20" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="https://www.instagram.com/grace_isitua/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="https://wa.me/2349015028666" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#25D366] transition-all">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </Link>
                <Link href="tel:09015028666" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-green-500 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16.42V19.956C21 20.531 20.531 21 19.956 21C16.611 21 13.402 19.674 11.037 17.309C8.671 14.943 7.345 11.734 7.345 8.389C7.345 7.854 7.854 7.345 8.389 7.345H11.965C12.5 7.345 12.982 7.747 13.048 8.271L13.567 11.458C13.633 11.897 13.486 12.338 13.167 12.646L11.642 14.171C12.721 16.035 14.269 17.583 16.133 18.662L17.658 17.137C17.966 16.818 18.407 16.671 18.846 16.737L22.033 17.256C22.557 17.322 23 17.804 23 18.339V21.875" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="mailto:graceantony202@gmail.com?subject=Project%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="relative group animate-fade-in-right">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 glass-card">
                <Image 
                  src="/grace-portrait.jpeg" 
                  alt="Grace Isitua Portrait" 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] hover:grayscale-0"
                />
              </div>
            </div>
          </div>

          {/* Pillars Section */}
          <div className="grid md:grid-cols-3 gap-8 py-20">
             <div className="glass-card p-10 rounded-3xl border border-white/5 group hover:border-purple-500/30 transition-all duration-500">
                <Building2 className="w-10 h-10 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Entrepreneur</h3>
                <p className="text-gray-400 leading-relaxed italic">"Building scalable online platforms for brands to establish a world-class online presence."</p>
             </div>
             <div className="glass-card p-10 rounded-3xl border border-white/5 group hover:border-pink-500/30 transition-all duration-500 bg-white/5">
                <Palette className="w-10 h-10 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Creator</h3>
                <p className="text-gray-400 leading-relaxed italic">"Crafting modern, responsive, and performance-optimized digital assets that bridge the gap between art and code."</p>
             </div>
             <div className="glass-card p-10 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all duration-500">
                <GraduationCap className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Educator</h3>
                <p className="text-gray-400 leading-relaxed italic">"Empowering individuals and startups through high-impact tech education and strategic digital mentorship."</p>
             </div>
          </div>

          {/* Detailed Narrative Section */}
          <div className="max-w-4xl mx-auto py-24 space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">The Intersection of Tech & Creativity</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            <div className="text-lg text-gray-300 space-y-8 leading-relaxed">
              <p>
                Grace Isitua is a creative technology professional, digital entrepreneur, and educator with expertise spanning web design, graphic design, digital marketing, and social media management. She works at the <span className="text-white font-bold">intersection of technology, creativity, and business growth</span>, helping individuals, startups, and organizations build strong digital identities and scalable online platforms.
              </p>
              <p>
                As a web designer and developer, Grace specializes in building modern, responsive, and user-friendly websites that help brands establish a strong online presence. She works with core technologies such as <span className="text-purple-400 font-medium">JavaScript, TypeScript, PHP, Python, and SQL</span>, enabling her to create fast, scalable, and performance-optimized applications. Her work focuses on combining functionality, clean design, and user experience to deliver websites that are both visually appealing and strategically effective.
              </p>
              <p>
                Beyond her technical work, Grace is a lead figure in growing massive online communities, with a background in digital marketing and social media management. Her approach is rooted in <span className="text-pink-400 font-medium">data-driven growth</span> and high-impact storytelling, ensuring that every project not only looks great but drives measurable results.
              </p>
            </div>
          </div>
          
          {/* Quote Section */}
          <div className="py-24 text-center">
            <div className="glass-card p-16 rounded-[4rem] border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-orange-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <span className="text-8xl text-purple-500/20 absolute top-10 left-10 italic">"</span>
               <h2 className="text-3xl md:text-5xl font-bold text-white italic max-w-4xl mx-auto leading-tight relative z-10">
                The future belongs to those who bridge the gap between what is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">technically possible</span> and what is <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">creatively breathtaking.</span>
               </h2>
               <div className="mt-12 text-gray-500 font-medium tracking-widest uppercase">— Grace Isitua</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex gap-6">
            <Link href="https://www.linkedin.com/in/isitua-grace/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="https://x.com/AntonyGrace20" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/grace_isitua/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://wa.me/2349015028666?text=Hello%20Grace%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business.%20I%20would%20like%20to%20get%20more%20details." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </Link>
            <Link href="mailto:graceantony202@gmail.com?subject=Project%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Grace Isitua. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
