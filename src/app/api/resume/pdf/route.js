import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // First, try to compile from LaTeX source
    const latexPath = path.join(process.cwd(), 'src', 'lib', 'main.tex');
    const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    // Check if LaTeX source exists
    if (fs.existsSync(latexPath)) {
      // If PDF exists and is newer than LaTeX source, serve it
      if (fs.existsSync(pdfPath)) {
        const pdfStats = fs.statSync(pdfPath);
        const texStats = fs.statSync(latexPath);
        
        // If PDF is newer, serve it
        if (pdfStats.mtime > texStats.mtime) {
          const pdfBuffer = fs.readFileSync(pdfPath);
          return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'application/pdf',
            },
          });
        }
      }
    }
    
    // Fallback: serve existing PDF if it exists
    if (fs.existsSync(pdfPath)) {
      const pdfBuffer = fs.readFileSync(pdfPath);
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
    }
    
    return NextResponse.json(
      { error: 'Resume PDF not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Error serving PDF', details: error.message },
      { status: 500 }
    );
  }
}

