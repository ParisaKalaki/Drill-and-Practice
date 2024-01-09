import { isOptional, isOptionalValue, resolveErrorMessages, isNullable, makeValidationUtils } from "./utils.ts";
import { defaultMessages } from "./messages.ts";
const getValue = (input, key)=>{
    return input[key];
};
const optionallyRequired = new Set([
    "requiredWhenRule",
    "requiredIfRule",
    "requiredUnlessRule"
]);
export const validateValue = async (value, rules, utils)=>{
    const results = [];
    if (isOptionalValue(value) && isOptional(rules)) {
        const optionallyRequiredRules = rules.filter((r)=>optionallyRequired.has(r.name));
        if (optionallyRequiredRules.length === 0) {
            return [];
        }
        for (let rule of rules.filter((r)=>optionallyRequired.has(r.name))){
            let res = rule(value, utils);
            if (res instanceof Promise) {
                res = await res;
            }
            if (res !== undefined && res.noContext) {
                return [];
            }
            if (res !== undefined) {
                results.push(res);
                if (res.implicit) {
                    return results;
                }
            }
        }
        rules = rules.filter((r)=>!optionallyRequired.has(r.name));
    }
    if (typeof value === "object" && value === null && isNullable(rules)) {
        return [];
    }
    for (let rule1 of rules){
        let res1 = rule1(value, utils);
        if (res1 instanceof Promise) {
            res1 = await res1;
        }
        if (res1 !== undefined && !res1.noContext) {
            results.push(res1);
            if (res1.implicit === true) {
                break;
            }
        }
    }
    return results;
};
export const validateData = async (input, rules)=>{
    const results = {};
    const utils = makeValidationUtils(input);
    for(let key in rules){
        const keyRules = rules[key] instanceof Array ? rules[key] : [
            rules[key]
        ];
        const value = getValue(input, key);
        const errors = await validateValue(value, keyRules, utils);
        if (errors.length) {
            results[key] = errors;
        }
    }
    return results;
};
export const validate = async (input, rules, options = {
    messages: defaultMessages
})=>{
    const rawErrors = await validateData(input, rules);
    const passes = Object.keys(rawErrors).length === 0;
    const errors = passes ? {} : resolveErrorMessages(rawErrors, options);
    return [
        passes,
        errors
    ];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy92YWxpZGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkYXRpb25SZXN1bHQsIFJ1bGUsIFZhbGlkaXR5IH0gZnJvbSBcIi4vdHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgVmFsaWRhdGlvblJ1bGVzLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgUmF3VmFsaWRhdGlvblJlc3VsdCxcbiAgSW5wdXREYXRhLFxuICBJbnZhbGlkUGF5bG9hZCxcbiAgVmFsaWRhdGlvblV0aWxzLFxuICBPcHRpb25hbFZhbGlkaXR5LFxufSBmcm9tIFwiLi9pbnRlcmZhY2VzLnRzXCI7XG5pbXBvcnQge1xuICBpc09wdGlvbmFsLFxuICBpc09wdGlvbmFsVmFsdWUsXG4gIHJlc29sdmVFcnJvck1lc3NhZ2VzLFxuICBpc051bGxhYmxlLFxuICBtYWtlVmFsaWRhdGlvblV0aWxzLFxufSBmcm9tIFwiLi91dGlscy50c1wiO1xuaW1wb3J0IHsgZGVmYXVsdE1lc3NhZ2VzIH0gZnJvbSBcIi4vbWVzc2FnZXMudHNcIjtcblxuY29uc3QgZ2V0VmFsdWUgPSAoaW5wdXQ6IElucHV0RGF0YSwga2V5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICByZXR1cm4gaW5wdXRba2V5XTtcbn07XG5cbmNvbnN0IG9wdGlvbmFsbHlSZXF1aXJlZCA9IG5ldyBTZXQoW1xuICBcInJlcXVpcmVkV2hlblJ1bGVcIixcbiAgXCJyZXF1aXJlZElmUnVsZVwiLFxuICBcInJlcXVpcmVkVW5sZXNzUnVsZVwiLFxuXSk7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVZhbHVlID0gYXN5bmMgKFxuICB2YWx1ZTogYW55LFxuICBydWxlczogUnVsZVtdLFxuICB1dGlsczogVmFsaWRhdGlvblV0aWxzLFxuKTogUHJvbWlzZTxJbnZhbGlkUGF5bG9hZFtdPiA9PiB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgaWYgKGlzT3B0aW9uYWxWYWx1ZSh2YWx1ZSkgJiYgaXNPcHRpb25hbChydWxlcykpIHtcbiAgICBjb25zdCBvcHRpb25hbGx5UmVxdWlyZWRSdWxlcyA9IHJ1bGVzLmZpbHRlcigocikgPT5cbiAgICAgIG9wdGlvbmFsbHlSZXF1aXJlZC5oYXMoci5uYW1lKVxuICAgICk7XG4gICAgaWYgKG9wdGlvbmFsbHlSZXF1aXJlZFJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVzLmZpbHRlcigocikgPT4gb3B0aW9uYWxseVJlcXVpcmVkLmhhcyhyLm5hbWUpKSkge1xuICAgICAgbGV0IHJlcyA9IHJ1bGUodmFsdWUsIHV0aWxzKTtcbiAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJlcyA9IGF3YWl0IHJlcztcbiAgICAgIH1cbiAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCAmJiAocmVzIGFzIE9wdGlvbmFsVmFsaWRpdHkpLm5vQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlcyk7XG4gICAgICAgIGlmIChyZXMuaW1wbGljaXQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBydWxlcyA9IHJ1bGVzLmZpbHRlcigocikgPT4gIW9wdGlvbmFsbHlSZXF1aXJlZC5oYXMoci5uYW1lKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlID09PSBudWxsICYmIGlzTnVsbGFibGUocnVsZXMpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZm9yIChsZXQgcnVsZSBvZiBydWxlcykge1xuICAgIGxldCByZXMgPSBydWxlKHZhbHVlLCB1dGlscyk7XG4gICAgaWYgKHJlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgIHJlcyA9IGF3YWl0IHJlcztcbiAgICB9XG5cbiAgICBpZiAocmVzICE9PSB1bmRlZmluZWQgJiYgIShyZXMgYXMgT3B0aW9uYWxWYWxpZGl0eSkubm9Db250ZXh0KSB7XG4gICAgICByZXN1bHRzLnB1c2gocmVzKTtcbiAgICAgIGlmIChyZXMuaW1wbGljaXQgPT09IHRydWUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRGF0YSA9IGFzeW5jIChcbiAgaW5wdXQ6IElucHV0RGF0YSxcbiAgcnVsZXM6IFZhbGlkYXRpb25SdWxlcyxcbik6IFByb21pc2U8UmF3VmFsaWRhdGlvblJlc3VsdD4gPT4ge1xuICBjb25zdCByZXN1bHRzOiBSYXdWYWxpZGF0aW9uUmVzdWx0ID0ge307XG4gIGNvbnN0IHV0aWxzOiBWYWxpZGF0aW9uVXRpbHMgPSBtYWtlVmFsaWRhdGlvblV0aWxzKGlucHV0KTtcbiAgZm9yIChsZXQga2V5IGluIHJ1bGVzKSB7XG4gICAgY29uc3Qga2V5UnVsZXMgPSAocnVsZXNba2V5XSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICA/IHJ1bGVzW2tleV1cbiAgICAgIDogW3J1bGVzW2tleV1dKSBhcyBSdWxlW107XG4gICAgY29uc3QgdmFsdWU6IGFueSA9IGdldFZhbHVlKGlucHV0LCBrZXkpO1xuICAgIGNvbnN0IGVycm9yczogSW52YWxpZFBheWxvYWRbXSA9IGF3YWl0IHZhbGlkYXRlVmFsdWUoXG4gICAgICB2YWx1ZSxcbiAgICAgIGtleVJ1bGVzLFxuICAgICAgdXRpbHMsXG4gICAgKTtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmVzdWx0c1trZXldID0gZXJyb3JzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IGFzeW5jIChcbiAgaW5wdXQ6IElucHV0RGF0YSxcbiAgcnVsZXM6IFZhbGlkYXRpb25SdWxlcyxcbiAgb3B0aW9uczogVmFsaWRhdGlvbk9wdGlvbnMgPSB7XG4gICAgbWVzc2FnZXM6IGRlZmF1bHRNZXNzYWdlcyxcbiAgfSxcbik6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4gPT4ge1xuICBjb25zdCByYXdFcnJvcnMgPSBhd2FpdCB2YWxpZGF0ZURhdGEoaW5wdXQsIHJ1bGVzKTtcbiAgY29uc3QgcGFzc2VzID0gT2JqZWN0LmtleXMocmF3RXJyb3JzKS5sZW5ndGggPT09IDA7XG5cbiAgY29uc3QgZXJyb3JzID0gcGFzc2VzID8ge30gOiByZXNvbHZlRXJyb3JNZXNzYWdlcyhyYXdFcnJvcnMsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBbcGFzc2VzLCBlcnJvcnNdO1xufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxTQUNFLFVBQVUsRUFDVixlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixtQkFBbUIsUUFDZCxhQUFhO0FBQ3BCLFNBQVMsZUFBZSxRQUFRLGdCQUFnQjtBQUVoRCxNQUFNLFdBQVcsQ0FBQyxPQUFrQixNQUFxQjtJQUN2RCxPQUFPLEtBQUssQ0FBQyxJQUFJO0FBQ25CO0FBRUEsTUFBTSxxQkFBcUIsSUFBSSxJQUFJO0lBQ2pDO0lBQ0E7SUFDQTtDQUNEO0FBRUQsT0FBTyxNQUFNLGdCQUFnQixPQUMzQixPQUNBLE9BQ0EsUUFDOEI7SUFDOUIsTUFBTSxVQUFVLEVBQUU7SUFDbEIsSUFBSSxnQkFBZ0IsVUFBVSxXQUFXLFFBQVE7UUFDL0MsTUFBTSwwQkFBMEIsTUFBTSxNQUFNLENBQUMsQ0FBQyxJQUM1QyxtQkFBbUIsR0FBRyxDQUFDLEVBQUUsSUFBSTtRQUUvQixJQUFJLHdCQUF3QixNQUFNLEtBQUssR0FBRztZQUN4QyxPQUFPLEVBQUU7UUFDWCxDQUFDO1FBQ0QsS0FBSyxJQUFJLFFBQVEsTUFBTSxNQUFNLENBQUMsQ0FBQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUk7WUFDcEUsSUFBSSxNQUFNLEtBQUssT0FBTztZQUN0QixJQUFJLGVBQWUsU0FBUztnQkFDMUIsTUFBTSxNQUFNO1lBQ2QsQ0FBQztZQUNELElBQUksUUFBUSxhQUFhLEFBQUMsSUFBeUIsU0FBUyxFQUFFO2dCQUM1RCxPQUFPLEVBQUU7WUFDWCxDQUFDO1lBQ0QsSUFBSSxRQUFRLFdBQVc7Z0JBQ3JCLFFBQVEsSUFBSSxDQUFDO2dCQUNiLElBQUksSUFBSSxRQUFRLEVBQUU7b0JBQ2hCLE9BQU87Z0JBQ1QsQ0FBQztZQUNILENBQUM7UUFDSDtRQUNBLFFBQVEsTUFBTSxNQUFNLENBQUMsQ0FBQyxJQUFNLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxFQUFFLElBQUk7SUFDNUQsQ0FBQztJQUVELElBQUksT0FBTyxVQUFVLFlBQVksVUFBVSxJQUFJLElBQUksV0FBVyxRQUFRO1FBQ3BFLE9BQU8sRUFBRTtJQUNYLENBQUM7SUFFRCxLQUFLLElBQUksU0FBUSxNQUFPO1FBQ3RCLElBQUksT0FBTSxNQUFLLE9BQU87UUFDdEIsSUFBSSxnQkFBZSxTQUFTO1lBQzFCLE9BQU0sTUFBTTtRQUNkLENBQUM7UUFFRCxJQUFJLFNBQVEsYUFBYSxDQUFDLEFBQUMsS0FBeUIsU0FBUyxFQUFFO1lBQzdELFFBQVEsSUFBSSxDQUFDO1lBQ2IsSUFBSSxLQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQ3pCLEtBQU07WUFDUixDQUFDO1FBQ0gsQ0FBQztJQUNIO0lBQ0EsT0FBTztBQUNULEVBQUU7QUFFRixPQUFPLE1BQU0sZUFBZSxPQUMxQixPQUNBLFFBQ2lDO0lBQ2pDLE1BQU0sVUFBK0IsQ0FBQztJQUN0QyxNQUFNLFFBQXlCLG9CQUFvQjtJQUNuRCxJQUFLLElBQUksT0FBTyxNQUFPO1FBQ3JCLE1BQU0sV0FBWSxLQUFLLENBQUMsSUFBSSxZQUFZLFFBQ3BDLEtBQUssQ0FBQyxJQUFJLEdBQ1Y7WUFBQyxLQUFLLENBQUMsSUFBSTtTQUFDO1FBQ2hCLE1BQU0sUUFBYSxTQUFTLE9BQU87UUFDbkMsTUFBTSxTQUEyQixNQUFNLGNBQ3JDLE9BQ0EsVUFDQTtRQUVGLElBQUksT0FBTyxNQUFNLEVBQUU7WUFDakIsT0FBTyxDQUFDLElBQUksR0FBRztRQUNqQixDQUFDO0lBQ0g7SUFDQSxPQUFPO0FBQ1QsRUFBRTtBQUVGLE9BQU8sTUFBTSxXQUFXLE9BQ3RCLE9BQ0EsT0FDQSxVQUE2QjtJQUMzQixVQUFVO0FBQ1osQ0FBQyxHQUM2QjtJQUM5QixNQUFNLFlBQVksTUFBTSxhQUFhLE9BQU87SUFDNUMsTUFBTSxTQUFTLE9BQU8sSUFBSSxDQUFDLFdBQVcsTUFBTSxLQUFLO0lBRWpELE1BQU0sU0FBUyxTQUFTLENBQUMsSUFBSSxxQkFBcUIsV0FBVyxRQUFRO0lBRXJFLE9BQU87UUFBQztRQUFRO0tBQU87QUFDekIsRUFBRSJ9