// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
import { isFd, maybeCallback } from "./_fs_common.ts";
import { copyObject, getOptions } from "../internal/fs/utils.mjs";
import { writeFile, writeFileSync } from "./_fs_writeFile.ts";
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */ export function appendFile(path, data, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    // Don't make changes directly on options object
    options = copyObject(options);
    // Force append behavior when using a supplied file descriptor
    if (!options.flag || isFd(path)) {
        options.flag = "a";
    }
    writeFile(path, data, options, callback);
}
/**
 * TODO: Also accept 'data' parameter as a Node polyfill Buffer type once these
 * are implemented. See https://github.com/denoland/deno/issues/3403
 */ export function appendFileSync(path, data, options) {
    options = getOptions(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    // Don't make changes directly on options object
    options = copyObject(options);
    // Force append behavior when using a supplied file descriptor
    if (!options.flag || isFd(path)) {
        options.flag = "a";
    }
    writeFileSync(path, data, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2ZzL19mc19hcHBlbmRGaWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG5pbXBvcnQge1xuICBDYWxsYmFja1dpdGhFcnJvcixcbiAgaXNGZCxcbiAgbWF5YmVDYWxsYmFjayxcbiAgV3JpdGVGaWxlT3B0aW9ucyxcbn0gZnJvbSBcIi4vX2ZzX2NvbW1vbi50c1wiO1xuaW1wb3J0IHsgRW5jb2RpbmdzIH0gZnJvbSBcIi4uL191dGlscy50c1wiO1xuaW1wb3J0IHsgY29weU9iamVjdCwgZ2V0T3B0aW9ucyB9IGZyb20gXCIuLi9pbnRlcm5hbC9mcy91dGlscy5tanNcIjtcbmltcG9ydCB7IHdyaXRlRmlsZSwgd3JpdGVGaWxlU3luYyB9IGZyb20gXCIuL19mc193cml0ZUZpbGUudHNcIjtcblxuLyoqXG4gKiBUT0RPOiBBbHNvIGFjY2VwdCAnZGF0YScgcGFyYW1ldGVyIGFzIGEgTm9kZSBwb2x5ZmlsbCBCdWZmZXIgdHlwZSBvbmNlIHRoZXNlXG4gKiBhcmUgaW1wbGVtZW50ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZGVub2xhbmQvZGVuby9pc3N1ZXMvMzQwM1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kRmlsZShcbiAgcGF0aDogc3RyaW5nIHwgbnVtYmVyIHwgVVJMLFxuICBkYXRhOiBzdHJpbmcgfCBVaW50OEFycmF5LFxuICBvcHRpb25zOiBFbmNvZGluZ3MgfCBXcml0ZUZpbGVPcHRpb25zIHwgQ2FsbGJhY2tXaXRoRXJyb3IsXG4gIGNhbGxiYWNrPzogQ2FsbGJhY2tXaXRoRXJyb3IsXG4pOiB2b2lkIHtcbiAgY2FsbGJhY2sgPSBtYXliZUNhbGxiYWNrKGNhbGxiYWNrIHx8IG9wdGlvbnMpO1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCB7IGVuY29kaW5nOiBcInV0ZjhcIiwgbW9kZTogMG82NjYsIGZsYWc6IFwiYVwiIH0pO1xuXG4gIC8vIERvbid0IG1ha2UgY2hhbmdlcyBkaXJlY3RseSBvbiBvcHRpb25zIG9iamVjdFxuICBvcHRpb25zID0gY29weU9iamVjdChvcHRpb25zKTtcblxuICAvLyBGb3JjZSBhcHBlbmQgYmVoYXZpb3Igd2hlbiB1c2luZyBhIHN1cHBsaWVkIGZpbGUgZGVzY3JpcHRvclxuICBpZiAoIW9wdGlvbnMuZmxhZyB8fCBpc0ZkKHBhdGgpKSB7XG4gICAgb3B0aW9ucy5mbGFnID0gXCJhXCI7XG4gIH1cblxuICB3cml0ZUZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spO1xufVxuXG4vKipcbiAqIFRPRE86IEFsc28gYWNjZXB0ICdkYXRhJyBwYXJhbWV0ZXIgYXMgYSBOb2RlIHBvbHlmaWxsIEJ1ZmZlciB0eXBlIG9uY2UgdGhlc2VcbiAqIGFyZSBpbXBsZW1lbnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kZW5vbGFuZC9kZW5vL2lzc3Vlcy8zNDAzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRGaWxlU3luYyhcbiAgcGF0aDogc3RyaW5nIHwgbnVtYmVyIHwgVVJMLFxuICBkYXRhOiBzdHJpbmcgfCBVaW50OEFycmF5LFxuICBvcHRpb25zPzogRW5jb2RpbmdzIHwgV3JpdGVGaWxlT3B0aW9ucyxcbik6IHZvaWQge1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCB7IGVuY29kaW5nOiBcInV0ZjhcIiwgbW9kZTogMG82NjYsIGZsYWc6IFwiYVwiIH0pO1xuXG4gIC8vIERvbid0IG1ha2UgY2hhbmdlcyBkaXJlY3RseSBvbiBvcHRpb25zIG9iamVjdFxuICBvcHRpb25zID0gY29weU9iamVjdChvcHRpb25zKTtcblxuICAvLyBGb3JjZSBhcHBlbmQgYmVoYXZpb3Igd2hlbiB1c2luZyBhIHN1cHBsaWVkIGZpbGUgZGVzY3JpcHRvclxuICBpZiAoIW9wdGlvbnMuZmxhZyB8fCBpc0ZkKHBhdGgpKSB7XG4gICAgb3B0aW9ucy5mbGFnID0gXCJhXCI7XG4gIH1cblxuICB3cml0ZUZpbGVTeW5jKHBhdGgsIGRhdGEsIG9wdGlvbnMpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxTQUVFLElBQUksRUFDSixhQUFhLFFBRVIsa0JBQWtCO0FBRXpCLFNBQVMsVUFBVSxFQUFFLFVBQVUsUUFBUSwyQkFBMkI7QUFDbEUsU0FBUyxTQUFTLEVBQUUsYUFBYSxRQUFRLHFCQUFxQjtBQUU5RDs7O0NBR0MsR0FDRCxPQUFPLFNBQVMsV0FDZCxJQUEyQixFQUMzQixJQUF5QixFQUN6QixPQUF5RCxFQUN6RCxRQUE0QixFQUN0QjtJQUNOLFdBQVcsY0FBYyxZQUFZO0lBQ3JDLFVBQVUsV0FBVyxTQUFTO1FBQUUsVUFBVTtRQUFRLE1BQU07UUFBTyxNQUFNO0lBQUk7SUFFekUsZ0RBQWdEO0lBQ2hELFVBQVUsV0FBVztJQUVyQiw4REFBOEQ7SUFDOUQsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssT0FBTztRQUMvQixRQUFRLElBQUksR0FBRztJQUNqQixDQUFDO0lBRUQsVUFBVSxNQUFNLE1BQU0sU0FBUztBQUNqQyxDQUFDO0FBRUQ7OztDQUdDLEdBQ0QsT0FBTyxTQUFTLGVBQ2QsSUFBMkIsRUFDM0IsSUFBeUIsRUFDekIsT0FBc0MsRUFDaEM7SUFDTixVQUFVLFdBQVcsU0FBUztRQUFFLFVBQVU7UUFBUSxNQUFNO1FBQU8sTUFBTTtJQUFJO0lBRXpFLGdEQUFnRDtJQUNoRCxVQUFVLFdBQVc7SUFFckIsOERBQThEO0lBQzlELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLE9BQU87UUFDL0IsUUFBUSxJQUFJLEdBQUc7SUFDakIsQ0FBQztJQUVELGNBQWMsTUFBTSxNQUFNO0FBQzVCLENBQUMifQ==