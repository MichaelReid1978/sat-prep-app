"use client";

import React, { useEffect, useRef } from "react";
import katex from "katex";

interface MathTextProps {
  content: string;
  className?: string;
}

export function MathText({ content, className = "" }: MathTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if the content has math markup or equations like 2^(3x-1) or x^2
    const container = containerRef.current;
    
    // Simple parser: detect $...$ or format mathematical expressions
    if (content.includes("$")) {
      const parts = content.split(/(\$[^$]+\$)/g);
      container.innerHTML = "";
      parts.forEach((part) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          const span = document.createElement("span");
          try {
            katex.render(math, span, { throwOnError: false });
          } catch {
            span.textContent = part;
          }
          container.appendChild(span);
        } else {
          container.appendChild(document.createTextNode(part));
        }
      });
    } else {
      container.textContent = content;
    }
  }, [content]);

  return <span ref={containerRef} className={className}>{content}</span>;
}
