"use client"

export function About() {
  return (
    <section id="about" className="about-section py-12 md:py-16">
      <div className="about-inner gill-sans">
        <div className="about-media order-1 flex flex-col items-start justify-start">
          <h2 className="about-title text-left">About</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fc42a4f5004514145a01d1b1dcdf5f9d1%2Fc3675c801faf4bcb92424a7e8529583b?format=webp&width=1200"
            alt="Jay Karun portrait"
            className="about-image max-w-full"
          />
        </div>

        <div className="about-copy order-2 flex flex-col justify-center pl-[23px] mt-[95px] mb-[11px]">
          <blockquote className="italic text-[24px] leading-[30px] font-normal mb-[24px] text-foreground">
            “Each new day, each new experience inspires me.”
          </blockquote>

          <div className="about-text text-[18px] leading-[29px] font-normal">
            <p>
              Art is a conversation for Jay Karun. The canvas is where his mind makes its most eloquent remarks. His
              observations on the canvas are a window to his forthright and thoughtful mind, reflecting his profound
              observation, passion, and compassion for nature and the human predicament.
            </p>

            <p className="mt-6">
              Nature has been the biggest inspiration and medium for his work at all times. Elements from nature often form
              his language. Drawing a spark from commonplace sights, Jay Karun weaves a profound story on his canvas. When a
              thought strikes him, he lets it settle for a day and then gives it form on canvas.
            </p>

            <p className="mt-6">
              His style leans toward impressionism. The depth of colours in his work can be attributed to this, and to his
              enthusiastic perspective toward life and art. Jay Karun loves interacting with fellow artists and is greatly
              influenced by masters like Oskar Kokoschka.
            </p>
          </div>
        </div>
      </div>

      <div className="exhibitions-awards w-full mt-12 md:mt-16 px-6 md:px-0 mx-auto max-w-4xl">
        <h3 className="text-[24px] md:text-[28px] font-semibold mb-6 text-foreground">Art Exhibitions Awards And Achievements</h3>

        <div className="mb-10">
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Solo Exhibitions</h4>
          <ul className="text-[16px] leading-[26px] font-normal space-y-2">
            <li>2023 - Gallery AAD, Kozhikode, Kerala, India</li>
            <li>2015 - Gallery AAD, Kochi Kerala, India</li>
            <li>2014 - Kerala Lalithakala Akademi, Kerala, India</li>
            <li>2012 - Kerala Art Gallery, India</li>
            <li>2010 - Karnataka Chitrakala Parishath, Bangalore, India</li>
            <li>2008 - Manama Art Centre, Bahrain</li>
            <li>2005 - Insight Art Foundation Art Gallery, Kerala, India</li>
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Group Exhibitions</h4>
          <ul className="text-[16px] leading-[26px] font-normal space-y-2">
            <li>2022 - Kerala Lalithakala Akademi State Exhibition</li>
            <li>2020 - Kerala Lalithakala Akademi State Exhibition</li>
            <li>2019 - Kerala Lalithakala Akademi State Exhibition</li>
            <li>2017 - Indo Mexico Art exhibition at San Nicolas Culture House "La Pergola", Mexico</li>
            <li>2016 - Kerala Lalithakala Akademi Art Gallery Trissu, India</li>
            <li>2016 - Kerala Lalithakala Akademi Art Gallery, Kodungalloor, India</li>
            <li>2016 - Gallery AAD Kochi, Kerala India</li>
            <li>2015 - Worldwide Art Movement International Show, Kerala, India</li>
            <li>2014 - Sidhartha Art Foundation State Exhibition</li>
            <li>2014 - Kerala Lalithakala Akademi Art Gallery Alappey, Kerala, India</li>
            <li>2014 - Kerala Lalithakala Akademi State Exhibition</li>
            <li>2013 - Kerala Lalithakala Akademi Art Gallery, Trissur, Kerala, India</li>
            <li>2013 - Kerala Lalithakala Akademi State Exhibition</li>
            <li>2008 - Kerala Lalithakala Akademi Art Gallery, Kochi, Kerala, India</li>
            <li>2007 - Karnataka Chitrakala Parishath, Bangalore, India</li>
            <li>2003 - Manama Art Centre - Bahrain</li>
            <li>1998 - Mahatma Art Gallery, Kerala, India</li>
            <li>1995 - Art Maestro Awards & Exhibition, Lalithakala Academy, Kerala, India</li>
            <li>1993 - Kerala Art Gallery, Kochi Kerala, India</li>
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Participations & Art Camp</h4>
          <ul className="text-[16px] leading-[26px] font-normal space-y-2">
            <li>2016 - 3 Days National Art Camp at Kerala Lalithakala Akademi Agola Kalagramam, Kannur, India</li>
            <li>2016 - 1 Day Water Color Camp at Kochi, Marine Drive, Kochi, India</li>
            <li>2016 - National Art Camp - Kerala Lalithakala Akademi Art Gallery, Kochi, India</li>
            <li>2015 - Calligraphy Art Camp – Kerala Lalithakala Akademi Art Gallery, Kochi, India</li>
            <li>2014 - Worldwide Art Movement Art Camp, Munnar, Kerala, India</li>
            <li>2013 – Vaikom Muhammed Basheer Smaraka Art Camp, Kerala, India</li>
            <li>2013 - Worldwide Art Movement Art Camp, Pollachi, Tamil Nadu, India</li>
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Awards & Selections</h4>
          <ul className="text-[16px] leading-[26px] font-normal space-y-2">
            <li>Pepper Advertising Club Award</li>
            <li>Bangalore Advertising Club Award</li>
            <li>Reptile Art Contest Award Bahrain</li>
            <li>2022 - Kerala Lalithakala Akademi Selection For the Award-State Exhibition</li>
            <li>2020 - Kerala Lalithakala Akademi Selection For the Award- State Exhibition</li>
            <li>2014 - Kerala Lalithakala Akademi Selection For the Award- State Exhibition</li>
            <li>2014 - Sidhartha Art Foundation Selection For the Award- State Exhibition</li>
            <li>2013 - Kerala Lalithakala Akademi Selection For the Award</li>
            <li>2000 - Award for Reptile Art Contest, Bahrain</li>
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Publication & Press</h4>
          <ul className="text-[16px] leading-[26px] font-normal space-y-2">
            <li>2023 - Keeping Art Simple - Indian Express - Online Kochi, Kerala, India</li>
            <li>2013 - B For Building Kochi, Kerala, India</li>
            <li>2013 - Chithra Kaazhakal Kochi, Kerala, India</li>
            <li>2012 - Malayala Manorama Daily, Kerala India</li>
            <li>2012 - Sensual Interpretations - The Hindu News Kochi, Kerala, India</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[20px] font-semibold mb-4 text-foreground">Collection</h4>
          <p className="text-[16px] leading-[26px] font-normal">
            America, Canada, Switzerland, United Arab Emirates, United Kingdom
          </p>
        </div>
      </div>
    </section>
  )
}
