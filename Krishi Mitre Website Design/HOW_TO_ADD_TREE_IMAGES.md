# How to Add Your Own Tree Images to About.tsx

## Option 1: Add Local Tree Images (Recommended)

### Step 1: Prepare Your Images
1. Create two tree images in JPG or PNG format
2. Recommended dimensions: 400x300 pixels or similar aspect ratio
3. Name them: `tree1.jpg` and `tree2.jpg`

### Step 2: Add Images to Project
1. Navigate to: `src/assets/images/`
2. Place your tree images here:
   - `src/assets/images/tree1.jpg`
   - `src/assets/images/tree2.jpg`

### Step 3: Update Image Paths in About.tsx
The component already has the correct paths configured:
```tsx
<img src="/src/assets/images/tree1.jpg" alt="Tree 1" ... />
<img src="/src/assets/images/tree2.jpg" alt="Tree 2" ... />
```

If your images are in a different location, update the `src` attribute paths accordingly.

---

## Option 2: Use Online Image URLs

If you prefer to use images from the internet, update the `src` attributes:

```tsx
<img src="https://your-image-url.com/tree1.jpg" alt="Tree 1" ... />
<img src="https://your-image-url.com/tree2.jpg" alt="Tree 2" ... />
```

The component includes fallback URLs that will automatically display if your images fail to load.

---

## Option 3: Add More Tree Images

To add additional tree images (e.g., 3 or 4 images), you can duplicate the image sections:

```tsx
<motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="rounded-xl overflow-hidden shadow-xl"
>
  <img
    src="/src/assets/images/tree3.jpg"
    alt="Tree 3"
    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
    onError={(e) => {
      e.currentTarget.src = 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop';
    }}
  />
</motion.div>
```

Then adjust the grid layout in the parent `<div>`:
- Change `lg:grid-cols-3` to `lg:grid-cols-4` for 4 images
- Or use `lg:grid-cols-2` for 2 images

---

## Features Included

✅ **Responsive Design** - Images adapt to mobile and desktop  
✅ **Hover Effects** - Images zoom in on hover  
✅ **Fallback Images** - Uses Unsplash images if your images fail to load  
✅ **Smooth Animations** - Images fade in from sides  
✅ **Error Handling** - Automatically loads backup images if original fails  

---

## Tips for Best Results

- Use high-quality images with good lighting
- Keep images consistent in style and color tone
- Use images related to agriculture, farming, or environmental conservation
- Ensure images are optimized for web (compressed but high quality)
- Recommended size: 400x300px or larger
- File format: JPG for photos, PNG for graphics with transparency

---

## Troubleshooting

**Images not showing?**
1. Check the file path is correct
2. Verify image files exist in `src/assets/images/`
3. Clear browser cache and reload the page
4. Check browser console for error messages

**Images look blurry?**
1. Ensure images are at least 400x300 pixels
2. Use optimized images (compress with TinyPNG or similar)

**Want to customize further?**
- Adjust `h-48` class to change image height
- Modify `duration-300` to change hover animation speed
- Edit border-radius values (`rounded-xl`) for different corner styles
