export default function SearchButton() {
    return (
        <div className="flex">
            <svg
                className="w-4 h-4 text-gray-500 translate-y-1 md:translate-y-0"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <p className="md:hidden  inline-flex items-center px-2 pt-1 border-b-2 border-transparent text-lg md:text-sm font-medium leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                Search
            </p>
            <span className="sr-only">Search icon</span>
        </div>
    );
}
