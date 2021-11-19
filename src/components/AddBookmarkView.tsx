import React, { useState } from "react";
import { EditBookmarkForm } from "./EditBookmarkForm";
import Tippy from "@tippyjs/react";

export interface AddBookmarkViewProps {
	category_id: number;
}

const AddBookmarkView: React.FC<AddBookmarkViewProps> = ({ category_id }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Tippy
				interactive={true}
				popperOptions={{
					modifiers: [
						{
							name: "arrow",
							options: {
								enabled: false,
							},
						},
					],
				}}
				content={
					// this open here unmounts the component to clear the fields
					open && (
						<EditBookmarkForm
							category_id={category_id}
							onClose={() => setOpen(false)}
						/>
					)
				}
				visible={open}
				onClickOutside={() => setOpen(false)}
			>
				<div
					className={
						"p-1 px-2 rounded flex text-gray-300 cursor-pointer hover:bg-gray-800"
					}
					onClick={() => setOpen(true)}
				>
					<div className={"mr-2"}>+</div>
					<div className={"text-gray-300"}>Add new</div>
				</div>
			</Tippy>
		</>
	);
};

export { AddBookmarkView };
