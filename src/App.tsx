import React from 'react';

import Currency from "./pages/Currency/Currency";
import SideBar from "./components/SideBar";
import Container from "./components/Container";

function App() {

	// <div className="items-center justify-center py-2">
	// 					<SideBar />
	// 				</div>

	return (
		<div className="App">
			<Container>
				<Currency/>
			</Container>
		</div>
	);
}

export default App;
