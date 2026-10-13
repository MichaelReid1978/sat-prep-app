# Deploying to Vercel (100% Free Mobile Access)

To make this app accessible to your son from anywhere on his phone (or any device with internet), follow these simple steps to deploy it to **Vercel** for free:

---

## Option A: Deploy via GitHub (Recommended — Automatic Updates)

1. **Push the project to GitHub:**
   In your terminal inside `sat-prep-app`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SAT Adaptive Prep app"
   ```
   Create a new GitHub repository and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/sat-prep-app.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel:**
   * Go to [vercel.com](https://vercel.com) and sign in (or create a free account with GitHub).
   * Click **"Add New"** -> **"Project"**.
   * Select your `sat-prep-app` repository and click **Deploy**.

3. **Get your live URL:**
   * In less than 1 minute, Vercel will give you a public URL like:
     `https://sat-prep-app-xxxx.vercel.app`
   * Text or email this link to your son!

---

## Option B: Deploy in 30 Seconds via Vercel CLI (No GitHub needed)

1. Open your command prompt in `sat-prep-app`:
   ```bash
   npx vercel
   ```
2. Follow the 3 prompts:
   * Log in to Vercel (press Enter to authenticate via browser).
   * Set up and deploy `sat-prep-app`? `Y`
   * Which scope? (Select your name)
   * Link to existing project? `N`
   * What's your project's name? (Press Enter)
   * In which directory is your code located? `./`
3. When it finishes, run:
   ```bash
   npx vercel --prod
   ```
4. You will receive an instant live URL that works on mobile browsers everywhere!

---

## Mobile Tip for Your Son
Once he opens the link on his phone:
* **iPhone (Safari):** Tap the **Share** button -> **"Add to Home Screen"**. It will appear like a native app icon.
* **Android (Chrome):** Tap the **Three Dots** -> **"Install App"** or **"Add to Home screen"**.
