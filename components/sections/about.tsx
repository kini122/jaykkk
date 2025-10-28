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

        <div className="about-copy order-2">
          <blockquote className="italic text-xl md:text-2xl leading-tight text-foreground mb-6">
            “Each new day, each new experience inspires me.”
          </blockquote>

          <div className="about-text">
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
    </section>
  )
}
