# Wahid Karak POS — set-up guide

Point of sale and cafeteria management for **Wahid Karak Cafe LLC**, Mina Bazar, Al Fahidi, Dubai.
It is a single web page (`index.html`). **GitHub Pages** hosts the page, and **Firebase** stores the data and handles staff logins.

```
wahid-karak-pos/
├── index.html          the app
├── firebase-config.js  your Firebase keys + owner email  ← you edit this
├── firestore.rules     who can read/write what           ← you edit the owner email
├── firebase.json       only needed if you use the Firebase CLI
├── starter-data.json   starter menu, raw materials and settings to import once
├── manifest.webmanifest, sw.js, icon-*.png   lets phones install it as an app
└── README.md
```

Total time: about 30 minutes. Everything below is free (Firebase "Spark" plan, GitHub free account).

---

## Part 1 — Create the Firebase project (15 min)

1. Go to **https://console.firebase.google.com** and sign in with the owner's Google account.
2. Click **Create a project** and name it `wahid-karak-pos`. You can turn Google Analytics off. Click **Create**.
3. **Turn on logins.** Open **Build → Authentication** and click **Get started**. Under **Sign-in method**, choose **Email/Password**, switch it **on**, and click **Save**.
4. **Create the database.** Open **Build → Firestore Database** and click **Create database**.
   - Location: **me-central1 (Doha)** or **europe-west1**. You can't change this later.
   - Start in **production mode**, then click **Create**.
5. **Paste the security rules.**
   - In Firestore, open the **Rules** tab and delete what is there.
   - Paste the contents of `firestore.rules`.
   - Change `owner@example.com` to the owner's email, **in lowercase**.
   - Click **Publish**.
6. **Get your web keys.**
   - Click the ⚙️ next to *Project overview*, then **Project settings**.
   - Under **Your apps**, click the **`</>`** (Web) icon and name the app `pos`. Leave "Firebase Hosting" unticked and click **Register app**.
   - You'll see a block that starts with `const firebaseConfig = {`.
