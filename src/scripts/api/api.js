export default class Api {
    constructor(url){
        this.url = url;
    }
    async get(){
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();            
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
};