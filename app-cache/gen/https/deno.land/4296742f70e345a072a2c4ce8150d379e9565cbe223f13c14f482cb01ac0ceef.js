import { invalid } from "../utils.ts";
export function startsWith(str) {
    return function startsWithRule(value) {
        if (typeof value !== "string") {
            return invalid("startsWith", {
                value,
                str
            }, false);
        }
        if (value.startsWith(str) === false) {
            return invalid("startsWith", {
                value,
                str
            }, false);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9zdGFydHNfd2l0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5LCBSdWxlIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydHNXaXRoKHN0cjogc3RyaW5nKTogUnVsZSB7XG4gIHJldHVybiBmdW5jdGlvbiBzdGFydHNXaXRoUnVsZSh2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkKFwic3RhcnRzV2l0aFwiLCB7IHZhbHVlLCBzdHIgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5zdGFydHNXaXRoKHN0cikgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gaW52YWxpZChcInN0YXJ0c1dpdGhcIiwgeyB2YWx1ZSwgc3RyIH0sIGZhbHNlKTtcbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsV0FBVyxHQUFXLEVBQVE7SUFDNUMsT0FBTyxTQUFTLGVBQWUsS0FBVSxFQUFZO1FBQ25ELElBQUksT0FBTyxVQUFVLFVBQVU7WUFDN0IsT0FBTyxRQUFRLGNBQWM7Z0JBQUU7Z0JBQU87WUFBSSxHQUFHLEtBQUs7UUFDcEQsQ0FBQztRQUVELElBQUksTUFBTSxVQUFVLENBQUMsU0FBUyxLQUFLLEVBQUU7WUFDbkMsT0FBTyxRQUFRLGNBQWM7Z0JBQUU7Z0JBQU87WUFBSSxHQUFHLEtBQUs7UUFDcEQsQ0FBQztJQUNIO0FBQ0YsQ0FBQyJ9