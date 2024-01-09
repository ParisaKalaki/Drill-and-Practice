import { invalid } from "../utils.ts";
export function notNull(value) {
    return value === null ? invalid("notNull", {
        value
    }, true) : undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9ub3RfbnVsbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5IH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3ROdWxsKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IGludmFsaWQoXCJub3ROdWxsXCIsIHsgdmFsdWUgfSwgdHJ1ZSkgOiB1bmRlZmluZWQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsUUFBUSxLQUFVLEVBQVk7SUFDNUMsT0FBTyxVQUFVLElBQUksR0FBRyxRQUFRLFdBQVc7UUFBRTtJQUFNLEdBQUcsSUFBSSxJQUFJLFNBQVM7QUFDekUsQ0FBQyJ9