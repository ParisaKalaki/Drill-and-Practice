import { invalid } from "../utils.ts";
export function maxNumber(maxValue) {
    return function maxRule(value) {
        if (typeof value !== "number" || value > maxValue) {
            return invalid("maxNumber", {
                value,
                maxValue
            });
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9tYXhfbnVtYmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVmFsaWRpdHksIFJ1bGUgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGludmFsaWQgfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bWJlcihtYXhWYWx1ZTogbnVtYmVyKTogUnVsZSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYXhSdWxlKHZhbHVlOiBhbnkpOiBWYWxpZGl0eSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiB8fCB2YWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICByZXR1cm4gaW52YWxpZChcIm1heE51bWJlclwiLCB7IHZhbHVlLCBtYXhWYWx1ZSB9KTtcbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBUyxPQUFPLFFBQVEsY0FBYztBQUV0QyxPQUFPLFNBQVMsVUFBVSxRQUFnQixFQUFRO0lBQ2hELE9BQU8sU0FBUyxRQUFRLEtBQVUsRUFBWTtRQUM1QyxJQUFJLE9BQU8sVUFBVSxZQUFZLFFBQVEsVUFBVTtZQUNqRCxPQUFPLFFBQVEsYUFBYTtnQkFBRTtnQkFBTztZQUFTO1FBQ2hELENBQUM7SUFDSDtBQUNGLENBQUMifQ==