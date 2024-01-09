import { required } from "./rules/required.ts";
import { nullable } from "./rules/nullable.ts";
export function invalid(rule, params = {}, implicit = false) {
    return {
        rule,
        params,
        implicit
    };
}
export function optionallyValid(noContext, rule = "", params = {}, implicit = false) {
    return {
        noContext,
        rule,
        params,
        implicit
    };
}
export function isNullable(rules) {
    return rules.find((rule)=>rule === nullable) ? true : false;
}
export function isOptional(rules) {
    return rules.find((rule)=>rule === required) ? false : true;
}
export function isOptionalValue(value) {
    return value === undefined || value === null || value === "";
}
export function firstMessages(messages) {
    const results = {};
    for(let key in messages){
        const ruleNames = Object.keys(messages[key]);
        const firstRule = ruleNames[0];
        const firstMessage = messages[key][firstRule];
        if ((firstRule === "validateObject" || firstRule === "validateArray") && typeof firstMessage !== "string") {
            results[key] = firstMessages(firstMessage);
        } else {
            results[key] = firstMessage;
        }
    }
    return results;
}
export function flattenMessages(messages, firstMessagesOnly = false) {
    const flatten = (data, prefix = "")=>{
        if (typeof data !== "object") {
            return {};
        }
        let results = {};
        for(let key in data){
            const d = data[key];
            const resKey = `${prefix ? prefix + "." : ""}${key}`.replace(/\.validate(Array|Object)/g, "");
            if (typeof d === "object" && d !== null) {
                results = {
                    ...results,
                    ...flatten(d, resKey)
                };
            } else {
                results[resKey] = d;
            }
        }
        return results;
    };
    const results = {
        ...firstMessagesOnly ? {} : flatten(messages),
        ...flatten(firstMessages(messages))
    };
    return results;
}
export const resolveErrorMessage = (msg, params, attr, checkType)=>{
    params.attr = attr;
    if (typeof msg === "function") {
        return msg(params, checkType || "");
    } else {
        for(let key in params){
            msg = msg.replace(`:${key}`, params[key]);
        }
        return msg;
    }
};
export const getCheckType = (rule)=>{
    const split = rule.split(":");
    split.shift();
    return split.join(":");
};
export const findBestMessage = (messages, key, ruleName, ruleKey, defaultMessage)=>{
    return messages[`${key}.${ruleName}`] || messages[`${key}.${ruleKey}`] || messages[key] || messages[ruleName] || messages[ruleKey] || defaultMessage;
};
export const resolveErrorMessages = (rawErrors, { messages , attributes  })=>{
    const errorMessages = {};
    const defaultMessage = (messages || {})["default"] || ":attr is invalid";
    for(let key in rawErrors){
        const errs = rawErrors[key];
        const attr = (attributes || {})[key] || key;
        errorMessages[key] = {};
        for (let err of errs){
            const checkType = getCheckType(err.rule);
            // Remove checkType from err.rule
            const ruleKey = checkType ? err.rule.substr(0, err.rule.length - checkType.length - 1) : err.rule;
            if (err.rule === "validateObject" && err.params.errors) {
                errorMessages[key][ruleKey] = resolveErrorMessages(err.params.errors, {
                    messages,
                    attributes
                });
            } else if (err.rule === "validateArray" && err.params.errors) {
                errorMessages[key][ruleKey] = resolveErrorMessages(err.params.errors, {
                    messages,
                    attributes
                });
            } else {
                const msg = findBestMessage(messages || {}, key, err.rule, ruleKey, defaultMessage);
                errorMessages[key][ruleKey] = resolveErrorMessage(msg, err.params, attr, checkType);
            }
        }
    }
    return errorMessages;
};
export const isStringInt = (value)=>{
    return value.match(/^\d+$/) ? true : false;
};
export const getValue = (input, key)=>{
    if (typeof input[key] !== "undefined") {
        return input[key];
    }
    const paths = key.split(".");
    const value = paths.reduce((data, path)=>{
        if (data && typeof data === "object") {
            return data[path];
        } else if (data instanceof Array && isStringInt(path)) {
            const index = parseInt(path);
            return data[index];
        }
    }, {
        ...input
    });
    return value;
};
export const hasValue = (input, key)=>{
    const value = getValue(input, key);
    return typeof value !== "undefined";
};
export const makeValidationUtils = (input)=>{
    return {
        getValue: (key)=>getValue(input, key),
        hasValue: (key)=>hasValue(input, key)
    };
};
export const clearTimes = (date)=>{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};
export const dateChecks = (value, ruleName, customParams, fnValidator)=>{
    if (typeof value !== "string" && value instanceof Date === false) {
        return invalid(`${ruleName}:typeCheck`, {
            ...customParams,
            value
        });
    }
    if (typeof value === "string" && value.length < 10) {
        return invalid(`${ruleName}:lengthCheck`, {
            ...customParams,
            value
        });
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return invalid(`${ruleName}:dateCheck`, {
            ...customParams,
            value
        });
    }
    if (fnValidator && fnValidator(date) === false) {
        return invalid(`${ruleName}`, {
            ...customParams,
            value
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy91dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFJ1bGUsIE1lc3NhZ2VGdW5jdGlvbiwgVmFsaWRpdHkgfSBmcm9tIFwiLi90eXBlcy50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBJbnZhbGlkUGFyYW1zLFxuICBJbnZhbGlkUGF5bG9hZCxcbiAgVmFsaWRhdGlvbkVycm9ycyxcbiAgRmlyc3RNZXNzYWdlcyxcbiAgRmxhdHRlbk1lc3NhZ2VzLFxuICBSYXdWYWxpZGF0aW9uUmVzdWx0LFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbk1lc3NhZ2VzLFxuICBJbnB1dERhdGEsXG4gIFZhbGlkYXRpb25VdGlscyxcbiAgT3B0aW9uYWxWYWxpZGl0eSxcbn0gZnJvbSBcIi4vaW50ZXJmYWNlcy50c1wiO1xuaW1wb3J0IHsgcmVxdWlyZWQgfSBmcm9tIFwiLi9ydWxlcy9yZXF1aXJlZC50c1wiO1xuaW1wb3J0IHsgbnVsbGFibGUgfSBmcm9tIFwiLi9ydWxlcy9udWxsYWJsZS50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW52YWxpZChcbiAgcnVsZTogc3RyaW5nLFxuICBwYXJhbXM6IEludmFsaWRQYXJhbXMgPSB7fSxcbiAgaW1wbGljaXQgPSBmYWxzZSxcbik6IEludmFsaWRQYXlsb2FkIHtcbiAgcmV0dXJuIHsgcnVsZSwgcGFyYW1zLCBpbXBsaWNpdCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uYWxseVZhbGlkKFxuICBub0NvbnRleHQ6IGJvb2xlYW4sXG4gIHJ1bGU6IHN0cmluZyA9IFwiXCIsXG4gIHBhcmFtczogSW52YWxpZFBhcmFtcyA9IHt9LFxuICBpbXBsaWNpdDogYm9vbGVhbiA9IGZhbHNlLFxuKTogT3B0aW9uYWxWYWxpZGl0eSB7XG4gIHJldHVybiB7IG5vQ29udGV4dCwgcnVsZSwgcGFyYW1zLCBpbXBsaWNpdCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsYWJsZShydWxlczogUnVsZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiBydWxlcy5maW5kKChydWxlOiBSdWxlKSA9PiBydWxlID09PSBudWxsYWJsZSkgPyB0cnVlIDogZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09wdGlvbmFsKHJ1bGVzOiBSdWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuIHJ1bGVzLmZpbmQoKHJ1bGU6IFJ1bGUpID0+IHJ1bGUgPT09IHJlcXVpcmVkKSA/IGZhbHNlIDogdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3B0aW9uYWxWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBcIlwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RNZXNzYWdlcyhtZXNzYWdlczogVmFsaWRhdGlvbkVycm9ycyk6IEZpcnN0TWVzc2FnZXMge1xuICBjb25zdCByZXN1bHRzOiBGaXJzdE1lc3NhZ2VzID0ge307XG5cbiAgZm9yIChsZXQga2V5IGluIG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgcnVsZU5hbWVzID0gT2JqZWN0LmtleXMobWVzc2FnZXNba2V5XSk7XG4gICAgY29uc3QgZmlyc3RSdWxlID0gcnVsZU5hbWVzWzBdO1xuICAgIGNvbnN0IGZpcnN0TWVzc2FnZSA9IG1lc3NhZ2VzW2tleV1bZmlyc3RSdWxlXTtcblxuICAgIGlmIChcbiAgICAgIChmaXJzdFJ1bGUgPT09IFwidmFsaWRhdGVPYmplY3RcIiB8fCBmaXJzdFJ1bGUgPT09IFwidmFsaWRhdGVBcnJheVwiKSAmJlxuICAgICAgdHlwZW9mIGZpcnN0TWVzc2FnZSAhPT0gXCJzdHJpbmdcIlxuICAgICkge1xuICAgICAgcmVzdWx0c1trZXldID0gZmlyc3RNZXNzYWdlcyhmaXJzdE1lc3NhZ2UgYXMgVmFsaWRhdGlvbkVycm9ycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdHNba2V5XSA9IGZpcnN0TWVzc2FnZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5NZXNzYWdlcyhcbiAgbWVzc2FnZXM6IFZhbGlkYXRpb25FcnJvcnMsXG4gIGZpcnN0TWVzc2FnZXNPbmx5OiBib29sZWFuID0gZmFsc2UsXG4pOiBGbGF0dGVuTWVzc2FnZXMge1xuICBjb25zdCBmbGF0dGVuID0gKGRhdGE6IGFueSwgcHJlZml4OiBzdHJpbmcgPSBcIlwiKTogRmxhdHRlbk1lc3NhZ2VzID0+IHtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0czogRmxhdHRlbk1lc3NhZ2VzID0ge307XG4gICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgIGNvbnN0IGQgPSBkYXRhW2tleV07XG4gICAgICBjb25zdCByZXNLZXkgPSBgJHtwcmVmaXggPyBwcmVmaXggKyBcIi5cIiA6IFwiXCJ9JHtrZXl9YC5yZXBsYWNlKFxuICAgICAgICAvXFwudmFsaWRhdGUoQXJyYXl8T2JqZWN0KS9nLFxuICAgICAgICBcIlwiLFxuICAgICAgKTtcbiAgICAgIGlmICh0eXBlb2YgZCA9PT0gXCJvYmplY3RcIiAmJiBkICE9PSBudWxsKSB7XG4gICAgICAgIHJlc3VsdHMgPSB7IC4uLnJlc3VsdHMsIC4uLmZsYXR0ZW4oZCwgcmVzS2V5KSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0c1tyZXNLZXldID0gZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgY29uc3QgcmVzdWx0czogRmxhdHRlbk1lc3NhZ2VzID0ge1xuICAgIC4uLihmaXJzdE1lc3NhZ2VzT25seSA/IHt9IDogZmxhdHRlbihtZXNzYWdlcykpLFxuICAgIC4uLmZsYXR0ZW4oZmlyc3RNZXNzYWdlcyhtZXNzYWdlcykpLFxuICB9O1xuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5leHBvcnQgY29uc3QgcmVzb2x2ZUVycm9yTWVzc2FnZSA9IChcbiAgbXNnOiBzdHJpbmcgfCBNZXNzYWdlRnVuY3Rpb24sXG4gIHBhcmFtczogSW52YWxpZFBhcmFtcyxcbiAgYXR0cjogc3RyaW5nLFxuICBjaGVja1R5cGU/OiBzdHJpbmcsXG4pOiBzdHJpbmcgPT4ge1xuICBwYXJhbXMuYXR0ciA9IGF0dHI7XG5cbiAgaWYgKHR5cGVvZiBtc2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBtc2cocGFyYW1zLCBjaGVja1R5cGUgfHwgXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQga2V5IGluIHBhcmFtcykge1xuICAgICAgbXNnID0gbXNnLnJlcGxhY2UoYDoke2tleX1gLCBwYXJhbXNba2V5XSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBtc2c7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDaGVja1R5cGUgPSAocnVsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc3BsaXQgPSBydWxlLnNwbGl0KFwiOlwiKTtcbiAgc3BsaXQuc2hpZnQoKTtcblxuICByZXR1cm4gc3BsaXQuam9pbihcIjpcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEJlc3RNZXNzYWdlID0gKFxuICBtZXNzYWdlczogVmFsaWRhdGlvbk1lc3NhZ2VzLFxuICBrZXk6IHN0cmluZyxcbiAgcnVsZU5hbWU6IHN0cmluZyxcbiAgcnVsZUtleTogc3RyaW5nLFxuICBkZWZhdWx0TWVzc2FnZTogc3RyaW5nIHwgTWVzc2FnZUZ1bmN0aW9uLFxuKTogc3RyaW5nIHwgTWVzc2FnZUZ1bmN0aW9uID0+IHtcbiAgcmV0dXJuIChcbiAgICBtZXNzYWdlc1tgJHtrZXl9LiR7cnVsZU5hbWV9YF0gfHxcbiAgICBtZXNzYWdlc1tgJHtrZXl9LiR7cnVsZUtleX1gXSB8fFxuICAgIG1lc3NhZ2VzW2tleV0gfHxcbiAgICBtZXNzYWdlc1tydWxlTmFtZV0gfHxcbiAgICBtZXNzYWdlc1tydWxlS2V5XSB8fFxuICAgIGRlZmF1bHRNZXNzYWdlXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZUVycm9yTWVzc2FnZXMgPSAoXG4gIHJhd0Vycm9yczogUmF3VmFsaWRhdGlvblJlc3VsdCxcbiAgeyBtZXNzYWdlcywgYXR0cmlidXRlcyB9OiBWYWxpZGF0aW9uT3B0aW9ucyxcbik6IFZhbGlkYXRpb25FcnJvcnMgPT4ge1xuICBjb25zdCBlcnJvck1lc3NhZ2VzOiBWYWxpZGF0aW9uRXJyb3JzID0ge307XG4gIGNvbnN0IGRlZmF1bHRNZXNzYWdlID0gKG1lc3NhZ2VzIHx8IHt9KVtcImRlZmF1bHRcIl0gfHwgXCI6YXR0ciBpcyBpbnZhbGlkXCI7XG4gIGZvciAobGV0IGtleSBpbiByYXdFcnJvcnMpIHtcbiAgICBjb25zdCBlcnJzID0gcmF3RXJyb3JzW2tleV0gYXMgSW52YWxpZFBheWxvYWRbXTtcbiAgICBjb25zdCBhdHRyID0gKGF0dHJpYnV0ZXMgfHwge30pW2tleV0gfHwga2V5O1xuXG4gICAgZXJyb3JNZXNzYWdlc1trZXldID0ge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIH07XG5cbiAgICBmb3IgKGxldCBlcnIgb2YgZXJycykge1xuICAgICAgY29uc3QgY2hlY2tUeXBlID0gZ2V0Q2hlY2tUeXBlKGVyci5ydWxlKTtcblxuICAgICAgLy8gUmVtb3ZlIGNoZWNrVHlwZSBmcm9tIGVyci5ydWxlXG4gICAgICBjb25zdCBydWxlS2V5ID0gY2hlY2tUeXBlXG4gICAgICAgID8gZXJyLnJ1bGUuc3Vic3RyKDAsIGVyci5ydWxlLmxlbmd0aCAtIGNoZWNrVHlwZS5sZW5ndGggLSAxKVxuICAgICAgICA6IGVyci5ydWxlO1xuXG4gICAgICBpZiAoZXJyLnJ1bGUgPT09IFwidmFsaWRhdGVPYmplY3RcIiAmJiBlcnIucGFyYW1zLmVycm9ycykge1xuICAgICAgICBlcnJvck1lc3NhZ2VzW2tleV1bcnVsZUtleV0gPSByZXNvbHZlRXJyb3JNZXNzYWdlcyhlcnIucGFyYW1zLmVycm9ycywge1xuICAgICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChlcnIucnVsZSA9PT0gXCJ2YWxpZGF0ZUFycmF5XCIgJiYgZXJyLnBhcmFtcy5lcnJvcnMpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlc1trZXldW3J1bGVLZXldID0gcmVzb2x2ZUVycm9yTWVzc2FnZXMoZXJyLnBhcmFtcy5lcnJvcnMsIHtcbiAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICBhdHRyaWJ1dGVzLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGZpbmRCZXN0TWVzc2FnZShcbiAgICAgICAgICBtZXNzYWdlcyB8fCB7fSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgZXJyLnJ1bGUsXG4gICAgICAgICAgcnVsZUtleSxcbiAgICAgICAgICBkZWZhdWx0TWVzc2FnZSxcbiAgICAgICAgKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlc1trZXldW3J1bGVLZXldID0gcmVzb2x2ZUVycm9yTWVzc2FnZShcbiAgICAgICAgICBtc2csXG4gICAgICAgICAgZXJyLnBhcmFtcyxcbiAgICAgICAgICBhdHRyLFxuICAgICAgICAgIGNoZWNrVHlwZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTdHJpbmdJbnQgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gdmFsdWUubWF0Y2goL15cXGQrJC8pID8gdHJ1ZSA6IGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKGlucHV0OiBJbnB1dERhdGEsIGtleTogc3RyaW5nKTogYW55ID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dFtrZXldICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIGlucHV0W2tleV07XG4gIH1cblxuICBjb25zdCBwYXRocyA9IGtleS5zcGxpdChcIi5cIik7XG4gIGNvbnN0IHZhbHVlID0gcGF0aHMucmVkdWNlKFxuICAgIChkYXRhOiBhbnksIHBhdGg6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZGF0YVtwYXRoXTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGlzU3RyaW5nSW50KHBhdGgpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQocGF0aCk7XG4gICAgICAgIHJldHVybiBkYXRhW2luZGV4XTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgLi4uaW5wdXQgfSxcbiAgKTtcblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgaGFzVmFsdWUgPSAoaW5wdXQ6IElucHV0RGF0YSwga2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShpbnB1dCwga2V5KTtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlVmFsaWRhdGlvblV0aWxzID0gKGlucHV0OiBJbnB1dERhdGEpOiBWYWxpZGF0aW9uVXRpbHMgPT4ge1xuICByZXR1cm4ge1xuICAgIGdldFZhbHVlOiAoa2V5OiBzdHJpbmcpOiBhbnkgPT4gZ2V0VmFsdWUoaW5wdXQsIGtleSksXG4gICAgaGFzVmFsdWU6IChrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4gaGFzVmFsdWUoaW5wdXQsIGtleSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJUaW1lcyA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZShcbiAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgZGF0ZS5nZXRNb250aCgpLFxuICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgZGF0ZUNoZWNrcyA9IChcbiAgdmFsdWU6IGFueSxcbiAgcnVsZU5hbWU6IHN0cmluZyxcbiAgY3VzdG9tUGFyYW1zPzogSW52YWxpZFBhcmFtcyxcbiAgZm5WYWxpZGF0b3I/OiAoZGF0ZTogRGF0ZSkgPT4gYm9vbGVhbixcbik6IFZhbGlkaXR5ID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGludmFsaWQoYCR7cnVsZU5hbWV9OnR5cGVDaGVja2AsIHsgLi4uY3VzdG9tUGFyYW1zLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubGVuZ3RoIDwgMTApIHtcbiAgICByZXR1cm4gaW52YWxpZChgJHtydWxlTmFtZX06bGVuZ3RoQ2hlY2tgLCB7IC4uLmN1c3RvbVBhcmFtcywgdmFsdWUgfSk7XG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuIGludmFsaWQoYCR7cnVsZU5hbWV9OmRhdGVDaGVja2AsIHsgLi4uY3VzdG9tUGFyYW1zLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIGlmIChmblZhbGlkYXRvciAmJiBmblZhbGlkYXRvcihkYXRlKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gaW52YWxpZChgJHtydWxlTmFtZX1gLCB7IC4uLmN1c3RvbVBhcmFtcywgdmFsdWUgfSk7XG4gIH1cbn07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0EsU0FBUyxRQUFRLFFBQVEs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