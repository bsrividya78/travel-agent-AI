export interface TripInquiry {
  name: string;
  email: string;
  startingPoint: string;
  destination: string;
  travelStyle: string;
  travelers: string;
  travelDates: string;
  notes?: string;
}

export interface SubmissionResponse {
  success: boolean;
  status?: number;
  message: string;
  error?: string;
  data?: {
    name: string;
    email: string;
    startingPoint: string;
    destination: string;
    travelStyle: string;
    submittedAt: string;
  };
}

export interface CuratedJourney {
  id: string;
  title: string;
  region: string;
  duration: string;
  startingPoint: string;
  destination: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  description: string;
}
