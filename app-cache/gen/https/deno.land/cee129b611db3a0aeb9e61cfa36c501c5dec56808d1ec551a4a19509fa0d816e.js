import { invalid } from "../utils.ts";
export function minLength(minValue) {
    return function minLengthRule(value) {
        if (typeof value !== "string") {
            return invalid("minLength", {
                value,
                minValue
            }, false);
        }
        if (value.length < minValue) {
            return invalid("minLength", {
                value,
                minValue
            }, false);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9taW5fbGVuZ3RoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHksIFJ1bGUgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGludmFsaWQgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1pbkxlbmd0aChtaW5WYWx1ZTogbnVtYmVyKTogUnVsZSB7XG4gIHJldHVybiBmdW5jdGlvbiBtaW5MZW5ndGhSdWxlKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIGludmFsaWQoXCJtaW5MZW5ndGhcIiwgeyB2YWx1ZSwgbWluVmFsdWUgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPCBtaW5WYWx1ZSkge1xuICAgICAgcmV0dXJuIGludmFsaWQoXCJtaW5MZW5ndGhcIiwgeyB2YWx1ZSwgbWluVmFsdWUgfSwgZmFsc2UpO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLE9BQU8sUUFBUSxjQUFjO0FBRXRDLE9BQU8sU0FBUyxVQUFVLFFBQWdCLEVBQVE7SUFDaEQsT0FBTyxTQUFTLGNBQWMsS0FBVSxFQUFZO1FBQ2xELElBQUksT0FBTyxVQUFVLFVBQVU7WUFDN0IsT0FBTyxRQUFRLGFBQWE7Z0JBQUU7Z0JBQU87WUFBUyxHQUFHLEtBQUs7UUFDeEQsQ0FBQztRQUVELElBQUksTUFBTSxNQUFNLEdBQUcsVUFBVTtZQUMzQixPQUFPLFFBQVEsYUFBYTtnQkFBRTtnQkFBTztZQUFTLEdBQUcsS0FBSztRQUN4RCxDQUFDO0lBQ0g7QUFDRixDQUFDIn0=