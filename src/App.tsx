import React from "react";
import { ReactComponent as Pencil } from "./icons/pen.svg";
import { ReactComponent as Check } from "./icons/check.svg";
import { useSnapshot } from "valtio";
import { uiState } from "./context/states";
import { JsonEditor } from "./components/JSONEditor";
import { Board } from "./components/Board";

function App() {
	const { editing } = useSnapshot(uiState);

	const toggleEditing = () => {
		uiState.editing = !editing;
	};

	return (
		<div className={"m-auto h-screen container flex content-center relative items-center"}>
			{editing ? <JsonEditor /> : <Board />}
			<div
				className={
					"absolute right-0 bottom-10 edit-btn text-gray-500 hover:text-gray-300 cursor-pointer"
				}
				onClick={toggleEditing}
			>
				{editing ? (
					<Check className={"text-green-600"} width={40} height={40} />
				) : (
					<Pencil className={"opacity-20 hover:opacity-80"} width={20} height={20} />
				)}
			</div>
		</div>
	);
}

export default App;
