export type RESOURCES = 'FILES' | 'EVENTS' | 'USERS';
export type PERMISSIONS = 'READ_SELF' | 'READ_MANY' | 'INSERT' | 'UPDATE_SELF' | 'UPDATE_MANY' | 'DELETE_SELF' | 'DELETE_MANY';

export interface Role {
    resource: RESOURCES,
    permissions: Array<PERMISSIONS>
}

export const CLIENT_USER_ROLES: Array<Role> = [
    {
        resource: 'USERS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF','DELETE_SELF']
    },
    {
        resource: 'FILES',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF','DELETE_SELF']
    },
    {
        resource: 'EVENTS',
        permissions: ['READ_MANY',]
    },
]


export const ORGANIZER_USER_ROLES: Array<Role> = [
    {
        resource: 'USERS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF','DELETE_SELF']
    },
    {
        resource: 'FILES',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF','DELETE_SELF']
    },
    {
        resource: 'EVENTS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
]