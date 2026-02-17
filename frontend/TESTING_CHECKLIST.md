# User Flow Testing Checklist

## ✅ Complete User Journey Test

### 1. Registration Flow
- [ ] Navigate to /register
- [ ] Enter valid email and password
- [ ] Submit form
- [ ] Verify success redirect to login
- [ ] Check error message for duplicate email
- [ ] Check error message for weak password

### 2. Login Flow
- [ ] Navigate to /login
- [ ] Enter registered email and password
- [ ] Submit form
- [ ] Verify redirect to /dashboard
- [ ] Check JWT token stored in localStorage
- [ ] Check error message for invalid credentials
- [ ] Verify navbar updates (shows Dashboard only)

### 3. Dashboard Access
- [ ] Verify dashboard loads without errors
- [ ] Check "No images" message displays initially
- [ ] Verify logout button is visible
- [ ] Check upload form is present

### 4. Image Upload
- [ ] Click file input
- [ ] Select valid image file (JPEG/PNG/WebP)
- [ ] Verify file name and size display
- [ ] Click "Upload Image" button
- [ ] Wait for upload to complete
- [ ] Verify success message appears
- [ ] Check image appears in gallery
- [ ] Verify image preview loads

### 5. Image Display
- [ ] Verify image card shows:
  - Image preview
  - Filename
  - Upload date
  - Transformation count (0 initially)
  - Transform button
  - Download button

### 6. Image Transformation - Resize
- [ ] Click "Transform Image" button
- [ ] Select "Resize" from dropdown
- [ ] Enter width: 500
- [ ] Enter height: 500
- [ ] Select output format (JPEG/PNG/WebP)
- [ ] Click "Apply Transform"
- [ ] Wait for transformation to complete
- [ ] Verify success message
- [ ] Check transformation count incremented

### 7. Image Transformation - Rotate
- [ ] Open transform panel
- [ ] Select "Rotate"
- [ ] Enter angle: 90
- [ ] Click "Apply Transform"
- [ ] Verify success message
- [ ] Check transformation count updated

### 8. Image Transformation - Filters
- [ ] Test Grayscale transformation
- [ ] Test Sepia transformation
- [ ] Verify both complete successfully

### 9. Image Download
- [ ] Click "Download" button
- [ ] Verify browser starts download
- [ ] Check downloaded file opens correctly

### 10. Logout Flow
- [ ] Click "Logout" button
- [ ] Verify redirect to /login
- [ ] Check token removed from localStorage
- [ ] Verify navbar updates (shows Login/Register)
- [ ] Try accessing /dashboard directly
- [ ] Verify redirect back to /login

### 11. Protected Route Testing
- [ ] Clear localStorage
- [ ] Try to access /dashboard
- [ ] Verify immediate redirect to /login
- [ ] Check loading spinner shows during redirect

### 12. Error Handling
- [ ] Turn off backend server
- [ ] Try to upload image
- [ ] Verify network error message shows
- [ ] Turn backend back on
- [ ] Upload with invalid file type
- [ ] Verify error message shows
- [ ] Try transform with missing parameters
- [ ] Verify validation error shows

### 13. Session Expiry
- [ ] Login with valid credentials
- [ ] Manually expire token (edit in localStorage)
- [ ] Try to perform any action
- [ ] Verify "Session expired" message
- [ ] Verify auto-redirect to login

### 14. Responsive Design
- [ ] Open DevTools
- [ ] Switch to mobile view (375px)
- [ ] Verify layout adapts:
  - Single column image grid
  - Stacked navigation
  - Proper button sizes for touch
- [ ] Test on tablet view (768px)
- [ ] Test on desktop (1920px)

### 15. Error Boundary
- [ ] Force a React error (modify component)
- [ ] Verify error boundary catches it
- [ ] Check fallback UI displays
- [ ] Click "Refresh Page" button
- [ ] Verify page reloads

### 16. Performance
- [ ] Upload 10+ images
- [ ] Scroll through gallery
- [ ] Verify smooth performance
- [ ] Check images lazy load
- [ ] Open multiple transform panels
- [ ] Verify no lag

### 17. Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test in Edge

## Expected Results

All checkboxes should pass ✅

## Critical Paths (Must Work)

1. Register → Login → Upload → Transform → Download → Logout
2. Protected route redirect when not authenticated
3. Error messages display correctly for all failures
4. Session expiry handling with auto-logout

## Known Limitations

- No drag-and-drop upload (enhancement for future)
- No bulk transformations (enhancement for future)
- No image comparison view (enhancement for future)
- No transformation history timeline (enhancement for future)

## Test Environment

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Node.js: 18+
- Browsers: Latest versions
