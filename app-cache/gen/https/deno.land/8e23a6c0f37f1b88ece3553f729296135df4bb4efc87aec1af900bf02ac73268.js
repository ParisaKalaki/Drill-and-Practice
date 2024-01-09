import { invalid } from "../utils.ts";
export function isArray(value) {
    if (false === value instanceof Array) {
        return invalid("isArray", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19hcnJheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5IH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gIGlmIChmYWxzZSA9PT0gdmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBpbnZhbGlkKFwiaXNBcnJheVwiLCB7IHZhbHVlIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsUUFBUSxLQUFVLEVBQVk7SUFDNUMsSUFBSSxLQUFLLEtBQUssaUJBQWlCLE9BQU87UUFDcEMsT0FBTyxRQUFRLFdBQVc7WUFBRTtRQUFNO0lBQ3BDLENBQUM7QUFDSCxDQUFDIn0=