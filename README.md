# Wahid Karak POS — set-up guide

Point of sale and cafeteria management for **Wahid Karak Cafe LLC**, Mina Bazar, Al Fahidi, Dubai.
It is a single web page (`index.html`). **GitHub Pages** hosts the page, and **Firebase** stores the data and handles staff logins.

```
wahid-karak-pos/
├── index.html          the app (POS)
├── order.html          customers' ordering page (private links)
├── accounts.html       the books: owner and accountant only (separate app)
├── firebase-config.js  your Firebase keys + owner email  ← you edit this
├── firestore.rules     who can read/write what           ← you edit the owner email
├── firebase.json       only needed if you use the Firebase CLI
├── starter-data.json   starter menu, raw materials and settings to import once
├── manifest.webmanifest, accounts.webmanifest, sw.js   lets phones install both apps
├── icon-*.png, acc-icon-*.png, logo-96.png, logo-240.png   app icons and the cafe logo
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

## Online ordering for registered customers

Regular customers order delivery, pickup or car service from their own phone with a **private link**. Only customers you switch on can order, and you accept every order before it is made.

**One-time setup**
1. **Firebase → Authentication → Sign-in method → Add new provider → Anonymous → Enable → Save.** Customers don't need an account; their private link is their key.
2. **Firebase → Firestore Database → Rules:** replace everything with the new `firestore.rules`, then **put your own email back** on the `ownerEmails` line (lowercase) and click **Publish**.
3. **GitHub:** upload `index.html` and the new `order.html`. Don't upload or replace `firebase-config.js`.
4. **POS → Settings → Online ordering:** tick *Take online orders*, then set opening hours, delivery charge, minimum for delivery, largest order and delivery area. Click **Save settings**.

**Give a customer access**
1. **Customers →** tap the customer **→ Edit details:** add their mobile number and delivery address.
2. Tap **Turn on online ordering**, then **Send on WhatsApp**.
3. If a link is ever shared with someone else, tap **New link** (the old one stops at once), or **Turn off**.

**When an order comes in**
- The POS plays a sound and shows an orange banner. Tap it, check the order in **Orders → Online**, then **Accept** or **Decline** (the customer sees the reason).
- Accepted orders go to the **Kitchen board** marked *Online*, with the address. The customer immediately sees the confirmed bill and the amount to pay.
- **Delivery:** in **Orders → Online**, tap **Out for delivery**, choose who is delivering, and the bill prints to send with the order (address, phone and amount to pay included). The customer sees *On the way with Rashid*. The card has **Call** and **Map** buttons for the delivery person.
- When it arrives, tap **Delivered** and choose **Cash received**, **Card payment received** or **Delivered, not paid yet**. Paid orders are recorded as a sale with a token, and the customer sees *Delivered and paid* plus the full **tax invoice**. *Not paid yet* stays in Online orders with a **Payment received** button for later.
- **Delivery person's phone:** they create an account on the sign-in page; in **Settings → Team** type their name and choose **Delivery: online deliveries only**. Their phone then shows only *My deliveries*, plays a sound when a delivery is given to them, and lets them tap **Delivered → Cash received** at the door. Use the same name everywhere so orders match.
- **Pickup and car service:** tap **Ready** when it's ready, then **Handed over** to record the payment.
- Sold-out items (out of stock or marked sold out) disappear from the customer's menu automatically.
**Delivery records**
- Bills for delivery orders show **Deliver to** and **Delivery by** (the delivery person's name).
- Counter delivery (phone orders): on **Sell** choose **Delivery → Own delivery**, then tap who delivers.
- The delivery person's phone shows **My record today**: deliveries, cash he collected (to hand to the counter), average time and this month's count.
- **Reports → Deliveries by person**: deliveries, sales, cash, card and average time for each person (also on the printed report).
- **Day close** reminds you how much cash each delivery person collected at the door, so it's in the drawer before you count.
- **Assigning the delivery person:** when you **Accept** a delivery order, tap who will deliver (or *Later*). You can change it anytime with the **Delivery by** box on the order card. The delivery person gets an alert as soon as they're assigned. If an order went out without a name, whoever marks it **Delivered** on their phone gets the credit.
- **Counter delivery orders (phone orders), cash collected at the door:** on **Sell** choose **Delivery → Own delivery**, tap who delivers, and check the address and phone (filled in from the customer). Tap **Send with Rashid · collect on delivery**: the kitchen gets it, the delivery bill prints with *TO PAY*, and it appears on Rashid's phone under *My deliveries*. At the door he taps **Delivered → Cash received**, and the cash shows as *with me* until the counter taps **Receive**. If the customer already paid, use **Already paid · charge now** instead.
- **Cash handover:** cash the delivery person takes at the door shows as **Cash with me** on their phone. When they bring it back, open **Orders → Online** (or **Day close**), tap **Receive** next to their name, count it and confirm. Their phone resets to 0.00, each bill is marked *handed over*, and any short or extra amount is noted in Day close and on the Z report.
- Too busy? **Orders → Online → Pause online orders**. Tap **Resume** when ready.

**What customers can and can't do:** they see the menu (sold-out items hidden), their stamps and their own orders. They can't see prices you pay, sales, other customers or anything else in the POS, and they can't change an order once you've accepted it.

## Stock warnings on the Sell screen

Item buttons change colour from the recipe stock:
- **Amber, "8 left":** only a few more can be made, or an ingredient is below its reorder level.
- **Red dashed, "Out", price crossed:** an ingredient has run out. Tapping it asks before selling, with **Sell anyway** or **Record delivery**.
- **Grey, "Sold out":** marked sold out for today. In the cart, tap the line, then **Mark sold out today**. It resets by itself the next day, or tap **Back on sale**.

The **⚠ chip** next to *All* shows how many items are low or out; tap it to see only those. The cart also warns when an order needs more than the stock shows.

## Printing

**Reprint an old bill:** go to **Orders → Bills**, use **‹ ›** or the date box to pick the day, then tap the bill and tap **Print** (or **WhatsApp**). For khata customers you can also open **Customers**, tap the customer, then tap the bill in their history. Only today's bills can be voided.

**Only a receipt printer (58 or 80 mm)?** Keep **Settings → Statements, reports & purchase orders print on → Receipt printer** (the default). Statements, sales reports and purchase orders then print in receipt width at full size; long ones carry on down the roll. Choose **A4 office printer** only if you have one. In Chrome's print window use the receipt printer, **Margins: None** and **Scale: Default**, and make sure **Fit to page** is off.

**Customer statements:** open a customer, tap **Print statement**, choose the period (this month, last month, last 3 months or everything), then **Print statement**. It prints on A4 as a table with the date, bill items, paid amounts and running balance, starting from the opening balance, with page numbers on every page.

**Receipt paper:** go to **Settings → Receipt paper**, choose **58 mm** or **80 mm**, then tap **Print test receipt** to check the fit. Save settings to keep the choice. Receipts, Z reports and the test print follow this setting; reports and statements stay on A4.

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

## Accounts (owner and accountant only)

`accounts.html` is a separate app for the books. It uses the same Firebase project and the same sign-in, but the Firestore rules only let the **owner** and people with the **Accountant** role open it. Managers, staff and delivery people can't read the books, even on their own devices.

**First time (owner):**
1. Open `https://YOUR-NAME.github.io/wahid-karak-pos/accounts.html` and sign in with the owner email.
2. Choose the date the books start, the financial year and your VAT quarter (as on your EmaraTax VAT certificate). The POS days from that date are posted straight away.
3. Go to **Settings → Opening balances**: cash float in the till, bank balance, stock, equipment, what khata customers owe, what you owe suppliers, share capital.
4. Add your trade licence number and Corporate Tax TRN in **Settings**.
5. Install it on your phone the same way as the POS. It has its own icon marked **ACCOUNTS**.

