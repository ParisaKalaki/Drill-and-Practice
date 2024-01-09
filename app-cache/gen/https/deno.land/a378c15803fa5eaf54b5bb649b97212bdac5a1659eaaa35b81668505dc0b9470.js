import { invalid } from "../utils.ts";
export function isNumber(value) {
    if (typeof value !== "number") {
        return invalid("isNumber", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19udW1iZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBWYWxpZGl0eSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgaW52YWxpZCB9IGZyb20gXCIuLi91dGlscy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IGFueSk6IFZhbGlkaXR5IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBpbnZhbGlkKFwiaXNOdW1iZXJcIiwgeyB2YWx1ZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFNBQVMsT0FBTyxRQUFRLGNBQWM7QUFFdEMsT0FBTyxTQUFTLFNBQVMsS0FBVSxFQUFZO0lBQzdDLElBQUksT0FBTyxVQUFVLFVBQVU7UUFDN0IsT0FBTyxRQUFRLFlBQVk7WUFBRTtRQUFNO0lBQ3JDLENBQUM7QUFDSCxDQUFDIn0=