import {useState, useEffect} from 'react';

const useResize = (myRef) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth);
            setHeight(myRef.current.offsetHeight);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);

    return {width, height};
};

export default useResize;
