export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center justify-center px-4 py-2 bg-indigo-800 border border-transparent  font-semibold text-white uppercase tracking-widest hover:bg-gray-200 hover:text-black  focus:outline-none transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
