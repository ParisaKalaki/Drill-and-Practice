import { invalid } from "../utils.ts";
export function isInt(value) {
    if (typeof value !== "number" || value % 1 !== 0) {
        return invalid("isInt", {
            value
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19pbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBWYWxpZGl0eSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgaW52YWxpZCB9IGZyb20gXCIuLi91dGlscy50c1wiO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tIFwiLi9pc19udW1iZXIudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW50KHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgfHwgdmFsdWUgJSAxICE9PSAwKSB7XG4gICAgcmV0dXJuIGludmFsaWQoXCJpc0ludFwiLCB7IHZhbHVlIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUd0QyxPQUFPLFNBQVMsTUFBTSxLQUFVLEVBQVk7SUFDMUMsSUFBSSxPQUFPLFVBQVUsWUFBWSxRQUFRLE1BQU0sR0FBRztRQUNoRCxPQUFPLFFBQVEsU0FBUztZQUFFO1FBQU07SUFDbEMsQ0FBQztBQUNILENBQUMifQ==