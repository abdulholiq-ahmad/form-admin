import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Dropdown({ handleChangeText, options, selectedOption }) {
  return (
    <div>
      <Menu>
        <MenuButton className="flex focus:ring-2 ring-offset-2 border border-gray-300 focus:ring-gray-500 capitalize items-center gap-2 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-800 shadow-inner focus:outline-none data-[hover]:bg-white data-[open]:bg-white data-[focus]:outline-1 data-[focus]:outline-white">
          {selectedOption || options[0]}
          <ChevronDownIcon className="size-4 fill-gray-800 ml-auto" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="origin-top-right rounded-xl border border-white/5 bg-slate-100 p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {options?.map((text) => (
            <MenuItem key={text}>
              <button
                onClick={() => handleChangeText(text)}
                className="group flex capitalize w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-gray-800"
              >
                {text}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
