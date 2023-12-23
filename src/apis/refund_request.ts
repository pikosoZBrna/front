import Tables from "../interfaces/Tables"

export default async function refund_request(tables: Tables, email: string){

    const form_data = new FormData()

    form_data.append("email", JSON.stringify(email))
    form_data.append("tables", JSON.stringify(tables))

    try{
        const responce = await fetch(process.env.REACT_APP_SECRET_SERVER_URL + '/refund_request', {
            method: 'POST',
            body: form_data
        })
        return [await responce.json(), undefined]

    } catch(err) {
        console.log("🚀 ~ file: add_record.ts:40 ~ add_record ~ err:", err)
            
        return [undefined, err]
    }                    
}