import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";

export default function Authenticated({ user, header, children }) {

    const click = useRef(null)
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 lg:flex">
                                <NavLink
                                    href={route("admin")}
                                    active={route().current("admin")}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("faculty.index")}
                                    active={route().current("faculty.index")}
                                >
                                    Faculty
                                </NavLink>
                                <NavLink
                                    href={route("semester.index")}
                                    active={route().current("semester.index")}
                                >
                                    Semester
                                </NavLink>
                                <NavLink
                                    href={route("subject.index")}
                                    active={route().current("subject.index")}
                                >
                                    Subject
                                </NavLink>
                                <NavLink href={route('syllabus.index')} active={route().current('syllabus.index')}>
                                   Syllabus
                                </NavLink>
                                <NavLink href={route('notes.index')} active={route().current('notes.index')}>
                                   Notes
                                </NavLink>
                                <NavLink href={route('questions.index')} active={route().current('questions.index')}>
                                   Questions
                                </NavLink>
                                <NavLink href={route('our-team.index')} active={route().current('our-team.index')}>
                                   Our Team
                                </NavLink>
                                <NavLink href={route('users.index')} active={route().current('users.index')}>
                                   Users
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden lg:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " lg:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("admin")}
                            active={route().current("admin")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("faculty.index")}
                            active={route().current("faculty.index")}
                        >
                            Faculty
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("semester.index")}
                            active={route().current("semester.index")}
                        >
                            Semester
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("syllabus.index")}
                            active={route().current("syllabus.index")}
                        >
                           Syllabus
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("notes.index")}
                            active={route().current("notes.index")}
                        >
                            Notes
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("questions.index")}
                            active={route().current("questions.index")}
                        >
                          Questions
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("our-team.index")}
                            active={route().current("our-team.index")}
                        >
                          Our Team
                        </ResponsiveNavLink> 
                        <ResponsiveNavLink
                            href={route("users.index")}
                            active={route().current("users.index")}
                        >
                          Users
                        </ResponsiveNavLink> 
                        {/* <ResponsiveNavLink
                            href={route("activities.index")}
                            active={route().current("activities.index")}
                        >
                            Activities
                        </ResponsiveNavLink> */}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
