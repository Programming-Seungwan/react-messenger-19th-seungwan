import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <div>
          <h1>19기 프론트엔드 파이팅!!! 디자인과 사이좋게 지내요~~~</h1>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
