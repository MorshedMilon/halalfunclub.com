# Halal Fun Club Static Site Rebuild

A premium, trustworthy, joyful, and fully responsive static website for **Halal Fun Club**. Built with semantic HTML5, modern CSS variables, and clean JavaScript, this site is designed to be hosted for free on **GitHub Pages** without any backend, database, or CMS dependency.

## Features
- **Visuals**: Modern, warm, family-friendly Islamic-inspired colors (Teal, Green, Warm Sand) with smooth hover and scroll reveal animations.
- **Dynamic Image Gallery**: Filterable grid with 130+ pre-loaded images and a built-in interactive swipe/keyboard-controlled Lightbox modal.
- **Easy Maintenance**: Add images by editing a single javascript data file.
- **Accordion FAQs**: Interactive questions and answers panel.
- **Validated Forms**: Real-time form validations with static success modals.
- **SEO & Performance**: Pre-configured title tags, meta descriptions, open graph tags, responsive images, and semantic layouts.

---

## Folder Structure

```
halalfunclub.com/
├── index.html                   # Home page
├── about.html                   # About Us page
├── gallery.html                 # Gallery page
├── faq.html                     # FAQ page
├── contact.html                 # Contact Us page
├── signup.html                  # Registration / Sign Up page
├── blog-enriching-camp.html     # Blog post 1
├── blog-ultimate-adventure.html # Blog post 2
├── README.md                    # This instructions guide
├── assets/
│   ├── css/
│   │   ├── style.css            # Global colors, typography, navbar, and footer
│   │   ├── components.css       # Buttons, cards, FAQ accordions, forms, and lightbox
│   │   └── pages.css            # Page-specific layout tweaks
│   ├── js/
│   │   ├── main.js              # Scroll reveals, responsive navbar, copyright year
│   │   ├── gallery-data.js      # Core gallery array (JSON-like database file)
│   │   ├── gallery.js           # Gallery category filtering and lightbox controls
│   │   ├── faq.js               # Accordion slide controls
│   │   └── forms.js             # Form validation & submission modals
│   └── images/                  # 140+ optimized image assets
```

---

## Local Setup & Development

Since this is a static site, you don't need any complex installation or compilation. 

1. **Option A (Simple)**: Double-click `index.html` to open it directly in any web browser.
2. **Option B (Recommended for Dev)**: Run a local development server for accurate image paths and forms. You can use VS Code's "Live Server" extension, or run:
   ```bash
   # If you have Node.js installed, run a quick server in the folder:
   npx serve ./
   ```
   Open `http://localhost:3000` in your browser.

---

## Content/Asset Organization Guide (Adding New Images)

The gallery loads images dynamically from a data file. You can easily add new images or delete old ones by editing a single file:

### Step 1: Upload the Image
Put your new image file inside the `assets/images/` directory. (e.g. `new-camping-2027.jpg`).

### Step 2: Update the Javascript Database
Open [assets/js/gallery-data.js](file:///c:/Users/User/Documents/halalfunclub.com/assets/js/gallery-data.js) in a code editor and find the `GALLERY_ITEMS` array. Add a new object at the top or bottom:

```javascript
const GALLERY_ITEMS = [
  {
    path: "assets/images/new-camping-2027.jpg",
    title: "Summer Camp 2027 High-Five",
    description: "Team building game session",
    category: "summer-2025", // Match one of the slugs below
    alt: "Campers high-fiving during a team building session"
  },
  // Existing items...
];
```

### Valid Category Slugs:
- `summer-2025` (Summer Camp 2025)
- `summer-2023` (Summer Camp 2023)
- `winter-2023` (Winter Camp 2023)
- `sightseeing` (Sightseeing)
- `cottage-views` (Cottage Views)
- `lakeside-cottage` (Lakeside Cottage)
- `star-gazing` (Star Gazing)
- `fishing-hunting` (Fishing & Hunting)
- `horse-boating` (Horse Riding & Canoeing)
- `organic-farm` (Our Organic Farm)
- `transportation` (Motorhome & RVs)

*Note: You can add or rename categories in the `GALLERY_CATEGORIES` list defined at the top of the same file.*

---

## Form Setup Guide (Enabling E-mail Submissions)

By default, form submissions are intercepted by JavaScript to validate details and display a clean "Thank You" modal. To receive email notifications:

1. Create a free account on [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Create a form endpoint and copy your unique form endpoint URL.
3. Open `contact.html` and `signup.html` and set the `action` attribute of `<form>`:
   ```html
   <!-- For Contact Us Form -->
   <form id="contact-form" action="https://formspree.io/f/YOUR_ENDPOINT_KEY" method="POST" novalidate>
   ```
4. Our scripts in `assets/js/forms.js` will automatically intercept it, submit the fields via `fetch` to Formspree, and display our premium success modal instead of redirecting the user to an external thank-you page!

---

## Deployment to GitHub Pages

GitHub Pages allows you to host static sites for free. Follow these steps:

### Step 1: Initialize Git and Commit Files
Open your terminal in the `halalfunclub.com` folder:
```bash
git init
git add .
git commit -m "Initial commit of premium static website rebuild"
```

### Step 2: Create a Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click **New** to create a new repository.
3. Name it `halalfunclub.com` (or any name you prefer). Keep it **Public**.
4. Leave "Add a README", ".gitignore", and "License" unchecked.
5. Click **Create repository**.

### Step 3: Push Files to GitHub
Copy the commands from the GitHub screen and run them in your local terminal:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (gear icon) in the tabs.
3. On the left sidebar, click **Pages** (under Code and automation).
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and `/ (root)`.
6. Click **Save**.

### Step 5: View Live Site!
In a minute, GitHub will deploy your site. You will see the live URL at the top of the Pages settings page, formatted as:
`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`
