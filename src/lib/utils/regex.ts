export const numberSlashNumber = /\d+\/\d+/;
export const stringSlashString = /\w+\/\w+/;

export const absoluteLink = /^https?:\/\//;
export const specialLink = /^\w+:/;

export const doubleBraces = /\{\{([^}]+)\}\}/g;
export const brackets = /\[([^\]]+)\]/g;

export const onlyNumbers = /[^0-9]/g;

export const email = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

export const absoluteUrlGroups = /\/([\w\-.[\]]*)/;
