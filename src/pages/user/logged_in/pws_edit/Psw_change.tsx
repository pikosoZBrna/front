import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Access_denied from "../../Access_denied";

import user_data from "../../../../data/user_data.json"
import login_data from "../../../../data/login_data.json"

import edit_record from "../../../../apis/edit_record";

export default function Psw_change(){

    const navigate = useNavigate();
    
    const [current_psw, set_current_psw] = useState<string>();
    const [psw_input1, setPsw_input1] = useState<string>();
    const [psw_input2, setPsw_input2] = useState<string>();
    const [error_msg, set_error_msg] = useState<string>();

    var handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if(user_data[0].users[0].password !== current_psw){set_error_msg("current password is incorect")}
        if(!psw_input2){set_error_msg("new again password in empty")}
        if(!psw_input1){set_error_msg("new password in empty")}
        if(!current_psw){set_error_msg("current password in empty")}
        if(psw_input1 !== psw_input2){set_error_msg("passwords do not match")}

        if(current_psw && psw_input1 && psw_input2 && user_data[0].users[0].password === current_psw && psw_input1 === psw_input2){
        
            var tables = {
                users: {password: psw_input1}
            }

            const api_respocse = await edit_record(tables, user_data[0].users[0].id, login_data[0].users[0].id)

            navigate("/main", {state: {msg: "password changed"}})
        }
    }

    return(
        <>
            {login_data[0].users[0].login_status === "Active" ? 
                <><p>{error_msg}</p>

                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="current_psw">Current password</label>
                        <input type="text" id="current_psw" value={current_psw} onChange={(e) => set_current_psw(e.target.value)}></input>


                        <label htmlFor="first_psw">new password</label>
                        <input type="text" id="first_psw" value={psw_input1} onChange={(e) => setPsw_input1(e.target.value)}></input>

                        <label htmlFor="second_psw">new again password</label>
                        <input type="text" id="second_psw" value={psw_input2} onChange={(e) => setPsw_input2(e.target.value)}></input>

                        <button>send</button>
                    </form>
                    
                </div>
                </> : <Access_denied></Access_denied>
            }
        </>
    )
}