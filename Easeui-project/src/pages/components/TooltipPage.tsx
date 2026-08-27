import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {
  const usageCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="This is a tooltip" variant="dark" side="top">
  <Button variant="primary">Hover me</Button>
</Tooltip>

<Tooltip content="Light tooltip" variant="light" side="bottom">
  <Button variant="secondary">Light</Button>
</Tooltip>

<Tooltip content="Outline style" variant="outline" side="right">
  <Button variant="outline">Outline</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "-",
      description: "The content displayed inside the tooltip",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"dark"',
      description: "The visual style variant of the tooltip",
    },
    {
      prop: "side",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "The preferred side to position the tooltip",
    },
    {
      prop: "delayDuration",
      type: "number",
      default: "300",
      description: "Delay in milliseconds before showing the tooltip",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the tooltip appears",
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
          Tooltip
        </p>
        <p className="text-lg text-gray-600">
          A popup that displays information related to an element when it
          receives hover or focus.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <div className="flex gap-6 flex-wrap items-center">
            <Tooltip content="Dark tooltip on top" variant="dark" side="top">
              <Button variant="primary" hoverAnimation="none" size="sm">
                Hover me
              </Button>
            </Tooltip>

            <Tooltip
              content="Light tooltip on bottom"
              variant="light"
              side="bottom"
            >
              <Button variant="secondary" hoverAnimation="none" size="sm">
                Light
              </Button>
            </Tooltip>

            <Tooltip
              content="Outline style"
              variant="outline"
              side="right"
            >
              <Button variant="outline" hoverAnimation="none" size="sm">
                Outline
              </Button>
            </Tooltip>

            <Tooltip
              content="Left side tooltip"
              variant="dark"
              side="left"
            >
              <Button variant="dark" hoverAnimation="none" size="sm">
                Left
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sides</h2>
        <ComponentDemo
          code={`<Tooltip content="Top" side="top">
  <Button size="sm">Top</Button>
</Tooltip>
<Tooltip content="Bottom" side="bottom">
  <Button size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Left" side="left">
  <Button size="sm">Left</Button>
</Tooltip>
<Tooltip content="Right" side="right">
  <Button size="sm">Right</Button>
</Tooltip>`}
        >
          <div className="flex gap-6 flex-wrap items-center">
            <Tooltip content="Top" side="top">
              <Button variant="primary" hoverAnimation="none" size="sm">
                Top
              </Button>
            </Tooltip>
            <Tooltip content="Bottom" side="bottom">
              <Button variant="primary" hoverAnimation="none" size="sm">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="Left" side="left">
              <Button variant="primary" hoverAnimation="none" size="sm">
                Left
              </Button>
            </Tooltip>
            <Tooltip content="Right" side="right">
              <Button variant="primary" hoverAnimation="none" size="sm">
                Right
              </Button>
            </Tooltip>
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

export default TooltipPage;
