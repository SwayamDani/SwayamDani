import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to create fallback HTML from LaTeX content
function createFallbackHTML(latexContent) {
  // Extract content between \begin{document} and \end{document}
  const docMatch = latexContent.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (!docMatch) {
    return '<div style="padding: 2rem;"><p>Unable to parse LaTeX document.</p></div>';
  }
  
  let content = docMatch[1];

  // Normalize custom macros and spacing directives used in the resume source.
  content = content
    .replace(/\\blist/g, '\\begin{itemize}')
    .replace(/\\elist/g, '\\end{itemize}')
    .replace(/\\\\\[[^\]]+\]/g, '<br>')
    .replace(/\{\\huge\\textbf\{\\scshape\s*([^}]+)\}\}/g, '<h1 style="font-size: 2.5rem !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 1px !important; margin-bottom: 0.5rem !important;">$1</h1>');
  
  // Process LaTeX commands step by step
  content = content
    // Handle name with \Huge - convert to h1
    .replace(/\\textbf\{\\Huge\s*\\scshape\s*([^}]+)\}/g, '<h1 style="font-size: 2.5rem !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 1px !important; margin-bottom: 0.5rem !important;">$1</h1>')
    // Handle sections
    .replace(/\\section\*\{([^}]+)\}/g, '</div><h2 style="border-bottom: 2px solid; padding-bottom: 0.25rem; margin-top: 1rem !important; margin-bottom: 0.5rem !important; font-size: 1.25rem; font-weight: bold;">$1</h2><div>')
    // Handle center environment
    .replace(/\\begin\{center\}/g, '<div style="text-align: center; margin-bottom: 0.5rem !important;">')
    .replace(/\\end\{center\}/g, '</div>')
    // Handle itemize environment and list items
    .replace(/\\begin\{itemize\}(?:\[[^\]]*\])?/g, '<ul style="margin-top: 0.4rem !important; margin-bottom: 0.5rem !important; padding-left: 1.25rem;">')
    .replace(/\\end\{itemize\}/g, '</ul>')
    .replace(/\\item\s+/g, '<li style="margin-bottom: 0.2rem !important;">')
    // Close li when a new item starts or when list ends
    .replace(/(<li[^>]*>[\s\S]*?)(?=<li|<\/ul>)/g, '$1</li>')
    // Handle text formatting
    .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
    .replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>')
    .replace(/\\Huge\s*\\scshape\s*/g, '')
    .replace(/\\small\s*/g, '')
    // Handle links (will be styled by CSS)
    .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1" style="text-decoration: none;">$2</a>')
    // Handle spacing
    .replace(/\\vspace\{[^}]+\}/g, '')
    .replace(/\\vspace\{0\.5em\}/g, '<br>')
    .replace(/\\vspace\{0\.25em\}/g, '')
    .replace(/\\\\/g, '<br>')
    .replace(/\\hfill/g, '<span style="float: right;"></span>')
    // Handle inline math
    .replace(/\$([^$]+)\$/g, '$1')
    // Handle LaTeX escape sequences (must be before comment removal)
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\#/g, '#')
    .replace(/\\_/g, '_')
    .replace(/\\\{/g, '{')
    .replace(/\\\}/g, '}')
    // Remove comments (after handling \%)
    .replace(/%.*$/gm, '')
    // Handle line breaks and paragraphs
    .split('\n')
    .map(line => {
      line = line.trim();
      if (!line) return '';
      
      // Bullet points
      if (line.startsWith('- ')) {
        return `<li style="margin-bottom: 0.2rem !important; margin-left: 1.5rem;">${line.substring(2)}</li>`;
      }
      
      // Empty lines become paragraph breaks
      return line;
    })
    .filter(line => line)
    .join('\n');
  
  // Wrap sections in divs and handle lists
  content = content.replace(/(<li[^>]*>.*?<\/li>(?:\s*<li[^>]*>.*?<\/li>)*)/gs, '<ul style="margin-top: 0.4rem !important; margin-bottom: 0.5rem !important;">$1</ul>');
  
  // Add margin to all paragraphs - reduced margins
  content = content.replace(/<p([^>]*)>/g, '<p$1 style="margin-bottom: 0.3rem !important;">');
  
  // Final cleanup: remove any remaining stray backslashes (not part of HTML tags or already processed)
  // This handles cases where escape sequences weren't caught earlier
  content = content.replace(/([^\\])\\([^\\<>&%#_{}])/g, '$1$2');
  
  // Wrap in proper structure with dark mode support
  // Use CSS that adapts to dark/light mode - black for light, white for dark
  return `
    <div style="padding: 1rem 1.5rem; font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; line-height: 1.5;">
      <style>
        .resume-content {
          font-size: 15px !important;
        }
        .resume-content h1 {
          font-size: 2.5rem !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          margin-bottom: 0.5rem !important;
          margin-top: 0 !important;
        }
        .resume-content h2 {
          font-size: 1.25rem !important;
          margin-top: 1rem !important;
          margin-bottom: 0.5rem !important;
          padding-bottom: 0.25rem !important;
        }
        .resume-content p {
          font-size: 15px !important;
          margin-bottom: 0.3rem !important;
          line-height: 1.5 !important;
        }
        .resume-content li {
          font-size: 15px !important;
          margin-bottom: 0.2rem !important;
          line-height: 1.5 !important;
        }
        .resume-content strong {
          font-weight: 600 !important;
        }
        .resume-content ul {
          margin-top: 0.4rem !important;
          margin-bottom: 0.5rem !important;
        }
        .resume-content div {
          margin-bottom: 0.2rem !important;
        }
        .resume-content > div {
          margin-bottom: 0 !important;
        }
        
        /* Light mode (default) - black text */
        html:not(.dark) .resume-content,
        html:not(.dark) .resume-content * { 
          color: #000000 !important; 
        }
        html:not(.dark) .resume-content h1,
        html:not(.dark) .resume-content h2,
        html:not(.dark) .resume-content h3,
        html:not(.dark) .resume-content h4,
        html:not(.dark) .resume-content h5,
        html:not(.dark) .resume-content h6 { 
          color: #000000 !important; 
        }
        html:not(.dark) .resume-content p,
        html:not(.dark) .resume-content li,
        html:not(.dark) .resume-content div,
        html:not(.dark) .resume-content span { 
          color: #000000 !important; 
        }
        html:not(.dark) .resume-content strong,
        html:not(.dark) .resume-content b { 
          color: #000000 !important; 
          font-weight: 600; 
        }
        html:not(.dark) .resume-content em,
        html:not(.dark) .resume-content i { 
          color: #000000 !important; 
        }
        html:not(.dark) .resume-content a { 
          color: #059669 !important; 
        }
        html:not(.dark) .resume-content a:hover { 
          color: #10b981 !important; 
        }
        
        /* Dark mode - white text */
        html.dark .resume-content,
        html.dark .resume-content * { 
          color: #ffffff !important; 
        }
        html.dark .resume-content h1,
        html.dark .resume-content h2,
        html.dark .resume-content h3,
        html.dark .resume-content h4,
        html.dark .resume-content h5,
        html.dark .resume-content h6 { 
          color: #ffffff !important; 
        }
        html.dark .resume-content p,
        html.dark .resume-content li,
        html.dark .resume-content div,
        html.dark .resume-content span { 
          color: #ffffff !important; 
        }
        html.dark .resume-content strong,
        html.dark .resume-content b { 
          color: #ffffff !important; 
        }
        html.dark .resume-content em,
        html.dark .resume-content i { 
          color: #ffffff !important; 
        }
        html.dark .resume-content a { 
          color: #34d399 !important; 
        }
        html.dark .resume-content a:hover { 
          color: #6ee7b7 !important; 
        }
      </style>
      <div class="resume-content">
        <div style="text-align: center; margin-bottom: 1rem;">
        </div>
        <div>${content}</div>
      </div>
    </div>
  `;
}

export async function GET() {
  try {
    const latexPath = path.join(process.cwd(), 'src', 'lib', 'main.tex');
    
    if (!fs.existsSync(latexPath)) {
      return NextResponse.json(
        { error: 'LaTeX source file not found' },
        { status: 404 }
      );
    }

    const latexContent = fs.readFileSync(latexPath, 'utf8');
    
    try {
      // Use happy-dom which is lighter and works better with Next.js
      const { Window } = await import('happy-dom');
      
      // Create a DOM environment for latex.js with proper DOCTYPE
      const window = new Window({
        url: 'http://localhost',
        settings: {
          disableJavaScriptFileLoading: true,
          disableJavaScriptEvaluation: true,
          disableCSSFileLoading: true,
        }
      });
      
      // Set up a proper HTML document
      window.document.write('<!DOCTYPE html><html><head></head><body></body></html>');
      
      // Set up global document and window
      // Use Object.defineProperty for navigator since it might be read-only
      global.document = window.document;
      global.window = window;
      
      // Try to set navigator, but don't fail if it's read-only
      try {
        global.navigator = window.navigator;
      } catch (e) {
        // navigator might be read-only, that's okay
        console.warn('Could not set global.navigator:', e.message);
      }
      
      // Import latex.js after setting up DOM
      const latex = require('latex.js');
      
      // Create HTML generator first
      const generator = new latex.HtmlGenerator({ hyphenate: false });
      
      // Parse the LaTeX document with the generator
      // The parse function takes the content and options including generator
      latex.parse(latexContent, { generator });
      
      // Get the HTML document from the generator
      const htmlDoc = generator.htmlDocument();
      
      // Extract HTML string
      let html = '';
      if (htmlDoc && htmlDoc.documentElement) {
        html = htmlDoc.documentElement.outerHTML;
      } else if (htmlDoc && htmlDoc.body) {
        html = htmlDoc.body.innerHTML;
      } else if (typeof htmlDoc === 'string') {
        html = htmlDoc;
      } else if (window.document && window.document.body) {
        // Fallback: get HTML from the document body
        html = window.document.body.innerHTML;
      }
      
      if (!html) {
        throw new Error('Failed to generate HTML from LaTeX');
      }
      
      // Clean up globals
      try {
        if (global.document) delete global.document;
        if (global.window) delete global.window;
        if (global.navigator) delete global.navigator;
      } catch (e) {
        // Ignore cleanup errors
      }
      
      return NextResponse.json({ html }, { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (renderError) {
      // Clean up globals on error too
      try {
        if (global.document) delete global.document;
        if (global.window) delete global.window;
        if (global.navigator) delete global.navigator;
      } catch (e) {
        // Ignore cleanup errors
      }
      
      console.error('Error rendering LaTeX:', renderError);
      console.error('Stack:', renderError.stack);
      
      // Create a simple HTML version from the LaTeX content
      // Extract key information and format it as HTML
      const fallbackHtml = createFallbackHTML(latexContent);
      
      return NextResponse.json({ 
        html: fallbackHtml,
        error: 'LaTeX rendering failed, showing simplified HTML version',
        details: renderError.message 
      }, { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  } catch (error) {
    console.error('Error in render API:', error);
    return NextResponse.json(
      { 
        error: 'Error reading LaTeX source', 
        details: error.message,
        html: '' 
      }, { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

