import React from "react";

type ContainerProps = {
	children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (
		<div className="bg-gradient-to-r from-green-200 via-green-400 to-purple-700">
			{ children }
		</div>
	)
}