// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { readShort } from "./read_short.ts";
/**
 * Read big endian 32bit integer from BufReader
 * @param buf
 */ export async function readInt(buf) {
    const high = await readShort(buf);
    if (high === null) return null;
    const low = await readShort(buf);
    if (low === null) throw new Deno.errors.UnexpectedEof();
    return high << 16 | low;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwMC4wL2lvL3JlYWRfaW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IHR5cGUgQnVmUmVhZGVyIH0gZnJvbSBcIi4vYnVmX3JlYWRlci50c1wiO1xuaW1wb3J0IHsgcmVhZFNob3J0IH0gZnJvbSBcIi4vcmVhZF9zaG9ydC50c1wiO1xuXG4vKipcbiAqIFJlYWQgYmlnIGVuZGlhbiAzMmJpdCBpbnRlZ2VyIGZyb20gQnVmUmVhZGVyXG4gKiBAcGFyYW0gYnVmXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkSW50KGJ1ZjogQnVmUmVhZGVyKTogUHJvbWlzZTxudW1iZXIgfCBudWxsPiB7XG4gIGNvbnN0IGhpZ2ggPSBhd2FpdCByZWFkU2hvcnQoYnVmKTtcbiAgaWYgKGhpZ2ggPT09IG51bGwpIHJldHVybiBudWxsO1xuICBjb25zdCBsb3cgPSBhd2FpdCByZWFkU2hvcnQoYnVmKTtcbiAgaWYgKGxvdyA9PT0gbnVsbCkgdGhyb3cgbmV3IERlbm8uZXJyb3JzLlVuZXhwZWN0ZWRFb2YoKTtcbiAgcmV0dXJuIChoaWdoIDw8IDE2KSB8IGxvdztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFHMUUsU0FBUyxTQUFTLFFBQVEsa0JBQWtCO0FBRTVDOzs7Q0FHQyxHQUNELE9BQU8sZUFBZSxRQUFRLEdBQWMsRUFBMEI7SUFDcEUsTUFBTSxPQUFPLE1BQU0sVUFBVTtJQUM3QixJQUFJLFNBQVMsSUFBSSxFQUFFLE9BQU8sSUFBSTtJQUM5QixNQUFNLE1BQU0sTUFBTSxVQUFVO0lBQzVCLElBQUksUUFBUSxJQUFJLEVBQUUsTUFBTSxJQUFJLEtBQUssTUFBTSxDQUFDLGFBQWEsR0FBRztJQUN4RCxPQUFPLEFBQUMsUUFBUSxLQUFNO0FBQ3hCLENBQUMifQ==