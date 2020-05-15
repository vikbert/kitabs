import React from 'react';
import {render} from 'react-dom';
import NewTab from './Newtab';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './index.less';


render(<NewTab/>, window.document.querySelector('#app-container'));
