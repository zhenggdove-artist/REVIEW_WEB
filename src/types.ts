
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
}
