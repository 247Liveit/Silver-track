export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}


export enum Resource {
    Undefined = "d.e.f.a.u.l.t",
    Auth = "auth",
    Users = "users",
    UserGroups = "user-groups",
    Clients = "clients",
    Shared = "shared",
    Reports = "reports",
    Preferences = "preferences",
    Locations = "locations",
    IssueTypes = "issue-types",
    Checkpoint = "checkpoints",
    LocationShift = "location",
    Employees = "employees",
    EmployeeAvailabilities = "employee-availabilities",
    EmployeeShift = "employee-shifts",
    UserDevice = "user-devices",
    EmployeeShift_SelfSchedule = EmployeeShift + "/self-schedule",
    Map = "map",
    Issue= "issues",
}



export enum Role {
    Admin = "admin",
    TRACKER_MANAGER = "tracker_manager",
    TRACKER_READER = "tracker_reader",
    TRACKER_CLIENT = "tracker_client",
}
export const RolesNames= [{ label: "Admin", value: Role.Admin }, { label: "Manager", value: Role.TRACKER_MANAGER }, { label: "Viewer", value: Role.TRACKER_READER }, { label: "Client", value: Role.TRACKER_CLIENT }]
interface Rule {
    can: string | string[];
    cannot?: string[];
}

type RoleRules = {
    [key in Action]?: Rule;
}

type Rules = {
    [key in Role]?: RoleRules;
}

export const rules: Rules = {
    [Role.Admin]: {
        [Action.Manage]: { can: "all", },
        [Action.Create]: { can: "all", },
        [Action.Read]: { can: "all", },
        [Action.Update]: { can: "all", },
        [Action.Delete]: { can: "all", }, 
    },
    [Role.TRACKER_MANAGER]: {
        [Action.Manage]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.IssueTypes,Resource.Checkpoint,Resource.UserDevice,Resource.Shared,Resource.Reports,Resource.Map,Resource.Locations] },
        [Action.Create]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.IssueTypes,Resource.Checkpoint,Resource.UserDevice,Resource.Shared,Resource.Reports,Resource.Map,Resource.Locations] },
        [Action.Read]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.IssueTypes,Resource.Checkpoint,Resource.UserDevice,Resource.Shared,Resource.Reports,Resource.Map,Resource.Locations] },
        [Action.Update]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.IssueTypes,Resource.Checkpoint,Resource.UserDevice,Resource.Shared,Resource.Reports,Resource.Map,Resource.Locations] },
        [Action.Delete]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.IssueTypes,Resource.Checkpoint,Resource.UserDevice,Resource.Shared,Resource.Reports,Resource.Map,Resource.Locations] },
    },
    [Role.TRACKER_READER]: {
        [Action.Read]: { can: [ 
            Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared,Resource.Locations,Resource.IssueTypes,
            Resource.Checkpoint,Resource.UserDevice,Resource.Shared
        ] },
    },
    [Role.TRACKER_CLIENT]: {
        [Action.Manage]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared] },
        [Action.Create]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared] },
        [Action.Read]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared] },
        [Action.Update]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared] },
        [Action.Delete]: { can: [ Resource.Users, Resource.Preferences, Resource.Clients, Resource.Shared] },
    }, 
}

export const userCan = (userRoles: Role[], action: Action, target: string): boolean => {
    for (const role of userRoles) {
        const roleRules = rules[role]
        if (target == Resource.Undefined) {
            return false
        }
        if (!roleRules) {
            return false;
        }
        const roleActionRules = roleRules[action];
        if (!roleActionRules) {
            return false;
        }
        if ((roleActionRules.can == "all" || roleActionRules.can.includes(target)) && !roleActionRules.cannot?.includes(target)) {

            return true;
        }


    }
    return false
}