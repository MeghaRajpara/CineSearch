# 🎬 CineSearch — Movie Explorer App

A polished, full-featured movie search app built with **React JS**.  
Search millions of movies, view detailed info, and save your favourites — all powered by the free OMDB API.

Demo URL: [Demo](https://super-trifle-167345.netlify.app/)
---

## ✨ Features

- 🔍 **Search movies** by title with live results
- 🎞️ **Filter** by type — Movie / Series / Episode
- 📄 **Movie Detail page** with full plot, cast, ratings, and box office info
- ❤️ **Favourites** — save and remove movies (persisted in localStorage)
- 📱 **Fully responsive** — works great on mobile and desktop
- ⚡ **Pagination** — load more results on demand

---

## 🚀 Step-by-Step Setup Guide

### Step 1 — Get a Free OMDB API Key

1. Go to **https://www.omdbapi.com/apikey.aspx**
2. Choose the **Free** plan (1,000 daily requests)
3. Enter your email and click **Submit**
4. Check your email — you'll receive an API key like `a1b2c3d4`
5. Click the **activation link** in the email

---

### Step 2 — Download / Clone This Project

If you have Git installed:
```bash
git clone https://github.com/MeghaRajpara/CineSearch.git
cd movie-search-app
```

Or simply download the ZIP and extract it, then open a terminal in the `movie-search-app` folder.

---

### Step 3 — Add Your API Key

1. In the project folder, find the file `.env.example`
2. **Rename it** to `.env` (remove the `.example` part)
3. Open `.env` in any text editor and replace `your_api_key_here` with your actual key:

```
REACT_APP_OMDB_API_KEY=a1b2c3d4
```

---

### Step 4 — Install Dependencies

In your terminal, inside the project folder, run:

```bash
npm install
```

This downloads all the required packages (React, React Router, etc.) into a `node_modules` folder. It may take 1–2 minutes.

---

### Step 5 — Run the App

```bash
npm start
```

Your browser will automatically open at **http://localhost:3000** 🎉

The app will automatically reload whenever you save changes to any file.

---

## 🌐 API Used

**OMDB API** — https://www.omdbapi.com/

| Endpoint | Purpose |
|---|---|
| `?s=batman&page=1` | Search movies by title |
| `?i=tt0372784&plot=full` | Get full details for one movie |

---

## 🐛 Common Issues

**"Invalid API Key" error in the app**
→ Make sure your `.env` file exists, the key is correct, and you restarted the dev server after adding the key.

**Movies not showing up**
→ Check that you activated your API key via the email link.

**Port 3000 already in use**
→ The terminal will ask if you want to use a different port — press `Y`.

**`npm install` fails**
→ Try deleting the `node_modules` folder and running `npm install` again.
