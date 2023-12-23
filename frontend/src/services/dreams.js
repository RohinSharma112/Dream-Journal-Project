import {url} from "../Constant";

export const appUserLogin = async (userLogin) => {
    try {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userLogin.username,
                password: userLogin.password
            })
        });

        const data = await response.json();
        console.log(data.body);
        return {
            success: data.body.success,
            message: data.body.message,
            user_id: data.body.user_id
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server.'
        };
    }
}

export const appUserSignup = async (userSignup) => {
    try {
        const response = await fetch(`${url}/user/signup`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userSignup.uname,           
                username: userSignup.username,
                email: userSignup.email,       
                password: userSignup.password
            })
        });

        const data = await response.json();
        return {
            success: data.body.success,
            message: data.body.message
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server.'
        };
    }
}


export const appDreamEntry = async (dreamData) => {
    try {
        const response = await fetch(`${url}/dreams/create-dream-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: dreamData.user_id,          
                dream_title: dreamData.dream_title,
                dream_date: dreamData.dream_date,
                dream_description: dreamData.dream_description,
                dream_tag: dreamData.dream_tag
            })
        });

        const data = await response.json();

        return {
            success: data.body.success,
            message: data.body.message
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server.'
        };
    }
}

export const getDreamLogs = async (userID) => {
    try {
        console.log(userID);
        const response = await fetch(`${url}/dreams/view-dream-logs`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userID 
            })
        });
        
        const data = await response.json();

        return {
            dreams: data.body.dreams
        };
    } catch (error) {
        console.log(error);
        return {
            dreams: []
        };
    }
}


export const getDreamById = async (dream_id) => {
    try {
        const response = await fetch(`${url}/dreams/dream/${dream_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data)

        return {
            dream: data.dream
        };
    } catch (error) {
        console.log(error);
        return {
            event: null
        };
    }
}

export const createEntry = async(dreamData) => {
    try {
        console.log(dreamData.tag)
        const response = await fetch(`${url}/dreams/create-dream-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: dreamData.user_id,
                dream_title: dreamData.title,
                dream_date: dreamData.date,
                dream_description: dreamData.description,
                dream_tag: dreamData.tag
            })
        });

        const data = await response.json();
        console.log(data.body);
        return {
            success: data.body.success,
            message: data.body.message
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server.'
        };
    }
}

export const getText = async(ImgData) => {
    try {
        const response = await fetch(`${url}/img-to-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: ImgData
            })
        });

        const data = await response.json();
        return {
            text: data.body.detectedText
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server.'
        };
    }
}

export const DesiredDateformat = (inputDate) =>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const [year, month, day] = inputDate.split('-');

    const monthName = monthNames[parseInt(month, 10) - 1];


    return `${day} ${monthName} ${year}`;
}




