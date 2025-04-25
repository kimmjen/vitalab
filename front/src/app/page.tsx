// src/app/page.tsx
import { StatsSlider } from "@/components/home/HeroSection/StatsSlider"
import { VitalRecorderCard } from "@/components/home/MainContent/VitalRecorderCard"
import { ListCard } from "@/components/home/MainContent/ListCard"
import { NOTICES, DISCUSSIONS } from "@/lib/constants/home"

export default function Home() {
    return (
        <div className="flex flex-col flex-1"> {/* flex-1 추가 */}
            {/*<Header />*/}

            <main className="flex-1"> {/* main 태그로 감싸고 flex-1 추가 */}
                <section className="py-20 text-center bg-white dark:bg-gray-950">
                    <h1 className="text-4xl font-normal mb-12 dark:text-white">Join us!</h1>
                    <StatsSlider />
                </section>

                <section className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,360px,360px] gap-6">
                        <VitalRecorderCard />
                        <ListCard title="Notice" items={NOTICES} />
                        <ListCard title="Discussion" items={DISCUSSIONS} />
                    </div>
                </section>
            </main>

        </div>
    )
}