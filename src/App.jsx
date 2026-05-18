import { useEffect, useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaUser,
  FaCalendarAlt
} from "react-icons/fa";

import {
  MdEmail,
  MdLocationOn,
} from "react-icons/md";

import { supabase } from "./supabaseClient";

// Resilient Fallback Data System
const FALLBACK_PROFILE = {
  name: "Madadina Adilah Pamuji",
  title: "Backend Engineer",
  bio: "Specializing in designing and building robust, scalable APIs, microservices, and high-performance system architectures to power seamless digital experiences.",
  summary: "I am a dedicated Backend Engineer with a strong passion for designing scalable architectures, managing databases, and building robust APIs. I combine my expertise in server-side technologies with a deep understanding of system performance to deliver secure and efficient solutions that drive business growth.",
  age: 22,
  location: "Indonesia",
  email: "madadnap@gmail.com",
  whatsapp: "https://wa.me/62895397081000",
  years_experience: "2+",
  projects_completed: "10+",
  available_for_work: true,
  cv_url: "CV_Madadina.pdf",
  photo_url: "/mada.jpeg"
};

const FALLBACK_ROW1_SKILLS = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
];

const FALLBACK_ROW2_SKILLS = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Ubuntu", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
];

const FALLBACK_SOCIALS = [
  { platform: "GitHub", url: "https://github.com/drzasrly", icon_name: "FaGithub" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/usernamekamu", icon_name: "FaLinkedin" },
  { platform: "Instagram", url: "https://instagram.com/madadinaaap", icon_name: "FaInstagram" },
  { platform: "Email", url: "mailto:madadnap@gmail.com", icon_name: "MdEmail" },
];

const getSocialIcon = (iconName) => {
  switch (iconName) {
    case "FaGithub":
      return <FaGithub />;
    case "FaLinkedin":
      return <FaLinkedin />;
    case "FaInstagram":
      return <FaInstagram />;
    case "MdEmail":
      return <MdEmail />;
    default:
      return <FaUser />;
  }
};

export default function App() {
  const [processedImage, setProcessedImage] = useState(null);
  const [showPhoto, setShowPhoto] = useState(true);
  
  // Supabase dynamic data states
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [row1Skills, setRow1Skills] = useState(FALLBACK_ROW1_SKILLS);
  const [row2Skills, setRow2Skills] = useState(FALLBACK_ROW2_SKILLS);
  const [socials, setSocials] = useState(FALLBACK_SOCIALS);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // GitHub projects list
  const [projects, setProjects] = useState([]);

  // Contact Form states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  // 1. Fetch Parallel Data from Supabase
  useEffect(() => {
    async function loadPortfolioData() {
      if (!supabase) {
        setIsDataLoading(false);
        return;
      }

      try {
        const [profileRes, skillsRes, socialsRes] = await Promise.all([
          supabase.from("profile").select("*").maybeSingle(),
          supabase.from("skills").select("*"),
          supabase.from("socials").select("*"),
        ]);

        if (profileRes.data) {
          setProfile(profileRes.data);
        }
        if (skillsRes.data && skillsRes.data.length > 0) {
          const row1 = skillsRes.data.filter(s => s.row_number === 1);
          const row2 = skillsRes.data.filter(s => s.row_number === 2);
          if (row1.length > 0) setRow1Skills(row1);
          if (row2.length > 0) setRow2Skills(row2);
        }
        if (socialsRes.data && socialsRes.data.length > 0) {
          setSocials(socialsRes.data);
        }
      } catch (error) {
        console.warn("Error fetching data from Supabase. Falling back to local data.", error);
      } finally {
        setIsDataLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  // 2. Process image removal based on the fetched profile photo
  useEffect(() => {
    if (!profile.photo_url) return;
    async function processImage() {
      try {
        const imgUrl = profile.photo_url.startsWith("http")
          ? profile.photo_url
          : `${import.meta.env.BASE_URL}${profile.photo_url.replace(/^\//, "")}`;
        const blob = await removeBackground(imgUrl);
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
      } catch (error) {
        console.log("Background removal failed, using original photo:", error);
      }
    }
    processImage();
  }, [profile.photo_url]);

  // 3. Mouse move trail icons
  useEffect(() => {
    const trailIcons = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    ];

    let iconIndex = 0;
    let lastTime = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return;
      lastTime = now;

      const el = document.createElement("img");
      el.src = trailIcons[iconIndex % trailIcons.length];
      el.className = "pointer-events-none fixed z-[9999] w-6 h-6 object-contain animate-trail drop-shadow-md";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;

      document.body.appendChild(el);
      iconIndex++;

      setTimeout(() => {
        if (el && el.parentNode) {
          el.remove();
        }
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 4. Fetch GitHub projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("https://api.github.com/users/drzasrly/repos?sort=updated&per_page=6");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchProjects();
  }, []);

  // 5. Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // 5a. Save to Supabase (if client is initialized)
      if (supabase) {
        const { error } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: formData.message,
            },
          ]);
        if (error) throw error;
      }

      // 5b. Submit to FormSubmit.co asynchronously using AJAX (no page redirect)
      const formSubmitUrl = `https://formsubmit.co/ajax/${profile.email}`;
      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to deliver message email notification.");
      }

      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      
      // Auto-hide success status after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: err.message || "Failed to send message. Please check your network and try again." 
      });
    }
  };

  // Render Premium Skeleton Loading Page
  if (isDataLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* GLOW ORBS */}
        <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[150px] pointer-events-none" />
        
        {/* GLASS CARD PULSING */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-12 max-w-md w-full shadow-2xl flex flex-col items-center text-center gap-6 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-purple-200/60 border border-white flex items-center justify-center text-purple-500">
            <svg className="animate-spin h-8 w-8" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-violet-900 mb-2">Loading Portfolio</h2>
            <p className="text-violet-600 font-medium text-sm">Connecting to database...</p>
          </div>
          <div className="w-full flex gap-3 justify-center">
            <div className="h-3 bg-purple-200/50 rounded-full w-1/3" />
            <div className="h-3 bg-purple-200/50 rounded-full w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  // Formatting helper for social media item link display
  const getSocialText = (platform, url) => {
    if (platform === "Email") return url.replace("mailto:", "");
    return url
      .replace("https://", "")
      .replace("www.", "")
      .replace("linkedin.com/in/", "linkedin/")
      .replace("instagram.com/", "instagram/");
  };

  return (
    <div className="
      min-h-screen
      w-full
      overflow-x-hidden
      bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100
      text-violet-900
      relative
      font-sans
      ">

      {/* BACKGROUND WATERMARK TEXT (LIKE "QUOTES" IN IMAGE) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10 z-0">
        <h1 className="text-[20vw] font-black tracking-widest text-purple-300 rotate-[-10deg] scale-150">
          PORTFOLIO PORTFOLIO
        </h1>
      </div>

      {/* GLOW ORBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-400/40 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/30 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-400/30 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 px-6 md:px-16 py-8">

        {/* NAVBAR */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl px-6 sm:px-8 py-4 sm:py-5 shadow-lg shadow-purple-900/5 mb-16 sm:mb-24"
        >
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-violet-900">
            Portfolio<span className="text-pink-500">.</span>
          </h1>

          <div className="hidden md:flex gap-10 text-violet-700 font-bold">
            <a href="#home" className="hover:text-pink-500 transition">Home</a>
            <a href="#about" className="hover:text-pink-500 transition">About</a>
            <a href="#skills" className="hover:text-pink-500 transition">Skills</a>
            <a href="#projects" className="hover:text-pink-500 transition">Projects</a>
            <a href="#contact" className="hover:text-pink-500 transition">Contact</a>
          </div>

          <a 
            href={profile.cv_url.startsWith("http") ? profile.cv_url : `${import.meta.env.BASE_URL}${profile.cv_url}`} 
            download={profile.cv_url.split("/").pop()} 
            className="hidden md:block"
          >
            <button className="px-6 py-3 rounded-2xl bg-white/60 border border-purple-200 text-violet-800 font-bold hover:bg-white/80 transition shadow-md shadow-purple-200">
              Download CV
            </button>
          </a>
        </motion.nav>

        {/* HERO */}
        <section id="home" className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/60 border border-purple-200 text-violet-800 font-bold mb-8 backdrop-blur-xl shadow-sm">
              Hello, I'm 👋
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 break-words animate-gradient-text">
              {profile.name.split(" ").slice(0, 1).join("")}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}{profile.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-violet-800">
              {profile.title}
            </h2>

            <p className="text-violet-700 text-xl leading-relaxed max-w-xl mb-10 font-medium">
              {profile.bio}
            </p>

            <div className="flex gap-5 flex-wrap mb-12">
              <a href="#projects" className="block">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:scale-105 transition duration-300 shadow-xl shadow-pink-500/30 font-bold cursor-pointer">
                  View My Work
                </button>
              </a>

              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/50 border border-purple-200 text-violet-800 hover:bg-white/80 transition font-bold shadow-md cursor-pointer">
                  Contact Me
                </button>
              </a>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-5">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-white/50 border border-white/80 backdrop-blur-xl flex items-center justify-center text-2xl text-purple-600 hover:scale-110 hover:bg-white/80 transition duration-300 cursor-pointer shadow-lg shadow-purple-200"
                >
                  {getSocialIcon(social.icon_name)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* CARD */}
            <div className="relative backdrop-blur-2xl bg-blue-50/40 border-2 border-white/80 rounded-[40px] overflow-visible shadow-[0_20px_50px_rgba(100,50,255,0.15)] p-4 h-[420px] sm:h-[500px] md:h-[600px] flex items-end justify-center mx-auto mt-10 md:mt-0">

              {/* INNER GLOWS */}
              <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden rounded-[40px]">
                <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-pink-300/50 rounded-full blur-[80px]" />
                <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-cyan-300/50 rounded-full blur-[80px]" />
              </div>

              {/* IMAGE OR MAGIC ANIMATION */}
              {showPhoto ? (
                <img
                  src={processedImage || (profile.photo_url.startsWith("http") ? profile.photo_url : `${import.meta.env.BASE_URL}${profile.photo_url.replace(/^\//, "")}`)}
                  alt="profile"
                  className="relative z-10 w-full h-[360px] sm:h-[460px] md:h-[580px] object-contain object-bottom mx-auto scale-110 drop-shadow-[0_20px_30px_rgba(100,50,255,0.2)]"
                />
              ) : (
                <div className="relative z-10 w-full h-[360px] sm:h-[460px] md:h-[580px] flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                      borderRadius: ["20%", "50%", "20%"]
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-pink-400 via-purple-500 to-cyan-400 opacity-80 mix-blend-multiply blur-[2px]"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0],
                      borderRadius: ["50%", "20%", "50%"]
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-bl from-cyan-400 via-indigo-500 to-purple-400 opacity-70 mix-blend-multiply blur-[2px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-black text-2xl sm:text-4xl drop-shadow-lg mix-blend-overlay">{"</>"}</span>
                  </div>
                </div>
              )}

              {/* FLOATING BUBBLES / DROPLETS */}
              <div className="absolute top-[-20px] left-[10%] w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />
              <div className="absolute top-[30%] right-[-30px] w-16 h-16 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />
              <div className="absolute bottom-[20%] left-[-20px] w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />

              {/* QUOTATION MARK DECORATIONS */}
              <div className="absolute top-6 left-6 text-6xl text-white/50 font-serif drop-shadow-md z-20">"</div>
              <div className="absolute bottom-12 right-8 text-6xl text-white/50 font-serif drop-shadow-md z-20">"</div>

              {/* FLOATING EXPERIENCE */}
              <div className="absolute top-8 right-[-20px] sm:right-[-40px] scale-75 sm:scale-100 origin-top-right backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-8 py-3 shadow-xl z-30 flex items-center gap-3">
                <h3 className="text-2xl font-black text-purple-700">{profile.years_experience}</h3>
                <p className="text-violet-800 font-bold text-sm leading-tight">Years<br />Experience</p>
              </div>

              {/* FLOATING PROJECTS */}
              <div className="absolute bottom-12 right-[-20px] sm:right-[-40px] scale-75 sm:scale-100 origin-bottom-right backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-8 py-3 shadow-xl z-30 flex items-center gap-3">
                <h3 className="text-2xl font-black text-pink-600">{profile.projects_completed}</h3>
                <p className="text-violet-800 font-bold text-sm leading-tight">Projects<br />Completed</p>
              </div>

              {/* AVAILABLE BADGE */}
              {profile.available_for_work && (
                <div className="absolute left-[-20px] sm:left-[-40px] top-[45%] scale-75 sm:scale-100 origin-left backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-6 py-3 shadow-xl z-30">
                  <h3 className="font-bold text-purple-700">Available</h3>
                  <p className="text-xs text-violet-600 font-semibold">for work</p>
                </div>
              )}
            </div>

            {/* TOGGLE BUTTON */}
            <div className="flex justify-center mt-8 w-full relative z-30">
              <button
                onClick={() => setShowPhoto(!showPhoto)}
                className="bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-purple-200 text-violet-800 px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-purple-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {showPhoto ? "🪄 Hide Photo & Show Magic" : "📸 Show Profile Photo"}
              </button>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-6 sm:p-10 shadow-[0_8px_30px_rgba(100,50,255,0.1)] relative overflow-hidden"
          >

            {/* INNER GLOWS */}
            <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-[80px] z-0" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[300px] h-[300px] bg-cyan-300/30 rounded-full blur-[80px] z-0" />

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start relative z-10">
              {/* LEFT */}
              <div>
                <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
                  About Me
                </div>

                <h2 className="text-4xl md:text-5xl font-black mb-6 text-violet-900">
                  Professional Summary
                </h2>

                <p className="text-violet-700 text-lg leading-relaxed mb-8 font-medium">
                  {profile.summary}
                </p>

                <a href="#contact">
                  <button className="px-8 py-4 rounded-full bg-white/60 border border-purple-200 text-violet-800 hover:bg-white/80 transition font-bold shadow-md flex items-center gap-2 cursor-pointer">
                    <MdEmail className="text-xl" /> Let's Connect
                  </button>
                </a>
              </div>

              {/* RIGHT */}
              <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-3xl p-8 shadow-inner flex flex-col gap-6">
                <h3 className="text-2xl font-black text-violet-900 border-b border-purple-200 pb-4 mb-2">
                  Personal Details
                </h3>

                {[
                  [<FaUser />, "Full Name", profile.name],
                  [<FaCalendarAlt />, "Age", `${profile.age} Years Old`],
                  [<MdLocationOn />, "Location", profile.location],
                  [<MdEmail />, "Email", profile.email],
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white flex items-center justify-center text-xl shadow-md">
                      {item[0]}
                    </div>
                    <div>
                      <p className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-1">
                        {item[1]}
                      </p>
                      <h4 className="text-lg font-black text-violet-900">
                        {item[2]}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-14"
          >
            <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
              Skills
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-center text-violet-900">
              My Technical Skills
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden w-full flex flex-col gap-8 py-10 -mx-6 md:-mx-16 px-6 md:px-16" style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
          >
            {/* BUBBLE BACKGROUND FOR SKILLS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-white/20 rounded-full blur-[100px] -z-10" />

            {/* ROW 1 */}
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee flex gap-6 shrink-0 pr-6">
                {[...row1Skills, ...row1Skills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-36 h-36 backdrop-blur-xl bg-white/50 border border-white/80 rounded-[32px] p-4 shadow-lg shadow-purple-900/5 hover:scale-110 hover:shadow-pink-500/20 transition duration-300"
                  >
                    <img
                      src={skill.icon || skill.icon_url}
                      alt={skill.name}
                      className="w-14 h-14 object-contain drop-shadow-sm mb-3"
                    />
                    <h3 className="font-bold text-sm text-violet-800 text-center">
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2 */}
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee-reverse flex gap-6 shrink-0 pr-6">
                {[...row2Skills, ...row2Skills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-36 h-36 backdrop-blur-xl bg-white/50 border border-white/80 rounded-[32px] p-4 shadow-lg shadow-purple-900/5 hover:scale-110 hover:shadow-cyan-500/20 transition duration-300"
                  >
                    <img
                      src={skill.icon || skill.icon_url}
                      alt={skill.name}
                      className="w-14 h-14 object-contain drop-shadow-sm mb-3"
                    />
                    <h3 className="font-bold text-sm text-violet-800 text-center">
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-14"
          >
            <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
              Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-center text-violet-900">
              My Recent Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  key={index}
                  className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] overflow-hidden shadow-[0_8px_30px_rgba(100,50,255,0.1)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.2)] transition duration-300 flex flex-col"
                >
                  <div className="p-3 shrink-0">
                    <img
                      src={`https://picsum.photos/seed/${project.name}/800/600`}
                      alt={project.name}
                      className="w-full h-56 object-cover rounded-[32px] shadow-inner bg-white/50"
                    />
                  </div>

                  <div className="p-8 pt-4 flex-1 flex flex-col">
                    <h3 className="text-3xl font-black break-words mb-4 text-violet-900 capitalize">
                      {project.name.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-violet-700 mb-8 leading-relaxed font-medium line-clamp-3">
                      {project.description || "No description provided for this repository."}
                    </p>

                    <div className="flex gap-3 flex-wrap mb-8 mt-auto">
                      {project.language && (
                        <span className="px-4 py-1.5 rounded-full bg-white/60 border border-purple-200 text-purple-700 font-bold text-sm shadow-sm">
                          {project.language}
                        </span>
                      )}
                    </div>

                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold hover:scale-[1.02] transition duration-300 shadow-md shadow-purple-500/30 cursor-pointer">
                        View on GitHub ↗
                      </button>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-violet-700 font-bold col-span-full text-center py-10">Loading projects from GitHub...</p>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-6 sm:p-10 shadow-[0_8px_30px_rgba(100,50,255,0.1)] relative overflow-hidden"
          >

            {/* INNER GLOWS */}
            <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-cyan-300/30 rounded-full blur-[80px] z-0" />

            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
              {/* LEFT: FORM */}
              <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-3xl p-8 shadow-inner">
                <h3 className="text-2xl font-black text-violet-900 mb-6">
                  Send Me A Message
                </h3>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-violet-800 font-bold mb-2 text-sm">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-5 py-3 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/80 transition shadow-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-violet-800 font-bold mb-2 text-sm">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-5 py-3 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/80 transition shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-violet-800 font-bold mb-2 text-sm">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-5 py-3 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/80 transition shadow-sm resize-none"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>

                  {formStatus.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-800 font-bold text-sm text-center"
                    >
                      🎉 Message sent successfully! Thank you.
                    </motion.div>
                  )}

                  {formStatus.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-800 font-bold text-sm text-center"
                    >
                      ❌ {formStatus.error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition duration-300 shadow-md shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {formStatus.loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>

              {/* RIGHT: DETAILS */}
              <div className="flex flex-col gap-8">
                <div>
                  <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
                    Contact
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 text-violet-900">
                    Let's Work Together!
                  </h2>
                  <p className="text-violet-700 font-medium text-lg leading-relaxed">
                    Open to new opportunities and exciting collaborations. Fill out the form, and your message will be saved to Supabase and delivered directly to my email. I'll get back to you as soon as possible!
                  </p>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                  {[
                    [<MdEmail />, "Email", profile.email, `mailto:${profile.email}`],
                    ...socials.map(s => [getSocialIcon(s.icon_name), s.platform, getSocialText(s.platform, s.url), s.url])
                  ].map((item, index) => (
                    <a
                      key={index}
                      href={item[3]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 transition duration-300 shadow-sm hover:shadow-md group"
                    >
                      <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition duration-300">
                        {item[0]}
                      </div>
                      <div>
                        <p className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-1">
                          {item[1]}
                        </p>
                        <h4 className="text-lg font-black text-violet-900 break-all">
                          {item[2]}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-violet-600 font-medium mt-16 pb-6 relative z-10">
          © 2026 {profile.name}. All rights reserved.
        </footer>

      </div>
    </div>
  );
}