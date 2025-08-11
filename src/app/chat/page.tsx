"use client";
import Input from "@/components/Input";
import { useState } from "react";

export default function ChatPage() {
  const [streamId, setStreamId] = useState<string>("");
  return (
    <div className="flex grow bg-slate-950 text-white gap-8 p-8">
      <iframe
        className="grow bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden"
        src="https://www.twitch.tv/embed/dylandoeschaos/chat?darkpopout=true&parent=live.dylandoeschaos.com"
      />
      <div className="flex flex-col grow gap-4">
        <Input
          name="YouTube Stream ID"
          value={streamId}
          onChange={e => setStreamId(e.target.value)}
        />
        <iframe
          className="grow bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden"
          src={`https://www.youtube.com/live_chat?v=${streamId}&embed_domain=live.dylandoeschaos.com`}
        />
      </div>
    </div>
  );
}
