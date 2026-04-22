"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

type CallStatus = "inactive" | "connecting" | "active" | "finished";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const TOKEN = "8a8bc8bc-5fb1-496f-a9f8-5cc201c2a4b0";
const ASSISTANT_ID = "3b15fed8-4873-4dd7-8066-cff6e8df5aa2";

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const vapiRef = useRef<any>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("inactive");
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  useEffect(() => {
    if (callStatus !== "finished") return;

    const handleGenerateFeedback = async () => {
      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.error("Error saving feedback");
        router.push("/");
      }
    };

    if (type === "generate") {
      router.push("/");
    } else {
      handleGenerateFeedback();
    }
  }, [callStatus]);

  const handleCall = useCallback(async () => {
    setCallStatus("connecting");

    try {
      // Dynamic import avoids Turbopack CommonJS singleton issue
      const VapiModule = await import("@vapi-ai/web");
      const Vapi = VapiModule.default;
      const vapiInstance = new Vapi(TOKEN);

      vapiInstance.on("call-start", () => setCallStatus("active"));
      vapiInstance.on("call-end", () => setCallStatus("finished"));
      vapiInstance.on("speech-start", () => setIsSpeaking(true));
      vapiInstance.on("speech-end", () => setIsSpeaking(false));
      vapiInstance.on("message", (message: Message) => {
        if (message.type === "transcript" && message.transcriptType === "final") {
          setMessages((prev) => [
            ...prev,
            { role: message.role, content: message.transcript },
          ]);
        }
      });
      vapiInstance.on("error", (error: Error) => {
        console.error("Vapi error:", error);
        setCallStatus("inactive");
      });

      vapiRef.current = vapiInstance;

      if (type === "generate") {
        const call = await vapiInstance.start(ASSISTANT_ID);
        if (!call) {
          console.error("Vapi returned null");
          setCallStatus("inactive");
        }
      } else {
        const formattedQuestions = questions
          ? questions.map((q) => `- ${q}`).join("\n")
          : "";

        const call = await vapiInstance.start(interviewer, {
          variableValues: { questions: formattedQuestions },
        });
        if (!call) {
          console.error("Vapi returned null for interview");
          setCallStatus("inactive");
        }
      }
    } catch (error) {
      console.error("Failed to start Vapi call:", error);
      setCallStatus("inactive");
    }
  }, [type, questions]);

  const handleDisconnect = useCallback(() => {
    setCallStatus("finished");
    vapiRef.current?.stop();
  }, []);

  const isActive = callStatus === "active";
  const isConnecting = callStatus === "connecting";

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {lastMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {!isActive ? (
          <button
            className="relative btn-call"
            onClick={handleCall}
            disabled={isConnecting}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                !isConnecting && "hidden"
              )}
            />
            <span className="relative">
              {isConnecting ? ". . ." : "Call"}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
