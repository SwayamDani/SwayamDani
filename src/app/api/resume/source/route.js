import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    
    return NextResponse.json({ latexContent }, { status: 200 });
  } catch (error) {
    console.error('Error reading LaTeX source:', error);
    return NextResponse.json(
      { error: 'Error reading LaTeX source', details: error.message },
      { status: 500 }
    );
  }
}

