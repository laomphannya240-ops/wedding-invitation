import { useEffect, useState, useRef } from 'react'
import {
  CalendarDays, MapPin, Clock3, Heart, Gift, Camera,
  Menu, X, ArrowDown, Music2, Flower2, Navigation, Sparkles, Star, ChevronLeft, ChevronRight
} from 'lucide-react'

// កំណត់ថ្ងៃរៀបការ
const weddingDate = new Date('2026-12-20T07:00:00+07:00')

function useCountdown() {
  const [time, setTime] = useState(getTimeLeft())
  function getTimeLeft() {
    const distance = weddingDate.getTime() - Date.now()
    if (distance <= 0) return { ថ្ងៃ: 0, ម៉ោង: 0, នាទី: 0, វិនាទី: 0 }
    return {
      ថ្ងៃ: Math.floor(distance / (1000 * 60 * 60 * 24)),
      ម៉ោង: Math.floor((distance / (1000 * 60 * 60)) % 24),
      នាទី: Math.floor((distance / (1000 * 60)) % 60),
      វិនាទី: Math.floor((distance / 1000) % 60),
    }
  }
  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])
  return time
}

const schedule = [
  { time: '០៧:០០ ព្រឹក', title: 'ហែអ្នកកំលោះចូលរោងជ័យ', desc: 'ទទួលស្វាគមន៍ភ្ញៀវកិត្តិយស និងរៀបចំក្បួនហែជំនូន', icon: Flower2 },
  { time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី', desc: 'ពិធីប្រពៃណីខ្មែរ ជម្រះសិរីមង្គលជូនគូស្វាមីភរិយាថ្មី', icon: Sparkles },
  { time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម និងចងដៃ', desc: 'ពិធីក្រុងពាលី សំពះផ្ទឹម និងទទួលពរជ័យពីចាស់ទុំ', icon: Heart },
  { time: '១១:៣០ ថ្ងៃត្រង់', title: 'ពិសារភោជនាហារ', desc: 'សូមអញ្ជើញភ្ញៀវកិត្តិយសពិសារភោជនាហារ និងរាំលេងកម្សាន្ត', icon: Music2 },
]

// រូបភាព
const brideGroomImages = [
    './images/pic1.jpg', 
    './images/pic2.jpg', 
    './images/pic3.jpg', 
    './images/pic4.jpg'  
];
const qrImage = '/images/qrya.jpg'; 

const galleryImages = [
  ...brideGroomImages,
  '/images/pic5.jpg',
  '/images/pic6.jpg'
]

function SectionHeading({ eyebrow, title, subtitle }) {
  return <div className="mx-auto mb-16 max-w-2xl text-center relative z-10">
    <Sparkles className="mx-auto mb-3 text-[#D9C3A0] animate-glow" size={24}/>
    <p className="mb-3 text-sm font-bold text-[#B69ACB] uppercase tracking-widest">{eyebrow}</p>
    <h2 className="text-4xl text-[#51465F] md:text-5xl drop-shadow-sm" style={{ fontFamily: "'Moul', serif", lineHeight: '1.8' }}>{title}</h2>
    {subtitle && <p className="mt-5 text-base leading-8 text-[#51465F]/80">{subtitle}</p>}
  </div>
}

function App() {
  const countdown = useCountdown()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const galleryRef = useRef(null) // ប្រើសម្រាប់គ្រប់គ្រងការ Scroll
  
  const navItems = [
    ['រឿងរ៉ាវរបស់យើង', '#couple'], 
    ['កាលវិភាគ', '#schedule'], 
    ['វិចិត្រសាល', '#gallery'], 
    ['ទីតាំង', '#location'], 
    ['ចំណងដៃ', '#gift']
  ]
  
  // មុខងារសម្រាប់ Scroll ឆ្វេង-ស្តាំ ដោយប្រើប៊ូតុង
  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 400; // ទំហំអូសខុសគ្នាសម្រាប់ទូរស័ព្ទ និងកុំព្យូទ័រ
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }
  
  return (
    <div className="min-h-screen overflow-hidden bg-[#FFFCF5] text-[#51465F] selection:bg-[#B69ACB] selection:text-white" style={{ fontFamily: "'Battambang', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Moul&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(217,195,160,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(217,195,160,0.8)); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-drift { background-size: 200% 200%; animation: drift 30s ease infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        
        .glass-panel {
          background: rgba(255, 252, 245, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px 0 rgba(81, 70, 95, 0.05);
        }
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232,225,242,0.5) 100%);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 40px rgba(81, 70, 95, 0.06);
        }
        
        /* លាក់ Scrollbar ដើម្បីឱ្យមើលទៅស្អាត (Clean UI) */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 glass-panel border-b-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#home" className="text-2xl font-bold text-[#51465F] drop-shadow-sm flex items-center gap-2" style={{ fontFamily: "'Moul', serif" }}>
             វ៉ាន់ស៊ុយ & ចាន់ឡែក
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm font-bold text-[#51465F]/90 transition-all hover:text-[#B69ACB] hover:-translate-y-1">{label}</a>)}
          </nav>
          <a href="#gift" className="hidden rounded-full bg-[#B69ACB] px-7 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[#a084b6] hover:shadow-[0_0_20px_rgba(182,154,203,0.4)] md:block">
            ជូនចំណងដៃ
          </a>
          <button className="md:hidden text-[#51465F]" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={28}/> : <Menu size={28}/>}</button>
        </div>
        {menuOpen && <nav className="glass-panel grid gap-2 px-6 py-6 md:hidden absolute w-full left-0 mt-2 rounded-b-2xl shadow-xl">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2 text-base font-bold text-[#51465F] text-center">{label}</a>)}
        </nav>}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative flex min-h-[95vh] items-center justify-center px-5 pb-20 pt-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E8E1F2] via-[#FFFCF5] to-[#FFFCF5] animate-drift" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D8E9E8]/40 to-transparent animate-drift" />
          
          <div className="relative mx-auto w-full max-w-4xl rounded-[2.5rem] glass-panel p-10 text-center animate-float md:p-20 border-white border-2">
            <p className="mb-6 text-sm font-bold tracking-[0.3em] text-[#B69ACB] animate-pulse">សិរីសួស្ដីអាពាហ៍ពិពាហ៍</p>
            <h1 className="mt-5 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#51465F] via-[#B69ACB] to-[#51465F] md:text-7xl drop-shadow-sm pb-4" style={{ fontFamily: "'Moul', serif", lineHeight: '1.6' }}>
              ស៊ុន វ៉ាន់ស៊ុយ <br className="md:hidden"/><span className="text-[#D9C3A0] text-4xl md:text-6xl mx-4">&</span><br className="md:hidden"/> សិត ចាន់ឡែក
            </h1>
            <p className="mt-8 text-lg leading-10 text-[#51465F]/90 max-w-2xl mx-auto font-bold">
              យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា 
              ចូលរួមជាអធិបតី និងភ្ញៀវកិត្តិយស ក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ
            </p>
            
            <div className="mx-auto my-10 flex items-center justify-center gap-6">
              <span className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#D9C3A0]"></span>
              <Heart className="text-[#D9C3A0] animate-pulse" size={24} fill="#D9C3A0"/>
              <span className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#D9C3A0]"></span>
            </div>
            
            <a href="#details" className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D9C3A0] text-white shadow-lg transition-transform hover:scale-110 animate-bounce">
              <ArrowDown size={24}/>
            </a>
          </div>
        </section>

        {/* Countdown */}
        <section id="details" className="relative px-5 py-24 md:py-32 bg-[#FFFCF5]">
          <SectionHeading eyebrow="ពេលវេលាពិសេស" title="រាប់ថយក្រោយ" subtitle="ពេលវេលាដ៏វិសេសវិសាលរបស់យើងនឹងមកដល់ក្នុងពេលឆាប់ៗនេះ"/>
          <div className="relative mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 z-10">
            {Object.entries(countdown).map(([key, value], index) => (
              <div key={key} className={`rounded-3xl glass-card py-10 text-center transition-all hover:-translate-y-2 hover:shadow-xl ${index % 2 === 0 ? 'animate-float' : 'animate-float-delay'}`}>
                <p className="text-5xl text-[#B69ACB] md:text-6xl drop-shadow-sm" style={{ fontFamily: "'Moul', serif" }}>{String(value).padStart(2, '0')}</p>
                <p className="mt-4 text-sm font-bold tracking-widest text-[#51465F]/80">{key}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Couple */}
        <section id="couple" className="relative px-5 py-24 md:py-32 bg-gradient-to-b from-[#FFFCF5] via-[#E8E1F2]/60 to-[#FFFCF5] overflow-hidden">
          <SectionHeading eyebrow="កូនកម្លោះ និង កូនក្រមុំ" title="គូស្វាមីភរិយាថ្មី" subtitle="ដោយសេចក្ដីស្រឡាញ់ និងការយល់ចិត្ត យើងបានសម្រេចចិត្តសាងគ្រួសាររួមគ្នា។"/>
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_auto_1fr] z-10">
            <div className="text-center group">
              <div className="mx-auto mb-8 h-[400px] w-[300px] overflow-hidden rounded-[150px] glass-card p-3 transition-transform duration-700 group-hover:scale-105 border-[#D9C3A0]/50 shadow-lg">
                <img className="h-full w-full object-cover rounded-[140px] object-top" src={brideGroomImages[0]} alt="កូនកម្លោះ"/>
              </div>
              <p className="text-sm font-bold tracking-widest text-[#B69ACB]">កូនកម្លោះ</p>
              <h3 className="mt-4 text-3xl text-[#51465F]" style={{ fontFamily: "'Moul', serif" }}>ស៊ុន វ៉ាន់ស៊ុយ</h3>
            </div>
            
            <div className="flex flex-col items-center justify-center text-[#B69ACB] gap-4">
              <Heart size={60} strokeWidth={1} className="animate-pulse drop-shadow-[0_0_15px_rgba(182,154,203,0.5)]" fill="#B69ACB" fillOpacity={0.2}/>
            </div>
            
            <div className="text-center group">
              <div className="mx-auto mb-8 h-[400px] w-[300px] overflow-hidden rounded-[150px] glass-card p-3 transition-transform duration-700 group-hover:scale-105 border-[#D9C3A0]/50 shadow-lg">
                <img className="h-full w-full object-cover rounded-[140px] object-top" src={brideGroomImages[2]} alt="កូនក្រមុំ"/>
              </div>
              <p className="text-sm font-bold tracking-widest text-[#B69ACB]">កូនក្រមុំ</p>
              <h3 className="mt-4 text-3xl text-[#51465F]" style={{ fontFamily: "'Moul', serif" }}>សិត ចាន់ឡែក</h3>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="px-5 py-24 md:py-32 relative bg-[#FFFCF5]">
          <SectionHeading eyebrow="កម្មវិធីមង្គលការ" title="លំដាប់លំដោយកម្មវិធី" subtitle="សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសចូលរួមតាមពេលវេលាដូចខាងក្រោម។"/>
          <div className="mx-auto max-w-3xl relative z-10">
            {schedule.map(({time, title, desc, icon: Icon}, index) => <div key={title} className="relative grid grid-cols-[120px_1fr] gap-8 pb-16 last:pb-0 md:grid-cols-[160px_1fr] group">
              {index !== schedule.length - 1 && <div className="absolute bottom-0 left-[119px] top-14 w-[2px] bg-gradient-to-b from-[#D9C3A0] to-transparent md:left-[159px] opacity-40"/>}
              
              <div className="pt-5 text-right text-base font-bold text-[#B69ACB] group-hover:scale-105 transition-transform">{time}</div>
              
              <div className="relative rounded-2xl glass-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg border border-[#D9C3A0]/30">
                <span className="absolute -left-[56px] top-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFFCF5] border-2 border-[#D9C3A0] text-[#D9C3A0] shadow-md animate-float">
                  <Icon size={24}/>
                </span>
                <h3 className="text-xl text-[#51465F] font-bold mb-3">{title}</h3>
                <p className="text-base leading-8 text-[#51465F]/80">{desc}</p>
              </div>
            </div>)}
          </div>
        </section>

        {/* ផ្នែកវិចិត្រសាលរូបភាព (Photo Gallery - Horizontal Carousel បន្ថែមថ្មី) */}
        <section id="gallery" className="relative py-24 md:py-32 bg-gradient-to-b from-[#FFFCF5] to-[#E8E1F2]/40 border-y border-[#D9C3A0]/20 overflow-hidden">
          <div className="px-5">
            <SectionHeading eyebrow="រូបភាពអនុស្សាវរីយ៍" title="វិចិត្រសាលរូបថត" subtitle="អូសមើលរូបភាព ដើម្បីទស្សនាពេលវេលាល្អៗ និងស្នាមញញឹមរបស់យើង។"/>
          </div>
          
          <div className="relative mx-auto w-full max-w-7xl mt-12 group">
            {/* ប៊ូតុងអូសទៅឆ្វេង */}
            <button 
              onClick={() => scrollGallery('left')}
              className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#51465F] shadow-lg backdrop-blur-sm border border-white transition-all hover:scale-110 hover:bg-white md:opacity-0 md:group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={28}/>
            </button>
            
            {/* កុងតឺន័ររំកិលរូបភាព (Scroll Container) */}
            <div 
              ref={galleryRef}
              className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 md:px-10 pb-10 pt-4 scroll-smooth"
            >
              {galleryImages.map((src, i) => (
                <button 
                  key={i} 
                  onClick={() => setLightbox(src)} 
                  className="relative flex-none w-[280px] md:w-[400px] h-[400px] md:h-[550px] overflow-hidden rounded-[2rem] shadow-md border-[6px] border-white snap-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group/img"
                >
                  <img src={src} alt={`Pre-wedding ${i+1}`} className="h-full w-full object-cover transition duration-700 group-hover/img:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#51465F]/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-8">
                    <Camera className="text-white drop-shadow-md animate-bounce" size={28}/>
                  </div>
                </button>
              ))}
            </div>

            {/* ប៊ូតុងអូសទៅស្តាំ */}
            <button 
              onClick={() => scrollGallery('right')}
              className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#51465F] shadow-lg backdrop-blur-sm border border-white transition-all hover:scale-110 hover:bg-white md:opacity-0 md:group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={28}/>
            </button>
          </div>
        </section>

        {/* Location */}
        <section id="location" className="px-5 py-24 md:py-32 bg-[#FFFCF5]">
          <SectionHeading eyebrow="ទីតាំងកម្មវិធី" title="សាលមហោស្រព" subtitle="យើងខ្ញុំរីករាយក្នុងការទទួលស្វាគមន៍លោកអ្នកនៅទីតាំងខាងក្រោម។"/>
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] glass-card grid md:grid-cols-2 relative z-10 p-2 border border-[#D9C3A0]/30 shadow-lg">
            <div className="flex flex-col justify-center p-10 md:p-16 bg-white/60 rounded-l-[1.8rem]">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E8E1F2] text-[#B69ACB] mb-8 animate-float shadow-sm">
                <MapPin size={32}/>
              </div>
              <h3 className="text-3xl text-[#51465F]" style={{ fontFamily: "'Moul', serif", lineHeight: '1.8' }}>មជ្ឈមណ្ឌល ឌឹ ព្រេមៀរ សែនសុខ</h3>
              <p className="mt-5 text-lg leading-9 text-[#51465F]/80 font-bold">អគារ A, ផ្លូវឧកញ៉ា ម៉ុង ឬទ្ធី (១៩២៨), សង្កាត់ភ្នំពេញថ្មី, ខណ្ឌសែនសុខ, រាជធានីភ្នំពេញ</p>
              <a href="https://maps.app.goo.gl/FpT9GfZssKFLfZrz9" target="_blank" rel="noreferrer" className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#B69ACB] px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:bg-[#a084b6] shadow-md hover:shadow-lg">
                បើកផែនទី Map <Navigation size={18}/>
              </a>
            </div>
            <div className="min-h-[400px] rounded-r-[1.8rem] overflow-hidden p-2">
              <iframe title="Wedding location map" className="h-full min-h-[400px] w-full rounded-2xl opacity-90 sepia-[20%]" loading="lazy" src="https://maps.google.com/maps?q=The%20Premier%20Centre%20Sen%20Sok&t=&z=14&ie=UTF8&iwloc=&output=embed"/>
            </div>
          </div>
        </section>

        {/* Gift */}
        <section id="gift" className="relative px-5 py-24 md:py-32 overflow-hidden bg-gradient-to-t from-[#D8E9E8]/20 to-[#FFFCF5]">
          <SectionHeading eyebrow="ចំណងដៃអាពាហ៍ពិពាហ៍" title="ជូនពរ និង ចំណងដៃ" subtitle="វត្តមានរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុត។"/>
          
          <div className="relative mx-auto max-w-md rounded-[2.5rem] glass-card p-10 text-center z-10 transform transition-all hover:-translate-y-2 hover:shadow-2xl border-2 border-[#D9C3A0]/40">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E1F2] text-[#B69ACB] shadow-sm animate-float">
              <Gift size={36}/>
            </div>
            
            <h3 className="text-2xl font-bold text-[#51465F]">គណនីធនាគារ</h3>
            <p className="mt-3 text-base text-[#51465F]/70">សូមអរគុណចំពោះទឹកចិត្តដ៏សប្បុរស</p>
            
            <div className="mx-auto my-8 flex justify-center">
                <img src={qrImage} alt="QR Code ACLEDA" className="max-w-[280px] rounded-2xl shadow-lg border-[6px] border-white"/>
            </div>
            
            <div className="space-y-2 bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-[#D9C3A0]/30 shadow-sm">
              <p className="text-base font-bold text-[#51465F]/80">ធនាគារ អេស៊ីលីដា / ACLEDA</p>
              <p className="text-xl font-bold text-[#51465F]">សិត ចាន់ឡែក</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#FFFCF5] to-[#E8E1F2] px-5 pt-20 pb-12 text-center text-[#51465F]">
        <div className="relative z-10">
          <Sparkles className="mx-auto mb-6 text-[#D9C3A0] animate-glow" size={36}/>
          <p className="text-lg leading-10 font-bold max-w-2xl mx-auto mb-10 text-[#51465F]/90">
            យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ<br/>ចំពោះវត្តមានដ៏ខ្ពង់ខ្ពស់របស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី
          </p>
          <h2 className="text-4xl text-[#51465F] drop-shadow-sm" style={{ fontFamily: "'Moul', serif", lineHeight: '2' }}>វ៉ាន់ស៊ុយ និង ចាន់ឡែក</h2>
          <div className="mt-8 flex justify-center items-center gap-4">
            <span className="w-12 h-[2px] bg-[#D9C3A0]"></span>
            <p className="text-sm font-bold tracking-[0.3em] text-[#B69ACB]">20 . 12 . 2026</p>
            <span className="w-12 h-[2px] bg-[#D9C3A0]"></span>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#51465F]/95 p-5 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button className="absolute right-6 top-6 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition-colors" onClick={() => setLightbox(null)}>
            <X size={28}/>
          </button>
          <img src={lightbox} alt="Gallery Enlarge" className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl border-4 border-white/20"/>
        </div>
      )}
    </div>
  )
}

export default App