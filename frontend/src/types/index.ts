// src/types/index.ts

export interface Slide {
    content: string;
    presentationId: string;
    _id: string;
  }
  
  export interface Presentation {
    _id: string;
    title: string;
    authors: string[];
    dateOfPublishment: string;
    slidesIds: Slide[];
  }
  