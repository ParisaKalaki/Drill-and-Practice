import { clearTimes, dateChecks } from "../utils.ts";
export function dateBefore(date) {
    return function dateBeforeRule(value) {
        return dateChecks(value, "dateBefore", {
            date
        }, (input)=>{
            return clearTimes(input).getTime() < clearTimes(date).getTime();
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9kYXRlX2JlZm9yZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5LCBSdWxlIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBjbGVhclRpbWVzLCBkYXRlQ2hlY2tzIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRlQmVmb3JlKGRhdGU6IERhdGUpOiBSdWxlIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRhdGVCZWZvcmVSdWxlKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gICAgcmV0dXJuIGRhdGVDaGVja3ModmFsdWUsIFwiZGF0ZUJlZm9yZVwiLCB7IGRhdGUgfSwgKGlucHV0OiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lcyhpbnB1dCkuZ2V0VGltZSgpIDwgY2xlYXJUaW1lcyhkYXRlKS5nZXRUaW1lKCk7XG4gICAgfSk7XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxVQUFVLEVBQUUsVUFBVSxRQUFRLGNBQWM7QUFFckQsT0FBTyxTQUFTLFdBQVcsSUFBVSxFQUFRO0lBQzNDLE9BQU8sU0FBUyxlQUFlLEtBQVUsRUFBWTtRQUNuRCxPQUFPLFdBQVcsT0FBTyxjQUFjO1lBQUU7UUFBSyxHQUFHLENBQUMsUUFBeUI7WUFDekUsT0FBTyxXQUFXLE9BQU8sT0FBTyxLQUFLLFdBQVcsTUFBTSxPQUFPO1FBQy9EO0lBQ0Y7QUFDRixDQUFDIn0=