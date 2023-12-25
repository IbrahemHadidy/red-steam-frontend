import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SecondNavbar from "../../components/SecondNavbar/SecondNavbar";
import { SearchRight } from "./SearchRight";
import { SearchLeft } from "./SearchLeft";
import useResponsiveViewports from "../../components/useResponsiveViewports";
import "./Search.scss";

const Search: FC = () => {
	const isViewport960 = useResponsiveViewports(960);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Relevance");
	const [searchValue, setSearchValue] = useState("enter search term or tag");
	const [rangeValue, setRangeValue] = useState(13);

	// Filter rows
	const [priceFilterRows, setPriceFilterRows] = useState([
		{ label: "Special Offers", checked: "" },
		{ label: "Hide free to play games", checked: "" },
	]);
	const [tagFilterRows, setTagFilterRows] = useState([
		{ label: "Battle Royal", checked: "" },
		{ label: "Multiplayer", checked: "" },
		{ label: "Martial Arts", checked: "" },
		{ label: "PvP", checked: "" },
		{ label: "Survival", checked: "" },
		{ label: "Shooter", checked: "" },
		{ label: "RPG", checked: "" },
		{ label: "Open World", checked: "" },
		{ label: "Story Rich", checked: "" },
		{ label: "Singleplayer", checked: "" },
		{ label: "Dark", checked: "" },
		{ label: "Fantasy", checked: "" },
		{ label: "Horror", checked: "" },
		{ label: "Difficult", checked: "" },
		{ label: "Action", checked: "" },
		{ label: "Souls-like", checked: "" },
		// Add as much as you want
	]);
	const [OSFilterRows, setOSFilterRows] = useState([
		{ label: "Windows", checked: "" },
		{ label: "macOS", checked: "" },
	]);
	const [filters, setFilters] = useState<{ name: string, type: string, check: string}[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const addFilter = (newFilter: { name: string, type: string, check: string }) => {
		setFilters((prevFilters) => {
			// Check if an item with the same name and type exists
			const existingFilterIndex = prevFilters.findIndex(
				(filter) => filter.name === newFilter.name && filter.type === newFilter.type
			);
	
			// If exists, remove it
			if (existingFilterIndex !== -1) {
				const updatedFilters = [...prevFilters];
				updatedFilters.splice(existingFilterIndex, 1);
				return updatedFilters;
			}
	
			// If not, add the new filter
			return [...prevFilters, newFilter];
		});
	};

	useEffect(() => {
		// this is responsible for the page background
		document.body.style.background ="#1b2838";
		// this is responsible for the tab title
		document.title = "Steam Search";
	}, []);

	useEffect(() => {
		console.log(filters);
	}, [filters]);


	// handle dropdown open/close
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// handle sorting options selection and closing dropdown after selection
	const selectOption = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	// handle sorting options and adding filters depending on the selected sorting option
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const targetNode = event.target as Node;
			if (inputRef.current && !inputRef.current.contains(targetNode)) {
				if (!inputRef.current.value.trim()) {
					setSearchValue("enter search term or tag");
				}
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		const existingSortFilterIndex = filters.findIndex(filter => filter.type === "Sort");

		if (existingSortFilterIndex !== -1) {
			const updatedFilters = [...filters];
			updatedFilters[existingSortFilterIndex] = { type: "Sort", name: selectedOption, check: "checked" };
			setFilters(updatedFilters);
		} else {
				addFilter({ type: "Sort", name: selectedOption, check: "checked" });
		}
	
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectedOption]);

	// handle default search input
	const handleSearch = () => {
		if (searchValue === "enter search term or tag") {
			setSearchValue("");
		}
	};
	
	// handle search input
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSearchButton = () => {
		// defining the Search filter in the filters array
		const existingSearchFilterIndex = filters.findIndex(filter => filter.type === "Search");

		// if searchValue is the default value do nothing
		if (searchValue === "enter search term or tag") return;  

		// if searchValue isn't the default value then delete the current Search filter and add the new one
		if (existingSearchFilterIndex !== -1) {
			const updatedFilters = [...filters];
			updatedFilters[existingSearchFilterIndex] = { type: "Search", name: searchValue, check: "checked" };
			setFilters(updatedFilters);
		} else {
			addFilter({ type: "Search", name: searchValue, check: "checked" });
		}
	}

	// handle price range
	const handlePriceRangeChange = (value: number) => {
		// Find if there's already a price filter in the filters array
		const existingPriceFilterIndex = filters.findIndex(filter => filter.type === "Price");

		// If a price filter exists, update its value; otherwise, add a new one
		if (existingPriceFilterIndex !== -1) {
			const updatedFilters = [...filters];
			updatedFilters[existingPriceFilterIndex].name = getPriceRangeLabel(value);
			setFilters(updatedFilters);
		} else {
			addFilter({ type: "Price", name: getPriceRangeLabel(value), check: "checked" });
		}
	}

	// handle checking the Price option rows
	const handlePriceRowClick = (row: { label: string; name:string; check: string; checked: string; }) => {
		const updatedRow = 
			priceFilterRows.map(filter => filter.label === row.label ? { ...filter, checked: filter.checked === "checked" ? "" : "checked" } : filter);

		// Check and add the filter to the filters array
		setPriceFilterRows(updatedRow);
		addFilter({type: "Price Option", name: row.label, check: "checked"});
	};


	// handle checking the Tag rows
	const handleTagRowClick = (row: { label: string; name:string; check: string; checked: string; }) => {
		// defining the selected row
		const updatedRow = 
			tagFilterRows.map(filter => filter.label === row.label ? { ...filter, checked: filter.checked === "checked" ? "" : "checked" } : filter);
			
		// Find if that filter is already in the Filters array
		const existingFilterIndex = filters.findIndex(
			(filter) => filter.name === row.label && filter.type === "Tag"
		);

		// check the filter
		setTagFilterRows(updatedRow);

		// check the filter if it is excluded or unchecked
		const updatedFilters = [...filters];
		if (existingFilterIndex !== -1) {
			updatedFilters.splice(existingFilterIndex, 1);
		}
		if (existingFilterIndex !== -1 && filters[existingFilterIndex].check === "excluded") {
			setFilters(updatedFilters);
			addFilter({ type: "Tag", name: row.label, check: "checked" });
		} else {
			addFilter({ type: "Tag", name: row.label, check: "checked" });
		}
	};

	// handle excluding the Tag rows
	const handleTagExcludeClick = (e: React.MouseEvent<HTMLDivElement>, row: { label: string; name:string; check: string; checked: string; }) => {
		e.stopPropagation();

		// defining the selected row
		const updatedRow = 
			tagFilterRows.map(filter => filter.label === row.label ? { ...filter, checked: filter.checked === "excluded" ? "" : "excluded" } : filter);

		// Find if that filter is already in the Filters array
		const existingFilterIndex = filters.findIndex(
			(filter) => filter.name === row.label && filter.type === "Tag"
		);

		// exclude the filter
		setTagFilterRows(updatedRow);

		// exculude the filter if it is checked or unchecked
		const updatedFilters = [...filters];
		if (existingFilterIndex !== -1) {
			updatedFilters.splice(existingFilterIndex, 1);
		}
		if (existingFilterIndex !== -1 && filters[existingFilterIndex].check === "checked") {
			setFilters(updatedFilters);
			addFilter({ type: "Tag", name: row.label, check: "excluded" });
		} else {
			addFilter({ type: "Tag", name: row.label, check: "excluded" });
		}
	};

	// handle checking the OS rows
	const handleOSRowClick = (row: { label: string; name:string; check: string; checked: string; }) => {
		// defining the selected row
		const updatedRow = 
			OSFilterRows.map(filter => filter.label === row.label ? { ...filter, checked: filter.checked === "checked" ? "" : "checked" } : filter);

		// Check and add the filter to the filters array
		setOSFilterRows(updatedRow);
		addFilter({type: "OS", name: row.label, check: "checked"});
	};

	const handleSearchDeleteFilter = () => {

		// ecluding the search filter
		const updatedFilters = filters.filter(
			filter => filter.type !== "Search"
		);
		
		// Reset the search value and delete the filter
		setFilters(updatedFilters);
		setSearchValue("enter search term or tag");
	};

	const handleTagDeleteFilter = (filterToDelete: { label: string }) => {
		// Filter out the filterToDelete from the filters array
		const updatedFilters = filters.filter(
				filter => !(filter.name === filterToDelete.label && filter.type === "Tag")
		);
		setFilters(updatedFilters);

		// Reset the 'checked' property for the specific tag in tagFilterRows
		const updatedTagFilterRows = tagFilterRows.map(filter => 
				filter.label === filterToDelete.label ? { ...filter, checked: "" } : filter
		);
		setTagFilterRows(updatedTagFilterRows);
	};
	

	const selectOptions = [
		"Relevance",
		"Release date",
		"Name",
		"Lowest Price",
		"Higest Price",
		"User Reviews",
	];

	const getPriceRangeLabel = (value: number) => {
		switch (value) {
			case 0: return "Free";
			case 1: return "Under $5.00";
			case 2: return "Under $10.00";
			case 3: return "Under $15.00";
			case 4: return "Under $20.00";
			case 5: return "Under $25.00";
			case 6: return "Under $30.00";
			case 7: return "Under $35.00";
			case 8: return "Under $40.00";
			case 9: return "Under $45.00";
			case 10: return "Under $50.00";
			case 11: return "Under $55.00";
			case 12: return "Under $60.00";
			case 13: return "Any Price";
			default: return "Any Price";
		}
	};

	const searchRight = <SearchRight 
		rangeValue = {rangeValue}
		setRangeValue={setRangeValue} 
		handlePriceRangeChange={handlePriceRangeChange} 
		handlePriceRowClick={handlePriceRowClick} 
		handleTagRowClick={handleTagRowClick} 
		handleTagExcludeClick={handleTagExcludeClick} 
		handleOSRowClick={handleOSRowClick} 
		getPriceRangeLabel={getPriceRangeLabel}
		priceFilterRows={priceFilterRows}
		tagFilterRows={tagFilterRows}
		OSFilterRows={OSFilterRows}
		isViewport960={isViewport960}
	/>

	return (
		<>
			{isViewport960 && (
				searchRight
			)}
			<Header />
			<div className="search-header">
				<SecondNavbar />
				<div
					className="page-content"
					style={{ marginTop: "20px", paddingLeft: "2px" }}
				>
					{
						filters
							.filter(filter => filter.type === "Tag" || filter.type === "Search")
							.length === 0 ? (
								<div className="search-title">All Products</div>
							) : (
								<>
									{filters
										.filter(filter => filter.type === "Search")
										.map((filter) => (
											<div className="search-tag">
												{filter.name} 
												<a onClick={handleSearchDeleteFilter} />
											</div>
										))}
									{filters
										.filter(filter => filter.type === "Tag" && filter.check === "checked")
										.map((filter) => (
											<div className="search-tag">
											
												{filter.name} 
												<a onClick={() => handleTagDeleteFilter({ label: filter.name })} />
											</div>
										))}
									{filters
									.filter(filter => filter.type === "Tag" && filter.check === "excluded")
									.map((filter) => (
										<div className="search-tag excluded">
											<img src="/images/search_crouton_not.svg" alt="excluded" />
											{filter.name} 
											<a onClick={() => handleTagDeleteFilter({ label: filter.name })} />
										</div>
									))}
								</>
							)
						}
				</div>
			</div>
			<div className="s-page-content">
			<form className="search-form" action="" method="get">

				<SearchLeft
					toggleDropdown = {toggleDropdown}
					selectedOption = {selectedOption}
					isOpen = {isOpen}
					selectOptions = {selectOptions}
					selectOption = {selectOption}
					inputRef = {inputRef}
					searchValue = {searchValue}
					handleSearch = {handleSearch}
					handleInputChange = {handleInputChange}
					handleSearchButton = {handleSearchButton}
				/>
				
				{!isViewport960 && (
					searchRight
				)}

			</form>
			</div>
			<Footer />
		</>
	);
};

export default Search;
