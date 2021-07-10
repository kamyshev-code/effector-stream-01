import { render } from 'react-dom';
import 'antd/dist/antd.css';

import { SearchForm } from './features/search';
import { analyticsService } from './features/analytics';

analyticsService.initFx();

const Application = () => (
  <>
    <SearchForm />
  </>
);

render(<Application />, document.getElementById('app'));
