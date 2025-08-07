# sirv-uploader-lib

A reusable React + TypeScript component for uploading files to [Sirv.com](https://sirv.com) storage with drag-and-drop, progress tracking, and multi-file support.\
Perfect for Next.js + TailwindCSS projects.
---

## ✨ Features

- 🚀 **Plug-and-Play**: Drop it into your Next.js or React app and start uploading.
- 📁 **Drag & Drop** or click to select files.
- 📊 **Progress Tracking** with visual indicators.
- 🎯 **Multiple File Types**: Images, PDFs, documents, spreadsheets, and more.
- 🔑 **Sirv.com API Integration** with automatic token handling.
- 📱 **Responsive**: Works on all devices.
- ⚡ **Fast**: Lightweight build with no heavy dependencies.

---

## 📦 Installation

```bash
npm install sirv-uploader-lib
# or
yarn add sirv-uploader-lib
# or
pnpm add sirv-uploader-lib
```

---

## 🔑 Prerequisites

- **Node.js 18+**
- A **Sirv.com** account with API access.
- Your **Client ID** and **Client Secret** from the [Sirv API settings](https://my.sirv.com/account/api).

---

## ⚙️ Usage

1. Set your Sirv credentials in `.env.local` (for example in a Next.js app):

```env
NEXT_PUBLIC_SIRV_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_SIRV_CLIENT_SECRET=your_client_secret_here
```

2. Import and use the component:

```tsx
"use client";

import { SirvUploader } from "sirv-uploader-lib";

export default function Page() {
  return (
    <SirvUploader
      clientId={process.env.NEXT_PUBLIC_SIRV_CLIENT_ID!}
      clientSecret={process.env.NEXT_PUBLIC_SIRV_CLIENT_SECRET!}
      uploadPath="/docs/"
    />
  );
}
```

---

## 🖥️ Props

| Prop           | Type   | Description                                                             | Required |
| -------------- | ------ | ----------------------------------------------------------------------- | -------- |
| `clientId`     | string | Your Sirv.com **Client ID**                                             | ✅        |
| `clientSecret` | string | Your Sirv.com **Client Secret**                                         | ✅        |
| `uploadPath`   | string | Path inside your Sirv bucket where files will be stored (e.g. `/docs/`) | ✅        |

---

## 📂 Supported File Types

- Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`
- Documents: `.pdf`, `.doc`, `.docx`
- Spreadsheets: `.xls`, `.xlsx`
- Text: `.txt`, `.md`, `.csv`

---

## 🔄 How It Works

1. The component requests an **access token** from the Sirv API using your `clientId` and `clientSecret`.
2. Files are uploaded directly to Sirv’s `/v2/files/upload` endpoint.
3. Real-time progress is displayed for each file.

---

## 🛠 Technologies

- **React / Next.js**
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui** components
- **react-dropzone** for drag-and-drop
- **Lucide React** for icons

---

## 📜 License

MIT © [Mainor Aguilar](https://nor01.com)

---

\


