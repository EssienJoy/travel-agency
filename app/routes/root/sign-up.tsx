import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginWithGoogle, signUpWithEmail } from "~/appwrite/auth";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { redirect } from "react-router";

export async function clientLoader() {
	try {
		const user = await account.get();

		if (user.$id) return redirect("/");
	} catch (e) {
		console.log("Error fetching user", e);
	}
}

const SignUp = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true);

		try {
			await signUpWithEmail(form.name, form.email, form.password);
			navigate("/");
		} catch (err) {
			console.error("Unable to create account.", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='auth'>
			<section className='size-full glassmorphism flex-center px-6'>
				<div className='sign-in-card'>
					<article>
						<h2 className='text-center p-28-bold text-dark-100'>
							Create Account
						</h2>

						<p className='p-18-regular text-center text-gray-100 mb-6'>
							Sign up to start creating AI-powered travel itineraries.
						</p>

						<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
							<input
								type='text'
								name='name'
								placeholder='Full Name'
								value={form.name}
								onChange={handleChange}
								required
								className='input'
							/>

							<input
								type='email'
								name='email'
								placeholder='Email Address'
								value={form.email}
								onChange={handleChange}
								required
								className='input'
							/>

							<input
								type='password'
								name='password'
								placeholder='Password'
								value={form.password}
								onChange={handleChange}
								required
								minLength={8}
								maxLength={8}
								className='input'
							/>

							<ButtonComponent
								type='submit'
								disabled={loading}
								className='button-class h-11 w-full'>
								<span className='p-18-semibold text-white'>
									{loading ? "Creating Account..." : "Create Account"}
								</span>
							</ButtonComponent>
						</form>

						<div className='my-5 flex items-center gap-3'>
							<div className='h-px flex-1 bg-gray-300' />
							<span>OR</span>
							<div className='h-px flex-1 bg-gray-300' />
						</div>

						<ButtonComponent
							type='button'
							className='button-class h-11 w-full'
							onClick={loginWithGoogle}>
							<img
								src='/assets/icons/google.svg'
								className='size-4'
								alt='google'
							/>

							<span className='p-18-semibold text-white'>
								Continue with Google
							</span>
						</ButtonComponent>

						<p className='text-center mt-5'>
							Already have an account?{" "}
							<Link to='/signin' className='text-blue-500'>
								Sign In
							</Link>
						</p>
					</article>
				</div>
			</section>
		</main>
	);
};

export default SignUp;
