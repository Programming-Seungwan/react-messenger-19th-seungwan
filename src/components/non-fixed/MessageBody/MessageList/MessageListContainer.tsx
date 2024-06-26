import styled from 'styled-components';
import MessageListItem from '@components/non-fixed/MessageBody/MessageList/MessageListItem/MessageListItem';
import { useNavigate } from 'react-router-dom';

const StyledMessageListContainer = styled.div`
  margin: 0 16px;
  height: fit-content;
`;

export default function MessageListContainer() {
  const navigate = useNavigate();

  function handleClickMessageListItem(path: string) {
    navigate(`/chat/${path}`);
  }

  return (
    <StyledMessageListContainer>
      <MessageListItem
        discordLogoColor="green"
        name="김정민"
        $ifBlueSignal={true}
        content={'내일 회의 괜찮으실까요?'}
        dateString={'20:45'}
        navigateToChatFunc={handleClickMessageListItem}
        path=""
      />
      <MessageListItem
        discordLogoColor="purple"
        name="CEOS2024"
        $ifBlueSignal={true}
        content={'내일 숙제 제출 마감일입니다! 늦지 않게 제출해주세요!'}
        dateString={'어제'}
        navigateToChatFunc={handleClickMessageListItem}
        path="CEOS2024"
      />
      <MessageListItem
        discordLogoColor="purple"
        name="홍길동"
        $ifBlueSignal={false}
        content={'내일 회의 괜찮으실까요?'}
        dateString={'3월 10일'}
        navigateToChatFunc={handleClickMessageListItem}
        path="홍길동"
      />
      <MessageListItem
        discordLogoColor="purple"
        name="discord_design"
        $ifBlueSignal={false}
        content={'내일 회의 괜찮으실까요?'}
        dateString={'2월 29일'}
        navigateToChatFunc={handleClickMessageListItem}
        path="discord_design"
      />
    </StyledMessageListContainer>
  );
}
