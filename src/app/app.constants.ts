export class EventData {
    event: Evt;
    data: any;
};

export enum Evt {
    NAVIGATE,
    THEME_CHANGE,
    COMMITTEE_VIEW,
    HTTP_ERROR
};
