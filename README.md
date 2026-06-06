# Coffee Shout PWA

Track whose turn it is to shout coffee.

## Files

```
coffee-shout/
├── index.html        ← the whole app
├── manifest.json     ← PWA metadata
├── sw.js             ← service worker (offline support)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Deploy to GitHub Pages (free, ~5 minutes)

1. Create a new GitHub repo — call it `coffee-shout` (or anything)
2. Upload all files, keeping the folder structure
3. Go to **Settings → Pages → Source** → select `main` branch → save
4. Your app will be live at `https://YOUR-USERNAME.github.io/coffee-shout/`

## Install on Android

1. Open the URL in **Chrome** on your phone
2. Tap the **⋮ menu → Add to Home screen**
3. Tap **Add** — it appears as an app icon on your home screen
4. Works fully offline after first load

## Install on iPhone (if needed later)

1. Open in **Safari**
2. Tap the share button → **Add to Home Screen**

## Features

- Tracks who shouted last and how many rounds each
- "Next up" badge shows whose turn it is
- Undo button for misclicks
- Full history with relative timestamps
- Works offline
- Dark mode automatic
- Data stored locally on device (localStorage)
