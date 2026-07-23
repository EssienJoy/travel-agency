import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
	try {
		const user = await account.get();

		if (user.$id) return redirect("/");
	} catch (e) {
		console.log("Error fetching user", e);
	}
}

const SignIn = () => {
	return (
		<main className='auth'>
			<section className='size-full glassmorphism flex-center px-6'>
				<div className='sign-in-card'>
					<header className='header'>
						<Link to='/'>
							<img
								src='/assets/icons/logo.svg'
								alt='logo'
								className='size-7.5'
							/>
						</Link>
						<h2 className='p-28-bold text-dark-100'>Tourvisto</h2>
					</header>

					<article>
						<h2 className='p-28-bold text-dark-100'>
							Start Your Travel Journey
						</h2>
						<p className='p-18-regular text-center text-gray-100 leading-7'>
							Sign in with Google to explore AI-generated itineraries, trending
							destinations, and much more
						</p>
						<ButtonComponent
							type='button'
							iconCss='e-search-icon'
							className='button-class h-11 w-full'
							onClick={loginWithGoogle}>
							<img
								src='/assets/icons/google.svg'
								className='size-4'
								alt='google'
							/>
							<span className='p-18-semibold text-white'>
								Sign in with Google
							</span>
						</ButtonComponent>
					</article>
				</div>
			</section>
		</main>
	);
};

export default SignIn;
