import { signOut } from "@/redux/slices/authSlice";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Alert, Space } from "antd";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const [confirmLogOut, setConfirmLogOut] = useState(false);

  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Questions", href: "/questions", current: false },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Log out", href: "#" },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const handleNavigation = () => {
    if (window.location.pathname === "/") {
      navigation[0].current = true;
      navigation[1].current = false;
    } else {
      navigation[0].current = false;
      navigation[1].current = true;
    }
  };

  const handleClose = function () {
    setConfirmLogOut(false);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setConfirmLogOut(false);
    }
  });

  const handleConfirm = function () {
    dispatch(signOut());
    window.location.reload();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="container">
          <div className="flex h-16 items-center">
            <div className="flex items-center">
              <Link to={"/"} className="flex-shrink-0 text-2xl text-white font-mono uppercase font-bold">
                Logo
              </Link>
            </div>
            <div className="ml-auto hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    onClick={handleNavigation()}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <button
                          onClick={() => {
                            if (item.name === "Log out") {
                              return setConfirmLogOut(true);
                            }
                          }}
                          className="w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {confirmLogOut ? (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-800/70 z-10">
          <Alert
            className="absolute top-2/4 left-2/4 z-30 bg-white transform -translate-x-2/4 -translate-y-2/4 text-xl font-semibold p-4 w-[300px] h-[180px] flex flex-col justify-between items-center text-center"
            message="Are you sure you want to logout? Any unsaved data will be lost."
            type="simple"
            action={
              <Space className="flex items-center justify-center" direction="horizontal">
                <button
                  className="p-2 px-3 border border-gray-800 bg-gray-800 rounded-md text-sm text-white hover:opacity-80 active:opacity-70"
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </button>
                <button
                  className="p-2 px-3 border border-gray-500 bg-white rounded-md text-sm text-gray-800 hover:opacity-80 active:opacity-70"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </Space>
            }
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
