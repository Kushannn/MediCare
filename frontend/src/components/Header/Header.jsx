import { React, useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";
const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  // const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);

  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header
      className="header flex items-center dark:bg-slate-900"
      ref={headerRef}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/*-----LOGO-----*/}
          <div>
            <a href="/home">
              <img src={logo} alt="" />
            </a>
          </div>

          {/*-----Menu-----*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*------ NavRight ------  */}
          <div className="flex justify-center items-center gap-4">
            {token && user ? (
              <div className="flex items-center justify-between">
                <Link
                  to={`${
                    role == "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <div className="flex items-center justify-center gap-4">
                    <figure className="w-[40px] h-[40px] rounded-full cursor-pointer">
                      <img
                        src={user?.photo}
                        alt=""
                        className="w-full h-full rounded-full"
                      />
                    </figure>

                    <h2>{user?.name}</h2>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* <button
              className={`bg-${darkMode ? "gray-800" : "gray-200"} hover:bg-${
                darkMode ? "gray-900" : "gray-300"
              } text-${darkMode ? "gray-200" : "gray-800"} py-2 px-4 rounded`}
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button> */}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
