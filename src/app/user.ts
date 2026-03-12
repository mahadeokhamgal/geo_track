import { LocationTimeline } from "./location-timeline";

export interface User {
  id: string;
  name: string;
  timeline: LocationTimeline[];
}
