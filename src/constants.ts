
import { SiteData, FloatingLabel } from './types';

// 預設浮動標籤
export const DEFAULT_FLOATING_LABEL: FloatingLabel = {
  id: '',
  content: '新標籤',
  style: {
    fontSize: 'text-sm',
    color: '#FFFFFF',
    backgroundColor: '#FF00A0',
    rotation: 0,
    top: 50,
    writingMode: 'vertical'
  }
};

export const INITIAL_DATA: SiteData = {
  hero: {
    title: {
      id: 'hero-title',
      type: 'text',
      content: 'DRAW ME TAIWAN',
      style: { fontSize: 'text-7xl', color: '#FF00A0', rotation: -2, textAlign: 'center', xOffset: 0, yOffset: 0 }
    },
    subtitle: {
      id: 'hero-subtitle',
      type: 'text',
      content: '溫柔視線行動 - 讓我們重新練習『看見』人。',
      style: { fontSize: 'text-2xl', color: '#000000', rotation: 1, textAlign: 'center', xOffset: 0, yOffset: 0 }
    },
    mainImage: {
      id: 'hero-image',
      type: 'image',
      content: 'https://picsum.photos/seed/drawme/800/800',
      style: { fontSize: '', color: '', rotation: 0, textAlign: 'center', xOffset: 0, yOffset: 0 }
    }
  },
  manifesto: {
    paragraphs: [
      {
        id: 'p1',
        type: 'text',
        content: '最近搭捷運時，你是否也感覺到了那股緊繃？身為一個藝術家看到整個台灣社會，開始草木皆兵的狀態相當難受。',
        style: { fontSize: 'text-xl', color: '#000000', rotation: 0, textAlign: 'left', xOffset: 0, yOffset: 0 }
      },
      {
        id: 'p2',
        type: 'text',
        content: '我希望人們開始尋找的不是敵人，而是有趣的經歷與朋友、夥伴。',
        style: { fontSize: 'text-xl', color: '#000000', rotation: 0.5, textAlign: 'left', xOffset: 0, yOffset: 0 }
      },
      {
        id: 'p3',
        type: 'text',
        content: '這不是繪畫比賽，這是一個整體社會關於「看見」的重新練習。當我們願意花 5 分鐘去觀察一個陌生人，我們就無法再把對方視為冰冷的「威脅」。',
        style: { fontSize: 'text-xl', color: '#000000', rotation: -0.5, textAlign: 'left', xOffset: 0, yOffset: 0 }
      }
    ]
  },
  actions: {
    title: {
      id: 'actions-title',
      type: 'text',
      content: '🖍 如何參與？',
      style: { fontSize: 'text-4xl', color: '#000000', rotation: 1, textAlign: 'center', xOffset: 0, yOffset: 0 }
    },
    items: [
      {
        id: 'a1',
        type: 'text',
        content: '🔹 索取胸章：我將自費製作並發送，索取地點整理於此。',
        style: { fontSize: 'text-lg', color: '#000000', rotation: 0, textAlign: 'left', xOffset: 0, yOffset: 0 }
      },
      {
        id: 'a2',
        type: 'text',
        content: '🔹 自行列印：我無償公開圖檔，歡迎自行下載列印。',
        style: { fontSize: 'text-lg', color: '#000000', rotation: 1, textAlign: 'left', xOffset: 0, yOffset: 0 }
      },
      {
        id: 'a3',
        type: 'text',
        content: '🔹 開始觀察：放下手機，拿起筆。上傳 Tag #DrawMeTaiwan。',
        style: { fontSize: 'text-lg', color: '#000000', rotation: -1, textAlign: 'left', xOffset: 0, yOffset: 0 }
      }
    ]
  },
  footer: {
    contact: {
      id: 'footer-contact',
      type: 'text',
      content: '12/28 週日 台北車站快閃行動，聯絡 GGdove 參與。',
      style: { fontSize: 'text-lg', color: '#FFFFFF', rotation: 0, textAlign: 'center', xOffset: 0, yOffset: 0 }
    }
  },
  floatingLabels: [
    {
      id: 'float-1',
      content: '溫柔視線行動',
      style: {
        fontSize: 'text-sm',
        color: '#FFFFFF',
        backgroundColor: '#FF00A0',
        rotation: 0,
        top: 30,
        writingMode: 'vertical'
      }
    }
  ]
};
