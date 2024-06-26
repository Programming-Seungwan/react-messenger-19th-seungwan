import { useRecoilState } from 'recoil';
import {
  messageDataState,
  messageDateArrayState,
  isMessageLikeButtonClickedState,
} from '@context/state/atom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import OneDateContainer from '@components/non-fixed/ChatBody/OneDateContainer/OneDateContainer';
import { messageDataObject, voidFunction } from 'types/type';
import sortByDate from '@utils/sortArrayByDate';
import useScrollToBottom from '@hooks/useScrollToBottom';

const StyledChatBodyContainer = styled.div`
  flex-grow: 1;
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
  width: 343px;
  overflow-y: scroll;
`;

export default function ChatBody() {
  // 여기에서 json 데이터를 불러와서 날짜별로 쪼갠다. 그리고 구분선, 메시지,메시지, 다시 구분선 메시지 메시지 느낌으로 나눠준다
  const chatBodyContainerRef = useRef<HTMLDivElement>(null);
  const [messageData, setMessageData] = useRecoilState(messageDataState);
  const [messageDateArray, setMessageDateArray] = useRecoilState(
    messageDateArrayState
  );
  const [isMessageLikeButtonClicked, setIsMessageLikeButtonClicked] =
    useRecoilState(isMessageLikeButtonClickedState);

  const [scrollToBottom, setScrollFunction] = useScrollToBottom();

  const scrollToBottomFunction: voidFunction = function () {
    if (chatBodyContainerRef.current) {
      chatBodyContainerRef.current.scrollTop =
        chatBodyContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setScrollFunction(scrollToBottomFunction);
  }, []);

  // messageData가 변경된 이후에 dom에 반영되고 그 다음에 scroll이 내려가야 새로 생긴 요소까지 반영
  useEffect(() => {
    // 좋아요 버튼이 눌린 상태면 하트 UI만 만들어주고 다시 false로 만들어주고 끝내야 다음 상태가 정상적으로 반영
    setIsMessageLikeButtonClicked(false);
    if (isMessageLikeButtonClicked === true) {
      return;
    }
    scrollToBottom();
  }, [messageData]);

  // 처음 chatBody 컴포넌트가 DOM에 마운트 되면 json 파일로부터 정보를 가져온다.
  useEffect(() => {
    async function loadMessageData() {
      try {
        const tmpDateArray: string[] = [];
        const tmpMessageDataObject: messageDataObject = {}; // 상태로도 사용하고 로컬 스토리지에도 동기화를 해줄 객체

        const response = await fetch('/Dummy/Dummy.json');
        const messageJsonData = await response.json();

        for (const messageData of messageJsonData) {
          const { content, createdAt, from, like } = messageData;
          const slicedCreatedDate: string = createdAt.slice(0, 10);
          if (tmpMessageDataObject[slicedCreatedDate] === undefined) {
            tmpMessageDataObject[slicedCreatedDate] = [];
          }

          tmpMessageDataObject[slicedCreatedDate].push({
            content: content,
            createdAt: createdAt,
            createdDate: slicedCreatedDate,
            from: from,
            like: like,
          });

          if (!tmpDateArray.includes(slicedCreatedDate)) {
            tmpDateArray.push(slicedCreatedDate);
          }
        }
        // 기존의 날짜 배열을 오름차순으로 정렬
        tmpDateArray.sort(sortByDate);
        localStorage.setItem(
          'chatMessageData',
          JSON.stringify(tmpMessageDataObject)
        );
        localStorage.setItem(
          'chatMessageDateArray',
          JSON.stringify(tmpDateArray)
        );
        setMessageData(tmpMessageDataObject);
        setMessageDateArray(tmpDateArray);
      } catch (error) {
        console.log('error is : ', error);
      }
    }

    // 기존의 로컬 스토리지에 아무 정보도 없다면 json 파일의 내용을 상태로 만들고 로컬 스토리지에도 반영
    // 하지만 이미 있다면 해당 내용을 가져와서 상태로 만든다
    if (
      localStorage.getItem('chatMessageData') === null &&
      localStorage.getItem('chatMessageDateArray') === null
    ) {
      loadMessageData();
    } else if (
      localStorage.getItem('chatMessageData') !== null &&
      localStorage.getItem('chatMessageDateArray') !== null
    ) {
      const lstrgChatMessageData = JSON.parse(
        localStorage.getItem('chatMessageData') as string
      );
      const lstrgChatMessageDateArray = JSON.parse(
        localStorage.getItem('chatMessageDateArray') as string
      );

      setMessageData(lstrgChatMessageData);
      setMessageDateArray(lstrgChatMessageDateArray);
    }
  }, []);

  return (
    <StyledChatBodyContainer className="scroll-box" ref={chatBodyContainerRef}>
      {messageDateArray.map((messageDate) => {
        return <OneDateContainer key={messageDate} messageDate={messageDate} />;
      })}
    </StyledChatBodyContainer>
  );
}
