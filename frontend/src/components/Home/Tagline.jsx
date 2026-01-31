import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/style.css";

export default function Header() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
	const [hidden, setHidden] = useState(false);

	return (
		<>
            <div className="waveNavbar wave"></div>
			<div className="section2">
				{/* content */}
				<div className="content">
					<div className="food_img">
						<img src="/fries.png" alt="fries" />
						<img src="/burger.png" alt="burger" />
						<img src="/hot_dog.png" alt="hot_dog" />
						<img src="/sandwich.png" alt="sandwich" />
					</div>
					<div className="tagLine">
						<span>
							Cook with<br />
							<span> passion</span> <br />
							serve with<br />
							<span>love</span>
						</span>
						<p>
							Your kitchen companion — save recipes,
							<br /> organize meals, and enjoy cooking
							<br /> made simple.
						</p>
					</div>
					<div className="phone">
						<img src="/Phone.png" alt="phone" />
					</div>
					<div className="plate">
						<img src="/seafood_plate.png" alt="seafood plate" />
					</div>
				</div>
				<div className="wave-section2 wave"></div>
			</div>
		</>
	);
}
