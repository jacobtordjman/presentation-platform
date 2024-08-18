// src/types/index.ts

export interface Slide {
    _id: string;
    content: string;
    presentationId: string;
  }
  
  export interface Presentation {
    _id: string;
    title: string;
    authors: string[];
    dateOfPublishment: string;
    slidesIds: Slide[];
  }
  