# Google Sign-Up Setup Guide for DentalMart

## ✅ What's Already Done

1. ✅ Installed `@react-oauth/google` package
2. ✅ Updated `AuthVendor` with Google login support
3. ✅ Created `LoginModal` component with email/password and Google Sign-Up
4. ✅ Updated `Navbar` to show login/logout functionality
5. ✅ Wrapped App with `GoogleOAuthProvider`

## 🔧 Setup Steps

### Step 1: Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Enable **Google+ API**
4. Go to **Credentials** → Create **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add Authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (if needed)
   - Your production domain (e.g., `https://dentalmart.com`)
7. Copy your **Client ID**

### Step 2: Set Environment Variable

Create or update `.env.local` file in the root of your project:

```
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Note:** Vite uses `VITE_` prefix for environment variables (not `REACT_APP_` like Create React App)

### Step 3: Update Backend (Optional - For Token Verification)

If you want to verify Google tokens on the backend, add this endpoint to your backend:

```javascript
// backend/app/api/auth/google/route.js
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request) {
  try {
    const { credential } = await request.json();

    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Find or create user in database
    let user = await findUserByEmail(email);
    if (!user) {
      user = await createUser({
        email,
        name,
        picture,
        provider: 'google',
      });
    }

    // Generate your own token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return Response.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return Response.json(
      { success: false, message: 'Authentication failed' },
      { status: 400 }
    );
  }
}
```

### Step 4: Install Backend Dependencies (Optional)

If you implement the backend verification:

```bash
cd backend
npm install google-auth-library jsonwebtoken
```

## 🎯 Features Implemented

### LoginModal Component
- Email/Password login
- Email/Password sign-up
- Google Sign-In/Sign-Up with one click
- Form validation
- Error handling
- Loading states

### Navbar Integration
- Shows "Hello, [User Name]" when logged in
- Dropdown menu with profile options
- Logout button
- Login modal opens on "Account & Lists" click when not logged in

### AuthVendor Updates
- `googleLogin(credential)` - Handle Google token
- `getUser()` - Get logged-in user
- `getToken()` - Get auth token
- `isLoggedIn()` - Check if user is logged in

## 🚀 Testing

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Click on "Hello, Sign in" in the navbar

3. Try:
   - Google Sign-In button
   - Email/Password login
   - Sign-up form
   - Logout from dropdown

## 📝 Notes

- User data is stored in localStorage
- Make sure to implement proper JWT validation on backend
- Consider storing sensitive data in secure HTTP-only cookies instead of localStorage
- For production, always verify Google tokens on the backend
- Remember to add your production domain to Google OAuth authorized redirect URIs

## 🔒 Security Best Practices

1. Never expose your Google Client Secret on frontend
2. Always verify tokens on the backend
3. Use HTTP-only cookies for tokens
4. Implement CSRF protection
5. Add rate limiting to auth endpoints
6. Use HTTPS in production

## 📚 Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [react-oauth/google Docs](https://www.npmjs.com/package/@react-oauth/google)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
