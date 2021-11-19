import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'tippy.js/dist/tippy.css';
import App from "./App";
import { EditContextWrapper } from "./context/EditContext";
import { BookmarkContextWrapper } from "./context/BookmarkContext";
import { CategoryContextWrapper } from "./context/CategoryContext";

ReactDOM.render(
	<React.StrictMode>
		<EditContextWrapper>
			<BookmarkContextWrapper>
				<CategoryContextWrapper>
					<App />
				</CategoryContextWrapper>
			</BookmarkContextWrapper>
		</EditContextWrapper>
	</React.StrictMode>,
	document.getElementById("root")
);
