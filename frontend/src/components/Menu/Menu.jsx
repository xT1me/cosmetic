import React, { useState } from "react";

const styles = {
  burgerButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  closeButtonHover: {
    color: "#f9a825",
  },
  menu: {
    position: "fixed",
    top: 0,
    right: "-350px",
    width: "300px",
    height: "100%",
    background: "linear-gradient(135deg, #111, #333)",
    color: "white",
    overflowY: "auto",
    padding: "20px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    transition: "right 0.3s ease",
    zIndex: 2,
  },
  menuOpen: {
    right: 0,
  },
  menuItem: {
    padding: "10px 0",
    fontSize: "18px",
    fontWeight: "500",
    position: "relative",
    transition: "color 0.3s ease",
  },
  menuItemHover: {
    color: "#f9a825",
  },
  submenu: {
    paddingLeft: "20px",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    position: "relative",
    display: "block",
    padding: "5px 0",
    transition: "color 0.3s ease, transform 0.3s ease",
  },
  linkHover: {
    color: "#f9a825",
  },
  linkAfter: {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: "#f9a825",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },
  linkHoverAfter: {
    transform: "scaleX(1)",
  },
};

const Menu = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderMenu = (items, parentIndex = "") => (
    <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
      {items.map((item, index) => {
        const currentIndex = `${parentIndex}${index}`;
        return (
          <li
            key={currentIndex}
            style={{
              ...styles.menuItem,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = styles.menuItemHover.color)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = styles.link.color)
            }
          >
            {item.link ? (
              <a
                href={item.link}
                style={styles.link}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = styles.linkHover.color;
                  e.currentTarget.querySelector("span").style.transform =
                    styles.linkHoverAfter.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = styles.link.color;
                  e.currentTarget.querySelector("span").style.transform =
                    styles.linkAfter.transform;
                }}
              >
                {item.title}
                <span
                  style={{
                    ...styles.linkAfter,
                    display: "block",
                    position: "absolute",
                  }}
                />
              </a>
            ) : (
              <div onClick={() => toggleSubmenu(currentIndex)}>
                {item.title}
              </div>
            )}
            {item.children && openSubmenus[currentIndex] && (
              <div style={styles.submenu}>
                {renderMenu(item.children, `${currentIndex}-`)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div
        style={{
          ...styles.menu,
          ...(isOpen ? styles.menuOpen : {}),
        }}
      >
        <button
          style={styles.closeButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = styles.closeButtonHover.color)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = styles.closeButton.color)
          }
          onClick={toggleMenu}
        >
          &times;
        </button>
        {isOpen && renderMenu(menuData)}
      </div>
      <button onClick={toggleMenu} style={styles.burgerButton}>
        <img src="assets/images/burger-bar.png" alt="menu" width={25} />
      </button>
    </>
  );
};

export default Menu;
