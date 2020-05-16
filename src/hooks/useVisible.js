import {useState} from 'react';

const useVisible = (init = false) => {
    const [visible, setVisible] = useState(init);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return {visible, show, hide};
};

export default useVisible;
