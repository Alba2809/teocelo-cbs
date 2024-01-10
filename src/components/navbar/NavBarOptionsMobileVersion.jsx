import {
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

function NavBarOptionsMobileVersion({ options }) {
  const [openList, setOpenList] = useState("");

  const handleOpenList = (value) => {
    setOpenList(openList === value ? "" : value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {Object.keys(options.others).length > 1 ? (
        <>
          <Accordion
            open={openList === options.title}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  openList === options.title ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={openList === options.title}>
              <AccordionHeader
                onClick={() => handleOpenList(options.title)}
                className="border-b-0 p-3"
              >
                <p className="mr-auto font-normal text-lg text-black">
                  {options.title}
                </p>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List>
                {Object.keys(options.others).map((key) => (
                  <ListItem key={key} onClick={scrollToTop}>
                    <Link
                      to={options.others[key]}
                      className="inline-flex w-full"
                    >
                      {key}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionBody>
          </Accordion>
        </>
      ) : (
        <>
          {Object.keys(options.others).map((key) => (
            <ListItem key={key} onClick={scrollToTop}>
              <Link
                to={options.others[key]}
                className="inline-flex w-full text-lg text-black"
              >
                {options.title}
              </Link>
            </ListItem>
          ))}
        </>
      )}
    </>
  );
}

NavBarOptionsMobileVersion.prototype = {
  options: PropTypes.object,
};

export default NavBarOptionsMobileVersion;
