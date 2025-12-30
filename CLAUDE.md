# DrawMeTaiwan - 專案說明文件

> 此文件供 Claude Code 快速理解專案結構與開發情境

## 專案概述

**專案名稱**: DrawMeTaiwan - 溫柔視線行動
**類型**: 單頁應用網站 (SPA)
**描述**: 發起於北捷事件後的社會雕塑行動，透過速寫重新練習「看見」彼此的溫度。支持全站文字與圖片即時編輯的手寫感網頁。

## 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| React | 19.2.3 | UI 框架 |
| TypeScript | ~5.8.2 | 類型安全 |
| Vite | 6.2.0 | 構建工具 |
| Tailwind CSS | CDN | 樣式框架 |

## 目錄結構

```
REVIEW_WEB/
├── src/                    # 開發源代碼 (主要工作目錄)
│   ├── App.tsx             # 主應用組件 - 狀態管理與頁面佈局
│   ├── index.tsx           # React 入口
│   ├── index.html          # HTML 模板 (含全局樣式)
│   ├── types.ts            # TypeScript 類型定義
│   ├── constants.ts        # 初始數據與常量
│   ├── components/
│   │   ├── EditableElement.tsx   # 可編輯元素組件
│   │   └── SettingsSidebar.tsx   # 設定側欄組件
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docs/                   # 構建輸出目錄 (GitHub Pages)
│   ├── assets/             # 靜態資源 (圖片)
│   └── *.ttf/*.otf         # 字體文件
│
└── fonts/                  # 字體源文件
```

## 核心功能

### 1. 內容編輯系統
- 點擊任何元素進行即時編輯
- 支持：文字編輯、圖片上傳、顏色調整、旋轉、位置偏移、字體大小
- 編輯資料自動存入 localStorage (key: `drawme_data_v3`)

### 2. 後台管理
- 進入方式：點擊左上角「後台管理」
- 密碼：`drawme`
- 管理模式下顯示 Wix 風格編輯側欄

### 3. 浮動標籤系統
- 左側固定顯示的文字標籤
- 後台可新增、編輯、刪除標籤
- 可調整：文字內容、文字顏色、背景顏色、字體大小、垂直位置、旋轉角度、文字方向（直書/橫書）

### 4. 頁面結構
```
Hero 區塊      → 主標題 "DRAW ME TAIWAN" + 主圖片
Manifesto 區塊 → 3段文字宣言
Actions 區塊   → 3個參與方式卡片
Footer 區塊    → 聯絡資訊與標籤
```

## 關鍵檔案說明

| 檔案 | 職責 |
|------|------|
| `src/App.tsx` | 主容器、狀態管理、handleUpdate() 遞歸更新函數 |
| `src/components/EditableElement.tsx` | 統一渲染文字/圖片元素，應用 transform |
| `src/components/SettingsSidebar.tsx` | 編輯面板 UI，處理樣式控制與圖片上傳 |
| `src/types.ts` | EditableStyle, SiteElement, SiteData 類型定義 |
| `src/constants.ts` | 初始網站數據 (INITIAL_DATA) |

## 數據結構

```typescript
interface SiteData {
  hero: { title, subtitle, mainImage: SiteElement };
  manifesto: { paragraphs: SiteElement[] };
  actions: { title: SiteElement, items: { title, description }[] };
  footer: { contact: SiteElement };
  floatingLabels: FloatingLabel[];  // 左側浮動標籤
}

interface EditableStyle {
  fontSize: string;    // Tailwind CSS 類名
  color: string;       // hex 顏色
  rotation: number;    // 旋轉度數
  xOffset: number;     // X 軸偏移 (px)
  yOffset: number;     // Y 軸偏移 (px)
}

interface FloatingLabel {
  id: string;
  content: string;
  style: FloatingLabelStyle;
}

interface FloatingLabelStyle {
  fontSize: string;           // Tailwind CSS 類名
  color: string;              // 文字顏色
  backgroundColor: string;    // 背景顏色
  rotation: number;           // 旋轉度數
  top: number;                // 垂直位置 (0-100%)
  writingMode: 'horizontal' | 'vertical';  // 文字方向
}
```

## 常用指令

```bash
# 進入開發目錄
cd src

# 安裝依賴
npm install

# 啟動開發伺服器 (http://localhost:3000)
npm run dev

# 構建到 docs/ 目錄
npm run build

# 預覽構建結果
npm run preview
```

## 部署

- **平台**: GitHub Pages
- **來源**: `docs/` 目錄
- **Base URL**: `/REVIEW_WEB/`
- 構建後直接 push 到 main 分支即可自動部署

## 設計特點

- **手寫美學**: sketch-border 邊框、微妙旋轉角度
- **四種自定義字體**: ChenYuluoyan (中文手寫)、GamaHand、GarmentDistrict、Streetwear
- **無後端**: 純前端 + localStorage 存儲

## 開發注意事項

1. 所有編輯功能需在管理模式 (isAdmin=true) 下才能使用
2. 圖片上傳使用 FileReader 轉為 base64 DataURL
3. 元素更新使用遞歸函數 `handleUpdate()` 處理嵌套結構
4. 樣式使用 Tailwind CSS，自定義樣式在 index.html 的 `<style>` 標籤中

## 環境變數

```env
# src/.env.local
GEMINI_API_KEY=your_api_key  # (目前未使用)
```
