/**
 * ============================================================================
 * KIRAN HIRALAL POPAT - DIGITAL BUSINESS CARD & PORTFOLIO ENGINE
 * "Insurance Under One Roof" • 19 Years of Experience
 * Section-Wise Architecture (Inspired by Manasi Polyclinic Functionality)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Central Profile Configuration
  // --------------------------------------------------------------------------
  const CONFIG = {
    advisorName: "Kiran Hiralal Popat",
    brandTitle: "Insurance Under One Roof",
    professionalLabel: "Insurance Expert",
    experienceYears: "19 Years of Experience",
    phoneDisplay: "+91 98200 59982",
    phoneClean: "9820059982",
    phoneInternational: "+919820059982",
    whatsappClean: "919820059982",
    email: "kiranp111@yahoo.in",
    
    // Facebook Profile URL (Configurable)
    facebookUrl: "https://www.facebook.com/kiran.popat.insurance",
    
    // Default production / deployed URL (Used when previewing on localhost or file://)
    productionUrl: "https://kiranpopat.github.io/portfolio/",
    
    // Resolve current active URL (Detects GitHub Pages / custom domain automatically)
    getActiveUrl: function() {
      if (window.location.protocol.startsWith('http') && 
          !window.location.hostname.includes('localhost') && 
          !window.location.hostname.includes('127.0.0.1')) {
        return window.location.origin + window.location.pathname;
      }
      return this.productionUrl;
    }
  };

  const activeUrl = CONFIG.getActiveUrl();

  // --------------------------------------------------------------------------
  // 2. Configure Dynamic Links & Meta Data
  // --------------------------------------------------------------------------
  // Facebook links
  const headerFbBtn = document.getElementById('headerFacebookBtn');
  if (headerFbBtn) headerFbBtn.href = CONFIG.facebookUrl;

  // Display URL elements
  const displayProfileUrl = document.getElementById('displayProfileUrl');
  const modalCopyUrlInput = document.getElementById('modalCopyUrlInput');
  if (displayProfileUrl) displayProfileUrl.textContent = activeUrl;
  if (modalCopyUrlInput) modalCopyUrlInput.value = activeUrl;

  // --------------------------------------------------------------------------
  // 3. Section-Wise Tab Navigation (Manasi Polyclinic Pattern)
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetId) {
    // Deactivate all tabs and panels
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Activate selected tab button
    const matchingBtn = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
    if (matchingBtn) {
      matchingBtn.classList.add('active');
      // Smoothly bring the active tab pill into view in the horizontal navigation strip
      try {
        matchingBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch (e) {}
    }

    // Activate selected panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  // Bind tab click events (NO automatic scrolling, user retains natural control)
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      switchTab(targetId);
    });
  });

  // Bottom action bar "QR" button jumps to the QR Tab
  const bottomShareBtn = document.getElementById('bottomShareBtn');
  if (bottomShareBtn) {
    bottomShareBtn.addEventListener('click', () => {
      switchTab('tab-qr');
    });
  }

  // --------------------------------------------------------------------------
  // 4. Dynamic QR Code Generation (High Quality, Scannable on iOS & Android)
  // --------------------------------------------------------------------------
  const qrContainer = document.getElementById('qrCodeContainer');

  function generateQRCode() {
    if (typeof QRCode === 'undefined' || !qrContainer) {
      console.warn('QRCode library not ready.');
      return;
    }

    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: activeUrl,
      width: 190,
      height: 190,
      colorDark: "#0a192f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // Generate QR Code on initial load
  generateQRCode();

  // --------------------------------------------------------------------------
  // 5. Download QR Code Action (Export as High-Resolution Branded PNG)
  // --------------------------------------------------------------------------
  function downloadQRCodeImage() {
    const canvas = qrContainer ? qrContainer.querySelector('canvas') : null;

    if (canvas) {
      const exportCanvas = document.createElement('canvas');
      const exportSize = 600;
      exportCanvas.width = exportSize;
      exportCanvas.height = exportSize + 120;
      const ctx = exportCanvas.getContext('2d');

      // 1. Rich Navy background
      ctx.fillStyle = '#0a192f';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // 2. Outer Gold border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, exportCanvas.width - 24, exportCanvas.height - 24);

      // 3. Header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(CONFIG.advisorName, exportSize / 2, 50);

      ctx.fillStyle = '#d4af37';
      ctx.font = '600 18px sans-serif';
      ctx.fillText(`${CONFIG.brandTitle} • Insurance Expert`, exportSize / 2, 80);

      // 4. White card backing for QR
      const qrBoxSize = 420;
      const qrBoxX = (exportSize - qrBoxSize) / 2;
      const qrBoxY = 100;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 16);
      ctx.fill();

      // 5. Draw QR code
      ctx.drawImage(canvas, qrBoxX + 20, qrBoxY + 20, qrBoxSize - 40, qrBoxSize - 40);

      // 6. Footer branding
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 16px serif';
      ctx.fillText('"Your Sachha Advisor" • Mob: +91 9820059982', exportSize / 2, 560);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('Scan with any Smartphone Camera to Save Contact', exportSize / 2, 595);

      // Trigger download
      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Kiran_Hiralal_Popat_Insurance_QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('QR Code downloaded successfully!');
    } else {
      const img = qrContainer ? qrContainer.querySelector('img') : null;
      if (img && img.src) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'Kiran_Popat_QR.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('QR Code downloaded!');
      } else {
        showToast('Unable to export QR code at this moment.');
      }
    }
  }

  const btnDownloadQr = document.getElementById('btnDownloadQrCode');
  if (btnDownloadQr) btnDownloadQr.addEventListener('click', downloadQRCodeImage);

  // --------------------------------------------------------------------------
  // 5B. Download Complete Digital Visiting Card Image (.jpg)
  // --------------------------------------------------------------------------
  async function downloadVisitingCardImage(e) {
    if (e && e.preventDefault) e.preventDefault();
    const cardPath = 'assets/visiting-card.jpg';
    const fileName = 'Kiran_Hiralal_Popat_Visiting_Card.jpg';

    try {
      const response = await fetch(cardPath);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 1500);

      showToast('Visiting Card downloaded successfully!');
    } catch (err) {
      const link = document.createElement('a');
      link.href = cardPath;
      link.download = fileName;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Visiting Card downloaded!');
    }
  }

  // Bind all Visiting Card triggers
  const heroDownloadCardBtn = document.getElementById('heroDownloadCardBtn');
  const btnDownloadVisitingCard = document.getElementById('btnDownloadVisitingCard');
  const modalSaveToGallery = document.getElementById('modalSaveToGallery');

  if (heroDownloadCardBtn) heroDownloadCardBtn.addEventListener('click', downloadVisitingCardImage);
  if (btnDownloadVisitingCard) btnDownloadVisitingCard.addEventListener('click', downloadVisitingCardImage);
  if (modalSaveToGallery) {
    modalSaveToGallery.addEventListener('click', () => {
      closeShareModalPopup();
      downloadVisitingCardImage();
    });
  }

  // --------------------------------------------------------------------------
  // 6. Save Contact (.vcf vCard 3.0) Functionality
  // --------------------------------------------------------------------------
  function downloadVCard() {
    const photoUrl = (activeUrl.endsWith('/') ? activeUrl : activeUrl + '/') + 'assets/profile.jpg';
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Popat;Kiran;Hiralal;;',
      `FN:${CONFIG.advisorName}`,
      `ORG:${CONFIG.brandTitle}`,
      `TITLE:${CONFIG.professionalLabel} (${CONFIG.experienceYears})`,
      `TEL;TYPE=CELL,VOICE,PREF:${CONFIG.phoneInternational}`,
      `EMAIL;TYPE=INTERNET,WORK:${CONFIG.email}`,
      `URL;TYPE=WORK:${activeUrl}`,
      `PHOTO;VALUE=URI:${photoUrl}`,
      `X-SOCIALPROFILE;TYPE=facebook:${CONFIG.facebookUrl}`,
      'NOTE:Insurance Under One Roof - 19 Years of Experience in Life Insurance, Health Insurance & General Insurance. Your Sachha Advisor. Phone: +91 9820059982',
      'END:VCARD'
    ];

    const vCardContent = vCardLines.join('\r\n');
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.setAttribute('download', 'Kiran_Hiralal_Popat.vcf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    showToast('Contact file downloaded! Tap to save in your phonebook.');
  }

  // Bind all Save Contact triggers
  const heroSaveBtn = document.getElementById('heroSaveContactBtn');
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');

  if (heroSaveBtn) heroSaveBtn.addEventListener('click', downloadVCard);
  if (bottomSaveBtn) bottomSaveBtn.addEventListener('click', downloadVCard);

  // --------------------------------------------------------------------------
  // 7. Copy Profile Link to Clipboard
  // --------------------------------------------------------------------------
  function copyProfileUrl() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(activeUrl)
        .then(() => {
          showToast('Profile link copied to clipboard!');
        })
        .catch(() => {
          fallbackClipboardCopy(activeUrl);
        });
    } else {
      fallbackClipboardCopy(activeUrl);
    }
  }

  function fallbackClipboardCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Profile link copied to clipboard!');
    } catch (err) {
      showToast('Could not copy link. Please copy manually.');
    }
    document.body.removeChild(tempInput);
  }

  const btnCopyProfileUrl = document.getElementById('btnCopyProfileUrl');
  const btnModalCopyLink = document.getElementById('btnModalCopyLink');
  if (btnCopyProfileUrl) btnCopyProfileUrl.addEventListener('click', copyProfileUrl);
  if (btnModalCopyLink) btnModalCopyLink.addEventListener('click', copyProfileUrl);

  // --------------------------------------------------------------------------
  // 8. Share Profile Modal Handlers
  // --------------------------------------------------------------------------
  const shareModal = document.getElementById('shareModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const btnShareModalTrigger = document.getElementById('btnShareModalTrigger');

  function openShareModal() {
    if (shareModal) {
      shareModal.classList.add('open');
      shareModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeShareModalPopup() {
    if (shareModal) {
      shareModal.classList.remove('open');
      shareModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnShareModalTrigger) btnShareModalTrigger.addEventListener('click', openShareModal);
  if (closeShareModal) closeShareModal.addEventListener('click', closeShareModalPopup);
  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModalPopup();
    });
  }

  // Share Channels
  const modalShareWhatsapp = document.getElementById('modalShareWhatsapp');
  if (modalShareWhatsapp) {
    modalShareWhatsapp.addEventListener('click', () => {
      const msg = encodeURIComponent(
        `*🛡️ Kiran Hiralal Popat - Insurance Expert*\n` +
        `*${CONFIG.brandTitle}*\n\n` +
        `_"Your Sachha Advisor" for Life, Health & General Insurance._\n\n` +
        `👉 *Tap to view Digital Card & Save Contact:*\n${activeUrl}`
      );
      window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
      closeShareModalPopup();
    });
  }

  const modalShareEmail = document.getElementById('modalShareEmail');
  if (modalShareEmail) {
    modalShareEmail.addEventListener('click', () => {
      const subject = encodeURIComponent(`${CONFIG.advisorName} - Insurance Expert Digital Card`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease find the digital card and insurance profile for Kiran Hiralal Popat (Insurance Under One Roof - Insurance Expert):\n\n${activeUrl}\n\nPhone: ${CONFIG.phoneDisplay}\nEmail: ${CONFIG.email}\n"Your Sachha Advisor"`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      closeShareModalPopup();
    });
  }

  const modalShareSms = document.getElementById('modalShareSms');
  if (modalShareSms) {
    modalShareSms.addEventListener('click', () => {
      const text = encodeURIComponent(
        `Kiran Hiralal Popat - Insurance Expert. Life, Health & General Insurance. View digital card & save contact: ${activeUrl}`
      );
      window.location.href = `sms:?body=${text}`;
      closeShareModalPopup();
    });
  }

  const modalShareNative = document.getElementById('modalShareNative');
  if (modalShareNative) {
    modalShareNative.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: CONFIG.advisorName,
          text: `Insurance Under One Roof - Kiran Popat: ${activeUrl}`,
          url: activeUrl
        }).catch(() => {});
      } else {
        copyProfileUrl();
      }
      closeShareModalPopup();
    });
  }

  // --------------------------------------------------------------------------
  // 9. Direct WhatsApp Profile Forwarder Form
  // --------------------------------------------------------------------------
  const directWhatsAppShareForm = document.getElementById('directWhatsAppShareForm');
  if (directWhatsAppShareForm) {
    directWhatsAppShareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('forwardMobileNumber');
      const cleanNum = input.value.replace(/[^0-9]/g, '');

      if (cleanNum.length === 10) {
        const targetNumber = '91' + cleanNum;
        const msg = encodeURIComponent(
          `*🛡️ Kiran Hiralal Popat - Insurance Expert*\n` +
          `*${CONFIG.brandTitle}*\n\n` +
          `_"Money when you are there. Money when you are not there. Money when you need it."_\n` +
          `*Your Sachha Advisor*\n\n` +
          `📋 *Services Under One Roof:*\n` +
          `• Pure Term & Life Insurance\n` +
          `• Tax Saving & Child Financial Planning\n` +
          `• Health & Senior Citizen Medical Floater\n` +
          `• Motor (Car & Two-Wheeler) Insurance\n\n` +
          `📞 *Contact:* ${CONFIG.phoneDisplay}\n` +
          `📧 *Email:* ${CONFIG.email}\n\n` +
          `👉 *Tap link to view Digital Card & Save Contact:*\n` +
          `${activeUrl}`
        );
        window.open(`https://wa.me/${targetNumber}?text=${msg}`, '_blank');
        input.value = '';
        showToast('Opening WhatsApp to send digital profile...');
      } else {
        alert('Please enter a valid 10-digit mobile number.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Theme Toggle (Lighter Theme by default with optional Dark Mode)
  // --------------------------------------------------------------------------
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleText = document.getElementById('themeToggleText');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleIcon) themeToggleIcon.className = 'ri-sun-line';
      if (themeToggleText) themeToggleText.textContent = 'Light Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0a192f');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleIcon) themeToggleIcon.className = 'ri-moon-line';
      if (themeToggleText) themeToggleText.textContent = 'Dark Mode';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#f8fafc');
    }
  }

  const savedTheme = localStorage.getItem('kiran_insurance_theme') || 'light';
  applyTheme(savedTheme);

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      try {
        localStorage.setItem('kiran_insurance_theme', newTheme);
      } catch (e) {}
      showToast(newTheme === 'dark' ? 'Dark theme activated' : 'Lighter executive theme activated');
    });
  }

  // --------------------------------------------------------------------------
  // 12. Toast Notification Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastMessage');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // --------------------------------------------------------------------------
  // 13. Keyboard Accessibility (Escape key closes modals)
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeShareModalPopup();
    }
  });

  console.log('Kiran Hiralal Popat - Section-wise Digital Card initialized.');
});
