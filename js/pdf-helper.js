/**
 * Comperter - PDF to JPEG Extraction Helper
 * Utilizes PDF.js to render document pages into standard image blobs
 */

const PdfHelper = {
  /**
   * Check if file is a PDF
   */
  isPdf(file) {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  },

  /**
   * Convert PDF file to array of Image Blobs (one per page)
   * @param {File} pdfFile
   * @param {number} scale DPI scaling factor (default 2.0 for crisp text)
   */
  async extractPagesAsImages(pdfFile, scale = 2.0) {
    if (!window.pdfjsLib) {
      throw new Error('PDF.js library belum dimuat. Pastikan koneksi internet tersedia untuk memproses file PDF.');
    }

    const arrayBuffer = await pdfFile.arrayBuffer();
    const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    const extractedImages = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      // PDF background: fill white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      // Export canvas to JPEG blob
      const pageBlob = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
      });

      const baseName = pdfFile.name.replace(/\.[^/.]+$/, '');
      const pageFileName = numPages > 1 
        ? `${baseName}_hal_${pageNum}.jpeg` 
        : `${baseName}.jpeg`;

      // Create synthetic File object
      const imageFile = new File([pageBlob], pageFileName, {
        type: 'image/jpeg',
        lastModified: Date.now()
      });

      extractedImages.push({
        file: imageFile,
        pageNumber: pageNum,
        totalPages: numPages
      });
    }

    return extractedImages;
  }
};

window.PdfHelper = PdfHelper;
