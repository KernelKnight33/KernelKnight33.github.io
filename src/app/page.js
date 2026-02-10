"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Profile image placeholder
const profileImage = "https://placehold.co/400x500/1a1a1a/808080?text=KernelKnight";

// Mock data customized for robotics/engineering background
const essays = [
  {
    id: 1,
    title: "Understanding LLVM Frontend Design",
    date: "2025.11.07",
    excerpt: "Deconstructing compiler architecture for embedded systems optimization...",
    content: "This exploration dissects the LLVM compiler infrastructure with a focus on frontend design principles critical for robotics applications. We examine how abstract syntax tree (AST) transformations enable hardware-aware optimizations for resource-constrained embedded systems. Through case studies of custom robotics DSLs (Domain-Specific Languages), we demonstrate how frontend modifications can reduce binary size by 37% while improving real-time performance in sensor fusion pipelines. The analysis includes practical implementations for ARM Cortex-M series microcontrollers commonly used in autonomous mobile platforms, with benchmarks showing 22% faster interrupt response times through targeted IR (Intermediate Representation) optimizations."
  },
  {
    id: 2,
    title: "Soft Robotics: Designing with Ecoflex Silicon",
    date: "2026.02.01",
    excerpt: "Material science meets embodied intelligence in compliant manipulation...",
    content: "This work investigates the intersection of material science and robotic control through the lens of soft actuator design. We present a novel fabrication methodology for Ecoflex-based pneumatic networks that achieves 300% elongation while maintaining structural integrity under cyclic loading. By integrating liquid metal strain sensors directly into the elastomer matrix during casting, we create closed-loop control systems that adapt grip forces in real-time based on object compliance. Experimental validation with delicate biological specimens (sea anemones and coral polyps) demonstrates unprecedented manipulation fidelity without tissue damage. The research establishes design principles for bio-inspired end-effectors that outperform rigid counterparts in unstructured environments, with applications ranging from deep-sea exploration to surgical robotics."
  }
];

const artPieces = [
  {
    id: 1,
    title: "Kinematic Topologies",
    date: "2025.09",
    description: "Generative study of robotic arm configuration spaces",
    imageUrl: "https://placehold.co/800x600/0a0a0a/e5e5e5?text=Kinematic+Topologies"
  },
  {
    id: 2,
    title: "Sensor Fusion Visualizations",
    date: "2025.12",
    description: "LIDAR and IMU data stream abstractions",
    imageUrl: "https://placehold.co/800x600/0a0a0a/e5e5e5?text=Sensor+Fusion"
  },
  {
    id: 3,
    title: "Material Stress Fields",
    date: "2026.01",
    description: "Finite element analysis of composite structures",
    imageUrl: "https://placehold.co/800x600/0a0a0a/e5e5e5?text=Stress+Fields"
  }
];

const projects = [
  {
    id: 1,
    title: "Autonomous Ship Docking using UWB",
    date: "2025.08",
    description: "Precision navigation system for naval vessels using ultra-wideband positioning",
    link: "#"
  },
  {
    id: 2,
    title: "SO-100 Arm End-Effector",
    date: "2025.10",
    description: "Custom tendon-driven gripper with embedded tactile sensing",
    link: "#"
  },
  {
    id: 3,
    title: "EMR Pen Display",
    date: "2026.01",
    description: "Electromagnetic resonance interface for surgical robotics training",
    link: "#"
  }
];

const animeManga = [
  {
    id: 1,
    title: "Neon Genesis Evangelion",
    type: "Anime",
    review: "A deconstruction of the mecha genre exploring trauma, identity, and human connection through apocalyptic symbolism."
  },
  {
    id: 2,
    title: "Serial Experiments Lain",
    type: "Anime",
    review: "Cyberpunk meditation on consciousness, reality, and the dissolution of boundaries between physical and digital existence."
  },
  {
    id: 3,
    title: "Berserk",
    type: "Manga",
    review: "Dark fantasy epic examining the human spirit's resilience against cosmic horror, fate, and the price of ambition."
  },
  {
    id: 4,
    title: "Vagabond",
    type: "Manga",
    review: "Philosophical journey of self-mastery and enlightenment through the lens of Musashi Miyamoto's legendary swordsmanship."
  },
  {
    id: 5,
    title: "Ghost in the Shell",
    type: "Manga",
    review: "Foundational cyberpunk exploring the nature of consciousness, identity, and what remains human in a mechanized world."
  },
  {
    id: 6,
    title: "Monster",
    type: "Manga",
    review: "Psychological thriller dissecting the anatomy of evil, morality, and the fragile value of human life."
  }
];

