/**
 * QR Studio UI Handlers & Reactive Orchestrator
 * Connects DOM inputs, presets, history, export triggers, and live preview
 */

import { QR_PRESETS } from './presets.js';
import { ContentBuilders, VIETNAM_BANKS } from './content-builders.js';
import { StorageManager } from './storage.js';
import { Exporter } from './exporter.js';

export class UIHandlers {
  constructor(qrEngine) {
    this.qrEngine = qrEngine;
    this.currentType = 'url';
    this.styleState = { ...QR_PRESETS[0] };
    this.debounceTimer = null;
  }

  init() {
    this.renderBankOptions();
    this.renderPresets();
    this.bindTypeTabs();
    this.bindAccordions();
    this.bindStylePickers();
    this.bindLogoUpload();
    this.bindActionButtons();
    this.bindPreviewToolbar();
    this.bindHistoryControls();
    this.bindInputsReactivity();
    this.renderHistoryList();

    // Trigger initial render
    this.triggerLiveUpdate();
  }

  /**
   * Populate Bank Select options for VietQR
   */
  renderBankOptions() {
    const bankSelect = document.getElementById('vietqrBank');
    if (!bankSelect) return;

    bankSelect.innerHTML = VIETNAM_BANKS.map(b => 
      `<option value="${b.bin}">${b.code} - ${b.name}</option>`
    ).join('');
  }

