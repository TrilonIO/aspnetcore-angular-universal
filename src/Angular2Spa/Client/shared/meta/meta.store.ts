export let metaStore = {

    title : '',
    
    meta : { 

    },

    getState () {
        return {
            title: this.title,
            meta: this.meta
        };
    }    
};
