"use client"

export default function SlideQuote() {
  return (
    <div className="bg-primary relative flex h-[900px] w-full flex-col items-center justify-center overflow-hidden px-16 text-center">
      {/* Decorative large quote mark */}
      <div
        aria-hidden
        className="text-primary-foreground/10 pointer-events-none absolute top-16 left-20 font-serif text-[12rem] leading-none select-none"
      >
        &ldquo;
      </div>
      <div
        aria-hidden
        className="text-primary-foreground/10 pointer-events-none absolute right-20 bottom-16 font-serif text-[12rem] leading-none select-none"
      >
        &rdquo;
      </div>

      {/* Slide counter */}
      <p className="text-primary-foreground/60 mb-12 text-sm font-semibold tracking-widest uppercase">
        03 / 08
      </p>

      {/* Quote */}
      <blockquote className="text-primary-foreground relative z-10 max-w-4xl text-4xl leading-snug font-bold tracking-tight [text-wrap:balance] md:text-5xl">
        The only way to do great work is to love what you do. If you haven't
        found it yet, keep looking. Don't settle.
      </blockquote>

      {/* Attribution */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <div className="bg-primary-foreground/40 h-px w-16" />
        <p className="text-primary-foreground text-lg font-semibold">
          Steve Jobs
        </p>
        <p className="text-primary-foreground/70 text-sm">
          Co-founder, Apple Inc.
        </p>
      </div>
    </div>
  )
}
