import compile from "./compile.ts";
import { getConfig } from "./config.ts";
import { promiseImpl } from "./polyfills.ts";
import EtaErr from "./err.ts";
/* END TYPES */ function handleCache(template, options) {
    if (options.cache && options.name && options.templates.get(options.name)) {
        return options.templates.get(options.name);
    }
    const templateFunc = typeof template === "function" ? template : compile(template, options);
    // Note that we don't have to check if it already exists in the cache;
    // it would have returned earlier if it had
    if (options.cache && options.name) {
        options.templates.define(options.name, templateFunc);
    }
    return templateFunc;
}
export default function render(template, data, config, cb) {
    const options = getConfig(config || {});
    if (options.async) {
        if (cb) {
            // If user passes callback
            try {
                // Note: if there is an error while rendering the template,
                // It will bubble up and be caught here
                const templateFn = handleCache(template, options);
                templateFn(data, options, cb);
            } catch (err) {
                return cb(err);
            }
        } else {
            // No callback, try returning a promise
            if (typeof promiseImpl === "function") {
                return new promiseImpl(function(resolve, reject) {
                    try {
                        resolve(handleCache(template, options)(data, options));
                    } catch (err) {
                        reject(err);
                    }
                });
            } else {
                throw EtaErr("Please provide a callback function, this env doesn't support Promises");
            }
        }
    } else {
        return handleCache(template, options)(data, options);
    }
}
export function renderAsync(template, data, config, cb) {
    // Using Object.assign to lower bundle size, using spread operator makes it larger because of typescript injected polyfills
    return render(template, data, Object.assign({}, config, {
        async: true
    }), cb);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvZXRhQHYyLjIuMC9yZW5kZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbXBpbGUgZnJvbSBcIi4vY29tcGlsZS50c1wiO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSBcIi4vY29uZmlnLnRzXCI7XG5pbXBvcnQgeyBwcm9taXNlSW1wbCB9IGZyb20gXCIuL3BvbHlmaWxscy50c1wiO1xuaW1wb3J0IEV0YUVyciBmcm9tIFwiLi9lcnIudHNcIjtcblxuLyogVFlQRVMgKi9cblxuaW1wb3J0IHR5cGUgeyBFdGFDb25maWcsIFBhcnRpYWxBc3luY0NvbmZpZywgUGFydGlhbENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBUZW1wbGF0ZUZ1bmN0aW9uIH0gZnJvbSBcIi4vY29tcGlsZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBDYWxsYmFja0ZuIH0gZnJvbSBcIi4vZmlsZS1oYW5kbGVycy50c1wiO1xuXG4vKiBFTkQgVFlQRVMgKi9cblxuZnVuY3Rpb24gaGFuZGxlQ2FjaGUoXG4gIHRlbXBsYXRlOiBzdHJpbmcgfCBUZW1wbGF0ZUZ1bmN0aW9uLFxuICBvcHRpb25zOiBFdGFDb25maWcsXG4pOiBUZW1wbGF0ZUZ1bmN0aW9uIHtcbiAgaWYgKG9wdGlvbnMuY2FjaGUgJiYgb3B0aW9ucy5uYW1lICYmIG9wdGlvbnMudGVtcGxhdGVzLmdldChvcHRpb25zLm5hbWUpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMudGVtcGxhdGVzLmdldChvcHRpb25zLm5hbWUpO1xuICB9XG5cbiAgY29uc3QgdGVtcGxhdGVGdW5jID0gdHlwZW9mIHRlbXBsYXRlID09PSBcImZ1bmN0aW9uXCJcbiAgICA/IHRlbXBsYXRlXG4gICAgOiBjb21waWxlKHRlbXBsYXRlLCBvcHRpb25zKTtcblxuICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgY2FjaGU7XG4gIC8vIGl0IHdvdWxkIGhhdmUgcmV0dXJuZWQgZWFybGllciBpZiBpdCBoYWRcbiAgaWYgKG9wdGlvbnMuY2FjaGUgJiYgb3B0aW9ucy5uYW1lKSB7XG4gICAgb3B0aW9ucy50ZW1wbGF0ZXMuZGVmaW5lKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVGdW5jKTtcbiAgfVxuXG4gIHJldHVybiB0ZW1wbGF0ZUZ1bmM7XG59XG5cbi8qKlxuICogUmVuZGVyIGEgdGVtcGxhdGVcbiAqXG4gKiBJZiBgdGVtcGxhdGVgIGlzIGEgc3RyaW5nLCBFdGEgd2lsbCBjb21waWxlIGl0IHRvIGEgZnVuY3Rpb24gYW5kIHRoZW4gY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIHRlbXBsYXRlIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYGZhbHNlYCwgRXRhIHdpbGwgcmV0dXJuIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZS5cbiAqXG4gKiBJZiBgY29uZmlnLmFzeW5jYCBpcyBgdHJ1ZWAgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCBgKGVyciwgcmVuZGVyZWRUZW1wbGF0ZSlgLlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYHRydWVgIGFuZCB0aGVyZSdzIG5vdCBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlbmRlcmVkIHRlbXBsYXRlLlxuICpcbiAqIElmIGBjb25maWcuY2FjaGVgIGlzIGB0cnVlYCBhbmQgYGNvbmZpZ2AgaGFzIGEgYG5hbWVgIG9yIGBmaWxlbmFtZWAgcHJvcGVydHksIEV0YSB3aWxsIGNhY2hlIHRoZSB0ZW1wbGF0ZSBvbiB0aGUgZmlyc3QgcmVuZGVyIGFuZCB1c2UgdGhlIGNhY2hlZCB0ZW1wbGF0ZSBmb3IgYWxsIHN1YnNlcXVlbnQgcmVuZGVycy5cbiAqXG4gKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgc3RyaW5nIG9yIHRlbXBsYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZGF0YSBEYXRhIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgd2l0aFxuICogQHBhcmFtIGNvbmZpZyBPcHRpb25hbCBjb25maWcgb3B0aW9uc1xuICogQHBhcmFtIGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihcbiAgdGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlRnVuY3Rpb24sXG4gIGRhdGE6IG9iamVjdCxcbiAgY29uZmlnOiBQYXJ0aWFsQXN5bmNDb25maWcsXG4gIGNiOiBDYWxsYmFja0ZuLFxuKTogdm9pZDtcblxuLyoqXG4gKiBSZW5kZXIgYSB0ZW1wbGF0ZVxuICpcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgYSBzdHJpbmcsIEV0YSB3aWxsIGNvbXBpbGUgaXQgdG8gYSBmdW5jdGlvbiBhbmQgdGhlbiBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKiBJZiBgdGVtcGxhdGVgIGlzIGEgdGVtcGxhdGUgZnVuY3Rpb24sIEV0YSB3aWxsIGNhbGwgaXQgd2l0aCB0aGUgcHJvdmlkZWQgZGF0YS5cbiAqXG4gKiBJZiBgY29uZmlnLmFzeW5jYCBpcyBgZmFsc2VgLCBFdGEgd2lsbCByZXR1cm4gdGhlIHJlbmRlcmVkIHRlbXBsYXRlLlxuICpcbiAqIElmIGBjb25maWcuYXN5bmNgIGlzIGB0cnVlYCBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXG4gKiBJZiBgY29uZmlnLmFzeW5jYCBpcyBgdHJ1ZWAgYW5kIHRoZXJlJ3Mgbm90IGEgY2FsbGJhY2sgZnVuY3Rpb24sIEV0YSB3aWxsIHJldHVybiBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcmVuZGVyZWQgdGVtcGxhdGUuXG4gKlxuICogSWYgYGNvbmZpZy5jYWNoZWAgaXMgYHRydWVgIGFuZCBgY29uZmlnYCBoYXMgYSBgbmFtZWAgb3IgYGZpbGVuYW1lYCBwcm9wZXJ0eSwgRXRhIHdpbGwgY2FjaGUgdGhlIHRlbXBsYXRlIG9uIHRoZSBmaXJzdCByZW5kZXIgYW5kIHVzZSB0aGUgY2FjaGVkIHRlbXBsYXRlIGZvciBhbGwgc3Vic2VxdWVudCByZW5kZXJzLlxuICpcbiAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBzdHJpbmcgb3IgdGVtcGxhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSB3aXRoXG4gKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIGNvbmZpZyBvcHRpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihcbiAgdGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlRnVuY3Rpb24sXG4gIGRhdGE6IG9iamVjdCxcbiAgY29uZmlnOiBQYXJ0aWFsQXN5bmNDb25maWcsXG4pOiBQcm9taXNlPHN0cmluZz47XG5cbi8qKlxuICogUmVuZGVyIGEgdGVtcGxhdGVcbiAqXG4gKiBJZiBgdGVtcGxhdGVgIGlzIGEgc3RyaW5nLCBFdGEgd2lsbCBjb21waWxlIGl0IHRvIGEgZnVuY3Rpb24gYW5kIHRoZW4gY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIHRlbXBsYXRlIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYGZhbHNlYCwgRXRhIHdpbGwgcmV0dXJuIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZS5cbiAqXG4gKiBJZiBgY29uZmlnLmFzeW5jYCBpcyBgdHJ1ZWAgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCBgKGVyciwgcmVuZGVyZWRUZW1wbGF0ZSlgLlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYHRydWVgIGFuZCB0aGVyZSdzIG5vdCBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlbmRlcmVkIHRlbXBsYXRlLlxuICpcbiAqIElmIGBjb25maWcuY2FjaGVgIGlzIGB0cnVlYCBhbmQgYGNvbmZpZ2AgaGFzIGEgYG5hbWVgIG9yIGBmaWxlbmFtZWAgcHJvcGVydHksIEV0YSB3aWxsIGNhY2hlIHRoZSB0ZW1wbGF0ZSBvbiB0aGUgZmlyc3QgcmVuZGVyIGFuZCB1c2UgdGhlIGNhY2hlZCB0ZW1wbGF0ZSBmb3IgYWxsIHN1YnNlcXVlbnQgcmVuZGVycy5cbiAqXG4gKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgc3RyaW5nIG9yIHRlbXBsYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZGF0YSBEYXRhIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgd2l0aFxuICogQHBhcmFtIGNvbmZpZyBPcHRpb25hbCBjb25maWcgb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXIoXG4gIHRlbXBsYXRlOiBzdHJpbmcgfCBUZW1wbGF0ZUZ1bmN0aW9uLFxuICBkYXRhOiBvYmplY3QsXG4gIGNvbmZpZz86IFBhcnRpYWxDb25maWcsXG4pOiBzdHJpbmc7XG5cbi8qKlxuICogUmVuZGVyIGEgdGVtcGxhdGVcbiAqXG4gKiBJZiBgdGVtcGxhdGVgIGlzIGEgc3RyaW5nLCBFdGEgd2lsbCBjb21waWxlIGl0IHRvIGEgZnVuY3Rpb24gYW5kIHRoZW4gY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIHRlbXBsYXRlIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYGZhbHNlYCwgRXRhIHdpbGwgcmV0dXJuIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZS5cbiAqXG4gKiBJZiBgY29uZmlnLmFzeW5jYCBpcyBgdHJ1ZWAgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCBgKGVyciwgcmVuZGVyZWRUZW1wbGF0ZSlgLlxuICogSWYgYGNvbmZpZy5hc3luY2AgaXMgYHRydWVgIGFuZCB0aGVyZSdzIG5vdCBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlbmRlcmVkIHRlbXBsYXRlLlxuICpcbiAqIElmIGBjb25maWcuY2FjaGVgIGlzIGB0cnVlYCBhbmQgYGNvbmZpZ2AgaGFzIGEgYG5hbWVgIG9yIGBmaWxlbmFtZWAgcHJvcGVydHksIEV0YSB3aWxsIGNhY2hlIHRoZSB0ZW1wbGF0ZSBvbiB0aGUgZmlyc3QgcmVuZGVyIGFuZCB1c2UgdGhlIGNhY2hlZCB0ZW1wbGF0ZSBmb3IgYWxsIHN1YnNlcXVlbnQgcmVuZGVycy5cbiAqXG4gKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgc3RyaW5nIG9yIHRlbXBsYXRlIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZGF0YSBEYXRhIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgd2l0aFxuICogQHBhcmFtIGNvbmZpZyBPcHRpb25hbCBjb25maWcgb3B0aW9uc1xuICogQHBhcmFtIGNiIENhbGxiYWNrIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcihcbiAgdGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlRnVuY3Rpb24sXG4gIGRhdGE6IG9iamVjdCxcbiAgY29uZmlnPzogUGFydGlhbENvbmZpZyxcbiAgY2I/OiBDYWxsYmFja0ZuLFxuKTogc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+IHwgdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyKFxuICB0ZW1wbGF0ZTogc3RyaW5nIHwgVGVtcGxhdGVGdW5jdGlvbixcbiAgZGF0YTogb2JqZWN0LFxuICBjb25maWc/OiBQYXJ0aWFsQ29uZmlnLFxuICBjYj86IENhbGxiYWNrRm4sXG4pOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4gfCB2b2lkIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGdldENvbmZpZyhjb25maWcgfHwge30pO1xuXG4gIGlmIChvcHRpb25zLmFzeW5jKSB7XG4gICAgaWYgKGNiKSB7XG4gICAgICAvLyBJZiB1c2VyIHBhc3NlcyBjYWxsYmFja1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gTm90ZTogaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2hpbGUgcmVuZGVyaW5nIHRoZSB0ZW1wbGF0ZSxcbiAgICAgICAgLy8gSXQgd2lsbCBidWJibGUgdXAgYW5kIGJlIGNhdWdodCBoZXJlXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlRm4gPSBoYW5kbGVDYWNoZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICAgIHRlbXBsYXRlRm4oZGF0YSwgb3B0aW9ucywgY2IpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldHVybiBjYihlcnIgYXMgRXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBjYWxsYmFjaywgdHJ5IHJldHVybmluZyBhIHByb21pc2VcbiAgICAgIGlmICh0eXBlb2YgcHJvbWlzZUltcGwgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VJbXBsKGZ1bmN0aW9uIChyZXNvbHZlOiBGdW5jdGlvbiwgcmVqZWN0OiBGdW5jdGlvbikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlKGhhbmRsZUNhY2hlKHRlbXBsYXRlLCBvcHRpb25zKShkYXRhLCBvcHRpb25zKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXRhRXJyKFxuICAgICAgICAgIFwiUGxlYXNlIHByb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvbiwgdGhpcyBlbnYgZG9lc24ndCBzdXBwb3J0IFByb21pc2VzXCIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBoYW5kbGVDYWNoZSh0ZW1wbGF0ZSwgb3B0aW9ucykoZGF0YSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW5kZXIgYSB0ZW1wbGF0ZSBhc3luY2hyb25vdXNseVxuICpcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgYSBzdHJpbmcsIEV0YSB3aWxsIGNvbXBpbGUgaXQgdG8gYSBmdW5jdGlvbiBhbmQgY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCBpdCB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXG4gKiBJZiB0aGVyZSBpcyBub3QgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZVxuICpcbiAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBzdHJpbmcgb3IgdGVtcGxhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSB3aXRoXG4gKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIGNvbmZpZyBvcHRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBc3luYyhcbiAgdGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlRnVuY3Rpb24sXG4gIGRhdGE6IG9iamVjdCxcbiAgY29uZmlnPzogUGFydGlhbENvbmZpZyxcbik6IFByb21pc2U8c3RyaW5nPjtcblxuLyoqXG4gKiBSZW5kZXIgYSB0ZW1wbGF0ZSBhc3luY2hyb25vdXNseVxuICpcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgYSBzdHJpbmcsIEV0YSB3aWxsIGNvbXBpbGUgaXQgdG8gYSBmdW5jdGlvbiBhbmQgY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCBpdCB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXG4gKiBJZiB0aGVyZSBpcyBub3QgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZVxuICpcbiAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBzdHJpbmcgb3IgdGVtcGxhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSB3aXRoXG4gKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIGNvbmZpZyBvcHRpb25zXG4gKiBAcGFyYW0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFzeW5jKFxuICB0ZW1wbGF0ZTogc3RyaW5nIHwgVGVtcGxhdGVGdW5jdGlvbixcbiAgZGF0YTogb2JqZWN0LFxuICBjb25maWc6IFBhcnRpYWxDb25maWcsXG4gIGNiOiBDYWxsYmFja0ZuLFxuKTogdm9pZDtcblxuLyoqXG4gKiBSZW5kZXIgYSB0ZW1wbGF0ZSBhc3luY2hyb25vdXNseVxuICpcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgYSBzdHJpbmcsIEV0YSB3aWxsIGNvbXBpbGUgaXQgdG8gYSBmdW5jdGlvbiBhbmQgY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxuICogSWYgYHRlbXBsYXRlYCBpcyBhIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXG4gKlxuICogSWYgdGhlcmUgaXMgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCBpdCB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXG4gKiBJZiB0aGVyZSBpcyBub3QgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZVxuICpcbiAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBzdHJpbmcgb3IgdGVtcGxhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSB3aXRoXG4gKiBAcGFyYW0gY29uZmlnIE9wdGlvbmFsIGNvbmZpZyBvcHRpb25zXG4gKiBAcGFyYW0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFzeW5jKFxuICB0ZW1wbGF0ZTogc3RyaW5nIHwgVGVtcGxhdGVGdW5jdGlvbixcbiAgZGF0YTogb2JqZWN0LFxuICBjb25maWc/OiBQYXJ0aWFsQ29uZmlnLFxuICBjYj86IENhbGxiYWNrRm4sXG4pOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4gfCB2b2lkO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQXN5bmMoXG4gIHRlbXBsYXRlOiBzdHJpbmcgfCBUZW1wbGF0ZUZ1bmN0aW9uLFxuICBkYXRhOiBvYmplY3QsXG4gIGNvbmZpZz86IFBhcnRpYWxDb25maWcsXG4gIGNiPzogQ2FsbGJhY2tGbixcbik6IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPiB8IHZvaWQge1xuICAvLyBVc2luZyBPYmplY3QuYXNzaWduIHRvIGxvd2VyIGJ1bmRsZSBzaXplLCB1c2luZyBzcHJlYWQgb3BlcmF0b3IgbWFrZXMgaXQgbGFyZ2VyIGJlY2F1c2Ugb2YgdHlwZXNjcmlwdCBpbmplY3RlZCBwb2x5ZmlsbHNcbiAgcmV0dXJuIHJlbmRlcih0ZW1wbGF0ZSwgZGF0YSwgT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLCB7IGFzeW5jOiB0cnVlIH0pLCBjYik7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLGVBQWU7QUFDbkMsU0FBUyxTQUFTLFFBQVEsY0FBYztBQUN4QyxTQUFTLFdBQVcsUUFBUSxpQkFBaUI7QUFDN0MsT0FBTyxZQUFZLFdBQVc7QUFROUIsYUFBYSxHQUViLFNBQVMsWUFDUCxRQUFtQyxFQUNuQyxPQUFrQixFQUNBO0lBQ2xCLElBQUksUUFBUSxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksUUFBUSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ3hFLE9BQU8sUUFBUSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSTtJQUMzQyxDQUFDO0lBRUQsTUFBTSxlQUFlLE9BQU8sYUFBYSxhQUNyQyxXQUNBLFFBQVEsVUFBVSxRQUFRO0lBRTlCLHNFQUFzRTtJQUN0RSwyQ0FBMkM7SUFDM0MsSUFBSSxRQUFRLEtBQUssSUFBSSxRQUFRLElBQUksRUFBRTtRQUNqQyxRQUFRLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLEVBQUU7SUFDekMsQ0FBQztJQUVELE9BQU87QUFDVDtBQWtHQSxlQUFlLFNBQVMsT0FDdEIsUUFBbUMsRUFDbkMsSUFBWSxFQUNaLE1BQXNCLEVBQ3RCLEVBQWUsRUFDa0I7SUFDakMsTUFBTSxVQUFVLFVBQVUsVUFBVSxDQUFDO0lBRXJDLElBQUksUUFBUSxLQUFLLEVBQUU7UUFDakIsSUFBSSxJQUFJO1lBQ04sMEJBQTBCO1lBQzFCLElBQUk7Z0JBQ0YsMkRBQTJEO2dCQUMzRCx1Q0FBdUM7Z0JBQ3ZDLE1BQU0sYUFBYSxZQUFZLFVBQVU7Z0JBQ3pDLFdBQVcsTUFBTSxTQUFTO1lBQzVCLEVBQUUsT0FBTyxLQUFLO2dCQUNaLE9BQU8sR0FBRztZQUNaO1FBQ0YsT0FBTztZQUNMLHVDQUF1QztZQUN2QyxJQUFJLE9BQU8sZ0JBQWdCLFlBQVk7Z0JBQ3JDLE9BQU8sSUFBSSxZQUFZLFNBQVUsT0FBaUIsRUFBRSxNQUFnQixFQUFFO29CQUNwRSxJQUFJO3dCQUNGLFFBQVEsWUFBWSxVQUFVLFNBQVMsTUFBTTtvQkFDL0MsRUFBRSxPQUFPLEtBQUs7d0JBQ1osT0FBTztvQkFDVDtnQkFDRjtZQUNGLE9BQU87Z0JBQ0wsTUFBTSxPQUNKLHlFQUNBO1lBQ0osQ0FBQztRQUNILENBQUM7SUFDSCxPQUFPO1FBQ0wsT0FBTyxZQUFZLFVBQVUsU0FBUyxNQUFNO0lBQzlDLENBQUM7QUFDSCxDQUFDO0FBK0RELE9BQU8sU0FBUyxZQUNkLFFBQW1DLEVBQ25DLElBQVksRUFDWixNQUFzQixFQUN0QixFQUFlLEVBQ2tCO0lBQ2pDLDJIQUEySDtJQUMzSCxPQUFPLE9BQU8sVUFBVSxNQUFNLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxRQUFRO1FBQUUsT0FBTyxJQUFJO0lBQUMsSUFBSTtBQUM1RSxDQUFDIn0=