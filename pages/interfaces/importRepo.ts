export interface RepositoryFromGithub {
    id:                 number;
    nodeID:             string;
    name:               string;
    fullName:           string;
    owner:              Owner;
    private:            boolean;
    htmlURL:            string;
    description:        string;
    fork:               boolean;
    url:                string;
    archiveURL:         string;
    assigneesURL:       string;
    blobsURL:           string;
    branchesURL:        string;
    collaboratorsURL:   string;
    commentsURL:        string;
    commitsURL:         string;
    compareURL:         string;
    contentsURL:        string;
    contributorsURL:    string;
    deploymentsURL:     string;
    downloadsURL:       string;
    eventsURL:          string;
    forksURL:           string;
    gitCommitsURL:      string;
    gitRefsURL:         string;
    gitTagsURL:         string;
    gitURL:             string;
    issueCommentURL:    string;
    issueEventsURL:     string;
    issuesURL:          string;
    keysURL:            string;
    labelsURL:          string;
    languagesURL:       string;
    mergesURL:          string;
    milestonesURL:      string;
    notificationsURL:   string;
    pullsURL:           string;
    releasesURL:        string;
    sshURL:             string;
    stargazersURL:      string;
    statusesURL:        string;
    subscribersURL:     string;
    subscriptionURL:    string;
    tagsURL:            string;
    teamsURL:           string;
    treesURL:           string;
    cloneURL:           string;
    mirrorURL:          string;
    hooksURL:           string;
    svnURL:             string;
    homepage:           string;
    language:           null;
    forksCount:         number;
    stargazersCount:    number;
    watchersCount:      number;
    size:               number;
    defaultBranch:      string;
    open_issues_count:    number;
    isTemplate:         boolean;
    topics:             string[];
    hasIssues:          boolean;
    hasProjects:        boolean;
    hasWiki:            boolean;
    hasPages:           boolean;
    hasDownloads:       boolean;
    archived:           boolean;
    disabled:           boolean;
    visibility:         string;
    pushed_at:           Date;
    created_at:          Date;
    updated_at:          Date;
    permissions:        Permissions;
    templateRepository: null;
}

export interface Owner {
    login:             string;
    id:                number;
    nodeID:            string;
    avatarURL:         string;
    gravatarID:        string;
    url:               string;
    htmlURL:           string;
    followersURL:      string;
    followingURL:      string;
    gistsURL:          string;
    starredURL:        string;
    subscriptionsURL:  string;
    organizationsURL:  string;
    reposURL:          string;
    eventsURL:         string;
    receivedEventsURL: string;
    type:              string;
    siteAdmin:         boolean;
}

export interface Permissions {
    admin: boolean;
    push:  boolean;
    pull:  boolean;
}
