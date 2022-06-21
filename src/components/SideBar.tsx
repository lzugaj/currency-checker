import React, { useState } from "react";
import Container from "./Container";
import SideMenu from "./SideMenu";

export default function SideBar() {
	const [ showSidebar, setShowSidebar ] = useState(false);

	return (
		<Container>
			{ showSidebar ?
				(
					<button
						className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
						onClick={ () => setShowSidebar(!showSidebar) }
					>
						x
					</button>
				)
				:
				(
					<SideMenu
						onClick={ () => setShowSidebar(!showSidebar) }
					/>
				)
			}

			<div
				className={ `top-0 right-0 w-[35vw] bg-blue-600 p-10 pl-20 text-white fixed h-full z-40 ease-in-out duration-300 ${
					showSidebar ? "translate-x-0 " : "translate-x-full"
				}` }
			>
				<h3 className="mt-20 text-4xl font-semibold text-white">
					<li>Tečajna lista</li>
					<li>Tečajna lista</li>
					<li>Tečajna lista</li>
				</h3>
			</div>
		</Container>
	)
}