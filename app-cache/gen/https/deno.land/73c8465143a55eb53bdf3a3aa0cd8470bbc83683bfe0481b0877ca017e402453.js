import { invalid } from "../utils.ts";
export function isIn(allowedValues) {
    return function isInRule(value) {
        if (allowedValues.indexOf(value) < 0) {
            return invalid("isIn", {
                value,
                allowedValues
            });
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19pbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5LCBSdWxlLCBQcmltaXRpdmVUeXBlcyB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgaW52YWxpZCB9IGZyb20gXCIuLi91dGlscy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJbihhbGxvd2VkVmFsdWVzOiBQcmltaXRpdmVUeXBlc1tdKTogUnVsZSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc0luUnVsZSh2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICAgIGlmIChhbGxvd2VkVmFsdWVzLmluZGV4T2YodmFsdWUpIDwgMCkge1xuICAgICAgcmV0dXJuIGludmFsaWQoXCJpc0luXCIsIHsgdmFsdWUsIGFsbG93ZWRWYWx1ZXMgfSk7XG4gICAgfVxuICB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFNBQVMsT0FBTyxRQUFRLGNBQWM7QUFFdEMsT0FBTyxTQUFTLEtBQUssYUFBK0IsRUFBUTtJQUMxRCxPQUFPLFNBQVMsU0FBUyxLQUFVLEVBQVk7UUFDN0MsSUFBSSxjQUFjLE9BQU8sQ0FBQyxTQUFTLEdBQUc7WUFDcEMsT0FBTyxRQUFRLFFBQVE7Z0JBQUU7Z0JBQU87WUFBYztRQUNoRCxDQUFDO0lBQ0g7QUFDRixDQUFDIn0=