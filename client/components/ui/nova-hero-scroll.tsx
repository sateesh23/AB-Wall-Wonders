"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function NovaHeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden relative bg-transparent">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
              Transform Your Walls with <br />
              <span className="text-4xl md:text-[6rem] font-extrabold mt-1 leading-none bg-gradient-to-r from-primary to-brand-sage-600 bg-clip-text text-transparent">
                AB Wall Wonders
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto mt-6 leading-relaxed">
              Over 1000 Projects completed across Andhra Pradesh. Expert wallpaper installation,
              smart blinds, and premium flooring solutions with 15+ years of experience.
            </p>

            {/* Trust-building content */}
            <div className="mt-8 flex flex-col items-center space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-primary/70 font-medium">
                <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Spam
                </span>
                <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real House Projects
                </span>
                <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Details
                </span>
              </div>
              <p className="text-xs text-primary/60 max-w-md text-center px-4">
                Trusted by 100+ families across Andhra Pradesh • 2+ years of proven expertise
              </p>
            </div>
          </>
        }
      >
        <img
          src="/HeroImage.png"
          alt="AB Wall Wonders - Premium wallpaper and interior design showcase"
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
