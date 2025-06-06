```markdown
# Axiona 🧠✨  
An interactive AI-powered chatbot application that features dynamic **three.js** animations responding to user activity and integrates **OpenAI** models for natural conversation. Built with **React**, Axiona also leverages **Supabase** to securely manage API keys.

---

## 📁 Folder Structure

```

/                       # Root directory
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── Chatbot.js            # Chat interface logic
│   │   └── ThreeJSAnimation.js   # 3D animation (three.js)
│   ├── utils/          # Utility functions
│   │   ├── supabase.js          # Supabase client and key retrieval
│   │   └── ai-sdk.js            # OpenAI SDK integration
│   ├── App.js          # Main application logic
│   └── index.js        # Entry point
├── public/             # Static assets
├── package.json        # Project config and dependencies
└── .env                # Environment variables

````

---

## ✨ Features

- 🤖 **AI Chatbot (OpenAI)**: Natural and responsive chat interface using OpenAI's `gpt-4` model via the `ai` SDK.
- 🎨 **three.js Animation**: A dynamic 3D cube that changes speed and color based on user typing activity.
- 🔐 **Supabase Integration**: Securely stores and retrieves the OpenAI API key from a Supabase backend.
- 💬 **Typing Feedback**: Real-time detection of user typing to influence the animation behavior.
- ⚡ **Fast & Responsive UI**: Built using React with live input handling and chat history.
- 🌐 **Deployment-Ready**: Clean structure ready for hosting and production builds.

---

## 🧰 Technologies Used

- **React** – UI library
- **three.js** – 3D animation rendering
- **OpenAI (via ai-sdk)** – AI language model integration
- **Supabase** – Backend-as-a-service for API key storage
- **Lodash** – Debounce utility
- **Vite / Babel / CDNs** – Build tools (depending on setup)

---

## ⚙️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/axiona.git
   cd axiona
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

---

## 🔑 API Key Handling with Supabase

* API keys are stored in a Supabase table named `api_keys`.
* The key is fetched on app initialization and used to set up the OpenAI SDK securely.
* Example fetch:

  ```js
  const { data } = await supabase.from('api_keys').select('key_value').single();
  ```

> **Note:** In production, consider securing API access further via Supabase Edge Functions or role-based policies.

---

## 🧠 Using OpenAI via AI SDK

* Axiona uses the `@ai-sdk/openai` provider.

Example:

```js
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: openai('gpt-4'),
  prompt: 'Hello! What can you do?',
});
```

---

## 🧪 Demo Behavior

* 🌀 **Animation Behavior**:

  * Typing: Cube spins faster and changes color.
  * Idle: Cube slows down.

* 🗨️ **Chat Example**:

  ```
  You: Hello!
  AI: Hi! How can I assist you today?
  ```

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

This project is licensed under the MIT License.

```

