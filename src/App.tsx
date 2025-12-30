
import React, { useState, useEffect } from 'react';
import { INITIAL_DATA, DEFAULT_FLOATING_LABEL } from './constants';
import { SiteData, SiteElement, FloatingLabel } from './types';
import EditableElement from './components/EditableElement';
import SettingsSidebar from './components/SettingsSidebar';

const App: React.FC = () => {
  const [data, setData] = useState<SiteData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [activeFloatingLabelId, setActiveFloatingLabelId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('drawme_data_v3');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveToLocal = (newData: SiteData) => {
    setData(newData);
    localStorage.setItem('drawme_data_v3', JSON.stringify(newData));
  };

  const handleUpdate = (id: string, updates: Partial<SiteElement>) => {
    const updateRecursive = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(item => item.id === id ? { ...item, ...updates } : updateRecursive(item));
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.id === id) return { ...obj, ...updates };
        const newObj: any = {};
        for (const key in obj) newObj[key] = updateRecursive(obj[key]);
        return newObj;
      }
      return obj;
    };
    const newData = updateRecursive(data);
    saveToLocal(newData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'drawme') {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('密碼錯誤！');
    }
  };

  // 浮動標籤管理函數
  const addFloatingLabel = () => {
    const newLabel: FloatingLabel = {
      ...DEFAULT_FLOATING_LABEL,
      id: `float-${Date.now()}`,
    };
    const newData = {
      ...data,
      floatingLabels: [...(data.floatingLabels || []), newLabel]
    };
    saveToLocal(newData);
    setActiveFloatingLabelId(newLabel.id);
    setActiveElementId(null);
  };

  const updateFloatingLabel = (id: string, updates: Partial<FloatingLabel>) => {
    const newLabels = (data.floatingLabels || []).map(label =>
      label.id === id ? { ...label, ...updates } : label
    );
    const newData = { ...data, floatingLabels: newLabels };
    saveToLocal(newData);
  };

  const deleteFloatingLabel = (id: string) => {
    const newLabels = (data.floatingLabels || []).filter(label => label.id !== id);
    const newData = { ...data, floatingLabels: newLabels };
    saveToLocal(newData);
    setActiveFloatingLabelId(null);
  };

  const findFloatingLabelById = (id: string): FloatingLabel | null => {
    return (data.floatingLabels || []).find(label => label.id === id) || null;
  };

  const findElementById = (id: string): SiteElement | null => {
    let found: SiteElement | null = null;
    const search = (obj: any) => {
      if (found) return;
      if (Array.isArray(obj)) obj.forEach(search);
      else if (typeof obj === 'object' && obj !== null) {
        if (obj.id === id) found = obj;
        else Object.values(obj).forEach(search);
      }
    };
    search(data);
    return found;
  };

  return (
    <div className={`min-h-screen relative ${isAdmin ? 'admin-mode-active' : ''}`}>
      {/* 後台登入/退出按鈕 */}
      <div className="fixed top-6 left-6 z-[2100]">
        {!isAdmin ? (
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-white border-2 border-black px-6 py-2 rounded-full sketch-shadow font-bold hover:bg-yellow-200 transition-colors"
          >
            🖍 後台管理
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={addFloatingLabel}
              className="bg-pink-500 text-white px-4 py-2 rounded-full sketch-shadow font-bold hover:bg-pink-600 transition-colors text-sm"
            >
              + 浮動標籤
            </button>
            <button
              onClick={() => { setIsAdmin(false); setActiveElementId(null); setActiveFloatingLabelId(null); }}
              className="bg-black text-white px-6 py-2 rounded-full sketch-shadow font-bold hover:bg-gray-800 transition-colors"
            >
              退出編輯
            </button>
          </div>
        )}
      </div>

      {/* 手繪登入視窗 */}
      {showLogin && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <form 
            onSubmit={handleLogin}
            className="bg-white sketch-border sketch-shadow p-10 max-w-sm w-full space-y-6 rotate-1"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">後台登入</h2>
              <p className="text-sm opacity-60">請輸入管理密碼以開啟編輯模式</p>
            </div>
            <input 
              type="password"
              placeholder="請輸入密碼..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-black rounded text-center text-xl outline-none focus:ring-4 focus:ring-yellow-200"
              autoFocus
            />
            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-1 bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800"
              >
                進入
              </button>
              <button 
                type="button"
                onClick={() => setShowLogin(false)}
                className="flex-1 border-2 border-black py-3 rounded-full font-bold hover:bg-gray-100"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wix 側欄設定 */}
      {isAdmin && activeElementId && (
        <SettingsSidebar
          element={findElementById(activeElementId)}
          onUpdate={handleUpdate}
          onClose={() => setActiveElementId(null)}
        />
      )}

      {/* 浮動標籤側欄設定 */}
      {isAdmin && activeFloatingLabelId && (
        <SettingsSidebar
          floatingLabel={findFloatingLabelById(activeFloatingLabelId)}
          onUpdateFloatingLabel={updateFloatingLabel}
          onDeleteFloatingLabel={deleteFloatingLabel}
          onClose={() => setActiveFloatingLabelId(null)}
        />
      )}

      {/* 浮動標籤渲染 */}
      {(data.floatingLabels || []).map(label => (
        <div
          key={label.id}
          onClick={() => {
            if (isAdmin) {
              setActiveFloatingLabelId(label.id);
              setActiveElementId(null);
            }
          }}
          className={`fixed left-0 z-[1000] cursor-pointer transition-all ${
            isAdmin ? 'hover:scale-105' : ''
          } ${activeFloatingLabelId === label.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
          style={{
            top: `${label.style.top}%`,
            transform: `rotate(${label.style.rotation}deg)`,
            writingMode: label.style.writingMode === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
            backgroundColor: label.style.backgroundColor,
            color: label.style.color,
            padding: '12px 8px',
            borderRadius: '0 8px 8px 0',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
          }}
        >
          <span className={label.style.fontSize}>{label.content}</span>
        </div>
      ))}

      {/* 主要內容區 */}
      <main className="content-area max-w-4xl mx-auto py-24 px-8">
        <div className="text-center mb-24">
          <EditableElement 
            element={data.hero.title} isAdmin={isAdmin} 
            isActive={activeElementId === data.hero.title.id}
            onClick={() => setActiveElementId(data.hero.title.id)}
            className="mb-8"
          />
          <EditableElement 
            element={data.hero.subtitle} isAdmin={isAdmin} 
            isActive={activeElementId === data.hero.subtitle.id}
            onClick={() => setActiveElementId(data.hero.subtitle.id)}
            className="mb-16"
          />
          <div className="relative inline-block bg-white p-6 sketch-border sketch-shadow rotate-1">
            <EditableElement 
              element={data.hero.mainImage} isAdmin={isAdmin} 
              isActive={activeElementId === data.hero.mainImage.id}
              onClick={() => setActiveElementId(data.hero.mainImage.id)}
            />
          </div>
        </div>

        <div className="bg-white/50 p-12 sketch-border mb-24 relative space-y-12 shadow-inner">
          <div className="absolute -top-10 left-0 text-9xl opacity-10 select-none">“</div>
          {data.manifesto.paragraphs.map(p => (
            <EditableElement 
              key={p.id} element={p} isAdmin={isAdmin} 
              isActive={activeElementId === p.id}
              onClick={() => setActiveElementId(p.id)}
            />
          ))}
          <div className="absolute -bottom-20 right-0 text-9xl opacity-10 rotate-180 select-none">“</div>
        </div>

        <div className="mb-24">
          <EditableElement 
            element={data.actions.title} isAdmin={isAdmin} 
            isActive={activeElementId === data.actions.title.id}
            onClick={() => setActiveElementId(data.actions.title.id)}
            className="text-center mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.actions.items.map((item, idx) => (
              <div key={item.id} className={`p-8 bg-white sketch-border sketch-shadow transform ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform`}>
                <EditableElement 
                  element={item} isAdmin={isAdmin} 
                  isActive={activeElementId === item.id}
                  onClick={() => setActiveElementId(item.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-24 border-t-4 border-black border-dashed">
          <div className="inline-block px-12 py-8 bg-[#FF00A0] text-white sketch-border sketch-shadow rotate-1 hover:scale-105 transition-transform">
            <EditableElement 
              element={data.footer.contact} isAdmin={isAdmin} 
              isActive={activeElementId === data.footer.contact.id}
              onClick={() => setActiveElementId(data.footer.contact.id)}
            />
          </div>
          <div className="mt-16 flex justify-center gap-6 text-xl opacity-60">
            <span>#DrawMeTaiwan</span>
            <span>#社會雕塑</span>
            <span>#溫柔視線行動</span>
          </div>
        </div>
      </main>

      {/* 裝飾背板 */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-20">
        <div className="absolute top-20 right-20 w-40 h-40 sketch-border rounded-full rotate-12"></div>
        <div className="absolute bottom-40 left-10 w-60 h-2 border-b-2 border-black -rotate-6"></div>
      </div>
    </div>
  );
};

export default App;
