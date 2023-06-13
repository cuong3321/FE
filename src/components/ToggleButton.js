import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareContact} from "../actions/shareActions";
import styles from  "./ToggleButton.module.css";

const ToggleButton = ({ userId, contactId, toggled, onClick }) => {
    
    const [isToggled, setIsToggled] = useState(toggled)
    const dispatch = useDispatch();
    const callback = () => {
        setIsToggled(!isToggled);
        dispatch(shareContact(userId, parseInt(contactId), !isToggled));
    }

    return ( 
        <label className={styles.csslabel}>
            <input type="checkbox" className={styles.cssinput} defaultChecked={isToggled} onClick={callback} />
            <span className={styles.cssspan} />
            {/* <strong>{userId}</strong> */}
        </label>
     );
}
 
export default ToggleButton;