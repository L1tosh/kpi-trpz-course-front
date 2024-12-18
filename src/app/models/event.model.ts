export interface Event {
    title: string;
    description: string;
    startTime: string; // LocalDateTime -> string
    endTime: string;
    createTime: string;
}

export interface EventList {
    eventDtos: Event[];
}
