import {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutContent,
  LayoutFooter,
} from "@/components/Layout/Layout";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const LayoutPage = () => {
  const usageCode = `import {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutContent,
  LayoutFooter,
} from "@/components/Layout/Layout";

<Layout variant="light" spacing="md">
  <LayoutHeader variant="light">
    <h1 className="text-lg font-bold">My App</h1>
    <nav className="flex gap-4">
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </LayoutHeader>

  <div className="flex">
    <LayoutSidebar variant="light" width="md">
      <ul className="space-y-2 p-4">
        <li>Dashboard</li>
        <li>Settings</li>
      </ul>
    </LayoutSidebar>

    <LayoutContent padding="md">
      <h2 className="text-xl font-semibold">Main Content</h2>
      <p>Page content goes here.</p>
    </LayoutContent>
  </div>

  <LayoutFooter variant="light">
    <p className="text-sm text-gray-500">© 2026 EaseUI</p>
  </LayoutFooter>
</Layout>`;

  const propsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the layout section",
    },
    {
      prop: "spacing",
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      description: "Padding around the layout container (Layout root only)",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders as child element using Radix Slot",
    },
  ];

  const headerPropsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the header",
    },
    {
      prop: "position",
      type: '"static" | "sticky" | "fixed"',
      default: '"static"',
      description: "CSS position of the header",
    },
  ];

  const sidebarPropsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the sidebar",
    },
    {
      prop: "width",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Width of the sidebar",
    },
    {
      prop: "position",
      type: '"static" | "sticky" | "fixed"',
      default: '"static"',
      description: "CSS position of the sidebar",
    },
  ];

  const contentPropsData = [
    {
      prop: "padding",
      type: '"none" | "sm" | "md" | "lg"',
      default: '"md"',
      description: "Internal padding of the content area",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Layout
        </p>
        <p className="text-lg text-gray-600">
          A set of composable layout primitives for building page structures
          with header, sidebar, content, and footer regions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Light Layout</h2>
        <ComponentDemo code={usageCode}>
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <Layout variant="light" spacing="none">
              <LayoutHeader variant="light">
                <h1 className="text-lg font-bold text-gray-800">My App</h1>
                <nav className="flex gap-4 text-sm text-gray-600">
                  <a href="#" className="hover:text-black">
                    Home
                  </a>
                  <a href="#" className="hover:text-black">
                    About
                  </a>
                </nav>
              </LayoutHeader>

              <div className="flex min-h-[200px]">
                <LayoutSidebar variant="light" width="sm">
                  <ul className="space-y-2 p-4 text-sm">
                    <li className="text-indigo-600 font-medium">Dashboard</li>
                    <li className="text-gray-600 hover:text-black cursor-pointer">
                      Settings
                    </li>
                    <li className="text-gray-600 hover:text-black cursor-pointer">
                      Profile
                    </li>
                  </ul>
                </LayoutSidebar>

                <LayoutContent padding="md">
                  <h2 className="text-xl font-semibold mb-2">Main Content</h2>
                  <p className="text-gray-600 text-sm">
                    This is the main content area. Place your page content here.
                  </p>
                </LayoutContent>
              </div>

              <LayoutFooter variant="light">
                <p className="text-sm text-gray-500">© 2026 EaseUI</p>
              </LayoutFooter>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dark Layout</h2>
        <ComponentDemo
          code={`<Layout variant="dark" spacing="none">
  <LayoutHeader variant="dark">
    <h1>My App</h1>
    <nav>Home | About</nav>
  </LayoutHeader>

  <div className="flex">
    <LayoutSidebar variant="dark" width="sm">
      <ul>Dashboard | Settings</ul>
    </LayoutSidebar>

    <LayoutContent padding="md">
      <h2>Main Content</h2>
    </LayoutContent>
  </div>

  <LayoutFooter variant="dark">
    <p>© 2026 EaseUI</p>
  </LayoutFooter>
</Layout>`}
        >
          <div className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <Layout variant="dark" spacing="none">
              <LayoutHeader variant="dark">
                <h1 className="text-lg font-bold text-white">My App</h1>
                <nav className="flex gap-4 text-sm text-gray-300">
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </nav>
              </LayoutHeader>

              <div className="flex min-h-[200px]">
                <LayoutSidebar variant="dark" width="sm">
                  <ul className="space-y-2 p-4 text-sm">
                    <li className="text-indigo-400 font-medium">Dashboard</li>
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      Settings
                    </li>
                    <li className="text-gray-400 hover:text-white cursor-pointer">
                      Profile
                    </li>
                  </ul>
                </LayoutSidebar>

                <LayoutContent padding="md">
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    Main Content
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Dark theme layout with sidebar navigation.
                  </p>
                </LayoutContent>
              </div>

              <LayoutFooter variant="dark">
                <p className="text-sm text-gray-400">© 2026 EaseUI</p>
              </LayoutFooter>
            </Layout>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Layout API Reference</h2>
        <PropsTable data={propsData} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">LayoutHeader API</h2>
        <PropsTable data={headerPropsData} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">LayoutSidebar API</h2>
        <PropsTable data={sidebarPropsData} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">LayoutContent API</h2>
        <PropsTable data={contentPropsData} />
      </section>
    </div>
  );
};

export default LayoutPage;
