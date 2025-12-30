
export interface EditableStyle {
  fontSize: string;
  color: string;
  rotation: number;
  textAlign: 'left' | 'center' | 'right';
  xOffset: number;
  yOffset: number;
}

export interface SiteElement {
  id: string;
  type: 'text' | 'image' | 'button';
  content: string;
  style: EditableStyle;
}

// 浮動標籤專用樣式
export interface FloatingLabelStyle {
  fontSize: string;
  color: string;
  backgroundColor: string;
  rotation: number;
  top: number;      // 距離頂部的百分比 (0-100)
  writingMode: 'horizontal' | 'vertical';  // 文字方向
}

export interface FloatingLabel {
  id: string;
  content: string;
  style: FloatingLabelStyle;
}

export interface SiteData {
  hero: {
    title: SiteElement;
    subtitle: SiteElement;
    mainImage: SiteElement;
  };
  manifesto: {
    paragraphs: SiteElement[];
  };
  actions: {
    title: SiteElement;
    items: SiteElement[];
  };
  footer: {
    contact: SiteElement;
  };
  floatingLabels: FloatingLabel[];
}
