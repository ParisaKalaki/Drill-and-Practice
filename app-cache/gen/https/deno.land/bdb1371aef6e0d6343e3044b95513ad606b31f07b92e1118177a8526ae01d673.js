export const defaultMessages = {
    "fileExists:pathCheck": "file :value doesn't exists",
    "fileExists:stringCheck": "file path must be a string",
    isArray: ":attr must be an array",
    isBool: ":attr must be a boolean",
    isEmail: ":attr is not a valid email address",
    isFloat: ":attr must be a float number",
    isIn: ":value is not allowed",
    isInt: ":attr must be an integer",
    isNumber: ":attr must be a number",
    isNumeric: ":attr must be numeric",
    isString: ":attr must be a string",
    lengthBetween: ":attr characters length must be between :minLength-:maxLength",
    match: ":attr format is incorrect",
    maxLength: ":attr cannot be higher than :maxValue characters",
    maxNumber: ":attr cannot be higher than :maxValue",
    minLength: ":attr cannot be lower than :minValue characters",
    minNumber: ":attr cannot be lower than :minValue",
    notIn: ":value is not allowed",
    notNull: ":value cannot be null",
    numberBetween: ":value must be between :minValue - :maxValue",
    required: ":attr is required",
    default: ":attr is invalid"
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvdmFsaWRhc2F1ckB2MC4xNS4wL3NyYy9tZXNzYWdlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFZhbGlkYXRpb25NZXNzYWdlcyB9IGZyb20gXCIuL2ludGVyZmFjZXMudHNcIjtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRNZXNzYWdlczogVmFsaWRhdGlvbk1lc3NhZ2VzID0ge1xuICBcImZpbGVFeGlzdHM6cGF0aENoZWNrXCI6IFwiZmlsZSA6dmFsdWUgZG9lc24ndCBleGlzdHNcIixcbiAgXCJmaWxlRXhpc3RzOnN0cmluZ0NoZWNrXCI6IFwiZmlsZSBwYXRoIG11c3QgYmUgYSBzdHJpbmdcIixcbiAgaXNBcnJheTogXCI6YXR0ciBtdXN0IGJlIGFuIGFycmF5XCIsXG4gIGlzQm9vbDogXCI6YXR0ciBtdXN0IGJlIGEgYm9vbGVhblwiLFxuICBpc0VtYWlsOiBcIjphdHRyIGlzIG5vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3NcIixcbiAgaXNGbG9hdDogXCI6YXR0ciBtdXN0IGJlIGEgZmxvYXQgbnVtYmVyXCIsXG4gIGlzSW46IFwiOnZhbHVlIGlzIG5vdCBhbGxvd2VkXCIsXG4gIGlzSW50OiBcIjphdHRyIG11c3QgYmUgYW4gaW50ZWdlclwiLFxuICBpc051bWJlcjogXCI6YXR0ciBtdXN0IGJlIGEgbnVtYmVyXCIsXG4gIGlzTnVtZXJpYzogXCI6YXR0ciBtdXN0IGJlIG51bWVyaWNcIixcbiAgaXNTdHJpbmc6IFwiOmF0dHIgbXVzdCBiZSBhIHN0cmluZ1wiLFxuICBsZW5ndGhCZXR3ZWVuOlxuICAgIFwiOmF0dHIgY2hhcmFjdGVycyBsZW5ndGggbXVzdCBiZSBiZXR3ZWVuIDptaW5MZW5ndGgtOm1heExlbmd0aFwiLFxuICBtYXRjaDogXCI6YXR0ciBmb3JtYXQgaXMgaW5jb3JyZWN0XCIsXG4gIG1heExlbmd0aDogXCI6YXR0ciBjYW5ub3QgYmUgaGlnaGVyIHRoYW4gOm1heFZhbHVlIGNoYXJhY3RlcnNcIixcbiAgbWF4TnVtYmVyOiBcIjphdHRyIGNhbm5vdCBiZSBoaWdoZXIgdGhhbiA6bWF4VmFsdWVcIixcbiAgbWluTGVuZ3RoOiBcIjphdHRyIGNhbm5vdCBiZSBsb3dlciB0aGFuIDptaW5WYWx1ZSBjaGFyYWN0ZXJzXCIsXG4gIG1pbk51bWJlcjogXCI6YXR0ciBjYW5ub3QgYmUgbG93ZXIgdGhhbiA6bWluVmFsdWVcIixcbiAgbm90SW46IFwiOnZhbHVlIGlzIG5vdCBhbGxvd2VkXCIsXG4gIG5vdE51bGw6IFwiOnZhbHVlIGNhbm5vdCBiZSBudWxsXCIsXG4gIG51bWJlckJldHdlZW46IFwiOnZhbHVlIG11c3QgYmUgYmV0d2VlbiA6bWluVmFsdWUgLSA6bWF4VmFsdWVcIixcbiAgcmVxdWlyZWQ6IFwiOmF0dHIgaXMgcmVxdWlyZWRcIixcbiAgZGVmYXVsdDogXCI6YXR0ciBpcyBpbnZhbGlkXCIsXG59O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sTUFBTSxrQkFBc0M7SUFDakQsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQixTQUFTO0lBQ1QsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixlQUNFO0lBQ0YsT0FBTztJQUNQLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxPQUFPO0lBQ1AsU0FBUztJQUNULGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztBQUNYLEVBQUUifQ==