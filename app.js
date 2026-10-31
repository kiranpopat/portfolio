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
    productionUrl: "https://yashpanchal089.github.io/kiranpopat/",
    
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
  const contactFbTile = document.getElementById('contactFacebookTile');
  if (headerFbBtn) headerFbBtn.href = CONFIG.facebookUrl;
  if (contactFbTile) contactFbTile.href = CONFIG.facebookUrl;

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
  // 5B. Download Complete Digital Visiting Card to Image Gallery (.png)
  // --------------------------------------------------------------------------
  async function downloadVisitingCardImage() {
    showToast('Preparing your Visiting Card image...');

    try {
      const cardCanvas = document.createElement('canvas');
      const W = 1200;
      const H = 680;
      cardCanvas.width = W;
      cardCanvas.height = H;
      const ctx = cardCanvas.getContext('2d');

      // 1. Background Gradient (Rich Deep Executive Navy)
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#061325');
      bgGrad.addColorStop(0.5, '#0a192f');
      bgGrad.addColorStop(1, '#0e2444');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle ambient gold glow top left & royal blue center
      const goldAmbient = ctx.createRadialGradient(175, 185, 20, 175, 185, 260);
      goldAmbient.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
      goldAmbient.addColorStop(1, 'transparent');
      ctx.fillStyle = goldAmbient;
      ctx.fillRect(0, 0, W, H);

      const blueAmbient = ctx.createRadialGradient(600, 340, 50, 600, 340, 480);
      blueAmbient.addColorStop(0, 'rgba(29, 78, 216, 0.09)');
      blueAmbient.addColorStop(1, 'transparent');
      ctx.fillStyle = blueAmbient;
      ctx.fillRect(0, 0, W, H);

      // 2. Dual Luxury Borders
      // Outer Gold Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(16, 16, W - 32, H - 32, 24);
      ctx.stroke();

      // Inner hairline border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(26, 26, W - 52, H - 52, 18);
      ctx.stroke();

      // Corner geometric gold brackets
      ctx.fillStyle = '#d4af37';
      const cornerSize = 14;
      ctx.fillRect(24, 24, cornerSize, 2.5);
      ctx.fillRect(24, 24, 2.5, cornerSize);
      ctx.fillRect(W - 24 - cornerSize, 24, cornerSize, 2.5);
      ctx.fillRect(W - 26.5, 24, 2.5, cornerSize);
      ctx.fillRect(24, H - 26.5, cornerSize, 2.5);
      ctx.fillRect(24, H - 24 - cornerSize, 2.5, cornerSize);
      ctx.fillRect(W - 24 - cornerSize, H - 26.5, cornerSize, 2.5);
      ctx.fillRect(W - 26.5, H - 24 - cornerSize, 2.5, cornerSize);

      // 3. Vertical Dividing Lines
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(330, 45);
      ctx.lineTo(330, H - 45);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(860, 45);
      ctx.lineTo(860, H - 45);
      ctx.stroke();

      // ======================================================================
      // LEFT COLUMN: PROFILE PHOTO & ADVISOR BRANDING
      // ======================================================================
      const avatarCenterX = 175;
      const avatarCenterY = 175;
      const avatarRadius = 82;

      // Photo Frame Glow
      ctx.save();
      ctx.shadowColor = 'rgba(212, 175, 55, 0.45)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // Profile Photo
      const profileImgEl = document.getElementById('profilePhoto');
      if (profileImgEl && profileImgEl.complete && profileImgEl.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          profileImgEl,
          avatarCenterX - avatarRadius,
          avatarCenterY - avatarRadius,
          avatarRadius * 2,
          avatarRadius * 2
        );
        ctx.restore();
      } else {
        const pImg = new Image();
        pImg.crossOrigin = 'anonymous';
        pImg.src = 'assets/profile.jpg';
        await new Promise(res => {
          pImg.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(
              pImg,
              avatarCenterX - avatarRadius,
              avatarCenterY - avatarRadius,
              avatarRadius * 2,
              avatarRadius * 2
            );
            ctx.restore();
            res();
          };
          pImg.onerror = () => res();
        });
      }

      // Verified shield seal over bottom-right of avatar
      const sealX = avatarCenterX + 54;
      const sealY = avatarCenterY + 54;
      ctx.fillStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.arc(sealX, sealY, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓', sealX, sealY + 1);

      // Name
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(CONFIG.advisorName, avatarCenterX, 305);

      // Insurance Expert Badge Pill
      ctx.fillStyle = 'rgba(212, 175, 55, 0.18)';
      ctx.beginPath();
      ctx.roundRect(avatarCenterX - 95, 325, 190, 28, 14);
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 13.5px sans-serif';
      ctx.fillText('★ INSURANCE EXPERT ★', avatarCenterX, 344);

      // Brand Title
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 15px sans-serif';
      ctx.fillText(CONFIG.brandTitle, avatarCenterX, 385);

      // Motto
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'italic bold 20px serif';
      ctx.fillText('"Your Sachha Advisor"', avatarCenterX, 440);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px sans-serif';
      ctx.fillText('Honest • Unbiased • Reliable', avatarCenterX, 468);

      ctx.fillStyle = '#60a5fa';
      ctx.font = '600 13px sans-serif';
      ctx.fillText('19 Years of Advisory Experience', avatarCenterX, 502);

      // ======================================================================
      // CENTER COLUMN: SERVICES & ADVISORY FOCUS
      // ======================================================================
      const centerX = 360;

      // Section Title
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('COMPREHENSIVE INSURANCE SERVICES', centerX, 80);

      // Card 1: Life Insurance
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(centerX, 105, 470, 95, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('🛡️ Life Insurance – All Over the World', centerX + 18, 135);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13.5px sans-serif';
      ctx.fillText('• Pure Term Insurance (Family Protection)', centerX + 20, 160);
      ctx.fillText('• Child Education & Marriage • Tax Saving • Retirement Plans', centerX + 20, 182);

      // Card 2: Health Insurance
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(centerX, 215, 470, 95, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(29, 78, 216, 0.45)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('🏥 Health & Medical Insurance', centerX + 18, 245);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13.5px sans-serif';
      ctx.fillText('• Individual & Family Floater • Senior Citizen Healthcare', centerX + 20, 270);
      ctx.fillText('• Super Top-Up • Portability • Critical Illness • Travel Cover', centerX + 20, 292);

      // Card 3: General Insurance
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(centerX, 325, 470, 95, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('🚗 General & Motor Insurance', centerX + 18, 355);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13.5px sans-serif';
      ctx.fillText('• Two-Wheeler & Four-Wheeler Comprehensive Insurance', centerX + 20, 380);
      ctx.fillText('• Zero-Depreciation Cover • Cashless Garages • Instant Claims', centerX + 20, 402);

      // Signature Quote Box
      const quoteBoxY = 445;
      const quoteGrad = ctx.createLinearGradient(centerX, quoteBoxY, centerX + 470, quoteBoxY + 85);
      quoteGrad.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
      quoteGrad.addColorStop(1, 'rgba(29, 78, 216, 0.15)');
      ctx.fillStyle = quoteGrad;
      ctx.beginPath();
      ctx.roundRect(centerX, quoteBoxY, 470, 85, 12);
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic bold 17px serif';
      ctx.textAlign = 'center';
      ctx.fillText('"Doctor saves your life. I save your lifestyle."', centerX + 235, quoteBoxY + 36);
      ctx.fillStyle = '#fde68a';
      ctx.font = 'italic 14px serif';
      ctx.fillText('Money when you are there. Money when you need it.', centerX + 235, quoteBoxY + 62);

      // ======================================================================
      // RIGHT COLUMN: SCANNABLE QR & DIRECT CONTACT CHANNELS
      // ======================================================================
      const rightX = 890;

      // QR Code Card
      const qrBoxX = rightX + 25;
      const qrBoxY = 75;
      const qrBoxW = 210;
      const qrBoxH = 210;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 14);
      ctx.fill();

      // Draw QR Code
      const qrCanvas = qrContainer ? qrContainer.querySelector('canvas') : null;
      if (qrCanvas) {
        ctx.drawImage(qrCanvas, qrBoxX + 10, qrBoxY + 10, qrBoxW - 20, qrBoxH - 20);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 12.5px sans-serif';
      ctx.fillText('Scan to Save Contact & Profile', qrBoxX + qrBoxW / 2, qrBoxY + qrBoxH + 24);

      // Contact Details
      const contactStartY = 350;
      ctx.textAlign = 'left';

      // 1. Phone / WhatsApp
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('CALL / WHATSAPP', rightX + 15, contactStartY);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 21px sans-serif';
      ctx.fillText(CONFIG.phoneDisplay, rightX + 15, contactStartY + 28);

      // 2. Email
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('OFFICIAL EMAIL', rightX + 15, contactStartY + 75);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(CONFIG.email, rightX + 15, contactStartY + 100);

      // 3. Digital Card URL
      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('DIGITAL PORTFOLIO', rightX + 15, contactStartY + 145);

      ctx.fillStyle = '#60a5fa';
      ctx.font = '600 13px monospace';
      ctx.fillText('yashpanchal089.github.io/kiranpopat', rightX + 15, contactStartY + 168);

      // 4. Save Visiting Card badge at bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(rightX + 15, contactStartY + 195, 230, 36, 18);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Digital Visiting Card • Save to Gallery', rightX + 130, contactStartY + 218);

      // 5. Direct Instant Download of Visiting Card (.png)
      const fileName = 'Kiran_Hiralal_Popat_Visiting_Card.png';

      try {
        const dataUrl = cardCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Visiting Card downloaded successfully!');
      } catch (err) {
        cardCanvas.toBlob((blob) => {
          if (!blob) {
            showToast('Unable to export visiting card image.');
            return;
          }
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
        }, 'image/png');
      }

    } catch (err) {
      console.error('Error generating visiting card:', err);
      showToast('Error saving visiting card image.');
    }
  }

  // Bind all Visiting Card triggers
  const heroDownloadCardBtn = document.getElementById('heroDownloadCardBtn');
  const btnDownloadVisitingCard = document.getElementById('btnDownloadVisitingCard');
  const btnDownloadCardSection = document.getElementById('btnDownloadCardSection');
  const modalSaveToGallery = document.getElementById('modalSaveToGallery');

  if (heroDownloadCardBtn) heroDownloadCardBtn.addEventListener('click', downloadVisitingCardImage);
  if (btnDownloadVisitingCard) btnDownloadVisitingCard.addEventListener('click', downloadVisitingCardImage);
  if (btnDownloadCardSection) btnDownloadCardSection.addEventListener('click', downloadVisitingCardImage);
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
  const sectionSaveBtn = document.getElementById('btnDownloadVcardSection');
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');

  if (heroSaveBtn) heroSaveBtn.addEventListener('click', downloadVCard);
  if (sectionSaveBtn) sectionSaveBtn.addEventListener('click', downloadVCard);
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
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleIcon) themeToggleIcon.className = 'ri-sun-line';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0a192f');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleIcon) themeToggleIcon.className = 'ri-moon-line';
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
