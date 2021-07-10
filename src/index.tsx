import { render } from 'react-dom';
import 'antd/dist/antd.css';

import { SearchForm } from './features/search';

const Application = () => {
  return (
    <>
      <SearchForm />
    </>
  );
};

render(<Application />, document.getElementById('app'));
