import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechlons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div
      className="
      w-[360px] max-sm:w-full min-h-96
      rounded-xl
      border border-slate-200
      shadow-sm hover:shadow-md
      transition
      bg-white
      dark:border-gray-800
      dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-black
    "
    >
      <div className="flex flex-col justify-between h-full p-6 relative">
        
        {/* Type Badge */}
        <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-lg bg-slate-100 dark:bg-gray-800">
          <p className="text-sm font-medium text-slate-700 dark:text-white">
            {normalizedType}
          </p>
        </div>

        {/* Top Content */}
        <div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />

          <h3 className="mt-5 capitalize text-lg font-semibold text-slate-900 dark:text-white">
            {role} Interview
          </h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/calendar.svg" alt="calendar" width={20} height={20} />
              <p className="text-slate-600 dark:text-gray-400">
                {formattedDate}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" alt="star" width={20} height={20} />
              <p className="text-slate-600 dark:text-gray-400">
                {feedback?.totalScore || "---"}/100
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 mt-5 text-slate-600 dark:text-gray-300">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row justify-between items-center mt-6">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
