import React from "react";

interface Props {
	category: {
		name: string;
		links: {name: string; url: string; color: string}[];
	};
}

function getBaseUrl(url: string) {
	const urlParts = url
		.replace("http://", "")
		.replace("https://", "")
		.split(/[/?#]/);
	return urlParts[0];
}

function getFavicon(url: string) {
	return "https://www.google.com/s2/favicons?domain=" + getBaseUrl(url);
}

const Category = ({category}: Props) => {
	return (
		<div className={"col col-12 col-md-6 col-lg-4 "}>
			<div className={"h-100 category rounded p-4"}>
				<h4>{category.name}</h4>
				{category.links.map((link, i) => (
					<a
						href={link.url}
						key={i + link.name + link.url}
						className={"px-2 rounded d-flex align-items-center p-1"}>
						{/*<img className={"mr-2"} src={getFavicon(link.url)} />*/}
						<div
							className={"me-2 favColor"}
							style={{backgroundColor: link.color}}
						/>
						<div>{link.name}</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default Category;
