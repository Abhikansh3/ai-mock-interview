import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">

      {/* Hero Section */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>

          <p className="text-lg text-slate-600 dark:text-gray-300">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Your Interviews */}
      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Your Interviews
        </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      {/* Take an Interview */}
      <section className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Take an Interview
        </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

    </main>
  );
};

export default Page;
