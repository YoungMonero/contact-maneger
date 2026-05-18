# Contact Management Application

A sleek, modern, and highly responsive contact management web application built with **React** and **Vite**. The application provides an elegant interface for managing connections, complete with real-time search, category grouping, image management, client-side persistence, and dark mode configuration.

---

## 🚀 Features

* 👤 **Full CRUD Operations**: Create, read, update, and delete contacts dynamically with an interactive modal-driven workflow.
* 🛡️ **Smart Duplicate Validation**: Built-in duplicate filtering prevents saving multiple contacts with identical phone numbers or emails.
  * *Email Check*: Compares trimmed, case-insensitive values.
  * *Phone Normalization*: Automatically strips out format symbols (`(`, `)`, `-`, spaces) to ensure variations like `555-123-4567` and `5551234567` are securely caught.
* 📂 **Group Categorization & Filtering**: Organize records into custom group categories (`Personal`, `Work`, `Family`, `Friends`) complete with tab-based filtering and specialized background accent themes.
* 🔍 **Instant Dynamic Search**: A high-performance real-time search engine matching user queries across contact names, emails, and phone numbers simultaneously.
* 🌗 **System-Aware Dark Mode**: Includes a stateful dark/light theme switch toggled via user interaction or synced natively to system preferences (`matchMedia`).
* 🖼️ **Profile Picture Pipeline**: Supports uploading custom contact profile photos processed locally via a base64 `FileReader` pipeline, falling back dynamically to a two-letter structural text avatar if no image is present.
* 💾 **Persistent Client Storage**: Synchronizes app states (`contacts`, `groups`, and `darkMode`) seamlessly to the browser's `localStorage` tracking layout.

---

## 🛠️ Tech Stack

* **Build Tool:** [Vite](https://vitejs.dev/) (Optimized React compilation with Hot Module Replacement)
* **Frontend Library:** [React 18+](https://react.dev/) (Hooks, Client-side Contexts, and State Architecture)
* **Unique Key Management:** `uuid` v4
* **Styling Ecosystem:** Pure Modular CSS3 featuring custom CSS variables and Dark Mode utility selector layers

---

## 📂 Project Directory Structure

```text
├── src/
│   ├── components/
│   │   ├── icons.jsx          # Modular custom SVG icon packaging (Mail, Phone, User, etc.)
│   │   ├── ContactDetail.jsx  # Individual profile preview canvas modal with action controls
│   │   ├── ContactForm.jsx    # Managed form component controlling creation and modification inputs
│   │   └── ContactList.jsx    # Layout rendering engine managing the layout grids and contextual dropdowns
│   ├── App.jsx                # Application root hub orchestrating state management and persistence
│   ├── App.css                # Global canvas design configurations and custom theme variables
│   └── main.jsx               # React DOM rendering bridge mounting to the web layout
├── public/
│   └── placeholder.svg        # Standard visual fallback for unassigned profile avatars
├── index.html                 # Main application HTML shell template
├── vite.config.js             # Vite environment compiler configurations
└── README.md                  # Comprehensive project technical documentation