# 📧 Email Template Builder

A powerful **drag-and-drop email template builder** built with **Node.js, Express, Sequelize, and SQLite/MySQL**.
Design responsive email templates with images, text blocks, buttons, and layouts — visually.

---

## 🚀 Features

* 🧱 Drag & drop template builder
* 🖼️ Image & media upload (AWS S3 supported)
* ✏️ Rich text editing
* 🎯 Dynamic layout system (rows & columns)
* 💾 Database persistence (Sequelize ORM)
* 👀 Live preview
* ✨ Fully customizable styles

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **ORM:** Sequelize
* **Database:** SQLite / MySQL
* **Templating:** EJS
* **Storage:** AWS S3 (optional)
* **Process Manager:** PM2

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MdSamsuzzohaShayon/nodejs-email-template.git
cd nodejs-email-template
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment Setup

Create a `.env` file inside the `config/` folder:

```env
PORT=4000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
```

👉 Follow `.env.example` if available.

---

## 🗄️ Database Setup (Important)

### Step 1: Sync Database

Temporarily update your `app.js`:

```js
db.sequelize.sync({ alter: true, force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
```

---

### Step 2: Disable Default Server Start

Comment out:

```js
app.listen(port, () => console.log("Server is connected to: " + process.env.PORT));
```

---

### Step 3: Run the App

```bash
npm run dev
```

👉 This will:

* Create database tables
* Apply schema

---

### Step 4: Restore Normal Server

After tables are created:

✅ Re-enable:

```js
app.listen(port, () => console.log("Server is connected to: " + process.env.PORT));
```

❌ Disable:

```js
db.sequelize.sync({ alter: true, force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});
```

---

### 🌱 Seed Data (Optional)

```bash
npm run seed
```

---


### Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

### Seed Database

```bash
npm run seed
```

---

## 🚀 Production Deployment (PM2)

```bash
git pull
pm2 startup
pm2 save --force
pm2 restart all
```

---

## 🧠 Development Notes

### Layout System

* Templates are built using:

  * Rows
  * Columns
  * Block elements (text, image, button, social)

* Each block tracks:

  * Row index
  * Column index
  * Content & properties

---

### Key Concepts

* 📍 Position-based rendering (row + column)
* 🔄 Dynamic DOM updates on change events
* 🧩 JSON-based template storage
* 🎯 Event-driven UI updates

---

## ⚠️ Known Issues & Improvements

### 🐛 Bugs

* Some drag/drop edge cases (nested columns)
* Button/link inconsistencies
* Preview rendering mismatches
* Image movement issues across rows
* Text editor paste formatting issues

---

### 🔧 Improvements Needed

* Better validation (image size, inputs)
* Improve drag-drop UX
* Optimize preview rendering
* Refactor large route/controller logic
* Improve responsiveness

---

## 🎨 UI / Styling Tasks

* Improve responsiveness 📱
* Fix preview inconsistencies
* Better text editor font scaling
* Clean hover states
* Improve layout spacing

---

## 📚 References

### ✏️ Text Editing

* [https://w3c.github.io/input-events/](https://w3c.github.io/input-events/)
* [https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

---

### ☁️ AWS S3 Upload

* [https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)
* [https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/](https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/)

---

### 🗄️ Sequelize Docs

* [https://sequelize.org/docs/v6/](https://sequelize.org/docs/v6/)

---

## 🐳 Docker (Planned)

Docker support is planned for future releases.

---

## 💡 Future Enhancements

* ✅ Prisma migration (modern ORM)
* ✅ TypeScript support
* ✅ Component-based editor
* ✅ Real-time collaboration (WebRTC 👀)
* ✅ Template export (HTML/JSON)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Submit a PR

---

## 📄 License

MIT License

---

