import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  block?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', block = false }) => {
  if (!text) return null;

  // If block mode is requested explicitly
  if (block) {
    const cleanText = text
      .replace(/^\$\$/, '')
      .replace(/\$\$$/, '')
      .replace(/^\\\[/, '')
      .replace(/\\\]$/, '')
      .trim();
    try {
      const html = katex.renderToString(cleanText, { displayMode: true, throwOnError: false });
      return (
        <div
          className={`katex-block my-2 overflow-x-auto text-cyan-300 font-sans ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      return <div className={className}>{text}</div>;
    }
  }

  // Pre-process text to convert common unicode math symbols to LaTeX equivalents if needed
  const processedText = text
    .replace(/τ/g, '\\tau ')
    .replace(/α/g, '\\alpha ')
    .replace(/ω/g, '\\omega ')
    .replace(/λ/g, '\\lambda ')
    .replace(/μ/g, '\\mu ')
    .replace(/π/g, '\\pi ')
    .replace(/θ/g, '\\theta ')
    .replace(/σ/g, '\\sigma ')
    .replace(/ρ/g, '\\rho ')
    .replace(/ε/g, '\\epsilon ')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, '\\cdot ')
    .replace(/×/g, '\\times ');

  // Regex pattern for matching block ($$...$$ or \[...\]) and inline ($...$ or \(...\)) math delimiters
  const mathRegex = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$[^\n$]+?\$|\\\([\s\S]+?\\\))/g;

  // Check if text has explicit delimiters
  const hasDelimiters = mathRegex.test(processedText);

  if (hasDelimiters) {
    const parts = processedText.split(mathRegex);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (!part) return null;

          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2).trim();
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return (
              <span
                key={index}
                className="block my-2 overflow-x-auto text-cyan-300"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          if (part.startsWith('\\[') && part.endsWith('\\]')) {
            const math = part.slice(2, -2).trim();
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return (
              <span
                key={index}
                className="block my-2 overflow-x-auto text-cyan-300"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1).trim();
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return (
              <span
                key={index}
                className="inline-katex mx-0.5 text-cyan-300 font-semibold"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          if (part.startsWith('\\(') && part.endsWith('\\)')) {
            const math = part.slice(2, -2).trim();
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return (
              <span
                key={index}
                className="inline-katex mx-0.5 text-cyan-300 font-semibold"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          // Plain text part (might still have raw LaTeX macros)
          return <React.Fragment key={index}>{renderSubTextWithLatex(part)}</React.Fragment>;
        })}
      </span>
    );
  }

  // If no explicit delimiters ($ or \(), check if the text itself contains LaTeX macros
  return <span className={className}>{renderSubTextWithLatex(processedText)}</span>;
};

// Helper to render LaTeX macros inside text even if missing $ delimiters
function renderSubTextWithLatex(part: string): React.ReactNode {
  // Regex to detect LaTeX macros like \vec{...}, \hat{...}, \frac{...}{...}, \int, \tau, \omega, \mu, etc.
  const latexMacroRegex = /(\\[a-zA-Z]+(?:\{[^}]*\}|_[a-zA-Z0-9{}]+|\^[a-zA-Z0-9{}]+)*)/g;

  if (!latexMacroRegex.test(part)) {
    return part;
  }

  const segments = part.split(latexMacroRegex);

  return segments.map((seg, i) => {
    if (!seg) return null;

    if (seg.startsWith('\\')) {
      try {
        const html = katex.renderToString(seg, { displayMode: false, throwOnError: false });
        return (
          <span
            key={i}
            className="inline-katex mx-0.5 text-cyan-300 font-semibold"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <span key={i}>{seg}</span>;
      }
    }

    return <span key={i}>{seg}</span>;
  });
}
