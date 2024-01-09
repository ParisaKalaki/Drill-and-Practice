import { invalid } from "../utils.ts";
export function isFloat(value) {
    if (typeof value !== "number" || value % 1 === 0) {
        return invalid("isFloat", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19mbG9hdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5IH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Zsb2F0KHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgfHwgdmFsdWUgJSAxID09PSAwKSB7XG4gICAgcmV0dXJuIGludmFsaWQoXCJpc0Zsb2F0XCIsIHsgdmFsdWUgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLE9BQU8sUUFBUSxjQUFjO0FBRXRDLE9BQU8sU0FBUyxRQUFRLEtBQVUsRUFBWTtJQUM1QyxJQUFJLE9BQU8sVUFBVSxZQUFZLFFBQVEsTUFBTSxHQUFHO1FBQ2hELE9BQU8sUUFBUSxXQUFXO1lBQUU7UUFBTTtJQUNwQyxDQUFDO0FBQ0gsQ0FBQyJ9