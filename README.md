# 🧠 AI Chat Interface using Gemini API

A responsive, theme-switchable chat application built with **React**, **Redux**, **Tailwind CSS**, and integrated with **Google's Gemini API** for intelligent Q&A.

## 🔧 Tech Stack

- **React** (with Vite)
- **Redux Toolkit** for state management
- **Tailwind CSS** for UI styling
- **TypeScript** for type safety
- **React-Markdown** with syntax highlighting
- **Google Gemini API** for AI responses
- **Dark/Light Mode Toggle** with CSS variables

---

## 🚀 Features

- ✅ Smooth dark/light mode toggle
- ✅ Responsive layout
- ✅ Markdown rendering with tables & code blocks
- ✅ Scroll-to-last-message & auto-scroll logic
- ✅ Copy button for code snippets
- ✅ Redux-powered global state (chat history, UI flags)

---

## 📦 Installation

 1.**Clone the repository**  
   ```
   git clone https://github.com/arijitbouri0/ChatAi.git
   ```
 2.Install dependencies

```
npm install
```
 3.Set up environment variables
Create a .env file in the root directory:

```
VITE_GEMINI_API_KEY=your-gemini-api-key
```
4.Start the development server
```
npm run dev
```
---

## 🤖 Gemini API Integration
This app uses Google Gemini API (gemini-pro) to generate answers from user prompts.

## 🔐 How to Get Your API Key:

 1.Visit Google AI Studio

 2.Create a project and generate a Gemini API Key

 3.Add it to .env as shown above

🔧 Example API Call
```
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userPrompt }] }]
    }),
  }
);
const data = await response.json();

```
ℹ️ For security, route the call through a backend in production.

🖼 UI Screenshots



## Screenshots

### Home Page
![Home Screenshot](https://raw.githubusercontent.com/arijitbouri0/ChatAi/main/public/Screenshot%202025-05-11%20223058.png)


## Demo

Check out App Live here
 
https://chat-ai-flame-omega.vercel.app/


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email arijitbouri0@gmail.com .
