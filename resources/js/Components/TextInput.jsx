import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        placeholder,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            value={value}
            className={
                "peer h-12 w-full bg-gray-100 border-b-2 border-gray-300 rounded-md shadow-md placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
        />
    );
});
