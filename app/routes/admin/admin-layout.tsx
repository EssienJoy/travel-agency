import React from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Outlet, redirect } from "react-router";
import { NavItems, MobileSidebar } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
	try {
		const user = await account.get();

		if (!user.$id) return redirect("/sign-in");

		const exisingUser = await getExistingUser(user.$id);
		// console.log(exisingUser);

		if (exisingUser?.status === "user") {
			return redirect("/");
		}

		return exisingUser?.$id ? exisingUser : await storeUserData();
	} catch (e) {
		console.log("Error in Client Loader", e);
		return redirect("/sign-in");
	}
}

const AdminLayout = () => {
	return (
		<div className='admin-layout'>
			<MobileSidebar />
			<aside
				className='w-full max-w-67.5 hidden
        lg:block'>
				<SidebarComponent width={270} enableGestures={false}>
					<NavItems />
				</SidebarComponent>
			</aside>
			<aside className='children'>
				<Outlet />
			</aside>
		</div>
	);
};

export default AdminLayout;
