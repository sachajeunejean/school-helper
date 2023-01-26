export default function SecondaryButton({
    type = "button",
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
                `inline-flex items-center justify-center text-sm px-4 py-2 bg-red-800 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-gray-200 hover:text-black hover:ring-2 hover:ring-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
