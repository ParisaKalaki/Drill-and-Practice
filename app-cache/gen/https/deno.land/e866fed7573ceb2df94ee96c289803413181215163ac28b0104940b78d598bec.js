import { invalid } from "../utils.ts";
export function numberBetween(minValue, maxValue) {
    return function maxRule(value) {
        if (typeof value !== "number" || value < minValue || value > maxValue) {
            return invalid("numberBetween", {
                value,
                maxValue,
                minValue
            });
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9udW1iZXJfYmV0d2Vlbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5LCBSdWxlIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJCZXR3ZWVuKG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBSdWxlIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1heFJ1bGUodmFsdWU6IGFueSk6IFZhbGlkaXR5IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiIHx8IHZhbHVlIDwgbWluVmFsdWUgfHwgdmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgcmV0dXJuIGludmFsaWQoXCJudW1iZXJCZXR3ZWVuXCIsIHsgdmFsdWUsIG1heFZhbHVlLCBtaW5WYWx1ZSB9KTtcbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsY0FBYyxRQUFnQixFQUFFLFFBQWdCLEVBQVE7SUFDdEUsT0FBTyxTQUFTLFFBQVEsS0FBVSxFQUFZO1FBQzVDLElBQUksT0FBTyxVQUFVLFlBQVksUUFBUSxZQUFZLFFBQVEsVUFBVTtZQUNyRSxPQUFPLFFBQVEsaUJBQWlCO2dCQUFFO2dCQUFPO2dCQUFVO1lBQVM7UUFDOUQsQ0FBQztJQUNIO0FBQ0YsQ0FBQyJ9