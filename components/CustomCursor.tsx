"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursorPosition = () => {
      if (!isVisibleRef.current) return;
      
      const x = mousePos.current.x - 20;
      const y = mousePos.current.y - 20;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.style.opacity = "1";
      }
      updateCursorPosition();
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button";
        
      isHoveringRef.current = !!isClickable;
      cursor.style.scale = isClickable ? "1.5" : "1";
      cursor.style.backgroundColor = isClickable ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.05)";
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      cursor.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", () => {
      isVisibleRef.current = true;
      cursor.style.opacity = "1";
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 border border-purple-500/50 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center bg-purple-500/10 backdrop-blur-sm opacity-0 transition-[background-color,scale] duration-200"
    />
  );
}
