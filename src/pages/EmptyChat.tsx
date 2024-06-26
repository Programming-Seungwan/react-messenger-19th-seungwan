import EmptyChatHeadNav from '@components/fixed/ChatHead/ChatHeadNav/EmptyChatHeadNav';
import ChatInput from '@components/non-fixed/ChatInput/ChatInput';
import { useParams } from 'react-router-dom';
import EmptyChatBody from '@components/non-fixed/EmptyChatBody/EmptyChatBody';

export default function EmptyChat() {
  const { username } = useParams();

  return (
    <>
      <EmptyChatHeadNav username={username} />
      <EmptyChatBody username={username} />
      <ChatInput />
    </>
  );
}
