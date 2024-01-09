import { invalid } from "../utils.ts";
export function isIPv6(value) {
    const invalidResult = invalid("isIPv6", {
        value
    });
    if (typeof value !== "string") {
        return invalidResult;
    }
    const segments = value.split(":");
    const invalidSegments = segments.filter((s)=>!s.match(/^(|[0-9a-f]{1,4})$/i));
    if (invalidSegments.length > 0) {
        return invalidResult;
    }
    const emptySegmentsCount = segments.filter((s)=>s === "").length;
    const startsWithLeadingZeros = value.match(/^::/) ? true : false;
    const endsWithLeadingZeros = value.match(/::$/) ? true : false;
    const maxSegments = startsWithLeadingZeros || endsWithLeadingZeros ? 9 : 8;
    let maxEmptySegments = 1;
    if (startsWithLeadingZeros) {
        maxEmptySegments += 1;
    }
    if (endsWithLeadingZeros) {
        maxEmptySegments += 1;
    }
    if (segments.length > maxSegments || emptySegmentsCount > maxEmptySegments) {
        return invalidResult;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9pc19pcHY2LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHkgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGludmFsaWQgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSVB2Nih2YWx1ZTogYW55KTogVmFsaWRpdHkge1xuICBjb25zdCBpbnZhbGlkUmVzdWx0ID0gaW52YWxpZChcImlzSVB2NlwiLCB7IHZhbHVlIH0pO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gaW52YWxpZFJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0IHNlZ21lbnRzID0gdmFsdWUuc3BsaXQoXCI6XCIpO1xuXG4gIGNvbnN0IGludmFsaWRTZWdtZW50cyA9IHNlZ21lbnRzLmZpbHRlcihcbiAgICAocykgPT4gIXMubWF0Y2goL14ofFswLTlhLWZdezEsNH0pJC9pKSxcbiAgKTtcbiAgaWYgKGludmFsaWRTZWdtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGludmFsaWRSZXN1bHQ7XG4gIH1cblxuICBjb25zdCBlbXB0eVNlZ21lbnRzQ291bnQgPSBzZWdtZW50cy5maWx0ZXIoKHMpID0+IHMgPT09IFwiXCIpLmxlbmd0aDtcbiAgY29uc3Qgc3RhcnRzV2l0aExlYWRpbmdaZXJvcyA9IHZhbHVlLm1hdGNoKC9eOjovKSA/IHRydWUgOiBmYWxzZTtcbiAgY29uc3QgZW5kc1dpdGhMZWFkaW5nWmVyb3MgPSB2YWx1ZS5tYXRjaCgvOjokLykgPyB0cnVlIDogZmFsc2U7XG5cbiAgY29uc3QgbWF4U2VnbWVudHMgPSBzdGFydHNXaXRoTGVhZGluZ1plcm9zIHx8IGVuZHNXaXRoTGVhZGluZ1plcm9zID8gOSA6IDg7XG5cbiAgbGV0IG1heEVtcHR5U2VnbWVudHMgPSAxO1xuICBpZiAoc3RhcnRzV2l0aExlYWRpbmdaZXJvcykge1xuICAgIG1heEVtcHR5U2VnbWVudHMgKz0gMTtcbiAgfVxuICBpZiAoZW5kc1dpdGhMZWFkaW5nWmVyb3MpIHtcbiAgICBtYXhFbXB0eVNlZ21lbnRzICs9IDE7XG4gIH1cblxuICBpZiAoc2VnbWVudHMubGVuZ3RoID4gbWF4U2VnbWVudHMgfHwgZW1wdHlTZWdtZW50c0NvdW50ID4gbWF4RW1wdHlTZWdtZW50cykge1xuICAgIHJldHVybiBpbnZhbGlkUmVzdWx0O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsT0FBTyxLQUFVLEVBQVk7SUFDM0MsTUFBTSxnQkFBZ0IsUUFBUSxVQUFVO1FBQUU7SUFBTTtJQUVoRCxJQUFJLE9BQU8sVUFBVSxVQUFVO1FBQzdCLE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxXQUFXLE1BQU0sS0FBSyxDQUFDO0lBRTdCLE1BQU0sa0JBQWtCLFNBQVMsTUFBTSxDQUNyQyxDQUFDLElBQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQztJQUVsQixJQUFJLGdCQUFnQixNQUFNLEdBQUcsR0FBRztRQUM5QixPQUFPO0lBQ1QsQ0FBQztJQUVELE1BQU0scUJBQXFCLFNBQVMsTUFBTSxDQUFDLENBQUMsSUFBTSxNQUFNLElBQUksTUFBTTtJQUNsRSxNQUFNLHlCQUF5QixNQUFNLEtBQUssQ0FBQyxTQUFTLElBQUksR0FBRyxLQUFLO0lBQ2hFLE1BQU0sdUJBQXVCLE1BQU0sS0FBSyxDQUFDLFNBQVMsSUFBSSxHQUFHLEtBQUs7SUFFOUQsTUFBTSxjQUFjLDBCQUEwQix1QkFBdUIsSUFBSSxDQUFDO0lBRTFFLElBQUksbUJBQW1CO0lBQ3ZCLElBQUksd0JBQXdCO1FBQzFCLG9CQUFvQjtJQUN0QixDQUFDO0lBQ0QsSUFBSSxzQkFBc0I7UUFDeEIsb0JBQW9CO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFNBQVMsTUFBTSxHQUFHLGVBQWUscUJBQXFCLGtCQUFrQjtRQUMxRSxPQUFPO0lBQ1QsQ0FBQztBQUNILENBQUMifQ==