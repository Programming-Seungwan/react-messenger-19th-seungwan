import styled from 'styled-components';
import ChatLogLeft from '@components/non-fixed/ChatBody/ChatLog/ChatLogLeft/ChatLogLeft';
import ChatLogRight from '@components/non-fixed/ChatBody/ChatLog/ChatLogRight/ChatLogRight';
import { chatBodyDivElementGap } from '@styles/styledComponents';

const StyledChatLogContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  column-gap: 8px;
  ${chatBodyDivElementGap}
`;

export default function ChatLog({
  isEqual,
  from,
  createdAt,
  content,
  like,
}: {
  isEqual: boolean;
  from: number;
  createdAt: string;
  content: string;
  like: boolean;
}) {
  return (
    <StyledChatLogContainer>
      <ChatLogLeft isEqual={isEqual} />
      <ChatLogRight
        isEqual={isEqual}
        from={from}
        createdAt={createdAt}
        content={content}
        like={like}
      />
    </StyledChatLogContainer>
  );
}