const aboutContent = "Electrical Engineering & Robotics specialist. Building intelligent systems at the intersection of hardware and software. Focused on embedded systems, soft robotics, and human-robot interaction. Currently exploring compiler optimizations for real-time robotic control systems and bio-inspired actuation mechanisms.";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [selectedArtPiece, setSelectedArtPiece] = useState(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [hoveredOrbit, setHoveredOrbit] = useState(null);
  const [isEyeHovered, setIsEyeHovered] = useState(false);
  const eyeRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Initialize enhanced starfield background
  useEffect(() => {
    if (currentPage !== "landing" || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Generate stars with true randomness and depth layers
    const stars = [];
    const numStars = 800; // Increased density
    
    // Distant stars (tiny, dim, slow twinkle)
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: 'distant'
      });
    }
    
    // Mid stars (medium brightness)
    for (let i = 0; i < 250; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 0.9 + 0.6,
        opacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: 'mid'
      });
    }
    
    // Bright stars (foreground with pronounced twinkle)
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.3 + 0.6,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: 'bright'
      });
    }
    
    // Draw cosmic nebulae with multiple layers
    const drawNebulae = () => {
      // Primary nebula (top-right) - deep cosmic purple
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.8, 
        canvas.height * 0.2, 
        0,
        canvas.width * 0.8, 
        canvas.height * 0.2, 
        Math.max(canvas.width, canvas.height) * 0.5
      );
      gradient1.addColorStop(0, 'rgba(65, 105, 225, 0.12)');    // Royal blue
      gradient1.addColorStop(0.3, 'rgba(138, 43, 226, 0.08)');  // Blue violet
      gradient1.addColorStop(0.6, 'rgba(75, 0, 130, 0.05)');    // Deep indigo
      gradient1.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Secondary nebula (bottom-left) - warm cosmic dust
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.2, 
        canvas.height * 0.8, 
        0,
        canvas.width * 0.2, 
        canvas.height * 0.8, 
        Math.max(canvas.width, canvas.height) * 0.4
      );
      gradient2.addColorStop(0, 'rgba(255, 69, 0, 0.07)');      // Red-orange
      gradient2.addColorStop(0.4, 'rgba(255, 140, 0, 0.05)');   // Dark orange
      gradient2.addColorStop(0.7, 'rgba(218, 165, 32, 0.03)');  // Goldenrod
      gradient2.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Tertiary nebula (center) - subtle cosmic cloud
      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        0,
        canvas.width * 0.5, 
        canvas.height * 0.5, 
        Math.max(canvas.width, canvas.height) * 0.3
      );
      gradient3.addColorStop(0, 'rgba(173, 216, 230, 0.04)');   // Light blue
      gradient3.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Subtle cosmic dust particles
    const drawCosmicDust = () => {
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 8 + 2;
        const opacity = Math.random() * 0.15;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cosmic elements
      drawNebulae();
      drawCosmicDust();
      
      // Draw and animate stars
      stars.forEach(star => {
        // Apply twinkle effect
        let currentOpacity = star.opacity;
        if (star.twinkleSpeed > 0) {
          star.twinklePhase += star.twinkleSpeed;
          currentOpacity = star.opacity + Math.sin(star.twinklePhase) * 0.15;
          currentOpacity = Math.max(0.05, Math.min(1.0, currentOpacity));
        }
        
        // Subtle color variation by layer
        let color = '255, 255, 255';
        if (star.layer === 'bright') {
          color = '255, 255, 220'; // Slight yellow tint
        } else if (star.layer === 'mid') {
          color = '240, 240, 255'; // Slight blue tint
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage]);
  
  // Inject Google Fonts and orbital animations
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap';
    document.head.appendChild(link);
    
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Space Mono', monospace;
      }
      .serif-heading {
        font-family: 'Cormorant Garamond', serif;
      }
      @keyframes rotateOrbit1 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes rotateOrbit2 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes rotateOrbit3 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes rotateOrbit4 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .orbit-1 {
        animation: rotateOrbit1 25s linear infinite;
        transform-origin: center;
      }
      .orbit-2 {
        animation: rotateOrbit2 40s linear infinite;
        transform-origin: center;
      }
      .orbit-3 {
        animation: rotateOrbit3 55s linear infinite;
        transform-origin: center;
      }
      .orbit-4 {
        animation: rotateOrbit4 75s linear infinite;
        transform-origin: center;
      }
      .paused {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  
  // Handle eye tracking effect
  useEffect(() => {
    const eye = eyeRef.current;
    if (!eye || currentPage !== "landing") return;
    
    const handleMouseMove = (e) => {
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const dx = mouseX - eyeCenterX;
      const dy = mouseY - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDistance = rect.width / 2.5;
      let moveX = dx;
      let moveY = dy;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        moveX = Math.cos(angle) * maxDistance;
        moveY = Math.sin(angle) * maxDistance;
      }
      
      setPupilPosition({ x: moveX * 0.1, y: moveY * 0.1 });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentPage]);
  
  // Navigation handlers
  const navigateTo = useCallback((page) => {
    if (page === "writing") {
      setSelectedEssay(null);
    } else if (page === "art") {
      setSelectedArtPiece(null);
    }
    setCurrentPage(page);
  }, []);
  
  const viewEssay = useCallback((essay) => {
    setSelectedEssay(essay);
    setCurrentPage("essay-detail");
  }, []);
  
  const viewArtPiece = useCallback((piece) => {
    setSelectedArtPiece(piece);
    setCurrentPage("art-detail");
  }, []);
  
  const goBack = useCallback(() => {
    if (currentPage === "essay-detail") {
      setCurrentPage("writing");
      setSelectedEssay(null);
    } else if (currentPage === "art-detail") {
      setCurrentPage("art");
      setSelectedArtPiece(null);
    } else if (["writing", "art", "projects", "about", "anime"].includes(currentPage)) {
      setCurrentPage("landing");
    }
  }, [currentPage]);
  
  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Orbital configuration
  const orbits = [
    { 
      id: "anime", 
      diameterVmin: 40,
      planetSize: 20, 
      label: "ANIME & MANGA", 
      page: "anime",
      className: "orbit-1",
      color: "#a0a0a0"
    },
    { 
      id: "writing", 
      diameterVmin: 60,
      planetSize: 32, 
      label: "WRITING", 
      page: "writing",
      className: "orbit-2",
      color: "#ffd700"
    },
    { 
      id: "art", 
      diameterVmin: 80,
      planetSize: 40, 
      label: "ARTS & COOKING", 
      page: "art",
      className: "orbit-3",
      color: "#6a99ff"
    },
    { 
      id: "projects", 
      diameterVmin: 100,
      planetSize: 48, 
      label: "PROJECTS", 
      page: "projects",
      className: "orbit-4",
      color: "#ff7f50"
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-mono selection:bg-[#ffd700] selection:text-[#0a0a0a] relative overflow-hidden">
      {/* Enhanced Space Background - Only visible on landing page */}
      {currentPage === "landing" && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-0"
          aria-hidden="true"
        />
      )}
      
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
          >
            {/* Orbital system container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Orbit rings with planets */}
              {[...orbits].reverse().map((orbit, originalIndex) => {
                const index = orbits.length - 1 - originalIndex;
                const baseZIndex = 10 + (orbits.length - index) * 5;
                const currentZIndex = hoveredOrbit === orbit.id ? 50 : baseZIndex;
                
                return (
                  <div
                    key={orbit.id}
                    className={`absolute rounded-full border ${orbit.className} ${hoveredOrbit === orbit.id ? 'paused' : ''}`}
                    style={{
                      width: `${orbit.diameterVmin}vmin`,
                      height: `${orbit.diameterVmin}vmin`,
                      borderWidth: hoveredOrbit === orbit.id ? 1.5 : 0.5,
                      borderColor: hoveredOrbit === orbit.id ? orbit.color : 'rgba(255, 255, 255, 0.12)',
                      boxSizing: 'content-box',
                      zIndex: currentZIndex
                    }}
                    onMouseEnter={() => setHoveredOrbit(orbit.id)}
                    onMouseLeave={() => setHoveredOrbit(null)}
                    onClick={() => navigateTo(orbit.page)}
                  >
                    {/* Planet */}
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer"
                      style={{
                        width: `${orbit.planetSize}px`,
                        height: `${orbit.planetSize}px`,
                        backgroundColor: orbit.color,
                        boxShadow: `0 0 12px ${orbit.color}, 0 0 24px ${orbit.color}80`,
                        border: `2px solid ${orbit.color}cc`,
                        zIndex: currentZIndex + 1
                      }}
                    />
                    
                    {/* Label on hover */}
                    {hoveredOrbit === orbit.id && (
                      <div 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap text-[10px] md:text-xs font-bold px-2.5 py-1 rounded"
                        style={{
                          backgroundColor: "rgba(10, 10, 10, 0.95)",
                          color: orbit.color,
                          border: `1px solid ${orbit.color}80`,
                          backdropFilter: "blur(2px)",
                          zIndex: currentZIndex + 2
                        }}
                      >
                        {orbit.label}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Central Eye Container with Profile Label */}
              <div 
                className="flex flex-col items-center justify-center z-[100]"
                onMouseEnter={() => setIsEyeHovered(true)}
                onMouseLeave={() => setIsEyeHovered(false)}
              >
                <div 
                  ref={eyeRef} 
                  className="relative w-40 h-40 cursor-pointer"
                  onClick={() => navigateTo("about")}
                  aria-label="KernelKnight profile - click to view about section"
                >
                  {/* Sclera with hover effect */}
                  <div 
                    className={`absolute inset-0 bg-[#e5e5e5] rounded-full border-[1.5px] transition-all duration-300 ${
                      isEyeHovered 
                        ? 'border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.4)]' 
                        : 'border-[#ffd700]'
                    }`}
                  ></div>
                  
                  {/* Iris */}
                  <div className="absolute inset-2 bg-[#1a1a1a] rounded-full border-[1.5px] border-[#ffd700] flex items-center justify-center">
                    {/* Pupil with motion tracking */}
                    <motion.div 
                      className="w-6 h-6 bg-black rounded-full border-[1.5px] border-[#ffd700]"
                      animate={{ 
                        x: pupilPosition.x,
                        y: pupilPosition.y
                      }}
                      transition={{ type: "spring", damping: 15 }}
                    />
                  </div>
                </div>
                
                {/* Profile Label */}
                <motion.div 
                  className={`mt-4 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
                    isEyeHovered 
                      ? 'text-[#ffd700] opacity-100 translate-y-0' 
                      : 'text-[#e5e5e5] opacity-30 translate-y-1'
                  }`}
                  initial={{ opacity: 0.3, y: 4 }}
                  animate={{ 
                    opacity: isEyeHovered ? 1 : 0.3,
                    y: isEyeHovered ? 0 : 4,
                    color: isEyeHovered ? '#ffd700' : '#e5e5e5'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  PROFILE
                </motion.div>
              </div>
            </div>
            
            {/* Sanskrit quote at bottom right */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 text-right serif-heading text-lg md:text-2xl opacity-60 max-w-xl leading-relaxed z-50 pointer-events-none">
              "karmaṇy-evādhikāras te mā phaleṣhu kadāchana<br />
              mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi"
              <div className="mt-2 text-base md:text-lg opacity-80">— Shree Krishna</div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "about" && (
          <motion.div
            key="about"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-5xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                About
              </motion.h1>
              
              {/* Split Layout: Image + Text */}
              <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                {/* Left Column: Profile Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full md:w-1/3"
                >
                  <div className="relative rounded-lg overflow-hidden border border-[#2a2a2a] group">
                    <img 
                      src={profileImage} 
                      alt="KernelKnight Profile" 
                      className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    />
                    {/* Color overlay on hover */}
                    <div className="absolute inset-0 bg-[#ffd700] mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
                
                {/* Right Column: Bio Text */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full md:w-2/3 serif-heading text-base md:text-xl leading-relaxed text-[#cfcfcf]"
                >
                  <p>{aboutContent}</p>
                  
                  {/* Signature/Footer */}
                  <div className="mt-10 pt-8 border-t border-[#2a2a2a] font-mono text-sm text-[#8f8f8f]">
                    <div>Based in Mumbai • SRA VJTI Robotics</div>
                    <div className="mt-2">kernelknight@proton.me</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "writing" && (
          <motion.div
            key="writing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-3xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Writing
              </motion.h1>
              
              <div className="space-y-7">
                {essays.map((essay, index) => (
                  <motion.div
                    key={essay.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="border-b border-[#2a2a2a] pb-5 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <motion.button
                        onClick={() => viewEssay(essay)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.99 }}
                        className="text-lg md:text-xl font-medium hover:text-[#ffd700] transition-colors block text-left"
                      >
                        {essay.title}
                      </motion.button>
                      <span className="text-[#8f8f8f] mt-1 sm:mt-0 font-mono text-xs md:text-sm">{essay.date}</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm md:text-base">{essay.excerpt}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "essay-detail" && selectedEssay && (
          <motion.div
            key={`essay-${selectedEssay.id}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-3xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedEssay.title}
              </motion.h1>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#8f8f8f] block mb-8 font-mono text-xs md:text-sm"
              >
                {selectedEssay.date}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="serif-heading text-base md:text-lg leading-relaxed text-[#cfcfcf] max-w-prose"
              >
                <p>{selectedEssay.content}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "anime" && (
          <motion.div
            key="anime"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-5xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Anime & Manga
              </motion.h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animeManga.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="border border-[#2a2a2a] rounded-lg p-5 hover:border-[#a0a0a0] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg md:text-xl font-bold serif-heading">{item.title}</h3>
                      <span className="text-[#a0a0a0] text-xs font-mono px-2 py-1 bg-[#1a1a1a]/50 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.review}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "art" && (
          <motion.div
            key="art"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-5xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Arts & Cooking
              </motion.h1>
              
              <div className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold mb-5 serif-heading">Art</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {artPieces.map((piece, index) => (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.08 }}
                      className="border border-[#2a2a2a] rounded-lg overflow-hidden"
                    >
                      <motion.button
                        onClick={() => viewArtPiece(piece)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <div className="aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center">
                          <img 
                            src={piece.imageUrl} 
                            alt={piece.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 md:p-4 text-left border-t border-[#2a2a2a]">
                          <div className="flex justify-between">
                            <h3 className="text-base md:text-lg font-medium">{piece.title}</h3>
                            <span className="text-[#8f8f8f] font-mono text-xs md:text-sm">{piece.date}</span>
                          </div>
                          <p className="text-[#a0a0a0] mt-1 text-xs md:text-sm">{piece.description}</p>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-5 serif-heading">Cooking</h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-b border-[#2a2a2a] pb-5 last:border-b-0"
                  >
                    <p className="text-[#a0a0a0] text-sm md:text-base italic">
                      Documentation of culinary experiments and recipe development coming soon.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "projects" && (
          <motion.div
            key="projects"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 relative z-10"
          >
            <div className="max-w-3xl mx-auto">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-10 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.h1 
                className="text-4xl md:text-5xl serif-heading font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Projects
              </motion.h1>
              
              <div className="space-y-7">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="border-b border-[#2a2a2a] pb-5 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-center">
                          <h3 className="text-lg md:text-xl font-medium group-hover:text-[#ff7f50] transition-colors">
                            {project.title}
                          </h3>
                          <span className="ml-2 text-[#ff7f50] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                        </div>
                      </a>
                      <span className="text-[#8f8f8f] mt-1 sm:mt-0 font-mono text-xs md:text-sm">{project.date}</span>
                    </div>
                    <p className="text-[#a0a0a0] text-sm md:text-base">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {currentPage === "art-detail" && selectedArtPiece && (
          <motion.div
            key={`art-${selectedArtPiece.id}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-6 md:p-12 flex flex-col items-center relative z-10"
          >
            <div className="max-w-4xl w-full">
              <motion.button
                onClick={goBack}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="mb-8 flex items-center text-[#ffd700] hover:text-[#ffaa00] transition-colors serif-heading text-sm md:text-base"
              >
                ← Back
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-7 rounded-lg overflow-hidden border border-[#2a2a2a]"
              >
                <img 
                  src={selectedArtPiece.imageUrl} 
                  alt={selectedArtPiece.title}
                  className="w-full"
                />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                <motion.h1 
                  className="text-4xl md:text-5xl serif-heading font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedArtPiece.title}
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-[#8f8f8f] font-mono text-xs md:text-sm mt-2 sm:mt-0"
                >
                  {selectedArtPiece.date}
                </motion.span>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#cfcfcf] serif-heading text-base md:text-lg max-w-2xl leading-relaxed mt-4"
              >
                {selectedArtPiece.description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
