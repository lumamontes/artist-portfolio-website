import React, { useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";
import RightMenuLinkSlice from "./navlink";

export default function Navbar(props) {
  const [links, setLinks] = useState(null);
  const leftmenu = [
    {
      label: "Portfolio",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ];

  const rightmenu = [

  ];
  async function getRightMenu() {
    const client = createClient();
    const postsResponse = await client.getByType('contactsnavbar');
    setLinks(postsResponse)
  }


  
  useEffect(() => {
  const initialRender = true; 

    if (initialRender) {
      getRightMenu();
    } 

    return () => false;
  }, [])


  const mobilemenu = [...leftmenu, ...rightmenu];
  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                  {leftmenu.map((item, index) => (
                    <Link href={item.href} key={index} legacyBehavior>
                      <a className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500" >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/" legacyBehavior>
                    <a className="w-28 dark:hidden flex items-center">
                        <Image
                          // {...GetImage(props.logo)}
                          src='/img/bird2.png'
                          alt="Logo"
                          sizes="(max-width: 640px) 100vw, 200px"
                          width={200}
                          height={200}
                          priority={true}
                        />
                        {/* <span className="block text-center">
                          Luana
                        </span> */}
                    </a>
                  </Link>
                  <Link href="/" legacyBehavior>
                    <a className="hidden w-28 dark:block">
                      {props.logoalt ? (
                        <Image
                          {...GetImage(props.logoalt)}
                          alt="Logo"
                          sizes="(max-width: 640px) 100vw, 200px"
                          priority={true}
                        />
                      ) : (
                        <span className="block text-center">
                          Stablo
                        </span>
                      )}
                    </a>
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300 ">
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                        <SliceZone
                          slices={links?.results[0].data.slices}
                          components={
                            {"nav_item_link":  RightMenuLinkSlice}
                          }
                        ></SliceZone>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Link href={item.href} key={index} legacyBehavior>
                      <a
                        className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noopener" : ""}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <SliceZone
                      slices={links?.results[0].data.slices}
                      components={
                        {"nav_item_link":  RightMenuLinkSlice}
                      }
                    ></SliceZone>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
