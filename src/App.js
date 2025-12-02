import React, { useState, useEffect } from "react";

// -------------------- Utilities & Icons --------------------

// Simple Icons as Components to avoid external dependencies
const Icons = {
  CreditCard: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
};

function generateSeats(rows = 6, cols = 8) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r); // A, B, C...
    for (let c = 1; c <= cols; c++) {
      seats.push({ id: rowLetter + c, booked: false });
    }
  }
  return seats;
}

function sampleMovies() {
  const baseMovies = [
    {
      id: "f1",
      title: "Langit Merah",
      genre: "Drama / Petualangan",
      duration: "2j 10m",
      rating: "13+",
      price: 45000,
      image: "https://awsimages.detik.net.id/community/media/visual/2022/05/12/langit-merah-4.png?w=860.jpg",
      synopsis: "Film Langit Merah menceritakan perjalanan seorang pemuda dalam menghadapi konflik di desanya.",
      cast: ["Ari Wibowo", "Rina Hasyim", "Joko Anwar"],
      trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      schedules: [
        { id: "s1", date: "2025-12-03", time: "12:00", studio: "Studio 1" },
        { id: "s2", date: "2025-12-03", time: "15:00", studio: "Studio 1" },
        { id: "s3", date: "2025-12-03", time: "18:00", studio: "Studio 2" },
      ],
      seats: generateSeats(),
    },
    {
      id: "f2",
      title: "Malam di Kota",
      genre: "Thriller",
      duration: "1j 55m",
      rating: "17+",
      price: 50000,
      image: "https://tse1.mm.bing.net/th/id/OIP.V9AJAC0vH8Jtska5o0I91wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3.jpg",
      synopsis: "Seorang detektif mencoba mengungkap misteri pembunuhan yang terjadi di kota besar.",
      cast: ["Budi Santoso", "Tina Talisa", "Doni Alamsyah"],
      trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      schedules: [
        { id: "s4", date: "2025-12-03", time: "13:00", studio: "Studio 2" },
        { id: "s5", date: "2025-12-03", time: "16:30", studio: "Studio 2" },
        { id: "s6", date: "2025-12-03", time: "20:00", studio: "Studio 3" },
      ],
      seats: generateSeats(),
    },
    {
      id: "f3",
      title: "Komedi Cinta",
      genre: "Romcom",
      duration: "2j 05m",
      rating: "SU",
      price: 40000,
      image: "https://media.suara.com/pictures/970x544/2023/12/30/80632-film-jatuh-cinta-seperti-di-film-film.jpg",
      synopsis: "Kisah romantis lucu antara dua sahabat yang akhirnya saling jatuh cinta.",
      cast: ["Luna Maya", "Raffi Ahmad", "Aurelie Moeremans"],
      trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      schedules: [
        { id: "s7", date: "2025-12-03", time: "10:00", studio: "Studio 1" },
        { id: "s8", date: "2025-12-03", time: "14:00", studio: "Studio 3" },
        { id: "s9", date: "2025-12-03", time: "19:00", studio: "Studio 4" },
      ],
      seats: generateSeats(),
    },
  ];

  const additionalMovies = [
    { id: "f4", title: "Jalur Cepat", genre: "Action / Racing", image: "https://tse4.mm.bing.net/th/id/OIP.QYL05udUTWCzEFLXQh4-owHaLH?rs=1&pid=ImgDetMain&o=7&rm=3.jpg", synopsis: "Balapan liar di jalanan ibukota memicu adrenalin tinggi." },
    { id: "f5", title: "Hutan Terlarang", genre: "Horror / Misteri", image: "https://i.ytimg.com/vi/b-9yU33znh0/maxresdefault.jpg", synopsis: "Sekelompok mahasiswa tersesat di hutan yang menyimpan kutukan lama." },
    { id: "f6", title: "Dunia Ajaib", genre: "Animasi / Keluarga", image: "https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg", synopsis: "Petualangan magis seorang anak di dunia penuh warna." },
    { id: "f7", title: "Legenda Naga", genre: "Fantasy / Action", image: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg", synopsis: "Seorang ksatria mencari naga terakhir untuk menyelamatkan kerajaannya." },
    { id: "f8", title: "Misi Rahasia", genre: "Action / Spy", image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg", synopsis: "Agen rahasia harus menghentikan peluncuran senjata berbahaya." },
    { id: "f9", title: "Cinta di Paris", genre: "Romance / Drama", image: "https://tse4.mm.bing.net/th/id/OIP.3YM0lZnjNb0FabVsbYl6xAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3.jpg", synopsis: "Kisah cinta lama yang bersemi kembali di kota Paris." },
    { id: "f10", title: "Detektif Cilik", genre: "Komedi / Keluarga", image: "https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_.jpg", synopsis: "Sekelompok anak-anak memecahkan misteri hilangnya kucing tetangga." }
  ];

  const fullAdditionalMovies = additionalMovies.map(m => ({
    ...m,
    duration: "1j 45m",
    rating: "13+",
    price: 45000,
    cast: ["Aktor A", "Aktris B", "Aktor C"],
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    schedules: [
      { id: `s_${m.id}`, date: "2025-12-04", time: "14:00", studio: "Studio X" },
      { id: `s_${m.id}_2`, date: "2025-12-04", time: "19:00", studio: "Studio X" }
    ],
    seats: generateSeats()
  }));

  return [...baseMovies, ...fullAdditionalMovies];
}

function generateTicket({ movie, schedule, seats, user }) {
  const code = "CX-" + Math.random().toString(36).substring(2, 9).toUpperCase();
  return { movie, schedule, seats, user, code };
}

function QRCodeSVG({ value = "QR" }) {
  const s = 80;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="inline-block bg-white p-1 rounded shadow-sm">
      <rect x="4" y="4" width="20" height="20" fill="#0f172a" />
      <rect x="56" y="4" width="20" height="20" fill="#0f172a" />
      <rect x="4" y="56" width="20" height="20" fill="#0f172a" />
      <rect x="34" y="34" width="6" height="6" fill="#0f172a" />
      <rect x="44" y="44" width="6" height="6" fill="#0f172a" />
      <rect x="24" y="44" width="6" height="6" fill="#0f172a" />
    </svg>
  );
}

// -------------------- Main App --------------------

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; }
  });

  const [page, setPage] = useState("now_playing");
  const [movies] = useState(sampleMovies());
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [ticket, setTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => { if (!user) setPage("now_playing"); }, [user]);

  const login = (name) => {
    const u = { name };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setPage("now_playing");
    setSelectedMovie(null);
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setTicket(null);
    setTickets([]);
  };

  const startBooking = (movie) => {
    setSelectedMovie(movie);
    setSelectedSchedule(null);
    setSelectedSeats([]);
    setTicket(null);
    setPage("book");
  };

  const proceedToPayment = () => {
    if (!user) { setPage("login"); return; }
    if (!selectedSchedule || selectedSeats.length === 0) { alert("Pilih jadwal dan kursi terlebih dahulu."); return; }
    setPage("payment");
  };

  const completePayment = (paymentDetails) => {
    const newTicket = generateTicket({ movie: selectedMovie, schedule: selectedSchedule, seats: selectedSeats, user });
    newTicket.payment = paymentDetails;
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setTicket(newTicket);
    setPage("ticket");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F8F8] font-sans selection:bg-[#D4AF37] selection:text-black">
      <header className="bg-[#111111]/80 backdrop-blur-md border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-[#D4AF37] font-bold text-xl tracking-wider flex items-center gap-2 cursor-pointer" onClick={() => setPage("home")}>
              <span className="text-2xl">⚡</span> CineX GOLD
            </div>
            <nav className="hidden md:flex gap-3 text-sm text-[#C0C0C0] ml-6">
              <button onClick={() => setPage("home")} className={`px-4 py-2 rounded-full transition ${page === 'home' ? 'text-black bg-[#D4AF37] font-bold' : 'hover:text-[#F2D675]'}`}>Beranda</button>
              <button onClick={() => setPage("now_playing")} className={`px-4 py-2 rounded-full transition ${page === 'now_playing' ? 'text-black bg-[#D4AF37] font-bold' : 'hover:text-[#F2D675]'}`}>Sedang Tayang</button>
              {user && <button onClick={() => setPage("history")} className={`px-4 py-2 rounded-full transition ${page === 'history' ? 'text-black bg-[#D4AF37] font-bold' : 'hover:text-[#F2D675]'}`}>Tiket Saya</button>}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm text-[#C0C0C0]">Hai, <span className="font-semibold text-[#F8F8F8]">{user.name}</span></div>
                <button onClick={logout} className="px-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition">Logout</button>
              </>
            ) : (
              <button onClick={() => setPage("login")} className="px-6 py-2 bg-[#D4AF37] text-black rounded-full font-bold hover:bg-[#F2D675] shadow-[0_0_15px_rgba(212,175,55,0.4)] transition">Login</button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === "home" && <Home movies={movies} onBook={startBooking} onSeeSchedule={() => setPage("now_playing")} />}
        {page === "now_playing" && <NowPlaying movies={movies} onBook={startBooking} />}
        {page === "history" && <TicketHistory tickets={tickets} onViewTicket={(t) => { setTicket(t); setPage("ticket"); }} />}
        {page === "login" && <Login onLogin={(name) => { login(name); setPage("home"); }} />}
        {page === "book" && selectedMovie && <Booking movie={selectedMovie} onBack={() => setPage("now_playing")} selectedSchedule={selectedSchedule} setSelectedSchedule={setSelectedSchedule} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} proceedToPayment={proceedToPayment} />}
        
        {/* Updated Professional Payment Component */}
        {page === "payment" && selectedMovie && (
          <PaymentProfessional
            movie={selectedMovie}
            schedule={selectedSchedule}
            seats={selectedSeats}
            onBack={() => setPage("book")}
            onPay={(details) => completePayment(details)}
          />
        )}
        
        {page === "ticket" && ticket && <TicketView ticket={ticket} onPrint={() => window.print()} />}
      </main>

      <footer className="py-12 border-t border-[#333]">
        <div className="max-w-6xl mx-auto text-center">
           <div className="text-[#D4AF37] font-bold text-2xl tracking-wider mb-4">CineX GOLD</div>
           <p className="text-sm text-gray-500">© {new Date().getFullYear()} CineX GOLD — Tasikmalaya. Experience Cinema like never before.</p>
        </div>
      </footer>
    </div>
  );
}

