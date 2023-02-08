import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";

export default function Register({ auth }) {
    const [errorField, setErrorField] = useState("");
    const [showErrorField, setShowErrorField] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        lastname: "",
        firstname: "",
        gender: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (errorField.length > 0) {
            setShowErrorField(true);
        }
    }, [errorField]);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.role !== "l" && data.role !== "t") {
            setErrorField(
                "You have to choose between 2 roles : Learner or Teacher."
            );
        } else post(route("register"));
    };

    return (
        <General auth={auth}>
            <div
                class={
                    showErrorField
                        ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        : "hidden"
                }
                role="alert"
            >
                <strong class="font-bold">Error: </strong>
                <span class="block sm:inline">{errorField}</span>
                <span
                    class="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setShowErrorField(false)}
                >
                    <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span>
            </div>
            <Head title="Register" />
            <div className="flex items-center justify-center bg-gray-100 min-h-[calc(100vh-125px)]">
                <div className="w-3/4 lg:w-1/2 mx-auto py-10">
                    <h3 className="text-3xl text-center mb-6">
                        <span className="text-indigo-700">Join</span> us today !
                    </h3>
                    <form onSubmit={submit}>
                        <div className="relative">
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                handleChange={onHandleChange}
                                isFocused
                                placeholder="Username"
                                required
                            />

                            <InputLabel forInput="username" value="Username" />

                            <InputError
                                message={errors.username}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-8 relative">
                            <TextInput
                                id="firstname"
                                type="text"
                                name="firstname"
                                value={data.firstname}
                                className="mt-1 block w-full"
                                autoComplete="firstname"
                                handleChange={onHandleChange}
                                placeholder="firstname"
                                required
                            />
                            <InputLabel
                                forInput="firstname"
                                value="Firstname"
                            />
                            <InputError
                                message={errors.firstname}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-8 relative">
                            <TextInput
                                id="lastname"
                                type="text"
                                name="lastname"
                                value={data.lastname}
                                className="mt-1 block w-full"
                                autoComplete="lastname"
                                handleChange={onHandleChange}
                                placeholder="lastname"
                                required
                            />
                            <InputLabel forInput="lastname" value="Lastname" />

                            <InputError
                                message={errors.lastname}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-8 relative">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="email"
                                handleChange={onHandleChange}
                                placeholder="email@email.email"
                                required
                            />
                            <InputLabel forInput="email" value="Email" />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-8 flex justify-between align-center">
                            <div className="relative">
                                <select
                                    value={data.gender}
                                    onChange={onHandleChange}
                                    name="gender"
                                    className="py-[14px] lg:px-12 rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                                >
                                    <option value="" selected disabled hidden>
                                        Indicate gender
                                    </option>
                                    <option value="f">Female</option>
                                    <option value="m">Male</option>
                                    <option value="o">Other</option>
                                </select>
                                <InputLabel forInput="gender" value="Gender" />
                                <InputError
                                    message={errors.gender}
                                    className="mt-2"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    name="role"
                                    className="py-[14px] lg:px-12 rounded-md bg-gray-100 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-700  focus:ring-indigo-700"
                                    value={data.role}
                                    onChange={onHandleChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Indicate role
                                    </option>
                                    <option value="l">Learner</option>
                                    <option value="t">Teacher</option>
                                </select>
                                <InputLabel forInput="role" value="Role" />
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-8 relative">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="password"
                                handleChange={onHandleChange}
                                placeholder="password"
                                required
                            />
                            <InputLabel forInput="password" value="Password" />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-8 relative">
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="password_confirmation"
                                handleChange={onHandleChange}
                                placeholder="password_confirmation"
                                required
                            />
                            <InputLabel
                                forInput="password_confirmation"
                                value="Confirm Password"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-8 relative">
                            <Link
                                href={route("login")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton
                                className="ml-4"
                                processing={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </General>
    );
}
