
export default function useAuth() {
    const session = JSON.parse(sessionStorage.getItem("loggedIn"));
    return session
}
