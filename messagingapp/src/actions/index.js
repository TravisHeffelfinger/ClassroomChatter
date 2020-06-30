
export const authenticateUser = user => {
    return {
        type: 'AUTHENTICATED_USER',
        payload: {
            userId: uid,
            displayName,
            email
        }
    }
}