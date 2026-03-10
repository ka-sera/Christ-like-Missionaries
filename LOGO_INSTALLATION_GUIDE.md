# How to Add a Logo to Your Website

## Step 1: Prepare Your Logo File

1. **Get your logo image** in one of these formats:
   - `.png` (recommended - supports transparency)
   - `.jpg` / `.jpeg`
   - `.svg` (best for scalability)

2. **Suggested dimensions**: 40-50px height (the navbar is 64px tall)

3. **Place the logo file** in this directory:
   ```
   frontend/src/assets/logo.png
   ```
   (Create the `assets` folder if it doesn't exist)

## Step 2: Update the Navigation Component

Open the file: `frontend/src/App.jsx`

Find this section (around line 33-35):
```jsx
<Link to="/" className="text-2xl font-bold text-emerald-700">
  Christ-Like Missionaries
</Link>
```

Replace it with:
```jsx
<Link to="/" className="flex items-center gap-2">
  <img 
    src="/src/assets/logo.png" 
    alt="Christ-Like Missionaries Logo" 
    className="h-12"
  />
  <span className="text-xl font-bold text-emerald-700 hidden sm:inline">
    Christ-Like Missionaries
  </span>
</Link>
```

## Step 3: Save and Refresh

1. Save the `App.jsx` file
2. The browser should automatically refresh
3. Your logo will now appear in the top-left corner next to the ministry name

## Logo Placement Options

### Option A: Logo Only (Minimal Design)
```jsx
<Link to="/" className="flex items-center">
  <img 
    src="/src/assets/logo.png" 
    alt="Logo" 
    className="h-12"
  />
</Link>
```

### Option B: Logo with Text (Recommended)
```jsx
<Link to="/" className="flex items-center gap-3">
  <img 
    src="/src/assets/logo.png" 
    alt="Christ-Like Missionaries Logo" 
    className="h-12"
  />
  <div className="hidden sm:block">
    <div className="text-sm font-bold text-emerald-700">Christ-Like</div>
    <div className="text-sm font-bold text-amber-600">Missionaries</div>
  </div>
</Link>
```

### Option C: Logo with Full Text (Large Screens Only)
```jsx
<Link to="/" className="flex items-center gap-2">
  <img 
    src="/src/assets/logo.png" 
    alt="Logo" 
    className="h-12"
  />
  <span className="text-lg font-bold text-emerald-700 hidden lg:inline">
    Christ-Like Missionaries
  </span>
</Link>
```

## Sizing Guide

- `h-10` = 40px (small)
- `h-12` = 48px (recommended)
- `h-14` = 56px (medium)
- `h-16` = 64px (large)

## Footer Logo

If you want to also add the logo to the footer:

Find the footer section in `App.jsx` (around line 78) and update:
```jsx
<h4 className="font-bold text-lg mb-4 text-amber-300">Christ-Like Missionaries</h4>
```

To:
```jsx
<div className="flex items-center gap-2 mb-4">
  <img 
    src="/src/assets/logo.png" 
    alt="Logo" 
    className="h-10"
  />
  <h4 className="font-bold text-lg text-amber-300">CLM</h4>
</div>
```

## Tips

- **Responsive**: The `hidden sm:inline` class hides the text on mobile devices
- **Colors**: Your emerald green (#047857) and golden (#D97706) colors work well with most logos
- **Quality**: Use a high-quality logo image for best results
- **Format**: SVG logos scale perfectly without losing quality

## Need Help?

If your logo doesn't show up:
1. Check the file path is correct
2. Make sure the image file exists in the `frontend/src/assets/` folder
3. Try refreshing the browser (Ctrl+Shift+R)
4. Check the browser console for errors (F12)

