import heroImg from "@/assets/hero-nails.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Press-on nail collection flat lay"
          className="h-full w-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>
      <div className="container relative flex min-h-[480px] items-center py-20 md:min-h-[560px]">
        <div className="max-w-lg animate-fade-up">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            New Collection
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
            Handcrafted Nails, Made with Love
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Unique press-on nails designed & handcrafted by Gracie. No salon needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center rounded-full bg-secondary px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-secondary-foreground transition-transform hover:scale-105"
            >
              Shop Now
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border-2 border-primary-foreground/40 px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:border-primary-foreground"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
