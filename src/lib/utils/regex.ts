export const absoluteLink = /^https?:\/\//;
export const specialLink = /^\w+:/;

export const doubleBraces = /\{\{([^}]+)\}\}/g;
export const brackets = /\[([^\]]+)\]/g;

export const onlyNumbers = /[^0-9]/g;
export const onlyNumbersAndForwardSlash = /[^0-9/]/g;

export const email = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
export const phone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

export const absoluteUrlGroups = /\/([\w\-.[\]]*)/;
export const diameterFormat = /([\d]*)-(inch)-([a-zA-Z]*)-(tires)/;

export const validTiresQuery = /^.+(-tires)$/;

export const searchCTACarExclusion = /Commercial|Farm|ATV\/UTV|Lawn & Garden|Trailer|Industrial|OTR|Golf|Racing/i;
