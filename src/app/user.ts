import { LocationTimeline } from "./location-timeline";

export interface User {
  userID: string;
  name: string;
  timeline: LocationTimeline[];
}