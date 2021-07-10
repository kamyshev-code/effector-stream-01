import { sample } from 'effector';

import { analyticsService } from '../analytics';
import {
  searchChanged,
  searchButtonClicked,
  SearchFormGate,
  $search,
} from './search';

sample({
  clock: SearchFormGate.open,
  fn: () => ({
    name: 'search_form_shown',
    payload: {},
  }),
  target: analyticsService.sendEvent,
});

sample({
  clock: searchChanged,
  fn: (search) => ({ name: 'search_changed', payload: { search } }),
  target: analyticsService.sendEvent,
});

sample({
  source: $search,
  clock: searchButtonClicked,
  fn: (search) => ({ name: 'search_button_clicked', payload: { search } }),
  target: analyticsService.sendEvent,
});
