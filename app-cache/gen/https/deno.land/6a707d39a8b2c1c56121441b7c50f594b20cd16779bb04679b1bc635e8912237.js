import { invalid, isOptionalValue } from "../utils.ts";
import { required } from "./required.ts";
import { validateData } from "../validate.ts";
export function validateObject(isRequired, rules) {
    return [
        ...isRequired ? [
            required
        ] : [],
        async function ruleObject(value, utils) {
            if (isRequired === true && isOptionalValue(value)) {
                return;
            }
            // Make sure value is object and not null
            if (typeof value !== "object" || value === null) {
                return invalid("validateObject", {
                    value
                }, true);
            }
            const errors = await validateData(value, rules);
            if (Object.keys(errors).length > 0) {
                return invalid("validateObject", {
                    value,
                    errors
                }, true);
            }
        }
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy92YWxpZGF0ZV9vYmplY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBWYWxpZGl0eSwgUnVsZSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBWYWxpZGF0aW9uUnVsZXMsXG4gIElucHV0RGF0YSxcbiAgVmFsaWRhdGlvblV0aWxzLFxufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy50c1wiO1xuaW1wb3J0IHsgaW52YWxpZCwgaXNPcHRpb25hbFZhbHVlIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5pbXBvcnQgeyByZXF1aXJlZCB9IGZyb20gXCIuL3JlcXVpcmVkLnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZURhdGEgfSBmcm9tIFwiLi4vdmFsaWRhdGUudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlT2JqZWN0KFxuICBpc1JlcXVpcmVkOiBib29sZWFuLFxuICBydWxlczogVmFsaWRhdGlvblJ1bGVzLFxuKTogUnVsZVtdIHtcbiAgcmV0dXJuIFtcbiAgICAuLi4oaXNSZXF1aXJlZCA/IFtyZXF1aXJlZF0gOiBbXSksXG4gICAgYXN5bmMgZnVuY3Rpb24gcnVsZU9iamVjdChcbiAgICAgIHZhbHVlOiBhbnksXG4gICAgICB1dGlsczogVmFsaWRhdGlvblV0aWxzLFxuICAgICk6IFByb21pc2U8VmFsaWRpdHk+IHtcbiAgICAgIGlmIChpc1JlcXVpcmVkID09PSB0cnVlICYmIGlzT3B0aW9uYWxWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIHN1cmUgdmFsdWUgaXMgb2JqZWN0IGFuZCBub3QgbnVsbFxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gaW52YWxpZChcInZhbGlkYXRlT2JqZWN0XCIsIHsgdmFsdWUgfSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9ycyA9IGF3YWl0IHZhbGlkYXRlRGF0YSh2YWx1ZSBhcyBJbnB1dERhdGEsIHJ1bGVzKTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gaW52YWxpZChcInZhbGlkYXRlT2JqZWN0XCIsIHsgdmFsdWUsIGVycm9ycyB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9LFxuICBdO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLFNBQVMsT0FBTyxFQUFFLGVBQWUsUUFBUSxjQUFjO0FBQ3ZELFNBQVMsUUFBUSxRQUFRLGdCQUFnQjtBQUN6QyxTQUFTLFlBQVksUUFBUSxpQkFBaUI7QUFFOUMsT0FBTyxTQUFTLGVBQ2QsVUFBbUIsRUFDbkIsS0FBc0IsRUFDZDtJQUNSLE9BQU87V0FDRCxhQUFhO1lBQUM7U0FBUyxHQUFHLEVBQUU7UUFDaEMsZUFBZSxXQUNiLEtBQVUsRUFDVixLQUFzQixFQUNIO1lBQ25CLElBQUksZUFBZSxJQUFJLElBQUksZ0JBQWdCLFFBQVE7Z0JBQ2pEO1lBQ0YsQ0FBQztZQUVELHlDQUF5QztZQUN6QyxJQUFJLE9BQU8sVUFBVSxZQUFZLFVBQVUsSUFBSSxFQUFFO2dCQUMvQyxPQUFPLFFBQVEsa0JBQWtCO29CQUFFO2dCQUFNLEdBQUcsSUFBSTtZQUNsRCxDQUFDO1lBRUQsTUFBTSxTQUFTLE1BQU0sYUFBYSxPQUFvQjtZQUV0RCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsTUFBTSxHQUFHLEdBQUc7Z0JBQ2xDLE9BQU8sUUFBUSxrQkFBa0I7b0JBQUU7b0JBQU87Z0JBQU8sR0FBRyxJQUFJO1lBQzFELENBQUM7UUFDSDtLQUNEO0FBQ0gsQ0FBQyJ9