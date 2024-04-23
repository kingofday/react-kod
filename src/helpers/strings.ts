export function mergeClasses(classes: ((string|undefined) | [boolean, string])[]) {
    return classes.filter(x =>typeof x !== "undefined" && ((typeof x === "string" && !!x.trim()) || (typeof x !== "string" && !!(x as [boolean,string])[0])))
      .map(x => typeof x === "string" ? x : (x as [boolean,string])[1]).join(" ");
  }