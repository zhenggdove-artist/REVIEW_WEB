
import React from 'react';
import { SiteElement } from '../types';

interface Props {
  element: SiteElement;
  isAdmin: boolean;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const EditableElement: React.FC<Props> = ({ element, isAdmin, isActive, onClick, className }) => {
  const styleObj: React.CSSProperties = {
    color: element.style.color,
    transform: `translate(${element.style.xOffset}px, ${element.style.yOffset}px) rotate(${element.style.rotation}deg)`,
    textAlign: element.style.textAlign,
    position: 'relative',
    cursor: isAdmin ? 'pointer' : 'default',
    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: isActive ? 50 : 1,
  };

  return (
    <div 
      className={`relative group ${className} ${isAdmin ? 'hover:outline-blue-400 hover:outline-2' : ''} ${isActive ? 'wix-active-box' : ''}`}
      style={styleObj}
      onClick={(e) => {
        if (isAdmin) {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {element.type === 'image' ? (
        <img 
          src={element.content} 
          className="mx-auto block w-full h-auto max-w-full object-contain pointer-events-none"
          alt="Content"
        />
      ) : (
        <div className={`${element.style.fontSize} font-bold leading-relaxed whitespace-pre-wrap pointer-events-none`}>
          {element.content}
        </div>
      )}
      
      {isAdmin && (
        <div className={`absolute -top-7 left-0 bg-blue-500 text-white text-[10px] px-2 py-1 font-sans font-bold uppercase transition-opacity ${isActive || 'opacity-0 group-hover:opacity-100'}`}>
          {isActive ? '正在編輯' : '點擊修改'}
        </div>
      )}
    </div>
  );
};

export default EditableElement;
