async function postInfo(info, endpoint) {
    try {
        const peticion = await fetch(`http://localhost:1313/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });
        return await peticion.json();
    } catch (error) {
        console.error(error);
    }
}

async function getInfo(endpoint) {
    try {
        const peticion = await fetch(`http://localhost:1313/${endpoint}`);
        return await peticion.json();
    } catch (error) {
        console.error(error);
    }
}

async function updateInfo(id, info, endpoint) {
    try {
        const peticion = await fetch(`http://localhost:1313/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });
        return await peticion.json();
    } catch (error) {
        console.error(error);
    }
}

async function deleteInfo(id, endpoint) {
    try {
        await fetch(`http://localhost:1313/${endpoint}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(error);
    }
}

export { getInfo, postInfo, updateInfo, deleteInfo };



