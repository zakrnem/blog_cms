import LoginForm from "../LoginForm/LoginForm"
import PostsDash from "../PostsDash/PostsDash"

function Homepage({ setActiveElement, auth }) {
    return (
        <>
            {auth && (
                <PostsDash setActiveElement={setActiveElement} />
            )}
            {!auth && (
                <LoginForm setActiveElement={setActiveElement} />
            )}
        </>
    )
}

export default Homepage