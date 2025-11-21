# How to Add Team Member Images in About.tsx

## Step 1: Prepare Your Team Images

Create or prepare 3 profile images for your team members:
- **Prateek** (AI/ML Engineer)
- **Aditya** (Full Stack Developer)  
- **Risabh** (Data Scientist)

### Image Recommendations:
- **Format:** JPG or PNG
- **Size:** 200x200 pixels minimum (square images work best for circular avatars)
- **Style:** Professional headshots or profile pictures
- **File names:**
  - `team-prateek.jpg`
  - `team-aditya.jpg`
  - `team-risabh.jpg`

---

## Step 2: Add Images to Your Project

1. Navigate to the images folder: `src/assets/images/`
2. Place your 3 team images there:
   ```
   src/assets/images/
   ├── team-prateek.jpg
   ├── team-aditya.jpg
   └── team-risabh.jpg
   ```

---

## Step 3: How the Component Works

The About.tsx component now has:
- **Primary image path:** `/src/assets/images/team-[name].jpg`
- **Fallback image:** Automatically uses DiceBear avatars if your image fails to load

**Example from the code:**
```tsx
{
  name: 'Prateek',
  avatar: '/src/assets/images/team-prateek.jpg',
  fallbackAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prateek',
}
```

---

## Step 4: Test Your Images

1. Save your images in the correct folder
2. Refresh your browser (or restart `npm run dev`)
3. Navigate to the About section
4. Your custom team images should now display in circular frames

---

## Troubleshooting

### Images Not Showing?

1. **Check file location:**
   - Verify files are in: `src/assets/images/`
   - Verify file names match exactly

2. **Clear cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or clear browser cache manually

3. **Check file format:**
   - Ensure files are `.jpg` or `.png`
   - Not `.jpeg` or other formats

4. **Verify image permissions:**
   - Make sure files are readable by the browser

### Images Look Pixelated?

- Use high-quality images (at least 200x200 pixels)
- For best results, use 300x300+ pixel images
- Compress if needed with tools like TinyPNG

### Want Different Image Sizes?

Edit the width/height in About.tsx:
```tsx
className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-green-500"
```

Change `w-32 h-32` to:
- `w-40 h-40` (larger)
- `w-24 h-24` (smaller)

---

## Advanced: Using Online Images

If you prefer to use images from URLs instead of local files:

```tsx
{
  name: 'Prateek',
  avatar: 'https://your-website.com/prateek.jpg',
  fallbackAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prateek',
}
```

---

## Tips for Best Results

✅ Use professional-looking images  
✅ Ensure consistent lighting and background  
✅ Square images work best for circular avatars  
✅ Use images with similar style/tone across all 3 members  
✅ Compress images to keep page load times fast  
✅ Test on both light and dark modes

---

## Questions?

If images still aren't showing:
1. Open browser DevTools (F12)
2. Check the Console for error messages
3. Check the Network tab to see if images are being requested
4. Verify the file path in the image's `src` attribute matches your file location
