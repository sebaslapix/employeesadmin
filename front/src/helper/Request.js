const Request = async (url, method, payload = "", token = "") => {
    let options = {
        method: "GET"
    }
    if(method === "GET" || method === "DELETE"){
        options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    }

    if(method === "POST"){

        options = {
            method: method,
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    }

    const req = await fetch(url, options);
    const data = await req.json();

    return data;
}

export default Request;