export interface AboutMeItemDetails {
  description?: string;
  iconName?: string;
  timeline: boolean;
  timelineItems?: Array<TimelineItem>;
}

export interface TimelineItem {
  starting: boolean;
  ending: boolean;
  hastag: string;
  items: Array<any>;
}
