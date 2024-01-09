import { invalid, isOptionalValue } from "../utils.ts";
export function required(value) {
    return isOptionalValue(value) ? invalid("required", {
        value
    }, true) : undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9yZXF1aXJlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5IH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkLCBpc09wdGlvbmFsVmFsdWUgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVkKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gIHJldHVybiBpc09wdGlvbmFsVmFsdWUodmFsdWUpXG4gICAgPyBpbnZhbGlkKFwicmVxdWlyZWRcIiwgeyB2YWx1ZSB9LCB0cnVlKVxuICAgIDogdW5kZWZpbmVkO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFNBQVMsT0FBTyxFQUFFLGVBQWUsUUFBUSxjQUFjO0FBRXZELE9BQU8sU0FBUyxTQUFTLEtBQVUsRUFBWTtJQUM3QyxPQUFPLGdCQUFnQixTQUNuQixRQUFRLFlBQVk7UUFBRTtJQUFNLEdBQUcsSUFBSSxJQUNuQyxTQUFTO0FBQ2YsQ0FBQyJ9