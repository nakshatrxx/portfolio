import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectSection } from './components/projects/ProjectSection';
import { OffCourtHobbies } from './components/playground/OffCourtHobbies';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { SkillsMatrix } from './components/skills/SkillsMatrix';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { CustomCursor } from './components/ui/CustomCursor';
import { Toast } from './components/ui/Toast';

export function App() {
  const [soundActive, setSoundActive] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastIcon, setToastIcon] = useState("check");

  const showToast = (msg, icon = "check") => {
    setToastMessage(msg);
    setToastIcon(icon);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#FDB927] selection:text-black">
      
      {/* 🧲 Custom Smooth Magnetic Cursor */}
      <CustomCursor />

      {/* Toast Notification Container */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        iconType={toastIcon}
      />

      {/* Floating Navbar */}
      <Navbar
        soundActive={soundActive}
        setSoundActive={setSoundActive}
        onOpenPlayground={() => showToast("🏀 Step into the Splash Zone!", "curry")}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onShootClick={() => showToast("🏀 Steph Curry Shootout Arena Ready!", "curry")}
          onCopyEmail={() => showToast("Email copied to clipboard! 📋")}
        />

        {/* 01. Engineered Case Studies (SVASU Flagship + Personal + Freelance) */}
        <ProjectSection />

        {/* 02. Beyond The Terminal & Steph Curry #30 Shootout Arena */}
        <OffCourtHobbies />

        {/* 03. Experience Timeline & Education */}
        <ExperienceTimeline />

        {/* 04. Curated Skills Arsenal */}
        <SkillsMatrix />

        {/* 05. About & Philosophy */}
        <AboutSection />

        {/* 06. Contact & Footer */}
        <ContactSection onToast={(msg) => showToast(msg)} />
      </main>
    </div>
  );
}

export default App;
