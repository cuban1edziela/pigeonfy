

const currentUser = (state, action, user) => {
    switch(action.type){
        case 'SET-USER':
            return state = user 
        default:
            return state = null
    }
}