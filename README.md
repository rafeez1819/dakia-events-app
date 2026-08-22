# Dakia Events App

An all-in-one full-stack platform for event management, built with **TanStack Start**, **Vite**, **React**, and **Tailwind CSS**. Fully deployed and optimized via **Vercel**.

🌐 **Live Website:** [https://dakia-events.com](https://dakia-events.com)

---

## ⚡ Tech Stack

- **Frontend & Routing:** TanStack Start / React Router
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Analytics:** Vercel Web Analytics (Privacy-focused, cookie-free)
- **Deployment:** Vercel

---

## 🛠️ Local Development Setup

Follow these steps to run a local testing server on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd dakia-events-app
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   *(Bypasses custom Windows script wrappers)*
   ```bash
   npx vite --host 0.0.0.0 --port 8080
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 🚀 Deployment

This application uses an automated CI/CD deployment pipeline via Vercel. Every time you push code updates to the `main` branch, the live website builds and updates automatically:

```bash
git add .
git commit -m "Describe your code changes here"
git push origin main
```

---

## 📜 License

This project is open-source and licensed under the terms of the MIT License. See the `LICENSE` file for details.
