/**
 * Comperter - Modern Image to JPEG Converter & Compressor
 * Main Application Controller & UI Handler
 */

(function () {
  'use strict';

  // --- Multi-language (i18n) Dictionary ---
  const translations = {
    id: {
      badge_privacy: '100% Offline & Privat',
      hero_title_1: 'Konversi ke',
      hero_title_2: '& Kompres Ukuran',
      hero_desc: 'Ubah format gambar (JPG, PNG, WEBP, BMP, PDF) menjadi JPEG standar dengan ukuran file lebih hemat hingga 90%. Dilengkapi fitur kompresi pintar khusus dokumen CPNS, SNBP, paspor, dan web.',
      drop_cta: 'Klik untuk memilih gambar',
      drop_cta_suffix: 'atau tarik file ke sini',
      drop_support: 'Mendukung JPG, JPEG, PNG, WEBP, GIF, BMP, dan PDF • Bisa tekan Ctrl + V untuk paste gambar',
      settings_title: 'Pengaturan Kompresi & Format',
      settings_desc: 'Sesuaikan kualitas, ukuran maksimal, atau dimensi foto',
      mode_quality: 'Mode Kualitas (%)',
      mode_target_size: 'Target Ukuran (KB/MB)',
      label_quality: 'Tingkat Kualitas JPEG:',
      quality_desc_balanced: 'Bagus & Ringan',
      label_target_size: 'Batasi Ukuran Maksimal:',
      target_size_hint: '🎯 Auto-kalkulasi kualitas & dimensi',
      label_output_format: 'Format Output Utama:',
      label_resize: 'Ubah Dimensi (Resize)',
      label_scale: 'Skala Gambar:',
      label_width: 'Lebar (px)',
      label_height: 'Tinggi (px)',
      label_lock_ratio: 'Kunci rasio aspek (proporsional)',
      label_photo_preset: 'Preset Pas Foto Resmi (300 DPI):',
      status_ready: 'Siap mengonversi file gambar',
      btn_reapply: 'Terapkan Pengaturan',
      results_title: 'Daftar Gambar Terkompresi',
      btn_clear_all: 'Hapus Semua',
      btn_download_zip: 'Download Semua (ZIP)',
      btn_download_jpeg: 'Download JPEG Ini',
      feat_1_title: 'Kompresi Instan & Pintar',
      feat_1_desc: 'Algoritma cerdas mempertahankan ketajaman visual gambar sambil mengurangi ukuran file secara dramatis hingga 90%.',
      feat_2_title: 'Khusus CPNS & Pas Foto',
      feat_2_desc: 'Mode target ukuran tepat (misal <200 KB) dan preset pas foto 2x3, 3x4, 4x6 untuk syarat registrasi resmi.',
      feat_3_title: 'Privasi 100% Terjamin',
      feat_3_desc: 'Semua file diproses langsung di browser Anda via HTML5 Canvas. Foto Anda tidak pernah diupload ke server mana pun.',
      feat_4_title: 'Multi-Format & PDF',
      feat_4_desc: 'Konversi dari JPG, PNG (latar belakang putih otomatis), WEBP, hingga halaman dokumen PDF ke format JPEG.',
      faq_title: 'Pertanyaan yang Sering Diajukan (FAQ)',
      modal_compare_title: 'Bandingkan Kualitas: Asli vs JPEG Terkompresi',
      modal_orig_size: 'Ukuran Asli:',
      modal_comp_size: 'Ukuran Terkompresi:',
      modal_savings: 'Penghematan:',
      modal_badge_orig: '← Asli',
      modal_badge_comp: 'JPEG Terkompresi →',
      modal_drag_hint: 'Geser garis di tengah ke kiri/kanan untuk membandingkan detail gambar.',
      footer_tagline: 'Konverter & Kompresor Gambar Modern Client-Side',
      card_badge_saved: 'Hemat',
      card_badge_larger: 'Naik',
      card_btn_compare: 'Bandingkan',
      card_btn_download: 'Download',
      card_processing: 'Memproses...',
      card_error: 'Gagal',
      toast_copied: 'Gambar berhasil dimuat dari clipboard!'
    },
    en: {
      badge_privacy: '100% Offline & Private',
      hero_title_1: 'Convert to',
      hero_title_2: '& Compress Size',
      hero_desc: 'Convert any image format (JPG, PNG, WEBP, BMP, PDF) to standard high-quality JPEG and reduce file size by up to 90%. Optimized for web, social media, and official registration documents.',
      drop_cta: 'Click to select images',
      drop_cta_suffix: 'or drag & drop files here',
      drop_support: 'Supports JPG, JPEG, PNG, WEBP, GIF, BMP, and PDF • Press Ctrl + V to paste an image',
      settings_title: 'Compression & Format Settings',
      settings_desc: 'Adjust quality ratio, maximum file size, or dimensions',
      mode_quality: 'Quality Mode (%)',
      mode_target_size: 'Target File Size (KB/MB)',
      label_quality: 'JPEG Quality Level:',
      quality_desc_balanced: 'Crisp & Compact',
      label_target_size: 'Maximum Target Size:',
      target_size_hint: '🎯 Auto-calculates quality & scale',
      label_output_format: 'Main Output Format:',
      label_resize: 'Resize Dimensions',
      label_scale: 'Image Scale:',
      label_width: 'Width (px)',
      label_height: 'Height (px)',
      label_lock_ratio: 'Lock aspect ratio (proportional)',
      label_photo_preset: 'Official Passport / ID Presets (300 DPI):',
      status_ready: 'Ready to convert image files',
      btn_reapply: 'Apply Settings',
      results_title: 'Compressed Images Gallery',
      btn_clear_all: 'Clear All',
      btn_download_zip: 'Download All (ZIP)',
      btn_download_jpeg: 'Download This JPEG',
      feat_1_title: 'Instant & Smart Compression',
      feat_1_desc: 'Smart algorithms retain sharp details while drastically reducing file sizes by up to 90%.',
      feat_2_title: 'Official Forms & ID Photos',
      feat_2_desc: 'Precise target size mode (e.g. <200 KB) and 2x3, 3x4, 4x6 photo presets for government portals.',
      feat_3_title: '100% Private & Offline',
      feat_3_desc: 'All images are processed locally on your device via HTML5 Canvas. No file is ever sent to any cloud server.',
      feat_4_title: 'Multi-Format & PDF Support',
      feat_4_desc: 'Convert JPG, transparent PNG (auto white background), WEBP, and PDF pages directly to JPEG.',
      faq_title: 'Frequently Asked Questions (FAQ)',
      modal_compare_title: 'Quality Comparison: Original vs Compressed JPEG',
      modal_orig_size: 'Original Size:',
      modal_comp_size: 'Compressed Size:',
      modal_savings: 'Space Saved:',
      modal_badge_orig: '← Original',
      modal_badge_comp: 'Compressed JPEG →',
      modal_drag_hint: 'Drag the vertical divider left or right to inspect image details.',
      footer_tagline: 'Modern Client-Side Image Converter & Compressor',
      card_badge_saved: 'Saved',
      card_badge_larger: 'Increased',
      card_btn_compare: 'Compare',
      card_btn_download: 'Download',
      card_processing: 'Processing...',
      card_error: 'Failed',
      toast_copied: 'Image loaded from clipboard!'
    }
  };

  // --- App State ---
  const state = {
    lang: localStorage.getItem('comperter_lang') || 'id',
    theme: localStorage.getItem('comperter_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    files: [], // Array of file item objects
    activeModalFileId: null,
    settings: {
      mode: 'quality', // 'quality' | 'target_size'
      quality: 0.8,
      targetSizeValue: 200,
      targetSizeUnit: 'KB',
      format: 'image/jpeg',
      resize: false,
      scale: 1,
      customWidth: null,
      customHeight: null,
      lockAspectRatio: true
    }
  };

  // --- DOM Elements ---
  const els = {
    html: document.documentElement,
    langToggleBtn: document.getElementById('langToggleBtn'),
    currentLangLabel: document.getElementById('currentLangLabel'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    dropZone: document.getElementById('dropZone'),
    fileInput: document.getElementById('fileInput'),
    
    // Settings elements
    modeQualityBtn: document.getElementById('modeQualityBtn'),
    modeSizeBtn: document.getElementById('modeSizeBtn'),
    qualityContainer: document.getElementById('qualityContainer'),
    targetSizeContainer: document.getElementById('targetSizeContainer'),
    qualitySlider: document.getElementById('qualitySlider'),
    qualityValueBadge: document.getElementById('qualityValueBadge'),
    targetSizeInput: document.getElementById('targetSizeInput'),
    targetSizeUnit: document.getElementById('targetSizeUnit'),
    outputFormatRadios: document.querySelectorAll('input[name="outputFormat"]'),
    reprocessAllBtn: document.getElementById('reprocessAllBtn'),
    queueStatsText: document.getElementById('queueStatsText'),

    // Resize controls
    resizeToggle: document.getElementById('resizeToggle'),
    resizeOptionsWrapper: document.getElementById('resizeOptionsWrapper'),
    customWidthInput: document.getElementById('customWidthInput'),
    customHeightInput: document.getElementById('customHeightInput'),
    lockAspectRatio: document.getElementById('lockAspectRatio'),

    // Results Gallery
    fileListSection: document.getElementById('fileListSection'),
    fileCardsGrid: document.getElementById('fileCardsGrid'),
    fileCountBadge: document.getElementById('fileCountBadge'),
    totalSavingsValue: document.getElementById('totalSavingsValue'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    downloadAllZipBtn: document.getElementById('downloadAllZipBtn'),

    // Compare Modal
    compareModal: document.getElementById('compareModal'),
    closeCompareModalBtn: document.getElementById('closeCompareModalBtn'),
    modalFileName: document.getElementById('modalFileName'),
    modalOrigSize: document.getElementById('modalOrigSize'),
    modalCompSize: document.getElementById('modalCompSize'),
    modalSavings: document.getElementById('modalSavings'),
    modalOriginalImg: document.getElementById('modalOriginalImg'),
    modalCompressedImg: document.getElementById('modalCompressedImg'),
    modalOriginalClipper: document.getElementById('modalOriginalClipper'),
    modalSplitHandle: document.getElementById('modalSplitHandle'),
    splitViewerContainer: document.getElementById('splitViewerContainer'),
    modalDownloadSingleBtn: document.getElementById('modalDownloadSingleBtn')
  };

  // --- Theme Initializer ---
  function initTheme() {
    if (state.theme === 'dark') {
      els.html.classList.add('dark');
    } else {
      els.html.classList.remove('dark');
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('comperter_theme', state.theme);
    initTheme();
  }

  // --- Language Initializer ---
  function updateLanguageUI() {
    const dict = translations[state.lang] || translations.id;
    els.currentLangLabel.textContent = state.lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    renderAllCards();
  }

  function toggleLanguage() {
    state.lang = state.lang === 'id' ? 'en' : 'id';
    localStorage.setItem('comperter_lang', state.lang);
    updateLanguageUI();
  }

  // --- Helpers ---
  function getTargetSizeBytes() {
    const val = parseFloat(els.targetSizeInput.value) || 200;
    const unit = els.targetSizeUnit.value;
    return unit === 'MB' ? val * 1024 * 1024 : val * 1024;
  }

  function getFileExtensionForMime(mimeType) {
    switch (mimeType) {
      case 'image/jpg': return '.jpg';
      case 'image/webp': return '.webp';
      case 'image/png': return '.png';
      case 'image/jpeg':
      default:
        return '.jpeg';
    }
  }

  function generateTargetFilename(origName, mimeType) {
    const base = origName.replace(/\.[^/.]+$/, '');
    const ext = getFileExtensionForMime(mimeType);
    return `${base}_compressed${ext}`;
  }

  // --- File Processing Core ---
  async function addFiles(fileList) {
    if (!fileList || fileList.length === 0) return;

    const newItems = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Check if it's a PDF document
      if (window.PdfHelper && window.PdfHelper.isPdf(file)) {
        try {
          els.queueStatsText.textContent = `Mengekstrak halaman dokumen PDF (${file.name})...`;
          const extractedPages = await window.PdfHelper.extractPagesAsImages(file);
          for (const pageItem of extractedPages) {
            newItems.push({
              id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
              file: pageItem.file,
              origUrl: URL.createObjectURL(pageItem.file),
              origSize: pageItem.file.size,
              name: pageItem.file.name,
              status: 'pending',
              result: null,
              error: null
            });
          }
        } catch (err) {
          console.error('PDF extraction failed:', err);
          alert('Gagal membaca PDF: ' + err.message);
        }
      } else if (file.type.startsWith('image/') || /\.(jpe?g|png|webp|bmp|gif|tiff|svg)$/i.test(file.name)) {
        // Standard image file
        newItems.push({
          id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          file: file,
          origUrl: URL.createObjectURL(file),
          origSize: file.size,
          name: file.name,
          status: 'pending',
          result: null,
          error: null
        });
      }
    }

    if (newItems.length > 0) {
      state.files.push(...newItems);
      els.fileListSection.classList.remove('hidden');
      renderAllCards();
      processQueue();
    }
  }

  async function processQueue() {
    const pendingItems = state.files.filter((item) => item.status === 'pending');
    if (pendingItems.length === 0) {
      updateSummaryBanner();
      els.queueStatsText.textContent = translations[state.lang].status_ready;
      return;
    }

    els.queueStatsText.textContent = `Memproses ${pendingItems.length} gambar...`;

    const options = {
      format: state.settings.format,
      mode: state.settings.mode,
      quality: state.settings.quality,
      targetSizeBytes: getTargetSizeBytes(),
      resize: state.settings.resize,
      scale: state.settings.scale,
      customWidth: state.settings.customWidth,
      customHeight: state.settings.customHeight,
      lockAspectRatio: state.settings.lockAspectRatio
    };

    for (const item of pendingItems) {
      item.status = 'processing';
      updateCardStatus(item.id);

      try {
        const result = await window.ImageConverter.processImage(item.file, options);
        item.result = result;
        item.status = 'done';
      } catch (err) {
        console.error('Conversion error for', item.name, err);
        item.error = err.message || 'Gagal memproses gambar';
        item.status = 'error';
      }

      updateCardStatus(item.id);
    }

    updateSummaryBanner();
    els.queueStatsText.textContent = translations[state.lang].status_ready;
  }

  function reprocessAll() {
    state.files.forEach((item) => {
      item.status = 'pending';
    });
    renderAllCards();
    processQueue();
  }

  // --- UI Card Rendering & Updates ---
  function renderAllCards() {
    els.fileCountBadge.textContent = state.files.length;

    if (state.files.length === 0) {
      els.fileListSection.classList.add('hidden');
      els.fileCardsGrid.innerHTML = '';
      return;
    }

    els.fileListSection.classList.remove('hidden');
    els.fileCardsGrid.innerHTML = state.files.map((item) => buildCardHtml(item)).join('');
    bindCardEvents();
    updateSummaryBanner();
  }

  function buildCardHtml(item) {
    const dict = translations[state.lang];
    const isDone = item.status === 'done';
    const isError = item.status === 'error';
    const isProcessing = item.status === 'processing';

    let savingsBadgeHtml = '';
    let newSizeHtml = '<span class="text-slate-400 font-mono text-xs">...</span>';
    let resolutionHtml = '';

    if (isDone && item.result) {
      const res = item.result;
      newSizeHtml = `<span class="font-bold text-slate-800 dark:text-slate-100 font-mono text-sm">${window.ImageConverter.formatBytes(res.compressedSize)}</span>`;
      resolutionHtml = `<span class="text-[11px] text-slate-500 font-mono">${res.width} &times; ${res.height} px</span>`;

      if (res.savings.isSmaller) {
        savingsBadgeHtml = `
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            -${res.savings.percent}% ${dict.card_badge_saved}
          </span>
        `;
      } else {
        savingsBadgeHtml = `
          <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
            ${dict.card_badge_larger}
          </span>
        `;
      }
    } else if (isProcessing) {
      savingsBadgeHtml = `
        <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 animate-pulse">
          ${dict.card_processing}
        </span>
      `;
    } else if (isError) {
      savingsBadgeHtml = `
        <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300">
          ${dict.card_error}
        </span>
      `;
    }

    const previewSrc = isDone && item.result ? item.result.url : item.origUrl;

    return `
      <div id="card_${item.id}" class="file-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md">
        
        <!-- Thumbnail & Details Top Row -->
        <div class="flex gap-3">
          <div class="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 checker-pattern flex items-center justify-center border border-slate-200 dark:border-slate-700">
            <img src="${previewSrc}" alt="${item.name}" class="w-full h-full object-contain">
          </div>

          <div class="flex-1 min-w-0 flex flex-col justify-center">
            <div class="flex items-center justify-between gap-1 mb-1">
              <h3 class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate" title="${item.name}">${item.name}</h3>
              <button data-remove-id="${item.id}" class="text-slate-400 hover:text-rose-500 p-1 rounded transition" title="Hapus gambar ini">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1.5 font-mono">
              <span>Asli: ${window.ImageConverter.formatBytes(item.origSize)}</span>
              ${resolutionHtml ? `<span>&bull;</span>` + resolutionHtml : ''}
            </div>

            <div class="flex items-center gap-2">
              ${newSizeHtml}
              ${savingsBadgeHtml}
            </div>
          </div>
        </div>

        <!-- Card Action Buttons -->
        <div class="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
          <button data-compare-id="${item.id}" ${!isDone ? 'disabled' : ''} 
                  class="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed">
            <svg class="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span>${dict.card_btn_compare}</span>
          </button>

          <button data-download-id="${item.id}" ${!isDone ? 'disabled' : ''} 
                  class="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-blue-500/20">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            <span>${dict.card_btn_download}</span>
          </button>
        </div>

      </div>
    `;
  }

  function updateCardStatus(itemId) {
    const item = state.files.find((f) => f.id === itemId);
    if (!item) return;

    const cardEl = document.getElementById(`card_${itemId}`);
    if (cardEl) {
      const tempWrapper = document.createElement('div');
      tempWrapper.innerHTML = buildCardHtml(item);
      cardEl.replaceWith(tempWrapper.firstElementChild);
      bindCardEvents();
    }
  }

  function bindCardEvents() {
    // Remove individual card
    document.querySelectorAll('[data-remove-id]').forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-remove-id');
        removeFile(id);
      };
    });

    // Compare button
    document.querySelectorAll('[data-compare-id]').forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-compare-id');
        openCompareModal(id);
      };
    });

    // Download individual button
    document.querySelectorAll('[data-download-id]').forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-download-id');
        downloadSingleFile(id);
      };
    });
  }

  function removeFile(id) {
    const idx = state.files.findIndex((f) => f.id === id);
    if (idx !== -1) {
      const item = state.files[idx];
      if (item.origUrl) URL.revokeObjectURL(item.origUrl);
      if (item.result && item.result.url) URL.revokeObjectURL(item.result.url);
      state.files.splice(idx, 1);
      renderAllCards();
    }
  }

  function clearAllFiles() {
    state.files.forEach((item) => {
      if (item.origUrl) URL.revokeObjectURL(item.origUrl);
      if (item.result && item.result.url) URL.revokeObjectURL(item.result.url);
    });
    state.files = [];
    renderAllCards();
  }

  function updateSummaryBanner() {
    let totalOrig = 0;
    let totalNew = 0;

    state.files.forEach((f) => {
      if (f.status === 'done' && f.result) {
        totalOrig += f.origSize;
        totalNew += f.result.compressedSize;
      }
    });

    if (totalOrig > 0) {
      const savings = window.ImageConverter.calculateSavings(totalOrig, totalNew);
      els.totalSavingsValue.textContent = `${savings.savedBytesFormatted} (-${savings.percent}%)`;
    } else {
      els.totalSavingsValue.textContent = '0 KB (0%)';
    }
  }

  // --- Single Download & ZIP Archive ---
  function downloadSingleFile(id) {
    const item = state.files.find((f) => f.id === id);
    if (!item || !item.result) return;

    const targetName = generateTargetFilename(item.name, item.result.mimeType);
    const a = document.createElement('a');
    a.href = item.result.url;
    a.download = targetName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function downloadAllZip() {
    const doneItems = state.files.filter((f) => f.status === 'done' && f.result);
    if (doneItems.length === 0) {
      alert('Belum ada gambar yang selesai dikonversi!');
      return;
    }

    if (!window.JSZip) {
      alert('JSZip library belum tersedia.');
      return;
    }

    const zip = new window.JSZip();
    const originalText = els.downloadAllZipBtn.innerHTML;
    els.downloadAllZipBtn.disabled = true;
    els.downloadAllZipBtn.innerHTML = `<span>Mengemas ZIP...</span>`;

    try {
      for (const item of doneItems) {
        const targetName = generateTargetFilename(item.name, item.result.mimeType);
        zip.file(targetName, item.result.blob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `comperter_images_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error('ZIP generation failed:', err);
      alert('Gagal membuat file ZIP: ' + err.message);
    } finally {
      els.downloadAllZipBtn.disabled = false;
      els.downloadAllZipBtn.innerHTML = originalText;
    }
  }

  // --- Interactive Split Compare Modal ---
  function openCompareModal(id) {
    const item = state.files.find((f) => f.id === id);
    if (!item || !item.result) return;

    state.activeModalFileId = id;
    els.modalFileName.textContent = item.name;
    els.modalOrigSize.textContent = `${window.ImageConverter.formatBytes(item.origSize)} (${item.result.origWidth}x${item.result.origHeight})`;
    els.modalCompSize.textContent = `${window.ImageConverter.formatBytes(item.result.compressedSize)} (${item.result.width}x${item.result.height})`;
    els.modalSavings.textContent = `-${item.result.savings.percent}%`;

    els.modalOriginalImg.src = item.origUrl;
    els.modalCompressedImg.src = item.result.url;

    // Reset split slider to 50%
    setSplitSliderPosition(50);

    els.compareModal.classList.remove('hidden');
  }

  function closeCompareModal() {
    els.compareModal.classList.add('hidden');
    state.activeModalFileId = null;
  }

  function setSplitSliderPosition(percent) {
    const bounded = Math.max(0, Math.min(100, percent));
    els.modalOriginalClipper.style.width = `${bounded}%`;
    els.modalSplitHandle.style.left = `${bounded}%`;
  }

  function initSplitSliderDrag() {
    let isDragging = false;

    function onStart(e) {
      isDragging = true;
      e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      const rect = els.splitViewerContainer.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetX = clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      setSplitSliderPosition(percent);
    }

    function onEnd() {
      isDragging = false;
    }

    els.modalSplitHandle.addEventListener('mousedown', onStart);
    els.splitViewerContainer.addEventListener('mousedown', (e) => {
      onStart(e);
      onMove(e);
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    // Touch events for mobile
    els.modalSplitHandle.addEventListener('touchstart', onStart, { passive: false });
    els.splitViewerContainer.addEventListener('touchstart', (e) => {
      onStart(e);
      onMove(e);
    }, { passive: false });

    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  // --- Clipboard Paste Listener (Ctrl + V) ---
  function initClipboardPaste() {
    window.addEventListener('paste', async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const fileName = `screenshot_${Date.now()}.png`;
            const file = new File([blob], fileName, { type: blob.type });
            pastedFiles.push(file);
          }
        }
      }

      if (pastedFiles.length > 0) {
        addFiles(pastedFiles);
      }
    });
  }

  // --- Event Listeners Binding ---
  function initEventListeners() {
    // Theme & Lang
    els.themeToggleBtn.addEventListener('click', toggleTheme);
    els.langToggleBtn.addEventListener('click', toggleLanguage);

    // File Input & Drop Zone
    els.fileInput.addEventListener('change', (e) => {
      addFiles(e.target.files);
      els.fileInput.value = ''; // Reset for re-selection of same file
    });

    // Drag and Drop styling
    ['dragenter', 'dragover'].forEach((ev) => {
      els.dropZone.addEventListener(ev, (e) => {
        e.preventDefault();
        els.dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach((ev) => {
      els.dropZone.addEventListener(ev, (e) => {
        e.preventDefault();
        els.dropZone.classList.remove('drag-over');
      });
    });

    els.dropZone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        addFiles(e.dataTransfer.files);
      }
    });

    // Mode Switch: Quality vs Target Size
    els.modeQualityBtn.addEventListener('click', () => {
      state.settings.mode = 'quality';
      els.modeQualityBtn.classList.add('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-blue-300', 'shadow-sm');
      els.modeQualityBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      els.modeSizeBtn.classList.remove('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-blue-300', 'shadow-sm');
      els.modeSizeBtn.classList.add('text-slate-600', 'dark:text-slate-300');

      els.qualityContainer.classList.remove('hidden');
      els.targetSizeContainer.classList.add('hidden');
    });

    els.modeSizeBtn.addEventListener('click', () => {
      state.settings.mode = 'target_size';
      els.modeSizeBtn.classList.add('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-blue-300', 'shadow-sm');
      els.modeSizeBtn.classList.remove('text-slate-600', 'dark:text-slate-300');
      els.modeQualityBtn.classList.remove('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-blue-300', 'shadow-sm');
      els.modeQualityBtn.classList.add('text-slate-600', 'dark:text-slate-300');

      els.targetSizeContainer.classList.remove('hidden');
      els.qualityContainer.classList.add('hidden');
    });

    // Quality Slider
    els.qualitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.settings.quality = val / 100;
      els.qualityValueBadge.textContent = `${val}%`;

      // Update preset buttons styling
      document.querySelectorAll('.preset-btn').forEach((btn) => {
        const q = parseInt(btn.getAttribute('data-quality'), 10);
        if (q === val) {
          btn.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950/40', 'text-blue-600', 'dark:text-blue-400');
          btn.classList.remove('border-slate-200', 'dark:border-slate-700');
        } else {
          btn.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950/40', 'text-blue-600', 'dark:text-blue-400');
          btn.classList.add('border-slate-200', 'dark:border-slate-700');
        }
      });
    });

    // Quality Presets Buttons
    document.querySelectorAll('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const q = parseInt(btn.getAttribute('data-quality'), 10);
        els.qualitySlider.value = q;
        els.qualitySlider.dispatchEvent(new Event('input'));
      });
    });

    // Target Size Presets (CPNS, 200KB, etc.)
    document.querySelectorAll('.size-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sz = btn.getAttribute('data-size');
        const unit = btn.getAttribute('data-unit');
        els.targetSizeInput.value = sz;
        els.targetSizeUnit.value = unit;

        document.querySelectorAll('.size-preset-btn').forEach((b) => {
          b.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950/40', 'text-blue-600', 'dark:text-blue-400');
          b.classList.add('border-slate-200', 'dark:border-slate-700');
        });
        btn.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-blue-950/40', 'text-blue-600', 'dark:text-blue-400');
      });
    });

    // Format radio changes
    els.outputFormatRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        state.settings.format = e.target.value;
        document.querySelectorAll('.format-radio-label').forEach((lbl) => {
          const r = lbl.querySelector('input');
          if (r.checked) {
            lbl.classList.add('border-2', 'border-blue-600', 'bg-blue-50/50', 'dark:bg-blue-950/30', 'text-blue-700', 'dark:text-blue-300');
            lbl.classList.remove('border', 'border-slate-200', 'dark:border-slate-700');
          } else {
            lbl.classList.remove('border-2', 'border-blue-600', 'bg-blue-50/50', 'dark:bg-blue-950/30', 'text-blue-700', 'dark:text-blue-300');
            lbl.classList.add('border', 'border-slate-200', 'dark:border-slate-700');
          }
        });
      });
    });

    // Resize Toggle
    els.resizeToggle.addEventListener('change', (e) => {
      state.settings.resize = e.target.checked;
      if (e.target.checked) {
        els.resizeOptionsWrapper.classList.remove('opacity-50', 'pointer-events-none');
      } else {
        els.resizeOptionsWrapper.classList.add('opacity-50', 'pointer-events-none');
      }
    });

    // Resize Scale Buttons (100%, 75%, 50%, 25%)
    document.querySelectorAll('.scale-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const scale = parseFloat(btn.getAttribute('data-scale'));
        state.settings.scale = scale;
        state.settings.customWidth = null;
        state.settings.customHeight = null;
        els.customWidthInput.value = '';
        els.customHeightInput.value = '';

        document.querySelectorAll('.scale-btn').forEach((b) => b.classList.remove('bg-blue-600', 'text-white'));
        btn.classList.add('bg-blue-600', 'text-white');
      });
    });

    // Pas Foto Presets (2x3, 3x4, 4x6, FHD)
    document.querySelectorAll('.pasfoto-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const w = parseInt(btn.getAttribute('data-w'), 10);
        const h = parseInt(btn.getAttribute('data-h'), 10);
        els.customWidthInput.value = w;
        els.customHeightInput.value = h;
        state.settings.customWidth = w;
        state.settings.customHeight = h;
        state.settings.scale = null;
      });
    });

    // Dimension inputs
    els.customWidthInput.addEventListener('input', (e) => {
      state.settings.customWidth = parseInt(e.target.value, 10) || null;
      state.settings.scale = null;
    });

    els.customHeightInput.addEventListener('input', (e) => {
      state.settings.customHeight = parseInt(e.target.value, 10) || null;
      state.settings.scale = null;
    });

    els.lockAspectRatio.addEventListener('change', (e) => {
      state.settings.lockAspectRatio = e.target.checked;
    });

    // Action Buttons
    els.reprocessAllBtn.addEventListener('click', reprocessAll);
    els.clearAllBtn.addEventListener('click', clearAllFiles);
    els.downloadAllZipBtn.addEventListener('click', downloadAllZip);

    // Modal Events
    els.closeCompareModalBtn.addEventListener('click', closeCompareModal);
    els.compareModal.addEventListener('click', (e) => {
      if (e.target === els.compareModal) closeCompareModal();
    });

    els.modalDownloadSingleBtn.addEventListener('click', () => {
      if (state.activeModalFileId) {
        downloadSingleFile(state.activeModalFileId);
      }
    });

    // ESC key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !els.compareModal.classList.contains('hidden')) {
        closeCompareModal();
      }
    });
  }

  // --- Initializer ---
  function init() {
    initTheme();
    initEventListeners();
    initSplitSliderDrag();
    initClipboardPaste();
    updateLanguageUI();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
