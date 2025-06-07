
# Axiona 🧠✨  
An interactive AI-powered chatbot with dynamic 3D animations and real-time responses powered by **OpenAI**. Built using **React**, **three.js**, and **Supabase** for secure API key handling.

---

## 🔗 Live Demo  
👉 [Click here to try Axiona Live] (https://axiona-eta.vercel.app/)

---

## ✨ Features

- 🤖 **AI Chatbot (OpenAI)**: Real-time conversation powered by OpenAI `gpt-4` model.
- 🎨 **three.js Animation**: Responsive 3D cube reacts to user typing.
- 🔐 **Supabase Integration**: Secure retrieval of API keys.
- 💬 **Typing Feedback**: Animation speed and color adjust based on activity.
- ⚡ **Fast & Responsive**: Built with React, optimized for performance.
- 🌐 **Production Ready**: Easily deployable structure with .env support.

---

## 🧰 Tech Stack

- ⚛️ React
- 🌐 OpenAI (`ai-sdk`)
- 🎮 three.js
- 🔒 Supabase
- 🧠 Lodash (debounce)
- ⚡ Vite (or Babel/CDNs depending on setup)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/axiona.git
cd axiona
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run Locally

```bash
npm run dev
```

---

## 🔑 Supabase for API Key

* Table: `api_keys`
* Field: `key_value`
* Retrieved securely using `supabase-js`.

```js
const { data } = await supabase.from('api_keys').select('key_value').single();
```

---

## 🧠 OpenAI via AI SDK

```js
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-4'),
  prompt: 'Hello! What can you do?',
});
```

---

## 🌀 Live Demo Behavior

* ⌨️ When user types:

  * Cube spins faster 🌀
  * Color changes 🌈

* 💤 When idle:

  * Cube slows down 🧊

---

## 📦 Dependencies

* `react`, `react-dom`
* `three`
* `@supabase/supabase-js`
* `@ai-sdk/openai`
* `ai`
* `lodash`

---

## 🧾 License

Licensed under the **MIT License**.


