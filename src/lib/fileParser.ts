// Client-side multi-format file parser (100% in-browser)

export async function parseUploadedFile(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  // Plain text formats (.txt, .md, .rtf, .csv, .json, .xml, .html)
  if (['txt', 'md', 'rtf', 'csv', 'json', 'xml', 'html'].includes(extension) || file.type.startsWith('text/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });
  }

  // Microsoft Word (.docx) via browser bundle
  if (extension === 'docx') {
    try {
      // @ts-ignore
      const mammothModule = await import('mammoth/mammoth.browser.js');
      const mammoth = mammothModule.default || mammothModule;
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || '';
    } catch (err: any) {
      console.error('Mammoth extraction failed', err);
      throw new Error(`Could not parse .docx file: ${err.message || 'Corrupt or unsupported Word document'}`);
    }
  }

  // Adobe PDF (.pdf) via pdfjs-dist
  if (extension === 'pdf') {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        fullText += pageStrings + '\n\n';
      }
      return fullText.trim();
    } catch (err: any) {
      console.error('PDF extraction failed', err);
      throw new Error(`Could not parse .pdf file: ${err.message || 'Protected or unreadable PDF'}`);
    }
  }

  throw new Error(`Unsupported file type: .${extension}. Please upload .txt, .md, .docx, or .pdf`);
}
