import compileToString from "./compile-string.ts";
import { getConfig } from "./config.ts";
import EtaErr from "./err.ts";
import { getAsyncFunctionConstructor } from "./polyfills.ts";
/* END TYPES */ /**
 * Takes a template string and returns a template function that can be called with (data, config, [cb])
 *
 * @param str - The template string
 * @param config - A custom configuration object (optional)
 *
 * **Example**
 *
 * ```js
 * let compiledFn = eta.compile("Hi <%= it.user %>")
 * // function anonymous()
 * let compiledFnStr = compiledFn.toString()
 * // "function anonymous(it,E,cb\n) {\nvar tR='',include=E.include.bind(E),includeFile=E.includeFile.bind(E);tR+='Hi ';tR+=E.e(it.user);if(cb){cb(null,tR)} return tR\n}"
 * ```
 */ export default function compile(str, config) {
    const options = getConfig(config || {});
    /* ASYNC HANDLING */ // The below code is modified from mde/ejs. All credit should go to them.
    const ctor = options.async ? getAsyncFunctionConstructor() : Function;
    /* END ASYNC HANDLING */ try {
        return new ctor(options.varName, "E", "cb", compileToString(str, options)); // eslint-disable-line no-new-func
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw EtaErr("Bad template syntax\n\n" + e.message + "\n" + Array(e.message.length + 1).join("=") + "\n" + compileToString(str, options) + "\n");
        } else {
            throw e;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvZXRhQHYyLjIuMC9jb21waWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb21waWxlVG9TdHJpbmcgZnJvbSBcIi4vY29tcGlsZS1zdHJpbmcudHNcIjtcbmltcG9ydCB7IGdldENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZy50c1wiO1xuaW1wb3J0IEV0YUVyciBmcm9tIFwiLi9lcnIudHNcIjtcblxuLyogVFlQRVMgKi9cblxuaW1wb3J0IHR5cGUgeyBFdGFDb25maWcsIFBhcnRpYWxDb25maWcgfSBmcm9tIFwiLi9jb25maWcudHNcIjtcbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2tGbiB9IGZyb20gXCIuL2ZpbGUtaGFuZGxlcnMudHNcIjtcbmltcG9ydCB7IGdldEFzeW5jRnVuY3Rpb25Db25zdHJ1Y3RvciB9IGZyb20gXCIuL3BvbHlmaWxscy50c1wiO1xuZXhwb3J0IHR5cGUgVGVtcGxhdGVGdW5jdGlvbiA9IChcbiAgZGF0YTogb2JqZWN0LFxuICBjb25maWc6IEV0YUNvbmZpZyxcbiAgY2I/OiBDYWxsYmFja0ZuLFxuKSA9PiBzdHJpbmc7XG5cbi8qIEVORCBUWVBFUyAqL1xuXG4vKipcbiAqIFRha2VzIGEgdGVtcGxhdGUgc3RyaW5nIGFuZCByZXR1cm5zIGEgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHdpdGggKGRhdGEsIGNvbmZpZywgW2NiXSlcbiAqXG4gKiBAcGFyYW0gc3RyIC0gVGhlIHRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIGNvbmZpZyAtIEEgY3VzdG9tIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChvcHRpb25hbClcbiAqXG4gKiAqKkV4YW1wbGUqKlxuICpcbiAqIGBgYGpzXG4gKiBsZXQgY29tcGlsZWRGbiA9IGV0YS5jb21waWxlKFwiSGkgPCU9IGl0LnVzZXIgJT5cIilcbiAqIC8vIGZ1bmN0aW9uIGFub255bW91cygpXG4gKiBsZXQgY29tcGlsZWRGblN0ciA9IGNvbXBpbGVkRm4udG9TdHJpbmcoKVxuICogLy8gXCJmdW5jdGlvbiBhbm9ueW1vdXMoaXQsRSxjYlxcbikge1xcbnZhciB0Uj0nJyxpbmNsdWRlPUUuaW5jbHVkZS5iaW5kKEUpLGluY2x1ZGVGaWxlPUUuaW5jbHVkZUZpbGUuYmluZChFKTt0Uis9J0hpICc7dFIrPUUuZShpdC51c2VyKTtpZihjYil7Y2IobnVsbCx0Uil9IHJldHVybiB0Ulxcbn1cIlxuICogYGBgXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGlsZShcbiAgc3RyOiBzdHJpbmcsXG4gIGNvbmZpZz86IFBhcnRpYWxDb25maWcsXG4pOiBUZW1wbGF0ZUZ1bmN0aW9uIHtcbiAgY29uc3Qgb3B0aW9uczogRXRhQ29uZmlnID0gZ2V0Q29uZmlnKGNvbmZpZyB8fCB7fSk7XG5cbiAgLyogQVNZTkMgSEFORExJTkcgKi9cbiAgLy8gVGhlIGJlbG93IGNvZGUgaXMgbW9kaWZpZWQgZnJvbSBtZGUvZWpzLiBBbGwgY3JlZGl0IHNob3VsZCBnbyB0byB0aGVtLlxuICBjb25zdCBjdG9yID0gb3B0aW9ucy5hc3luY1xuICAgID8gKGdldEFzeW5jRnVuY3Rpb25Db25zdHJ1Y3RvcigpIGFzIEZ1bmN0aW9uQ29uc3RydWN0b3IpXG4gICAgOiBGdW5jdGlvbjtcbiAgLyogRU5EIEFTWU5DIEhBTkRMSU5HICovXG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IGN0b3IoXG4gICAgICBvcHRpb25zLnZhck5hbWUsXG4gICAgICBcIkVcIiwgLy8gRXRhQ29uZmlnXG4gICAgICBcImNiXCIsIC8vIG9wdGlvbmFsIGNhbGxiYWNrXG4gICAgICBjb21waWxlVG9TdHJpbmcoc3RyLCBvcHRpb25zKSxcbiAgICApIGFzIFRlbXBsYXRlRnVuY3Rpb247IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcbiAgICAgIHRocm93IEV0YUVycihcbiAgICAgICAgXCJCYWQgdGVtcGxhdGUgc3ludGF4XFxuXFxuXCIgK1xuICAgICAgICAgIGUubWVzc2FnZSArXG4gICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgQXJyYXkoZS5tZXNzYWdlLmxlbmd0aCArIDEpLmpvaW4oXCI9XCIpICtcbiAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICBjb21waWxlVG9TdHJpbmcoc3RyLCBvcHRpb25zKSArXG4gICAgICAgICAgXCJcXG5cIiwgLy8gVGhpcyB3aWxsIHB1dCBhbiBleHRyYSBuZXdsaW5lIGJlZm9yZSB0aGUgY2FsbHN0YWNrIGZvciBleHRyYSByZWFkYWJpbGl0eVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHFCQUFxQixzQkFBc0I7QUFDbEQsU0FBUyxTQUFTLFFBQVEsY0FBYztBQUN4QyxPQUFPLFlBQVksV0FBVztBQU05QixTQUFTLDJCQUEyQixRQUFRLGlCQUFpQjtBQU83RCxhQUFhLEdBRWI7Ozs7Ozs7Ozs7Ozs7O0NBY0MsR0FFRCxlQUFlLFNBQVMsUUFDdEIsR0FBVyxFQUNYLE1BQXNCLEVBQ0o7SUFDbEIsTUFBTSxVQUFxQixVQUFVLFVBQVUsQ0FBQztJQUVoRCxrQkFBa0IsR0FDbEIseUVBQXlFO0lBQ3pFLE1BQU0sT0FBTyxRQUFRLEtBQUssR0FDckIsZ0NBQ0QsUUFBUTtJQUNaLHNCQUFzQixHQUV0QixJQUFJO1FBQ0YsT0FBTyxJQUFJLEtBQ1QsUUFBUSxPQUFPLEVBQ2YsS0FDQSxNQUNBLGdCQUFnQixLQUFLLFdBQ0Esa0NBQWtDO0lBQzNELEVBQUUsT0FBTyxHQUFHO1FBQ1YsSUFBSSxhQUFhLGFBQWE7WUFDNUIsTUFBTSxPQUNKLDRCQUNFLEVBQUUsT0FBTyxHQUNULE9BQ0EsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FDakMsT0FDQSxnQkFBZ0IsS0FBSyxXQUNyQixNQUNGO1FBQ0osT0FBTztZQUNMLE1BQU0sRUFBRTtRQUNWLENBQUM7SUFDSDtBQUNGLENBQUMifQ==