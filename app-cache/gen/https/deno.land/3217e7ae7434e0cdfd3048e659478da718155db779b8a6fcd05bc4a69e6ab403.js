import { invalid } from "../utils.ts";
export function nullable(value) {
    if (typeof value === "undefined") {
        return invalid("nullable", {
            value
        }, true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9udWxsYWJsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5IH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBudWxsYWJsZSh2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIGludmFsaWQoXCJudWxsYWJsZVwiLCB7IHZhbHVlIH0sIHRydWUpO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsU0FBUyxLQUFVLEVBQVk7SUFDN0MsSUFBSSxPQUFPLFVBQVUsYUFBYTtRQUNoQyxPQUFPLFFBQVEsWUFBWTtZQUFFO1FBQU0sR0FBRyxJQUFJO0lBQzVDLENBQUM7QUFDSCxDQUFDIn0=