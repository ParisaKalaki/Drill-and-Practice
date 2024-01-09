import { clearTimes, dateChecks } from "../utils.ts";
export function dateAfter(date) {
    return function dateAfterRule(value) {
        return dateChecks(value, "dateAfter", {
            date
        }, (input)=>{
            return clearTimes(input).getTime() > clearTimes(date).getTime();
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9kYXRlX2FmdGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHksIFJ1bGUgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGNsZWFyVGltZXMsIGRhdGVDaGVja3MgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVBZnRlcihkYXRlOiBEYXRlKTogUnVsZSB7XG4gIHJldHVybiBmdW5jdGlvbiBkYXRlQWZ0ZXJSdWxlKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gICAgcmV0dXJuIGRhdGVDaGVja3ModmFsdWUsIFwiZGF0ZUFmdGVyXCIsIHsgZGF0ZSB9LCAoaW5wdXQ6IERhdGUpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiBjbGVhclRpbWVzKGlucHV0KS5nZXRUaW1lKCkgPiBjbGVhclRpbWVzKGRhdGUpLmdldFRpbWUoKTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLFVBQVUsRUFBRSxVQUFVLFFBQVEsY0FBYztBQUVyRCxPQUFPLFNBQVMsVUFBVSxJQUFVLEVBQVE7SUFDMUMsT0FBTyxTQUFTLGNBQWMsS0FBVSxFQUFZO1FBQ2xELE9BQU8sV0FBVyxPQUFPLGFBQWE7WUFBRTtRQUFLLEdBQUcsQ0FBQyxRQUF5QjtZQUN4RSxPQUFPLFdBQVcsT0FBTyxPQUFPLEtBQUssV0FBVyxNQUFNLE9BQU87UUFDL0Q7SUFDRjtBQUNGLENBQUMifQ==