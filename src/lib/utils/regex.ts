export const numberSlashNumber = /\d+\/\d+/;
export const dateNumbersBetweenSlashes = /(((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))[-/]?[0-9]{4}|02[-/]?29[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))/;
export const stringSlashString = /\w+\/\w+/;

export const absoluteLink = /^https?:\/\//;
export const specialLink = /^\w+:/;

export const doubleBraces = /\{\{([^}]+)\}\}/g;
export const brackets = /\[([^\]]+)\]/g;

export const onlyNumbers = /[^0-9]/g;
export const onlyNumbersAndForwardSlash = /[^0-9/]/g;

export const email = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

export const absoluteUrlGroups = /\/([\w\-.[\]]*)/;
export const diameterFormat = /([\d]*)-(inch)-([a-zA-Z]*)-(tires)/;

export const validBrandQuery = /^.+(-tires)$/;
