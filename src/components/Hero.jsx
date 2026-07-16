import banner from "../assets/banner.jpg";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto">
        <div className="content-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white mb-6 text-center">
            Restaurant POS
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
