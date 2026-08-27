import { Carousel } from "@/components/Carousel/Carousel";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const CarouselPage = () => {
  const usageCode = `import { Carousel } from "@/components/Carousel/Carousel";

const slides = [
  { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
  { image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" },
  { image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800" },
];

<Carousel
  slides={slides}
  variant="light"
  size="lg"
  autoPlay
  showArrows
  showIndicators
/>`;

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60",
    },
    {
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const contentSlides = [
    {
      content: (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-indigo-600">Welcome</h3>
          <p className="text-gray-600">Built with EaseUI components</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-green-600">Fast</h3>
          <p className="text-gray-600">Lightning-fast GSAP animations</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-red-600">Beautiful</h3>
          <p className="text-gray-600">Pixel-perfect responsive design</p>
        </div>
      ),
    },
  ];

  const propsData = [
    {
      prop: "slides",
      type: "CarouselSlide[]",
      default: "[]",
      description:
        "Array of slide objects with `image` (URL string) or `content` (ReactNode)",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the carousel",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "The size of the carousel container",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Automatically advance to the next slide",
    },
    {
      prop: "autoPlayInterval",
      type: "number",
      default: "3000",
      description: "Interval in milliseconds between auto-play slides",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Show previous/next navigation arrows",
    },
    {
      prop: "showIndicators",
      type: "boolean",
      default: "true",
      description: "Show dot indicators at the bottom",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "true",
      description: "Loop back to the first slide after the last",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the carousel mounts",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders as child element using Radix Slot",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Carousel
        </p>
        <p className="text-lg text-gray-600">
          A slideshow component for cycling through images or content with
          navigation arrows and indicators.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Image Carousel</h2>
        <ComponentDemo code={usageCode}>
          <div className="w-full max-w-lg">
            <Carousel
              slides={slides}
              variant="light"
              size="md"
              autoPlay
              showArrows
              showIndicators
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Content Carousel</h2>
        <ComponentDemo
          code={`const contentSlides = [
  { content: <div><h3>Welcome</h3><p>Built with EaseUI</p></div> },
  { content: <div><h3>Fast</h3><p>GSAP animations</p></div> },
  { content: <div><h3>Beautiful</h3><p>Responsive design</p></div> },
];

<Carousel
  slides={contentSlides}
  variant="dark"
  size="md"
  showArrows
  showIndicators
/>`}
        >
          <div className="w-full max-w-lg">
            <Carousel
              slides={contentSlides}
              variant="dark"
              size="md"
              showArrows
              showIndicators
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <ComponentDemo
          code={`<Carousel slides={slides} size="sm" />
<Carousel slides={slides} size="md" />
<Carousel slides={slides} size="lg" />`}
        >
          <div className="flex flex-col gap-10 items-center w-full">
            <div className="w-64">
              <p className="text-sm font-medium text-gray-500 mb-2">Small</p>
              <Carousel slides={slides} size="sm" showArrows={false} />
            </div>
            <div className="w-full max-w-lg">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Medium (default)
              </p>
              <Carousel slides={slides} size="md" showArrows={false} />
            </div>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
