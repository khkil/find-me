import Counter from './components/ColorBox';
import Todos from './components/Todos';
import { increase, decrease } from './modules/conunter';

const App = () => {

  return (
    <div>
      <Counter number={0} onIncrease={increase} onDecrease={decrease}/>
      <hr/>
      <Todos/>
    </div>
  );
}

export default App;
