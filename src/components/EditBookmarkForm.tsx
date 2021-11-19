import React, { useContext, useState } from "react";
import BookmarkContext, { Bookmark } from "../context/BookmarkContext";

export interface EditBookmarkFormProps {
	bookmark?: Bookmark;
	onClose: () => void;
	category_id?: number;
}

const EditBookmarkForm: React.FC<EditBookmarkFormProps> = ({ category_id, onClose, bookmark }) => {
	const [name, setName] = useState(bookmark?.name || "");
	const [url, setUrl] = useState(bookmark?.url || "");
	const [color, setColor] = useState(bookmark?.color || "");
	const [confirm, setConfirm] = useState(false);
	const { bookmarks, dispatch } = useContext(BookmarkContext);

	const handleSave = () => {
		if (bookmark) {
			dispatch({ type: "UPDATE", data: { ...bookmark, name, url, color } });
		} else if (category_id) {
			dispatch({ type: "ADD", data: { category_id, name, url, color } });
		}
		onClose();
	};

	const handleDelete = () => {
		if (!bookmark) return;

		dispatch({ type: "DELETE", data: bookmark });
		onClose();
	};

	const renderInput = (label: string, val: string, setter: (newVal: string) => void) => {
		return (
			<label className={"w-100"}>
				{label}
				<input
					value={val}
					className={"w-full block rounded bg-gray-600 mb-2 text-gray-200 px-2 py-1"}
					onChange={(event) => {
						setter(event.currentTarget.value);
					}}
				/>
			</label>
		);
	};

	return (
		<div className={"m-4 flex flex-col"}>
			{renderInput("Title", name, setName)}
			{renderInput("Url", url, setUrl)}
			<label className={"w-full"}>
				Color
				<div className={"flex gap4"}>
					<input
						value={color}
						className={"block rounded bg-gray-600 mb-2 text-gray-200 px-2 py-1"}
						onChange={(event) => {
							setColor(event.currentTarget.value);
						}}
					/>
					<div
						className={"ml-2 rounded h-100 border border-gray-500"}
						style={{ width: 22, height: 22, background: color }}
					/>
				</div>
			</label>
			<div className={"flex justify-between mt-4"}>
				<div>
					<button
						className={"w-auto p-1 px-4 rounded bg-blue-700 hover:bg-blue-600"}
						onClick={handleSave}
					>
						Save
					</button>
					{bookmark && (
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
						className={"w-auto p-1 px-2 rounded bg-transparent hover:bg-gray-700 opacity-50 hover:opacity-90"}
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

export { EditBookmarkForm };
