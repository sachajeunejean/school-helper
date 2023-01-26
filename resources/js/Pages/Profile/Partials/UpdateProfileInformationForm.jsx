import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });

    const submit = async (e) => {
        e.preventDefault();
        console.log(data, user);
        patch(route("profile.update"));
    };

    console.log(data, user);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-12 space-y-12">
                <div className="relative">
                    <TextInput
                        id="username"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.username}
                        handleChange={(e) =>
                            setData("username", e.target.value)
                        }
                        required
                        autoComplete="username"
                    />

                    <InputLabel for="username" value="Username" />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div className="relative">
                    <TextInput
                        id="firstname"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.firstname}
                        handleChange={(e) =>
                            setData("firstname", e.target.value)
                        }
                        required
                        autoComplete="firstname"
                    />
                    <InputLabel for="firstname" value="Firstname" />

                    <InputError className="mt-2" message={errors.firstname} />
                </div>

                <div className="relative">
                    <TextInput
                        id="lastname"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        handleChange={(e) =>
                            setData("lastname", e.target.value)
                        }
                        required
                        autoComplete="lastname"
                    />
                    <InputLabel for="lastname" value="Lastname" />

                    <InputError className="mt-2" message={errors.lastname} />
                </div>

                <div className="relative">
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputLabel for="email" value="Email" />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
