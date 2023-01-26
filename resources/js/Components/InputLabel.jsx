export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label
            htmlFor={forInput}
            className={
                `absolute p-2 left-3 -top-5 bg-gray-100  text-indigo-700 text-sm transition-all peer-placeholder-shown:p-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-1 peer-focus:-top-6 peer-focus:text-indigo-700 peer-focus:text-sm` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
