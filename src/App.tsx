import React from "react";
import categories from "./bookmarks.json";
import Category from "./Category";

function App() {
	return (
		<div className={"vh-100 container d-flex align-items-center"}>
				<div className={"w-100 flex-wrap row g-4"}>
					{categories.map((category, i) => (
						<Category key={i} category={category} />
					))}
				</div>
		</div>
	);
}

export default App;
