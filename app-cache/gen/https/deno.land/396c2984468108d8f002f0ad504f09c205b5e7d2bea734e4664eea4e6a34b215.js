// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
export const sep = "\\";
export const delimiter = ";";
export { windowsResolve as resolve } from "./_resolve.ts";
export { windowsNormalize as normalize } from "./_normalize.ts";
export { windowsIsAbsolute as isAbsolute } from "./_is_absolute.ts";
export { windowsJoin as join } from "./_join.ts";
export { windowsRelative as relative } from "./_relative.ts";
export { windowsToNamespacedPath as toNamespacedPath } from "./_to_namespaced_path.ts";
export { windowsDirname as dirname } from "./_dirname.ts";
export { windowsBasename as basename } from "./_basename.ts";
export { windowsExtname as extname } from "./_extname.ts";
export { windowsFormat as format } from "./_format.ts";
export { windowsParse as parse } from "./_parse.ts";
export { windowsFromFileUrl as fromFileUrl } from "./_from_file_url.ts";
export { windowsToFileUrl as toFileUrl } from "./_to_file_url.ts";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwMC4wL3BhdGgvd2luMzIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIENvcHlyaWdodCB0aGUgQnJvd3NlcmlmeSBhdXRob3JzLiBNSVQgTGljZW5zZS5cbi8vIFBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2VyaWZ5L3BhdGgtYnJvd3NlcmlmeS9cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuZXhwb3J0IGNvbnN0IHNlcCA9IFwiXFxcXFwiO1xuZXhwb3J0IGNvbnN0IGRlbGltaXRlciA9IFwiO1wiO1xuXG5leHBvcnQgeyB3aW5kb3dzUmVzb2x2ZSBhcyByZXNvbHZlIH0gZnJvbSBcIi4vX3Jlc29sdmUudHNcIjtcbmV4cG9ydCB7IHdpbmRvd3NOb3JtYWxpemUgYXMgbm9ybWFsaXplIH0gZnJvbSBcIi4vX25vcm1hbGl6ZS50c1wiO1xuZXhwb3J0IHsgd2luZG93c0lzQWJzb2x1dGUgYXMgaXNBYnNvbHV0ZSB9IGZyb20gXCIuL19pc19hYnNvbHV0ZS50c1wiO1xuZXhwb3J0IHsgd2luZG93c0pvaW4gYXMgam9pbiB9IGZyb20gXCIuL19qb2luLnRzXCI7XG5leHBvcnQgeyB3aW5kb3dzUmVsYXRpdmUgYXMgcmVsYXRpdmUgfSBmcm9tIFwiLi9fcmVsYXRpdmUudHNcIjtcbmV4cG9ydCB7IHdpbmRvd3NUb05hbWVzcGFjZWRQYXRoIGFzIHRvTmFtZXNwYWNlZFBhdGggfSBmcm9tIFwiLi9fdG9fbmFtZXNwYWNlZF9wYXRoLnRzXCI7XG5leHBvcnQgeyB3aW5kb3dzRGlybmFtZSBhcyBkaXJuYW1lIH0gZnJvbSBcIi4vX2Rpcm5hbWUudHNcIjtcbmV4cG9ydCB7IHdpbmRvd3NCYXNlbmFtZSBhcyBiYXNlbmFtZSB9IGZyb20gXCIuL19iYXNlbmFtZS50c1wiO1xuZXhwb3J0IHsgd2luZG93c0V4dG5hbWUgYXMgZXh0bmFtZSB9IGZyb20gXCIuL19leHRuYW1lLnRzXCI7XG5leHBvcnQgeyB3aW5kb3dzRm9ybWF0IGFzIGZvcm1hdCB9IGZyb20gXCIuL19mb3JtYXQudHNcIjtcbmV4cG9ydCB7IHdpbmRvd3NQYXJzZSBhcyBwYXJzZSB9IGZyb20gXCIuL19wYXJzZS50c1wiO1xuZXhwb3J0IHsgd2luZG93c0Zyb21GaWxlVXJsIGFzIGZyb21GaWxlVXJsIH0gZnJvbSBcIi4vX2Zyb21fZmlsZV91cmwudHNcIjtcbmV4cG9ydCB7IHdpbmRvd3NUb0ZpbGVVcmwgYXMgdG9GaWxlVXJsIH0gZnJvbSBcIi4vX3RvX2ZpbGVfdXJsLnRzXCI7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLGlEQUFpRDtBQUNqRCw2REFBNkQ7QUFDN0QscUNBQXFDO0FBRXJDLE9BQU8sTUFBTSxNQUFNLEtBQUs7QUFDeEIsT0FBTyxNQUFNLFlBQVksSUFBSTtBQUU3QixTQUFTLGtCQUFrQixPQUFPLFFBQVEsZ0JBQWdCO0FBQzFELFNBQVMsb0JBQW9CLFNBQVMsUUFBUSxrQkFBa0I7QUFDaEUsU0FBUyxxQkFBcUIsVUFBVSxRQUFRLG9CQUFvQjtBQUNwRSxTQUFTLGVBQWUsSUFBSSxRQUFRLGFBQWE7QUFDakQsU0FBUyxtQkFBbUIsUUFBUSxRQUFRLGlCQUFpQjtBQUM3RCxTQUFTLDJCQUEyQixnQkFBZ0IsUUFBUSwyQkFBMkI7QUFDdkYsU0FBUyxrQkFBa0IsT0FBTyxRQUFRLGdCQUFnQjtBQUMxRCxTQUFTLG1CQUFtQixRQUFRLFFBQVEsaUJBQWlCO0FBQzdELFNBQVMsa0JBQWtCLE9BQU8sUUFBUSxnQkFBZ0I7QUFDMUQsU0FBUyxpQkFBaUIsTUFBTSxRQUFRLGVBQWU7QUFDdkQsU0FBUyxnQkFBZ0IsS0FBSyxRQUFRLGNBQWM7QUFDcEQsU0FBUyxzQkFBc0IsV0FBVyxRQUFRLHNCQUFzQjtBQUN4RSxTQUFTLG9CQUFvQixTQUFTLFFBQVEsb0JBQW9CIn0=