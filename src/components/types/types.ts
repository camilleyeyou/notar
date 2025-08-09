export type View = 'landing' | 'booking' | 'payment' | 'confirmation' | 'writing' | 'certified';

export interface TimeSlot {
  date: Date;
  time: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}