**How the POS feeds the books:** each POS day becomes one journal entry: sales and 5% VAT by cash/card/khata/platform, cost of materials used, khata payments, Expenses, supplier bills and payments from Materials, wastage and stock counts, delivery cash and shortages, and the cash over/short from Day close. Cash the owner takes out of the till after Day close goes to *Takings awaiting deposit* until you record the bank deposit (Transactions → Transfer). Days update by themselves each time Accounts opens; tap **Update from POS** after correcting something in the till.

**What else is in it:** money out/in, transfers, card settlements, delivery-platform payouts with commission, supplier payments, journals; trial balance, profit and loss, balance sheet, cash flow and changes in equity (IFRS for SMEs layout, printable with the logo); ledgers; receivables and payables by age; bank reconciliation; VAT 201 working with a VAT audit file; Corporate Tax estimate with Small Business Relief; fixed assets with monthly depreciation; payroll, WPS salary list and end-of-service gratuity; audit trail; period lock.

**Accountant access:** in the POS go to **Settings → Team** and set their role to **Accountant**. They can post entries and prepare VAT and Corporate Tax, but only the owner can change company settings or the lock date.

**Lock after filing VAT:** when you mark a VAT return as filed, tick *Lock the books*. Nobody can then change that period, and the POS can't re-post those days.

## Backups

**Settings → Save backup file** in the POS downloads everything as one file, and **Accounts → Settings → Save books backup** saves the books. Do this once a week and keep the file on Google Drive. The bills for the last two months are included.

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
| "Your account can't change this. Ask the owner or a manager." | That account's role doesn't allow it (for example, staff editing the menu). The owner can change roles in **Settings → Team** |
| "Could not save: Missing or insufficient permissions" | Check the rules were published (Part 1, step 5) and the person has a role in Team |
| Old version still showing after an update | Press Ctrl+Shift+R (PC) or close and reopen the browser tab |
