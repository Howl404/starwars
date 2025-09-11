import { createFileRoute } from '@tanstack/react-router';
import { Routes } from '@/constants/api';

export const Route = createFileRoute(Routes.HOME)({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-black">
      <div className="container flex flex-col gap-8 px-4">
        <h1 className="text-center text-4xl font-extrabold text-yellow-400 md:text-8xl">
          Star Wars Universe
        </h1>

        <p className="mx-auto max-w-2xl text-center text-gray-400 md:text-xl">
          Welcome to a galaxy far, far away. Explore the epic saga through its
          legendary films and unforgettable characters.
        </p>

        <div className="star-wars-container">
          <div className="star-wars-crawl">
            <div className="auto flex flex-col gap-20 text-center text-2xl text-yellow-400 md:gap-40 md:text-5xl">
              <p>
                It is a period of civil war. Rebel spaceships, striking from a
                hidden base, have won their first victory against the evil
                Galactic Empire.
              </p>

              <p>
                During the battle, Rebel spies managed to steal secret plans to
                the Empire's ultimate weapon, the DEATH STAR, an armored space
                station with enough power to destroy an entire planet.
              </p>

              <p>
                Pursued by the Empire's sinister agents, Princess Leia races
                home aboard her starship, custodian of the stolen plans that can
                save her people and restore freedom to the galaxy....
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