// -------------------- NEW PROFESSIONAL PAYMENT COMPONENT --------------------

function PaymentProfessional({ movie, schedule, seats, onBack, onPay }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  
  // Card States
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Wallet State
  const [eWalletNumber, setEWalletNumber] = useState("");

  const ticketPrice = movie.price * seats.length;
  const serviceFee = 3000 * seats.length;
  const total = ticketPrice + serviceFee;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePayProcess = () => {
    if (paymentMethod === 'card') {
      if (!cardName || cardNumber.length < 16 || !expiry || !cvv) {
        alert("Mohon lengkapi detail kartu kredit dengan benar.");
        return;
      }
    } else {
      if (!eWalletNumber || eWalletNumber.length < 9) {
        alert("Mohon masukkan nomor HP/Akun yang valid.");
        return;
      }
    }

    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        const details = {
            method: paymentMethod.toUpperCase(),
            total: total,
            cardName: paymentMethod === 'card' ? cardName : null,
            accountNumber: paymentMethod !== 'card' ? eWalletNumber : null
        };
        onPay(details);
    }, 2000);
  };

  const methods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <Icons.CreditCard />, description: 'Visa, Mastercard, JCB' },
    { id: 'qris', label: 'QRIS', icon: <div className="font-bold text-xs">QR</div>, description: 'Scan with GoPay, OVO, Dana' },
    { id: 'dana', label: 'DANA', icon: <Icons.Smartphone />, description: 'Direct Debit' },
    { id: 'ovo', label: 'OVO', icon: <Icons.Smartphone />, description: 'Direct Debit' },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-20 animate-fade-in">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="flex items-center gap-2 text-[#888] hover:text-[#D4AF37] transition">
                <Icons.ChevronLeft /> Kembali
            </button>
            <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 rounded-full border border-[#D4AF37]/20">
                <Icons.Clock />
                <span className="text-[#D4AF37] font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                <span className="text-xs text-[#888] ml-1">Selesaikan pembayaran</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Icons.Lock /> Metode Pembayaran
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {methods.map((method) => (
                            <div 
                                key={method.id}
                                className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                                    paymentMethod === method.id 
                                    ? 'bg-[#1A1A1A] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                                    : 'bg-[#0F0F0F] border-white/5 hover:bg-[#1A1A1A] cursor-pointer'
                                }`}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === method.id ? 'bg-[#D4AF37] text-black' : 'bg-[#222] text-[#666]'}`}>
                                            {method.icon}
                                        </div>
                                        <div>
                                            <div className={`font-semibold ${paymentMethod === method.id ? 'text-white' : 'text-[#888]'}`}>{method.label}</div>
                                            <div className="text-xs text-[#555]">{method.description}</div>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === method.id ? 'border-[#D4AF37]' : 'border-[#444]'}`}>
                                        {paymentMethod === method.id && <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>}
                                    </div>
                                </div>

                                {/* EXPANDABLE CONTENT FOR CARD */}
                                {paymentMethod === 'card' && method.id === 'card' && (
                                    <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818]">
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            {/* CSS CREDIT CARD VISUALIZATION */}
                                            <div className="w-full md:w-80 h-48 rounded-xl bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-black border border-[#D4AF37]/30 relative p-6 shadow-2xl flex flex-col justify-between shrink-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-12 h-8 bg-[#D4AF37]/20 rounded border border-[#D4AF37]/40"></div> {/* Chip */}
                                                    <div className="text-[#D4AF37] font-bold italic tracking-widest">VISA</div>
                                                </div>
                                                <div className="font-mono text-xl tracking-widest text-white shadow-black drop-shadow-md">
                                                    {cardNumber || "•••• •••• •••• ••••"}
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <div className="text-[10px] text-[#888] uppercase tracking-wider">Card Holder</div>
                                                        <div className="text-sm font-medium text-white tracking-wide uppercase truncate max-w-[150px]">
                                                            {cardName || "YOUR NAME"}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-[#888] uppercase tracking-wider">Expires</div>
                                                        <div className="text-sm font-medium text-white tracking-wide">{expiry || "MM/YY"}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* FORM INPUTS */}
                                            <div className="w-full space-y-4">
                                                <div>
                                                    <label className="text-xs text-[#888] block mb-1">Nomor Kartu</label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="19"
                                                        value={cardNumber} 
                                                        onChange={(e) => {
                                                            const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                            setCardNumber(v);
                                                        }}
                                                        placeholder="0000 0000 0000 0000"
                                                        className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none font-mono"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-[#888] block mb-1">Nama Pemilik</label>
                                                    <input 
                                                        type="text" 
                                                        value={cardName} 
                                                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                        placeholder="NAMA LENGKAP"
                                                        className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none"
                                                    />
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-1/2">
                                                        <label className="text-xs text-[#888] block mb-1">Masa Berlaku</label>
                                                        <input 
                                                            type="text" 
                                                            maxLength="5"
                                                            value={expiry} 
                                                            onChange={(e) => {
                                                                let v = e.target.value.replace(/\D/g, '');
                                                                if(v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2,4);
                                                                setExpiry(v);
                                                            }}
                                                            placeholder="MM/YY"
                                                            className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none text-center"
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="text-xs text-[#888] block mb-1">CVV</label>
                                                        <input 
                                                            type="password" 
                                                            maxLength="3"
                                                            value={cvv}
                                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
                                                            placeholder="123"
                                                            className="w-full bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none text-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* EXPANDABLE CONTENT FOR WALLETS */}
                                {paymentMethod === method.id && ['dana', 'ovo', 'gopay'].includes(method.id) && (
                                     <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818]">
                                        <label className="text-xs text-[#888] block mb-1">Nomor HP Terdaftar</label>
                                        <div className="flex gap-2">
                                            <span className="bg-[#222] border border-[#333] rounded p-3 text-[#888]">+62</span>
                                            <input 
                                                type="tel"
                                                value={eWalletNumber}
                                                onChange={(e) => setEWalletNumber(e.target.value.replace(/\D/g,''))}
                                                placeholder="812 3456 7890"
                                                className="flex-1 bg-[#111] border border-[#333] rounded p-3 text-white focus:border-[#D4AF37] outline-none"
                                            />
                                        </div>
                                        <p className="text-xs text-[#666] mt-2 flex items-center gap-1">
                                            <Icons.ShieldCheck /> Pembayaran aman & terenkripsi.
                                        </p>
                                     </div>
                                )}
                                
                                {/* QRIS DISPLAY */}
                                {paymentMethod === 'qris' && method.id === 'qris' && (
                                    <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-[#181818] flex flex-col items-center text-center">
                                        <div className="bg-white p-4 rounded-xl mt-4">
                                            <QRCodeSVG value="PAYMENT-QRIS" />
                                        </div>
                                        <p className="text-sm text-[#888] mt-4">Scan QR di atas menggunakan aplikasi pembayaran favorit Anda.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-[#141414] border border-[#D4AF37]/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative h-48">
                        <img src={movie.image} alt="poster" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-2xl font-bold text-white leading-tight shadow-black drop-shadow-md">{movie.title}</h3>
                            <div className="text-sm text-[#D4AF37] font-medium mt-1">{movie.genre}</div>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <Icons.Calendar />
                            <div>
                                <div className="text-sm text-[#888]">Jadwal Tayang</div>
                                <div className="text-white font-medium">{schedule.date}, {schedule.time}</div>
                                <div className="text-xs text-[#666]">{schedule.studio}</div>
                            </div>
                        </div>
                         <div className="flex items-start gap-3 pb-4 border-b border-white/5">
                            <Icons.MapPin />
                            <div>
                                <div className="text-sm text-[#888]">Kursi Dipilih ({seats.length})</div>
                                <div className="text-[#D4AF37] font-bold tracking-wide">{seats.join(', ')}</div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#888]">Tiket ({seats.length}x)</span>
                                <span className="text-white">Rp{ticketPrice.toLocaleString('id-ID')}</span>
                            </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-[#888]">Biaya Layanan</span>
                                <span className="text-white">Rp{serviceFee.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#888]">Diskon</span>
                                <span className="text-[#D4AF37]">-Rp0</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 mt-2">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-white">Total Bayar</span>
                                <span className="text-2xl font-bold text-[#D4AF37]">Rp{total.toLocaleString('id-ID')}</span>
                            </div>
                            
                            <button 
                                onClick={handlePayProcess}
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>Processing...</>
                                ) : (
                                    <>Bayar Sekarang <Icons.CheckCircle /></>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-[#666] mt-3">
                                Dengan membayar, Anda menyetujui S&K CineX Gold.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

// -------------------- Existing Components (Unchanged) --------------------

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = () => {
    if (isSignUp) {
        if (!name || !email || !password || !confirmPassword) { alert("Mohon lengkapi semua data pendaftaran."); return; }
        if (password !== confirmPassword) { alert("Konfirmasi password tidak cocok."); return; }
    } else {
        if (!email && !name) { alert("Mohon isi Email atau ID Pengguna."); return; }
    }
    const displayName = name || (email ? email.split('@')[0] : "User");
    onLogin(displayName);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl bg-[#141414] rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20 relative">
        <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
             <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" alt="Cinema Background" className="w-full h-full object-cover opacity-60 scale-110"/> <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div></div>
             <div className="relative z-10 p-10 text-center">
                 <div className="inline-block p-3 rounded-full border-2 border-[#D4AF37] mb-6"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg></div>
                 <h2 className="text-4xl font-bold text-[#F8F8F8] mb-4 tracking-wide font-serif">Cinema Reimagined.</h2>
                 <p className="text-[#C0C0C0] text-lg leading-relaxed">Nikmati pengalaman menonton kelas dunia dengan kenyamanan premium dan teknologi terkini.</p>
             </div>
        </div>
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 bg-[#141414] relative">
            <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-[#F8F8F8] mb-2">{isSignUp ? "Bergabung Bersama Kami" : "Selamat Datang Kembali"}</h2>
                <p className="text-[#888] mb-8">{isSignUp ? "Daftar akun baru untuk akses fitur eksklusif." : "Silakan masukkan detail akun Anda untuk masuk."}</p>
                <div className="space-y-5">
                    {isSignUp && (
                        <div className="group"><label className="block text-xs font-medium text-[#D4AF37] mb-1 uppercase tracking-wider">Nama Lengkap</label><input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-[#F8F8F8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" placeholder="John Doe"/></div>
                    )}
                    <div><label className="block text-xs font-medium text-[#D4AF37] mb-1 uppercase tracking-wider">{isSignUp ? "Alamat Email" : "Email / Username"}</label><input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-[#F8F8F8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" placeholder="nama@email.com"/></div>
                    <div><div className="flex justify-between items-center mb-1"><label className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">Password</label>{!isSignUp && <button className="text-xs text-[#888] hover:text-[#F8F8F8] transition">Lupa Password?</button>}</div><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-[#F8F8F8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" placeholder="••••••••"/></div>
                    {isSignUp && (<div><label className="block text-xs font-medium text-[#D4AF37] mb-1 uppercase tracking-wider">Konfirmasi Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg text-[#F8F8F8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all" placeholder="••••••••"/></div>)}
                </div>
                <div className="mt-8"><button onClick={handleAuth} className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B4941F] text-black font-bold rounded-lg shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.01] transition-all duration-200">{isSignUp ? "Buat Akun" : "Masuk Sekarang"}</button>{!isSignUp && (<button onClick={() => onLogin("Tamu")} className="w-full mt-3 py-3.5 bg-transparent border border-[#333] text-[#888] font-medium rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200">Masuk sebagai Tamu</button>)}</div>
                <div className="mt-8 text-center text-sm text-[#888]">{isSignUp ? "Sudah memiliki akun? " : "Belum punya akun? "}<button onClick={() => { setIsSignUp(!isSignUp); setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); }} className="text-[#D4AF37] font-semibold hover:text-[#F2D675] transition ml-1">{isSignUp ? "Login disini" : "Daftar sekarang"}</button></div>
            </div>
        </div>
      </div>
    </div>
  );
}

function TicketHistory({ tickets, onViewTicket }) {
    if (tickets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mb-4"><span className="text-2xl">🎟️</span></div>
                <h2 className="text-xl font-bold text-[#F8F8F8]">Belum ada tiket</h2>
                <p className="text-[#C0C0C0] mt-2 max-w-sm">Anda belum memesan film apapun. Silakan pesan film di menu Sedang Tayang.</p>
            </div>
        );
    }
    return (
        <section>
             <div className="bg-[#111111] p-6 rounded-2xl border border-[#D4AF37]/10 mb-8 flex justify-between items-center">
                <div><h2 className="text-2xl font-bold text-[#F8F8F8] mb-1">🎫 Tiket Saya</h2><p className="text-[#C0C0C0] text-sm">Riwayat pemesanan tiket bioskop Anda.</p></div>
                <div className="bg-[#1A1A1A] px-4 py-2 rounded text-[#D4AF37] font-bold">{tickets.length} Tiket</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tickets.map((t, idx) => (
                    <div key={idx} className="bg-[#141414] border border-[#D4AF37]/20 rounded-xl p-4 flex gap-4 hover:border-[#D4AF37] transition duration-300">
                        <img src={t.movie.image} alt={t.movie.title} className="w-24 h-32 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex flex-col justify-between w-full">
                            <div>
                                <h3 className="font-bold text-lg text-[#F8F8F8]">{t.movie.title}</h3>
                                <div className="text-sm text-[#C0C0C0] mt-1 flex items-center gap-2"><span>📅 {t.schedule.date}</span><span>⏰ {t.schedule.time}</span></div>
                                <div className="text-sm text-[#C0C0C0] mt-1">{t.schedule.studio}</div>
                            </div>
                            <div className="flex items-end justify-between mt-3">
                                <div className="text-sm"><span className="text-gray-500 block text-xs">Kursi</span><span className="text-[#D4AF37] font-semibold">{t.seats.join(', ')}</span></div>
                                <button onClick={() => onViewTicket(t)} className="px-3 py-1.5 bg-[#1A1A1A] text-[#F8F8F8] border border-[#D4AF37]/30 rounded text-sm hover:bg-[#D4AF37] hover:text-black transition">Lihat QR</button>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </section>
    );
}

function Home({ movies, onBook, onSeeSchedule }) {
  const featuredMovies = movies.slice(0, 3);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) { alert("Mohon masukkan email yang valid."); return; }
    setIsSubscribed(true); setEmail("");
  };

  return (
    <div className="space-y-16">
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12 group border border-[#D4AF37]/20">
        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-8 md:px-12">
            <span className="text-[#D4AF37] font-bold tracking-widest uppercase mb-4 text-sm animate-pulse">Cinematic Excellence</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif">Rasakan Magisnya <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D675]">Layar Lebar</span></h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">Nikmati film terkini dengan kualitas suara Dolby Atmos, visual 4K Laser, dan kenyamanan kursi premium CineX Gold.</p>
            <div className="flex gap-4"><button onClick={() => document.getElementById('trending-section').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#F2D675] hover:scale-105 transition shadow-lg shadow-[#D4AF37]/20">Pesan Tiket</button><button onClick={onSeeSchedule} className="px-8 py-3.5 border border-white/30 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition">Lihat Jadwal</button></div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
         <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition group"><div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition group-hover:bg-[#D4AF37]/20">🎥</div><h3 className="text-lg font-bold text-white mb-2">4K Laser Projection</h3><p className="text-sm text-gray-400 leading-relaxed">Visual tajam dan warna hidup yang memanjakan mata Anda di setiap adegan.</p></div>
         <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition group"><div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition group-hover:bg-[#D4AF37]/20">🔊</div><h3 className="text-lg font-bold text-white mb-2">Dolby Atmos Sound</h3><p className="text-sm text-gray-400 leading-relaxed">Suara 360 derajat yang jernih dan kuat, menempatkan Anda di tengah aksi.</p></div>
         <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition group"><div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition group-hover:bg-[#D4AF37]/20">💺</div><h3 className="text-lg font-bold text-white mb-2">Premium Recliners</h3><p className="text-sm text-gray-400 leading-relaxed">Kenyamanan maksimal dengan kursi kulit yang bisa direbahkan sepenuhnya.</p></div>
      </section>

      <section id="trending-section">
        <div className="flex items-end justify-between mb-8"><div><span className="text-[#D4AF37] font-bold text-sm tracking-wider uppercase">Pilihan Penonton</span><h2 className="text-3xl font-bold text-[#F8F8F8] mt-1">Film Trending Minggu Ini</h2></div><button className="hidden md:block text-[#D4AF37] hover:text-white transition text-sm font-medium">Lihat Semua &rarr;</button></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((m) => (
            <div key={m.id} className="group bg-[#141414] rounded-2xl overflow-hidden border border-[#D4AF37]/10 transition hover:border-[#D4AF37]/50 hover:shadow-2xl hover:shadow-[#D4AF37]/10 duration-500 flex flex-col h-full relative">
                <div className="relative overflow-hidden aspect-[2/3] sm:aspect-video lg:aspect-[4/3]">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 bg-[#D4AF37]/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">TRENDING #1</div>
                </div>
                <div className="p-6 flex flex-col flex-1 -mt-12 relative z-10">
                    <h3 className="font-bold text-2xl text-[#F8F8F8] mb-2 leading-tight group-hover:text-[#D4AF37] transition">{m.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-[#888] mb-4"><span className="flex items-center gap-1"><span className="text-[#D4AF37]">★</span> {m.rating}</span><span>•</span><span>{m.genre}</span><span>•</span><span>{m.duration}</span></div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">{m.synopsis}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <div><span className="block text-xs text-[#666]">Harga Tiket</span><span className="text-[#D4AF37] font-bold text-lg">Rp{m.price.toLocaleString()}</span></div>
                        <button onClick={() => onBook(m)} className="px-6 py-2 bg-[#F8F8F8] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition duration-300">Pesan</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </section>

      <section className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16 text-center border border-[#D4AF37]/20">
         <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1517604931442-71053e6e2306?q=80&w=2070&auto=format&fit=crop" alt="Cinema Crowd" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-[#111]"></div></div>
         <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold text-[#F8F8F8] mb-4">{isSubscribed ? "Selamat Datang di CineX Gold!" : "Gabung Member CineX Gold"}</h2>
             <p className="text-[#C0C0C0] mb-8">{isSubscribed ? "Terima kasih telah berlangganan. Cek inbox Anda untuk penawaran eksklusif kami." : "Dapatkan akses eksklusif, diskon tiket, popcorn gratis, dan undangan premiere film terbaru langsung di inbox Anda."}</p>
             {!isSubscribed ? (
               <div className="flex flex-col sm:flex-row gap-4 justify-center"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email Anda" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white focus:border-[#D4AF37] outline-none w-full sm:w-auto min-w-[300px]" /><button onClick={handleSubscribe} className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#F2D675] transition">Daftar Gratis</button></div>
             ) : (<div className="inline-block px-8 py-3 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-full animate-bounce">✓ Member Aktif</div>)}
         </div>
      </section>
    </div>
  );
}

function NowPlaying({ movies, onBook }) {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const genres = ["All", ...new Set(movies.map(m => m.genre.split(' / ')[0]))];

  const filteredMovies = movies.filter(m => {
    const matchesFilter = filter === "All" || m.genre.includes(filter);
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="min-h-screen py-8">
       <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
         <div><span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">Jadwal Bioskop</span><h2 className="text-4xl font-bold text-white mt-2">Sedang Tayang</h2></div>
         <div className="relative w-full md:w-auto"><input type="text" placeholder="Cari film..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-full text-sm text-white focus:border-[#D4AF37] outline-none w-full md:w-64 transition-all focus:w-full md:focus:w-80"/><svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>
       </div>

       <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-[#333]">
         {genres.slice(0, 6).map(g => (
           <button key={g} onClick={() => setFilter(g)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === g ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#252525]'}`}>{g}</button>
         ))}
       </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {filteredMovies.map((m) => (
            <div key={m.id} className="group relative bg-[#121212] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
                <div className="relative aspect-[2/3] overflow-hidden">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1"><span className="text-[#D4AF37] text-xs">★</span><span className="text-white text-xs font-bold">{m.rating}</span></div>
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-[#D4AF37] text-sm font-medium mb-2">{m.genre}</p><h3 className="text-white font-bold text-lg mb-4 leading-tight">{m.title}</h3><p className="text-gray-400 text-xs mb-6 line-clamp-3">{m.synopsis}</p><button onClick={() => onBook(m)} className="bg-[#D4AF37] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#F2D675] hover:scale-105 transition-all w-full">Pesan Tiket</button>
                    </div>
                </div>
                <div className="p-4 bg-[#1A1A1A] border-t border-[#333] group-hover:border-[#D4AF37]/30 transition-colors">
                    <h3 className="text-white font-bold truncate group-hover:text-[#D4AF37] transition-colors">{m.title}</h3>
                    <div className="flex items-center justify-between mt-2"><span className="text-gray-500 text-xs">{m.duration}</span><span className="text-[#D4AF37] text-sm font-bold">Rp{m.price.toLocaleString()}</span></div>
                </div>
            </div>
            ))}
        </div>
      ) : (<div className="text-center py-20"><div className="text-6xl mb-4">🔍</div><h3 className="text-xl font-bold text-white">Film tidak ditemukan</h3><p className="text-gray-500 mt-2">Coba kata kunci lain atau ubah filter genre.</p></div>)}
    </section>
  );
}

