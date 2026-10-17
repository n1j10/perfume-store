import React from "react";

function SectionTitle({ text, eyebrow }: { text: string; eyebrow?: string }) {
  return (
    <div className="mb-8 flex items-end gap-4">
      <div className="shrink-0">
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold tracking-wide text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{text}</h2>
      </div>
      <div className="mb-2.5 flex flex-1 items-center gap-1.5" aria-hidden>
        <span className="h-2 w-2 rotate-45 bg-saffron" />
        <span className="h-px flex-1 bg-foreground/25" />
      </div>
    </div>
  );
}

export default SectionTitle;
