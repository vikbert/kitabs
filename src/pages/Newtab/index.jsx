import React from 'react';
import {render} from 'react-dom';

import NewTab from './Newtab';
import './index.less';
//import weui styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

render(<NewTab/>, window.document.querySelector('#app-container'));