function Booking({ movie, onBack, selectedSchedule, setSelectedSchedule, selectedSeats, setSelectedSeats, proceedToPayment }) {
  const schedules = movie.schedules;
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2 bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/10 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={movie.image} alt="poster" className="w-full sm:w-40 h-56 rounded-lg object-cover flex-shrink-0" />
          <div className="w-full">
            <h3 className="text-2xl font-bold text-[#F8F8F8]">{movie.title}</h3>
            <p className="text-sm text-[#C0C0C0] mt-1">{movie.genre} • {movie.duration} • {movie.rating}</p>
            <h4 className="mt-6 font-semibold text-[#F8F8F8]">Pilih Jadwal</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {schedules.map((s) => (
                <button key={s.id} onClick={() => setSelectedSchedule(s)} className={`px-3 py-2 rounded font-medium transition ${selectedSchedule?.id===s.id ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-[#1A1A1A] text-[#C0C0C0] border border-[#D4AF37]/8 hover:bg-[#2A2A2A]'}`}>{s.date.substring(5)} • {s.time} ({s.studio})</button>
              ))}
            </div>
            <h4 className="mt-6 font-semibold text-[#F8F8F8]">Pilih Kursi</h4>
            <SeatSelector selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} rows={6} cols={8} />
            <div className="mt-6 flex items-center justify-between border-t border-[#D4AF37]/10 pt-4">
              <button onClick={onBack} className="px-4 py-2 border border-[#D4AF37]/10 rounded text-[#C0C0C0] hover:bg-[#1A1A1A] transition">Kembali</button>
              <div className="text-right">
                <div className="text-sm text-[#C0C0C0]">Total Harga ({selectedSeats.length} Kursi)</div>
                <div className="font-bold text-xl text-[#F8F8F8]">Rp{(selectedSeats.length * movie.price).toLocaleString('id-ID')}</div>
                <div className="mt-2"><button onClick={proceedToPayment} disabled={!selectedSchedule || selectedSeats.length === 0} className={`px-4 py-2 rounded-lg font-semibold transition ${!selectedSchedule || selectedSeats.length === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#D4AF37] text-black hover:bg-[#F2D675]'}`}>Lanjut ke Bayar</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="lg:col-span-1 bg-[#141414] p-6 rounded-2xl border border-[#D4AF37]/10 shadow-lg h-fit">
        <h4 className="font-bold text-xl text-[#F8F8F8]">Ringkasan Pesanan</h4>
        <div className="mt-4 text-sm text-[#C0C0C0] space-y-2">
          <div className="pb-2 border-b border-[#D4AF37]/5"><span className="font-semibold text-[#F8F8F8]">Film:</span> {movie.title}</div>
          <div className="pb-2 border-b border-[#D4AF37]/5"><span className="font-semibold text-[#F8F8F8]">Jadwal:</span> {selectedSchedule ? `${selectedSchedule.date.substring(5)} ${selectedSchedule.time} (${selectedSchedule.studio})` : '-'}</div>
          <div className="pb-2 border-b border-[#D4AF37]/5"><span className="font-semibold text-[#F8F8F8]">Kursi Dipilih:</span> {selectedSeats.length ? selectedSeats.join(', ') : 'Belum ada kursi'}</div>
          <div className="pt-2 text-lg flex justify-between"><span className="font-bold text-[#F8F8F8]">Total:</span> <span className="font-bold text-[#D4AF37]">Rp{(selectedSeats.length * movie.price).toLocaleString('id-ID')}</span></div>
        </div>
      </aside>
    </div>
  );
}

