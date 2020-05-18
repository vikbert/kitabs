import React, {useState} from 'react';
import useVisible from "../../../hooks/useVisible";
import Dialog from "../../../components/Dialog";
import {Button, ButtonArea} from 'react-weui';

const AlertSetting = ({startAlert = () => null}) => {
    const [minutes, setMinutes] = useState(60);
    const {visible, show, hide} = useVisible(false);

    const handleSubmit = () => {
        startAlert(minutes);
        hide();
    };

    return (
        <>
            <Dialog show={visible} hide={hide}>
                <form onSubmit={handleSubmit} className={'alert-setting'}>
                    <input type={'number'}
                           autoFocus={true}
                           name={'minutes'}
                           value={minutes}
                           min={1}
                           max={1440}
                           onChange={(event) => setMinutes(event.target.value)}
                    />
                    <label htmlFor={'minutes'}>minutes</label>
                    <div className={'help-text'}>Press Enter to start</div>
                </form>
                <ButtonArea>
                    <Button type={'warn'} size="small" onClick={hide} plain>cancel</Button>
                </ButtonArea>
            </Dialog>
            <div className="button-alert button-icon" onClick={() => show()}>
                <span className="logo-alert icon-alarm"/>
            </div>
        </>
    );
};

export default AlertSetting;
