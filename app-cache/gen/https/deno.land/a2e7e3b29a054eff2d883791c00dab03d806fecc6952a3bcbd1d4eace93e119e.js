import { clearTimes, dateChecks } from "../utils.ts";
export function dateBetween(minDate, maxDate) {
    return function dateBetweenRule(value) {
        return dateChecks(value, "dateBetween", {
            minDate,
            maxDate
        }, (input)=>{
            const inputDateTime = clearTimes(input).getTime();
            const minDateTime = clearTimes(minDate).getTime();
            const maxDateTime = clearTimes(maxDate).getTime();
            return inputDateTime >= minDateTime && inputDateTime <= maxDateTime;
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9kYXRlX2JldHdlZW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBWYWxpZGl0eSwgUnVsZSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgY2xlYXJUaW1lcywgZGF0ZUNoZWNrcyB9IGZyb20gXCIuLi91dGlscy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUJldHdlZW4obWluRGF0ZTogRGF0ZSwgbWF4RGF0ZTogRGF0ZSk6IFJ1bGUge1xuICByZXR1cm4gZnVuY3Rpb24gZGF0ZUJldHdlZW5SdWxlKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gICAgcmV0dXJuIGRhdGVDaGVja3MoXG4gICAgICB2YWx1ZSxcbiAgICAgIFwiZGF0ZUJldHdlZW5cIixcbiAgICAgIHsgbWluRGF0ZSwgbWF4RGF0ZSB9LFxuICAgICAgKGlucHV0OiBEYXRlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0RGF0ZVRpbWUgPSBjbGVhclRpbWVzKGlucHV0KS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IG1pbkRhdGVUaW1lID0gY2xlYXJUaW1lcyhtaW5EYXRlKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IG1heERhdGVUaW1lID0gY2xlYXJUaW1lcyhtYXhEYXRlKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZVRpbWUgPj0gbWluRGF0ZVRpbWUgJiYgaW5wdXREYXRlVGltZSA8PSBtYXhEYXRlVGltZTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLFVBQVUsRUFBRSxVQUFVLFFBQVEsY0FBYztBQUVyRCxPQUFPLFNBQVMsWUFBWSxPQUFhLEVBQUUsT0FBYSxFQUFRO0lBQzlELE9BQU8sU0FBUyxnQkFBZ0IsS0FBVSxFQUFZO1FBQ3BELE9BQU8sV0FDTCxPQUNBLGVBQ0E7WUFBRTtZQUFTO1FBQVEsR0FDbkIsQ0FBQyxRQUF5QjtZQUN4QixNQUFNLGdCQUFnQixXQUFXLE9BQU8sT0FBTztZQUMvQyxNQUFNLGNBQWMsV0FBVyxTQUFTLE9BQU87WUFDL0MsTUFBTSxjQUFjLFdBQVcsU0FBUyxPQUFPO1lBRS9DLE9BQU8saUJBQWlCLGVBQWUsaUJBQWlCO1FBQzFEO0lBRUo7QUFDRixDQUFDIn0=