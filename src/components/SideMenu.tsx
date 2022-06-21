import React from "react";
import Container from "./Container";

type SideMenuProps = {
	onClick: () => void;
}

export default function SideMenu({ onClick }: SideMenuProps) {
	return (
		<Container>
			<svg
				onClick={ onClick }
				className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
				fill="#2563EB"
				viewBox="0 0 100 80"
				width="40"
				height="40"
			>
				<rect width="100" height="10"></rect>
				<rect y="30" width="100" height="10"></rect>
				<rect y="60" width="100" height="10"></rect>
			</svg>
		</Container>
	);
}