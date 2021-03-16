export class EventData {
    event: Evt;
    data: any;
};

export enum Evt {
    NAVIGATE,
    REFRESH,
    THEME_CHANGE,
    COMMITTEE_VIEW,
    HTTP_ERROR
};
