export interface Topic {
  id: string;
  name: string;
  weight: number;
  completed: boolean;
  completionDate?: number;
}

export interface Subject {
  id: string;
  name: string;
  totalWeight: number;
  topics: Topic[];
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    '--bg-color-start': string;
    '--bg-color-mid': string;
    '--bg-color-end': string;
    '--accent-gradient': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--text-accent': string;
    '--text-on-accent': string;
    '--card-bg': string;
    '--card-border': string;
    '--card-hover-bg': string;
    '--card-hover-border': string;
    '--header-bg': string;
    '--header-border': string;
    '--progress-track-bg': string;
    '--checkbox-bg': string;
    '--checkbox-border': string;
  };
}