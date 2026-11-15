/**
 * Comperter - Core Image Conversion & Compression Engine
 * 100% Client-side HTML5 Canvas & Blob processing
 */

const ImageConverter = {
  /**
   * Format bytes to human readable string (KB, MB, GB)
   */
  formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Calculate space savings between original and compressed size
   */
  calculateSavings(origBytes, newBytes) {
    const diff = origBytes - newBytes;
    const percent = origBytes > 0 ? ((diff / origBytes) * 100).toFixed(1) : 0;
    return {
      savedBytes: diff,
      savedBytesFormatted: this.formatBytes(Math.abs(diff)),
      percent: parseFloat(percent),
      isSmaller: diff > 0
    };
  },

  /**
   * Load an image file into an HTMLImageElement
   */
  loadImage(source) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = source instanceof Blob || source instanceof File 
        ? URL.createObjectURL(source) 
        : source;

      img.onload = () => {
        if (source instanceof Blob || source instanceof File) {
          // Do not immediately revoke if needed elsewhere, but can resolve with img and url
        }
        resolve(img);
      };
      img.onerror = (err) => reject(new Error('Gagal memuat file gambar: ' + (err.message || 'Format tidak valid')));
      img.src = url;
    });
  },

  /**
   * Calculate final target dimensions based on resize options
   */
  calculateDimensions(origWidth, origHeight, options = {}) {
    let targetWidth = origWidth;
    let targetHeight = origHeight;

    if (!options.resize) {
      return { width: targetWidth, height: targetHeight };
    }

    const { scale, customWidth, customHeight, lockAspectRatio = true } = options;

    if (customWidth && customHeight) {
      if (lockAspectRatio) {
        const ratio = origWidth / origHeight;
        targetWidth = customWidth;
        targetHeight = Math.round(customWidth / ratio);
      } else {
        targetWidth = customWidth;
        targetHeight = customHeight;
      }
    } else if (customWidth) {
      const ratio = origWidth / origHeight;
      targetWidth = customWidth;
      targetHeight = Math.round(customWidth / ratio);
    } else if (customHeight) {
      const ratio = origWidth / origHeight;
      targetHeight = customHeight;
      targetWidth = Math.round(customHeight * ratio);
    } else if (scale && scale > 0 && scale <= 1) {
      targetWidth = Math.round(origWidth * scale);
      targetHeight = Math.round(origHeight * scale);
    }

    // Safety checks: minimum 1px
    targetWidth = Math.max(1, targetWidth);
    targetHeight = Math.max(1, targetHeight);

    return { width: targetWidth, height: targetHeight };
  },

  /**
   * Render image to canvas at specific dimensions with white background for JPEG
   */
  drawToCanvas(img, width, height, mimeType = 'image/jpeg') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // For JPEG / JPG, fill white background to prevent transparent areas from turning pitch black
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
  },

  /**
   * Convert canvas to blob with promise
   */
  canvasToBlob(canvas, mimeType, quality) {
    return new Promise((resolve, reject) => {
      // Normalize 'image/jpg' to standard 'image/jpeg'
      const exportType = mimeType === 'image/jpg' ? 'image/jpeg' : mimeType;
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Gagal menghasilkan Blob dari Canvas'));
        },
        exportType,
        quality
      );
    });
  },

  /**
   * Main Converter & Compressor function
   * Handles Quality Mode and Target Size Mode (Binary Search optimization)
   */
  async processImage(fileOrBlob, options = {}) {
    const origSize = fileOrBlob.size;
    const img = await this.loadImage(fileOrBlob);
    const origWidth = img.naturalWidth || img.width;
    const origHeight = img.naturalHeight || img.height;

    // Normalizing requested output mime type
    let mimeType = options.format || 'image/jpeg';
    if (mimeType === 'image/jpg') mimeType = 'image/jpeg';

    const mode = options.mode || 'quality'; // 'quality' or 'target_size'
    let { width: targetWidth, height: targetHeight } = this.calculateDimensions(origWidth, origHeight, options);

    let finalBlob = null;
    let finalQuality = options.quality !== undefined ? options.quality : 0.8;

    if (mode === 'quality') {
      // Standard Quality Mode
      const canvas = this.drawToCanvas(img, targetWidth, targetHeight, mimeType);
      finalBlob = await this.canvasToBlob(canvas, mimeType, finalQuality);
    } else if (mode === 'target_size') {
      // Target File Size Mode (Binary Search Optimization)
      const targetBytes = options.targetSizeBytes || 200 * 1024; // default 200 KB

      let lowQ = 0.05;
      let highQ = 0.98;
      let bestBlob = null;
      let currentWidth = targetWidth;
      let currentHeight = targetHeight;
      let canvas = this.drawToCanvas(img, currentWidth, currentHeight, mimeType);

      // Perform Binary Search on quality (up to 7 iterations)
      for (let i = 0; i < 7; i++) {
        const midQ = (lowQ + highQ) / 2;
        const testBlob = await this.canvasToBlob(canvas, mimeType, midQ);

        if (testBlob.size <= targetBytes) {
          bestBlob = testBlob;
          finalQuality = midQ;
          lowQ = midQ; // Try to get higher quality that still fits
        } else {
          highQ = midQ; // Need smaller file size
        }
      }

      // If even lowest quality is larger than target size (e.g. huge resolution image),
      // downscale resolution progressively until it strictly fits the target!
      let scaleDownIterations = 0;
      while ((!bestBlob || bestBlob.size > targetBytes) && scaleDownIterations < 6) {
        currentWidth = Math.round(currentWidth * 0.82);
        currentHeight = Math.round(currentHeight * 0.82);
        canvas = this.drawToCanvas(img, currentWidth, currentHeight, mimeType);

        // Try at quality 0.70
        const testBlob = await this.canvasToBlob(canvas, mimeType, 0.70);
        if (testBlob.size <= targetBytes) {
          bestBlob = testBlob;
          finalQuality = 0.70;
          break;
        } else {
          // Try at lowest quality
          const minQBlob = await this.canvasToBlob(canvas, mimeType, 0.25);
          if (minQBlob.size <= targetBytes) {
            bestBlob = minQBlob;
            finalQuality = 0.25;
            break;
          }
        }
        scaleDownIterations++;
      }

      if (!bestBlob) {
        // Fallback: produce the smallest possible blob
        bestBlob = await this.canvasToBlob(canvas, mimeType, 0.1);
        finalQuality = 0.1;
      }

      finalBlob = bestBlob;
      targetWidth = currentWidth;
      targetHeight = currentHeight;
    }

    const savings = this.calculateSavings(origSize, finalBlob.size);
    const compressedUrl = URL.createObjectURL(finalBlob);

    return {
      blob: finalBlob,
      url: compressedUrl,
      origSize,
      compressedSize: finalBlob.size,
      origWidth,
      origHeight,
      width: targetWidth,
      height: targetHeight,
      quality: Math.round(finalQuality * 100),
      savings,
      mimeType
    };
  }
};

window.ImageConverter = ImageConverter;
