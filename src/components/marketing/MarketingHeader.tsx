'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Solutions',
    href: '/solutions',
    children: [
      { name: 'Multi-Campus SIS', href: '/solutions/multi-campus-sis' },
      { name: 'Learning Experience Platform', href: '/solutions/learning-experience-platform' },
      { name: 'Teacher Portal', href: '/solutions/teacher-portal' },
      { name: 'Student Portal', href: '/solutions/student-portal' },
      { name: 'Rewards & Gamification', href: '/solutions/rewards-gamification' },
      { name: 'Analytics & Intelligence', href: '/solutions/analytics-intelligence' },
    ]
  },
  {
    name: 'Features',
    href: '/features',
    children: [
      { name: 'Curriculum Management', href: '/features/curriculum-management' },
      { name: 'Assessment & Grading', href: '/features/assessment-grading' },
      { name: 'Analytics & Reporting', href: '/features/analytics-reporting' },
      { name: 'Enrollment & Fee Management', href: '/features/enrollment-fee-management' },
      { name: 'Student Experience', href: '/features/student-experience' },
    ]
  },
  { name: 'Pricing', href: '/pricing' },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Case Studies', href: '/resources/case-studies' },
      { name: 'Implementation Guide', href: '/resources/implementation-guide' },
      { name: 'Documentation', href: '/resources/documentation' },
      { name: 'Webinars & Demos', href: '/resources/webinars' },
    ]
  },
  {
    name: 'Company',
    href: '/company',
    children: [
      { name: 'About FabriiQ', href: '/company/about' },
      { name: 'Platform Status', href: '/platform-status' },
      { name: 'Leadership Team', href: '/company/leadership' },
      { name: 'Careers', href: '/company/careers' },
      { name: 'Contact', href: '/company/contact' },
    ]
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function MarketingHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">FabriiQ</span>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1F504B' }}>
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="ml-3 text-2xl font-bold" style={{ color: '#1F504B' }}>FabriiQ</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                      {item.name}
                      <ChevronDown className="-mr-1 h-4 w-4" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Menu.Item key={child.name}>
                            {({ active }) => (
                              <Link
                                href={child.href}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm hover:bg-gray-50 transition-colors'
                                )}
                              >
                                {child.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'text-blue-600'
                      : 'text-gray-900 hover:text-blue-600',
                    'text-sm font-semibold leading-6 transition-colors'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Login button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-300 hover:transform hover:scale-105"
            style={{ backgroundColor: '#1F504B' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5A8A84'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F504B'}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <Disclosure as="div" className={classNames(mobileMenuOpen ? 'block' : 'hidden', 'lg:hidden')}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">FabriiQ</span>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">FabriiQ</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <Disclosure as="div" className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              {item.name}
                              <ChevronDown
                                className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
  )
}
