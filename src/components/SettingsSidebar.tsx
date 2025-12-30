
import React from 'react';
import { SiteElement, EditableStyle, FloatingLabel, FloatingLabelStyle } from '../types';

interface Props {
  element?: SiteElement | null;
  onUpdate?: (id: string, updates: Partial<SiteElement>) => void;
  floatingLabel?: FloatingLabel | null;
  onUpdateFloatingLabel?: (id: string, updates: Partial<FloatingLabel>) => void;
  onDeleteFloatingLabel?: (id: string) => void;
  onClose: () => void;
}

const SettingsSidebar: React.FC<Props> = ({
  element,
  onUpdate,
  floatingLabel,
  onUpdateFloatingLabel,
  onDeleteFloatingLabel,
  onClose
}) => {
  // 如果是編輯浮動標籤
  if (floatingLabel && onUpdateFloatingLabel) {
    const updateStyle = (styleUpdate: Partial<FloatingLabelStyle>) => {
      onUpdateFloatingLabel(floatingLabel.id, {
        style: { ...floatingLabel.style, ...styleUpdate }
      });
    };

    const fontSizes = [
      { label: '小', value: 'text-xs' },
      { label: '中', value: 'text-sm' },
      { label: '大', value: 'text-base' },
      { label: '特大', value: 'text-lg' },
      { label: '標題', value: 'text-xl' },
      { label: '震撼', value: 'text-2xl' },
    ];

    return (
      <div className="settings-sidebar font-sans" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b-2 border-black bg-pink-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-sans">浮動標籤設定</h2>
            <p className="text-[10px] text-pink-500 font-bold uppercase">ID: {floatingLabel.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* 文字內容 */}
          <section>
            <label className="block text-sm font-bold mb-3">標籤文字</label>
            <textarea
              value={floatingLabel.content}
              onChange={(e) => onUpdateFloatingLabel(floatingLabel.id, { content: e.target.value })}
              className="w-full h-24 p-4 border-2 border-black rounded text-base leading-relaxed focus:ring-2 focus:ring-pink-400 outline-none"
              placeholder="輸入標籤文字..."
            />
          </section>

          {/* 顏色設定 */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold">文字顏色</label>
              <input
                type="color"
                value={floatingLabel.style.color}
                onChange={(e) => updateStyle({ color: e.target.value })}
                className="w-12 h-12 cursor-pointer border-2 border-black p-1 bg-white"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold">背景顏色</label>
              <input
                type="color"
                value={floatingLabel.style.backgroundColor}
                onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                className="w-12 h-12 cursor-pointer border-2 border-black p-1 bg-white"
              />
            </div>
          </section>

          {/* 字體大小 */}
          <section>
            <label className="block text-sm font-bold mb-3">文字大小</label>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((f) => (
                <button
                  key={f.value}
                  onClick={() => updateStyle({ fontSize: f.value })}
                  className={`py-2 text-[10px] border-2 border-black font-bold ${floatingLabel.style.fontSize === f.value ? 'bg-pink-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* 文字方向 */}
          <section>
            <label className="block text-sm font-bold mb-3">文字方向</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateStyle({ writingMode: 'vertical' })}
                className={`py-3 text-sm border-2 border-black font-bold ${floatingLabel.style.writingMode === 'vertical' ? 'bg-pink-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                ↕ 直書
              </button>
              <button
                onClick={() => updateStyle({ writingMode: 'horizontal' })}
                className={`py-3 text-sm border-2 border-black font-bold ${floatingLabel.style.writingMode === 'horizontal' ? 'bg-pink-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                ↔ 橫書
              </button>
            </div>
          </section>

          {/* 位置控制 */}
          <section className="bg-pink-50 p-6 border-2 border-pink-200 rounded-xl">
            <h3 className="text-sm font-bold mb-4 text-pink-800 flex items-center gap-2">
              <span>📍</span> 位置調整
            </h3>
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-xs font-bold mb-1">
                  垂直位置 <span>{floatingLabel.style.top}%</span>
                </label>
                <input
                  type="range" min="5" max="95"
                  value={floatingLabel.style.top}
                  onChange={(e) => updateStyle({ top: parseInt(e.target.value) })}
                  className="w-full accent-pink-600"
                />
              </div>
              <div>
                <label className="flex justify-between text-xs font-bold mb-1">
                  旋轉角度 <span>{floatingLabel.style.rotation}°</span>
                </label>
                <input
                  type="range" min="-45" max="45"
                  value={floatingLabel.style.rotation}
                  onChange={(e) => updateStyle({ rotation: parseInt(e.target.value) })}
                  className="w-full accent-pink-600"
                />
              </div>
            </div>
          </section>

          {/* 刪除按鈕 */}
          {onDeleteFloatingLabel && (
            <section>
              <button
                onClick={() => {
                  if (confirm('確定要刪除這個浮動標籤嗎？')) {
                    onDeleteFloatingLabel(floatingLabel.id);
                  }
                }}
                className="w-full py-3 border-2 border-red-500 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all"
              >
                🗑 刪除此標籤
              </button>
            </section>
          )}
        </div>

        <div className="p-6 border-t-2 border-black bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
          >
            完成並儲存
          </button>
        </div>
      </div>
    );
  }

  // 原有的元素編輯邏輯
  if (!element || !onUpdate) return null;

  const updateStyle = (styleUpdate: Partial<EditableStyle>) => {
    onUpdate(element.id, {
      style: { ...element.style, ...styleUpdate }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(element.id, { content: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const fontSizes = [
    { label: '小', value: 'text-sm' },
    { label: '中', value: 'text-base' },
    { label: '大', value: 'text-xl' },
    { label: '特大', value: 'text-3xl' },
    { label: '標題', value: 'text-5xl' },
    { label: '震撼', value: 'text-8xl' },
  ];

  return (
    <div className="settings-sidebar font-sans" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 border-b-2 border-black bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-sans">元素設定</h2>
          <p className="text-[10px] text-blue-500 font-bold uppercase">ID: {element.id}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10">
        {/* 內容與圖片 */}
        <section>
          <label className="block text-sm font-bold mb-3">內容修改</label>
          {element.type === 'image' ? (
            <div className="space-y-4">
              <label className="block w-full border-2 border-dashed border-black p-4 text-center cursor-pointer hover:bg-gray-50">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <span className="text-xs font-bold">+ 選擇新圖片</span>
              </label>
              <img src={element.content} className="w-full h-40 object-contain border border-gray-200 p-2" />
            </div>
          ) : (
            <textarea
              value={element.content}
              onChange={(e) => onUpdate(element.id, { content: e.target.value })}
              className="w-full h-40 p-4 border-2 border-black rounded text-base font-chen leading-relaxed focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}
        </section>

        {/* 樣式面板 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold">文字顏色</label>
            <input
              type="color"
              value={element.style.color}
              onChange={(e) => updateStyle({ color: e.target.value })}
              className="w-12 h-12 cursor-pointer border-2 border-black p-1 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-3">預設尺寸</label>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map((f) => (
                <button
                  key={f.value}
                  onClick={() => updateStyle({ fontSize: f.value })}
                  className={`py-2 text-[10px] border-2 border-black font-bold ${element.style.fontSize === f.value ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-bold mb-2">
              旋轉角度 <span>{element.style.rotation}°</span>
            </label>
            <input
              type="range" min="-45" max="45"
              value={element.style.rotation}
              onChange={(e) => updateStyle({ rotation: parseInt(e.target.value) })}
              className="w-full accent-black"
            />
          </div>
        </section>

        {/* 位置控制 (Wix 核心) */}
        <section className="bg-blue-50 p-6 border-2 border-blue-200 rounded-xl">
          <h3 className="text-sm font-bold mb-4 text-blue-800 flex items-center gap-2">
            <span>✥</span> 自由位置調整
          </h3>
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-xs font-bold mb-1">
                水平位移 (X) <span>{element.style.xOffset}px</span>
              </label>
              <input
                type="range" min="-400" max="400"
                value={element.style.xOffset}
                onChange={(e) => updateStyle({ xOffset: parseInt(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-bold mb-1">
                垂直位移 (Y) <span>{element.style.yOffset}px</span>
              </label>
              <input
                type="range" min="-400" max="400"
                value={element.style.yOffset}
                onChange={(e) => updateStyle({ yOffset: parseInt(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="p-6 border-t-2 border-black bg-gray-50">
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95"
        >
          完成並儲存
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;
