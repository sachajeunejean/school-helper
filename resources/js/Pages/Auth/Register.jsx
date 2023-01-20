import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import General from "@/Layouts/GeneralLayout";

export default function Register() {
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

        post(route("register"));
    };

    return (
        <General>
            <Head title="Register" />
            <div className="w-3/4 mx-auto my-10">
                <h3 className="text-3xl text-center mb-6">
                    <span className="text-indigo-700">Join</span> us today !
                </h3>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel forInput="username" value="Username" />

                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="lastname" value="Lastname" />

                        <TextInput
                            id="lastname"
                            name="lastname"
                            value={data.lastname}
                            className="mt-1 block w-full"
                            autoComplete="lastname"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError
                            message={errors.lastname}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="firstname" value="Firstname" />

                        <TextInput
                            id="firstname"
                            name="firstname"
                            value={data.firstname}
                            className="mt-1 block w-full"
                            autoComplete="firstname"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError
                            message={errors.firstname}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="gender" value="Gender" />

                        <TextInput
                            id="gender"
                            name="gender"
                            value={data.gender}
                            className="mt-1 block w-full"
                            autoComplete="gender"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="role" value="Role" />

                        <TextInput
                            id="role"
                            name="role"
                            value={data.role}
                            className="mt-1 block w-full"
                            autoComplete="gender"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel forInput="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            forInput="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ml-4" processing={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </General>
    );
}
