import React, { useContext, useState } from "react";
import CategoryContext, { BookmarkCategory } from "../context/CategoryContext";

export interface EditCategoryFormProps {
	category?: BookmarkCategory;
	onClose: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category, onClose }) => {
	const [name, setName] = useState(category?.name || "");
	const [order, setOrder] = useState((category?.order || "") + "");
	const [confirm, setConfirm] = useState(false);
	const { categories, dispatch } = useContext(CategoryContext);

	const handleSave = () => {
		if (category) {
			dispatch({ type: "UPDATE", data: { ...category, name, order: parseInt(order) } });
		} else {
			dispatch({
				type: "ADD",
				data: { name, order: parseInt(order) },
			});
		}
		onClose();
	};

	const handleDelete = () => {
		if (!category) return;

		dispatch({ type: "DELETE", data: category });
		onClose();
	};

	return (
		<div>
			<label className={"w-full"}>
				Title
				<input
					value={name}
					className={"block rounded bg-gray-600 mb-2 text-gray-200 px-2 py-1"}
					onChange={(event) => {
						setName(event.currentTarget.value);
					}}
				/>
			</label>

			<label className={"w-full"}>
				Order
				<input
					value={order}
					className={"block rounded bg-gray-600 mb-2 text-gray-200 px-2 py-1"}
					onChange={(event) => {
						setOrder(event.currentTarget.value);
					}}
				/>
			</label>

			<div className={"flex justify-between mt-4"}>
				<div>
					<button
						className={"w-auto p-1 px-4 rounded bg-blue-700 hover:bg-blue-600"}
						onClick={handleSave}
					>
						Save
					</button>
					{category && (
						<>
							{!confirm && (
								<button
									className={
										"w-auto p-1 px-2 mx-2 rounded bg-transparent hover:bg-gray-700 opacity-50 hover:opacity-90"
									}
									onClick={() => setConfirm(true)}
								>
									Delete
								</button>
							)}
							{confirm && (
								<button
									className={"w-auto p-1 px-2 mx-2 rounded bg-red-700"}
									onMouseLeave={() => setConfirm(false)}
									onClick={handleDelete}
								>
									Confirm
								</button>
							)}
						</>
					)}
				</div>
				<div>
					<button
						className={
							"w-auto p-1 px-2 rounded bg-transparent hover:bg-gray-700 opacity-50 hover:opacity-90"
						}
						onClick={() => {
							onClose();
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export { EditCategoryForm };
