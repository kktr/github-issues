export interface GeneralUserList {
    totalCount?:        number;
    incompleteResults?: boolean;
    items?:             Item[];
}

export interface Item {
    login:             string;
    id:                number;
    nodeID:            string;
    avatarURL:         string;
    gravatarID:        string;
    url:               string;
    htmlURL:           string;
    followersURL:      string;
    subscriptionsURL:  string;
    organizationsURL:  string;
    reposURL:          string;
    receivedEventsURL: string;
    type:              string;
    score:             number;
    followingURL:      string;
    gistsURL:          string;
    starredURL:        string;
    eventsURL:         string;
    siteAdmin:         boolean;
}
