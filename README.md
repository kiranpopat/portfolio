# Kiran Hiralal Popat - Digital Business Card & Insurance Portfolio

A modern, mobile-first, high-converting **Digital Business Card & Professional Portfolio Website** designed specifically for **Kiran Hiralal Popat** (Insurance Expert & Advisor • Insurance Under One Roof).

---

## 🌟 Visual Identity & Design Philosophy
- **Colors**: Crisp White/Porcelain (`#ffffff`), Soft Platinum Slate (`#f8fafc`, `#f1f5f9`), Deep Navy Blue (`#0a192f`), Royal Blue (`#1d4ed8`), and Warm Amber Gold Accents (`#b45309`, `#d97706`, `#d4af37`).
- **Default Theme**: Lighter Executive Financial Aesthetic with high contrast, daylight readability, and subtle theme toggle (Light / Dark).
- **Typography**: `Plus Jakarta Sans` for clean modern UI, `Cinzel` for authoritative branding, and `Playfair Display` for quotes and signatures.
- **Aesthetic**: Premium financial consultant & executive digital smart card aesthetic with clean card elevations, warm gold hairline borders, and responsive touch-first design.

---

## 🚀 Key Features

1. **Digital Smart Business Card Hero**:
   - Executive portrait frame with gold pulse glow and verified badge.
   - **Insurance Expert** highlight badges.
   - Prominent Quick Actions: **Call Now**, **WhatsApp**, **Save Contact**, and **Share Profile**.
   - Quick channels: Direct Email, Facebook, and Phone.

2. **Section-Wise Tab Architecture (Inspired by Manasi Polyclinic Functionality)**:
   - **Tab 1: QR**: Instant high-resolution scannable QR code to view profile & download contact, with direct WhatsApp forwarder.
   - **Tab 2: About**: Professional Insurance Expert background, tailored advice, and 3 advisory pillars.
   - **Tab 3: Life**: 5 Life Insurance services with the prominent *"Your Sachha Advisor."* highlight.
   - **Tab 4: Health**: 7 Healthcare policies with *"Doctor saves your life. I save your lifestyle."*
   - **Tab 5: General**: Two-Wheeler & Four-Wheeler vehicle protection plans.
   - **Tab 6: Contact**: Direct phone dialer, WhatsApp, official email, and Facebook.
     7. Travel Insurance (Domestic & Overseas)

5. **General Insurance**:
   - Dedicated vehicle protection section with professional icons:
     1. Two-Wheeler Insurance
     2. Four-Wheeler Insurance (Zero Depreciation & Cashless Network)

6. **Contact Section**:
   - Direct Call: `+91 9820059982`
   - WhatsApp Chat: `9820059982`
   - Email: `kiranp111@yahoo.in`
   - Configurable Facebook link
   - Save Contact (.vcf) button

7. **QR Code Functionality**:
   - Dynamic client-side QR Code generated from the deployed production URL (`https://yashpanchal089.github.io/kiranpopat/`).
   - High-error correction (`Level H`) works reliably on iPhone Camera and Android Google Lens.
   - **Download QR Code**: Generates high-resolution branded PNG image.
   - **Copy Profile Link**: One-click clipboard copy with toast feedback.
   - **Forward Profile via WhatsApp**: Input 10-digit number and forward card directly.

8. **Save Contact (.vcf vCard 3.0)**:
   - Downloads `Kiran_Hiralal_Popat.vcf` with Name, Organization, Phone, Email, and Website URL.
   - Seamlessly compatible with iPhone (iOS Add to Contacts) and Android Contacts app.

9. **Mobile-First UX & Sticky Bottom Bar**:
   - Fixed bottom action bar with Call, WhatsApp, Save Contact, and QR buttons.
   - Section-wise navigation tabs with smooth horizontal swiping.
   - Zero horizontal overflow.
   - Desktop view presents a luxury framed smart card and portfolio container.

---

## 🛠️ Customization Guide

### 1. Profile Photograph
The official photograph is set at `assets/profile.jpg`. If you ever wish to replace it with a new photo in the future, simply replace `assets/profile.jpg` with your updated image.

### 2. Updating Facebook URL or Production Domain
Open `app.js` and edit the `CONFIG` object at the top:
```javascript
const CONFIG = {
  advisorName: "Kiran Hiralal Popat",
  phoneInternational: "+919820059982",
  whatsappClean: "919820059982",
  email: "kiranp111@yahoo.in",
  facebookUrl: "https://www.facebook.com/kiran.popat.insurance", // <-- Update your Facebook URL here
  productionUrl: "https://yashpanchal089.github.io/kiranpopat/",   // <-- Deployed GitHub Pages URL
};
```

---

## 🌐 Deployed on GitHub Pages

- **Repository**: [https://github.com/yashpanchal089/kiranpopat](https://github.com/yashpanchal089/kiranpopat)
- **Live URL**: [https://yashpanchal089.github.io/kiranpopat/](https://yashpanchal089.github.io/kiranpopat/)

### Enabling GitHub Pages:
1. In your GitHub repository: go to **Settings** > **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Choose branch: `main` and folder: `/ (root)`, then click **Save**.
4. GitHub Pages will build and publish your website automatically at [https://yashpanchal089.github.io/kiranpopat/](https://yashpanchal089.github.io/kiranpopat/).

