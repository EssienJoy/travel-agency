import React from "react";
import { Header } from "../../../components";
import {
	ColumnDirective,
	ColumnsDirective,
	GridComponent,
} from "@syncfusion/ej2-react-grids";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

export async function loader() {
	const { users, total } = await getAllUsers(10, 0);

	return { users, total };
}

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
	const { users } = loaderData;
	// console.log(users);

	const DateTemplate = (props: UserData) => {
		return <span>{formatDate(props.joinedAt)}</span>;
	};

	return (
		<main className='all-users wrapper'>
			<Header
				title={`Manage Users`}
				description='Filter, sort and access detailted user profiles'
			/>

			<GridComponent dataSource={users} gridLines='None'>
				<ColumnsDirective>
					<ColumnDirective
						field='name'
						headerText='Name'
						width='200'

						//"Syncfusion Grid template crashes with React 19 + React Router 8."
						// template={(props: UserData) => (
						// 	<div className='flex items-center gap-1.5 px-4'>
						// 		<img
						// 			src={props.imageUrl}
						// 			alt='user'
						// 			className='rounded-full size-8 aspect-square'
						// 			referrerPolicy='no-referrer'
						// 		/>
						// 		<span>{props.name}</span>
						// 	</div>
						// )}
					/>
					<ColumnDirective
						field='email'
						headerText='Email Address'
						width='200'
					/>
					<ColumnDirective
						field='joinedAt'
						headerText='Date Joined'
						width='120'
						format='yMd'

						//"Syncfusion Grid template crashes with React 19 + React Router 8."
						// template={({ joinedAt }: { joinedAt: string }) => {
						// 	console.log(joinedAt);
						// 	return <span>{formatDate(joinedAt) }</span>;
						// }}
					/>
					<ColumnDirective
						field='status'
						headerText='Type'
						width='100'

						//"Syncfusion Grid template crashes with React 19 + React Router 8."
						// template={({ status }: UserData) => (
						// 	<article
						// 		className={cn(
						// 			"status-column",
						// 			status === "user" ? "bg-success-50" : "bg-light-300",
						// 		)}>
						// 		<div
						// 			className={cn(
						// 				"size-1.5 round-full",
						// 				status === "user" ? "bg-success-500" : "bg-gray-500",
						// 			)}>
						// 			<h3
						// 				className={cn(
						// 					"font-inter text-xs font-medium",
						// 					status === "user" ? "text-success-700" : "text-gray-500",
						// 				)}>
						// 				{status}
						// 			</h3>
						// 		</div>
						// 	</article>
						// )}
					/>
				</ColumnsDirective>
			</GridComponent>
		</main>
	);
};

export default AllUsers;
