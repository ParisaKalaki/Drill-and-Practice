import { invalid } from "../utils.ts";
import { validateValue } from "../validate.ts";
export function either(ruleSets, errorCode = "either") {
    return async function eitherRule(value, utils) {
        for (const ruleSet of ruleSets){
            const errs = await validateValue(value, ruleSet instanceof Array ? ruleSet : [
                ruleSet
            ], utils);
            if (errs.length === 0) {
                return undefined;
            }
        }
        return invalid(errorCode, {
            value
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9laXRoZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBWYWxpZGl0eSwgUnVsZSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBWYWxpZGF0aW9uVXRpbHMgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy50c1wiO1xuaW1wb3J0IHsgaW52YWxpZCB9IGZyb20gXCIuLi91dGlscy50c1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVWYWx1ZSB9IGZyb20gXCIuLi92YWxpZGF0ZS50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZWl0aGVyKFxuICBydWxlU2V0czogKFJ1bGUgfCBSdWxlW10pW10sXG4gIGVycm9yQ29kZTogc3RyaW5nID0gXCJlaXRoZXJcIixcbik6IFJ1bGUge1xuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gZWl0aGVyUnVsZShcbiAgICB2YWx1ZTogYW55LFxuICAgIHV0aWxzOiBWYWxpZGF0aW9uVXRpbHMsXG4gICk6IFByb21pc2U8VmFsaWRpdHk+IHtcbiAgICBmb3IgKGNvbnN0IHJ1bGVTZXQgb2YgcnVsZVNldHMpIHtcbiAgICAgIGNvbnN0IGVycnMgPSBhd2FpdCB2YWxpZGF0ZVZhbHVlKFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgcnVsZVNldCBpbnN0YW5jZW9mIEFycmF5ID8gcnVsZVNldCA6IFtydWxlU2V0XSxcbiAgICAgICAgdXRpbHMsXG4gICAgICApO1xuXG4gICAgICBpZiAoZXJycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW52YWxpZChlcnJvckNvZGUsIHsgdmFsdWUgfSk7XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUN0QyxTQUFTLGFBQWEsUUFBUSxpQkFBaUI7QUFFL0MsT0FBTyxTQUFTLE9BQ2QsUUFBMkIsRUFDM0IsWUFBb0IsUUFBUSxFQUN0QjtJQUNOLE9BQU8sZUFBZSxXQUNwQixLQUFVLEVBQ1YsS0FBc0IsRUFDSDtRQUNuQixLQUFLLE1BQU0sV0FBVyxTQUFVO1lBQzlCLE1BQU0sT0FBTyxNQUFNLGNBQ2pCLE9BQ0EsbUJBQW1CLFFBQVEsVUFBVTtnQkFBQzthQUFRLEVBQzlDO1lBR0YsSUFBSSxLQUFLLE1BQU0sS0FBSyxHQUFHO2dCQUNyQixPQUFPO1lBQ1QsQ0FBQztRQUNIO1FBRUEsT0FBTyxRQUFRLFdBQVc7WUFBRTtRQUFNO0lBQ3BDO0FBQ0YsQ0FBQyJ9