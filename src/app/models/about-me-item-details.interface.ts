export interface AboutMeItemDetails {
  description?: string;
  iconName?: string;
  timeline: boolean;
  timelineItems?: Array<TimelineItem>;
}

export interface TimelineItem {
  hastag: string;
  title: string;
  subItems: Array<TimelineSubItem>;
}

export interface TimelineSubItem {
  title: string;
  timePeriod: string;
  description: string;
  skills: Array<string>;
}
