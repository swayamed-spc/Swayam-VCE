// "Sign in with Google" through Firebase Authentication. Firebase is only used to get a Google-verified ID token;
// the backend checks it and starts our own session, so we sign out of Firebase straight away.
// The SDK is imported on click, so it is not part of the main bundle.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const googleConfigured = Boolean(config.apiKey && config.authDomain && config.projectId)

// Resolves to an ID token, or null if the user closed the popup
export async function getGoogleIdToken() {
  const [{ initializeApp, getApps }, { getAuth, GoogleAuthProvider, signInWithPopup, signOut }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ])
  const app = getApps()[0] ?? initializeApp(config)
  const auth = getAuth(app)
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    const token = await result.user.getIdToken()
    signOut(auth).catch(() => {})
    return token
  } catch (err) {
    if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') return null
    if (err?.code === 'auth/popup-blocked') throw new Error('Your browser blocked the Google sign-in window. Allow pop-ups for this site and try again.')
    throw new Error('Google sign-in did not complete. Please try again.')
  }
}
