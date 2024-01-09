import { invalid } from "../utils.ts";
export function isBool(value) {
    if (typeof value !== "boolean") {
        return invalid("isBool", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19ib29sLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHkgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGludmFsaWQgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbCh2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBpbnZhbGlkKFwiaXNCb29sXCIsIHsgdmFsdWUgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLE9BQU8sUUFBUSxjQUFjO0FBRXRDLE9BQU8sU0FBUyxPQUFPLEtBQVUsRUFBWTtJQUMzQyxJQUFJLE9BQU8sVUFBVSxXQUFXO1FBQzlCLE9BQU8sUUFBUSxVQUFVO1lBQUU7UUFBTTtJQUNuQyxDQUFDO0FBQ0gsQ0FBQyJ9