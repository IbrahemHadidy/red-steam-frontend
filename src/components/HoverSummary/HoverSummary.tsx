import { FC } from "react";
import { useSpring, animated } from 'react-spring';

interface HoverSummary {
    title: string, date: string,
    screenshots: string[],
    description: string,
    positivePercentage: number,
    totalReviews: number,
    tags: string[]
    leftArrow?: boolean,
    rightArrow?: boolean
}

const HoverSummary: FC<HoverSummary> = ({
    title,
    date,
    screenshots,
    description,
    positivePercentage,
    totalReviews,
    tags,
    leftArrow,
    rightArrow
})=> {

    const fadeEffect = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 280 }
    });


    return (
        <animated.div className="game-hover" style={fadeEffect}>
            <div className="hover-box">
                <div className="hover-content">
                    <h4 className="hover-title">{title}</h4>
                    <span className="hover-release">{date}</span>
                    {screenshots ? <div className="hover-screenshots">
                        {screenshots.map((screenshot, index) => (
                            <div
                                className="hover-screenshot"
                                style={{ backgroundImage: `url(${screenshot})` }}
                                key={index}
                            />
                        ))}
                    </div> : <p className="hover-description">{description}</p>}
                    <div className="hover-review-summary">
                        <div className="hover-review-title">Overall user reviews:</div>
                        <span className={`game-review-summary ${
								positivePercentage < 75 && positivePercentage > 40
									? "mixed"
									: positivePercentage >= 75
									? "positive"
									: positivePercentage >= 40
									? "negative"
									: ""
                                }`}>
                            {positivePercentage >= 90 ? "Overwhelmingly Positive" :
                            positivePercentage >= 80 ? "Very Positive" :
                            positivePercentage >= 75 ? "Mostly Positive" :
                            (positivePercentage > 40 && positivePercentage < 75) ? "Mixed" :
                            positivePercentage <= 10 ? "Overwhelmingly Negative" :
                            positivePercentage <= 20 ? "Very Negative" :
                            positivePercentage <= 40 ? "Mostly Negative" : "No reviews yet."}&nbsp;
                        </span>
                       {totalReviews !== 0 && `(${totalReviews} reviews)`}
                    </div>
                    <div className="hover-tag-body">
                        User tags: <br/>
                        <div className="hover-tag-row">
                            {tags.slice(0, 7).map((tag, index) => (
                                <div className="game-tag" key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {leftArrow && <div className="hover-arrow-left"/>}
            {rightArrow && <div className="hover-arrow-right"/>}
        </animated.div>
    );
}

export default HoverSummary;