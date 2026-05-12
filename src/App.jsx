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

export default function App() {
  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    async function processImage() {
      try {
        const blob = await removeBackground("/mada.jpeg");
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
      } catch (error) {
        console.log(error);
      }
    }
    processImage();
  }, []);

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
      // limit spawn rate to 1 icon every 50ms to prevent performance issues
      if (now - lastTime < 50) return;
      lastTime = now;

      const el = document.createElement("img");
      el.src = trailIcons[iconIndex % trailIcons.length];
      el.className = "pointer-events-none fixed z-[9999] w-6 h-6 object-contain animate-trail drop-shadow-md";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;

      document.body.appendChild(el);
      iconIndex++;

      // Remove the icon after the animation finishes
      setTimeout(() => {
        if (el && el.parentNode) {
          el.remove();
        }
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const row1Skills = [
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

  const row2Skills = [
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

  const [projects, setProjects] = useState([]);

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

  const socials = [
    {
      icon: <FaGithub />,
      link: "https://github.com/drzasrly",
    },
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com/in/usernamekamu",
    },
    {
      icon: <FaInstagram />,
      link: "https://instagram.com/madadinaaap",
    },
    {
      icon: <MdEmail />,
      link: "mailto:madadnap@gmail.com",
    },
  ];

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
        <nav className="flex justify-between items-center backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl px-8 py-5 shadow-lg shadow-purple-900/5 mb-24">
          <h1 className="text-3xl font-black tracking-wide text-violet-900">
            Portfolio<span className="text-pink-500">.</span>
          </h1>

          <div className="hidden md:flex gap-10 text-violet-700 font-bold">
            <a href="#home" className="hover:text-pink-500 transition">Home</a>
            <a href="#about" className="hover:text-pink-500 transition">About</a>
            <a href="#skills" className="hover:text-pink-500 transition">Skills</a>
            <a href="#projects" className="hover:text-pink-500 transition">Projects</a>
            <a href="#contact" className="hover:text-pink-500 transition">Contact</a>
          </div>

          <button className="hidden md:block px-6 py-3 rounded-2xl bg-white/60 border border-purple-200 text-violet-800 font-bold hover:bg-white/80 transition shadow-md shadow-purple-200">
            Download CV
          </button>
        </nav>

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

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 break-words">
              Madadina
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Adilah Pamuji
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-violet-800">
              Backend Engineer
            </h2>

            <p className="text-violet-700 text-xl leading-relaxed max-w-xl mb-10 font-medium">
              Specializing in building scalable, high-performance web applications with a strong focus on intuitive user experiences and clean, maintainable code.
            </p>

            <div className="flex gap-5 flex-wrap mb-12">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:scale-105 transition duration-300 shadow-xl shadow-pink-500/30 font-bold">
                View My Work
              </button>

              <button className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/50 border border-purple-200 text-violet-800 hover:bg-white/80 transition font-bold shadow-md">
                <a href="https://wa.me/62895397081000" target="_blank" rel="noopener noreferrer">
                  Contact Me
                </a>
              </button>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-5">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full bg-white/50 border border-white/80 backdrop-blur-xl flex items-center justify-center text-2xl text-purple-600 hover:scale-110 hover:bg-white/80 transition duration-300 cursor-pointer shadow-lg shadow-purple-200"
                >
                  {social.icon}
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

              {/* IMAGE */}
              <img
                src={processedImage || `${import.meta.env.BASE_URL}mada.jpeg`}
                alt="profile"
                className="relative z-10 w-full h-[360px] sm:h-[460px] md:h-[580px] object-contain object-bottom mx-auto scale-110 drop-shadow-[0_20px_30px_rgba(100,50,255,0.2)]"
              />

              {/* FLOATING BUBBLES / DROPLETS */}
              <div className="absolute top-[-20px] left-[10%] w-12 h-12 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />
              <div className="absolute top-[30%] right-[-30px] w-16 h-16 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />
              <div className="absolute bottom-[20%] left-[-20px] w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-lg z-20" />

              {/* QUOTATION MARK DECORATIONS */}
              <div className="absolute top-6 left-6 text-6xl text-white/50 font-serif drop-shadow-md z-20">"</div>
              <div className="absolute bottom-12 right-8 text-6xl text-white/50 font-serif drop-shadow-md z-20">"</div>

              {/* FLOATING EXPERIENCE */}
              <div className="absolute top-8 right-[-20px] sm:right-[-40px] scale-75 sm:scale-100 origin-top-right backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-8 py-3 shadow-xl z-30 flex items-center gap-3">
                <h3 className="text-2xl font-black text-purple-700">2+</h3>
                <p className="text-violet-800 font-bold text-sm leading-tight">Years<br />Experience</p>
              </div>

              {/* FLOATING PROJECTS */}
              <div className="absolute bottom-12 right-[-20px] sm:right-[-40px] scale-75 sm:scale-100 origin-bottom-right backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-8 py-3 shadow-xl z-30 flex items-center gap-3">
                <h3 className="text-2xl font-black text-pink-600">10+</h3>
                <p className="text-violet-800 font-bold text-sm leading-tight">Projects<br />Completed</p>
              </div>

              {/* AVAILABLE BADGE */}
              <div className="absolute left-[-20px] sm:left-[-40px] top-[45%] scale-75 sm:scale-100 origin-left backdrop-blur-xl bg-white/60 border-2 border-white/80 rounded-full px-6 py-3 shadow-xl z-30">
                <h3 className="font-bold text-purple-700">Available</h3>
                <p className="text-xs text-violet-600 font-semibold">for work</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mb-32">
          <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-10 shadow-[0_8px_30px_rgba(100,50,255,0.1)] relative overflow-hidden">

            {/* INNER GLOWS */}
            <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-[80px] z-0" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[300px] h-[300px] bg-cyan-300/30 rounded-full blur-[80px] z-0" />

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start relative z-10">
              {/* LEFT */}
              <div>
                <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
                  About Me
                </div>

                <h2 className="text-5xl font-black mb-6 text-violet-900">
                  Professional Summary
                </h2>

                <p className="text-violet-700 text-lg leading-relaxed mb-8 font-medium">
                  I am a dedicated Frontend Engineer with a proven track record of developing responsive, user-centric web applications. I combine my technical expertise in modern JavaScript frameworks with a keen eye for design to deliver robust and elegant digital solutions that drive business value.
                </p>

                <a href="#contact">
                  <button className="px-8 py-4 rounded-full bg-white/60 border border-purple-200 text-violet-800 hover:bg-white/80 transition font-bold shadow-md flex items-center gap-2">
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
                  [<FaUser />, "Full Name", "Madadina Adilah Pamuji"],
                  [<FaCalendarAlt />, "Age", "22 Years Old"],
                  [<MdLocationOn />, "Location", "Indonesia"],
                  [<MdEmail />, "Email", "madadnap@gmail.com"],
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
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mb-32">
          <div className="flex flex-col items-center mb-14">
            <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
              Skills
            </div>
            <h2 className="text-5xl font-black text-center text-violet-900">
              My Technical Skills
            </h2>
          </div>

          <div className="relative overflow-hidden w-full flex flex-col gap-8 py-10 -mx-6 md:-mx-16 px-6 md:px-16" style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}>
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
                      src={skill.icon}
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
                      src={skill.icon}
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

          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-32">
          <div className="flex flex-col items-center mb-14">
            <div className="inline-block px-5 py-2 rounded-full border-2 border-purple-300 text-purple-600 font-bold uppercase tracking-[2px] text-sm mb-6 bg-white/50 backdrop-blur-md">
              Projects
            </div>
            <h2 className="text-5xl font-black text-center text-violet-900">
              My Recent Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
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
                      <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold hover:scale-[1.02] transition duration-300 shadow-md shadow-purple-500/30">
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
          <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-10 shadow-[0_8px_30px_rgba(100,50,255,0.1)] relative overflow-hidden">

            {/* INNER GLOWS */}
            <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-cyan-300/30 rounded-full blur-[80px] z-0" />

            <div className="grid lg:grid-cols-2 gap-12 items-start relative z-10">
              {/* LEFT: FORM */}
              <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-3xl p-8 shadow-inner">
                <h3 className="text-2xl font-black text-violet-900 mb-6">
                  Send Me A Message
                </h3>

                <form action="https://formsubmit.co/madadnap@gmail.com" method="POST" className="flex flex-col gap-5">
                  {/* Honeypot for spam */}
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  {/* Disable captcha */}
                  <input type="hidden" name="_captcha" value="false" />

                  <div>
                    <label className="block text-violet-800 font-bold mb-2 text-sm">Your Name</label>
                    <input
                      type="text"
                      name="name"
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
                      required
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-5 py-3 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/80 transition shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-violet-800 font-bold mb-2 text-sm">Message</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-5 py-3 text-violet-900 placeholder-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/80 transition shadow-sm resize-none"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold hover:scale-[1.02] transition duration-300 shadow-md shadow-purple-500/30 flex items-center justify-center gap-2"
                  >
                    Send Message
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
                    Open to new opportunities and exciting collaborations. Fill out the form, and your message will be sent directly to my email. I'll get back to you as soon as possible!
                  </p>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                  {[
                    [<MdEmail />, "Email", "madadnap@gmail.com", "mailto:madadnap@gmail.com"],
                    [<FaGithub />, "GitHub", "github.com/drzasrly", "https://github.com/drzasrly"],
                    [<FaLinkedin />, "LinkedIn", "linkedin.com/in/madadina", "https://linkedin.com/in/usernamekamu"],
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
                        <h4 className="text-lg font-black text-violet-900">
                          {item[2]}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-violet-600 font-medium mt-16 pb-6 relative z-10">
          © 2026 Madadina Adilah Pamuji. All rights reserved.
        </footer>

      </div>
    </div>
  );
}