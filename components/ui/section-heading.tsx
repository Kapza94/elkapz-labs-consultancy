interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-balance text-[clamp(2.25rem,5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em] text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
