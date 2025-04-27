import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import ChatMessage from "./ChatMessage"

const ChatMessagesContainer = ({ user1, user2 }: { user1: string, user2: string }) => {
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
      .order('sent_at', { ascending: true })

    if (!error) setMessages(data)
  }

  useEffect(() => {
    fetchMessages()

    const subscription = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        fetchMessages()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user1, user2])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-4 overflow-y-scroll max-h-[500px] px-4 py-2">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessagesContainer
