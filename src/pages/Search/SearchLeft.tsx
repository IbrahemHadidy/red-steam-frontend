import { FC, RefObject, ChangeEvent, useState, MouseEvent } from "react";
import gameData from "../Game/gameData";

interface SearchLeftProps {
		toggleDropdown: () => void;
		selectedOption: string;
		isOpen: boolean;
		selectOptions: string[];
		selectOption: (option: string) => void;
		inputRef: RefObject<HTMLInputElement>;
		searchValue: string;
		handleSearch: () => void;
		handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
		handleSearchButton: (e: MouseEvent<HTMLButtonElement>) => void;
}
export const SearchLeft:FC<SearchLeftProps> = ({
		toggleDropdown,
		selectedOption,
		isOpen,
		selectOptions,
		selectOption,
		inputRef,
		searchValue,
		handleSearch,
		handleInputChange,
		handleSearchButton,
}) => {
	const [hoverStates, setHoverStates] = useState<{[key: string]: boolean}>({});
		
	return (
		<div className="search-leftcol">
			<div className="search-bar">
				<div className="sort-box">
					<div className="label">Sort by</div>
					<div className="select-container">
								<div
									className={`trigger ${isOpen ? "open" : ""}`}
									onClick={toggleDropdown}
								>
									{selectedOption}
								</div>
								{isOpen && (
									<div className="select-dropdown">
										<ul className="custom-dropdown">
											{selectOptions.map((option) => (
												<li
													key={option}
													className={`${
														option === selectedOption ? "active" : ""
													}`}
													onClick={() => selectOption(option)}
												>
													{option}
												</li>
											))}
										</ul>
									</div>
								)}
					</div>
				</div>
				<div className="searchbar-left">
					<input ref={inputRef} type="text" value={searchValue} onFocus={handleSearch} onChange={handleInputChange} />
					<button className="search-btn" type="submit" onClick={(e) => handleSearchButton(e)}>
						<span>Search</span>
					</button>
				</div>
			</div>
			<div className="search-results">
				{gameData.map((result) => {
					const positiveCount = result.reviews.filter(review => review.type === "positive").length;
					const totalReviews = result.reviews.length;
					const positivePercentage = (positiveCount / totalReviews) * 100;
					
					return (
						<a className="search-result" href={`/game/${result.id}`} key={result.id}>
							<img className="s-col result-image" src={result.searchImage} alt={result.name} />
							<div className="reuslt-info">
								<div className="s-col result-name">
									<span className="result-title">{result.name}</span>
									<div>
										<span className="platform-img win" />
										{result.mac && <span className="platform-img mac" /> }
									</div>
								</div>
								<div className="s-col result-date">{result.releaseDate}</div>
								<div className="s-col result-rating">
									<span className={`
										search-review-summary ${
											positivePercentage < 75 && positivePercentage > 40 ? "mixed" 
											: positivePercentage >= 75 ? "positive" 
											: positivePercentage >= 40 ? "negative"
											: ""
										}`
									}
									onMouseEnter={() => setHoverStates(prevState => ({ ...prevState, [result.id]: true }))}
									onMouseLeave={() => setHoverStates(prevState => ({ ...prevState, [result.id]: false }))}
									>{result.reviews.length === 0 && "N/A"}</span>
									<span className="review-tooltip" style={{ opacity: hoverStates[result.id] && result.id === result.id ? "1" : "0"}}>
									{totalReviews === 0 ? "No reviews yet." :
										`${Math.round(positivePercentage)}% of the ${positivePercentage >= 90 ? "Overwhelmingly Positive" :
										positivePercentage >= 80 ? "Very Positive" :
										positivePercentage >= 75 ? "Mostly Positive" :
										(positivePercentage > 40 && positivePercentage < 75) ? "Mixed" :
										positivePercentage <= 10 ? "Overwhelmingly Negative" :
										positivePercentage <= 20 ? "Very Negative" :
										positivePercentage <= 40 ? "Mostly Negative" : "Unknown"} user reviews for this game are positive.`
									}
									</span>
								</div>
								<div className="s-col result-price">
									{result.discount === "no-discount" ? (
										<div className="s-discount-block">
											<div className="discount-prices">
												<div className={`discount-final-price s-${result.discount}`}>{result.free ? "Free" : result.price}</div>
											</div>
										</div> 
									) : (
										<div className="s-discount-block">
											<div className="discount-percentage">-{result.discountPercentage}</div>
											<div className="discount-prices">
												<div className="discount-original-price">{result.price}</div>
												<div className="discount-final-price">{result.discountPrice}</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}