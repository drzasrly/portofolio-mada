import { useEffect, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
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

          const blob = await removeBackground("/mada.jpg");

          const url = URL.createObjectURL(blob);

          setProcessedImage(url);

        } catch (error) {

          console.log(error);

        }
      }

      processImage();

    }, []);

  const skills = [
    {
      name: "HTML",
      icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    },
    {
      name: "CSS",
      icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    },
    {
      name: "JavaScript",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },
    {
      name: "React",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    },
    {
      name: "Tailwind CSS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    },
    {
      name: "Git",
      icon: "https://cdn-icons-png.flaticon.com/512/4494/4494748.png",
    },
  ];

  const projects = [
    {
      title: "Task Management App",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      description:
        "Modern productivity app with futuristic dashboard UI.",
    },
    {
      title: "Agency Website",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      description:
        "Creative agency landing page with cinematic glow effects.",
    },
    {
      title: "E-Commerce Website",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      description:
        "Premium e-commerce design with glassmorphism style.",
    },
  ];

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
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#12002f] to-[#020617]" />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]" />

      <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 md:px-16 py-8">

        {/* NAVBAR */}
        <nav className="flex justify-between items-center backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl px-8 py-5 shadow-2xl shadow-purple-500/10 mb-24">

          <h1 className="text-3xl font-black tracking-wide">
            Portfolio<span className="text-purple-400">.</span>
          </h1>

          <div className="hidden md:flex gap-10 text-slate-300 font-medium">
            <a href="#home" className="hover:text-cyan-300 transition">
              Home
            </a>

            <a href="#about" className="hover:text-cyan-300 transition">
              About
            </a>

            <a href="#skills" className="hover:text-cyan-300 transition">
              Skills
            </a>

            <a href="#projects" className="hover:text-cyan-300 transition">
              Projects
            </a>

            <a href="#contact" className="hover:text-cyan-300 transition">
              Contact
            </a>
          </div>

          <button className="hidden md:block px-6 py-3 rounded-2xl bg-purple-500/20 border border-purple-400/20 backdrop-blur-xl hover:bg-purple-500/30 transition shadow-xl shadow-purple-500/20">
            Download CV
          </button>
        </nav>

        {/* HERO */}
        <section
          id="home"
          className="grid md:grid-cols-2 gap-16 items-center mb-32"
        >

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 mb-8 backdrop-blur-xl shadow-lg shadow-purple-500/10">
              Hello, I'm 👋
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mb-4">
              Madadina
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Adilah Pamuji
              </span>
            </h1>

            <h2 className="text-5xl font-bold mb-6 text-white">
              Web Developer
            </h2>

            <p className="text-slate-300 text-xl leading-relaxed max-w-xl mb-10">
              I build futuristic and modern web applications with premium
              glassmorphism UI and cinematic neon effects.
            </p>

            <div className="flex gap-5 flex-wrap mb-12">

              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition duration-300 shadow-2xl shadow-cyan-500/30 font-semibold">
                View My Work
              </button>

              <button className="px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition font-semibold">
                <a
                  href="https://wa.me/62895397081000"
                  target="_blank"
                  rel="noopener noreferrer"
                  // className="
                  //   px-8
                  //   py-4
                  //   rounded-2xl
                  //   backdrop-blur-xl
                  //   bg-white/10
                  //   border
                  //   border-white/20
                  //   hover:bg-white/20
                  //   transition
                  //   font-semibold
                  // "
                >

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
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                    hover:scale-110
                    hover:bg-white/10
                    transition
                    duration-300
                    cursor-pointer
                    shadow-xl
                    shadow-cyan-500/10
                  "
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

            {/* MAIN GLOW */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-[40px]" />

            {/* CARD */}
            <div className="
              relative
              backdrop-blur-2xl
              bg-white/5
              border border-cyan-400/20
              rounded-[32px]
              overflow-hidden
              shadow-[0_0_30px_rgba(34,211,238,0.18)]
              p-4
              h-[600px]
              flex
              items-end
              justify-center
              mx-auto
            ">

              {/* CYAN GLOW */}
              <div className="absolute inset-0 flex items-center justify-center z-0">

                <div className="w-[280px] h-[280px] bg-cyan-500/30 rounded-full blur-[120px]" />

              </div>

              {/* PURPLE GLOW */}
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px]" />

              {/* IMAGE */}
              <img
                src={processedImage || `${import.meta.env.BASE_URL}mada.png`}
                alt="profile"
                className="
                  relative
                  z-10
                  w-full
                  h-[500px]
                  md:h-[540px]
                  object-contain
                  object-bottom
                  mx-auto
                  scale-110
                  drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]
                "
              />

              {/* GLASS OVERLAY */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-[32px]" />

              {/* FLOATING EXPERIENCE */}
              <div className="absolute top-6 right-4 backdrop-blur-2xl bg-purple-500/20 border border-white/10 rounded-3xl px-6 py-5 shadow-xl z-20">

                <h3 className="text-3xl font-black">2+</h3>

                <p className="text-slate-300">
                  Years Experience
                </p>

              </div>

              {/* FLOATING PROJECTS */}
              <div className="absolute bottom-6 right-4 backdrop-blur-2xl bg-cyan-500/20 border border-white/10 rounded-3xl px-6 py-5 shadow-xl z-20">

                <h3 className="text-3xl font-black">10+</h3>

                <p className="text-slate-300">
                  Projects Completed
                </p>

              </div>

              {/* AVAILABLE BADGE */}
              <div className="absolute left-6 top-[50%] backdrop-blur-2xl bg-cyan-500/20 border border-white/10 rounded-3xl px-6 py-4 shadow-xl z-20">

                <h3 className="font-bold">
                  Available
                </h3>

                <p className="text-sm text-slate-300">
                  for work
                </p>

              </div>

              {/* BOTTOM GLOW */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-purple-500/30 blur-[80px]" />

            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mb-32">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl">

            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* LEFT */}
              <div>

                <p className="text-purple-300 uppercase tracking-[4px] mb-4">
                  ABOUT ME
                </p>

                <h2 className="text-5xl font-black mb-6">
                  Get to know me!
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  I'm a passionate frontend developer who loves building
                  beautiful and futuristic websites with smooth user
                  experiences and premium UI designs.
                </p>

                <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition">
                  Read More About Me
                </button>

              </div>

              {/* RIGHT */}
              <div className="grid grid-cols-2 gap-6">

                {[
                  ["👤", "Name", "Madadina Adilah Pamuji"],
                  ["🎂", "Age", "22"],
                  ["📍", "Location", "Indonesia"],
                  ["📧", "Email", "madadnap@gmail.com"],
                ].map((item, index) => (

                  <div
                    key={index}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
                  >

                    <div className="text-4xl mb-4">
                      {item[0]}
                    </div>

                    <p className="text-slate-400 text-sm">
                      {item[1]}
                    </p>

                    <h3 className="text-xl font-bold">
                      {item[2]}
                    </h3>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mb-32">

          <p className="text-center text-purple-300 tracking-[4px] uppercase mb-4">
            SKILLS
          </p>

          <h2 className="text-5xl font-black text-center mb-14">
            My Technical Skills
          </h2>

          <div className="grid md:grid-cols-6 gap-6">

            {skills.map((skill, index) => (

              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                key={index}
                className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[32px] p-8 shadow-2xl hover:shadow-cyan-500/20 transition duration-300 text-center"
              >

                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-16 h-16 mx-auto mb-6 object-contain"
                />

                <h3 className="font-bold text-lg">
                  {skill.name}
                </h3>

              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-32">

          <p className="text-center text-purple-300 tracking-[4px] uppercase mb-4">
            PROJECTS
          </p>

          <h2 className="text-5xl font-black text-center mb-14">
            My Recent Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {projects.map((project, index) => (

              <motion.div
                whileHover={{ y: -10 }}
                key={index}
                className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition duration-300"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-8">

                  <h3 className="text-3xl font-bold mb-4">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-3 flex-wrap mb-6">

                    {["React", "Tailwind", "Firebase"].map(
                      (tag, i) => (

                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 hover:scale-[1.02] transition duration-300">
                    View Project ↗
                  </button>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl">

            <div className="grid md:grid-cols-4 gap-6 items-center">

              <div>

                <p className="text-purple-300 tracking-[4px] uppercase mb-3">
                  CONTACT
                </p>

                <h2 className="text-4xl font-black mb-4">
                  Let's Work Together!
                </h2>

                <p className="text-slate-300">
                  If you have a project in mind, feel free to contact me.
                </p>

              </div>

              {[
                [<MdEmail />, "Email", "madadnap@gmail.com"],
                [<FaGithub />, "GitHub", "github.com/drzasrly"],
                [<FaLinkedin />, "LinkedIn", "linkedin.com/in/madadina"],
              ].map((item, index) => (

                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
                >

                  <div className="text-4xl mb-4 text-cyan-300">
                    {item[0]}
                  </div>

                  <p className="text-slate-400 text-sm">
                    {item[1]}
                  </p>

                  <h3 className="font-bold text-lg break-all">
                    {item[2]}
                  </h3>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-slate-500 mt-16 pb-6">
          © 2025 Madadina Adilah Pamuji. All rights reserved.
        </footer>

      </div>
    </div>
  );
}