function SeatSelector({ rows = 6, cols = 8, selectedSeats, setSelectedSeats }) {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);
    for (let c = 1; c <= cols; c++) seats.push(rowLetter + c);
  }
  const initiallyBooked = new Set(["A1","A2","B3","C5", "F8"]);

  const toggleSeat = (s) => {
    if (initiallyBooked.has(s)) return;
    if (selectedSeats.includes(s)) { setSelectedSeats(selectedSeats.filter(x => x !== s)); } else { setSelectedSeats([...selectedSeats, s]); }
  }

  return (
    <div className="mt-3">
      <div className="text-center bg-gray-900 border border-[#D4AF37]/10 text-xs text-[#D4AF37] py-2 rounded-t-lg mb-4 shadow-inner font-mono tracking-widest">LAYAR BIOSKOP</div>
      <div className="grid gap-3 p-4 border border-[#D4AF37]/10 rounded-b-lg bg-[#111111]" style={{gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`}}>
        {seats.map((s) => {
          const booked = initiallyBooked.has(s);
          const selected = selectedSeats.includes(s);
          return (
            <button key={s} disabled={booked} onClick={() => toggleSeat(s)} className={`text-xs sm:text-sm py-2 rounded-lg font-mono transition duration-150 ease-in-out shadow-md ${booked ? 'bg-[#3A3A3A] text-gray-500 cursor-not-allowed opacity-70' : selected ? 'bg-[#D4AF37] text-black font-bold transform scale-105' : 'bg-[#1A1A1A] text-[#C0C0C0] hover:bg-[#2A2A2A] active:scale-95'}`}>{s}</button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#C0C0C0] justify-center">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-[#1A1A1A] border border-[#D4AF37]/8 rounded-sm"></span> Tersedia</span> 
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-[#D4AF37] rounded-sm"></span> Dipilih</span> 
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-[#3A3A3A] rounded-sm"></span> Terisi</span>
      </div>
    </div>
  );
}

function TicketView({ ticket, onPrint }) {
  const paymentMethod = ticket.payment?.method || 'Tidak Diketahui';
  return (
    <div className="max-w-3xl mx-auto bg-[#141414] border border-[#D4AF37]/10 p-6 rounded-2xl shadow-xl">
      <div className="flex items-start justify-between"><div><h2 className="text-2xl font-bold text-[#F8F8F8]">Tiket Anda</h2><p className="text-sm text-[#C0C0C0]">Tunjukkan tiket ini di pintu masuk bioskop.</p></div><div><button onClick={onPrint} className="px-4 py-2 bg-[#D4AF37] text-black rounded hover:bg-[#F2D675] transition">Cetak / Print</button></div></div>
      <div className="mt-6 border rounded-lg overflow-hidden border-[#D4AF37]/20">
        <div className="p-6 bg-gradient-to-r from-[#1A1A1A] to-[#111111] text-[#D4AF37] flex flex-col sm:flex-row items-start gap-6"><img src={ticket.movie.image} alt="poster" className="w-24 h-32 object-cover rounded flex-shrink-0" /><div className="flex-grow"><div className="text-xl font-bold text-[#F8F8F8]">{ticket.movie.title}</div><div className="text-sm text-[#C0C0C0]">{ticket.movie.genre} • {ticket.movie.duration} • {ticket.movie.rating}</div><div className="mt-4 text-[#F8F8F8] font-medium">Jadwal: <span className="font-semibold">{ticket.schedule.date} {ticket.schedule.time} ({ticket.schedule.studio})</span></div><div className="text-[#F8F8F8] font-medium">Kursi: <span className="font-semibold text-[#D4AF37]">{ticket.seats.join(', ')}</span></div></div></div>
        <div className="p-6 bg-[#141414] flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div><div className="text-slate-400 text-sm">Nama Pemesan</div><div className="font-bold text-[#F8F8F8] text-lg">{ticket.user.name}</div><div className="text-slate-400 text-sm mt-3">Metode Bayar</div><div className="font-medium text-sm text-[#D4AF37]">{paymentMethod}</div><div className="text-slate-400 text-sm mt-3">Kode Booking</div><div className="font-mono text-base text-[#C0C0C0]">{ticket.code}</div></div>
          <div className="text-right mt-6 sm:mt-0"><div className="text-slate-400 text-sm">Total Dibayar</div><div className="font-bold text-2xl text-[#F8F8F8]">Rp{ticket.payment?.total?.toLocaleString('id-ID') || (ticket.seats.length * ticket.movie.price).toLocaleString('id-ID')}</div><div className="mt-4"><QRCodeSVG value={ticket.code} /></div></div>
        </div>
      </div>
      <p className="mt-4 text-xs text-[#C0C0C0]">(Simpan atau cetak tiket ini. Demo app — integrasikan backend untuk penyimpanan/validasi nyata.)</p>
    </div>
  );
}