import Navbar from './components/HeroModels/Navbar.jsx';
import ChatWidget from './components/chatbot/ChatWidget.jsx';
import Hero from './sections/Hero.jsx'
import Profile from './sections/Profile.jsx'

const App = () => {
  return (
    <>
      <Navbar/>
      <ChatWidget/>
      <Hero/>
      <Profile/>
    </>
  );
};

export default App;