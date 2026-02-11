import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    // Read the LaTeX source file
    const latexPath = path.join(process.cwd(), 'src', 'lib', 'main.tex');
    
    if (!fs.existsSync(latexPath)) {
      return NextResponse.json(
        { error: 'LaTeX source file not found' },
        { status: 404 }
      );
    }

    const latexContent = fs.readFileSync(latexPath, 'utf8');

    // Use latex.ytotech.com API (latex-on-http)
    // Documentation: https://github.com/YtoTech/latex-on-http
    // Endpoint: POST /builds/sync
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [
          {
            main: true,
            content: latexContent,
          },
        ],
        options: {
          compiler: {
            halt_on_error: false,
            silent: false,
          },
          response: {
            log_files_on_failure: true,
          },
        },
      }),
    });

    if (!response.ok) {
      // If compilation fails, the service returns JSON with error logs
      const errorData = await response.json().catch(async () => {
        // If not JSON, try to get text
        const errorText = await response.text().catch(() => 'No error details');
        return { error: errorText };
      });
      
      const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      const errorLogs = errorData.logs || errorData.compilation_logs || '';
      
      return NextResponse.json(
        { 
          error: 'LaTeX compilation failed',
          details: errorMessage,
          logs: errorLogs,
        },
        { status: 500 }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    
    // Check if we got a PDF
    if (contentType.includes('application/pdf')) {
      const pdfBuffer = await response.arrayBuffer();

      if (!pdfBuffer || pdfBuffer.byteLength === 0) {
        throw new Error('Received empty PDF from compilation service');
      }

      return new NextResponse(Buffer.from(pdfBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Swayam_Dani_Resume.pdf"',
        },
      });
    } else {
      // Unexpected content type - might be JSON error
      const errorData = await response.json().catch(async () => {
        const errorText = await response.text().catch(() => 'Could not read error response');
        return { error: errorText };
      });
      
      throw new Error(`Expected PDF but got ${contentType}. ${JSON.stringify(errorData).substring(0, 500)}`);
    }
  } catch (error) {
    console.error('Error compiling LaTeX:', error);
    return NextResponse.json(
      { 
        error: 'Failed to compile LaTeX to PDF',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
