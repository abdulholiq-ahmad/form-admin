import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { IoIosCheckbox, IoIosRadioButtonOn } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoText } from "react-icons/io5";

export default function TypeQuestion({ title, handleChangeType, disabled }) {
  const types = ["checkbox", "radio", "dropdown", "text"];

  return (
    <div>
      <Menu>
        <MenuButton
          className={`flex focus:ring-2 ring-offset-2 focus:ring-gray-500 capitalize items-center gap-2 min-w-[145px] rounded-md ${
            disabled ? "bg-gray-600 cursor-not-allowed" : "bg-gray-800"
          } py-2 px-3 text-sm/6 font-semibold text-white shadow-inner  focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white`}
          disabled={disabled}
        >
          {(title === "checkbox" && <IoIosCheckbox className="size-4 fill-white/60" />) ||
            (title === "radio" && <IoIosRadioButtonOn className="size-4 fill-white/60" />) ||
            (title === "dropdown" && <IoIosArrowDropdownCircle className="size-4 fill-white/60" />) ||
            (title === "text" && <IoText className="size-4 fill-white/60" />)}
          {title}
          <ChevronDownIcon className="size-4 fill-white ml-auto" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className={`origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ${
            disabled ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {types.map((type) => (
            <MenuItem key={type}>
              <button
                disabled={disabled}
                onClick={() => !disabled && handleChangeType(type)}
                className="group flex capitalize w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                {(type === "checkbox" && <IoIosCheckbox className="size-4 fill-white/60" />) ||
                  (type === "radio" && <IoIosRadioButtonOn className="size-4 fill-white/60" />) ||
                  (type === "dropdown" && <IoIosArrowDropdownCircle className="size-4 fill-white/60" />) ||
                  (type === "text" && <IoText className="size-4 fill-white/60" />)}
                {type}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
