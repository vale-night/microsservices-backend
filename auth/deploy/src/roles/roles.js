"use strict";
exports.__esModule = true;
exports.ORGANIZER_USER_ROLES = exports.CLIENT_USER_ROLES = void 0;
exports.CLIENT_USER_ROLES = [
    {
        resource: 'USERS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
    {
        resource: 'FILES',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
    {
        resource: 'EVENTS',
        permissions: ['READ_MANY',]
    },
];
exports.ORGANIZER_USER_ROLES = [
    {
        resource: 'USERS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
    {
        resource: 'FILES',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
    {
        resource: 'EVENTS',
        permissions: ['READ_SELF', 'INSERT', 'UPDATE_SELF', 'DELETE_SELF']
    },
];
