export class Cors {
    constructor(props){
        this.props = props;
        this.configureHeaders = ()=>{
            const { props: { corsOptions , requestMethod , setResponseHeader , setStatus , next , end  } , configureOrigin  } = this;
            if (typeof requestMethod === "string" && requestMethod.toUpperCase() === "OPTIONS") {
                configureOrigin().configureCredentials().configureMethods().configureAllowedHeaders().configureMaxAge().configureExposedHeaders();
                if (corsOptions.preflightContinue) return next();
                else {
                    setStatus(corsOptions.optionsSuccessStatus);
                    setResponseHeader("Content-Length", "0");
                    return end();
                }
            } else {
                configureOrigin().configureCredentials().configureExposedHeaders();
                return next();
            }
        };
        this.configureOrigin = ()=>{
            const { props: { corsOptions , getRequestHeader , setResponseHeader  } , setVaryHeader  } = this;
            if (!corsOptions.origin || corsOptions.origin === "*") {
                setResponseHeader("Access-Control-Allow-Origin", "*");
            } else if (typeof corsOptions.origin === "string") {
                setResponseHeader("Access-Control-Allow-Origin", corsOptions.origin);
                setVaryHeader("Origin");
            } else {
                const requestOrigin = getRequestHeader("origin") ?? getRequestHeader("Origin");
                setResponseHeader("Access-Control-Allow-Origin", Cors.isOriginAllowed(requestOrigin, corsOptions.origin) ? requestOrigin : "false");
                setVaryHeader("Origin");
            }
            return this;
        };
        this.configureCredentials = ()=>{
            const { corsOptions , setResponseHeader  } = this.props;
            if (corsOptions.credentials === true) {
                setResponseHeader("Access-Control-Allow-Credentials", "true");
            }
            return this;
        };
        this.configureMethods = ()=>{
            const { corsOptions , setResponseHeader  } = this.props;
            let methods = corsOptions.methods;
            setResponseHeader("Access-Control-Allow-Methods", Array.isArray(methods) ? methods.join(",") : methods);
            return this;
        };
        this.configureAllowedHeaders = ()=>{
            const { props: { corsOptions , getRequestHeader , setResponseHeader  } , setVaryHeader  } = this;
            let allowedHeaders = corsOptions.allowedHeaders;
            if (!allowedHeaders) {
                allowedHeaders = getRequestHeader("access-control-request-headers") ?? getRequestHeader("Access-Control-Request-Headers") ?? undefined;
                setVaryHeader("Access-Control-request-Headers");
            }
            if (allowedHeaders?.length) {
                setResponseHeader("Access-Control-Allow-Headers", Array.isArray(allowedHeaders) ? allowedHeaders.join(",") : allowedHeaders);
            }
            return this;
        };
        this.configureMaxAge = ()=>{
            const { corsOptions , setResponseHeader  } = this.props;
            const maxAge = (typeof corsOptions.maxAge === "number" || typeof corsOptions.maxAge === "string") && corsOptions.maxAge.toString();
            if (maxAge && maxAge.length) {
                setResponseHeader("Access-Control-Max-Age", maxAge);
            }
            return this;
        };
        this.configureExposedHeaders = ()=>{
            const { corsOptions , setResponseHeader  } = this.props;
            let exposedHeaders = corsOptions.exposedHeaders;
            if (exposedHeaders?.length) {
                setResponseHeader("Access-Control-Expose-Headers", Array.isArray(exposedHeaders) ? exposedHeaders.join(",") : exposedHeaders);
            }
            return this;
        };
        this.setVaryHeader = (field)=>{
            const { props: { getResponseHeader , setResponseHeader  } , appendVaryHeader  } = this;
            let existingHeader = getResponseHeader("Vary") ?? "";
            if (existingHeader && typeof existingHeader === "string" && (existingHeader = appendVaryHeader(existingHeader, field))) {
                setResponseHeader("Vary", existingHeader);
            }
        };
        this.appendVaryHeader = (header, field)=>{
            const { parseVaryHeader  } = this;
            if (header === "*") return header;
            let varyHeader = header;
            const fields = parseVaryHeader(field);
            const headers = parseVaryHeader(header.toLocaleLowerCase());
            if (fields.includes("*") || headers.includes("*")) return "*";
            fields.forEach((field)=>{
                const fld = field.toLowerCase();
                if (headers.includes(fld)) {
                    headers.push(fld);
                    varyHeader = varyHeader ? `${varyHeader}, ${field}` : field;
                }
            });
            return varyHeader;
        };
        this.parseVaryHeader = (header)=>{
            let end = 0;
            const list = [];
            let start = 0;
            for(let i = 0, len = header.length; i < len; i++){
                switch(header.charCodeAt(i)){
                    case 0x20 /*   */ :
                        if (start === end) start = end = i + 1;
                        break;
                    case 0x2c /* , */ :
                        list.push(header.substring(start, end));
                        start = end = i + 1;
                        break;
                    default:
                        end = i + 1;
                        break;
                }
            }
            list.push(header.substring(start, end));
            return list;
        };
    }
    static produceCorsOptions = (corsOptions = {}, defaultCorsOptions = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })=>({
            ...defaultCorsOptions,
            ...corsOptions
        });
    static produceCorsOptionsDelegate = (o)=>typeof o === "function" ? o : (_request)=>o;
    static produceOriginDelegate = (corsOptions)=>{
        if (corsOptions.origin) {
            if (typeof corsOptions.origin === "function") {
                return corsOptions.origin;
            }
            return (_requestOrigin)=>corsOptions.origin;
        }
    };
    static isOriginAllowed = (requestOrigin, allowedOrigin)=>{
        if (Array.isArray(allowedOrigin)) {
            return allowedOrigin.some((ao)=>Cors.isOriginAllowed(requestOrigin, ao));
        } else if (typeof allowedOrigin === "string") {
            return requestOrigin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp && typeof requestOrigin === "string") {
            return allowedOrigin.test(requestOrigin);
        } else return !!allowedOrigin;
    };
    configureHeaders;
    configureOrigin;
    configureCredentials;
    configureMethods;
    configureAllowedHeaders;
    configureMaxAge;
    configureExposedHeaders;
    setVaryHeader;
    appendVaryHeader;
    parseVaryHeader;
    props;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvY29yc0B2MS4yLjIvY29ycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG4gIENvcnNPcHRpb25zLFxuICBDb3JzT3B0aW9uc0RlbGVnYXRlLFxuICBPcmlnaW5EZWxlZ2F0ZSxcbn0gZnJvbSBcIi4vdHlwZXMudHNcIjtcblxuaW50ZXJmYWNlIERlZmF1bHRDb3JzT3B0aW9ucyB7XG4gIG9yaWdpbjogc3RyaW5nO1xuICBtZXRob2RzOiBzdHJpbmc7XG4gIHByZWZsaWdodENvbnRpbnVlOiBib29sZWFuO1xuICBvcHRpb25zU3VjY2Vzc1N0YXR1czogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQ29yc1Byb3BzIHtcbiAgY29yc09wdGlvbnM6IFJldHVyblR5cGU8dHlwZW9mIENvcnMucHJvZHVjZUNvcnNPcHRpb25zPjtcbiAgcmVxdWVzdE1ldGhvZDogc3RyaW5nO1xuICBnZXRSZXF1ZXN0SGVhZGVyOiAoaGVhZGVyS2V5OiBzdHJpbmcpID0+IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIGdldFJlc3BvbnNlSGVhZGVyOiAoaGVhZGVyS2V5OiBzdHJpbmcpID0+IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIHNldFJlc3BvbnNlSGVhZGVyOiAoaGVhZGVyS2V5OiBzdHJpbmcsIGhlYWRlclZhbHVlOiBzdHJpbmcpID0+IGFueTtcbiAgc2V0U3RhdHVzOiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiBhbnk7XG4gIG5leHQ6ICguLi5hcmdzOiBhbnkpID0+IGFueTtcbiAgZW5kOiAoLi4uYXJnczogYW55KSA9PiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBDb3JzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9wczogQ29yc1Byb3BzKSB7fVxuXG4gIHB1YmxpYyBzdGF0aWMgcHJvZHVjZUNvcnNPcHRpb25zID0gKFxuICAgIGNvcnNPcHRpb25zOiBDb3JzT3B0aW9ucyA9IHt9LFxuICAgIGRlZmF1bHRDb3JzT3B0aW9uczogRGVmYXVsdENvcnNPcHRpb25zID0ge1xuICAgICAgb3JpZ2luOiBcIipcIixcbiAgICAgIG1ldGhvZHM6IFwiR0VULEhFQUQsUFVULFBBVENILFBPU1QsREVMRVRFXCIsXG4gICAgICBwcmVmbGlnaHRDb250aW51ZTogZmFsc2UsXG4gICAgICBvcHRpb25zU3VjY2Vzc1N0YXR1czogMjA0LFxuICAgIH0sXG4gICkgPT4gKHtcbiAgICAuLi5kZWZhdWx0Q29yc09wdGlvbnMsXG4gICAgLi4uY29yc09wdGlvbnMsXG4gIH0pO1xuXG4gIHB1YmxpYyBzdGF0aWMgcHJvZHVjZUNvcnNPcHRpb25zRGVsZWdhdGUgPSA8XG4gICAgT3B0aW9uc0NhbGxiYWNrVCA9IENvcnNPcHRpb25zRGVsZWdhdGU8YW55PixcbiAgPihcbiAgICBvPzogQ29yc09wdGlvbnMgfCBPcHRpb25zQ2FsbGJhY2tULFxuICApID0+XG4gICAgdHlwZW9mIG8gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAobyBhcyBPcHRpb25zQ2FsbGJhY2tUKVxuICAgICAgOiAoKCgoX3JlcXVlc3Q6IGFueSkgPT4gbykgYXMgdW5rbm93bikgYXMgT3B0aW9uc0NhbGxiYWNrVCk7XG5cbiAgcHVibGljIHN0YXRpYyBwcm9kdWNlT3JpZ2luRGVsZWdhdGUgPSAoXG4gICAgY29yc09wdGlvbnM6IENvcnNQcm9wc1tcImNvcnNPcHRpb25zXCJdLFxuICApID0+IHtcbiAgICBpZiAoY29yc09wdGlvbnMub3JpZ2luKSB7XG4gICAgICBpZiAodHlwZW9mIGNvcnNPcHRpb25zLm9yaWdpbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBjb3JzT3B0aW9ucy5vcmlnaW4gYXMgT3JpZ2luRGVsZWdhdGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoKF9yZXF1ZXN0T3JpZ2luKSA9PiBjb3JzT3B0aW9ucy5vcmlnaW4pIGFzIE9yaWdpbkRlbGVnYXRlO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGlzT3JpZ2luQWxsb3dlZCA9IChcbiAgICByZXF1ZXN0T3JpZ2luOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIGFsbG93ZWRPcmlnaW46IENvcnNPcHRpb25zW1wib3JpZ2luXCJdLFxuICApOiBib29sZWFuID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhbGxvd2VkT3JpZ2luKSkge1xuICAgICAgcmV0dXJuIGFsbG93ZWRPcmlnaW4uc29tZSgoYW8pID0+XG4gICAgICAgIENvcnMuaXNPcmlnaW5BbGxvd2VkKHJlcXVlc3RPcmlnaW4sIGFvKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbGxvd2VkT3JpZ2luID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdE9yaWdpbiA9PT0gYWxsb3dlZE9yaWdpbjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgYWxsb3dlZE9yaWdpbiBpbnN0YW5jZW9mIFJlZ0V4cCAmJlxuICAgICAgdHlwZW9mIHJlcXVlc3RPcmlnaW4gPT09IFwic3RyaW5nXCJcbiAgICApIHtcbiAgICAgIHJldHVybiBhbGxvd2VkT3JpZ2luLnRlc3QocmVxdWVzdE9yaWdpbik7XG4gICAgfSBlbHNlIHJldHVybiAhIWFsbG93ZWRPcmlnaW47XG4gIH07XG5cbiAgcHVibGljIGNvbmZpZ3VyZUhlYWRlcnMgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgY29yc09wdGlvbnMsXG4gICAgICAgIHJlcXVlc3RNZXRob2QsXG4gICAgICAgIHNldFJlc3BvbnNlSGVhZGVyLFxuICAgICAgICBzZXRTdGF0dXMsXG4gICAgICAgIG5leHQsXG4gICAgICAgIGVuZCxcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmVPcmlnaW4sXG4gICAgfSA9IHRoaXM7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcmVxdWVzdE1ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgcmVxdWVzdE1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSBcIk9QVElPTlNcIlxuICAgICkge1xuICAgICAgY29uZmlndXJlT3JpZ2luKClcbiAgICAgICAgLmNvbmZpZ3VyZUNyZWRlbnRpYWxzKClcbiAgICAgICAgLmNvbmZpZ3VyZU1ldGhvZHMoKVxuICAgICAgICAuY29uZmlndXJlQWxsb3dlZEhlYWRlcnMoKVxuICAgICAgICAuY29uZmlndXJlTWF4QWdlKClcbiAgICAgICAgLmNvbmZpZ3VyZUV4cG9zZWRIZWFkZXJzKCk7XG5cbiAgICAgIGlmIChjb3JzT3B0aW9ucy5wcmVmbGlnaHRDb250aW51ZSkgcmV0dXJuIG5leHQoKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBzZXRTdGF0dXMoY29yc09wdGlvbnMub3B0aW9uc1N1Y2Nlc3NTdGF0dXMpO1xuICAgICAgICBzZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtTGVuZ3RoXCIsIFwiMFwiKTtcblxuICAgICAgICByZXR1cm4gZW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZ3VyZU9yaWdpbigpLmNvbmZpZ3VyZUNyZWRlbnRpYWxzKCkuY29uZmlndXJlRXhwb3NlZEhlYWRlcnMoKTtcblxuICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVPcmlnaW4gPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgY29yc09wdGlvbnMsIGdldFJlcXVlc3RIZWFkZXIsIHNldFJlc3BvbnNlSGVhZGVyIH0sXG4gICAgICBzZXRWYXJ5SGVhZGVyLFxuICAgIH0gPSB0aGlzO1xuXG4gICAgaWYgKCFjb3JzT3B0aW9ucy5vcmlnaW4gfHwgY29yc09wdGlvbnMub3JpZ2luID09PSBcIipcIikge1xuICAgICAgc2V0UmVzcG9uc2VIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvcnNPcHRpb25zLm9yaWdpbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgc2V0UmVzcG9uc2VIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgY29yc09wdGlvbnMub3JpZ2luKTtcbiAgICAgIHNldFZhcnlIZWFkZXIoXCJPcmlnaW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlcXVlc3RPcmlnaW4gPSBnZXRSZXF1ZXN0SGVhZGVyKFwib3JpZ2luXCIpID8/XG4gICAgICAgIGdldFJlcXVlc3RIZWFkZXIoXCJPcmlnaW5cIik7XG5cbiAgICAgIHNldFJlc3BvbnNlSGVhZGVyKFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLFxuICAgICAgICBDb3JzLmlzT3JpZ2luQWxsb3dlZChyZXF1ZXN0T3JpZ2luLCBjb3JzT3B0aW9ucy5vcmlnaW4pXG4gICAgICAgICAgPyAocmVxdWVzdE9yaWdpbiBhcyBzdHJpbmcpXG4gICAgICAgICAgOiBcImZhbHNlXCIsXG4gICAgICApO1xuICAgICAgc2V0VmFyeUhlYWRlcihcIk9yaWdpblwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBwcml2YXRlIGNvbmZpZ3VyZUNyZWRlbnRpYWxzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29yc09wdGlvbnMsIHNldFJlc3BvbnNlSGVhZGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGNvcnNPcHRpb25zLmNyZWRlbnRpYWxzID09PSB0cnVlKSB7XG4gICAgICBzZXRSZXNwb25zZUhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCIsIFwidHJ1ZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBwcml2YXRlIGNvbmZpZ3VyZU1ldGhvZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb3JzT3B0aW9ucywgc2V0UmVzcG9uc2VIZWFkZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgbWV0aG9kcyA9IGNvcnNPcHRpb25zLm1ldGhvZHM7XG5cbiAgICBzZXRSZXNwb25zZUhlYWRlcihcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiLFxuICAgICAgQXJyYXkuaXNBcnJheShtZXRob2RzKSA/IG1ldGhvZHMuam9pbihcIixcIikgOiBtZXRob2RzLFxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBwcml2YXRlIGNvbmZpZ3VyZUFsbG93ZWRIZWFkZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGNvcnNPcHRpb25zLCBnZXRSZXF1ZXN0SGVhZGVyLCBzZXRSZXNwb25zZUhlYWRlciB9LFxuICAgICAgc2V0VmFyeUhlYWRlcixcbiAgICB9ID0gdGhpcztcblxuICAgIGxldCBhbGxvd2VkSGVhZGVycyA9IGNvcnNPcHRpb25zLmFsbG93ZWRIZWFkZXJzO1xuXG4gICAgaWYgKCFhbGxvd2VkSGVhZGVycykge1xuICAgICAgYWxsb3dlZEhlYWRlcnMgPSBnZXRSZXF1ZXN0SGVhZGVyKFwiYWNjZXNzLWNvbnRyb2wtcmVxdWVzdC1oZWFkZXJzXCIpID8/XG4gICAgICAgIGdldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1SZXF1ZXN0LUhlYWRlcnNcIikgPz9cbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBzZXRWYXJ5SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtcmVxdWVzdC1IZWFkZXJzXCIpO1xuICAgIH1cblxuICAgIGlmIChhbGxvd2VkSGVhZGVycz8ubGVuZ3RoKSB7XG4gICAgICBzZXRSZXNwb25zZUhlYWRlcihcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoYWxsb3dlZEhlYWRlcnMpXG4gICAgICAgICAgPyBhbGxvd2VkSGVhZGVycy5qb2luKFwiLFwiKVxuICAgICAgICAgIDogYWxsb3dlZEhlYWRlcnMsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHByaXZhdGUgY29uZmlndXJlTWF4QWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29yc09wdGlvbnMsIHNldFJlc3BvbnNlSGVhZGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgbWF4QWdlID0gKHR5cGVvZiBjb3JzT3B0aW9ucy5tYXhBZ2UgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgIHR5cGVvZiBjb3JzT3B0aW9ucy5tYXhBZ2UgPT09IFwic3RyaW5nXCIpICYmXG4gICAgICBjb3JzT3B0aW9ucy5tYXhBZ2UudG9TdHJpbmcoKTtcblxuICAgIGlmIChtYXhBZ2UgJiYgbWF4QWdlLmxlbmd0aCkge1xuICAgICAgc2V0UmVzcG9uc2VIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1NYXgtQWdlXCIsIG1heEFnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVFeHBvc2VkSGVhZGVycyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvcnNPcHRpb25zLCBzZXRSZXNwb25zZUhlYWRlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBleHBvc2VkSGVhZGVycyA9IGNvcnNPcHRpb25zLmV4cG9zZWRIZWFkZXJzO1xuXG4gICAgaWYgKGV4cG9zZWRIZWFkZXJzPy5sZW5ndGgpIHtcbiAgICAgIHNldFJlc3BvbnNlSGVhZGVyKFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUV4cG9zZS1IZWFkZXJzXCIsXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZXhwb3NlZEhlYWRlcnMpXG4gICAgICAgICAgPyBleHBvc2VkSGVhZGVycy5qb2luKFwiLFwiKVxuICAgICAgICAgIDogZXhwb3NlZEhlYWRlcnMsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHByaXZhdGUgc2V0VmFyeUhlYWRlciA9IChmaWVsZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgZ2V0UmVzcG9uc2VIZWFkZXIsIHNldFJlc3BvbnNlSGVhZGVyIH0sXG4gICAgICBhcHBlbmRWYXJ5SGVhZGVyLFxuICAgIH0gPSB0aGlzO1xuXG4gICAgbGV0IGV4aXN0aW5nSGVhZGVyID0gZ2V0UmVzcG9uc2VIZWFkZXIoXCJWYXJ5XCIpID8/IFwiXCI7XG5cbiAgICBpZiAoXG4gICAgICBleGlzdGluZ0hlYWRlciAmJlxuICAgICAgdHlwZW9mIGV4aXN0aW5nSGVhZGVyID09PSBcInN0cmluZ1wiICYmXG4gICAgICAoZXhpc3RpbmdIZWFkZXIgPSBhcHBlbmRWYXJ5SGVhZGVyKGV4aXN0aW5nSGVhZGVyLCBmaWVsZCkpXG4gICAgKSB7XG4gICAgICBzZXRSZXNwb25zZUhlYWRlcihcIlZhcnlcIiwgZXhpc3RpbmdIZWFkZXIpO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGFwcGVuZFZhcnlIZWFkZXIgPSAoaGVhZGVyOiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB7IHBhcnNlVmFyeUhlYWRlciB9ID0gdGhpcztcblxuICAgIGlmIChoZWFkZXIgPT09IFwiKlwiKSByZXR1cm4gaGVhZGVyO1xuXG4gICAgbGV0IHZhcnlIZWFkZXIgPSBoZWFkZXI7XG4gICAgY29uc3QgZmllbGRzID0gcGFyc2VWYXJ5SGVhZGVyKGZpZWxkKTtcbiAgICBjb25zdCBoZWFkZXJzID0gcGFyc2VWYXJ5SGVhZGVyKGhlYWRlci50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcblxuICAgIGlmIChmaWVsZHMuaW5jbHVkZXMoXCIqXCIpIHx8IGhlYWRlcnMuaW5jbHVkZXMoXCIqXCIpKSByZXR1cm4gXCIqXCI7XG5cbiAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHtcbiAgICAgIGNvbnN0IGZsZCA9IGZpZWxkLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChoZWFkZXJzLmluY2x1ZGVzKGZsZCkpIHtcbiAgICAgICAgaGVhZGVycy5wdXNoKGZsZCk7XG4gICAgICAgIHZhcnlIZWFkZXIgPSB2YXJ5SGVhZGVyID8gYCR7dmFyeUhlYWRlcn0sICR7ZmllbGR9YCA6IGZpZWxkO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZhcnlIZWFkZXI7XG4gIH07XG5cbiAgcHJpdmF0ZSBwYXJzZVZhcnlIZWFkZXIgPSAoaGVhZGVyOiBzdHJpbmcpID0+IHtcbiAgICBsZXQgZW5kID0gMDtcbiAgICBjb25zdCBsaXN0ID0gW107XG4gICAgbGV0IHN0YXJ0ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoZWFkZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHN3aXRjaCAoaGVhZGVyLmNoYXJDb2RlQXQoaSkpIHtcbiAgICAgICAgY2FzZSAweDIwIC8qICAgKi86XG4gICAgICAgICAgaWYgKHN0YXJ0ID09PSBlbmQpIHN0YXJ0ID0gZW5kID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMHgyYyAvKiAsICovOlxuICAgICAgICAgIGxpc3QucHVzaChoZWFkZXIuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgICBzdGFydCA9IGVuZCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGVuZCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3QucHVzaChoZWFkZXIuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpKTtcblxuICAgIHJldHVybiBsaXN0O1xuICB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxPQUFPLE1BQU07SUFDWCxZQUFvQixNQUFrQjtxQkFBbEI7YUFzRGIsbUJBQW1CLElBQU07WUFDOUIsTUFBTSxFQUNKLE9BQU8sRUFDTCxZQUFXLEVBQ1gsY0FBYSxFQUNiLGtCQUFpQixFQUNqQixVQUFTLEVBQ1QsS0FBSSxFQUNKLElBQUcsRUFDSixDQUFBLEVBQ0QsZ0JB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