7. Open `firebase-config.js` in Notepad and copy each value (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`) into the matching line.
8. In the same file, set `window.OWNER_EMAILS = ["your-email@gmail.com"];`. This must be the same email as in the rules. Save the file.

> The Firebase keys in `firebase-config.js` are **not secret**. Every website that uses Firebase shows them. Your data is protected by the rules in step 5, so keep the owner email correct there.

---

## Part 2 — Put the app on GitHub Pages (10 min)

1. Sign in at **https://github.com** (create a free account if needed).
2. Click **+** (top right), then **New repository**.
   - Name: `wahid-karak-pos`. Visibility: **Public**. GitHub Pages needs public on the free plan, and your sales data stays in Firebase, not on GitHub.
   - Click **Create repository**.
3. On the empty repository page, click **uploading an existing file**.
   - Drag in **`index.html`, `firebase-config.js`, `firestore.rules`, `README.md`, `manifest.webmanifest`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`**.
   - Leave **`starter-data.json`** out and keep it on your computer. It holds your menu prices, so keep it private.
   - Click **Commit changes**.
4. Open **Settings → Pages**. Under *Build and deployment*, choose **Source: Deploy from a branch**, **Branch: main**, folder **/(root)**, then **Save**.
5. Wait 1–2 minutes and refresh. The page shows your address, for example:
   `https://YOUR-GITHUB-NAME.github.io/wahid-karak-pos/`
6. **Let Firebase accept logins from that address.** In Firebase, go to **Authentication → Settings → Authorized domains → Add domain** and enter `YOUR-GITHUB-NAME.github.io`. Without this step, sign-in fails.

---

## Part 3 — First login and loading the menu (5 min)

1. Open your GitHub Pages address.
2. Click **New staff? Create account** and sign up with the **owner email** and a strong password. Because the email matches `OWNER_EMAILS`, you go straight in as **Owner**.
3. Go to **Settings → Backup → Restore from file** and choose **`starter-data.json`**, then confirm. This loads 25 menu items, 26 raw materials with recipes, and the shop settings.
   - Already been selling in the Claude version? Instead, open that version, go to **Settings → Save backup file**, and restore that file here. Everything moves across, including bills.
4. Fill in **Settings**: TRN, phone number, owner WhatsApp number, trade licence expiry. Then save.
5. Check **Menu** and **Raw materials** prices, and add your **Suppliers**.

---

## Part 4 — Give access to staff, manager, accountant

1. Send each person the GitHub Pages address.
2. Each person opens it, clicks **New staff? Create account**, and signs up with their own email.
3. They see "Waiting for approval". The owner opens **Settings → Team** and picks a role:

| Role | Can do |
|---|---|
| **Staff** | Sell, kitchen board, open bills, customers/khata, expenses, purchases, wastage, stock count, day close |
| **Manager** | Everything staff can, plus menu, reports, staff list, settings, voids, big discounts |
| **Accountant** | View only: reports, VAT summary, expenses, purchases, day closes. Can print and export CSV. Cannot change anything |
| **Blocked** | Cannot get in, for example someone who has left |

The person's screen opens by itself once a role is set. If a staff member forgets their password, they tap **Forgot password** on the sign-in page.

**Shared counter tablet:** sign in once with a staff account and leave it signed in. Use **Sell → choose cashier** so each bill shows who served it.

---

## Install on phones and tablets

The app installs like a normal app, with its own icon, full screen and no browser bar, and it opens even without internet.
- **Android (Chrome):** open the address, then **⋮ → Install app** (or **Settings → This device → Install as app**).
- **iPhone/iPad (Safari):** open the address, then **Share → Add to Home Screen**.
- For a counter tablet, tick **Settings → This device → Keep the screen on**.

On phones, the cart opens as a sheet from the bottom (tap the orange total bar). Pop-up windows open at the bottom too, where your thumb can reach. The keyboard only opens when you tap a box.

## Printing

- The **Print** buttons open the device's normal print dialog.
- Receipts and Z reports are laid out for **80 mm thermal printers**. Reports, statements and purchase orders print on **A4**.
- **Settings → "Print the receipt automatically after each sale"** opens the print dialog right after payment.
- **Windows PC + USB thermal printer:**
  1. Install the printer's driver.
  2. Set paper size to *80mm × Receipt* in the printer's preferences.
  3. In Chrome's print dialog, choose that printer and set **Margins: None**. Chrome remembers this.
- **Android tablet + Bluetooth printer:** install the **RawBT** app (or your printer's print-service app), then choose it in the print dialog.
- **Kiosk mode (Windows):** start Chrome with `--kiosk-printing` to print with no dialog at all. Ask your IT person to set up the shortcut.

## WhatsApp

WhatsApp buttons open WhatsApp with the message ready to send. This works with WhatsApp Web or Desktop on a PC, and the app on a phone.
- **Receipts:** type the customer's mobile number in the receipt window.
- **Daily summary:** goes to the owner's number from **Settings**, from the **Today** and **Day close** pages.
- **Purchase orders:** go to the supplier's number.
- **Khata reminders:** go to the customer's number.

## Works offline

If the internet drops, keep selling. Bills are saved on the device and upload by themselves when the connection is back, and a red banner shows while you're offline.

## Free-plan limits

The Firebase Spark plan allows **50,000 reads and 20,000 writes per day**. A busy cafeteria with 3–4 devices uses a small part of that. If you ever reach it, switch to the **Blaze** plan in Firebase. Pay-as-you-go at this size usually costs a few dirhams a month.

## Backups

**Settings → Save backup file** downloads everything as one file. Do this once a week and keep the file on Google Drive. The bills for the last two months are included.

## Updating the app later

To install a new version, open your GitHub repository, click **Add file → Upload files**, drag in the changed files, and click **Commit**. Keep your own `firebase-config.js`; don't overwrite it with the blank one. Every device picks it up on the next refresh. Your data in Firebase is not touched.

## Alternative: Firebase Hosting instead of GitHub

Use this if you want a `wahid-karak-pos.web.app` address.
1. Install Node.js and run `npm install -g firebase-tools`.
2. In this folder, run:
   ```
   firebase login
   firebase use --add          (pick your project)
   firebase deploy
   ```
That uploads the app and the security rules together. The `.web.app` domain is already authorised for logins.

## Troubleshooting

| Problem | Fix |
|---|---|
| Banner says **Demo mode** | `firebase-config.js` still has `PASTE_…` values, or it wasn't uploaded |
| Sign-in shows *auth/unauthorized-domain* | Do Part 2, step 6 |
| "Email sign-in is not turned on" | Do Part 1, step 3 |
| Owner sees "Waiting for approval" | The owner email in `firebase-config.js` and in the rules must match the sign-in email exactly |
| "Could not save: Missing or insufficient permissions" | Check the rules were published (Part 1, step 5) and the person has a role in Team |
| Old version still showing after an update | Press Ctrl+Shift+R (PC) or close and reopen the browser tab |
