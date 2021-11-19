import { createContext, PropsWithChildren, useState } from "react";

const EditContext = createContext({ isEditing: false, setIsEditing: (editing: boolean) => {} });

export const EditContextWrapper = ({ children }: PropsWithChildren<{}>) => {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<EditContext.Provider
			value={{
				isEditing,
				setIsEditing: (editing: boolean) => {
					setIsEditing(editing);
				},
			}}
		>
			{children}
		</EditContext.Provider>
	);
};

export default EditContext;