  /**
   * Render Preset Cards
   */
  renderPresets() {
    const container = document.getElementById('presetsGrid');
    if (!container) return;

    container.innerHTML = QR_PRESETS.map((preset, index) => `
      <div class="preset-card ${index === 0 ? 'active' : ''}" data-preset-id="${preset.id}">
        <div class="preset-preview-thumb" style="background: ${preset.bgColor === 'transparent' ? '#182234' : preset.bgColor}; border: 1px solid rgba(255,255,255,0.1);">
          <span style="background: ${preset.dotsColor1}; width: 14px; height: 14px; border-radius: 4px; display: inline-block;"></span>
        </div>
        <span class="preset-name">${preset.name}</span>
      </div>
    `).join('');

    container.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const presetId = card.dataset.presetId;
        const selected = QR_PRESETS.find(p => p.id === presetId);
        if (selected) {
          this.applyPreset(selected);
        }
      });
    });
  }

  /**
   * Apply a style preset into state and DOM
   */
  applyPreset(preset) {
    this.styleState = { ...this.styleState, ...preset };

    // Update DOM Pickers
    this.syncDOMWithStyleState();
    this.triggerLiveUpdate();
    this.showToast(`Đã áp dụng mẫu: ${preset.name}`, 'success');
  }

  /**
   * Sync DOM inputs with current style state
   */
  syncDOMWithStyleState() {
    // Dots type
    document.querySelectorAll('[data-dot-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.dotType === this.styleState.dotsType);
    });

    // Corner Square type
    document.querySelectorAll('[data-corner-square-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cornerSquareType === this.styleState.cornersSquareType);
    });

    // Corner Dot type
    document.querySelectorAll('[data-corner-dot-type]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cornerDotType === this.styleState.cornersDotType);
    });

    // Colors
    const dotColor1 = document.getElementById('dotColor1');
    const dotColor2 = document.getElementById('dotColor2');
    const cornerSquareColor = document.getElementById('cornerSquareColor');
    const cornerDotColor = document.getElementById('cornerDotColor');
    const bgColor = document.getElementById('bgColor');
    const bgTransparent = document.getElementById('bgTransparent');

    if (dotColor1) dotColor1.value = this.styleState.dotsColor1;
    if (dotColor2) dotColor2.value = this.styleState.dotsColor2 || this.styleState.dotsColor1;
    if (cornerSquareColor) cornerSquareColor.value = this.styleState.cornersSquareColor;
    if (cornerDotColor) cornerDotColor.value = this.styleState.cornersDotColor;
    if (bgColor) bgColor.value = this.styleState.bgColor === 'transparent' ? '#ffffff' : this.styleState.bgColor;
    if (bgTransparent) bgTransparent.checked = !!this.styleState.bgTransparent;

    // Frame style
    document.querySelectorAll('[data-frame-style]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.frameStyle === (this.styleState.frameStyle || 'none'));
    });
    const frameTextInput = document.getElementById('frameText');
    if (frameTextInput) frameTextInput.value = this.styleState.frameText || '';
    const frameColorInput = document.getElementById('frameColor');
    if (frameColorInput) frameColorInput.value = this.styleState.frameColor || '#6366f1';
  }

  /**
   * Type Tabs Switching (URL, WiFi, VietQR, vCard...)
   */
  bindTypeTabs() {
    const tabs = document.querySelectorAll('.type-tab');
    const formSections = document.querySelectorAll('.type-form-section');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentType = tab.dataset.type;

        formSections.forEach(sec => {
          sec.style.display = sec.dataset.typeSection === this.currentType ? 'block' : 'none';
        });

        this.triggerLiveUpdate();
      });
    });
  }

  /**
   * Accordion Toggle
   */
  bindAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        item.classList.toggle('open');
      });
    });
  }

  /**
   * Style Pickers Bindings
   */
  bindStylePickers() {
    // Dot Shapes
    document.querySelectorAll('[data-dot-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-dot-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styleState.dotsType = btn.dataset.dotType;
        this.triggerLiveUpdate();
      });
    });

    // Corner Square Shapes
    document.querySelectorAll('[data-corner-square-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-corner-square-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styleState.cornersSquareType = btn.dataset.cornerSquareType;
        this.triggerLiveUpdate();
      });
    });

    // Corner Dot Shapes
    document.querySelectorAll('[data-corner-dot-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-corner-dot-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styleState.cornersDotType = btn.dataset.cornerDotType;
        this.triggerLiveUpdate();
      });
    });

    // Frame Styles
    document.querySelectorAll('[data-frame-style]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-frame-style]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.styleState.frameStyle = btn.dataset.frameStyle;
        this.triggerLiveUpdate();
      });
    });

    // Color Pickers
    const bindColor = (id, stateKey) => {
      const input = document.getElementById(id);
      const hexText = document.getElementById(id + 'Hex');
      if (input) {
        input.addEventListener('input', (e) => {
          this.styleState[stateKey] = e.target.value;
          if (hexText) hexText.value = e.target.value.toUpperCase();
          this.triggerLiveUpdate();
        });
      }
      if (hexText) {
        hexText.addEventListener('input', (e) => {
          const val = e.target.value;
          if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            this.styleState[stateKey] = val;
            if (input) input.value = val;
            this.triggerLiveUpdate();
          }
        });
      }
    };

    bindColor('dotColor1', 'dotsColor1');
    bindColor('dotColor2', 'dotsColor2');
    bindColor('cornerSquareColor', 'cornersSquareColor');
    bindColor('cornerDotColor', 'cornersDotColor');
    bindColor('bgColor', 'bgColor');
    bindColor('frameColor', 'frameColor');

    // Gradient Type
    const gradientTypeSelect = document.getElementById('dotsColorType');
    if (gradientTypeSelect) {
      gradientTypeSelect.addEventListener('change', (e) => {
        this.styleState.dotsColorType = e.target.value;
        const color2Wrapper = document.getElementById('dotColor2Row');
        if (color2Wrapper) {
          color2Wrapper.style.display = e.target.value === 'single' ? 'none' : 'flex';
        }
        this.triggerLiveUpdate();
      });
    }

    // Transparent Background Checkbox
    const bgTransparent = document.getElementById('bgTransparent');
    if (bgTransparent) {
      bgTransparent.addEventListener('change', (e) => {
        this.styleState.bgTransparent = e.target.checked;
        this.triggerLiveUpdate();
      });
    }

    // Frame Text
    const frameText = document.getElementById('frameText');
    if (frameText) {
      frameText.addEventListener('input', (e) => {
        this.styleState.frameText = e.target.value;
        this.triggerLiveUpdate();
      });
    }

    // Error correction select
    const ecSelect = document.getElementById('errorCorrectionLevel');
    if (ecSelect) {
      ecSelect.addEventListener('change', (e) => {
        this.styleState.errorCorrectionLevel = e.target.value;
        this.triggerLiveUpdate();
      });
    }
  }

  /**
   * Logo Upload & Preset Icons
   */
  bindLogoUpload() {
    const fileInput = document.getElementById('logoFileInput');
    const uploadBox = document.getElementById('logoUploadBox');
    const removeBtn = document.getElementById('removeLogoBtn');
    const logoSizeRange = document.getElementById('logoSizeRange');
    const logoMarginRange = document.getElementById('logoMarginRange');

    if (uploadBox && fileInput) {
      uploadBox.addEventListener('click', () => fileInput.click());

      uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
      });

      uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('drag-over'));

      uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleLogoFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleLogoFile(e.target.files[0]);
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.styleState.logo = '';
        if (fileInput) fileInput.value = '';
        if (uploadBox) {
          uploadBox.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 0.4rem; color: var(--primary-light);"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <div style="font-size: 0.8rem; font-weight: 600;">Kéo & Thả hoặc Bấm chọn ảnh Logo</div>
            <div style="font-size: 0.7rem; color: var(--text-subtle);">PNG, SVG, JPG (Tối đa 2MB)</div>
          `;
        }
        removeBtn.style.display = 'none';
        this.triggerLiveUpdate();
        this.showToast('Đã gỡ bỏ logo trung tâm', 'info');
      });
    }

    // Logo Sliders
    if (logoSizeRange) {
      logoSizeRange.addEventListener('input', (e) => {
        this.styleState.logoSize = parseInt(e.target.value, 10);
        document.getElementById('logoSizeValue').textContent = `${this.styleState.logoSize}%`;
        this.triggerLiveUpdate();
      });
    }

    if (logoMarginRange) {
      logoMarginRange.addEventListener('input', (e) => {
        this.styleState.logoMargin = parseInt(e.target.value, 10);
        document.getElementById('logoMarginValue').textContent = `${this.styleState.logoMargin}px`;
        this.triggerLiveUpdate();
      });
    }

    // Built-in Logo preset buttons
    document.querySelectorAll('[data-logo-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.dataset.logoSrc;
        this.styleState.logo = src;
        if (removeBtn) removeBtn.style.display = 'inline-flex';
        this.triggerLiveUpdate();
        this.showToast('Đã chọn biểu tượng trung tâm', 'success');
      });
    });
  }

  handleLogoFile(file) {
    if (!file.type.startsWith('image/')) {
      this.showToast('Vui lòng chọn tệp hình ảnh hợp lệ', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.styleState.logo = e.target.result;
      const uploadBox = document.getElementById('logoUploadBox');
      const removeBtn = document.getElementById('removeLogoBtn');
      if (uploadBox) {
        uploadBox.innerHTML = `
          <img src="${e.target.result}" style="max-height: 48px; max-width: 48px; object-fit: contain; border-radius: 6px; margin-bottom: 0.25rem;">
          <div style="font-size: 0.75rem; color: var(--emerald); font-weight: 600;">✓ Logo đã tải lên: ${file.name}</div>
        `;
      }
      if (removeBtn) removeBtn.style.display = 'inline-flex';
      this.triggerLiveUpdate();
      this.showToast('Đã nạp logo thành công!', 'success');
    };
    reader.readAsDataURL(file);
  }

  /**
   * Action buttons (Downloads, Copy, Fullscreen)
   */
  bindActionButtons() {
    const resSelect = document.getElementById('exportResolution');

    // PNG Download
    const btnDownloadPNG = document.getElementById('btnDownloadPNG');
    if (btnDownloadPNG) {
      btnDownloadPNG.addEventListener('click', async () => {
        try {
          const res = parseInt(resSelect?.value || '1024', 10);
          btnDownloadPNG.disabled = true;
          await Exporter.downloadPNG(this.qrEngine, res, `phongdang-qr-${this.currentType}-${Date.now()}.png`);
          this.autoSaveToHistory();
          this.showToast(`Đã xuất file PNG (${res}x${res}px) thành công!`, 'success');
        } catch (err) {
          this.showToast('Lỗi xuất file PNG: ' + err.message, 'error');
        } finally {
          btnDownloadPNG.disabled = false;
        }
      });
    }

    // SVG Download
    const btnDownloadSVG = document.getElementById('btnDownloadSVG');
    if (btnDownloadSVG) {
      btnDownloadSVG.addEventListener('click', async () => {
        try {
          btnDownloadSVG.disabled = true;
          await Exporter.downloadSVG(this.qrEngine, `phongdang-qr-${this.currentType}.svg`);
          this.autoSaveToHistory();
          this.showToast('Đã xuất file vector SVG thành công!', 'success');
        } catch (err) {
          this.showToast('Lỗi xuất file SVG: ' + err.message, 'error');
        } finally {
          btnDownloadSVG.disabled = false;
        }
      });
    }

    // WEBP Download
    const btnDownloadWEBP = document.getElementById('btnDownloadWEBP');
    if (btnDownloadWEBP) {
      btnDownloadWEBP.addEventListener('click', async () => {
        try {
          const res = parseInt(resSelect?.value || '1024', 10);
          btnDownloadWEBP.disabled = true;
          await Exporter.downloadWEBP(this.qrEngine, res, `phongdang-qr-${this.currentType}.webp`);
          this.autoSaveToHistory();
          this.showToast('Đã xuất file WEBP thành công!', 'success');
        } catch (err) {
          this.showToast('Lỗi xuất file WEBP: ' + err.message, 'error');
        } finally {
          btnDownloadWEBP.disabled = false;
        }
      });
    }

    // PDF Card Download
    const btnDownloadPDF = document.getElementById('btnDownloadPDF');
    if (btnDownloadPDF) {
      btnDownloadPDF.addEventListener('click', async () => {
        try {
          btnDownloadPDF.disabled = true;
          const meta = {
            title: this.getPayloadTitle(),
            typeLabel: this.getTypeLabel(this.currentType)
          };
          await Exporter.downloadPDF(this.qrEngine, meta, `phongdang-qr-card-${this.currentType}.pdf`);
          this.autoSaveToHistory();
          this.showToast('Đã xuất thẻ in PDF thành công!', 'success');
        } catch (err) {
          this.showToast('Lỗi xuất file PDF: ' + err.message, 'error');
        } finally {
          btnDownloadPDF.disabled = false;
        }
      });
    }

    // Copy Image to Clipboard
    const btnCopyImage = document.getElementById('btnCopyImage');
    if (btnCopyImage) {
      btnCopyImage.addEventListener('click', async () => {
        try {
          btnCopyImage.disabled = true;
          await Exporter.copyToClipboard(this.qrEngine);
          this.autoSaveToHistory();
          this.showToast('Đã sao chép ảnh QR vào bộ nhớ tạm (Clipboard)! Dán trực tiếp vào Word/Canva/Zalo.', 'success');
        } catch (err) {
          this.showToast('Không thể sao chép ảnh: ' + err.message, 'error');
        } finally {
          btnCopyImage.disabled = false;
        }
      });
    }
  }

  /**
   * Preview Toolbar (Background modes, Laser Beam toggle, Theme toggle)
   */
  bindPreviewToolbar() {
    const stage = document.getElementById('previewStage');
    const scanBeam = document.getElementById('scanBeam');
    const btnToggleBeam = document.getElementById('btnToggleBeam');
    const btnBgMode = document.getElementById('btnBgMode');

    // Laser Beam Toggle
    if (btnToggleBeam && scanBeam) {
      btnToggleBeam.addEventListener('click', () => {
        const isActive = scanBeam.classList.toggle('active');
        btnToggleBeam.classList.toggle('active', isActive);
        this.showToast(isActive ? 'Đã bật hiệu ứng quét Laser' : 'Đã tắt hiệu ứng Laser', 'info');
      });
    }

    // Background Mode Toggle (Dark / White / Checkerboard)
    let bgStateIndex = 0;
    const bgClasses = ['', 'bg-white', 'bg-checkerboard'];
    if (btnBgMode && stage) {
      btnBgMode.addEventListener('click', () => {
        bgStateIndex = (bgStateIndex + 1) % bgClasses.length;
        stage.className = `preview-stage-container ${bgClasses[bgStateIndex]}`;
      });
    }

    // Theme Switch
    const themeBtn = document.getElementById('btnThemeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('phongdang_theme', newTheme);
        this.showToast(`Chế độ giao diện: ${newTheme === 'dark' ? 'Tối' : 'Sáng'}`, 'info');
      });
    }
  }

  /**
   * LocalStorage History Controls & List Rendering
   */
  bindHistoryControls() {
    const btnExportJSON = document.getElementById('btnExportHistoryJSON');
    const btnImportJSON = document.getElementById('btnImportHistoryJSON');
    const fileImportInput = document.getElementById('historyImportFile');
    const btnClearHistory = document.getElementById('btnClearHistory');
    const searchInput = document.getElementById('historySearch');

    if (btnExportJSON) {
      btnExportJSON.addEventListener('click', () => {
        StorageManager.exportJSON();
        this.showToast('Đã xuất sao lưu lịch sử JSON', 'success');
      });
    }

    if (btnImportJSON && fileImportInput) {
      btnImportJSON.addEventListener('click', () => fileImportInput.click());
      fileImportInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            if (StorageManager.importJSON(evt.target.result)) {
              this.renderHistoryList();
              this.showToast('Đã khôi phục dữ liệu lịch sử thành công!', 'success');
            } else {
              this.showToast('Tệp JSON không đúng định dạng', 'error');
            }
          };
          reader.readAsText(e.target.files[0]);
        }
      });
    }

    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn dọn sạch lịch sử (giữ lại các mã có gắn sao ⭐)?')) {
          StorageManager.clear(false);
          this.renderHistoryList();
          this.showToast('Đã làm sạch danh sách lịch sử', 'info');
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderHistoryList(e.target.value.trim().toLowerCase());
      });
    }
  }

  /**
   * Render History List in Sidebar/Card
   */
  renderHistoryList(query = '') {
    const listContainer = document.getElementById('historyList');
    if (!listContainer) return;

    let items = StorageManager.getAll();
    if (query) {
      items = items.filter(item => 
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.type && item.type.toLowerCase().includes(query))
      );
    }

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--text-subtle); font-size: 0.8rem;">
          ${query ? 'Không tìm thấy kết quả phù hợp' : 'Chưa có mã nào được lưu trong lịch sử.'}
        </div>
      `;
      return;
    }

    listContainer.innerHTML = items.map(item => `
      <div class="history-item" data-id="${item.id}">
        <div class="history-item-left" title="Bấm để khôi phục cấu hình này">
          <div class="history-thumb">
            ${item.thumbnail ? `<img src="${item.thumbnail}">` : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`}
          </div>
          <div class="history-meta">
            <div class="history-title">${item.title || 'Mã QR'}</div>
            <div class="history-time">${new Date(item.createdAt).toLocaleDateString('vi-VN')} • ${this.getTypeLabel(item.type)}</div>
          </div>
        </div>
        <div class="history-actions">
          <button class="btn btn-ghost btn-sm btn-star" title="Gắn sao yêu thích" data-action="star">
            ${item.isStarred ? '⭐' : '☆'}
          </button>
          <button class="btn btn-ghost btn-sm btn-delete" title="Xóa" data-action="delete" style="color: var(--rose);">
            ✕
          </button>
        </div>
      </div>
    `).join('');

    // Bind item click to restore
    listContainer.querySelectorAll('.history-item').forEach(el => {
      const id = el.dataset.id;
      const item = items.find(i => i.id === id);

      el.querySelector('.history-item-left').addEventListener('click', () => {
        if (item) this.restoreHistoryItem(item);
      });

      el.querySelector('[data-action="star"]').addEventListener('click', (e) => {
        e.stopPropagation();
        StorageManager.toggleStar(id);
        this.renderHistoryList(query);
      });

      el.querySelector('[data-action="delete"]').addEventListener('click', (e) => {
        e.stopPropagation();
        StorageManager.delete(id);
        this.renderHistoryList(query);
        this.showToast('Đã xóa mục khỏi lịch sử', 'info');
      });
    });
  }

  /**
   * Restore a historical QR configuration
   */
  restoreHistoryItem(item) {
    if (!item) return;

    // Switch tab
    const tab = document.querySelector(`.type-tab[data-type="${item.type}"]`);
    if (tab) tab.click();

    // Populate inputs
    this.populateInputsForType(item.type, item.data);

    // Populate style
    if (item.styleConfig) {
      this.styleState = { ...this.styleState, ...item.styleConfig };
      this.syncDOMWithStyleState();
    }

    this.triggerLiveUpdate();
    this.showToast(`Đã khôi phục: ${item.title}`, 'success');
  }

  populateInputsForType(type, data) {
    if (!data) return;
    if (type === 'url') {
      const el = document.getElementById('inputUrl');
      if (el) el.value = data.url || '';
    } else if (type === 'text') {
      const el = document.getElementById('inputText');
      if (el) el.value = data.text || '';
    } else if (type === 'wifi') {
      if (document.getElementById('wifiSsid')) document.getElementById('wifiSsid').value = data.ssid || '';
      if (document.getElementById('wifiPassword')) document.getElementById('wifiPassword').value = data.password || '';
      if (document.getElementById('wifiEncryption')) document.getElementById('wifiEncryption').value = data.encryption || 'WPA';
      if (document.getElementById('wifiHidden')) document.getElementById('wifiHidden').checked = !!data.hidden;
    } else if (type === 'vietqr') {
      if (document.getElementById('vietqrBank')) document.getElementById('vietqrBank').value = data.bankBin || '970422';
      if (document.getElementById('vietqrAccountNo')) document.getElementById('vietqrAccountNo').value = data.accountNo || '';
      if (document.getElementById('vietqrAccountName')) document.getElementById('vietqrAccountName').value = data.accountName || '';
      if (document.getElementById('vietqrAmount')) document.getElementById('vietqrAmount').value = data.amount || '';
      if (document.getElementById('vietqrMemo')) document.getElementById('vietqrMemo').value = data.memo || '';
    } else if (type === 'vcard') {
      if (document.getElementById('vcardName')) document.getElementById('vcardName').value = data.fullName || '';
      if (document.getElementById('vcardOrg')) document.getElementById('vcardOrg').value = data.org || '';
      if (document.getElementById('vcardPhone')) document.getElementById('vcardPhone').value = data.phone || '';
      if (document.getElementById('vcardEmail')) document.getElementById('vcardEmail').value = data.email || '';
      if (document.getElementById('vcardUrl')) document.getElementById('vcardUrl').value = data.url || '';
      if (document.getElementById('vcardAddress')) document.getElementById('vcardAddress').value = data.address || '';
    }
  }

  /**
   * Auto save to history on export/copy
   */
  async autoSaveToHistory() {
    try {
      const canvas = await this.qrEngine.renderHighResComposite(120);
      const thumbnail = canvas ? canvas.toDataURL('image/png') : '';
      const formData = this.getFormDataForType(this.currentType);

      StorageManager.save({
        title: this.getPayloadTitle(),
        type: this.currentType,
        data: formData,
        styleConfig: this.styleState,
        thumbnail
      });

      this.renderHistoryList();
    } catch (err) {
      console.warn('Auto save history error:', err);
    }
  }

  /**
   * Form inputs change listeners
   */
  bindInputsReactivity() {
    document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      input.addEventListener('input', () => this.triggerLiveUpdate());
      input.addEventListener('change', () => this.triggerLiveUpdate());
    });
  }

  /**
   * Trigger live preview re-rendering with debounce
   */
  triggerLiveUpdate() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      const payload = this.generatePayload();
      const config = {
        ...this.styleState,
        data: payload
      };
      await this.qrEngine.update(config);
    }, 80);
  }

  /**
   * Generate payload string based on current tab inputs
   */
  generatePayload() {
    const data = this.getFormDataForType(this.currentType);
    const builder = ContentBuilders[this.currentType];
    return builder ? builder(data) : 'https://qr.phongdang.io.vn';
  }

  getFormDataForType(type) {
    if (type === 'url') {
      return { url: document.getElementById('inputUrl')?.value || '' };
    }
    if (type === 'text') {
      return { text: document.getElementById('inputText')?.value || '' };
    }
    if (type === 'wifi') {
      return {
        ssid: document.getElementById('wifiSsid')?.value || '',
        password: document.getElementById('wifiPassword')?.value || '',
        encryption: document.getElementById('wifiEncryption')?.value || 'WPA',
        hidden: document.getElementById('wifiHidden')?.checked || false
      };
    }
    if (type === 'vietqr') {
      return {
        bankBin: document.getElementById('vietqrBank')?.value || '970422',
        accountNo: document.getElementById('vietqrAccountNo')?.value || '',
        accountName: document.getElementById('vietqrAccountName')?.value || '',
        amount: document.getElementById('vietqrAmount')?.value || '',
        memo: document.getElementById('vietqrMemo')?.value || ''
      };
    }
    if (type === 'vcard') {
      return {
        fullName: document.getElementById('vcardName')?.value || '',
        org: document.getElementById('vcardOrg')?.value || '',
        title: document.getElementById('vcardTitle')?.value || '',
        phone: document.getElementById('vcardPhone')?.value || '',
        email: document.getElementById('vcardEmail')?.value || '',
        url: document.getElementById('vcardUrl')?.value || '',
        address: document.getElementById('vcardAddress')?.value || '',
        note: document.getElementById('vcardNote')?.value || ''
      };
    }
    if (type === 'email') {
      return {
        email: document.getElementById('emailAddress')?.value || '',
        subject: document.getElementById('emailSubject')?.value || '',
        body: document.getElementById('emailBody')?.value || ''
      };
    }
    if (type === 'phone') {
      return { phone: document.getElementById('phoneTel')?.value || '' };
    }
    if (type === 'sms') {
      return {
        phone: document.getElementById('smsPhone')?.value || '',
        message: document.getElementById('smsMessage')?.value || ''
      };
    }
    if (type === 'location') {
      return {
        lat: document.getElementById('locLat')?.value || '10.7769',
        lng: document.getElementById('locLng')?.value || '106.7009',
        query: document.getElementById('locQuery')?.value || ''
      };
    }
    if (type === 'event') {
      return {
        title: document.getElementById('eventTitle')?.value || '',
        location: document.getElementById('eventLocation')?.value || '',
        description: document.getElementById('eventDescription')?.value || '',
        start: document.getElementById('eventStart')?.value || '',
        end: document.getElementById('eventEnd')?.value || ''
      };
    }
    return {};
  }

  getPayloadTitle() {
    const data = this.getFormDataForType(this.currentType);
    if (this.currentType === 'url') return data.url || 'Liên kết Web';
    if (this.currentType === 'wifi') return `WiFi: ${data.ssid || 'Mạng không dây'}`;
    if (this.currentType === 'vietqr') return `VietQR: ${data.accountNo || 'Tài khoản'}`;
    if (this.currentType === 'vcard') return `Danh thiếp: ${data.fullName || 'Liên hệ'}`;
    if (this.currentType === 'email') return `Email: ${data.email || 'Thư điện tử'}`;
    if (this.currentType === 'phone') return `SĐT: ${data.phone || 'Cuộc gọi'}`;
    if (this.currentType === 'sms') return `SMS: ${data.phone || 'Tin nhắn'}`;
    return 'Mã QR Studio';
  }

  getTypeLabel(type) {
    const labels = {
      url: 'Liên kết Web',
      text: 'Văn bản',
      wifi: 'Mạng WiFi',
      vietqr: 'VietQR Ngân hàng',
      vcard: 'Danh thiếp vCard',
      email: 'Email',
      phone: 'Điện thoại',
      sms: 'Tin nhắn SMS',
      location: 'Vị trí bản đồ',
      event: 'Lịch sự kiện'
    };
    return labels[type] || 'Mã QR';
  }

  /**
   * Toast notification helper
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    if (type === 'success') {
      icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    }

    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}
