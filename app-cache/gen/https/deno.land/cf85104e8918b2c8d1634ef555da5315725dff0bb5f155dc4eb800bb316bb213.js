import { invalid } from "../utils.ts";
export function isNumeric(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        return invalid("isNumeric", {
            value
        });
    }
    if (typeof value === "string" && !value.match(/\d+(\.\d+)?/)) {
        return invalid("isNumeric", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19udW1lcmljLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHkgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGludmFsaWQgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBpbnZhbGlkKFwiaXNOdW1lcmljXCIsIHsgdmFsdWUgfSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICEodmFsdWUgYXMgc3RyaW5nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSkge1xuICAgIHJldHVybiBpbnZhbGlkKFwiaXNOdW1lcmljXCIsIHsgdmFsdWUgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLE9BQU8sUUFBUSxjQUFjO0FBRXRDLE9BQU8sU0FBUyxVQUFVLEtBQVUsRUFBWTtJQUM5QyxJQUFJLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxVQUFVO1FBQzFELE9BQU8sUUFBUSxhQUFhO1lBQUU7UUFBTTtJQUN0QyxDQUFDO0lBRUQsSUFBSSxPQUFPLFVBQVUsWUFBWSxDQUFDLEFBQUMsTUFBaUIsS0FBSyxDQUFDLGdCQUFnQjtRQUN4RSxPQUFPLFFBQVEsYUFBYTtZQUFFO1FBQU07SUFDdEMsQ0FBQztBQUNILENBQUMifQ==