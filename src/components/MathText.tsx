import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  block?: boolean;
}

/**
 * Normalizes and formats physics/LaTeX strings:
 * - Fixes multi-character subscripts like _ext, _axis, _cm, _total into _{\text{...}}
 * - Converts side-by-side fraction notations like (1/2), 1/2, (3/2) into \frac{1}{2}, \frac{3}{2}
 * - Replaces asterisks with \cdot and unicode greek letters with LaTeX macros
 */
export function formatLatexMath(raw: string): string {
  if (!raw) return '';

  let m = raw;

  // 1. Greek & Unicode symbols to LaTeX
  m = m
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
    .replace(/Δ/g, '\\Delta ')
    .replace(/Ω/g, '\\Omega ')
    .replace(/Φ/g, '\\Phi ')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, '\\cdot ')
    .replace(/×/g, '\\times ');

  // 2. Fix multi-letter subscripts without braces or \text
  // e.g., \tau_ext -> \tau_{\text{ext}}, I_axis -> I_{\text{axis}}, v_cm -> v_{\text{cm}}, K_total -> K_{\text{total}}
  m = m.replace(/_([a-zA-Z]{2,})(?![a-zA-Z0-9_}]*})/g, (match, sub) => {
    return `_{\\text{${sub}}}`;
  });

  // 3. Fraction conversions (side-by-side x/y -> \frac{x}{y})
  // Parenthesized numerical fractions e.g. (1/2), (1/3), (1/4), (1/12), (2/5), (2/3), (3/2), (5/3), (9/10), (7/5), (81/196)
  m = m.replace(/\((\d+)\/(\d+)\)/g, '\\frac{$1}{$2}');

  // Non-parenthesized numeric fractions e.g. 1/2, 1/3, 1/4, 3/2, 5/2, 7/5, 9/10
  m = m.replace(/(^|[\s=+\-*(\[])(\d+)\/(\d+)(?=[\s=+\-*)\].*]|$)/g, '$1\\frac{$2}{$3}');

  // Expressions like A / (B) or \sigma^2 / (2 \varepsilon_0)
  m = m.replace(/([a-zA-Z0-9_\\^^{}]+)\s*\/\s*\(([^)]+)\)/g, '\\frac{$1}{$2}');

  // 4. Asterisks to multiplication dots
  m = m.replace(/\s\*\s/g, ' \\cdot ');

  return m;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', block = false }) => {
  if (!text) return null;

  // Explicit block mode
  if (block) {
    const cleanText = text
      .replace(/^\$\$/, '')
      .replace(/\$\$$/, '')
      .replace(/^\\\[/, '')
      .replace(/\\\]$/, '')
      .trim();
    const formatted = formatLatexMath(cleanText);
    try {
      const html = katex.renderToString(formatted, { displayMode: true, throwOnError: false });
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

  const processedText = formatLatexMath(text);

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
            const html = katex.renderToString(formatLatexMath(math), { displayMode: true, throwOnError: false });
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
            const html = katex.renderToString(formatLatexMath(math), { displayMode: true, throwOnError: false });
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
            const html = katex.renderToString(formatLatexMath(math), { displayMode: false, throwOnError: false });
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
            const html = katex.renderToString(formatLatexMath(math), { displayMode: false, throwOnError: false });
            return (
              <span
                key={index}
                className="inline-katex mx-0.5 text-cyan-300 font-semibold"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          return <React.Fragment key={index}>{renderSubTextWithLatex(part)}</React.Fragment>;
        })}
      </span>
    );
  }

  // If text has NO delimiters, check if it's a standalone formula or mathematical expression
  // e.g. contains '=', '\tau', '\alpha', '\omega', '\frac', '_{\text{', '^', '\sqrt'
  const isPureFormula =
    /(\\tau|\\alpha|\\omega|\\frac|\\sqrt|\\int|\\cdot|_\{|\\varepsilon|\\sigma|\\theta|\\pi|=|\\vec)/.test(processedText) &&
    !processedText.includes('\n') &&
    processedText.length < 150;

  if (isPureFormula) {
    try {
      const html = katex.renderToString(processedText, { displayMode: false, throwOnError: false });
      return (
        <span
          className={`inline-katex text-cyan-300 font-semibold ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      // Fallback
    }
  }

  return <span className={className}>{renderSubTextWithLatex(processedText)}</span>;
};

// Helper to render inline LaTeX macros or math symbols inside plain text
function renderSubTextWithLatex(part: string): React.ReactNode {
  // Regex to detect LaTeX macros, fractions, subscripted terms, or greek letters
  const latexMacroRegex = /(\\[a-zA-Z]+(?:\{[^}]*\}|_[a-zA-Z0-9{}]+|\^[a-zA-Z0-9{}]+)*|\b[a-zA-Z]_\{\\text\{[a-zA-Z0-9]+\}\}|\b\\frac\{[^}]*\}\{[^}]*\})/g;

  if (!latexMacroRegex.test(part)) {
    return part;
  }

  const segments = part.split(latexMacroRegex);

  return segments.map((seg, i) => {
    if (!seg) return null;

    if (
      seg.startsWith('\\') ||
      seg.includes('_{\\text{') ||
      seg.startsWith('\\frac')
    ) {
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
