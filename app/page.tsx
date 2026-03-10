import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Rocket, TrendingUp, MonitorPlay, Linkedin, Twitter, Instagram, Mail, Zap, Shield, Globe, Users } from "lucide-react";

export default function Home() {
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
            <Link href="#services" className="hover:text-purple-400 transition-colors">Expertise</Link>
            <Link href="#work" className="hover:text-purple-400 transition-colors">Case Studies</Link>
            <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link href="/catalogue" className="hover:text-purple-400 transition-colors">Catalogue</Link>
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

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -z-10" />
          
          <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in relative z-10 w-full max-w-4xl pt-10">
            <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4 glass-card backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Creative Tech Professional & Educator
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-heading leading-[1.1] tracking-tight text-white drop-shadow-2xl relative">
              {/* Decorative Shapes Inspiried by Shoppadi */}
              <div className="absolute -top-10 -left-10 w-8 h-8 text-purple-500/40 animate-bounce delay-700 hidden md:block select-none">▲</div>
              <div className="absolute top-20 -right-20 w-8 h-8 text-pink-500/40 animate-pulse hidden md:block select-none">+</div>
              <div className="absolute -bottom-10 left-1/4 w-6 h-6 border-2 border-blue-500/30 rounded-full animate-float hidden md:block select-none"></div>
              <div className="absolute bottom-20 -left-20 w-8 h-8 text-orange-500/40 animate-spin-slow hidden md:block select-none">×</div>

              Elevating brands through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">design & tech.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mt-6">
              Working at the intersection of technology, creativity, and business growth. I help individuals, startups, and organizations build strong digital identities and scalable online platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-8 w-full justify-center">
              <Link href="#contact" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all">
                Let's Build Together
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#work" className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-lg text-white glass-card border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
                View Selected Works
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-md py-10 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {[ 
              "JavaScript", "TypeScript", "PHP", "Python", "SQL", 
              "JavaScript", "TypeScript", "PHP", "Python", "SQL",
              "JavaScript", "TypeScript", "PHP", "Python", "SQL",
              "JavaScript", "TypeScript", "PHP", "Python", "SQL"
            ].map((tech, i) => (
              <div key={i} className="flex items-center gap-6 mx-12">
                <span className="text-3xl md:text-5xl font-black text-white/20 uppercase tracking-tighter hover:text-purple-500 transition-colors cursor-default select-none">{tech}</span>
                <div className="w-2 h-2 rounded-full bg-purple-500/30"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">My Expertise</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">A multidisciplinary approach blending development, design, marketing, and education.</p>
             </div>
             
             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 md:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-white/5 hover:border-blue-500/30 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shrink-0">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow">Building modern, performance-optimized applications using JavaScript, TypeScript, PHP, Python, and SQL.</p>
                </div>

                <div className="glass-card p-6 md:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-white/5 hover:border-pink-500/30 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Graphic Design</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow">Creating visually compelling brand assets, logos, and UI designs using tools like Photoshop, Illustrator, Canva, and Figma.</p>
                </div>
                
                <div className="glass-card p-6 md:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-white/5 hover:border-purple-500/30 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Digital Marketing</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow">Leading strategic social media campaigns, content strategy, and growing massive online communities across all major platforms.</p>
                </div>

                <div className="glass-card p-6 md:p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group border border-white/5 hover:border-emerald-500/30 flex flex-col h-full">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform shrink-0">
                    <MonitorPlay className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Tech Education</h3>
                  <p className="text-gray-400 leading-relaxed text-sm flex-grow">Empowering aspiring creatives and professionals with practical tech skills to leverage technology for innovation and digital ventures.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Enhanced Why Partner Section */}
        <section className="px-6 py-32 relative z-10 border-t border-white/5 bg-transparent">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
                Value Proposition
              </div>
              <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight">
                Why Partner With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">Grace Isitua</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Choosing a partner for your digital journey is a strategic decision. I don't just build assets; I craft ecosystems that drive results and establish authority.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Feature 1: Rapid Deployment */}
              <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-all duration-700" />
                <div className="flex flex-col md:flex-row gap-12 items-center h-full">
                  <div className="space-y-6 flex-1">
                    <div className="w-16 h-16 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">Rapid Deployment <br />Execution</h3>
                    <p className="text-gray-400 text-lg leading-relaxed italic">
                      "I help you go from concept to live production in record time, ensuring your message hits the market while the opportunity is fresh."
                    </p>
                    <div className="flex gap-4 pt-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live in Weeks
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Agile Workflow
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center">
                      <h4 className="text-3xl font-bold text-white mb-1">99%</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Uptime Rate</p>
                    </div>
                    <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center">
                      <h4 className="text-3xl font-bold text-white mb-1">2x</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Faster MVP</p>
                    </div>
                    <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center">
                      <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Responsive</p>
                    </div>
                    <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center text-center">
                      <h4 className="text-3xl font-bold text-white mb-1">Elite</h4>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Standard</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Built for Scale */}
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-700 bg-gradient-to-b from-transparent to-blue-500/5">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] -z-10 translate-x-1/4 translate-y-1/4 group-hover:bg-blue-500/20 transition-all duration-700" />
                <div className="space-y-8 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                      <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">Built for Global <br />Scalability</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Architectures designed to handle massive traffic and data growth seamlessly across multiple regions and devices.
                    </p>
                  </div>
                  <div className="pt-6 relative">
                     <div className="h-24 w-full bg-blue-500/5 rounded-2xl border border-blue-500/10 relative overflow-hidden flex items-end px-2 pb-2 gap-1">
                        {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                           <div key={i} className="flex-1 bg-blue-500/30 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 150}ms` }} />
                        ))}
                     </div>
                  </div>
                </div>
              </div>

              {/* Stat 1: Brands */}
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative group hover:border-purple-500/20 transition-all duration-500">
                 <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2 border border-purple-500/10">
                       <Shield className="w-7 h-7" />
                    </div>
                    <h3 className="text-6xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">50+</h3>
                    <div>
                       <p className="text-white font-bold text-lg">Brands Transformed</p>
                       <p className="text-sm text-gray-500">Across 3 Continents</p>
                    </div>
                 </div>
              </div>

              {/* Stat 2: Students */}
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative group hover:border-pink-500/20 transition-all duration-500 bg-white/[0.01]">
                 <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 mb-2 border border-pink-500/10">
                       <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-6xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">10k+</h3>
                    <div>
                       <p className="text-white font-bold text-lg">Students Impacted</p>
                       <p className="text-sm text-gray-500">Through Tech Mentorship</p>
                    </div>
                 </div>
              </div>

              {/* Stat 3: Experience */}
              <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative group hover:border-orange-500/20 transition-all duration-500">
                 <div className="flex flex-col items-center text-center gap-4 h-full justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2 border border-orange-500/10">
                       <TrendingUp className="w-7 h-7" />
                    </div>
                    <h3 className="text-6xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">9+</h3>
                    <div>
                       <p className="text-white font-bold text-lg">Years of Experience</p>
                       <p className="text-sm text-gray-500">In Design & Development</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="work" className="px-6 py-24 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">Selected Works</h2>
                <p className="text-gray-400 max-w-2xl">A showcase of modern platforms built for scale and conversion.</p>
              </div>
              <Link href="#" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                View all projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-24">
              {/* Project 1: Shoppadi */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 space-y-6">
                  <div className="text-xs font-bold tracking-widest text-blue-500 uppercase">E-Commerce Solution</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">Shoppadi E-commerce Suite</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">A powerful platform allowing businesses to build online stores in minutes. Features a high-converting store builder, custom domains, and integrated payment systems designed for the African market.</p>
                  <div className="flex gap-3 flex-wrap">
                    {["Next.js", "Tailwind CSS", "PostgreSQL", "React"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-sm rounded-full border border-white/10 bg-white/5 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2 w-full aspect-[4/3] relative rounded-3xl overflow-hidden border border-white/10 group">
                  <Image src="/shoppadi.png" alt="Shoppadi E-commerce" fill style={{ objectFit: "cover", objectPosition: "top" }} className="group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

               {/* Project 2: Sunbridge Consulting */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden border border-white/10 group">
                  <Image src="/sunbridge-placeholder.png" alt="Sunbridge Consulting" fill style={{ objectFit: "cover", objectPosition: "top" }} className="group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="space-y-6">
                  <div className="text-xs font-bold tracking-widest text-pink-500 uppercase">Financial & Business Growth</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">Sunbridge Consulting</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">A modern, high-converting digital platform empowering MSMEs to achieve sustainable growth. Features a dynamic layout to help businesses build strong financial systems, achieve compliance, and access funding across Africa.</p>
                   <div className="flex gap-3 flex-wrap">
                    {["Next.js", "Tailwind CSS", "React", "Figma"].map(tech => (
                      <span key={tech} className="px-3 py-1 text-sm rounded-full border border-white/10 bg-white/5 text-gray-300">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refined Success Stories Section */}
        <section id="testimonials" className="px-6 py-32 relative z-10 border-t border-white/5 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">
                Testimonials
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight">Success Stories</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real feedback from the brands and individuals transformed through strategic digital partnership.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Grace didn't just build our platform; she helped us define our digital identity. Her strategic approach to tech is unmatched in the industry.",
                  author: "Olumide Adeyemi",
                  role: "CEO, Shoppadi",
                  color: "blue",
                  initial: "O"
                },
                {
                  quote: "The Backend Mastery boot-camp was a game-changer for my career. Grace simplifies complex engineering concepts into actionable knowledge.",
                  author: "Sarah Ahmed",
                  role: "Software Engineer",
                  color: "purple",
                  initial: "S"
                },
                {
                  quote: "Our engagement increased by 300% within three months of implementing the growth strategies recommended by Grace. Truly exceptional.",
                  author: "Daniel Anazie",
                  role: "Founder, Sunbridge Consulting",
                  color: "pink",
                  initial: "D"
                }
              ].map((story, i) => (
                <div key={i} className="glass-card p-12 rounded-[3.5rem] border border-white/5 relative group hover:border-white/10 transition-all duration-500 flex flex-col h-full bg-white/[0.01]">
                  <div className={`absolute top-0 right-12 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-${story.color}-500 to-${story.color}-700 flex items-center justify-center text-white shadow-2xl shadow-${story.color}-500/40 group-hover:scale-110 transition-transform duration-500`}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709C9.12166 16 10.0171 16.8954 10.0171 18V21H3.01709ZM16.017 14C13.8079 14 12.017 12.2091 12.017 10C12.017 7.79086 13.8079 6 16.017 6C18.2261 6 20.017 7.79086 20.017 10C20.017 12.2091 18.2261 14 16.017 14ZM5.01709 14C2.80795 14 1.01709 12.2091 1.01709 10C1.01709 7.79086 2.80795 6 5.01709 6C7.22623 6 9.01709 7.79086 9.01709 10C9.01709 12.2091 7.22623 14 5.01709 14Z"/></svg>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-xl text-gray-300 italic leading-relaxed mb-10 group-hover:text-white transition-colors duration-500">
                      "{story.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-5 pt-8 border-t border-white/5">
                    <div className={`w-14 h-14 rounded-full bg-${story.color}-500/10 border border-${story.color}-500/20 flex items-center justify-center font-black text-${story.color}-400 text-xl group-hover:bg-${story.color}-500 group-hover:text-white transition-all duration-500 shadow-inner`}>
                      {story.initial}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg tracking-tight">{story.author}</h4>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{story.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Initiatives (Enhanced from ROADMAP.md Q3-Q4) */}
        <section className="px-6 py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-black/40 to-purple-900/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">Active Development</div>
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">Strategic Initiatives</h2>
                <p className="text-gray-400 max-w-xl">Turning the vision into reality. Here are the core programs currently being built for the upcoming quarters.</p>
              </div>
             </div>
             
             <div className="grid lg:grid-cols-3 gap-8">
                {/* Initiative 1: Mentorship */}
                <div className="glass-card p-1 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                  <div className="p-10 flex flex-col h-full bg-black/60 rounded-[2.4rem]">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                      <Code className="w-6 h-6" />
                    </div>
                    <div className="text-purple-500 mb-3 font-bold tracking-widest uppercase text-xs">Education & Career</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Backend Mastery Boot-camp</h3>
                    <p className="text-gray-400 leading-relaxed mb-10 flex-grow italic font-light">"A structured, project-based mentorship program targeting practical backend engineering with Node.js and PostgreSQL."</p>
                    <Link href="#contact" className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-purple-600 hover:border-purple-600 transition-all text-sm">
                      Join the Waitlist
                    </Link>
                  </div>
                </div>

                {/* Initiative 2: SaaS MVP */}
                <div className="glass-card p-1 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                  <div className="p-10 flex flex-col h-full bg-black/60 rounded-[2.4rem] border-2 border-blue-500/20">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div className="text-blue-500 mb-3 font-bold tracking-widest uppercase text-xs">Innovation Lab</div>
                    <h3 className="text-2xl font-bold text-white mb-4">SaaS Infrastructure Build</h3>
                    <p className="text-gray-400 leading-relaxed mb-10 flex-grow italic font-light">"Building modular, high-performance SaaS infrastructure to demonstrate extreme data management capabilities."</p>
                    <Link href="#contact" className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all text-sm shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                      Follow the Build
                    </Link>
                  </div>
                </div>

                {/* Initiative 3: Global Scaling */}
                <div className="glass-card p-1 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                  <div className="p-10 flex flex-col h-full bg-black/60 rounded-[2.4rem]">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-8 border border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="text-pink-500 mb-3 font-bold tracking-widest uppercase text-xs">Growth & Expansion</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Global Strategy Operations</h3>
                    <p className="text-gray-400 leading-relaxed mb-10 flex-grow italic font-light">"Scaling digital growth systems to help African brands compete on an international stage with seamless integrations."</p>
                    <Link href="#contact" className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-pink-600 hover:border-pink-600 transition-all text-sm">
                      Partner with Us
                    </Link>
                  </div>
                </div>
             </div>
          </div>
        </section>
        {/* Long Term Vision (From ROADMAP.md) */}
        <section className="px-6 py-24 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
          {/* Subtle Starry Effect Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
              <div className="text-purple-400 font-bold tracking-[0.2em] uppercase text-sm mb-2">The Future</div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">Long-term Vision</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Building sustainable ecosystems for digital growth and technical empowerment.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Vision 1: Digital Growth Agency */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card p-10 rounded-3xl border border-white/10 h-full flex flex-col">
                  <div className="text-4xl mb-6">🏢</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Digital Growth Agency</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Establishing a full-scale agency providing end-to-end branding, marketing systems, and high-converting tech solutions for global brands.
                  </p>
                </div>
              </div>

              {/* Vision 2: Tech Education Platform */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card p-10 rounded-3xl border border-white/10 h-full flex flex-col">
                  <div className="text-4xl mb-6">🎓</div>
                  <h3 className="text-2xl font-bold text-white mb-4">EdTech Platform</h3>
                  <p className="text-gray-400 leading-relaxed">
                    A comprehensive, project-based online learning platform focused entirely on actionable tech education to empower the next generation.
                  </p>
                </div>
              </div>

              {/* Vision 3: Open Source Integration */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card p-10 rounded-3xl border border-white/10 h-full flex flex-col">
                  <div className="text-4xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Open Source Integration</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Producing world-class open-source boilerplates (Next.js + WooCommerce) to help the community leverage top-tier architectural patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA / Footer */}
        <section id="contact" className="px-6 py-24 relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl -z-10" />
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 tracking-tight">Let's build something <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">extraordinary.</span></h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">Ready to scale your brand with a world-class digital experience? Let's discuss your next big objective.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <Link href="mailto:graceantony202@gmail.com?subject=Project%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." className="group flex items-center gap-3 text-white hover:text-purple-400 transition-all font-medium text-lg">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                graceantony202@gmail.com
              </Link>
              <Link href="tel:09015028666" className="group flex items-center gap-3 text-white hover:text-green-400 transition-all font-medium text-lg">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16.42V19.956C21 20.531 20.531 21 19.956 21C16.611 21 13.402 19.674 11.037 17.309C8.671 14.943 7.345 11.734 7.345 8.389C7.345 7.854 7.854 7.345 8.389 7.345H11.965C12.5 7.345 12.982 7.747 13.048 8.271L13.567 11.458C13.633 11.897 13.486 12.338 13.167 12.646L11.642 14.171C12.721 16.035 14.269 17.583 16.133 18.662L17.658 17.137C17.966 16.818 18.407 16.671 18.846 16.737L22.033 17.256C22.557 17.322 23 17.804 23 18.339V21.875" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                09015028666
              </Link>
            </div>

            <Link href="mailto:graceantony202@gmail.com?subject=Project%20Inquiry&body=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you." className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all">
              Send Message
              <ArrowRight className="w-5 h-5" />
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
