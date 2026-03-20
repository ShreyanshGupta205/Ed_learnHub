"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  PhoneOff,
  MessageSquare,
  Users,
  Hand,
  MoreVertical,
  Settings,
  Send,
  Maximize2,
  Volume2,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"

const participants: any[] = []

const chatMessages: any[] = []

export default function LiveClassRoomPage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-4">
          <Link href="/live-classes">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">Building Real-time Applications with WebSockets</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="destructive" className="gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </Badge>
              <span>0 watching</span>
              <span>Just started</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            {isScreenSharing ? (
              <div className="h-full flex flex-col gap-4">
                {/* Screen Share View */}
                <div className="flex-1 rounded-xl bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <ScreenShare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Dr. Sarah Chen is sharing their screen</p>
                  </div>
                </div>
                {/* Participants Strip */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {participants.slice(0, 4).map((participant) => (
                    <div
                      key={participant.id}
                      className={`relative shrink-0 w-32 aspect-video rounded-lg bg-muted overflow-hidden ${
                        participant.isSpeaking ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      {participant.isVideoOn ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="text-sm">
                              {participant.name.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                        <span className="text-xs bg-black/50 text-white px-1.5 py-0.5 rounded truncate max-w-[80px]">
                          {participant.name.split(" ")[0]}
                        </span>
                        {participant.isMuted && (
                          <MicOff className="h-3 w-3 text-rose-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center rounded-xl bg-muted p-8 text-center">
                <div className="h-20 w-20 rounded-full bg-background/50 flex items-center justify-center mb-4">
                  <VideoOff className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Waiting for class to begin</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                  The instructor hasn't started the video yet. Stay tuned!
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 p-4 border-t">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isVideoOn ? "secondary" : "destructive"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isVideoOn ? "Stop Video" : "Start Video"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isScreenSharing ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <ScreenShare className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={handRaised ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setHandRaised(!handRaised)}
                  >
                    <Hand className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{handRaised ? "Lower Hand" : "Raise Hand"}</TooltipContent>
              </Tooltip>

              <div className="w-px h-8 bg-border mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showChat ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Chat</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={showParticipants ? "default" : "secondary"}
                    size="lg"
                    className="rounded-full h-14 w-14"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <Users className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Participants</TooltipContent>
              </Tooltip>

              <div className="w-px h-8 bg-border mx-2" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="lg" className="rounded-full h-14 w-14">
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Leave Class</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <aside className="w-80 border-l flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-semibold">Chat</h2>
              <Badge variant="secondary">{chatMessages.length}</Badge>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.length > 0 ? (
                  chatMessages.map((msg) => (
                    <div key={msg.id}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{msg.sender}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                    <p className="text-sm text-muted-foreground">No messages yet. Say hello!</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Send a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                />
                <Button size="icon" onClick={() => setMessage("")}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </aside>
        )}

        {/* Participants Panel */}
        {showParticipants && !showChat && (
          <aside className="w-80 border-l flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-semibold">Participants</h2>
              <Badge variant="secondary">{participants.length}</Badge>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {participants.length > 0 ? (
                  participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback className="text-xs">
                            {participant.name.split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{participant.name}</p>
                          {participant.role === "host" && (
                            <p className="text-xs text-muted-foreground">Host</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.isMuted ? (
                          <MicOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mic className="h-4 w-4 text-muted-foreground" />
                        )}
                        {!participant.isVideoOn && (
                          <VideoOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-10 italic">No participants yet.</p>
                )}
              </div>
            </ScrollArea>
          </aside>
        )}
      </div>
    </div>
  )
}
