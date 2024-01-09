import { invalid } from "../utils.ts";
export function lengthBetween(minLength, maxLength) {
    return function lengthBetweenRule(value) {
        if (typeof value !== "string") {
            return invalid("lengthBetween", {
                value,
                minLength,
                maxLength
            }, false);
        }
        if (value.length < minLength || value.length > maxLength) {
            return invalid("lengthBetween", {
                value,
                minLength,
                maxLength
            }, false);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9ydWxlcy9sZW5ndGhfYmV0d2Vlbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkaXR5LCBSdWxlIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5pbXBvcnQgeyBpbnZhbGlkIH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGhCZXR3ZWVuKG1pbkxlbmd0aDogbnVtYmVyLCBtYXhMZW5ndGg6IG51bWJlcik6IFJ1bGUge1xuICByZXR1cm4gZnVuY3Rpb24gbGVuZ3RoQmV0d2VlblJ1bGUodmFsdWU6IGFueSk6IFZhbGlkaXR5IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gaW52YWxpZChcImxlbmd0aEJldHdlZW5cIiwgeyB2YWx1ZSwgbWluTGVuZ3RoLCBtYXhMZW5ndGggfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZS5sZW5ndGggPCBtaW5MZW5ndGggfHwgdmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICByZXR1cm4gaW52YWxpZChcImxlbmd0aEJldHdlZW5cIiwgeyB2YWx1ZSwgbWluTGVuZ3RoLCBtYXhMZW5ndGggfSwgZmFsc2UpO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLE9BQU8sUUFBUSxjQUFjO0FBRXRDLE9BQU8sU0FBUyxjQUFjLFNBQWlCLEVBQUUsU0FBaUIsRUFBUTtJQUN4RSxPQUFPLFNBQVMsa0JBQWtCLEtBQVUsRUFBWTtRQUN0RCxJQUFJLE9BQU8sVUFBVSxVQUFVO1lBQzdCLE9BQU8sUUFBUSxpQkFBaUI7Z0JBQUU7Z0JBQU87Z0JBQVc7WUFBVSxHQUFHLEtBQUs7UUFDeEUsQ0FBQztRQUVELElBQUksTUFBTSxNQUFNLEdBQUcsYUFBYSxNQUFNLE1BQU0sR0FBRyxXQUFXO1lBQ3hELE9BQU8sUUFBUSxpQkFBaUI7Z0JBQUU7Z0JBQU87Z0JBQVc7WUFBVSxHQUFHLEtBQUs7UUFDeEUsQ0FBQztJQUNIO0FBQ0YsQ0FBQyJ9