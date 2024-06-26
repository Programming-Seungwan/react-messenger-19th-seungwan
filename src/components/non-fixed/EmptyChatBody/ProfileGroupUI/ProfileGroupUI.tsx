import styled from 'styled-components';

const StyledProfileGroupUI = styled.div`
  width: 100%;
  height: 187px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 8px;
`;

const StyledEightyDiscordImage = styled.img`
  width: 80px;
  height: 80px;
`;

const StyledNameComponent = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 4px;
`;

const StyledBigName = styled.p`
  width: 100%;
  height: 41px;
  font-size: ${(props) => props.theme.textStyle.fontSize.h1};
  font-family: Pretendard;
  line-height: ${(props) => props.theme.textStyle.lineHeight.h1};
  color: ${(props) => props.theme.color.black};
  text-align: center;
`;

const StyledSmallName = styled.div`
  width: 100%;
  height: 23px;
  font-size: ${(props) => props.theme.textStyle.fontSize.body1};
  font-family: Pretendard;
  line-height: ${(props) => props.theme.textStyle.lineHeight.body1};
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
`;

const StyledGuideDiv = styled.div`
  width: 100%;
  height: 23px;
  font-size: ${(props) => props.theme.textStyle.fontSize.body2};
  font-family: Pretendard;
  line-height: ${(props) => props.theme.textStyle.lineHeight.body2};
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
`;

export default function ProfileGroupUI({
  username,
}: {
  username: string | undefined;
}) {
  return (
    <StyledProfileGroupUI>
      <StyledEightyDiscordImage src="/images/discordGreen40.svg" />
      <StyledNameComponent>
        <StyledBigName>{username}</StyledBigName>
        <StyledSmallName>{`${username}_ceos`}</StyledSmallName>
      </StyledNameComponent>
      <StyledGuideDiv>{username}과 대화를 시작해보세요</StyledGuideDiv>
    </StyledProfileGroupUI>
  );
}
