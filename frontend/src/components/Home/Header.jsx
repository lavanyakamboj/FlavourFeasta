import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/style.css";

export default function Header() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const navigate = useNavigate();

	// information of user from locak storage --
	const storedUser = localStorage.getItem("user");
	let user = null;

	try {
		if (storedUser && storedUser !== "undefined") {
			user = JSON.parse(storedUser);
		}
	} catch (error) {
		user = null;
	}

	const isLoggedIn = Boolean(user);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("savedRecipes");
		navigate("/login");
	};

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	return (
		<>
			{/* ---- Announcement Bar ---- */}
			<div className={`announcement-bar ${hidden ? "hide" : ""}`}>
				<b>❤️ Your next favorite meal awaits — </b>
				<Link to="/signup">SIGN UP</Link>

				<button
					type="button"
					className="close-btn"
					onClick={() => setHidden(true)}
				>
					×
				</button>
			</div>

			<div className="header">
				<div className="section1">
					<div className="logo-container">

						{/* ---- Logo and logo image ---- */}
						<img src="/logo.png" alt="Logo" className="logo" />
						<span className="site-name">FlavorFiesta</span>
					</div>

					{/*---- navigation bar (by bootstrap) ----*/}
					<nav className="navbar navbar-expand-lg">
						<div className="container-fluid">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="home nav-link active" to="/">
										Home
									</Link>
								</li>

								<li className="nav-item">
									<div className="nav-item ingredients-hover">
										<span className="nav-link">Categories</span>
										<ul className="ingredients-menu">
											<li>
												<Link to="/categories" state={{ category: "Vegetarian" }}>
													Vegetarian
												</Link>
											</li>
											<li>
												<Link to="/categories" state={{ category: "Non-Veg" }}>
													Non-Vegetarian
												</Link>
											</li>
										</ul>
									</div>
								</li>

								<li className="nav-item">
									<Link className="nav-link" to="/recipes">
										Recipes
									</Link>
								</li>

								<li className="nav-item">
									<Link className="nav-link" to="/Favourite">
										Favorites
									</Link>
								</li>
							</ul>

	{/*---- Authentication Button --signup and logout --show logout and signup according to login or not ---- */}
							{!isLoggedIn ? (
								<button
									className="signup"
									onClick={() => navigate("/signup")}
								>
									Sign up
								</button>
							) : (
								<button className="signup" onClick={handleLogout}>
									Logout
								</button>
							)}

							<button
								type="button"
								className={`toggler ${sidebarOpen ? "active" : ""}`}
								aria-expanded={sidebarOpen}
								onClick={toggleSidebar}
							>
								<i className="fa-solid fa-bars"></i>
							</button>
						</div>
					</nav>
				</div>

				{/* ---- Mobile Sidebar ---- */}
				<div className={`dropdown-menu-mobile ${sidebarOpen ? "open" : ""}`}>
					<ul>
						<li>
							<Link to="/" onClick={closeSidebar}>Home</Link>
						</li>

						<li>
							<div className="mobile-nav-item ingredients-hover">
								<span className="mobile-nav-link">Categories</span>
								<ul className="ingredients-menu">
									<li>
										<Link to="/categories" onClick={closeSidebar} state={{ category: "Vegetarian" }}>
											Vegetarian
										</Link>
									</li>
									<li>
										<Link to="/categories" onClick={closeSidebar} state={{ category: "Non-Veg" }}>
											Non-Vegetarian
										</Link>
									</li>
								</ul>
							</div>
						</li>

						<li>
							<Link to="/recipes" onClick={closeSidebar}>Recipes</Link>
						</li>

						<li>
							<Link to="/favourite" onClick={closeSidebar}>Favorites</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
