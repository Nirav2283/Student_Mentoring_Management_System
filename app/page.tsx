import React from 'react';
import Link from 'next/link';

const FeatureCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
    <div className="size-12 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center mb-1">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <h3 className="font-bold text-lg text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-black text-[#135bec] mb-1">{value}</div>
    <div className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

export default function MentoraLanding() {
  return (
    <div className="bg-[#f6f6f8] text-[#111318] font-sans overflow-x-hidden min-h-screen flex flex-col">
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />

    
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[#135bec] flex items-center justify-center rounded-lg bg-[#135bec]/10">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-[-0.015em]">Mentora</h2>
          </div>
         <Link href={'/login'}>
           <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-blue-800 hover:bg-blue-900 text-[#ffffff] text-sm font-bold transition-colors">
            Login
          </button>
         </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full">
        <div className="w-full max-w-[1280px] p-4 py-8 sm:py-12 flex flex-col items-center">
        
          <div className="relative w-full overflow-hidden rounded-xl bg-gray-900 shadow-xl min-h-[500px] flex flex-col items-center justify-center text-center px-4 sm:px-10 mb-12">
            <div className="absolute inset-0 z-0">
              <img 
                alt="Mentors collaborating" 
                className="w-full h-full object-cover opacity-40" 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
            </div>
            
            <div className="relative z-10 max-w-[800px] flex flex-col gap-8 items-center animate-fade-in-up">
              <div className="flex flex-col gap-4">
                <span className="material-symbols-outlined text-white/80 text-4xl mb-2 mt-5">format_quote</span>
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm">
                  "Tell me and I forget, teach me and I may remember, involve me and I learn."
                </h1>
                <p className="text-white/90 text-sm font-medium uppercase tracking-widest mt-2">— Benjamin Franklin</p>
              </div>
              <div className="w-16 h-1 bg-[#135bec] rounded-full my-2"></div>
              <div className="flex flex-col gap-6 items-center">
                <h2 className="text-gray-200 text-lg sm:text-xl font-normal leading-relaxed max-w-[600px]">
                  Connect with mentors who guide your future. Join a community dedicated to your growth and success.
                </h2>
                <Link href={'/register'}>
                  <button className="flex min-w-[160px] items-center mb-5 justify-center rounded-lg h-12 px-8 bg-[#135bec] hover:bg-[#135bec]/90 text-white text-base font-bold shadow-lg shadow-[#135bec]/25 transition-all transform hover:scale-105">
                  Get Started
                  <span className="material-symbols-outlined text-[20px] ml-2">arrow_forward</span>
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[960px] mx-auto">
            <FeatureCard icon="person_search" title="Find Mentors" desc="Discover industry experts aligned with your academic and career goals." />
            <FeatureCard icon="calendar_month" title="Schedule Sessions" desc="Book 1-on-1 guidance sessions seamlessly with integrated calendar tools." />
            <FeatureCard icon="trending_up" title="Track Progress" desc="Monitor your growth journey with goal setting and feedback loops." />
          </div>

          {/* Info Section / Card UI */}
          <div className="w-full mt-24 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 ml-">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#135bec] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                  Why Mentora
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111318] leading-tight">
                  Bridge the gap between <br/><span className="text-[#135bec]">academic theory</span> and <span className="text-[#135bec]">real-world success</span>.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Traditional education gives you the foundation. Mentora gives you the blueprint. Connect with seniors, alumni, and industry veterans.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {['Curated Connections', 'Structured Growth', 'Resource Library', 'Global Network'].map((text) => (
                    <div key={text} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#135bec] mt-1">check_circle</span>
                      <div>
                        <h4 className="font-bold text-[#111318]">{text}</h4>
                        <p className="text-sm text-gray-500">Professional guidance for your journey.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Cards Illustration */}
              {/* <div className="flex-1 w-full relative px-4 md:px-0">
                <div className="relative w-full aspect-square max-w-[450px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-full opacity-70 blur-3xl"></div> */}
                  
                  {/* Floating Mentor Card */}
                  {/* <div className="absolute top-8 left-0 right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 animate-float z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="size-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                          <span className="material-symbols-outlined text-3xl">face_3</span>
                        </div>
                        <div>
                          <div className="font-bold text-lg">Sarah Jenkins</div>
                          <div className="text-sm text-gray-500">Senior Product Designer</div>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Available</div>
                    </div>
                    <div className="w-full h-10 bg-[#135bec] text-white rounded-lg flex items-center justify-center font-bold text-sm mb-2">
                      Request Mentorship
                    </div>
                  </div> */}

                  {/* Notification Card */}
                  {/* <div className="absolute -bottom-4 -right-4 md:right-0 w-64 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 animate-float-delayed z-20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Next Session</span>
                      <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">15 min</span>
                    </div>
                    <h3 className="font-bold text-[#111318] text-sm mb-1">Portfolio Review</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-sm">videocam</span>
                      <span>Zoom Meeting</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100 mb-20 bg-white/50 rounded-2xl">
            <StatItem value="500+" label="Expert Mentors" />
            <StatItem value="10k+" label="Sessions Completed" />
            <StatItem value="98%" label="Satisfaction" />
            <StatItem value="25+" label="Universities" />
          </div>

          {/* CTA Section */}
          <div className="w-full bg-[#111318] rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="material-symbols-outlined text-[#135bec] text-5xl mb-2">rocket_launch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to accelerate your career?</h2>
              <p className="text-gray-400 max-w-2xl text-lg">Don't wait for graduation to start building your network.</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                <button className="h-12 px-8 rounded-lg bg-[#135bec] hover:bg-[#135bec]/90 text-white font-bold transition-transform hover:scale-105 shadow-lg shadow-[#135bec]/25">As a Student</button>
                <button className="h-12 px-8 rounded-lg bg-transparent border border-gray-600 text-white font-bold hover:bg-white/10 transition-colors">As a mentor</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto border-t border-gray-200 bg-white">
        <div className="max-w-[960px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#616f89] text-sm">© 2023 Mentora Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">About</Link>
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">Help Center</Link>
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}