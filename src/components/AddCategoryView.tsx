import Tippy from "@tippyjs/react";
import React, { useState } from "react";
import { ReactComponent as Add } from "../icons/add.svg";
import { EditBookmarkForm } from "./EditBookmarkForm";
import { EditCategoryForm } from "./EditCategoryForm";

export interface AddCategoryViewProps {}

const AddCategoryView: React.FC<AddCategoryViewProps> = (props) => {
	const [open, setOpen] = useState(false);

	return (
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
				open && <EditCategoryForm onClose={() => setOpen(false)} />
			}
			visible={open}
			onClickOutside={() => setOpen(false)}
		>
			<div
				className={
					"h-full w-full flex justify-center items-center text-gray-400 hover:text-gray-300 cursor-pointer"
				}
			>
				<Add className={"pointer"} width={60} height={60} onClick={() => setOpen(true)} />
			</div>
		</Tippy>
	);
};

export { AddCategoryView };
