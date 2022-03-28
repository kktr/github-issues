export interface GeneralRepoList {
    totalCount:        number;
    incompleteResults: boolean;
    items:            GeneralRepo[];
}

export interface GeneralRepo {
    id:               number;
    nodeID:           string;
    name:             string;
    fullName:         string;
    owner:            Owner;
    private:          boolean;
    htmlURL:          string;
    description:      string;
    fork:             boolean;
    url:              string;
    createdAt:        Date;
    updatedAt:        Date;
    pushedAt:         Date;
    homepage:         string;
    size:             number;
    stargazersCount:  number;
    watchersCount:    number;
    language:         string;
    forksCount:       number;
    openIssuesCount:  number;
    masterBranch:     string;
    defaultBranch:    string;
    score:            number;
    archiveURL:       string;
    assigneesURL:     string;
    blobsURL:         string;
    branchesURL:      string;
    collaboratorsURL: string;
    commentsURL:      string;
    commitsURL:       string;
    compareURL:       string;
    contentsURL:      string;
    contributorsURL:  string;
    deploymentsURL:   string;
    downloadsURL:     string;
    eventsURL:        string;
    forksURL:         string;
    gitCommitsURL:    string;
    gitRefsURL:       string;
    gitTagsURL:       string;
    gitURL:           string;
    issueCommentURL:  string;
    issueEventsURL:   string;
    issuesURL:        string;
    keysURL:          string;
    labelsURL:        string;
    languagesURL:     string;
    mergesURL:        string;
    milestonesURL:    string;
    notificationsURL: string;
    pullsURL:         string;
    releasesURL:      string;
    sshURL:           string;
    stargazersURL:    string;
    statusesURL:      string;
    subscribersURL:   string;
    subscriptionURL:  string;
    tagsURL:          string;
    teamsURL:         string;
    treesURL:         string;
    cloneURL:         string;
    mirrorURL:        string;
    hooksURL:         string;
    svnURL:           string;
    forks:            number;
    openIssues:       number;
    watchers:         number;
    hasIssues:        boolean;
    hasProjects:      boolean;
    hasPages:         boolean;
    hasWiki:          boolean;
    hasDownloads:     boolean;
    archived:         boolean;
    disabled:         boolean;
    visibility:       string;
    license:          License;
}

export interface License {
    key:     string;
    name:    string;
    url:     string;
    spdxID:  string;
    nodeID:  string;
    htmlURL: string;
}

export interface Owner {
    login:             string;
    id:                number;
    nodeID:            string;
    avatarURL:         string;
    gravatarID:        string;
    url:               string;
    receivedEventsURL: string;
    type:              string;
    htmlURL:           string;
    followersURL:      string;
    followingURL:      string;
    gistsURL:          string;
    starredURL:        string;
    subscriptionsURL:  string;
    organizationsURL:  string;
    reposURL:          string;
    eventsURL:         string;
    siteAdmin:         boolean;
}
