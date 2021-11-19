import React, { useContext, useMemo } from "react";
import CategoryView from "./components/CategoryView";
import { ReactComponent as Pencil } from "./icons/pen.svg";
import { ReactComponent as Check } from "./icons/check.svg";
import EditContext from "./context/EditContext";
import CategoryContext from "./context/CategoryContext";
import { AddCategoryView } from "./components/AddCategoryView";

function App() {
	const { isEditing, setIsEditing } = useContext(EditContext);

	const { categories } = useContext(CategoryContext);

	const sorted = useMemo(() => {
		return categories.sort((a, b) => a.order - b.order);
	}, [categories]);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div className={"m-auto h-screen container flex content-center relative items-center"}>
			<div
				className={
					"absolute right-0 bottom-10 edit-btn text-gray-500 hover:text-gray-300 cursor-pointer"
				}
				onClick={toggleEditing}
			>
				{isEditing ? (
					<Check className={"text-green-600"} width={20} />
				) : (
					<Pencil className={"opacity-20 hover:opacity-80 "} width={20} />
				)}
			</div>
			<div className={"w-full grid grid-cols-3 gap-8"}>
				{sorted.map((category) => (
					<CategoryView key={category.id} category={category} />
				))}
				{isEditing && <AddCategoryView />}
			</div>
		</div>
	);
}

export default App;
