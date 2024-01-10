import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

function NavBarOptions({ options }) {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      {Object.keys(options.others).length > 1 ? (
        <div>
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-[#6D1610] hover:text-white">
              {options.title}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
              <div className="py-1">
                {Object.keys(options.others).map((key) => (
                  <Menu.Item key={key} onClick={scrollToTop}>
                    {({ active }) => (
                      <Link
                        to={options.others[key]}
                        className={
                          "block px-4 py-2 text-sm " +
                          (active
                            ? "bg-[#6D1610] text-white"
                            : "text-gray-700")
                        }
                      >
                        {key}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </div>
      ) : (
        <div>
            {Object.keys(options.others).map((key) => (
              <Link to={options.others[key]} key={key} className="inline-flex w-full justify-center gap-x-1.5 bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-[#6D1610] hover:text-white" onClick={scrollToTop}>
                {options.title}
              </Link>
            ))}
          
        </div>
      )}
    </Menu>
  );
}

NavBarOptions.prototype = {
  options: PropTypes.object,
};

export default NavBarOptions;
