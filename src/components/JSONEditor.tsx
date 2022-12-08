import React, { useEffect, useState } from "react";
import { bookmarksState, categoriesState, uiState, widgetsState } from "../context/states";

export interface JsonEditorProps {}

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
	const [bookmarksValue, setBookmarksValue] = useState(localStorage.getItem("bookmarks") || "[]");
	const [categoriesValue, setCategoriesValue] = useState(
		localStorage.getItem("categories") || "[]"
	);
	const [widgetsValue, setWidgetsValue] = useState(localStorage.getItem("widgets") || "[]");

	const handleSave = () => {
		bookmarksState.bookmarks = [];
		categoriesState.categories = [];
		widgetsState.widgets = [];

		categoriesState.categories = JSON.parse(categoriesValue);
		bookmarksState.bookmarks = JSON.parse(bookmarksValue);
		widgetsState.widgets = JSON.parse(widgetsValue);

		localStorage.setItem("bookmarks", bookmarksValue);
		localStorage.setItem("categories", categoriesValue);
		localStorage.setItem("widgets", widgetsValue);

		uiState.editing = false;
	};

	return (
		<div className={"flex flex-col flex-1 gap-4 h-96"}>
			<div className={"flex flex-1 gap-2"}>
				<JsonEntityEditor value={bookmarksValue} onChange={(v) => setBookmarksValue(v)} />
				<JsonEntityEditor value={categoriesValue} onChange={(v) => setCategoriesValue(v)} />
				<JsonEntityEditor value={widgetsValue} onChange={(v) => setWidgetsValue(v)} />
			</div>
			<div>
				<button className={"rounded p-2 bg-slate-400"} onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

const JsonEntityEditor: React.FC<{ value: string; onChange: (v: string) => void }> = ({
	value,
	onChange,
}) => {
	const [valid, setValid] = useState(true);

	useEffect(() => {
		try {
			if (JSON.parse(value)) {
				setValid(true);
			}
		} catch (e) {
			setValid(false);
		}
	}, [value]);

	const handleChange = (v: string) => {
		onChange(v);
	};

	const handleFormat = () => {
		onChange(JSON.stringify(JSON.parse(value), null, 4));
	};

	return (
		<div className={"flex-1 flex flex-col gap-2"}>
			<textarea
				spellCheck={"false"}
				className={
					"w-full h-full text-sm rounded bg-slate-200 bg-opacity-20 text-white p-1 focus:outline-0"
				}
				value={value}
				onChange={(e) => handleChange(e.currentTarget.value)}
			></textarea>
			<div>
				{!valid && <div>invalid</div>}
				<button className={"bg-slate-400 rounded p-2"} onClick={handleFormat}>
					Format
				</button>
			</div>
		</div>
	);
};

export { JsonEditor };
